# Servidor De Mapas

Instalación de herramientas de desarrollo

Requisitos previos entender terminal y haber utilizado npm antes

    1. Instalar Chocolatey
Abrir Terminal PowerShell con permisos administrativos

Instalar chocolatey (Gestión De Instalación de paquetes o aplicativos)

Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

Instalar Gestor De Versiones De NodeJS 

choco install nvm.install
Reiniciar el computador

Abrir Terminal PowerShell con permisos administrativos y instalamos nodejs con:

nvm install 14.19.3
nvm use 14.19.3

En la carpeta del codigo en la terminal y ingresamos npm install

Adecuar librerias :)
    npm install

start a development server (available at http://localhost:3000):

    npm start

To generate a build ready for production:

    npm run build src

Then deploy the contents of the `dist` directory to your server.  You can also run `npm run serve` to serve the results of the `dist` directory for preview.

open in windows explorer and copy files


ftp://odhdn@files.000webhost.com/public_html/
Asde345