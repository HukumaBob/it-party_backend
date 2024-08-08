FROM node:lts-alpine as build

# создается рабочий каталог
WORKDIR /app

# Копируется package.json & package-lock.json
COPY package*.json ./

# Устанавливаются зависимости
RUN npm i

# Копируются остальные файлы проекта
COPY index.html .
COPY src/ src/
COPY .eslintrc.cjs .
COPY tsconfig* .
COPY vite.config.ts .

# Сборка проекта в папку build при помощи vite
RUN npm run build
