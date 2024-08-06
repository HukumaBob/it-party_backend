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

# Копируется результаты сборки в каталог result_build///
# RUN cp -r build result_build
# Эта команда запустит встроенный сервер на Node.js, который будет раздавать
# содержимое директории /app/build на порте 8000
CMD ["npx", "-y", "http-server", "-p", "8000", "/app/build"]