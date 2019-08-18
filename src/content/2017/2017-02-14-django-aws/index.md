---
path: "/django-aws"
date: "2017-02-14"
title: "AWS로 Django 프로젝트 배포하기(1)"
tags: ['Django', 'AWS']
excerpt: "배포를 위한 Django 파일 분기하기"
type: "tips"
---

참고 : Ask Django

## 0. 404 페이지 만들기

Page not found 404 에러를 띄워줄 html 페이지를 만듭니다. 잘못된 url로 접근했을 때, 노란색 장고 에러메시지보다는 404 페이지를 띄우는게 좋습니다. 어떤 404 페이지는 간단한 html 게임을 넣기도 합니다.

1. html 파일이 있는 template 디렉토리에 `404.html` 파일을 만듭니다.
2. 템플릿을 상속받습니다.
3. 포스트나 댓글 인스턴스를 불러올 때 `django shortcuts` 의 `get_object_or_404`를 이용합니다.

```python
from django.shortcuts import redirect, render, get_object_or_404

def post_detail(request, post_pk):
    post = get_object_or_404(Post, pk=post_pk)
```

---

## 1. settings.py 분기하기
`settings.py`의 내용을 개발 버전 설정과 배포 버전 설정으로 나눠줍니다.

1. 프로젝트 디렉토리 안에 `settings` 라는 디렉토리를 만듭니다.
2. 1번이 python 모듈이 되도록 `__init__.py`를 만들어줍니다.
3. 2번 디렉토리 안에 `common.py`와 이를 import 하는 `dev.py`, `prod.py` 로 나눠줍니다.
4. 원래 있던 `settings.py`의 내용을 `common.py`로 복사하고 디렉토리 경로를 한 depth 깊게 설정합니다.
```python
BASE_DIR = dirname(dirname(dirname(os.path.abspath(__file__))))
```
5. dev.py는 common.py를 전부 임포트 합니다.
6. prod.py를 아래와 같이 설정합니다.

```python
import os
from .common import *

DEBUG = False
ALLOWED_HOSTS = ['\*']

STATIC_ROOT = os.path.join(BASE_DIR, "..", "staticfiles")
MEDIA_ROOT = os.path.join(BASE_DIR, "..", "media")

DATABASES = { 'default': {
  'ENGINE': 'django.db.backends.postgresql', 'NAME': 'ubuntu',
  'USER': 'ubuntu',
  'PASSWORD': 'password',
  'HOST': '127.0.0.1', },
}
```

7. 각종 계정 정보는 환경변수를 통해 접근하도록 하는 것이 안전합니다.

---

## 2. 3rd party 패키지(requirements.txt) 분기하기

개발에서만 사용하는 패키지(크롤링할 때 필요한 패키지 등)와 실 서버에서 사용될 패키지를 분기해줍니다. 서버에 올릴 때에는 후자만 설치해줍니다.

1. 프로젝트 디렉토리가 있는 경로에 `requirements`디렉토리를 만듭니다.
2. 1번 안에 `common.txt`, `dev.txt`, `prod.txt` 로 나눠서 저장합니다.

---

## 3. 경로 설정하기
`wsgi.py`는 사용자가 서비스(?)로 진입하는 지점입니다. 이 파일에서 아래와 같이 `<project-name>.settings` 부분을 수정해줍니다. 설정 파일을 찾는 경로를 수정해주는 것인데, 원래 있었던 `/<project-name>/settings.py`가 아니라 settings 디렉토리 아래의 prod.py 를 실행하라는 의미입니다.

```python
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "<project-name>.settings.prod")
```

같은 방법으로 `manage.py` 파일에서 `<project-name>.settings.dev`로 수정해줍니다.

```python
if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "<project-name>.settings.dev")
```

:point_right: [AWS로 Django 프로젝트 배포하기(2)](/aws-deploy)

__Let's code like a girl!__
