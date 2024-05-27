# hackathon Backend

## Описание проекта

itParty - это веб-приложение, разработанное на Django DRF и React JS которое позволяет пользователям регистрироваться на различные ивенты.

## Установка и запуск проекта

### Требования

- Python 3.11 или выше
- pip (Python Package Installer)

### Шаги для установки

1. **Клонирование репозитория**

   Сначала клонируйте репозиторий на ваш локальный компьютер с помощью git.

   ```bash
   git clone https://github.com/hukumabob/hackathon.git
   ```

2. **Создание виртуального окружения**

   Перейдите в каталог проекта и создайте виртуальное окружение Python с помощью команды:

   ```bash
   cd backend
   python -m venv venv
   ```

3. **Активация виртуального окружения**

   Активируйте виртуальное окружение с помощью следующей команды:

   - На Windows:

     ```bash
     . \venv\Scripts\activate
     ```

   - На Unix или MacOS:

     ```bash
     source venv/bin/activate
     ```

4. **Установка зависимостей**

   Установите все необходимые зависимости, указанные в файле `requirements.txt`, с помощью pip:

   ```bash
   pip install -r requirements.txt
   ```

5. **Инициализация базы данных**

   Примените все миграции Django для инициализации базы данных:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
   и соберите статические файлы
   
   ```
   python manage.py collectstatic
   ```

   Создайте суперюзера:

   ```bash
   python manage.py createsuperuser
   ```

6. **Генерация начальных данных**

   Запустите команду для генерации начальных данных:

   ```bash
   python manage.py generate_initial_data
   ```

7. **Генерация начальных пользователей и профилей**

   Запустите команду для генерации начальных пользователей:

   ```bash
   python manage.py generate_initial_users
   ```

   и юзеров с профилями

   ```bash
   python manage.py generate_initial_data_users_profile
   ```

8. **Генерация начальных ивентов**

   Запустите команду для генерации начальных ивентов:

   ```bash
   python manage.py generate_initial_events
   ```

9. **Запуск сервера**

   Запустите сервер Django на стандартном порту 8000:

   ```bash
   python manage.py runserver
   ```
   Админка на MVT Django работает по адресу
   ```
   http://localhost:8000/mvt_admin/
   ```
10. **Настройка Celery**

Установите Redis (для Windows потребуется WSL), запустите его

```bash
redis-server
redis-cli
```

Запустите Celery:

```bash
celery -A backend worker -l info -P eventlet
celery -A backend beat --loglevel=info
```

После выполнения этих шагов вы должны иметь работающий экземпляр hackathon, доступный по адресу `http://localhost:8000`.

Заполните нужные начальные данные через админку Django: `http://localhost:8000/admin`

11. **Запуск приложения через Docker Compose**

Запуск приложения через Docker Compose на стандартном порту 8000:

```bash
cd infra/
docker compose up
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py collectstatic
docker compose exec backend cp -r /app/static/. /static/
docker compose exec backend python manage.py generate_initial_data
# Если хотите добавить тестовые данные запустите и это:
docker compose exec backend python manage.py generate_initial_users
docker compose exec backend python manage.py generate_initial_data_users_profile
docker compose exec backend python manage.py generate_initial_events
# ___________________________________________________________
docker compose exec backend python manage.py createsuperuser
```

## Документация API

Документацию API можно найти по адресу `http://localhost:8000/swagger`.

## Тестирование

Для запуска тестов используйте следующую команду:

```bash
python manage.py test
```

## Поддержка

Если у вас возникли проблемы или вопросы, пожалуйста, создайте issue в этом репозитории.

## Лицензия

itParty является открытым исходным кодом, лицензированным под [MIT license](LICENSE).
