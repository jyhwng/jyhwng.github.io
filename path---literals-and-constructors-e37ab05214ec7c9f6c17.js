webpackJsonp([0x619c77ee5def],{386:function(n,s){n.exports={data:{markdownRemark:{html:'<p><a href="https://g.co/kgs/AkNCEg">자바스크립트 코딩 기법과 핵심 패턴(2011)</a> 책을 읽고 정리한 글입니다.</p>\n<p>👉 <a href="/callback">4장 - Callback Pattern</a></p>\n<hr>\n<h2>1. 객체 생성하기</h2>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// Bad</span>\na <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n<span class="token comment">// Good</span>\na <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<ul>\n<li>이런식으로 <code>Object</code>, <code>Array</code> 같은 생성자를 사용하기 보다는 리터럴을 통해 객체를 생성하는 것이 좋다.</li>\n<li>두번째 방법은 빈 객체로 보이지만 사실은 자바스크립트에는 빈 객체는 없다. 모든 객체는 부모 객체인 <code>Object.prototype</code>의 프로퍼티와 메서드를 가진다.</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\na<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">\'Benji\'</span>    <span class="token comment">// 프로퍼티 추가</span>\na<span class="token punctuation">.</span><span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    <span class="token comment">// 메소드 추가</span>\n    <span class="token keyword">return</span> a<span class="token punctuation">.</span>name\n<span class="token punctuation">}</span>\na<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">\'Fido\'</span> <span class="token comment">// 프로퍼티 수정</span>\n<span class="token keyword">delete</span> a<span class="token punctuation">.</span>name   <span class="token comment">// 프로퍼티 삭제</span>\n</code></pre>\n      </div>\n<hr>\n<h2>2. 사용자 정의 생성자 함수</h2>\n<ol>\n<li>객체 생성</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">let</span> <span class="token function-variable function">Person</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">say</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string">"I am "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">\'adam\'</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<ol>\n<li><code>Person</code>은 사실 함수이자, 객체이다.</li>\n<li>\n<p><code>new</code>는 새로운 객체를 생성하는 연산자이다.</p>\n<ul>\n<li><code>new</code>는 <code>this</code> 포인터를 만들고 이는 새로 만든 객체를 가리키게 된다.</li>\n<li>만약에 new 없이 <code>let person = Person(\'adam\')</code>과 같이 그냥 함수만 호출한다면 함수가 실행되기만 할 뿐, <code>this</code> 포인터가 객체를 가리키지 못한다. 그래서 <code>Person</code>함수의 <code>this.name = name</code> 이 부분의 <code>this</code>는 전역을 가리키게 되고 <code>name</code>과 <code>say()</code>는 전역 변수, 전역 메소드로 세팅이 된다. 매우 위험한 상황이 되는 셈이다.</li>\n<li><code>new</code>를 쓰면 위의 코드의 이면에 진행되는 것은 아래 주석과 같다.</li>\n</ul>\n</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">let</span> <span class="token function-variable function">Person</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// let this = {}</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">say</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token string">"I am "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name\n    <span class="token punctuation">}</span>\n    <span class="token comment">// return this</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">\'adam\'</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<ul>\n<li>함수 내에 return문이 없더라도 생성자는 암묵적으로 this를 리턴한다. return문을 써서 반환되는 객체를 지정해줄수도 있다.</li>\n</ul>\n<p>위의 방법으로 메소드를 추가하는 방법도 있지만, 새로운 객체를 생성할 때마다 say() 라는 함수를 계속 만들게된다. 즉, n개의 객체를 만들면 n개의 say()가 만들어지는 것이다. 그러기보다 Person의 프로토타입에 say() 메소드를 추가하면 한번만 정의하고도 모든 객체가 참조할 수 있다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">Person<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">say</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token string">"I am "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<ul>\n<li>new를 쓰지 않았을 때에도 위에 문제가 발생하지 않도록 강제하는 방법도 있다. 어떤 변수에 new없이 Waffle()을 할당해서 함수가 실행이 되었는데 그 실행된 함수안의 this가 Waffle의 인스턴스가 아닐 때, 즉 전역을 가리킬 때 그 함수 안에서 <code>new Waffle()</code>로 새로운 Waffle객체를 생성하는 것이다.</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token function">Waffle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">this</span> isinstanceof Waffle<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Waffle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">this</span><span class="token punctuation">.</span>tastes <span class="token operator">=</span> <span class="token string">"yummy!"</span>\n<span class="token punctuation">}</span>\n\nWaffle<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>wantAnother <span class="token operator">=</span> <span class="token boolean">true</span>\n</code></pre>\n      </div>\n<hr>\n<h2>3. 배열 리터럴</h2>\n<ol>\n<li>배열 생성하기</li>\n</ol>\n<p>배열도 객체와 마찬가지로 내장 생성자 Array()를 사용하기보다 <code>let a = []</code>와 같이 생성해주는 것이 좋다. 아래 두개의 코드는 다른 방식으로 작동한다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>\n<span class="token comment">// a.length = 1</span>\n<span class="token comment">// a[0] = 3</span>\n\n<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>\n<span class="token comment">// a.length = 3</span>\n<span class="token comment">// typeof a[0] = "undefined"</span>\n</code></pre>\n      </div>\n<p>위의 코드는 3이라는 하나의 숫자를 가진 배열이 되고, 아래는 3개의 자리를 가진 빈 배열을 만들게 된다.</p>\n<ol start="2">\n<li>배열 판별하기</li>\n</ol>\n<p>배열은 <code>isArray()</code>로 판별한다. 배열도 객체이기 때문에 <code>typeof</code>로 판별할 경우, <code>object</code>가 나오기 때문이다.</p>\n<hr>\n<h2>4. JSON</h2>\n<p>JSON(JavaScript Object Notation)은 객체 리터럴 표기법으로 쓰여진 데이터 전송 형식이다.</p>\n<ol>\n<li><code>JSON.stringify(x)</code> - JSON은 프로퍼티명이 항상 문자열이어야 한다. 그래서 stringify로 모든 키값을 문자열로 serialize하는 게 안전하다.</li>\n<li><code>JSON.parse(x)</code> - JSON 데이터를 서버에서 던져줄 때 서버에서 stringify를 하고 프런트에서 파싱해서 쓰면 용량을 적게 사용할 수 있다.</li>\n</ol>\n<hr>',frontmatter:{title:"Literals and constructors",date:"2017-10-31",path:"/literals-and-constructors",tags:["Javascript"],excerpt:"Javascript Patterns(2011)"}}},pathContext:{}}}});
//# sourceMappingURL=path---literals-and-constructors-e37ab05214ec7c9f6c17.js.map