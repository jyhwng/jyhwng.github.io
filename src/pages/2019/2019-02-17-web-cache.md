---
path: "/performance-optimization-with-cache-control"
date: "2019-02-17"
title: "Optimizing Performance with Cache Control"
tags: ['cache', 'performance', 'webpack']
excerpt: ""
type: ""
---

> 개인적인 공부 노트로, 오류가 있을 수 있습니다.

## 1. What is web cache?

> 캐시의 어원은 프랑스어로 "hiding place for stores"라는 의미이다. ([출처](https://en.wiktionary.org/wiki/cache))

캐시는 동일한 request(동일한 이름의 리소스)에 대하여 브라우저가(또는 네트워크 단에서) 갖고있는 response 의 복사본이다. 브라우저는 이전의 응답을 기억하고 있다가 동일한 request 가 올 때 서버에 다시 요청하지 않고 복사본을 반환한다. 서버를 거치지 않기 때문에 빠르고, 부하도 적다. 소스가 바뀔 때까지 캐시된 복사본을 반환하도록 할 수 있기 때문에 적절히 활용하면 사용자가 응답을 받는 속도를 현저히 줄일 수 있다.

<!-- 캐시된 화면 네트워크탭 -->

---

## 2. Caching with `webpack`

```javascript
// webpack.config.js
module.exports = {
  ...
  output: {
    filename: "static/js/main.[hash:8].js",
  },
  ...
}
```

* 웹팩에서는 위처럼 빌드된 js 파일에 hash 를 붙일 수 있다.
* 새로 빌드가 될 때마다 해시값이 바뀌기 때문에 소스가 바뀌지 않으면 브라우저는 이를 같은 파일로 인식하고 캐싱한다.
* 소스가 바뀌면 js 파일의 이름도 바뀌기 때문에 캐싱하지 않고 업데이트된 파일을 반환하게 된다.
* 이미지 리소스에 대해서도 `file-loader`에서 아래와 같이 해시값을 붙일 수 있다.

```javascript
module: {
  rules: [
    {
      test: [/\.jpeg?g$/, /\.png$/],
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[hash:8].[ext]",
            outputPath: "img/",
            publicPath: "img/"
          }
        }
      ]
    }
    ...
  ];
}
```

---

## 3. Cache-control

html, css, js 등 리소스에 대하여 `cache-control` HTTP header 를 지정하면 더욱 공격적으로 캐싱을 할 수 있다. `cache-control`에 들어가는 값은 `,`로 구분된 문자열이다.

```bash
$ tree .
dist
├── favicon.ico
├── index.html
└── static
    ├── css
    │ └── main.[hash:8].css
    ├── js
    │ └── main.[hash:8].js
    └── media
        └── image.png
```

예를 들어 위와 같은 디렉토리 구조로 Single Page Application 을 개발할 경우, 각각의 리소스에 대하여 다음과 같이 cache-control 을 설정할 수 있다.

1. `index.html` - `"no-cache"`

   * `no-cache` : 매 요청마다 콘텐츠가 바뀌었는지 서버에서 검증하는 round-trip 을 한번 한다. 리소스가 바뀌지 않았고 캐시가 있을 경우, 리소스를 요청하지 않고 캐시에서 가져온다.
   * 대부분의 SPA 는 index.html 안에서 해시 값이 붙은 js 파일을 로드하기 때문에 html 파일은 캐싱하지 않는다. js, css 의 경로(또는 파일명)가 바뀌었는지 여부를 판단해야하기 때문이다.

2. `main.[hash:8].js` - `"private, max-age=31536000"`

   * `private` : js 파일에는 중요한 사용자 정보가 있을 수 있기 때문에 공용 cache 를 사용하지 않고 private cache (클라이언트의 브라우저)를 사용한다.
   * `max-age` : 초(second) 값을 받으며 명시된 시간동안 캐시를 사용하라는 의미이다. js 파일의 소스가 변경되어 새로 빌드되었을 경우, url 의 hash 값이 바뀌기 때문에 캐싱이 되지 않는다. `max-age=31536000`는 바뀌지 않는 리소스에 대하여 1 년간 캐싱함을 의미한다.

3. `main.css` - `"max-age=31536000"`

   * `max-age=31536000` : js 파일과 마찬가지로 hash 가 붙기 때문에 바뀌지 않은 파일에 대하여 1 년간 캐싱한다.

4. 이미지 - `"max-age=86400"`

   * `max-age` : url 이 바뀌지 않을 경우 1 일, hash 를 붙일 경우(웹팩에서 `require()`를 사용해 빌드하는 경우)에는 1 년으로 할 수 있다.

---

## 4. How to set `cache-control`

s3 를 이용하여 정적 파일을 호스팅할 경우, [Metadata 설정](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/add-object-metadata.html)을 통해서 `cache-control` 을 지정할 수 있다. [AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html) 를 사용하여 정적 파일을 s3 에 업로드/배포할 경우, 아래와 같이 `cache-control`을 설정할 수도 있다.

```javascript
s3.upload(
  {
    Bucket: bucket, // S3 bucket name
    Key: key, // file name
    Body: file,
    ACL: "public-read",
    ContentType: "application/javascript",
    CacheControl: "private, max-age=86400"
  },
  function(err, data) {
    ...
  }
);
```

Cloudfront 를 사용할 경우, [cache invalidation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html) 을 통해 소스가 바뀌었지만 이름은 바뀌지 않은 리소스에 대하여 임의로 cache 를 지워줄 수도 있다.

---

더 알아보기

`etag` - https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/ETag

Sources:

* https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
* https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
