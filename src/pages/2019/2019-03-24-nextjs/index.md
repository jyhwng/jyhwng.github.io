---
path: "/react-typescript-nextjs"
date: "2019-03-24"
title: "React + Next.js + TypeScript = ❤️"
tags: ['nextjs', 'ssr','react', 'express', 'typescript']
excerpt: "Building and deploying SSR React with NextJS"
type: ""
---

## Next.js 란?

[Next.js](https://nextjs.org/) 는 Webpack 등 설정없이 서버 사이드 렌더링, 라우팅, 코드 스플리팅 등 다양한 기능을 제공하는 React 프레임워크입니다. 필요할 경우에는 `next.config.js` 안에서 Webpack 설정 등을 오버라이딩할 수 있습니다.

> 👉 [서버 사이드 렌더링(Sever Side Rendering, SSR)](https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4) : 기존의 Single Page App 에서는 초기에 로드되는 자바스크립트 코드가 html 을 그리게 됩니다. SSR 은 서버에서 html 을 그려서 리턴합니다. 검색 엔진에서 html 크롤링이 가능하기 때문에 SEO 에 유리하고, 초기에 자바스크립트 파일을 불러서 렌더링하는 시간도 단축할 수 있습니다.

이 포스팅에서는 Next.js 로 React 프로젝트를 구성하고, TypeScript 와 관련된 설정을 하는 방법에 대해서 다룹니다.

---

## 1. Setup

### 1. Install packages

```bash
$ yarn add react @types/react next @types/next
$ yarn add typescript @zeit/next-typescript
```

### 2. Add `.babelrc`

프로젝트 루트 경로에 `.babelrc`를 추가하고 아래의 설정을 추가합니다. TypeScript 를 사용하기 위해서 `@zeit/next-typescript/babel`가 필요합니다.

```
{
  "presets": ["next/babel", "@zeit/next-typescript/babel"]
}
```

### 3. Create `next.config.js`

`next.config.js`안에서는 `webpack` hook 을 사용하여 webpack 설정을 해주는 것도 가능합니다. `next-typescript` 플러그인을 사용하기 위해서 아래와 같이 export 합니다.

```javascript
// next.config.js
const withTypescript = require("@zeit/next-typescript");

module.exports = withTypescript(
  webpack: (config) => {
    return config;
  }
);
```

### 4. Create `tsconfig.json`

```javascript
// tsconfig.json
{
  "compileOnSave": false,
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "lib": ["es6", "dom"],
  },
}
```

---

## 2. Components

### 1. Create `pages/`

Next.js 는 기본적으로 file system routing 을 지원합니다. 먼저 아래와 같이 index 파일을 만들어줍니다.

> `pages/` 경로에 `lol.tsx` 파일을 생성하면 `/lol` 라는 페이지가 생성되고 url 로 접근할 수 있습니다.

```bash
$ mkdir pages
$ touch pages/index.tsx
```

```javascript
// pages/index.tsx
import * as React from "react";

const Index: React.FunctionComponent = () => {
  return (
    <div>
      <p>hello world</p>
    </div>
  );
};

export default Index;
```

### 2. Add scripts

`package.json`에 아래와 같이 next 의 빌드/개발 환경 스크립트를 추가합니다. `yarn dev`를 실행하고 `http://localhost:3000/`에 접속하면 'hello world'를 확인할 수 있습니다.

```javascript
// package.json
"scripts": {
  "dev": "next",
  "start": "next start",
  "build": "next build"
}
```

> Next.js 가 빌드된 결과물이 담기는 `.next` 를 `.gitignore`에 추가합니다.

### 3. Using CSS, styled-components

CSS 를 사용하기 위해서는 `@zeit/next-css`를 설치하고 아래와 같이 `next.config.js` 에 추가합니다.

```javascript
// next.config.js
const withTypescript = require("@zeit/next-typescript");
const withCss = require("@zeit/next-css");

module.exports = withTypescript(
  withCss({
    webpack: config => {
      return config;
    }
  })
);
```

[styled-component](https://www.styled-components.com/docs/tooling#babel-plugin) 와 같은 css-in-js 를 사용하기 위해서는 서버 사이드 렌더링을 지원하는 babel 플러그인을 설치해줍니다. 그리고 `.babelrc` 파일에도 설정을 추가합니다.

> 이 플러그인이 없을 경우, 클라이언트 사이드에서 생성한 `className` 해시값과 서버 사이드에서 생성한 값이 일치하지 않아 오류가 발생합니다.

```bash
$ yarn add babel-plugin-styled-components -D
```

```
// .babelrc
"plugins": ["babel-plugin-styled-components"]
```

---

## 3. Routing

Next.js 에서 자동으로 만들어주는 file system 라우팅은 클라이언트 사이드에서만 지원됩니다. 프로젝트가 로딩된 후 내부의 링크를 통해서 라우팅이 되었을 때만 페이지에 접근할 수 있으며, 주소창에서 직접 url 을 입력하면 접근할 수 없습니다.

이 문제는 Custom server API 에 라우트를 등록하고 서빙하도록 함으로써 해결할 수 있습니다. 아래의 내용은 [Learn Next.js - create a custom server](https://nextjs.org/learn/basics/server-side-support-for-clean-urls/create-a-custom-server)를 참고하였습니다.

### 1. Install `express`

Server API 를 만들기 위해 express 를 설치합니다. 그리고 아래와 같이 `server.js` 파일을 만들어줍니다.

```bash
$ yarn add express
```

### 2. Create `server.js`

```javascript
// server.js
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
```

### 3. Edit scripts

```javascript
// package.json
"scripts": {
  "dev": "node server.js",
  "start": "NODE_ENV=production node server.js",
  "build": "next build"
}
```

### 4. Add routes

만약 `/map` 경로에 `pages/map.tsx` 컴포넌트를 보여주고 싶다면 아래와 같이 코드를 추가합니다. `/map/:name`과 같은 query parameter 도 아래와 같이 추가할 수 있습니다.

```javascript
server.get("/map", (req, res) => {
  const actualPage = "/map";
  app.render(req, res, actualPage);
});

server.get("/map/:name", (req, res) => {
  const actualPage = "/map";
  const queryParams = { name: req.params.name };
  app.render(req, res, actualPage, queryParams);
});
```

### 5. Client side routing

클라이언트 사이드 라우팅은 아래처럼 `next/link`를 사용합니다. `Link` 컴포넌트의 children 으로 `<a>` 태그를 사용해야합니다.

```javascript
import Link from "next/link";

<Link href="/map">
  <a>Map</a>
</Link>;
```

`Router.push()`를 사용해서 경로를 이동하는 것도 가능합니다.

```javascript
Router.push(`/map/${res.data.title}`);
```

---

## 4. Data fetching

Next.js 에서는 `getInitialProps`를 통해 `asPath`, `query` 등의 변수에 접근할 수 있습니다. 이 static 함수는 최초 서버 사이드 렌더링 시 또는 클라이언트 라우팅으로 접근 시 한번씩만 호출됩니다.

```javascript
import * as React from "react";
import Axios from "axios";
import { NextContext } from "next";
import { API_URL } from "../store";

class MapPage extends React.Component<Props, {}> {
  static async getInitialProps({ query }: NextContext) {
    const res = await Axios.get(`${API_URL}/places/?map=${query.name}`);
    return { places: res.data.places };
  }

  render() {
    return <Map places={this.props.places} />;
  }
}

export default MapPage;
```

> `getInitialProps` 안에서는 서버 사이드기 때문에 `console.log()`를 찍으면 결과값은 브라우저가 아니라 터미널에 나타나게 됩니다.

> Next.js 에서 `API_URL`같은 환경변수를 사용하는 방법은 [`dotenv`](https://jaketrent.com/post/environment-variables-in-nextjs/) 또는 Next.js 에서 지원하는 [`getConfig()`](https://zeit.co/blog/next5-1#environment-configuration)를 이용하는 방법이 있습니다.
