---
path: "/font-face-work-around"
date: "2017-10-20"
title: "How to apply font like a boss"
tags: ['CSS', 'sass', 'react']
excerpt: "@font-face work around"
type: "tips"
---

## 1. Create `@font-face` mixin

먼저, 일반적인 css의 폰트 코드를 보자.

```css
@font-face {
    font-family: "Noto Sans CJK KR";
    font-style: normal;
    font-weight: 900;
    src: url("./fonts/NotoSans-Black.eot?") format("eot"),
        url("./fonts/NotoSans-Black.woff2") format("woff2"),
        url("./fonts/NotoSans-Black.woff") format("woff");
    }
```

`@font-face`를 사용하면, 사용자 컴퓨터에 해당 폰트가 설치되어 있지 않아도 폰트를 디스플레이 할 수 있다. eot, woff, woff2 는 폰트 포맷으로, 서로 다른 브라우저를 지원한다. 자세한 내용은 [여기](https://css-tricks.com/snippets/css/using-font-face/) 참고.

css 파일을 쓴다면 font-family 이름과 여러가지 포맷을 지정해줘야 한다. 폰트가 1-2개이면 괜찮지만 여러 개가 될 경우, 귀찮을 뿐만 아니라 실수하기도 쉽다. 대개는 폰트명과 font-weight 만 달라지고 같은 내용인데, 이 작업을 아래의 코드로 반복하지 않을 수 있다. [출처](https://gist.github.com/jonathantneal/d0460e5c2d5d7f9bc5e6)

```scss
/* _mixins.scss */
@mixin font-face($name, $path, $weight: null, $style: null, $exts: eot woff2 woff ttf svg) {
	$src: null;
	$extmods: (
		eot: "?",
		svg: "#" + str-replace($name, " ", "_")
	);
	$formats: (
		otf: "opentype",
		ttf: "truetype"
	);
	@each $ext in $exts {
		$extmod: if(map-has-key($extmods, $ext), $ext + map-get($extmods, $ext), $ext);
		$format: if(map-has-key($formats, $ext), map-get($formats, $ext), $ext);
		$src: append($src, url(quote($path + "." + $extmod)) format(quote($format)), comma);
	}
	@font-face {
		font-family: quote($name);
		font-style: $style;
		font-weight: $weight;
		src: $src;
	}
}
```

---

## 2. Import mixin!

`@import`키워드로 mixin을 임포트하고, `@include` 키워드로 만들어준 `@font-face` mixin 을 사용한다.

```scss
/* App.scss */
@import "../stylesheets/_mixins.scss";

@include font-face("Noto Sans CJK KR", "./fonts/NotoSans-Black", 900, normal, eot woff2 woff);

.App {
    font-family: "Noto Sans CJK KR";
    -webkit-font-smoothing: antialiased;
}
```

여기까지 하면 끝!

...이라고 생각했는데 폰트가 적용이 되지 않았다. 그래서 아래와 같은 꼼수를 써보았다.

---

## 3. Create `Font.scss`

해당 프로젝트의 문서 구조는 다음과 같았다. (* [create-react-app](https://github.com/facebookincubator/create-react-app))

```
.
├── App.css
├── App.js
├── App.scss
├── index.css
├── index.js
├── components
│   ├── About
│   │   ├── About.css
│   │   ├── About.js
│   │   ├── About.scss
│   ├── Event
│   ├── Header
│   └── index.js
├── fonts
│   ├── NotoSans-Black.eot
│   ├── NotoSans-Black.otf
│   ├── NotoSans-Black.woff2
│   └── NotoSans-Black.woff
└── stylesheets
    ├── _mixins.scss
    └── _variables.scss
```

상대경로 `./fonts/NotoSans-Black.woff`로 지정해준 폰트가 받아지지 않는 것이었다. 그래서 폰트가 들어있는 `fonts/` 폴더에 `font.scss`파일을 추가해주었다. 그리고 `npm run watch-css` 명령어로 sass 파일을 컴파일해준다. (`node-sass-chokidar`를 사용하였다.) 그러면 css 파일이 생긴다. 

```
├── fonts
│   ├── font.css
│   ├── font.scss
│   ├── NotoSans-Black.eot
│   ├── NotoSans-Black.otf
│   ├── NotoSans-Black.woff2
│   └── NotoSans-Black.woff
└── stylesheets
    ├── _mixins.scss
    └── _variables.scss
```

이 font.scss 파일 안에서 `_mixins.scss`를 불러오고 이 font.css 파일을 index.css 에 임포트 해주었다.

```scss
/* font.scss */
@import "../stylesheets/_mixins.scss";

@include font-face("Noto Sans CJK KR", "./NotoSans-Black", 900, normal, eot woff2 woff);
```

```css
/* index.css */
@import url('./fonts/font.css');
```

---

정리!

1. `@font-face` 를 자동으로 생성해주는 `_mixins.scss`를 만든다.
2. font 파일이 있는 폴더에 `font.scss`를 만든다.
3. `@include font-face`를 사용해 쉽게 font-face를 만든다.
4. 이렇게 만든 `font.scss` 가 생성한 `font.css` 파일을 `index.css` 파일에 import한다.

끝!
