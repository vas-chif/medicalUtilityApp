#!/bin/bash

###############################################################################
# 🚀 Medical Utility Pro - Firebase Deploy Script
# 
# Questo script automatizza il processo di deploy su Firebase Hosting
# 
# Uso:
#   ./deploy-firebase.sh              # Deploy completo
#   ./deploy-firebase.sh --preview    # Deploy su preview channel
#   ./deploy-firebase.sh --rollback   # Rollback all'ultima versione
###############################################################################

set -e  # Exit on error

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║   🏥 Medical Utility Pro - Firebase Deploy                   ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check Firebase CLI
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}❌ Firebase CLI non installato!${NC}"
    echo -e "${YELLOW}Installa con: npm install -g firebase-tools${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Firebase CLI trovato: $(firebase --version)${NC}"

# Check if logged in
if ! firebase projects:list &> /dev/null; then
    echo -e "${RED}❌ Non sei loggato a Firebase!${NC}"
    echo -e "${YELLOW}Fai login con: firebase login${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Login Firebase verificato${NC}"

# Parse arguments
DEPLOY_MODE="production"
if [ "$1" == "--preview" ]; then
    DEPLOY_MODE="preview"
elif [ "$1" == "--rollback" ]; then
    DEPLOY_MODE="rollback"
fi

# Rollback mode
if [ "$DEPLOY_MODE" == "rollback" ]; then
    echo -e "${YELLOW}🔄 Rollback all'ultima versione...${NC}"
    firebase hosting:rollback
    echo -e "${GREEN}✅ Rollback completato!${NC}"
    exit 0
fi

# Pre-deploy checks
echo -e "\n${BLUE}📋 Pre-deploy checks...${NC}"

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js 18+ richiesto. Versione attuale: $(node -v)${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"

# Check dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules non trovato. Installazione dipendenze...${NC}"
    npm ci
fi
echo -e "${GREEN}✅ Dipendenze verificate${NC}"

# Run linter
echo -e "\n${BLUE}🔍 Running linter...${NC}"
npm run lint || {
    echo -e "${RED}❌ Linter ha trovato errori!${NC}"
    echo -e "${YELLOW}Vuoi continuare comunque? (y/n)${NC}"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        exit 1
    fi
}
echo -e "${GREEN}✅ Linter passed${NC}"

# Build application
echo -e "\n${BLUE}📦 Building application...${NC}"
echo -e "${YELLOW}Questo può richiedere 1-2 minuti...${NC}"

npm run build || {
    echo -e "${RED}❌ Build fallito!${NC}"
    exit 1
}

# Check build output
if [ ! -f "dist/spa/index.html" ]; then
    echo -e "${RED}❌ Build output non trovato: dist/spa/index.html${NC}"
    exit 1
fi

# Calculate build size
BUILD_SIZE=$(du -sh dist/spa | cut -f1)
echo -e "${GREEN}✅ Build completato! Dimensione: ${BUILD_SIZE}${NC}"

# Show build statistics
echo -e "\n${BLUE}📊 Build Statistics:${NC}"
echo "   Files: $(find dist/spa -type f | wc -l)"
echo "   JS files: $(find dist/spa -name '*.js' | wc -l)"
echo "   CSS files: $(find dist/spa -name '*.css' | wc -l)"
echo "   Images: $(find dist/spa -name '*.png' -o -name '*.jpg' -o -name '*.svg' | wc -l)"

# Deploy
echo -e "\n${BLUE}🚀 Starting Firebase deploy...${NC}"

if [ "$DEPLOY_MODE" == "preview" ]; then
    # Preview deploy
    CHANNEL_ID="preview-$(date +%Y%m%d-%H%M%S)"
    echo -e "${YELLOW}Deploying to preview channel: ${CHANNEL_ID}${NC}"
    firebase hosting:channel:deploy "$CHANNEL_ID" --expires 7d
else
    # Production deploy
    echo -e "${YELLOW}Deploying to PRODUCTION...${NC}"
    firebase deploy --only hosting -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Deploy success
echo -e "\n${GREEN}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║   ✅ Deploy completato con successo!                          ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Get project info
PROJECT_ID=$(firebase use | grep 'Now using project' | awk '{print $NF}' || echo "unknown")

if [ "$DEPLOY_MODE" == "preview" ]; then
    echo -e "${BLUE}🔗 Preview URL sarà mostrato sopra${NC}"
    echo -e "${YELLOW}💡 Il preview scade dopo 7 giorni${NC}"
else
    echo -e "${BLUE}🔗 App URL:${NC}"
    echo "   https://${PROJECT_ID}.web.app"
    echo "   https://${PROJECT_ID}.firebaseapp.com"
    echo ""
    echo -e "${BLUE}📊 Console URL:${NC}"
    echo "   https://console.firebase.google.com/project/${PROJECT_ID}/hosting"
fi

echo -e "\n${GREEN}🎉 Deploy completato!${NC}"

# Post-deploy tips
echo -e "\n${BLUE}💡 Tips:${NC}"
echo "   • Testa l'app: apri l'URL nel browser"
echo "   • Verifica statistiche: vai su Firebase Console"
echo "   • Hard refresh browser: Ctrl+Shift+R (per vedere nuova versione)"
echo "   • Rollback: ./deploy-firebase.sh --rollback"
