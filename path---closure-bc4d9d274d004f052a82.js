webpackJsonp([0xec3e8c9630fd],{372:function(n,s){n.exports={data:{markdownRemark:{html:'<blockquote>\n<p>개인적인 공부 노트로 오류가 있을 수 있습니다.</p>\n</blockquote>\n<h2>1. 클로저(Closure)란?</h2>\n<p><strong>private 함수의 변수를 참조</strong>하는 것, 또는 <a href="https://books.google.co.kr/books/about/%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C_%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8.html?id=gSVJDgAAQBAJ&#x26;redir_esc=y&#x26;hl=ko">실행이 끝난 부모 함수 스코프의 변수를 참조하는 함수</a>를 의미한다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// without closure</span>\n<span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> _name <span class="token operator">=</span> name  <span class="token comment">// _name은 숨겨진 변수라는 것을 강조하기 위해 사용</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">\'Jane\'</span><span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// undefined</span>\n</code></pre>\n      </div>\n<p>👉 Person 함수가 실행된 후에는 당연히 내부 변수 <code>name</code>에 접근이 불가능하다. 하지만 클로저를 사용해 내부 변수에 접근하는 함수를 만들 수 있다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// with closure</span>\n<span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> _name <span class="token operator">=</span> name\n  \n  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> _name  <span class="token comment">// 숨겨진 변수 _name에 접근한다.</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">\'Jane\'</span><span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// Jane</span>\n</code></pre>\n      </div>\n<ul>\n<li>예시 출처: <a href="https://www.youtube.com/watch?v=yiEeiMN2Khs">https://www.youtube.com/watch?v=yiEeiMN2Khs</a></li>\n</ul>\n<hr>\n<h2>2. 함수를 리턴하는 함수</h2>\n<p>클로저를 사용하면 내부 변수를 참조하는 함수를 리턴해서 내부 변수를 계속 간직하도록 만들수도 있다.(출처: <a href="https://books.google.co.kr/books/about/%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C_%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8.html?id=gSVJDgAAQBAJ&#x26;redir_esc=y&#x26;hl=ko">인사이드 자바스크립트(2016)</a>)</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token function">parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">100</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">child</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>  <span class="token comment">// parent()의 내부 변수 a를 참조한다.</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> child   <span class="token comment">// parent() 함수는 내부 함수 child()를 리턴한다.</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> inner <span class="token operator">=</span> <span class="token function">parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// inner() 함수는 리턴된 child() 함수 </span>\n<span class="token function">inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 100</span>\n</code></pre>\n      </div>\n<ol>\n<li><code>parent()</code> 함수의 실행은 끝났지만 내부 변수 <code>a</code>는 가비지 컬렉팅이 되지 않는다.</li>\n<li><code>inner()</code> 함수는 <code>parent()</code> 함수의 리턴값인 <code>child()</code>를 할당 받았고, 그 <code>child()</code> 함수는 변수 <code>a</code>를 참조하고 있기 때문에 100을 출력하게 된다.</li>\n</ol>\n<p>👉 <a href="https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)">가비지 컬렉션(garbage collection)</a>: 메모리 관리 기법 중의 하나로, 프로그램이 동적으로 할당했던 메모리 영역 중에서 필요없게 된 영역을 해제하는 기능이다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> <span class="token function-variable function">a</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> counter <span class="token operator">=</span> <span class="token number">0</span>\n  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    counter <span class="token operator">+=</span> <span class="token number">1</span>\n    <span class="token keyword">return</span> counter\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// function() { counter += 1; return counter }</span>\n<span class="token comment">// 이 counter는 어디서 왔지? 여전히 접근 가능하지만 counter 변수는 더럽혀지지 않는다.</span>\n</code></pre>\n      </div>\n<ul>\n<li>스코프 - 함수나 {} 밖에서 정의되는 변수는 모두 global variable 이다.</li>\n</ul>\n<p>b는 a 내부에서 리턴되는 함수가 된다. <code>counter = 0; function() { counter += 1; return counter}</code>와 incrementing 하는 기능은 같지만 외부에서 counter에 접근이 불가능하기 때문에 전역 변수를 더럽히지 않을 수 있다는 차이가 있다. 변수 뿐만 아니라 함수, 객체도 이런식으로 숨길 수 있다. 이런식으로 private 변수도 구현 가능.</p>\n<hr>\n<h2>3. 언제 사용할까? (feat. event listener)</h2>\n<p>클로저는 이벤트 리스너의 콜백에 인자를 같이 넘겨줄 때 사용할 수 있다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// anchor 태그를 클릭할 때, 리프레시를 하지 않고 각 anchor의 index를 띄우는 예시</span>\n\n<span class="token keyword">function</span> <span class="token function">registerHandlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> anchors <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">\'a\'</span><span class="token punctuation">)</span>\n  Array<span class="token punctuation">.</span><span class="token keyword">from</span><span class="token punctuation">(</span>anchors<span class="token punctuation">,</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> index<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    a<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">\'click\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">alertIndex</span><span class="token punctuation">(</span>event<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">alertIndex</span><span class="token punctuation">(</span>event<span class="token punctuation">,</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token keyword">return</span> <span class="token function">alert</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>\n<span class="token punctuation">}</span> \n\n<span class="token function">registerHandlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<ul>\n<li>예시 출처: <a href="https://www.testdome.com/questions/javascript/closures/">https://www.testdome.com/questions/javascript/closures/</a></li>\n</ul>',frontmatter:{title:"What is Closure?",date:"2018-04-28",path:"/closure",tags:["closure","javascript"],excerpt:""}}},pathContext:{}}}});
//# sourceMappingURL=path---closure-bc4d9d274d004f052a82.js.map