#!/bin/bash

# Define the output directory and file
OUTPUT_DIR="src/environments"
OUTPUT_FILE="$OUTPUT_DIR/environment.ts"

# Ensure the directory exists
mkdir -p "$OUTPUT_DIR"

# Generate the environment.ts file
cat > "$OUTPUT_FILE" <<EOL
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "${FIREBASE_API_KEY}",
    authDomain: "${FIREBASE_AUTH_DOMAIN}",
    projectId: "${FIREBASE_PROJECT_ID}",
    storageBucket: "${FIREBASE_STORAGE_BUCKET}",
    messagingSenderId: "${FIREBASE_MESSAGING_SENDER_ID}",
    appId: "${FIREBASE_APP_ID}",
    measurementId: "${FIREBASE_MEASUREMENT_ID}"
  }
};
EOL

echo "environment.ts file generated successfully."
