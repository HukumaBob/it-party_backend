Here is the translated text with the markdown format preserved:

# ITparty Backend

## Project Description

itParty is a web application developed with Django DRF and React JS that allows users to register for various events.

## Installation and Project Launch

### Requirements

- Python 3.11 or higher
- pip (Python Package Installer)

### Installation Steps

1. **Clone the repository**

   First, clone the repository to your local computer using git.

   ```bash
   git clone https://github.com/hukumabob/hackathon.git
   ```

2. **Create a virtual environment**

   Navigate to the project directory and create a Python virtual environment using the command:

   ```bash
   cd backend
   python -m venv venv
   ```

3. **Activate the virtual environment**

   Activate the virtual environment using the following command:

   - On Windows:

     ```bash
     . \venv\Scripts\activate
     ```

   - On Unix or MacOS:

     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**

   Install all necessary dependencies listed in the `requirements.txt` file using pip:

   ```bash
   pip install -r requirements.txt
   ```

5. **Initialize the database**

   Apply all Django migrations to initialize the database:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
   and collect static files

   ```
   python manage.py collectstatic
   ```

   Create a superuser:

   ```bash
   python manage.py createsuperuser
   ```

6. **Generate initial data**

   Run the command to generate initial data:

   ```bash
   python manage.py generate_initial_data
   ```

7. **Generate initial users and profiles**

   Run the command to generate initial users:

   ```bash
   python manage.py generate_initial_users
   ```

   and users with profiles

   ```bash
   python manage.py generate_initial_data_users_profile
   ```

8. **Generate initial events**

   Run the command to generate initial events:

   ```bash
   python manage.py generate_initial_events
   ```

9. **Start the server**

   Run the Django server on the default port 8000:

   ```bash
   python manage.py runserver
   ```
   The Django MVT admin panel works at

   ```
   http://localhost:8000/mvt_admin/
   ```
10. **Set up Celery**

Install Redis (for Windows, WSL is required), and start it

```bash
redis-server
redis-cli
```

Start Celery:

```bash
celery -A backend worker -l info -P eventlet
celery -A backend beat --loglevel=info
```

After completing these steps, you should have a working instance of hackathon available at `http://localhost:8000`.

Populate the required initial data through the Django admin panel: `http://localhost:8000/admin`

11. **Run the application via Docker Compose**

## Running the application via Docker Compose on the default port 8000:

```bash
cd infra/
docker compose up # sudo service redis-server stop - if the port is occupied
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py collectstatic
docker compose exec backend cp -r /app/static/. /static/
docker compose exec backend python manage.py generate_initial_data
# If you want to add test data, also run this:
docker compose exec backend python manage.py generate_initial_users
docker compose exec backend python manage.py generate_initial_data_users_profile
docker compose exec backend python manage.py generate_initial_events
# ___________________________________________________________
docker compose exec backend python manage.py createsuperuser
```

## Remote Server:

### Nginx proxy server:
```
server {
    server_name example.ddns.net;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/example.ddns.net/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/example.ddns.net/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = example.ddns.net) {
        return 301 https://$host$request_uri;
    } # managed by Certbot



    listen 80;
    server_name example.ddns.net;
    return 404; # managed by Certbot
}

```

## API Documentation

API documentation can be found at `http://localhost:8000/swagger`.

## Testing

To run the tests, use the following command:

```bash
python manage.py test
```

## Support

If you encounter any issues or have questions, please create an issue in this repository.

## License

itParty is open-source software licensed under the [MIT license](LICENSE).