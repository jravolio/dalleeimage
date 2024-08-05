# Use uma imagem base oficial do Node.js
FROM node:18-alpine

# Crie um diretório de trabalho
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código do aplicativo
COPY . .

# Exponha a porta na qual a aplicação rodará
EXPOSE 3000

# Comando para iniciar o aplicativo Next.js
CMD ["npm", "run", "dev"]
