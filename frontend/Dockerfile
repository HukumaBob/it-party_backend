# Используйте базовый образ Node.js
FROM node:lts-alpine as build

# Установите рабочий каталог
WORKDIR /app

# Скопируйте package.json и package-lock.json
COPY package*.json ./

# Скопируйте предварительно собранные зависимости
COPY node_modules ./node_modules

# Скопируйте остальные файлы проекта
COPY . .

# Запустите сборку вашего приложения
RUN npm run build

# Скопируйте результаты сборки в новый каталог
RUN cp -r build result_build