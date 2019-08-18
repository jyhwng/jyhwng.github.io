---
path: "/es6-class"
date: "2017-12-30"
title: "Classes"
tags: ['es6', 'Javascript']
excerpt: "ES6 in depth"
type: ""
---

> 개인적인 공부 노트로, 내용에 오류가 있을 수 있습니다.

ES6의 `class`도 사실 function이다.(`typeof`를 찍으면 `"function"`으로 나온다.) 단지 prototype 기반 상속보다 명확하게 표현하기 위한 syntatic sugar일 뿐!

```javascript
class Person {
    // 클래스 바디 안에는 메소드만이 들어간다. constructor()도 메소드이다.
}
```

- `class` 안에서는 function 키워드를 쓰지 않는다. `method()`은 사실 `method: function ()`을 짧게 줄인 것이다.

---

## 1. `constructor` 메소드

```javascript
class Tea {
  constructor(name, price) {
    this.name = name
    this.price = price
  }
}

// 객체 생성하기
var earlGray = new Tea("Earl gray", 3000)
```

- 객체를 생성하는 시점에 호출되는 메소드이다. Python 의 초기화 함수 `__init__()`와 같다. 
- 객체 생성 시 필요한 parameter를 명시한다.
- class에서 constructor는 있을 수도, 없을 수도 있다. 

---

:point_right: React 에서 `constructor()` 생략하기

- `constructor()` 안에 `this.state`를 정의하지 않고 클래스 바디 안에서 바로 `state`로 정의하는 경우가 있다. babel의 [property initializer](https://www.fullstackreact.com/articles/use-property-initializers-for-cleaner-react-components/#with-property-initializers) 기능 때문이다. 
- `transform-class-properties` babel plugin을 사용한다면 `constructor()`를 호출하지 않고도 `this`에 접근할 수 있다. 이러한 패턴은 더 깔끔한 코드를 위해 권장되며 널리 사용되고 있다.

```javascript
// before
class App extends React.Component {
    constructor() {
        super()
        this.state = { ... }
        this.doSomething = this.doSomething.bind(this)
    }
    doSomething() { ... }
    render() {
        return ...
    }
}

// after
class App extends React.Component {
    state = { ... }   // state를 constructor 안에 쓰지 않아도 된다!
    doSomething = () => { ... }   // this 바인딩을 하지 않아도 된다!
    render() {
        return ...
    }
}
```

:point_right: 왜 arrow function은 this 바인딩을 하지 않아도 될까?
- [To bind or not to bind?](https://twitter.com/dan_abramov/status/790612782471319553) - Dan Abramov

---

## 2. `super()` 

- 부모 객체의 함수를 호출할 때 사용한다.
    - `super(args)` : 부모 객체의 생성자 함수 호출
    - `super.func(args)` : 부모 객체의 `func()` 메소드 호출

```javascript
class Polygon {
    constructor(width, height) {
        this.width = width
        this.height = height
    }
    get area() {
        return this.width * this.height
    }
}

class Square extends Polygon {
    constructor(sideLength, color) {
        super(sideLength, sideLength)   // Polygon 의 constructor를 그대로 사용한다.
        this.color = color  // Polygon 의 constructor에 더해서 새로운 property를 정할 수도 있다.
    }
}

var square = new Square(2)
console.log(square.area)  // 4 => Polygon의 get area() 메소드를 사용할 수 있다.
```

- 자식 클래스의 `constructor()`안에서는 `super()`를 호출하기 전까지 `this`에 접근할 수 없다. ([출처](https://stackoverflow.com/questions/31067368/how-to-extend-a-class-without-having-to-using-super-in-es6)) super()를 써주지 않고 this에 접근하면 아래와 같은 오류가 발생한다.

```
> Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```

---

## 3. 멤버 메소드와 `static` 메소드

- 클래스 단에서 바로 호출하는 메소드.
    - 인스턴스별로 달라지지 않고 클래스 단에서 쓰는 utility 를 만들고 싶을 때 사용한다. 
- 인스턴스는 `static` 메소드를 사용할 수 없다. 반대로 클래스는 멤버 함수를 바로 쓸 수 없다. (인스턴스를 생성하고 인스턴스 단에서 실행해야 한다.)

```javascript
class A {
    static sum(a, b) {
        return a + b;
    }
    sub(a, b) {
        return a - b;
    }
}

// 멤버 메소드
var a = new A()
a.sub(2, 1)

// static 메소드
A.sum(1, 2)
```

---

## 4. `extends`

- 부모 클래스를 상속받을 수 있는 키워드이다. 

```javascript
class Tea {
  constructor(name, price) {
    this.name = name
    this.price = price
  }
}

class Coffee extends Tea {
    constructor(name, price) {
        this.name   // Uncaught ReferenceError 오류 발생 (Must call super constructor in derived class before accessing 'this' or returning from derived constructor)
        super(name, price, color)  // super() 로 생성자 함수 호출해야 this에 접근할 수 있음.
        this.color = color
    }   
}
```

:point_right: 더 읽을 거리 - [생성자 함수로 상속 구현하기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes#ES5_%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85_%EC%83%81%EC%86%8D_%EB%AC%B8%EB%B2%95%EA%B3%BC_ES6_%ED%81%B4%EB%9E%98%EC%8A%A4_%EC%83%81%EC%86%8D_%EB%AC%B8%EB%B2%95%EC%9D%98_%EB%B9%84%EA%B5%90)

---

### React에서 `extends`

```javascript
class App extends React.Component {
    constructor() {
        super() // React에서 `constructor() {}` 메소드는 언제나 그 안에서 `super()`메소드를 불러야 한다. 이걸 쓰지 않으면 `missing super() call in constructor` 에러가 난다.
        this.state = {...}
    }
    componentDidMount() {
        this.setState({...}) // `React.Component`를 상속받았기 때문에 그 안에 정의되어 있는 `.setState()`메소드를 사용할 수 있다.
    }
    render() {
        return ...
    }
}
```

---

참고 
- [Mozilla Hacks](https://hacks.mozilla.org/2015/07/es6-in-depth-classes/)
- [Classes - Javascript, MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)