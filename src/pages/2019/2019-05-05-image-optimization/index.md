---
path: "/image-optimization"
date: "2019-05-05"
title: "Image Loading Optimization"
tags: ['image', 'performance', 'optimization', 'preload', 'intersectionobserver']
excerpt: ""
type: ""
---

## 1. Data URI scheme (base64 encoding)

base64 로 이미지를 인코딩하여 html 에 인라인으로 넣는 방법으로, 크기가 작은 이미지를 렌더할 때 적합하다. 이미지 파일을 가져오는 http 요청을 따로 하지 않기 때문에 로딩 속도를 줄일 수 있다.

인코딩된 값을 [data URI scheme](https://en.wikipedia.org/wiki/Data_URI_scheme) (`data:[<media type>][;base64],<data>`) 형식으로 `src` property 에 넣으면 된다.

```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSU..."/>
```

> 이미지 크기가 클 경우에는 인코딩하여 html 에 들어가는 코드도 커지고, request 를 하지 않기 때문에 caching 도 되지 않는다는 단점이 있다.

Webpack 을 사용한다면 `url-loader` 플러그인을 통해 이미지 모듈을 자동으로 인코딩/인라인 삽입할 수 있다. limit 옵션보다 작은 이미지 모듈은 인라인으로 삽입하고, 큰 모듈은 fallback 을 지정할 수 있다. fallback 을 지정하지 않으면 이미지를 파일로 취급하는 `file-loader`가 기본값이 된다.

```javascript
{
  test: /\.(png|jpe?g)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192,
        fallback: 'file-loader' // default
      }
    }
  ]
}
```

---

## 2. Preload

이미지가 로드되는동안 버벅거리는 현상을 피하려면 `preload`를 사용할 수 있다. 다른 자원들보다 우선순위를 높여서 차단 없이(non-render-blocking) 이미지를 먼저 로딩하는 방법이다.

<br>

### 1. `<link>` 사용하기

`link`는 현재 문서와 외부 리소스 간의 관계를 명시한다. `as` 속성값으로는 이미지 뿐만 아니라 video, css, font 등도 사용할 수 있다.

```html
<head>
  <link rel="preload" as="image" href="logo.jpg"/>
</head>
...
<body>
  <img src="logo.jpg"/>
</body>
```

* 이미지를 preload 하지 않았을 때:
  ![before](https://user-images.githubusercontent.com/18133030/57197464-88adfe00-6fa2-11e9-97fb-9cfe4ccc7479.png)

* preload 했을 때 (다른 자원보다 먼저 로드된다):
  ![after](https://user-images.githubusercontent.com/18133030/57197468-92376600-6fa2-11e9-9898-18cd1c93e37b.png)

### 2. `Image()` constructor 사용하기

`new Image()` constructor 는 `HTMLImageElement` 객체를 생성한다. 이를 `window`가 로드될 때 실행할 수 있다.

```javascript
window.onload = function() {
  const img = new Image();
  img.src = "assets/image.png";
};
```

---

## 3. Lazy loading with `IntersectionObserver` API

이미지가 viewport 에 들어올 때까지 기다렸다가 로드하는 것으로, [medium](https://medium.com/) 에서 사용하는 방법이다.

먼저 해상도가 낮아서 빠르게 로딩할 수 있는 placeholder 이미지를 보여주고, viewport 안에 이미지가 들어올 때 실제 이미지를 로딩한다. 기존에 이를 구현하려면 scroll 이벤트를 구독해서 `getBoundingClientRect()`함수로 직접 element 의 크기를 비교하는 등 귀찮은 작업이 많았다.

하지만 `IntersectionObserver` API 를 사용하면 원하는 element 가 현재 몇 %나 보이는지 알아서 감지하고 원하는 콜백함수(이미지 로딩)를 실행할 수 있다. 이미지 lazy loading 뿐만 아니라 무한 스크롤, 광고 배너 뷰 측정 등에서도 활용된다.

```html
<img class="lazy" src="placeholder.png" data-src="image.png" data-srcset="image@2x.png 2x, image@3x.png 3x" />
```

> 먼저, lazy loading 할 이미지에 class 등을 지정하고 src, srcset 을 data attribute 로 전달한다. 그리고 아래와 같이 `IntersectionObserver` 객체를 생성한다.

```javascript
document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = Array.from(document.querySelectorAll("img.lazy"));

  let lazyImageObserver = new IntersectionObserver(
    (entries, observer) => {
      /** entries 는 변화가 감지되는 다양한 속성들이다. (e.g. isIntersecting, boundingClientRect, intersectionRect)  */
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;

          /** load를 마치면 observe를 끝낸다. */
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    },
    { threshold: 0.8 } /** 80%가 보이면 callback을 실행한다. */
  );

  lazyImages.forEach(lazyImage => {
    /** lazy 로딩이 필요한 모든 이미지에 대하여 observe 함수를 실행한다. */
    lazyImageObserver.observe(lazyImage);
  });
});
```

[Chrome 51 버전, Safari 12.1 버전 이상](https://caniuse.com/#feat=intersectionobserver)부터 지원하며, 지원되지 않는 브라우저에서는 [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)을 사용할 수 있다.

---

## 4. `gzip` & CDN

이밖에도 자원을 `gzip` 으로 압축하거나 CDN 을 사용하여 최적화할 수 있다. CDN(Content Delivery Network)는 ~~마치 쿠\*의 로켓직구처럼~~ 전세계 곳곳의 엣지 로케이션에서 사용자에게 가장 빠르게 전달할 수 있는 루트로 자원을 전달하는 방법이다.

---

참고

* https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/
* https://www.w3.org/TR/preload/
