webpackJsonp([53561163571803],{393:function(n,s){n.exports={data:{markdownRemark:{html:'<p><a href="http://interactivepython.org/courselib/static/pythonds/index.html">Problem Solving with Algorithms and Data Structures using Python</a> 책을 읽으며 스터디한 내용을 정리하여 연재합니다.</p>\n<hr>\n<h2>1. Tree Data Structure</h2>\n<ul>\n<li>You can move entire sections of a tree (called a subtree) to a different position in the tree without affecting the lower levels of the hierarchy</li>\n<li><a href="https://en.wikipedia.org/wiki/Payload_(computing)">Payload</a> : In computing and telecommunications, the payload is the part of transmitted data that is the actual intended message. The payload excludes any headers or metadata sent solely to facilitate payload delivery</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">{  \n   "data":{  \n      "message":"Hello, world!"\n   }\n}</code></pre>\n      </div>\n<p>The string "Hello, world!" is the payload, while the rest is protocol overhead.</p>\n<ol start="2">\n<li>\n<p>List of Lists representation</p>\n<ul>\n<li>빈 리스트들이 있는 이유는 insertRight, insertLeft 같은 reference의 자리 역할을 하기 때문.</li>\n</ul>\n</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">myTree <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'d\'</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'e\'</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'c\'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'f\'</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">]</span>\n</code></pre>\n      </div>\n<p><img src="http://interactivepython.org/courselib/static/pythonds/_images/smalltree.png"></p>\n<hr>\n<h2>2. Priority Queues with Binary Heaps</h2>\n<ol start="0">\n<li>\n<p>Priority Queue</p>\n<ul>\n<li>Queue는 queue인데 정렬이 되어 있는 queue (여기서는 오름차순)</li>\n<li>How to enqueue : sorting 을 하면서 enqueue 된다. (the logical order of items inside a queue is determined by their priority)</li>\n<li>원래는 insert(O(n)) &#x26; sort(O(nlogn)) 을 거쳐야 하지만 binary heap을 사용하면 O(logn)으로 가능하다. 왜냐면 부모랑만 비교하면되고 sibling과의 대소는 무시해도 되기 때문에. (height가 n인 tree의 size는 2^n+x)</li>\n</ul>\n</li>\n<li>\n<p>Heap</p>\n<ul>\n<li>최댓값 또는 최솟값을 빨리 찾기 위해 고안된 Complete binary tree.</li>\n<li><strong>Binary tree</strong> : 모든 레벨의 노드가 최대 두개의 자식 노드를 가진 트리. 자식노드는 left, right의 자리를 가지고 있다.</li>\n<li><strong>Complete binary tree</strong> : leaf node (가장 말단의 노드)를 제외하고는 모든 노드가 \'채워진\' binary tree / 가장 마지막 subtree 빼고는 left, right가 모두 채워져 있어야함.</li>\n<li>Tree representation 처럼 쓰지 않고 그냥 단일 list를 사용한다. 이것이 binary heap형태로 되어있다고 머릿 속에 상-상하며 연산을 구현하면 된다.(When we diagram the heap it looks a lot like a tree, but when we implement it we use only a single list)</li>\n<li>min Heap(오름차순) &#x26; max Heap(내림차순)    </li>\n<li><a href="https://en.wikipedia.org/wiki/Heapsort">Heap sort</a> : O(nlogn)의 완전 힙한 시간복잡도를 가진다. 모든 노드를 순회하고(n) 각 노드를 root에 도착할 때까지 부모랑 대소비교하기 때문. (* 참고 : Quicksort 가 평균 O(nlogn), 최대 O(n^2)이다.)</li>\n</ul>\n</li>\n</ol>\n<hr>\n<h2>3. Binary Heap Operations</h2>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token comment"># Basic operations of binary min heap</span>\nBinaryHeap<span class="token punctuation">(</span><span class="token punctuation">)</span>\ninsert<span class="token punctuation">(</span>k<span class="token punctuation">)</span>\nfindMin<span class="token punctuation">(</span><span class="token punctuation">)</span>   <span class="token comment"># 가장 작은 값을 리턴만 한다.</span>\ndelMin<span class="token punctuation">(</span><span class="token punctuation">)</span>    <span class="token comment"># 가장 작은 값을 리턴하면서 삭제한다.</span>\nisEmpty<span class="token punctuation">(</span><span class="token punctuation">)</span>\nsize<span class="token punctuation">(</span><span class="token punctuation">)</span>\nbuildHeap<span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">)</span> <span class="token comment"># key 값 리스트를 가지고 새로운 heap을 만든다.</span>\n</code></pre>\n      </div>\n<hr>\n<h2>4. Binary Heap Implementation</h2>\n<ol>\n<li>\n<p>The Structure Property</p>\n<ul>\n<li>Complete binary tree: leaf node (가장 말단의 노드)를 제외하고는 모든 노드가 \'채워진\' binary tree / 가장 마지막 subtree 빼고는 left, right가 모두 채워져 있어야함.<br/>\n<img src="http://interactivepython.org/courselib/static/pythonds/_images/compTree.png" alt="Complete binary tree"></li>\n<li>x // 2 의 아주 간단한 integer division 만으로도 모든 노드의 자리를 구할 수 있다(traversing nodes).</li>\n<li>예를 들어, 어떤 노드가 <code>p</code>의 자리에 있다고 할 때, 이 노드의 left child는 <code>2p</code> 자리에 있다. right child 의 자리는 <code>2p+1</code>이다. 당연히 p의 부모 노드의 자리는 <code>p/2</code>이다.</li>\n</ul>\n</li>\n<li>\n<p>The Heap Order Property</p>\n<ul>\n<li>In a heap, for every node x with parent p, the key in p is smaller than or equal to the key in x</li>\n</ul>\n</li>\n<li>\n<p>Heap Operations</p>\n</li>\n<li>\n<p>Insert() <br/>\n<img src="http://interactivepython.org/courselib/static/pythonds/_images/percUp.png" alt="insert"></p>\n</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">class</span> <span class="token class-name">BinHeap</span><span class="token punctuation">:</span>\n    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        self<span class="token punctuation">.</span>heapList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment"># this zero is not used, but is there so that simple integer division can be used in later methods.</span>\n        self<span class="token punctuation">.</span>currentSize <span class="token operator">=</span> <span class="token number">0</span>\n\n    <span class="token keyword">def</span> <span class="token function">insert</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>k<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        self<span class="token punctuation">.</span>heapList<span class="token punctuation">.</span>append<span class="token punctuation">(</span>k<span class="token punctuation">)</span>\n        self<span class="token punctuation">.</span>currentSize <span class="token operator">=</span> self<span class="token punctuation">.</span>currentSize <span class="token operator">+</span> <span class="token number">1</span>\n        self<span class="token punctuation">.</span>percUp<span class="token punctuation">(</span>self<span class="token punctuation">.</span>currentSize<span class="token punctuation">)</span>\n\n    <span class="token keyword">def</span> <span class="token function">percUp</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>i<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token comment"># i에는 currentSize가 들어감</span>\n        <span class="token keyword">while</span> i <span class="token operator">//</span> <span class="token number">2</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">:</span>\n            <span class="token keyword">if</span> self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>i <span class="token operator">//</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token comment"># 가장 마지막에 넣은 값보다 부모노드가 클때,</span>\n                self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>i <span class="token operator">//</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>i <span class="token operator">//</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token comment"># 부모랑 자식의 자리를 바꿔주고</span>\n            i <span class="token operator">=</span> i <span class="token operator">//</span> <span class="token number">2</span> <span class="token comment"># root까지 올라갔다 온다. 이거 때문에 (O(logn))</span>\n\n        <span class="token comment"># 이 과정을 거치는 동안 siblings에는 아무런 영향을 미치지 않는다!</span>\n</code></pre>\n      </div>\n<ul>\n<li>delMin() <br/>\n<img src="http://interactivepython.org/courselib/static/pythonds/_images/percDown.png" alt="delMin()"></li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n\n    <span class="token keyword">def</span> <span class="token function">delMin</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        retval <span class="token operator">=</span> self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment"># __init__에서 제일 첫 노드는 0이기 때문에 실질적으로 heap의 root는 self.heapList[1] 이다.</span>\n        self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>self<span class="token punctuation">.</span>currentSize<span class="token punctuation">]</span> <span class="token comment"># 가장 마지막 값을 root에 넣어준다.</span>\n        self<span class="token punctuation">.</span>currentSize <span class="token operator">=</span> self<span class="token punctuation">.</span>currentSize <span class="token operator">-</span> <span class="token number">1</span>\n        self<span class="token punctuation">.</span>heapList<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># leaf node 자리로 옮겨온 최솟값을 제거</span>\n        self<span class="token punctuation">.</span>percDown<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>\n        <span class="token keyword">return</span> retval\n\n    <span class="token keyword">def</span> <span class="token function">percDown</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>i<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token comment"># 중요!: i자리의 있는 노드의 자식은 i*2또는 i*2+1이다.</span>\n        <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> self<span class="token punctuation">.</span>currentSize<span class="token punctuation">:</span> <span class="token comment"># 마지막 노드까지 검사 (1, 2, 4 까지 감)</span>\n            mc <span class="token operator">=</span> self<span class="token punctuation">.</span>minChild<span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token comment"># self.heapList[i]의 자식 중에 작은 자식의 자리 = mc</span>\n            <span class="token keyword">if</span> self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>mc<span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token comment"># 작은 자식이 자기보다 작다면...</span>\n                self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>mc<span class="token punctuation">]</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>mc<span class="token punctuation">]</span> <span class="token comment"># 그 자식과 자리를 바꾼다.</span>\n            i <span class="token operator">=</span> mc <span class="token comment"># 위의 과정 반복</span>\n\n    <span class="token keyword">def</span> <span class="token function">minChild</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>i<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token comment"># right node와 left node 중 더 작은 것 찾기</span>\n        <span class="token keyword">if</span> i <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">></span> self<span class="token punctuation">.</span>currentSize<span class="token punctuation">:</span>\n            <span class="token keyword">return</span> i <span class="token operator">*</span> <span class="token number">2</span>\n        <span class="token keyword">else</span><span class="token punctuation">:</span>\n            <span class="token keyword">if</span> self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>i<span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span> self<span class="token punctuation">.</span>heapList<span class="token punctuation">[</span>i<span class="token operator">*</span><span class="token number">2</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">:</span>\n                <span class="token keyword">return</span> i <span class="token operator">*</span> <span class="token number">2</span>\n            <span class="token keyword">else</span><span class="token punctuation">:</span>\n                <span class="token keyword">return</span> i <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span>\n</code></pre>\n      </div>\n<ul>\n<li>buildHeap</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n\n    <span class="token keyword">def</span> <span class="token function">buildHeap</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>alist<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        i <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>alist<span class="token punctuation">)</span> <span class="token operator">//</span> <span class="token number">2</span> <span class="token comment"># 가장 마지막 노드의 부모 자리</span>\n        self<span class="token punctuation">.</span>currentSize <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>alist<span class="token punctuation">)</span>\n        self<span class="token punctuation">.</span>heapList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> alist<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span>\n        <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n            self<span class="token punctuation">.</span>percDown<span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token comment"># 마지막 노드 중 작은 것과 부모 노드 비교해서 부모가 더 크면 자리 바꿈</span>\n            i <span class="token operator">=</span> i <span class="token operator">-</span> <span class="token number">1</span> <span class="token comment"># 아까 그 부모의 sibling 도 똑같이 자리바꿈 해주기</span>\n</code></pre>\n      </div>',frontmatter:{title:"Trees",date:"2017-09-14",path:"/tree",tags:["Algorithm","python"],excerpt:"Python Algorithm Study - Week 9, 10"}}},pathContext:{}}}});
//# sourceMappingURL=path---tree-260fd481cc39c173f78c.js.map