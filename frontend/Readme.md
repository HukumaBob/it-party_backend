Проект, создан с использованием [Vite](https://vitejs.dev/) и [React](https://reactjs.org/).

## Начало работы

### Системные требования:

- [Node.js](https://nodejs.org/) (версия 18)
- [npm](https://www.npmjs.com/)

### Установка пакетов:

   ```sh
   npm install
   ```

### Запуск сервера для разработки:

```sh
npm start
# or
npm run start
```

The application will be available at `http://localhost:3000`.

### Изменение порта

Файл vite.config.js в корневом каталоге:

```js
export default defineConfig({
  server: {
    port: 3000, // Change this to your desired port
  },
})
```

### Сборка проекта для Production:

```sh
npm run build
```

Выходные файлы сборки будут находиться в директории build.

### Просмотр Production сборки(в папке build)

```sh
npm run preview
```

Это запустит локальный сервер для просмотра собранных файлов.

### Линтинг и форматирование

В этом проекте используются ESLint и Prettier для линтинга и форматирования. Чтобы запустить ESLint:

```sh
npm run lint
```

Чтобы автоматически исправить ошибки линтинга и форматирования, выполните:

```sh
npm run lint:fix
```

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)
