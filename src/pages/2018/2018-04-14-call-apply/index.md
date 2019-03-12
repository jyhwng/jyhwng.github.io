---
path: "/call-and-apply"
date: "2018-04-14"
title: "call, apply and bind"
tags: ['javascript']
excerpt: "What is call, apply and bind?"
type: ""
---

> 개인적인 공부 노트로, 오류가 있을 수 있습니다.

## 1. apply

`call`과 `apply`는 기능 — 함수 호출하기 — 은 같고 받는 인자만 다르다. 둘다 `this` 키워드를 특정 객체에 바인딩 하는 메소드이다. 

```javascript
func.apply(thisArg, argsArray)
```

- 첫번째 인자는 `this`를 바인딩할 객체, 두번째 인자는 함수를 호출할 인자들의 배열이다.

```javascript
var Person = function(name, age) {
  this.name = name
  this.age = age
}

var me = {}

Person.apply(me, ["Jane", "15"])
```

- 이렇게 빈 객체를 만든 뒤, 생성자를 쓰지 않고 Person 객체에 prototype을 연결하여 상속한 것처럼 만들 수도 있다. 하지만 `Person.prototype`으로 연결된 것은 아니고 함수를 호출한 것일 뿐이다.

---

## 2. call

apply와 기능은 같다. 단, 두번째 인자를 배열에 넣지 않고 그대로 넘겨주면 된다.

```javascript
Person.call(me, "Jane", "15")
```

- `this`는 method가 아니라 caller에 의해 결정된다. `obj.method()`와 `method.call(obj)`는 같다는 것에서 유추할 수 있다.

:point_right: 언제 사용할까?

- `apply`와 `call` 모두 `NodeList` 등과 같은 유사 배열 객체에 배열 메소드를 쓰고 싶을 때 사용한다.

```javascript
// 이렇게
Array.prototype.slice.apply(pseudoArray)
```

---

## 3. bind

- bind를 사용하면 콜백을 호출할 때, 맥락에 상관없이 특정 this에 대하여(특정 객체에 대하여) 호출할 수 있다. 
- this의 맥락은 어디에서 쓰이느냐에 따라 달라지기 때문에 언제 쓰이든지 같은 동작을 기대할 때 주로 쓰인다.

:point_right: [React에서 bind()](https://reactjs.org/docs/handling-events.html)

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

- button의 `onClick`의 콜백으로 `this.handleClick`을 불러올 때, this는 `undefined`가 된다. 자바스크립트에서 클래스 메소드는 디폴트로 바인딩되지 않기 때문이다. 
- 따라서 `this.handleClick = this.handleClick.bind(this);` 이렇게 메소드에 this(Toggle)을 반드시 바인딩해주어야한다.
- 다른 방법 :point_down:
  - *babel 플러그인 `transform-class-properties`이 디폴트 바인딩을 지원하며, `create-react-app`에서도 이를 사용하고 있다.
  - 또는 `onClick={(e) => this.handleClick(e)}`와 같이 arrow function 안에서 쓸수도 있다.
