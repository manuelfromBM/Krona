@echo off
cd /d "%~dp0"

echo Hola, estas iniciando la ejecucion de KRONA APP
echo Se desplegaran el frontend en localhost:3000 y backend en localhost:3001

pnpm turbo run dev --filter=web --filter=@krona/backend

