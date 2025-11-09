#!/bin/bash

FILE="src/firebase/useSecureFirestore.ts"

# Remove incrementReads/Writes/Deletes lines
sed -i '/^\s*incrementReads\|^\s*incrementWrites\|^\s*incrementDeletes/d' "$FILE"

# Remove alertLevel from return
sed -i '/^\s*alertLevel,$/d' "$FILE"

# Fix require() to import
sed -i 's/const { writeBatch } = require/\/\/ const { writeBatch } = require/' "$FILE"

echo "Done! Check $FILE for remaining type errors."
