from datetime import timedelta
from django.utils.translation import gettext_lazy as _
from pathlib import Path
import environ


env = environ.Env()
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(BASE_DIR / '.env')


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY', default="secret_key")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

AUTH_USER_MODEL = 'users.User'

ALLOWED_HOSTS = env('ALLOWED_HOSTS', default='').split()

# Application definition

INSTALLED_APPS = [
    'widget_tweaks',
    'daphne',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'drf_yasg',  # Подключен swagger
    'rest_framework',
    'djoser',  # JWT аутентификация
    'django_filters',
    'social_django',  # Возможность регистрации через Yandex ID
    'corsheaders',   # Совместимость с фронтом
    'channels', # Для мессенджера

    'users',
    'additions',
    'events',
    'userevents',
    'organaizer',
    'event_chat',
    'mvt_admin',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React app address
    "http://197.0.0.1:3000",  # Also add this if you are using Docker
    "http://197.0.0.1:8000",     
]

ROOT_URLCONF = 'backend.urls'
TEMPLATES_DIR = BASE_DIR / 'templates'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATES_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',                
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

if DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
            # тест для проверки event_chat
            "TEST": {
                "NAME": BASE_DIR / "db_test.sqlite3",
            },            
        }
        # 'default': {
        #     'ENGINE': 'django.db.backends.postgresql',
        #     'NAME': 'postgres',
        #     'USER': 'postgres',
        #     'PASSWORD': 'postgres',
        #     'HOST': 'localhost', 
        #     'PORT': '5432',
        # }    
    }
    CELERY_BROKER_URL = 'redis://localhost:6379/0'
else:
    DATABASES = {
        'default': {
            'ENGINE': env('POSTGRES_ENGINE', default='django.db.backends.postgresql'),
            'NAME': env('POSTGRES_DB', default='postgres'),
            'USER': env('POSTGRES_USER', default='postgres'),
            'PASSWORD': env('POSTGRES_PASSWORD', default='postgres'),
            'HOST': env('POSTGRES_HOST', default='db'), 
            'PORT': env('POSTGRES_PORT', default='5432'),
        }
    }
    CELERY_BROKER_URL = 'redis://redis:6379/0'




# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

LANGUAGES = [
    ('en', _('English')),
    ('ru', _('Russian')),
]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 100
}

SIMPLE_JWT = {
   'AUTH_HEADER_TYPES': ('Bearer',),
   "ACCESS_TOKEN_LIFETIME": timedelta(days=7),
   "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
}

DJOSER = {
    #  'PASSWORD_RESET_CONFIRM_URL': '#api/v1/password/reset/confirm/{uid}/{token}',
    'PASSWORD_RESET_CONFIRM_URL': 'api/v1/password/reset/confirm/{uid}/{token}',
    #  'USERNAME_RESET_CONFIRM_URL': '#/username/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': 'api/v1/username/reset/confirm/{uid}/{token}',
    # 'ACTIVATION_URL': '#/activate/{uid}/{token}',  #  Регистрация на стороне клиента
    'ACTIVATION_URL': 'api/v1/activate/{uid}/{token}',  #  Регистрация на стороне сервера
    'SEND_ACTIVATION_EMAIL': True,
    'SERIALIZERS': {'user_create': 'users.serializers.UserSerializer', },
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = env('EMAIL_HOST_USER', default="")
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD', default="")
#  Для Гугла требуются пляски с бубном - надо получить App password
#  https://support.google.com/accounts/answer/185833?hl=en

EMAIL = {
    'activation': 'djoser.email.ActivationEmail',
    'confirmation': 'djoser.email.ConfirmationEmail',
    'password_reset': 'djoser.email.PasswordResetEmail',
    'password_changed_confirmation': 'djoser.email.PasswordChangedConfirmationEmail',
    'username_changed_confirmation': 'djoser.email.UsernameChangedConfirmationEmail',
    'username_reset': 'djoser.email.UsernameResetEmail',
}

AUTHENTICATION_BACKENDS = (
    'social_core.backends.yandex.YandexOAuth2',
    # 'social_core.backends.google.GoogleOAuth2',
    # 'social_core.backends.facebook.FacebookOAuth2',
    # 'social_core.backends.twitter.TwitterOAuth',
    'django.contrib.auth.backends.ModelBackend',
)

SOCIAL_AUTH_YANDEX_OAUTH2_KEY = env(
    'SOCIAL_AUTH_YANDEX_OAUTH2_KEY', default=""
    )
SOCIAL_AUTH_YANDEX_OAUTH2_SECRET = env(
    'SOCIAL_AUTH_YANDEX_OAUTH2_SECRET', default=""
    )

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

ASGI_APPLICATION = 'backend.asgi.application'

# CHANNEL_LAYERS = {
#     'default': {
#         'BACKEND': 'channels.layers.InMemoryChannelLayer',
#     },
# }
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6379)],
        },
    },
}