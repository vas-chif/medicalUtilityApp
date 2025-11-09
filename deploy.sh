#!/bin/bash

###############################################################################
# 🚀 DEPLOY SCRIPT - Medical Utility Pro
# 
# Automatizza il processo di deployment su Firebase
# Usa: ./deploy.sh [dev|prod]
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Check environment parameter
ENV=${1:-dev}

if [ "$ENV" != "dev" ] && [ "$ENV" != "prod" ]; then
    print_error "Ambiente non valido: $ENV"
    echo "Uso: ./deploy.sh [dev|prod]"
    exit 1
fi

print_header "🚀 DEPLOYMENT MEDICAL UTILITY PRO - ${ENV^^}"

# Step 1: Check if .env file exists
print_info "Step 1/6: Verifica file .env.$ENV..."
if [ ! -f ".env.$ENV" ]; then
    print_error "File .env.$ENV non trovato!"
    exit 1
fi
print_success "File .env.$ENV trovato"

# Step 2: Copy environment file
print_info "Step 2/6: Copia .env.$ENV → .env..."
cp ".env.$ENV" .env
print_success "File .env configurato per ${ENV^^}"

# Step 3: Clean previous build
print_info "Step 3/6: Pulizia build precedente..."
if [ -d "dist" ]; then
    rm -rf dist
    print_success "Cartella dist/ rimossa"
else
    print_info "Nessuna build precedente da rimuovere"
fi

# Step 4: Build production
print_header "📦 BUILD PRODUCTION"
print_info "Step 4/6: Eseguo yarn build..."
yarn build

if [ $? -eq 0 ]; then
    print_success "Build completato con successo!"
else
    print_error "Build fallito!"
    exit 1
fi

# Step 5: Preview (optional for dev)
if [ "$ENV" = "dev" ]; then
    print_header "🔍 PREVIEW LOCALE"
    print_info "Step 5/6: Preview disponibile con: firebase serve"
    print_info "Vuoi fare preview locale? (y/n)"
    read -r -p "> " response
    
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_info "Avvio firebase serve..."
        print_info "Apri http://localhost:5000 nel browser"
        print_info "Premi CTRL+C per terminare e continuare il deploy"
        firebase serve
    fi
else
    print_info "Step 5/6: Skipping preview (production mode)"
fi

# Step 6: Deploy to Firebase
print_header "🚀 DEPLOY SU FIREBASE"
print_info "Step 6/6: Deploy in corso..."

if [ "$ENV" = "prod" ]; then
    print_info "⚠️  ATTENZIONE: Stai per fare deploy in PRODUCTION!"
    print_info "Continuare? (y/n)"
    read -r -p "> " response
    
    if [[ ! "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_error "Deploy annullato dall'utente"
        exit 0
    fi
fi

firebase deploy --only hosting

if [ $? -eq 0 ]; then
    print_success "Deploy completato con successo!"
    
    # Show deployment info
    print_header "📊 INFORMAZIONI DEPLOYMENT"
    
    if [ "$ENV" = "prod" ]; then
        print_info "🌍 Ambiente: PRODUCTION"
        print_info "🔥 Remote Logging: ENABLED"
        print_info "📊 Analytics: ENABLED"
    else
        print_info "🌍 Ambiente: DEVELOPMENT"
        print_info "🔥 Remote Logging: DISABLED (costi = 0€)"
        print_info "📊 Analytics: DISABLED"
    fi
    
    print_info ""
    print_info "Apri Firebase Console per vedere il deployment:"
    print_info "https://console.firebase.google.com"
    
else
    print_error "Deploy fallito!"
    exit 1
fi

print_header "✅ DEPLOYMENT COMPLETATO"
