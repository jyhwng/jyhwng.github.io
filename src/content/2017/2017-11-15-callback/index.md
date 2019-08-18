---
path: "/callback"
date: "2017-11-15"
title: "Callback Pattern"
tags: ['Javascript']
excerpt: Javascript Patterns(2011)
type: ""
---

[자바스크립트 코딩 기법과 핵심 패턴(2011)](https://g.co/kgs/AkNCEg) 책을 읽고 정리한 글입니다.

:point_right: [3장 - Literals and Constructors](/literals-and-constructors)

---

## 1. 콜백이란?

함수는 일급 객체다. 프로퍼티를 가질 수 있고, 변수에 할당할 수도 있고, 다른 함수에 인자로 전달할 수도 있다. 인자가 되는 함수를 __콜백함수__, 또는 __콜백__ 이라고 부른다.

> 명시적으로 호출하는 함수가 아니라 함수를 일단 등록하고, 특정 이벤트가 발생하거나 특정 시점에 도달했을 때 호출되는 함수이다. 또는 특정 함수의 인자로 넘겨서 코드 내부에서 호출되는 함수도 콜백함수라고 한다. 대표적인 콜백 함수가 자바스크립트에서 event handler이다. - 인사이드 자바스크립트(2016)

```Javascript
function writeCode(callback) {
    // ...
    callback()
    // ...
}

function introduceBugs() {
    // ...
}

writeCode(introduceBugs)
```

- 함수의 `()`를 붙이면 즉시 실행, 붙이지 않으면 참조만 하고, 바깥 함수에서 알맞은 때에 실행해준다.

---

## 2. 콜백 예제

```Javascript
// 콜백 없이 사용
// array인 nodes를 인자로 받는 함수에서 nodes를 리턴하는 함수를 불러온다.
let findNodes = function() {
    const i = 100000,
            nodes = [],
            found
    while (i) {
        // 노드를 수정하는 로직 - 따로 둔다.
        nodes.push(found)
    }
    return nodes    // nodes 리턴
}

let hide = function(nodes) {    // nodes를 인자로 받음
    let i = 0,
    max = nodes.length
    for (i < max; i += 1) {
        nodes[i].style.display = 'none'
    }
}

// 함수 실행
hide(findNodes())
```

```Javascript
//  콜백으로 리팩토링
let findNodes = function (callback) {
    const i = 100000,
    nodes = [],
    found

    if (typeof callback !== "function") {
        callback = false
    }

    while (i) {
        i -= 1
        // 노드 수정 로직

        if (callback) {
            callback(found)
        }

        nodes.push(found)
    }
    return nodes
}

// 콜백 함수
let hide = function(node) {
    node.style.display = 'none'
}
findNodes(hide)
```

```Javascript
// hide()를 정의하지 않고 이렇게 익명함수로 표현할 수도 있다.
findNodes(function(node) {
    node.style.display = 'none'
})
```

---

## 3. 콜백과 유효범위

만약 콜백함수가 객체의 메서드인 경우, 콜백이 속한 객체를 바라보는 this를 사용하고 있을 때 문제가 된다.

```Javascript
let myapp = {}
myapp.color = 'green'
myapp.paint = function(node) {
    node.style.color = this.color
}

findNodes(myapp.paint)  // 객체의 메서드를 콜백함수로 가진다. myapp.paint 내 this는 findNodes에서 바라보는 객체를 가리킬 것이다.
```

1. 이럴 경우, 아래처럼 콜백이 속해있는 객체도 인자로 받을 수 있도록 findNodes()를 수정해준다.

```Javascript
findNodes(myapp.paint, myapp)

let findNodes = function(cbMethod, cbObject) {
    if (typeof cbMethod === "function") {
        cbMethod.call(cbObject, found)
    }
}
```

2. 메서드를 문자열로 전달할 수도 있다.

```Javascript
findNodes("paint", myapp)

let findNodes = function(cbMethod, cbObject) {
    if (typeof cbMethod === "string") {
        cbMethod = cbObject[cbMethod]
    }
    //
    if (typeof cbMethod === "function") {
        cbMethod.call(cbObject, found)
    }
 }
```

---

## 4. 비동기 이벤트 리스너

페이지 element에 이벤트 리스너를 붙이는 것은 사실, 이벤트가 발생했을 때, 호출될 콜백함수의 포인터를 전달하는 것이다.

```Javascript
document.addEventListener("click", console.log, false)
```

대부분의 클라이언트 브라우저 프로그래밍은 event-driven 방식이다. 자바스크립트가 event-driven 프로그래밍에 적합한 이유는 프로그램이 비동기적으로 동작할 수 있게 하는 콜백 패턴 덕분이다.

---

## 5. 타임아웃

`setTimeout`과 `setInterval`도 대표적인 콜백 패턴이다.

```Javascript
let thePlotThickens = function() {
    console.log('500ms later...');
}
setTimeout(thePlotThickens, 500)
```

여기서 `thePlotThickens`가 ()없이 전달되었다. 즉시 실행하지 않고 500ms가 지난 후에 호출할 수 있도록 함수를 가리키고만 있는 것이다. 여기서 `"thePlotThickens()"`와 같이 문자열을 전달하는 건 eval()과 같은 안티패턴이다.

---

## 6. 라이브러리에서의 콜백

콜백패턴은 라이브러리를 설계할 때 매우 유용하고 강력하다. 라이브러리에 들어갈 코드는 최대한 범용적이고 재사용 가능해야 하기 때문에 연결고리만을 제공하는 콜백 패턴은 OCP 원칙에 입각한 프로그래밍을 할 수 있다.
