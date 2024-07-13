FROM python:3.11

WORKDIR /app
COPY . .
RUN pip install gunicorn==21.2.0
RUN pip install -r requirements.txt --no-cache-dir
CMD ["gunicorn", "--bind", "0:8000", "backend.wsgi"]
