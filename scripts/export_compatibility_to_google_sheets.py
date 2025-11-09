#!/usr/bin/env python3
"""
Script per esportare dati compatibilità farmaci da PostgreSQL a Google Sheets
Basato sul vecchio progetto drugsCompatibility (Java)

Autore: Vasile Chifeac
Data: 2024-11-09
"""

import psycopg2
import pandas as pd
from google.oauth2.service_account import Credentials
import gspread
from typing import List, Dict
import sys

# =============================================================================
# CONFIGURAZIONE
# =============================================================================

# PostgreSQL (dal vecchio progetto)
DB_CONFIG = {
    'host': 'localhost',
    'port': '5432',
    'database': 'DrugsCompatibility',
    'user': 'postgres',
    'password': 'root'  # ⚠️ CAMBIA CON LA TUA PASSWORD
}

# Google Sheets
SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k/edit"
SPREADSHEET_ID = "1J08Hz65aaztX9DuuRYMTMW6yt0tDEztuDLqIv5r1K8k"

# Tabella PostgreSQL
TABLE_NAME = "drugsCompatibility"
COLUMN_NAME = "name_of_drugs"

# =============================================================================
# FUNZIONI DATABASE
# =============================================================================

def connect_to_postgres():
    """Connessione al database PostgreSQL"""
    try:
        conn = psycopg2.connect(
            host=DB_CONFIG['host'],
            port=DB_CONFIG['port'],
            database=DB_CONFIG['database'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password']
        )
        print("✅ Connesso a PostgreSQL")
        return conn
    except Exception as e:
        print(f"❌ Errore connessione PostgreSQL: {e}")
        sys.exit(1)


def read_all_drugs(conn) -> List[str]:
    """
    Legge tutti i nomi dei farmaci dalla colonna name_of_drugs
    Equivalente Java: readColumnDate(String tableName, String column)
    """
    cursor = conn.cursor()
    query = f"SELECT {COLUMN_NAME} FROM {TABLE_NAME} ORDER BY {COLUMN_NAME}"
    
    try:
        cursor.execute(query)
        drugs = [row[0] for row in cursor.fetchall()]
        print(f"✅ Trovati {len(drugs)} farmaci")
        return drugs
    except Exception as e:
        print(f"❌ Errore lettura farmaci: {e}")
        return []
    finally:
        cursor.close()


def read_compatibility(conn, drug1: str, drug2: str) -> str:
    """
    Legge la compatibilità tra due farmaci
    Equivalente Java: readSpecificDate(String tableName, String column, String nameRow)
    
    Ritorna:
    - 'C' = Compatible
    - 'Y' = Y-site compatible
    - 'I' = Incompatible
    - '!' = Conflicting data
    - '' = No data
    """
    cursor = conn.cursor()
    
    try:
        # Query: trova la riga con drug2 e leggi la colonna drug1
        query = f'''
        SELECT "{drug1}"
        FROM {TABLE_NAME}
        WHERE {COLUMN_NAME} = %s
        '''
        
        cursor.execute(query, (drug2,))
        result = cursor.fetchone()
        
        if result:
            compatibility = result[0] if result[0] else ''
            return compatibility
        return ''
        
    except Exception as e:
        print(f"❌ Errore lettura compatibilità {drug1} - {drug2}: {e}")
        return ''
    finally:
        cursor.close()


def build_compatibility_matrix(conn, drugs: List[str]) -> pd.DataFrame:
    """
    Costruisce la matrice completa di compatibilità
    """
    print("\n📊 Costruendo matrice compatibilità...")
    
    # Crea DataFrame vuoto
    matrix = pd.DataFrame(index=drugs, columns=drugs)
    
    total = len(drugs) * len(drugs)
    current = 0
    
    for drug1 in drugs:
        for drug2 in drugs:
            current += 1
            
            if drug1 == drug2:
                # Stesso farmaco = sempre compatibile
                matrix.loc[drug1, drug2] = 'C'
            else:
                # Leggi compatibilità dal database
                compatibility = read_compatibility(conn, drug1, drug2)
                matrix.loc[drug1, drug2] = compatibility
            
            # Progress
            if current % 10 == 0:
                print(f"   Progresso: {current}/{total} ({current*100//total}%)")
    
    print(f"✅ Matrice completata: {len(drugs)}x{len(drugs)} celle")
    return matrix


# =============================================================================
# FUNZIONI GOOGLE SHEETS
# =============================================================================

def connect_to_google_sheets(credentials_file: str = None):
    """
    Connessione a Google Sheets
    
    SETUP:
    1. Vai su: https://console.cloud.google.com/
    2. Crea progetto nuovo
    3. Abilita Google Sheets API
    4. Crea credenziali (Service Account)
    5. Scarica JSON e salvalo come 'credentials.json'
    """
    try:
        if not credentials_file:
            credentials_file = 'credentials.json'
        
        scope = [
            'https://spreadsheets.google.com/feeds',
            'https://www.googleapis.com/auth/drive'
        ]
        
        creds = Credentials.from_service_account_file(credentials_file, scopes=scope)
        client = gspread.authorize(creds)
        
        print("✅ Connesso a Google Sheets")
        return client
        
    except Exception as e:
        print(f"❌ Errore connessione Google Sheets: {e}")
        print("\n📝 SETUP NECESSARIO:")
        print("1. Crea progetto Google Cloud: https://console.cloud.google.com/")
        print("2. Abilita Google Sheets API")
        print("3. Crea Service Account e scarica credentials.json")
        print("4. Condividi il foglio Google con l'email del service account")
        sys.exit(1)


def upload_to_google_sheets(client, spreadsheet_id: str, matrix: pd.DataFrame):
    """
    Carica la matrice su Google Sheets
    """
    try:
        # Apri foglio
        spreadsheet = client.open_by_key(spreadsheet_id)
        worksheet = spreadsheet.sheet1
        
        print("\n📤 Caricando dati su Google Sheets...")
        
        # Prepara dati: header + righe
        drugs = matrix.index.tolist()
        
        # Header row (prima riga con nomi farmaci)
        header = [''] + drugs
        
        # Data rows
        data = [header]
        for drug in drugs:
            row = [drug] + matrix.loc[drug].tolist()
            data.append(row)
        
        # Carica tutto in una volta
        worksheet.clear()
        worksheet.update(data, 'A1')
        
        # Formattazione
        print("🎨 Applicando formattazione...")
        
        # Header bold
        worksheet.format('A1:ZZ1', {'textFormat': {'bold': True}})
        worksheet.format('A1:A1000', {'textFormat': {'bold': True}})
        
        # Colori per compatibilità
        # C = Verde, Y = Giallo, I = Rosso, ! = Arancione, '' = Grigio
        
        print("✅ Dati caricati con successo!")
        print(f"🔗 Apri: {SPREADSHEET_URL}")
        
    except Exception as e:
        print(f"❌ Errore upload Google Sheets: {e}")


# =============================================================================
# EXPORT CSV (ALTERNATIVA SEMPLICE)
# =============================================================================

def export_to_csv(matrix: pd.DataFrame, filename: str = 'compatibility_matrix.csv'):
    """
    Esporta la matrice in CSV (alternativa semplice)
    """
    try:
        matrix.to_csv(filename)
        print(f"✅ Matrice esportata in: {filename}")
        print(f"📝 Puoi importarla manualmente in Google Sheets:")
        print(f"   File → Import → Upload → {filename}")
    except Exception as e:
        print(f"❌ Errore export CSV: {e}")


# =============================================================================
# MAIN
# =============================================================================

def main():
    print("=" * 70)
    print("🏥 EXPORT COMPATIBILITÀ FARMACI - PostgreSQL → Google Sheets")
    print("=" * 70)
    
    # 1. Connetti a PostgreSQL
    conn = connect_to_postgres()
    
    # 2. Leggi farmaci
    drugs = read_all_drugs(conn)
    
    if not drugs:
        print("❌ Nessun farmaco trovato nel database!")
        sys.exit(1)
    
    print(f"\n📋 Farmaci trovati:")
    for i, drug in enumerate(drugs, 1):
        print(f"   {i}. {drug}")
    
    # 3. Costruisci matrice compatibilità
    matrix = build_compatibility_matrix(conn, drugs)
    
    # 4. Chiudi connessione PostgreSQL
    conn.close()
    print("\n✅ Connessione PostgreSQL chiusa")
    
    # 5. Export
    print("\n" + "=" * 70)
    print("SCEGLI METODO EXPORT:")
    print("=" * 70)
    print("1. Google Sheets (automatico, richiede setup API)")
    print("2. CSV (semplice, import manuale)")
    print("3. Entrambi")
    
    choice = input("\nScelta (1/2/3): ").strip()
    
    if choice in ['1', '3']:
        # Export Google Sheets
        try:
            client = connect_to_google_sheets()
            upload_to_google_sheets(client, SPREADSHEET_ID, matrix)
        except Exception as e:
            print(f"⚠️ Export Google Sheets fallito: {e}")
            print("📝 Esporto in CSV come fallback...")
            export_to_csv(matrix)
    
    if choice in ['2', '3']:
        # Export CSV
        export_to_csv(matrix)
    
    print("\n" + "=" * 70)
    print("✅ COMPLETATO!")
    print("=" * 70)


if __name__ == "__main__":
    main()
