---
path: "/drf2"
date: "2017-09-04"
title: "Django REST framework (2)"
tags: ['REST', 'Django', 'authentication']
excerpt: "Authentication & Permissions, Relationships & Hyperlinked APIs"
type: ""
---

Django REST framework는 다양한 앱에서 DB에 접근할 수 있는 API endpoint를 만들어주는 프레임워크입니다. [Django REST framework Tutorial](http://www.django-rest-framework.org/tutorial/1-serialization/)을 따라하며 공부한 내용을 정리했습니다.

:point_right: [Django REST framework (1) - Serialization, Requests & Responses, Class-based views](/drf1)

---

## 1. Authentication & Permissions

1. Adding information to our model

대부분의 API는 authenticated 된 유저만이 글을 작성하고, 본인이 작성한 글만 수정/삭제할 수 있도록 해야한다. 일단 Model에 User 클래스를 추가한다. 튜토리얼에서는 pygments라는 코드 하이라이팅 라이브러리도 사용하기 때문에 라이브러리도 불러와준다.

```python
# models.py
...
from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from pygments import highlight

class Snippet(models.Model):
    ...
    owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)
    highlighted = models.TextField()
```

그리고 이를 저장할 `.save()` 메소드를 추가한다.

```python
...
def save(self, *args, **kwargs):
    lexer = get_lexer_by_name(self.language)
    linenos = self.linenos and 'table' or False
    options = self.title and {'title':self.title} or {}
    formatter = HtmlFormatter(style=self.style, linenos = linenos, full=True, **options)
    self.highlighted = highlight(self.code, lexer, formatter)
    super(Snippet, self).save(*args, **kwargs)  # super - 상속 꼬였을때 사용하는. 초기화 함수.
```

글을 작성할 User를 `python manage.py createsuperuser` 명령을 통해 추가해 준다.

User에 대한 serializer도 serializers.py에 추가해준다. Snippet 모델에 owner가 ForeignKey로 걸려있긴 하지만 아래처럼 snippets를 명시해줘야 한다. (Because 'snippets' is a reverse relationship on the User model, it will not be included by default when using the ModelSerializer class, so we needed to add an explicit field for it.)

```python
# serializers.py
...
from django.contrib.auth.models import User

...
class UserSerializer(serializers.ModelSerializer):
    snippets = serializers.PrimaryKeyRelatedField(many=True, queryset=Snippet.objects.all())
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = User
        fields = ('id', 'username', 'snippets', 'owner')
```

2. Adding endpoints for our User models

`/users` endpoint로 접근할 수 있도록 view와 url도 아래처럼 정의한다.

```python
# views.py
from snippets.serializers import UserSerializer

...

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer   # 깃헙 소스코드에 class UserSerializer 주석처리 되어 있음...?

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()   # detail인데, 왜 다불러오지?
    serializer_class = UserSerializer
```

```python
# urls.py
urlpatterns = [
    ...
    url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view())
]
```

** [`.as_view()` 메소드](https://docs.djangoproject.com/ko/1.11/ref/class-based-views/base/#django.views.generic.base.View.as_view) - Returns a callable view that takes a request and returns a response

3. Associating Snippets with Users

그런데 snippet 인스턴스가 생성될 때 serialize 되는 정보에 user는 아직 들어가지 않는다. 그래서 `SnippetList` 클래스에 create 메소드를 `perform_create()`로 오버라이딩해주고 그 안에 유저 정보를 담는다.

```python
# views.py
def perform_create(self, serializer):
    serializer.save(owner=self.request.user)
```

이렇게 하면 serializer의 원래 `create()`에 owner라는 추가 정보가 들어갈 것이다.

** 근데 models.py에 owner 정의하고 serializer는 modelserializer 상속받는데 왜 정보가 안들어가지?

4. Updating our serializer

```python
# serializer.py
class UserSerializer(serializers.ModelSerializer):
    ...
    owner = serializers.ReadOnlyField(source='owner.username')
```

source는 어떤 attribute를 기준으로 유저를 구분할 것인지 판단한다. 여기서는 owner의 username으로 구분한다. `ReadOnlyField`는 `CharField(read_only=True)`와 같은 필드로, 조회만 가능하다.

5. Adding required permissions to views

REST framework에서 제공하는 다양한 permission class 중에 `IsAuthenticatedOrReadOnly`를 SnippetList, SnippetDetail 클래스에 추가해준다.

```python
# views.py
from rest_framework import permissions

class SnippetList(generics.ListAPIView):
    ...
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class SnippetDetail(generics.RetrieveAPIView):
    ...
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
```

이 프로퍼티를 추가할 때, tuple을 만들어주기 위해 꼭 `,`를 추가해야한다. 이게 없으면 `TypeError: 'type' object is not iterable` 오류가 나게 된다.

6. Adding login to the Browsable API

`localhost:8000/snippets/`에 접근하면 이제 snippets를 추가할 수 없게 된다. 브라우저에서 로그인이 가능하도록 urls.py를 수정해야 한다.

```python
# urls.py
from django.conf.urls import include

urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
```

이걸 추가하고 다시 `localhost:8000/snippets/`에서 브라우저를 새로고침하면 우측 상단에 `Login` 버튼이 생긴다.

7. Object level permissions

이제 snippet을 생성한 본인만이 이를 수정/삭제할 수 있도록 permission을 추가해줘야 한다. snippets 앱에 permissions.py를 추가한다.

```python
# permissions.py
from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user
```

BasePermission이 어떻게 생겼는지 궁금해서 [소스코드](https://github.com/encode/django-rest-framework/blob/master/rest_framework/permissions.py)를 봤더니 `return True`밖에 없다... 넘나 클린한 이 코드는 도대체 뭐징 ㅇㅅaㅇ

```python
# django-rest-framework/rest_framework/permissions.py
class BasePermission(object):
    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        return True
```

어쨌든 permissions.py에 이렇게 추가해준 IsOwnerOrReadOnly를 views.py에 임포트하고 SnippetList, SnippetDetail 클래스의 permissions_classes에 추가해준다.

```python
# views.py
from snippets.permissions import IsOwnerOrReadOnly

class SnippetList(generics.ListAPIView):
    ...
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

class SnippetDetail(generics.RetrieveAPIView):
    ...
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
```

이제 콘솔창에서도 id와 패스워드를 입력하면 http POST 요청을 보낼 수 있다.

```
http -a admin:password POST http://127.0.0.1:8000/snippets/ code="test"

{
    "id": 1,
    "owner": "admin",
    "title": "foo",
    "code": "test",
    "linenos": false,
    "language": "python",
    "style": "friendly"
}
```

---

## 2. Relationships & Hyperlinked APIs

```python
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'snippets': reverse('snippet-list', request=request, format=format)
    })
```

- `format=None`을 지정해줌으로서 특정 포맷을 명시한 url로도 접근이 가능하도록 만들어준다.([참고](http://www.django-rest-framework.org/tutorial/2-requests-and-responses/#adding-optional-format-suffixes-to-our-urls))

To be continued!
