#!/usr/bin/env python3
"""
Crea embeddings ChromaDB per Medical Utility Project
"""
import chromadb
from chromadb.utils import embedding_functions
import os
from pathlib import Path
import hashlib

# Configurazione
PROJECT_ROOT = Path("/home/nyk-ai/projects/medicalUtility")
CHROMA_PATH = Path.home() / "data" / "chromadb"
COLLECTION_NAME = "medicalutility"

# File da indicizzare
INCLUDE_PATTERNS = [
    "src/**/*.ts",
    "src/**/*.vue",
    "src/**/*.js",
    "*.md",
]

EXCLUDE_PATTERNS = [
    "node_modules",
    "dist",
    ".git",
    "*.log",
    ".quasar"
]

def create_embeddings():
    print(f"🔥 Creazione embeddings per {PROJECT_ROOT}")
    
    # Inizializza ChromaDB
    client = chromadb.PersistentClient(path=str(CHROMA_PATH))
    
    # Usa embedding function di default
    embedding_fn = embedding_functions.DefaultEmbeddingFunction()
    
    # Crea o ottieni collection
    try:
        collection = client.get_collection(
            name=COLLECTION_NAME,
            embedding_function=embedding_fn
        )
        print(f"📚 Collection '{COLLECTION_NAME}' già esistente")
        # Cancella vecchi dati
        client.delete_collection(COLLECTION_NAME)
        print("🗑️ Vecchia collection cancellata")
    except:
        print(f"�� Creazione nuova collection '{COLLECTION_NAME}'")
    
    collection = client.create_collection(
        name=COLLECTION_NAME,
        embedding_function=embedding_fn
    )
    
    # Raccogli tutti i file (usa set per evitare duplicati)
    files_to_index = set()
    
    for pattern in INCLUDE_PATTERNS:
        for file_path in PROJECT_ROOT.glob(pattern):
            # Salta file esclusi
            if any(excl in str(file_path) for excl in EXCLUDE_PATTERNS):
                continue
            
            if file_path.is_file():
                files_to_index.add(file_path)
    
    # Converti set in list ordinata
    files_to_index = sorted(list(files_to_index))
    
    print(f"📁 Trovati {len(files_to_index)} file da indicizzare")
    
    # Indicizza file
    documents = []
    metadatas = []
    ids = []
    
    for i, file_path in enumerate(files_to_index):
        try:
            # Leggi contenuto
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Chunk grandi file (max 1000 caratteri per chunk)
            chunk_size = 1000
            if len(content) > chunk_size:
                chunks = [content[i:i+chunk_size] for i in range(0, len(content), chunk_size)]
                for j, chunk in enumerate(chunks):
                    # Crea ID univoco usando hash del path + chunk index
                    file_hash = hashlib.md5(str(file_path).encode()).hexdigest()[:8]
                    unique_id = f"{file_hash}_{j}"
                    
                    documents.append(chunk)
                    metadatas.append({
                        "file_path": str(file_path.relative_to(PROJECT_ROOT)),
                        "chunk": j,
                        "total_chunks": len(chunks),
                        "file_type": file_path.suffix
                    })
                    ids.append(unique_id)
            else:
                # File piccolo, 1 chunk solo
                file_hash = hashlib.md5(str(file_path).encode()).hexdigest()[:8]
                unique_id = f"{file_hash}_0"
                
                documents.append(content)
                metadatas.append({
                    "file_path": str(file_path.relative_to(PROJECT_ROOT)),
                    "chunk": 0,
                    "total_chunks": 1,
                    "file_type": file_path.suffix
                })
                ids.append(unique_id)
            
            print(f"✅ {file_path.relative_to(PROJECT_ROOT)}")
        
        except Exception as e:
            print(f"❌ Errore {file_path}: {e}")
    
    # Aggiungi a ChromaDB
    print(f"\n💾 Salvataggio {len(documents)} chunks in ChromaDB...")
    collection.add(
        documents=documents,
        metadatas=metadatas,
        ids=ids
    )
    
    print(f"\n🎉 COMPLETATO! Collection '{COLLECTION_NAME}' creata con {len(documents)} chunks")
    print(f"📍 Path ChromaDB: {CHROMA_PATH}")

if __name__ == "__main__":
    create_embeddings()
