---
path: "/closure"
date: "2018-04-28"
title: "What is Closure?"
tags: ['closure', 'javascript']
excerpt: ""
type: "post"
---

> 개인적인 공부 노트로 오류가 있을 수 있습니다.

## 1. 클로저(Closure)란?

__private 함수의 변수를 참조__하는 것, 또는 [실행이 끝난 부모 함수 스코프의 변수를 참조하는 함수](https://books.google.co.kr/books/about/%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C_%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8.html?id=gSVJDgAAQBAJ&redir_esc=y&hl=ko)를 의미한다.

```javascript
// without closure
function Person(name) {
  var _name = name  // _name은 숨겨진 변수라는 것을 강조하기 위해 사용
}

var person = new Person('Jane')
console.log(person.name) // undefined
```

:point_right: Person 함수가 실행된 후에는 당연히 내부 변수 `name`에 접근이 불가능하다. 하지만 클로저를 사용해 내부 변수에 접근하는 함수를 만들 수 있다.

```javascript
// with closure
function Person(name) {
  var _name = name
  
  this.getName = function() {
    return _name  // 숨겨진 변수 _name에 접근한다.
  }
}

var person = new Person('Jane')
console.log(person.getName()) // Jane
```

- 예시 출처: https://www.youtube.com/watch?v=yiEeiMN2Khs

---

## 2. 함수를 리턴하는 함수

클로저를 사용하면 내부 변수를 참조하는 함수를 리턴해서 내부 변수를 계속 간직하도록 만들수도 있다.(출처: [인사이드 자바스크립트(2016)](https://books.google.co.kr/books/about/%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C_%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8.html?id=gSVJDgAAQBAJ&redir_esc=y&hl=ko))

```javascript
function parent() {
  const a = 100
  const child = function() {
    console.log(a)  // parent()의 내부 변수 a를 참조한다.
  }
  return child   // parent() 함수는 내부 함수 child()를 리턴한다.
}

const inner = parent()  // inner() 함수는 리턴된 child() 함수 
inner() // 100
```

1. `parent()` 함수의 실행은 끝났지만 내부 변수 `a`는 가비지 컬렉팅이 되지 않는다.
2. `inner()` 함수는 `parent()` 함수의 리턴값인 `child()`를 할당 받았고, 그 `child()` 함수는 변수 `a`를 참조하고 있기 때문에 100을 출력하게 된다.

:point_right: [가비지 컬렉션(garbage collection)](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)): 메모리 관리 기법 중의 하나로, 프로그램이 동적으로 할당했던 메모리 영역 중에서 필요없게 된 영역을 해제하는 기능이다.

```javascript
const a = function() {
  const counter = 0
  return function() {
    counter += 1
    return counter
  }
}

const b = a()
b() // function() { counter += 1; return counter }
// 이 counter는 어디서 왔지? 여전히 접근 가능하지만 counter 변수는 더럽혀지지 않는다.
```

* 스코프 - 함수나 {} 밖에서 정의되는 변수는 모두 global variable 이다.

b는 a 내부에서 리턴되는 함수가 된다. `counter = 0; function() { counter += 1; return counter}`와 incrementing 하는 기능은 같지만 외부에서 counter에 접근이 불가능하기 때문에 전역 변수를 더럽히지 않을 수 있다는 차이가 있다. 변수 뿐만 아니라 함수, 객체도 이런식으로 숨길 수 있다. 이런식으로 private 변수도 구현 가능.

---

## 3. 언제 사용할까? (feat. event listener)

클로저는 이벤트 리스너의 콜백에 인자를 같이 넘겨줄 때 사용할 수 있다.

```javascript
// anchor 태그를 클릭할 때, 리프레시를 하지 않고 각 anchor의 index를 띄우는 예시

function registerHandlers() {
  const anchors = document.querySelectorAll('a')
  Array.from(anchors, (a, index) => {
    a.addEventListener('click', (event) => alertIndex(event, index))
  })
}

function alertIndex(event, index) {
  event.preventDefault()
  return alert(index)
} 

registerHandlers()
```

- 예시 출처: https://www.testdome.com/questions/javascript/closures/