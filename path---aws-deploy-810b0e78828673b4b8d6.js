webpackJsonp([43911150729035],{368:function(n,s){n.exports={data:{markdownRemark:{html:'<p>참고 : Ask Django</p>\n<p>👉 <a href="/blog/django-aws">AWS로 Django 프로젝트 배포하기(1)</a></p>\n<h2>1. AWS 인스턴스 생성하기</h2>\n<ol>\n<li>AWS에서 계정을 만듭니다.</li>\n<li><code>Launch Instance</code>를 클릭하여 인스턴스를 생성합니다.</li>\n<li>Ubuntu Server 14 버전을 선택하고</li>\n<li><code>Free tier eligible</code> 옵션을 선택합니다.</li>\n<li><code>Edit Security Groups</code> 에서 <code>Add Rule</code> 를 클릭해서 HTTP(80포트)와 HTTPS(해도되고 안해도됨)를 추가합니다.</li>\n<li><code>Create a new key pair</code> 선택하고 pem key를 생성합니다. ! 다운로드 받아지는 위치를 기억하세요. 나중에 불러와야합니다.</li>\n<li><code>EC2 Dashboard</code>로 돌아가서 왼쪽 메뉴 중 <code>Elastic IPs</code>를 클릭합니다. 인스턴스를 끄고 키더라도 IP주소가 바뀌지 않도록 Elastic IPs를 받아와야합니다.  <code>Actions</code>를 클릭하여 방금 생성한 Instance 선택하고 <code>Associate address</code>를 해줍니다. 이제부터 이 Elastic IPs 주소를 IP주소 또는 IP라고 부를게요.</li>\n</ol>\n<hr>\n<h2>2. 접속하기</h2>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ <span class="token function">sudo</span> <span class="token function">chmod</span> 400 <span class="token operator">&lt;</span>pem키<span class="token operator">></span>\n$ ssh-keygen -R <span class="token operator">&lt;</span>Elastic IP주소<span class="token operator">></span>\n$ <span class="token function">ssh</span> -i <span class="token operator">&lt;</span>/pem키경로/pem키<span class="token operator">></span> ubuntu@<span class="token operator">&lt;</span>IP주소<span class="token operator">></span>\n</code></pre>\n      </div>\n<ol>\n<li>pem 키가 있는 디렉토리로 가서 권한을 변경해줍니다.</li>\n<li>ssh 공개키/비밀키 생성과 관련있습니다.</li>\n<li>AWS의 우분투 컴퓨터에 접속합니다.</li>\n<li>그러면 커맨드라인에 [ubuntu@&#x3C;IP주소>] 로 컴퓨터가 바뀐 것을 볼 수 있습니다.</li>\n</ol>\n<hr>\n<h2>3. Dependency 패키지들 다운로드</h2>\n<p>이제 서비스에서 사용한 3rd party 패키지들을 설치해주어야합니다. * <a href="https://gist.github.com/allieus/b8186b6ed53cbe1e8564">AskDjango의 배포 자동화 스크립트</a>를 사용했습니다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ <span class="token function">sudo</span> <span class="token function">wget</span> https://repo.continuum.io/archive/Anaconda3-4.3.0-MacOSX-x86_64.pkg\n$ <span class="token function">sudo</span> <span class="token function">apt-get</span> update\n$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> language-pack-ko <span class="token function">git</span> python3-pip -y\n$ <span class="token function">sudo</span> pip3 <span class="token function">install</span> jinja2 termcolor django<span class="token operator">==</span>1.10.5\n$ <span class="token function">sudo</span> python3 django_dist.py <span class="token operator">&lt;</span>project-name<span class="token operator">></span>.settings.prod\n</code></pre>\n      </div>\n<ol>\n<li>Python은 <a href="https://www.continuum.io/downloads">Anaconda Python</a>을 설치하는 것이 간편합니다. 널리 사용되는 패키지들이 이미 들어있습니다. 사이트에 들어가서 다운로드 버튼을 우클릭하고 링크 주소를 복사하고 아래의 명령어를 실행합니다. wget을 사용해서 다운로드 링크만으로 터미널에서 다운로드를 받을 수 있습니다.</li>\n<li>apt-get 을 업데이트하고</li>\n<li>language-pack-ko, git, python3-pip를 설치합니다. -y 플래그는 yes 라는 답을 미리 해주는 것입니다.</li>\n<li>\n<p>jinja2, termcolor, django 를 설치합니다.</p>\n<ul>\n<li><code>$ sudo pip3 install -r &#x3C;requirements>.txt</code> 명령어를 사용해서 1장에서 분기해준 각종 <code>requirements.txt</code> 파일들을 다운로드 받습니다. 만약에 의존성 에러가 나면 수동으로 각종 패키지들을 <code>$ sudo pip3 install &#x3C;package-name></code>으로 설치합니다.</li>\n</ul>\n</li>\n<li>위의 명령어로 django_dist.py 파일이 실행될 경로인 프로젝트 디렉토리 내 settings 디렉토리 내 prod.py 를 지정해주고 실행합니다.</li>\n</ol>\n<hr>\n<h2>4. 실행하기</h2>\n<p>이제 DB를 마이그레이션 하고 서버를 실행하면 됩니다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ <span class="token function">sudo</span> python3 manage.py makemigrations --settings<span class="token operator">=</span><span class="token operator">&lt;</span>project-name<span class="token operator">></span>.settings.dev\n$ <span class="token function">sudo</span> python3 manage.py migrate --settings<span class="token operator">=</span><span class="token operator">&lt;</span>project-name<span class="token operator">></span>.settings.dev\n$ <span class="token function">sudo</span> python3 manage.py runserver --settings<span class="token operator">=</span><span class="token operator">&lt;</span>project-name<span class="token operator">></span>.settings.dev 0.0.0.0:80\n</code></pre>\n      </div>\n<p>마지막 명령어로 80포트로 runserver 합니다.</p>\n<hr>\n<h2>5. 호스트 설정하기</h2>\n<p>위의 과정을 마치고 나서 주소창에 <code>&#x3C;IP주소>:80</code> 으로 들어가면 django 화면이 뜨긴 하지만 노란 에러 화면, disallowed host 에러가 발생합니다. 그때는 settings.py 등 <code>ALLOWED_HOSTS = []</code>가 들어있는 파일들을 <code>ALLOWED_HOSTS = [\'*\']</code> 로 바꿔줍니다.</p>\n<p><em>끝! 그런데...</em></p>\n<hr>\n<h2>6. 포트 kill하기</h2>\n<p>테스트를 하다가 port 를 켜놓고 다시 접근하면 이미 점유된 포트라는 오류 메시지가 뜹니다. 이런 경우, 이전에 쓰던 port를 강제로 kill 해줍니다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">$ <span class="token function">fuser</span> -k -n tcp <span class="token operator">&lt;</span>port.no<span class="token operator">></span>\n$ Isof -i TCP:<span class="token operator">&lt;</span>port.no<span class="token operator">></span>\n</code></pre>\n      </div>\n<ol>\n<li>&#x3C;port.no>자리에 포트 번호를 입력하여 포트를 kill 하고,</li>\n<li>열려있는 port 를 조회하여 제대로 kill되었는지 확인합니다.</li>\n</ol>\n<hr>\n<h2>7. DEBUG = FALSE</h2>\n<p><code>settings.py</code> 에서 <code>DEBUG = True</code>가 되어 있으면 사용자에게 django의 debugging 화면(노란 오류페이지)이 노출됩니다. 그래서 실 서비스를 할 때에는 <code>DEBUG = False</code>를 해주어야 합니다.</p>\n<hr>\n<h2>8. 서비스 스타트</h2>\n<p>실제 서비스 할때에는 dev 버전을 <code>runserver</code>하지 않고 <code>$ sudo service &#x3C;project-name> start</code> 명령어로 서버를 런합니다.</p>\n<hr>\n<h2>9. 다른 방법</h2>\n<p>구글에서 <code>AWS Django AMI</code>를 검색하면 위의 과정을 모두 거친 인스턴스?를 다운로드 받을 수 있습니다. (유료)</p>\n<p><strong>Let\'s code like a girl!</strong></p>',frontmatter:{title:"AWS로 Django 프로젝트 배포하기(2)",date:"2017-02-14",path:"/aws-deploy",tags:["Django","AWS"],excerpt:"ec2 인스턴스 생성부터 설정까지"}}},pathContext:{}}}});
//# sourceMappingURL=path---aws-deploy-810b0e78828673b4b8d6.js.map