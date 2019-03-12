webpackJsonp([0x7e69c09752e2],{376:function(n,s){n.exports={data:{markdownRemark:{html:'<blockquote>\n<p>개발환경 세팅은 자주 있는 일이 아니기 때문에 기억하기 쉽지 않다. 빠르게 셋업하고 개발에 집중하기 위해 정리!</p>\n</blockquote>\n<h2>1. Setup script</h2>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash"><span class="token comment"># Homebrew</span>\n/usr/bin/ruby -e <span class="token string">"<span class="token variable"><span class="token variable">$(</span>curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install<span class="token variable">)</span></span>"</span>\n\n<span class="token comment"># zsh</span>\nbrew <span class="token function">install</span> zsh\n\n<span class="token comment"># oh-my-zsh</span>\nsh -c <span class="token string">"<span class="token variable"><span class="token variable">$(</span>curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh<span class="token variable">)</span></span>"</span>\n\n<span class="token comment"># nvm</span>\ncurl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh <span class="token operator">|</span> <span class="token function">bash</span>\n<span class="token function">source</span> ~/.nvm/nvm.sh\n\n<span class="token comment"># Yarn</span>\nbrew <span class="token function">install</span> yarn\n\n<span class="token comment"># pure-prompt</span>\n<span class="token function">npm</span> <span class="token function">install</span> --global pure-prompt\n\n<span class="token comment"># pyenv</span>\nbrew <span class="token function">install</span> pyenv\n\n<span class="token comment"># pyenv-virtualenv</span>\nbrew <span class="token function">install</span> pyenv-virtualenv\n\n<span class="token comment"># autoenv</span>\nbrew <span class="token function">install</span> autoenv\n\n<span class="token comment"># Start</span>\n<span class="token function">source</span> ~/.zshrc\n</code></pre>\n      </div>\n<hr>\n<h2>2. <code>.zshrc</code>에 설정 추가하기</h2>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash"><span class="token comment"># ~/.zshrc</span>\n\n<span class="token comment"># pyenv</span>\n<span class="token function">eval</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span>pyenv init -<span class="token variable">)</span></span>"</span>\n\n<span class="token comment"># pyenv-virtualenv</span>\n<span class="token function">eval</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span>pyenv virtualenv-init -<span class="token variable">)</span></span>"</span>\n\n<span class="token comment"># autoenv</span>\n<span class="token function">source</span> /usr/local/opt/autoenv/activate.sh\n\n<span class="token comment"># pure-prompt</span>\nautoload -U promptinit<span class="token punctuation">;</span> promptinit\nprompt pure\n</code></pre>\n      </div>\n<hr>\n<h2>3. <code>.gitconfig</code> 설정하기</h2>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">[user]\n\tname = username\n\temail = user@gmail.com\n[alias]\n\tco = checkout\n\ts = status --short --branch\n\td = diff\n\tds = diff --staged\n\tcommend = commit --amend --no-edit</code></pre>\n      </div>\n<hr>\n<h2>4. pyenv-virtualenv, autoenv 설정하기</h2>\n<ul>\n<li>python 프로젝트를 시작한다면 <code>pyenv virtualenv &#x3C;python-version> &#x3C;project-name></code>명령어로 가상환경을 추가한다.</li>\n<li>가상환경 실행은 <code>pyenv activate &#x3C;project-name></code>으로 한다.</li>\n<li>프로젝트의 루트 디렉토리에 <code>.env</code> 파일을 만들고 위의 명령어를 저장하면 디렉토리에 진입했을 때 자동으로 가상환경을 실행시킬 수 있다.</li>\n</ul>\n<hr>\n<h2>5. lint-staged, prettier 설정하기</h2>\n<ul>\n<li>수정된 파일을 스테이징할 때, prettier 설정에 따라 자동으로 linting 을 해주는 라이브러리이다.</li>\n<li>꼭 <code>--dev</code> 플래그를 달아주어 devDependencies 에 추가되도록 해야한다.</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">yarn add lint-staged husky prettier --dev\n</code></pre>\n      </div>\n<ul>\n<li>스크립트도 아래와 같이 수정해준다.</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json">// package.json\n<span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n\t<span class="token property">"precommit"</span><span class="token operator">:</span> <span class="token string">"lint-staged"</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token property">"lint-staged"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n\t<span class="token property">"*.{js,jsx}"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n\t\t<span class="token string">"prettier --write"</span><span class="token punctuation">,</span>\n\t\t<span class="token string">"git add"</span>\n\t<span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span>\n</code></pre>\n      </div>\n<hr>\n<h2>python</h2>\n<ol>\n<li>Install <code>python3</code></li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ brew <span class="token function">install</span> python3\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">\t- if python3 is not linked, run `brew link python`</code></pre>\n      </div>\n<ol start="2">\n<li>Install <code>pip</code></li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">python3 get-pip.py</code></pre>\n      </div>\n<ol start="2">\n<li>Install virtualenv, virtualenvwrapper</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">python3 -m pip install virtualenv virtualenvwrapper</code></pre>\n      </div>\n<ol start="3">\n<li>Create virtualenv</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">$ which python3\n$ virtualenv --python=/usr/local/bin/python3 venv3</code></pre>\n      </div>\n<hr>\n<h2>poetry</h2>\n<ol>\n<li>Install</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">$ python3 -m pip install poetry\n# or\n$ curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python</code></pre>\n      </div>\n<ol start="2">\n<li>Init</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">$ poetry init\n$ poetry add django</code></pre>\n      </div>\n<p>if python3 command is not found in fish shell</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">$ set -U fish_user_paths /usr/local/Cellar/python/3.7.2_1/Frameworks/Python.framework/Versions/3.7/bin $fish_user_paths</code></pre>\n      </div>',frontmatter:{title:"개발환경 세팅하기",date:"2018-04-14",path:"/dev-env-setup",tags:["zsh","ohmyzsh","pyenv","pyenv-virtualenv","autoenv","pure-prompt"],excerpt:""}}},pathContext:{}}}});
//# sourceMappingURL=path---dev-env-setup-8817bba029911f1ca28e.js.map