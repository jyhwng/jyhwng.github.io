---
path: "/literals-and-constructors"
date: "2017-10-31"
title: "Literals and constructors"
tags: ['Javascript']
excerpt: Javascript Patterns(2011)
type: ""
---

[자바스크립트 코딩 기법과 핵심 패턴(2011)](https://g.co/kgs/AkNCEg) 책을 읽고 정리한 글입니다.

:point_right: [4장 - Callback Pattern](/callback)

---

## 1. 객체 생성하기

```Javascript
// Bad
a = new Object()

// Good
a = {}
```

- 이런식으로 `Object`, `Array` 같은 생성자를 사용하기 보다는 리터럴을 통해 객체를 생성하는 것이 좋다.
- 두번째 방법은 빈 객체로 보이지만 사실은 자바스크립트에는 빈 객체는 없다. 모든 객체는 부모 객체인 `Object.prototype`의 프로퍼티와 메서드를 가진다.

```Javascript
a = {}
a.name = 'Benji'    // 프로퍼티 추가
a.getName = function() {    // 메소드 추가
    return a.name
}
a.name = 'Fido' // 프로퍼티 수정
delete a.name   // 프로퍼티 삭제
```

---

## 2. 사용자 정의 생성자 함수

1. 객체 생성

```Javascript
let Person = function(name) {
    this.name = name
    this.say = function() {
        return "I am " + this.name
    }
}

let person = new Person('adam')
```

1. `Person`은 사실 함수이자, 객체이다.
2. `new`는 새로운 객체를 생성하는 연산자이다.
    - `new`는 `this` 포인터를 만들고 이는 새로 만든 객체를 가리키게 된다.
    - 만약에 new 없이 `let person = Person('adam')`과 같이 그냥 함수만 호출한다면 함수가 실행되기만 할 뿐, `this` 포인터가 객체를 가리키지 못한다. 그래서 `Person`함수의 `this.name = name` 이 부분의 `this`는 전역을 가리키게 되고 `name`과 `say()`는 전역 변수, 전역 메소드로 세팅이 된다. 매우 위험한 상황이 되는 셈이다.
    - `new`를 쓰면 위의 코드의 이면에 진행되는 것은 아래 주석과 같다.

```Javascript
let Person = function(name) {
    // let this = {}
    this.name = name
    this.say = function() {
        return "I am " + this.name
    }
    // return this
}

let person = new Person('adam')
```

- 함수 내에 return문이 없더라도 생성자는 암묵적으로 this를 리턴한다. return문을 써서 반환되는 객체를 지정해줄수도 있다.

위의 방법으로 메소드를 추가하는 방법도 있지만, 새로운 객체를 생성할 때마다 say() 라는 함수를 계속 만들게된다. 즉, n개의 객체를 만들면 n개의 say()가 만들어지는 것이다. 그러기보다 Person의 프로토타입에 say() 메소드를 추가하면 한번만 정의하고도 모든 객체가 참조할 수 있다.

```Javascript
Person.prototype.say = function() {
    return "I am " + this.name
}
```

- new를 쓰지 않았을 때에도 위에 문제가 발생하지 않도록 강제하는 방법도 있다. 어떤 변수에 new없이 Waffle()을 할당해서 함수가 실행이 되었는데 그 실행된 함수안의 this가 Waffle의 인스턴스가 아닐 때, 즉 전역을 가리킬 때 그 함수 안에서 `new Waffle()`로 새로운 Waffle객체를 생성하는 것이다.

```Javascript
function Waffle() {
    if (!(this isinstanceof Waffle)) {
        return new Waffle()
    }

    this.tastes = "yummy!"
}

Waffle.prototype.wantAnother = true
```

---

## 3. 배열 리터럴

1. 배열 생성하기

배열도 객체와 마찬가지로 내장 생성자 Array()를 사용하기보다 `let a = []`와 같이 생성해주는 것이 좋다. 아래 두개의 코드는 다른 방식으로 작동한다.

```JavaScript
let a = [3]
// a.length = 1
// a[0] = 3

let a = new Array(3)
// a.length = 3
// typeof a[0] = "undefined"
```

위의 코드는 3이라는 하나의 숫자를 가진 배열이 되고, 아래는 3개의 자리를 가진 빈 배열을 만들게 된다.

2. 배열 판별하기

배열은 `isArray()`로 판별한다. 배열도 객체이기 때문에 `typeof`로 판별할 경우, `object`가 나오기 때문이다.

---

## 4. JSON

JSON(JavaScript Object Notation)은 객체 리터럴 표기법으로 쓰여진 데이터 전송 형식이다.

1. `JSON.stringify(x)` - JSON은 프로퍼티명이 항상 문자열이어야 한다. 그래서 stringify로 모든 키값을 문자열로 serialize하는 게 안전하다.
2. `JSON.parse(x)` - JSON 데이터를 서버에서 던져줄 때 서버에서 stringify를 하고 프런트에서 파싱해서 쓰면 용량을 적게 사용할 수 있다.


---
