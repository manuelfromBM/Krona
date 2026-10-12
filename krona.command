#!/bin/bash

# Ir a la carpeta donde está este script
cd "$(dirname "$0")" || exit 1

echo "Hola, estás iniciando la ejecución de KRONA APP"
echo "Se desplegarán el frontend en localhost:3000 y backend en localhost:3001"

pnpm turbo run dev --filter=web --filter=@krona/backend