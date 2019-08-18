---
path: "/djang-admin-heroku"
date: "2017-03-28"
title: "기존 DB에 Django admin 연결하기"
tags: ['Django', 'Heroku']
excerpt: "MySQL을 연결하여 Django admin에서 DB를 관리하고 Heroku에 배포해봅시다."
type: ""
---

## 0. django 프로젝트 만들기

먼저 가상환경을 활성화하고 admin 페이지를 서빙해줄 django 프로젝트를 만들어주세요.

~~~
$ python -m venv myvenv
$ source myvenv/bin/activate

(myvenv) $ pip install django
(myvenv) $ django-admin startproject projectname
(myvenv) $ cd projectname
(myvenv) $ git init
(myvenv) $ django-admin startapp appname
(myvenv) $ python manage.py migrate
(myvenv) $ python manage.py createsuperuser
~~~

heroku는 git에 푸시된 내용을 기준으로 서버에 업데이트 되기 때문에 git init 을 꼭 해줍니다.

'.gitignore'도 추가해줍니다.

~~~
/*.gitignore*/
venv
*.pyc
staticfiles
.env
~~~

'requirements.txt' 도 당연히 만들어야겠죠. gunicorn 까지 설치해준 뒤 루트 디렉토리가 있는 위치에서 requirements.txt를 만들어줍니다.

~~~
$ pip install gunicorn
$ pip freeze > requirements.txt
~~~

---

## 1. Procfile 만들기

heroku는 Procfile 이라고 하는 파일이 꼭 있어야합니다. Procfile은 배포하고자 하는 앱의 루트 디렉토리에 있어야하며(django 프로젝트의 경우 manage.py가 있는 경로), 앱을 시작할 때 어떤 커맨드가 실행되어야할지 명시해주는 역할을 합니다. [출처: Define a Procfile](https://devcenter.heroku.com/articles/getting-started-with-python#define-a-procfile)

- Procfile

~~~
web: gunicorn projectname.wsgi --log-file -
~~~

- Procfile.windows

~~~
web: python manage.py runserver 0.0.0.0:5000
~~~

---

## 2. Static 처리하기

django는 정적 파일을 서빙해주지 않습니다.([출처](https://devcenter.heroku.com/articles/django-assets)) 이 작업을 대신 해주는 whitenoise 라는 것이 있습니다. [WhiteNoise](http://whitenoise.evans.io/en/stable/)

~~~
$ pip install whitenoise
~~~

그리고 django 앱의 settings.py를 아래와 같이 설정해줍니다.

~~~python
# settings.py

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
~~~

1. 공식문서에는 STATICFILES_DIRS를 지정하지만 이부분을 주석처리해야 정상적으로 작동합니다. [StackOverflow](http://stackoverflow.com/questions/41904685/oserror-errno-2-no-such-file-or-directory-tmp-makecalls-static)
2. Whitenoise-Django 공식문서 : http://whitenoise.evans.io/en/stable/django.html

wsgi.py 파일에도 whitenoise 관련된 설정을 아래와 같이 해줍니다.

~~~python
# wsgi.py

from django.core.wsgi import get_wsgi_application
from whitenoise.django import DjangoWhiteNoise

application = get_wsgi_application()
application = DjangoWhiteNoise(application)
~~~

설정이 끝나면 manage.py가 있는 경로에 static 디렉토리를 생성해줍니다. 주의할 점은 git에 빈 디렉토리는 관리대상이 아니기 때문에 아무 파일이나 넣고 커밋을 해주어야 합니다. heroku 서버에서는 git을 기준으로 서버를 업데이트하기 때문입니다.

이제 모든 준비는 끝났습니다.

---

## 3. 배포하기

~~~
heroku login
heroku create
heroku buildpacks:set heroku/python
~~~

프로젝트가 파이썬 기반임을 buildpacks 커맨드를 통해 알려줘야합니다.

~~~
$ git push heroku master
$ heroku open
~~~

이렇게 하면 정상적으로 django의 It worked! 페이지를 볼 수 있습니다.

---

## 4. DB 연결하기

django는 db가 mysql일 경우, mysqlclient를 추천하고 있습니다. 아래와 같이 설치해주세요.

~~~
$ pip install mysqlclient
~~~

그리고 settings.py에 아래와 같이 DB를 설정해줍니다.

~~~python
# settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '테이블이름',
        'HOST': '서버 호스트 주소',
        'PORT': '3306',
        'USER': 'root 또는 설정한 사용자 이름',
        'PASSWORD': 'db 비밀번호',
    }
}
~~~

이제 django에서 아주 유용한 inspectdb 기능을 쓸 차례인데요. 이 명령어 하나만으로 models.py의 내용이 자동으로 채워집니다. 그 다음 migration해주면 DB세팅은 끝나게 됩니다.

~~~
$ python manage.py inspectdb > appname/models.py

$ python manage.py makemigrations
$ python manage.py migrate
~~~

---

## 5. ALLOWED_HOSTS 추가하기

heroku open 커맨드로 사이트를 열었을 때, url이 자동생성되어 제공됩니다. 보통 '형용사+명사.herokuapp.com' 의 형태로 이루어져 있습니다. 이 url을 django settings.py에서 아래와 같이 접근 가능한 host에 추가해주세요.

~~~python
# settings.py 에 추가
ALLOWED_HOSTS = [u'mysitename.herokuapp.com', 'localhost']
~~~

---

## 6. 커밋하기

이제 git 에 커밋하여 결과물을 확인할 단계만 남았습니다.

~~~
$ git add .
$ git commit -m "..."
$ git push heroku master
~~~

* heroku 샘플 django프로젝트 레포 참고 https://github.com/heroku/python-getting-started/blob/master/gettingstarted/settings.py

~~~
$ heroku local
$ heroku open
~~~

`heroku local`은 로컬에서 확인하는 것이고 `heroku open`은 url로 접근할 수 있습니다. 로컬에서 확인할 경우, 0.0.0.0:5000은 접속되지 않지만 localhost:5000으로 접근하면 화면이 보여집니다.

---

## 7. admin.py 설정하기

localhost:5000/admin 으로 들어가서 superuser로 로그인하면 admin페이지가 보이지만 DB테이블이 보이지 않습니다. admin.py에서 모델 클래스를 등록을 해줘야 하기 떄문입니다. django 앱의 admin.py 파일에 가서 아래와 같이 테이블의 컬럼을 추가해주세요. list_display 에 있는 내용만 admin 페이지에서 보이게 됩니다.

~~~python
# admin.py

from django.contrib import admin
from .models import *
from django.contrib.auth.models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'name', 'datetime']
    list_display_link = ['name']

...
~~~

- [Configuring Django Apps for Heroku](https://devcenter.heroku.com/articles/django-app-configuration)
- [Concurrency and Database Connections in Django](https://devcenter.heroku.com/articles/python-concurrency-and-database-connections)
- [Heroku Postgres](https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-the-add-on)
- [Heroku Data](https://data.heroku.com/)

__Let's code like a girl!__
