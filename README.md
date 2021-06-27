# Projeto Digi-Ask

https://digi-ask.web.app/

## Node modules
* node 
* npm
* yarn

## Comandos utilizados

### Consultas de versões

`node --version`
`npm --version`
`yarn -version`

Caso haja erro ao executar comandos no Powershell
`Set-ExecutionPolicy RemoteSigned`

### Corrigindo erros de instalação de pacotes
`npm config set cache "C:\Users\NOME~1\AppData\Roaming\npm-cache" --global`

### Criar app
`yarn create react-app digi-ask --template typescript`
`npx create-react-app digi-ask --template typescript`

### Removendo arquivos não necessários após criar aplicação
* public\*.* exceto index.html
* scr\App.css, App.test.tsx, Index.css, logo.svg, reportWebVitals.ts, setupTests.ts


### Iniciando aplicação para desenvolvimento
`yarn install` ou
`npm install`

### Executando a aplicação
`yarn start`
`npm run start` ??

### Adicionar pacote de manipulação de classes css

`yarn add classnames`


## Configuração do Firebase Hosting

`npm install -g firebase-tools`

`firebase login`

`firebase init`

## Build
`yarn build`

`firebase deploy`

### Sites úteis
* https://whimsical.com
* https://www.figma.com
* https://notion.so
* https://console.firebase.google.com/
