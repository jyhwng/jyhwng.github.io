---
path: "/drf1"
date: "2017-09-04"
title: "Django REST framework (1)"
tags: ['REST', 'Django']
excerpt: "Serialization, Requests & Responses, Class-based views"
type: ""
---

Django REST framework는 다양한 앱에서 DB에 접근할 수 있는 API endpoint를 만들어주는 프레임워크입니다. [Django REST framework Tutorial](http://www.django-rest-framework.org/tutorial/1-serialization/)을 따라하며 공부한 내용을 정리했습니다.

:point_right: [Django REST framework (2) - Authentication & Permissions, Relationships & Hyperlinked API](/drf2)

---

## 1. Serializer.py
Serializing 은 [모델 객체를 Python 네이티브 데이터 타입으로, 그것을 다시 JSON으로 변환](http://www.django-rest-framework.org/tutorial/1-serialization/#working-with-serializers)하는 것을 말한다.

파이썬 코드로 접근하던 데이터를 JSON으로 변환해주는 것이 바로 이 `Serializer.py` 의 역할이다. (접근 가능한 API endpoint 를 만든다는 것은 데이터 타입을 접근 가능하도록 만든다는 의미도 포함하는 것 아닐까...)

Serializer 클래스는 장고의 폼 클래스와 매우 비슷하다. 필드에 `required`, `max_length`, `default` 같은 플래그도 똑같이 사용한다.

```python
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

snippet = Snippet(code='foo = "bar"\n')
snippet.save()

snippet = Snippet(code='print "hello, world"\n')
snippet.save()
```

```python
serializer = SnippetSerializer(snippet)
serializer.data
# {'id': 2, 'title': u'', 'code': u'print "hello, world"\n', 'linenos': False, 'language': u'python', 'style': u'friendly'}
```

```python
content = JSONRenderer().render(serializer.data)
content
# '{"id": 2, "title": "", "code": "print \\"hello, world\\"\\n", "linenos": false, "language": "python", "style": "friendly"}'
```

Deserializing 은 그 반대의 프로세스(JSON에서 Python native data로)를 의미한다.

```python
from django.utils.six import BytesIO

stream = BytesIO(content)
data = JSONParser().parse(stream)
```

```python
serializer = SnippetSerializer(data=data)
serializer.is_valid()
# True
serializer.validated_data
# OrderedDict([('title', ''), ('code', 'print "hello, world"\n'), ('linenos', False), ('language', 'python'), ('style', 'friendly')])
serializer.save()
# <Snippet: Snippet object>
```

- ** Github에서 소스코드 보기 - [serializers.py](https://github.com/encode/django-rest-framework/blob/master/rest_framework/serializers.py)

---

## 2. Requests and Responses

1. Request objects
- DRF 의 `request.data` 는 일반적인 `HttpRequest` 보다 더 유연(flexible request parsing)하다.

```python
request.POST  # 폼 데이터만 다룸. POST 메소드만 가능.
request.data  # 임의 데이터 다룸. POST, PUT, PATCH 가능.
```

2. Resposne objects
- Response도 JSONResponse인지, HttpResponse 인지 명시할 필요가 없다. 클라이언트 request 에서 들어온 content type에 따라 자동으로 알맞은 content type의 response를 리턴하기 때문이다. ([참고 - Content negotiation](https://en.wikipedia.org/wiki/Content_negotiation)) 이것의 장점은 웹 브라우저에서 요청이 들어왔을 경우, response도 html 형식으로 브라우저에서 볼 수 있다([browsable-api](http://www.django-rest-framework.org/topics/browsable-api/))는 점이다.

```python
return Response(data) # 클라이언트에서 요청된 타입으로 렌더링 한다.
```

3. Status codes
- `status` 모듈에서는 `HTTP_400_BAD_REQUEST`와 같이 명시적인 status code를 제공한다. 세자리 숫자만 사용하는 status code 보다 더 이해하기 쉽다.

4. Wrapping API Views
- FBV에서는 `@api_view` 장식자를, CBV에서는 `APIView` 클래스를 사용해서 API view를 래핑하여 사용한다. Request, response, status, error 와 관련된 기능이 작동할 수 있도록 해준다.

---

## 3. Class Based View
- Mixin 사용하기 : CRUD 는 반복되는 패턴이다. DRF에서는 Mixin에 이를 미리 구현해 놓았다. 이를 CBV 에서 적절히 불러와 사용하면 된다.

```python
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import mixins
from rest_framework import generics

class SnippetList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

    # The base class provides the core functionality, and the mixin classes provide the .list() and .create() actions. We're then explicitly binding the get and post methods to the appropriate actions.

    def get(self, request, *args, **kwargs):    
        # `*args`, `**kwargs` 에는 snippet의 id나 title같은 파라미터가 들어간다.
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
```

여기서 `ListModelMixin`, `CreateModelMixin` 등을 한번 더 래핑한 generics class를 쓰면 아래처럼 더 짧아진다.

** Github에서 소스코드 보기 - [mixins.py](https://github.com/encode/django-rest-framework/blob/master/rest_framework/mixins.py),  [generics.py](https://github.com/encode/django-rest-framework/blob/master/rest_framework/generics.py)

```python
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import generics

class SnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
```

To be continued!
