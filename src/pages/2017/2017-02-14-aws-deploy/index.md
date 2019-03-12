---
path: "/aws-deploy"
date: "2017-02-14"
title: "AWS로 Django 프로젝트 배포하기(2)"
tags: ['Django', 'AWS']
excerpt: "ec2 인스턴스 생성부터 설정까지"
type: "tips"
---

참고 : Ask Django

:point_right: [AWS로 Django 프로젝트 배포하기(1)](/django-aws)

## 1. AWS 인스턴스 생성하기

1. AWS에서 계정을 만듭니다.
2. `Launch Instance`를 클릭하여 인스턴스를 생성합니다.
3. Ubuntu Server 14 버전을 선택하고
4. `Free tier eligible` 옵션을 선택합니다.
5. `Edit Security Groups` 에서 `Add Rule` 를 클릭해서 HTTP(80포트)와 HTTPS(해도되고 안해도됨)를 추가합니다.
6. `Create a new key pair` 선택하고 pem key를 생성합니다. ! 다운로드 받아지는 위치를 기억하세요. 나중에 불러와야합니다.
7. `EC2 Dashboard`로 돌아가서 왼쪽 메뉴 중 `Elastic IPs`를 클릭합니다. 인스턴스를 끄고 키더라도 IP주소가 바뀌지 않도록 Elastic IPs를 받아와야합니다.  `Actions`를 클릭하여 방금 생성한 Instance 선택하고 `Associate address`를 해줍니다. 이제부터 이 Elastic IPs 주소를 IP주소 또는 IP라고 부를게요.

---

## 2. 접속하기

```bash
$ sudo chmod 400 <pem키>
$ ssh-keygen -R <Elastic IP주소>
$ ssh -i </pem키경로/pem키> ubuntu@<IP주소>
```

1. pem 키가 있는 디렉토리로 가서 권한을 변경해줍니다.
2. ssh 공개키/비밀키 생성과 관련있습니다.
3. AWS의 우분투 컴퓨터에 접속합니다.
4. 그러면 커맨드라인에 [ubuntu@<IP주소>] 로 컴퓨터가 바뀐 것을 볼 수 있습니다.

---

## 3. Dependency 패키지들 다운로드

이제 서비스에서 사용한 3rd party 패키지들을 설치해주어야합니다. * [AskDjango의 배포 자동화 스크립트](https://gist.github.com/allieus/b8186b6ed53cbe1e8564)를 사용했습니다.

```bash
$ sudo wget https://repo.continuum.io/archive/Anaconda3-4.3.0-MacOSX-x86_64.pkg
$ sudo apt-get update
$ sudo apt-get install language-pack-ko git python3-pip -y
$ sudo pip3 install jinja2 termcolor django==1.10.5
$ sudo python3 django_dist.py <project-name>.settings.prod
```

1. Python은 [Anaconda Python](https://www.continuum.io/downloads)을 설치하는 것이 간편합니다. 널리 사용되는 패키지들이 이미 들어있습니다. 사이트에 들어가서 다운로드 버튼을 우클릭하고 링크 주소를 복사하고 아래의 명령어를 실행합니다. wget을 사용해서 다운로드 링크만으로 터미널에서 다운로드를 받을 수 있습니다.
2. apt-get 을 업데이트하고
3. language-pack-ko, git, python3-pip를 설치합니다. -y 플래그는 yes 라는 답을 미리 해주는 것입니다.
4. jinja2, termcolor, django 를 설치합니다.
    - `$ sudo pip3 install -r <requirements>.txt` 명령어를 사용해서 1장에서 분기해준 각종 `requirements.txt` 파일들을 다운로드 받습니다. 만약에 의존성 에러가 나면 수동으로 각종 패키지들을 `$ sudo pip3 install <package-name>`으로 설치합니다.
5. 위의 명령어로 django_dist.py 파일이 실행될 경로인 프로젝트 디렉토리 내 settings 디렉토리 내 prod.py 를 지정해주고 실행합니다.

---

## 4. 실행하기
이제 DB를 마이그레이션 하고 서버를 실행하면 됩니다.

```bash
$ sudo python3 manage.py makemigrations --settings=<project-name>.settings.dev
$ sudo python3 manage.py migrate --settings=<project-name>.settings.dev
$ sudo python3 manage.py runserver --settings=<project-name>.settings.dev 0.0.0.0:80
```

마지막 명령어로 80포트로 runserver 합니다.

---

## 5. 호스트 설정하기
위의 과정을 마치고 나서 주소창에 `<IP주소>:80` 으로 들어가면 django 화면이 뜨긴 하지만 노란 에러 화면, disallowed host 에러가 발생합니다. 그때는 settings.py 등 `ALLOWED_HOSTS = []`가 들어있는 파일들을 `ALLOWED_HOSTS = ['*']` 로 바꿔줍니다.

_끝! 그런데..._

---

## 6. 포트 kill하기
테스트를 하다가 port 를 켜놓고 다시 접근하면 이미 점유된 포트라는 오류 메시지가 뜹니다. 이런 경우, 이전에 쓰던 port를 강제로 kill 해줍니다.

```bash
$ fuser -k -n tcp <port.no>
$ Isof -i TCP:<port.no>
```

1. <port.no>자리에 포트 번호를 입력하여 포트를 kill 하고,
2. 열려있는 port 를 조회하여 제대로 kill되었는지 확인합니다.

---

## 7. DEBUG = FALSE
`settings.py` 에서 `DEBUG = True`가 되어 있으면 사용자에게 django의 debugging 화면(노란 오류페이지)이 노출됩니다. 그래서 실 서비스를 할 때에는 `DEBUG = False`를 해주어야 합니다.

---

## 8. 서비스 스타트
실제 서비스 할때에는 dev 버전을 `runserver`하지 않고 `$ sudo service <project-name> start` 명령어로 서버를 런합니다.

---

## 9. 다른 방법
구글에서 `AWS Django AMI`를 검색하면 위의 과정을 모두 거친 인스턴스?를 다운로드 받을 수 있습니다. (유료)

__Let's code like a girl!__
