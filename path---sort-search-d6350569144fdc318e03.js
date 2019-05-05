webpackJsonp([0xafbec6f37e02],{394:function(n,s){n.exports={data:{markdownRemark:{html:'<p><a href="http://interactivepython.org/courselib/static/pythonds/index.html">Problem Solving with Algorithms and Data Structures using Python</a> 책을 읽으며 스터디한 내용을 정리하여 연재합니다.</p>\n<hr>\n<h2>1. Sequential search</h2>\n<ul>\n<li>Sequential search는 리스트에서 item을 찾을 때, 앞에서 하나씩 비교하며 찾는 방식이다.</li>\n<li>Analysis</li>\n</ul>\n<ol>\n<li>Unordered list</li>\n</ol>\n<table>\n<thead>\n<tr>\n<th>Case</th>\n<th>Best Case</th>\n<th>Worst Case</th>\n<th>Average Case</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>item is present</td>\n<td>1</td>\n<td>n</td>\n<td>n/2</td>\n</tr>\n<tr>\n<td>item is not present</td>\n<td>n</td>\n<td>n</td>\n<td>n</td>\n</tr>\n</tbody>\n</table>\n<ol start="2">\n<li>Ordered list</li>\n</ol>\n<table>\n<thead>\n<tr>\n<th>Case</th>\n<th>Best Case</th>\n<th>Worst Case</th>\n<th>Average Case</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>item is present</td>\n<td>1</td>\n<td>n</td>\n<td>n/2</td>\n</tr>\n<tr>\n<td>item is not present</td>\n<td>1</td>\n<td>n</td>\n<td>n/2</td>\n</tr>\n</tbody>\n</table>\n<hr>\n<h2>2. Binary search</h2>\n<ul>\n<li>Binary search는 리스트가 크기순으로 정렬이 되어있을 때, 가운데 있는 데이터와 찾고자 하는 아이템을 비교해서 데이터를 반씩 줄여나가는 방법이다.</li>\n<li>Binary search의 시간복잡도는 <code>O(logn)</code>이다. Sequential search보다 시간복잡도는 낮지만 무조건 \'정렬\'을 거쳐야 하기 때문에 경우에 따라 비용이 더 들수도 있다. (If we can sort once and then search many times, the cost of the sort is not so significant. However, for large lists, sorting even once can be so expensive that simply performing a sequential search from the start may be the best choice.)</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token comment"># Recursive binary search</span>\n<span class="token keyword">def</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span>alist<span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>alist<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>\n        <span class="token keyword">return</span> <span class="token boolean">False</span>\n    <span class="token keyword">else</span><span class="token punctuation">:</span>\n        midpoint <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>alist<span class="token punctuation">)</span><span class="token operator">//</span><span class="token number">2</span>\n        <span class="token keyword">if</span> alist<span class="token punctuation">[</span>midpoint<span class="token punctuation">]</span><span class="token operator">==</span>item<span class="token punctuation">:</span>\n            <span class="token keyword">return</span> <span class="token boolean">True</span>\n        <span class="token keyword">else</span><span class="token punctuation">:</span>\n            <span class="token keyword">if</span> item<span class="token operator">&lt;</span>alist<span class="token punctuation">[</span>midpoint<span class="token punctuation">]</span><span class="token punctuation">:</span>\n                <span class="token keyword">return</span> binarySearch<span class="token punctuation">(</span>alist<span class="token punctuation">[</span><span class="token punctuation">:</span>midpoint<span class="token punctuation">]</span><span class="token punctuation">,</span>item<span class="token punctuation">)</span>\n            <span class="token keyword">else</span><span class="token punctuation">:</span>\n                <span class="token keyword">return</span> binarySearch<span class="token punctuation">(</span>alist<span class="token punctuation">[</span>midpoint<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">,</span>item<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<hr>\n<h2>2. Hashing</h2>\n<ol>\n<li>\n<p>Hashing이란?</p>\n<ul>\n<li>임의의 크기를 가진 데이터를 고정된 크기의 데이터로 변환시키는 것. 주로 임의의 문자열을 빠르게 찾기 위해 짧은 정수나 알파벳을 할당해준다.</li>\n<li>이상적으로는 시간복잡도를 <code>O(1)</code>과 가장 가깝게 만들어 검색속도를 빠르게 하기 위한 방법이나, 완전한 <code>O(1)</code>은 불가능하다.</li>\n<li>AWS EC2 인스턴스를 만들 때 생성되는 키페어의 원리인 - <code>SHA</code>(Secure Hash Algorithm)와 <code>MD5</code>같은 암호화와도 관련있다. <a href="http://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/ec2-key-pairs.html">(출처)</a></li>\n</ul>\n</li>\n<li>\n<p>Hash table / Slot / Hash function / Load factor</p>\n<ul>\n<li>\n<p><code>Hash table</code>은 데이터들의 모음이며 일정한 크기(m)를 가진다.</p>\n</li>\n<li>\n<p>이 테이블의 각 자리를 <code>slot</code>이라고 하며 slot은 0부터 (m-1)까지 인덱스를 갖는다.</p>\n</li>\n<li>\n<p>각 데이터를 알맞은 slot에 매핑해주는 식을 <code>hash function</code>이라고 한다.</p>\n</li>\n<li>\n<p>테이블 크기에 대해 데이터를 가진 slot의 개수를 <code>load factor</code>(부하계수)라고 한다. 테이블 크기가 11이고 데이터가 채워진 slot이 6개라면 load factor(λ)는 6/11이다.</p>\n</li>\n<li>\n<p>가장 간단한 방식의 hash function 이다. 데이터를 해시테이블의 크기로 나눈 나머지로 할당하는 방법이다.\n<img src="http://interactivepython.org/courselib/static/pythonds/_images/hashtable2.png" alt="img"></p>\n</li>\n<li>\n<p>그러나 이 경우, 같은 나머지 값을 가진 데이터는 한 슬롯에서 충돌하게 된다. 위의 예에서 만약 44 라는 데이터를 넣을 경우 \'44 % 11 = 0\'이기 때문에 77 과 충돌하게 된다.</p>\n</li>\n<li>\n<p>충돌이 발생하지 않는 hash function 을 <code>Perfect hash function</code>이라고 부른다. 그러나 임의의 데이터들의 모음이 있을 때, 완벽한 해시 함수를 만드는 것은 데이터 숫자만큼 해시 테이블의 숫자를 늘리지 않는 이상 불가능하다.</p>\n</li>\n<li>\n<p>완벽한 해시 함수를 만들 수 없다면 충돌을 최소화 하는 방법을 찾으면 된다.</p>\n</li>\n<li>\n<p>가장 간단한 방식의 hash function이다. 데이터를 해새테이블의 크기로 나눈 나머지로 할당하는 방법이다.\n<img src="http://interactivepython.org/courselib/static/pythonds/_images/hashtable2.png" alt="img"></p>\n</li>\n<li>\n<p>그러나 이 경우, 같은 나머지 값을 가진 데이터는 한 슬롯에서 충돌하게 된다. 위의 예에서 만약 44라는 데이터를 넣을 경우 \'44 % 11 = 0\'이기 때문에 77과 충돌하게 된다.</p>\n</li>\n<li>\n<p>충돌이 발생하지 않는 hash function을 <code>Perfect hash function</code>이라고 부른다. 그러나 임의의 데이터들의 모음이 있을 때, 완벽한 해시 함수를 만드는 것은 데이터 숫자만큼 해시 테이블의 숫자를 늘리지 않는 이상 불가능하다.</p>\n</li>\n<li>\n<p>완벽한 해시 함수를 만들 수 없다면 충돌을 최소화 하는 방법을 찾으면 된다.</p>\n</li>\n</ul>\n</li>\n<li>\n<p>Collision Resolution (충돌이 발생할 때 해결하는 방법)</p>\n<ol>\n<li>Open addressing &#x26; Linear probing</li>\n<li>새로운 데이터가 기존 데이터와 같은 슬롯에서 충돌할 때, 비어있는 슬롯을 찾아 한칸씩 옆으로 가는 방법. 이를 <code>rehashing</code>이라고 부르기도 한다.</li>\n<li>충돌이 많이 나는 슬롯 근처에 데이터가 쌓이는 clustering이 생긴다는 단점이 있다.</li>\n<li>Chaining</li>\n<li>하나의 슬롯에 여러개의 데이터가 들어가는 것을 허용하는 방식이다.</li>\n<li>인스타그램의 hashtag나, 사전에서 단어를 찾을 때 맨 앞 글자가 속한 곳부터 찾는, \'색인\'과 같은 개념이다.</li>\n<li>함께 보기 :point_right: How to resize a hash table?</li>\n</ol>\n</li>\n<li>\n<p>Map abstract data type</p>\n</li>\n<li>\n<p>파이썬에서 Dictionary라고 불리는 데이터 타입은 key와 value가 짝을 이루는 <code>Map</code> 자료구조와 같다.</p>\n</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token comment"># Open addressing 방식의 Hash로 Map 데이터타입 만들기</span>\n<span class="token keyword">class</span> <span class="token class-name">HashTable</span><span class="token punctuation">:</span>\n    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        self<span class="token punctuation">.</span>size <span class="token operator">=</span> <span class="token number">11</span>\n        self<span class="token punctuation">.</span>slots <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token boolean">None</span><span class="token punctuation">]</span> <span class="token operator">*</span> self<span class="token punctuation">.</span>size\n        self<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token boolean">None</span><span class="token punctuation">]</span> <span class="token operator">*</span> self<span class="token punctuation">.</span>size\n\n    <span class="token keyword">def</span> <span class="token function">put</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>key<span class="token punctuation">,</span>data<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    hashvalue <span class="token operator">=</span> self<span class="token punctuation">.</span>hashfunction<span class="token punctuation">(</span>key<span class="token punctuation">,</span><span class="token builtin">len</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>slots<span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">if</span> self<span class="token punctuation">.</span>slots<span class="token punctuation">[</span>hashvalue<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token boolean">None</span><span class="token punctuation">:</span>\n        self<span class="token punctuation">.</span>slots<span class="token punctuation">[</span>hashvalue<span class="token punctuation">]</span> <span class="token operator">=</span> key\n        self<span class="token punctuation">.</span>data<span class="token punctuation">[</span>hashvalue<span class="token punctuation">]</span> <span class="token operator">=</span> data\n    <span class="token keyword">else</span><span class="token punctuation">:</span>\n        <span class="token keyword">if</span> self<span class="token punctuation">.</span>slots<span class="token punctuation">[</span>hashvalue<span class="token punctuation">]</span> <span class="token operator">==</span> key<span class="token punctuation">:</span>\n            self<span class="token punctuation">.</span>data<span class="token punctuation">[</span>hashvalue<span class="token punctuation">]</span> <span class="token operator">=</span> data  <span class="token comment">#replace</span>\n        <span class="token keyword">else</span><span class="token punctuation">:</span>   <span class="token comment"># Open addressing 방법</span>\n            nextslot <span class="token operator">=</span> self<span class="token punctuation">.</span>rehash<span class="token punctuation">(</span>hashvalue<span class="token punctuation">,</span><span class="token builtin">len</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>slots<span class="token punctuation">)</span><span class="token punctuation">)</span>\n            <span class="token keyword">while</span> self<span class="token punctuation">.</span>slots<span class="token punctuation">[</span>nextslot<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token boolean">None</span> <span class="token operator">and</span> self<span class="token punctuation">.</span>slots<span class="token punctuation">[</span>nextslot<span class="token punctuation">]</span> <span class="token operator">!=</span> key<span class="token punctuation">:</span>\n                nextslot <span class="token operator">=</span> self<span class="token punctuation">.</span>rehash<span class="token punctuation">(</span>nextslot<span class="token punctuation">,</span><span class="token builtin">len</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>slots<span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n            <span class="token keyword">if</span> self<span class="token punctuation">.</span>slots<span class="token punctuation">[</span>nextslot<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token boolean">None</span><span class="token punctuation">:</span>\n                self<span class="token punctuation">.</span>slots<span class="token punctuation">[</span>nextslot<span class="token punctuation">]</span><span class="token operator">=</span>key\n                self<span class="token punctuation">.</span>data<span class="token punctuation">[</span>nextslot<span class="token punctuation">]</span><span class="token operator">=</span>data\n            <span class="token keyword">else</span><span class="token punctuation">:</span>\n                self<span class="token punctuation">.</span>data<span class="token punctuation">[</span>nextslot<span class="token punctuation">]</span> <span class="token operator">=</span> data <span class="token comment">#replace</span>\n\n    <span class="token keyword">def</span> <span class="token function">hashfunction</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>key<span class="token punctuation">,</span>size<span class="token punctuation">)</span><span class="token punctuation">:</span>\n         <span class="token keyword">return</span> key<span class="token operator">%</span>size\n\n    <span class="token keyword">def</span> <span class="token function">rehash</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>oldhash<span class="token punctuation">,</span>size<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>oldhash<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">%</span>size\n\n    <span class="token keyword">def</span> <span class="token function">get</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>key<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        startslot <span class="token operator">=</span> self<span class="token punctuation">.</span>hashfunction<span class="token punctuation">(</span>key<span class="token punctuation">,</span><span class="token builtin">len</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>slots<span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n        data <span class="token operator">=</span> <span class="token boolean">None</span>\n        stop <span class="token operator">=</span> <span class="token boolean">False</span>\n        found <span class="token operator">=</span> <span class="token boolean">False</span>\n        position <span class="token operator">=</span> startslot\n        <span class="token keyword">while</span> self<span class="token punctuation">.</span>slots<span class="token punctuation">[</span>position<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token boolean">None</span> <span class="token operator">and</span> <span class="token operator">not</span> found <span class="token operator">and</span> <span class="token operator">not</span> stop<span class="token punctuation">:</span>\n            <span class="token keyword">if</span> self<span class="token punctuation">.</span>slots<span class="token punctuation">[</span>position<span class="token punctuation">]</span> <span class="token operator">==</span> key<span class="token punctuation">:</span>\n                found <span class="token operator">=</span> <span class="token boolean">True</span>\n                data <span class="token operator">=</span> self<span class="token punctuation">.</span>data<span class="token punctuation">[</span>position<span class="token punctuation">]</span>\n            <span class="token keyword">else</span><span class="token punctuation">:</span>\n                position<span class="token operator">=</span>self<span class="token punctuation">.</span>rehash<span class="token punctuation">(</span>position<span class="token punctuation">,</span><span class="token builtin">len</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>slots<span class="token punctuation">)</span><span class="token punctuation">)</span>\n                <span class="token keyword">if</span> position <span class="token operator">==</span> startslot<span class="token punctuation">:</span>\n                    stop <span class="token operator">=</span> <span class="token boolean">True</span>\n        <span class="token keyword">return</span> data\n\n    <span class="token keyword">def</span> <span class="token function">__getitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>key<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token keyword">return</span> self<span class="token punctuation">.</span>get<span class="token punctuation">(</span>key<span class="token punctuation">)</span>\n\n    <span class="token keyword">def</span> <span class="token function">__setitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>key<span class="token punctuation">,</span>data<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        self<span class="token punctuation">.</span>put<span class="token punctuation">(</span>key<span class="token punctuation">,</span>data<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<ol start="4">\n<li>\n<p>Analysis of Hashing</p>\n</li>\n<li>\n<p>Hash table에서 가장 중요한 것은 load factor(λ)이다. λ이 작을수록 비어있는 slot이 많다는 뜻이며, 충돌도 비교적 적다. 반대로 λ이 클수록 hash table이 꽉 차있다는 의미이며 따라서 충돌도 더 많을 수 있다.</p>\n</li>\n</ol>\n<hr>\n<h2>3. Sorting</h2>\n<ol>\n<li>\n<p>The Bubble Sort</p>\n<ul>\n<li>(n-1과 n을 비교) X n번</li>\n<li>O(n^2)</li>\n</ul>\n</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">def</span> <span class="token function">bubble_sort</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">for</span> passnum <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>passnum<span class="token punctuation">)</span><span class="token punctuation">:</span>\n            <span class="token keyword">if</span> <span class="token builtin">list</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> <span class="token builtin">list</span><span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">:</span>\n                <span class="token builtin">list</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token builtin">list</span><span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token builtin">list</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span>\n</code></pre>\n      </div>\n<ol start="2">\n<li>\n<p>The Selection Sort</p>\n<ul>\n<li>제일 큰거 search 해서 뒤에에서 n번째에 두기 X 반복</li>\n<li>O(n^2)</li>\n<li>pythontutor.com 에서 과정 볼수 있음</li>\n</ul>\n</li>\n<li>\n<p>The Insertion Sort</p>\n<ul>\n<li>리스트의 크기를 1씩 키워가며 sorting</li>\n<li>추가되는 value는 이미 sorting 되어있는 값과 비교해서 맞는 자리에 넣기</li>\n</ul>\n</li>\n<li>\n<p>The Shell Sort</p>\n<ul>\n<li>몇개의 sublist 로 나눠서 sorting 한다음 합치기</li>\n<li>단, sublist로 나눌 때 바로 옆에 있는거랑 같이 들어가지 않고 step을 두고 들어감.</li>\n<li>interval 값을 구하는 식도 따로 있음.</li>\n</ul>\n</li>\n<li>\n<p>The Merge Sort <em>재귀</em></p>\n<ul>\n<li>두개씩 비교 해서 sorting 하고 비교된걸 합쳐서 다시 sorting 하고... 모두 합쳐질때까지 sorting.</li>\n<li>두개씩 비교하기 때문에 logn, 마지막에 n번 돌며 하나씩 비교하기 때문에 O(nlogn)이 나온다.</li>\n</ul>\n</li>\n<li>\n<p>The Quick Sort <em>재귀</em></p>\n<ul>\n<li>pivot value라는 기준점을 하나 정한다(정하는 방법은 다양함).</li>\n<li>pivot value를 제외한 가장 왼쪽 값과 가장 오른쪽 값을 각각 leftmark, rightmark라고 한다.</li>\n<li>leftmark와 pivot value 를 비교해서 leftmark가 더 클때 leftmark는 움직임을 멈춘다. 이때 leftmark와 rightmark랑 비교해서 leftmark가 더 크면 swap한다.</li>\n<li>leftmark와 rightmark 가 만날때까지 반복하면 pivot value를 기준으로 lefthalf와 righthalf가 나뉘게 된다.</li>\n<li>나뉜 lefthalf에서 다시 quick sort를, righthalf에서도 quick sort를 각각 한다.</li>\n<li>반복</li>\n</ul>\n</li>\n</ol>',frontmatter:{title:"Sorting and Searching",date:"2017-08-23",path:"/sort-search",tags:["Algorithm","python"],excerpt:"Python Algorithm Study - Week 7, 8"}}},pathContext:{}}}});
//# sourceMappingURL=path---sort-search-d6350569144fdc318e03.js.map