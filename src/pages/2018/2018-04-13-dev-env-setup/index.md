---
path: "/dev-env-setup"
date: "2018-04-14"
title: "개발환경 세팅하기"
tags: ['zsh', 'ohmyzsh', 'pyenv', 'pyenv-virtualenv', 'autoenv', 'pure-prompt']
excerpt: ""
type: ""
---

> 개발환경 세팅은 자주 있는 일이 아니기 때문에 기억하기 쉽지 않다. 빠르게 셋업하고 개발에 집중하기 위해 정리!

## 1. Setup script

```bash
# Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# zsh
brew install zsh

# oh-my-zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
source ~/.nvm/nvm.sh

# Yarn
brew install yarn

# pure-prompt
npm install --global pure-prompt

# pyenv
brew install pyenv

# pyenv-virtualenv
brew install pyenv-virtualenv

# autoenv
brew install autoenv

# Start
source ~/.zshrc
```

---

## 2. `.zshrc`에 설정 추가하기

```bash
# ~/.zshrc

# pyenv
eval "$(pyenv init -)"

# pyenv-virtualenv
eval "$(pyenv virtualenv-init -)"

# autoenv
source /usr/local/opt/autoenv/activate.sh

# pure-prompt
autoload -U promptinit; promptinit
prompt pure
```

---

## 3. `.gitconfig` 설정하기

```
[user]
	name = username
	email = user@gmail.com
[alias]
	co = checkout
	s = status --short --branch
	d = diff
	ds = diff --staged
	commend = commit --amend --no-edit
```

---

## 4. pyenv-virtualenv, autoenv 설정하기

* python 프로젝트를 시작한다면 `pyenv virtualenv <python-version> <project-name>`명령어로 가상환경을 추가한다.
* 가상환경 실행은 `pyenv activate <project-name>`으로 한다.
* 프로젝트의 루트 디렉토리에 `.env` 파일을 만들고 위의 명령어를 저장하면 디렉토리에 진입했을 때 자동으로 가상환경을 실행시킬 수 있다.

---

## 5. lint-staged, prettier 설정하기

* 수정된 파일을 스테이징할 때, prettier 설정에 따라 자동으로 linting 을 해주는 라이브러리이다.
* 꼭 `--dev` 플래그를 달아주어 devDependencies 에 추가되도록 해야한다.

```bash
yarn add lint-staged husky prettier --dev
```

* 스크립트도 아래와 같이 수정해준다.

```json
// package.json
"scripts": {
	"precommit": "lint-staged",
},
"lint-staged": {
	"*.{js,jsx}": [
		"prettier --write",
		"git add"
	]
},
```

---

## 6. Python

1. Install `python3`

   * if python3 is not linked, run `brew link python`

```bash
$ brew install python3
```

2. Install `pip`

```
python3 get-pip.py
```

2. Install virtualenv, virtualenvwrapper

```
python3 -m pip install virtualenv virtualenvwrapper
```

3. Create virtualenv

```
$ which python3
$ virtualenv --python=/usr/local/bin/python3 venv3
```

---

## 7. Python package management (Poetry)

1. Install

```
$ python3 -m pip install poetry
# or
$ curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python
```

2. Init

```
$ poetry init
$ poetry add django
```

if python3 command is not found in fish shell

```
$ set -U fish_user_paths /usr/local/Cellar/python/3.7.2_1/Frameworks/Python.framework/Versions/3.7/bin $fish_user_paths
```
