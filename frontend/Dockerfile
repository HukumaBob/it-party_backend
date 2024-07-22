FROM node:lts-alpine as build

# создание рабочего каталога
WORKDIR /app

# копируются файлы package.json & package-lock.json
COPY package*.json ./

# установка зависимостей
RUN npm install

# копируются остальные файлы проекта
COPY . .

# сборка приложения в build для production
RUN npm run build

# Скопируйте результаты сборки в новый каталог
RUN cp -r build result_build