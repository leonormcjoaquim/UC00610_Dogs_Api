# Cães API

Aplicação React criada com Vite para a UC00610 para consolidar o aprendido sobre React e "noSql". A aplicação foi criada em torno de duas API's públicas:

- [Dog Api by CEO](https://dog.ceo/dog-api/) - Utilizada apenas para as imagens
- [Dog Api by Kinduff](https://dogapi.dog/) - Utilizada para todos os factos e descrições dos cães

## Requisitos

- Node.js >= 18
- npm

## Instalação

Instalar todas as dependências com:

```bash
npm install
```

## Correr projeto localmente

Arranca o servidor com:

```bash
npm run dev
```

Abre o URL indicado no terminal (por defeito `http://localhost:5173`).

Ou, pode sempre ver o projeto a correr live através de vercel aqui:

[CaoPanheiros](https://uc-00610-dogs-api-4b24.vercel.app/)

## Estrutura

```bash
caes-api
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   ├─ README.md
   ├─ src
   │  ├─ App.css                #guarda o css usado na aplicação inteira
   │  ├─ App.jsx
   │  ├─ assets                 #imagens
   │  │  ├─ dog.png             
   │  │  └─ pata.png
   │  ├─ components
   │  │  ├─ EsqueletoCao.jsx    # componente que aparece quando está "loading" os cães
   │  │  ├─ Footer.jsx          #footer 
   │  │  ├─ Hero.jsx            #secção Hero na página inicial
   │  │  ├─ Navbar.jsx          #Navbar 
   │  │  └─ ScrollTopo.jsx      #Componente para mudar para o topo da página 
   │  ├─ css
   │  │  ├─ dogs.css            #estilos para cães
   │  │  ├─ esqueletoCao.css    #estilos para loading cães
   │  │  ├─ footer.css          #estilos para footer
   │  │  ├─ funfacts.css        #estilos para os funFacts
   │  │  ├─ hero.css            #estilos para secção hero
   │  │  └─ navbar.css          #estilos para navbar
   │  ├─ main.jsx
   │  └─ pages 
   │     ├─ Dog.jsx             #Página dos cães 
   │     ├─ DogDetails.jsx      #Página para detalhes dos cães
   │     └─ FunFacts.jsx        #Página para funfacts
   └─ vite.config.js

```
