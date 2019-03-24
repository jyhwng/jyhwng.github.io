webpackJsonp([3036334675900],{380:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Django REST framework는 다양한 앱에서 DB에 접근할 수 있는 API endpoint를 만들어주는 프레임워크입니다. <a href="http://www.django-rest-framework.org/tutorial/1-serialization/">Django REST framework Tutorial</a>을 따라하며 공부한 내용을 정리했습니다.</p>\n<p>👉 <a href="/drf2">Django REST framework (2) - Authentication &#x26; Permissions, Relationships &#x26; Hyperlinked API</a></p>\n<hr>\n<h2>1. Serializer.py</h2>\n<p>Serializing 은 <a href="http://www.django-rest-framework.org/tutorial/1-serialization/#working-with-serializers">모델 객체를 Python 네이티브 데이터 타입으로, 그것을 다시 JSON으로 변환</a>하는 것을 말한다.</p>\n<p>파이썬 코드로 접근하던 데이터를 JSON으로 변환해주는 것이 바로 이 <code>Serializer.py</code> 의 역할이다. (접근 가능한 API endpoint 를 만든다는 것은 데이터 타입을 접근 가능하도록 만든다는 의미도 포함하는 것 아닐까...)</p>\n<p>Serializer 클래스는 장고의 폼 클래스와 매우 비슷하다. 필드에 <code>required</code>, <code>max_length</code>, <code>default</code> 같은 플래그도 똑같이 사용한다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">from</span> snippets<span class="token punctuation">.</span>models <span class="token keyword">import</span> Snippet\n<span class="token keyword">from</span> snippets<span class="token punctuation">.</span>serializers <span class="token keyword">import</span> SnippetSerializer\n<span class="token keyword">from</span> rest_framework<span class="token punctuation">.</span>renderers <span class="token keyword">import</span> JSONRenderer\n<span class="token keyword">from</span> rest_framework<span class="token punctuation">.</span>parsers <span class="token keyword">import</span> JSONParser\n\nsnippet <span class="token operator">=</span> Snippet<span class="token punctuation">(</span>code<span class="token operator">=</span><span class="token string">\'foo = "bar"\\n\'</span><span class="token punctuation">)</span>\nsnippet<span class="token punctuation">.</span>save<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\nsnippet <span class="token operator">=</span> Snippet<span class="token punctuation">(</span>code<span class="token operator">=</span><span class="token string">\'print "hello, world"\\n\'</span><span class="token punctuation">)</span>\nsnippet<span class="token punctuation">.</span>save<span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">serializer <span class="token operator">=</span> SnippetSerializer<span class="token punctuation">(</span>snippet<span class="token punctuation">)</span>\nserializer<span class="token punctuation">.</span>data\n<span class="token comment"># {\'id\': 2, \'title\': u\'\', \'code\': u\'print "hello, world"\\n\', \'linenos\': False, \'language\': u\'python\', \'style\': u\'friendly\'}</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">content <span class="token operator">=</span> JSONRenderer<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>render<span class="token punctuation">(</span>serializer<span class="token punctuation">.</span>data<span class="token punctuation">)</span>\ncontent\n<span class="token comment"># \'{"id": 2, "title": "", "code": "print \\\\"hello, world\\\\"\\\\n", "linenos": false, "language": "python", "style": "friendly"}\'</span>\n</code></pre>\n      </div>\n<p>Deserializing 은 그 반대의 프로세스(JSON에서 Python native data로)를 의미한다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">from</span> django<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>six <span class="token keyword">import</span> BytesIO\n\nstream <span class="token operator">=</span> BytesIO<span class="token punctuation">(</span>content<span class="token punctuation">)</span>\ndata <span class="token operator">=</span> JSONParser<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>parse<span class="token punctuation">(</span>stream<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">serializer <span class="token operator">=</span> SnippetSerializer<span class="token punctuation">(</span>data<span class="token operator">=</span>data<span class="token punctuation">)</span>\nserializer<span class="token punctuation">.</span>is_valid<span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token comment"># True</span>\nserializer<span class="token punctuation">.</span>validated_data\n<span class="token comment"># OrderedDict([(\'title\', \'\'), (\'code\', \'print "hello, world"\\n\'), (\'linenos\', False), (\'language\', \'python\'), (\'style\', \'friendly\')])</span>\nserializer<span class="token punctuation">.</span>save<span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token comment"># &lt;Snippet: Snippet object></span>\n</code></pre>\n      </div>\n<ul>\n<li>** Github에서 소스코드 보기 - <a href="https://github.com/encode/django-rest-framework/blob/master/rest_framework/serializers.py">serializers.py</a></li>\n</ul>\n<hr>\n<h2>2. Requests and Responses</h2>\n<ol>\n<li>Request objects</li>\n<li>DRF 의 <code>request.data</code> 는 일반적인 <code>HttpRequest</code> 보다 더 유연(flexible request parsing)하다.</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">request<span class="token punctuation">.</span>POST  <span class="token comment"># 폼 데이터만 다룸. POST 메소드만 가능.</span>\nrequest<span class="token punctuation">.</span>data  <span class="token comment"># 임의 데이터 다룸. POST, PUT, PATCH 가능.</span>\n</code></pre>\n      </div>\n<ol start="2">\n<li>Resposne objects</li>\n<li>Response도 JSONResponse인지, HttpResponse 인지 명시할 필요가 없다. 클라이언트 request 에서 들어온 content type에 따라 자동으로 알맞은 content type의 response를 리턴하기 때문이다. (<a href="https://en.wikipedia.org/wiki/Content_negotiation">참고 - Content negotiation</a>) 이것의 장점은 웹 브라우저에서 요청이 들어왔을 경우, response도 html 형식으로 브라우저에서 볼 수 있다(<a href="http://www.django-rest-framework.org/topics/browsable-api/">browsable-api</a>)는 점이다.</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">return</span> Response<span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token comment"># 클라이언트에서 요청된 타입으로 렌더링 한다.</span>\n</code></pre>\n      </div>\n<ol start="3">\n<li>\n<p>Status codes</p>\n</li>\n<li>\n<p><code>status</code> 모듈에서는 <code>HTTP_400_BAD_REQUEST</code>와 같이 명시적인 status code를 제공한다. 세자리 숫자만 사용하는 status code 보다 더 이해하기 쉽다.</p>\n</li>\n<li>\n<p>Wrapping API Views</p>\n</li>\n<li>\n<p>FBV에서는 <code>@api_view</code> 장식자를, CBV에서는 <code>APIView</code> 클래스를 사용해서 API view를 래핑하여 사용한다. Request, response, status, error 와 관련된 기능이 작동할 수 있도록 해준다.</p>\n</li>\n</ol>\n<hr>\n<h2>3. Class Based View</h2>\n<ul>\n<li>Mixin 사용하기 : CRUD 는 반복되는 패턴이다. DRF에서는 Mixin에 이를 미리 구현해 놓았다. 이를 CBV 에서 적절히 불러와 사용하면 된다.</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">from</span> snippets<span class="token punctuation">.</span>models <span class="token keyword">import</span> Snippet\n<span class="token keyword">from</span> snippets<span class="token punctuation">.</span>serializers <span class="token keyword">import</span> SnippetSerializer\n<span class="token keyword">from</span> rest_framework <span class="token keyword">import</span> mixins\n<span class="token keyword">from</span> rest_framework <span class="token keyword">import</span> generics\n\n<span class="token keyword">class</span> <span class="token class-name">SnippetList</span><span class="token punctuation">(</span>mixins<span class="token punctuation">.</span>ListModelMixin<span class="token punctuation">,</span>\n                  mixins<span class="token punctuation">.</span>CreateModelMixin<span class="token punctuation">,</span>\n                  generics<span class="token punctuation">.</span>GenericAPIView<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    queryset <span class="token operator">=</span> Snippet<span class="token punctuation">.</span>objects<span class="token punctuation">.</span><span class="token builtin">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    serializer_class <span class="token operator">=</span> SnippetSerializer\n\n    <span class="token comment"># The base class provides the core functionality, and the mixin classes provide the .list() and .create() actions. We\'re then explicitly binding the get and post methods to the appropriate actions.</span>\n\n    <span class="token keyword">def</span> <span class="token function">get</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> request<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>    \n        <span class="token comment"># `*args`, `**kwargs` 에는 snippet의 id나 title같은 파라미터가 들어간다.</span>\n        <span class="token keyword">return</span> self<span class="token punctuation">.</span><span class="token builtin">list</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>\n\n    <span class="token keyword">def</span> <span class="token function">post</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> request<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token keyword">return</span> self<span class="token punctuation">.</span>create<span class="token punctuation">(</span>request<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>여기서 <code>ListModelMixin</code>, <code>CreateModelMixin</code> 등을 한번 더 래핑한 generics class를 쓰면 아래처럼 더 짧아진다.</p>\n<p>** Github에서 소스코드 보기 - <a href="https://github.com/encode/django-rest-framework/blob/master/rest_framework/mixins.py">mixins.py</a>,  <a href="https://github.com/encode/django-rest-framework/blob/master/rest_framework/generics.py">generics.py</a></p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">from</span> snippets<span class="token punctuation">.</span>models <span class="token keyword">import</span> Snippet\n<span class="token keyword">from</span> snippets<span class="token punctuation">.</span>serializers <span class="token keyword">import</span> SnippetSerializer\n<span class="token keyword">from</span> rest_framework <span class="token keyword">import</span> generics\n\n<span class="token keyword">class</span> <span class="token class-name">SnippetList</span><span class="token punctuation">(</span>generics<span class="token punctuation">.</span>ListCreateAPIView<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    queryset <span class="token operator">=</span> Snippet<span class="token punctuation">.</span>objects<span class="token punctuation">.</span><span class="token builtin">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    serializer_class <span class="token operator">=</span> SnippetSerializer\n\n<span class="token keyword">class</span> <span class="token class-name">SnippetDetail</span><span class="token punctuation">(</span>generics<span class="token punctuation">.</span>RetrieveUpdateDestroyAPIView<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    queryset <span class="token operator">=</span> Snippet<span class="token punctuation">.</span>objects<span class="token punctuation">.</span><span class="token builtin">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    serializer_class <span class="token operator">=</span> SnippetSerializer\n</code></pre>\n      </div>\n<p>To be continued!</p>',frontmatter:{title:"Django REST framework (1)",date:"2017-09-04",path:"/drf1",tags:["REST","Django"],excerpt:"Serialization, Requests & Responses, Class-based views"}}},pathContext:{}}}});
//# sourceMappingURL=path---drf-1-a70e169c90703ddd4073.js.map