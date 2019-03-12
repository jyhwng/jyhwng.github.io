---
path: "/arrow-function"
date: "2018-04-25"
title: "Arrow function"
tags: ['javascript', 'es6']
excerpt: "What is arrow function and why you should use it"
type: ""
---

> 개인적인 공부 노트로, 오류가 있을 수 있습니다.

## 1. Syntax

es6에서 소개된 arrow function를 사용하면 아래와 같이 간결하게 함수를 정의할 수 있다.

```javascript
/* using function keyword */
function method() {
  // do something...
}

/* ES6 arrow function */
const method = () => {
  // do something...
}
```

인자가 하나라면 `()`없이 아래처럼 써도 된다.

```javascript
handleClick = e => { 
  e.preventDefault() 
}
```

---

## 2. `this` 

- 일반적으로 this는 caller에 따라 정해진다. 즉, this는 실행 시의 컨텍스트에 따라 바인딩된다.
- 그러나 arrow function에서는 __`this`가 caller에 bound되지 않는다.__ :point_right: 대신 그 function을 감싸는 lexical context의 this를 가리킨다.([출처](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this))

이벤트 리스너 안에서 arrow function을 쓰면 this가 가리키는 것이 그 바깥 스코프가 된다.
- arrow function 안에서 this를 사용했을 때: this는 arrow function이 아니라 enclosing lexical context인 `window`를 가리킨다.
```javascript
/* arrow function */
const button = document.querySelector('button')
button.addEventListener('click', () => {
  console.log(this) // window
  this.classList.toggle('on') // 여기서 this는 window 객체를 가리키게 되고, button은 원하는 대로 작동하지 않는다.
})
```
- function 키워드를 쓰면 원하는 button에 this 바인딩이 된다.
```javascript
/* refactor with function keyword */
const button = document.querySelector('button')
button.addEventListener('click', function() {
  this.classList.toggle('on') // 여기서 this는 button을 가리킨다.
})
```
출처 - https://wesbos.com/arrow-function-no-no/

---

## 3. `.bind(this)` in React

- element 이벤트의 콜백으로 메소드를 실행하면, 실행 시의 context에 따라 this 는 클래스가 아닌 `window`를 가리키게 된다.

```javascript
class MyComponent extends React.Component {
  handleClick() {
    console.log(this) // window
    this.setState({ open: false })  // 제대로 실행되지 않는다. 
  }
  render() {
    return (
      <button onClick={this.handleClick}/>  // handleClick()은 MyComponent의 메소드이지만, this는 MyComponent가 아니라 undefined가 된다.
    )
  }
}
```

```javascript
class MyComponent extends React.Component {
  state = { open: false }
  handleClick = () => { // arrow function에서는 this의 맥락이 이를 감싸는 컨텍스트이다.
    console.log(this) // MyComponent
    this.setState({ open: false })
  }
  render() {
    return (
      <button onClick={this.handleClick}/>  // 여기서 handleClick 실행될 땐, handleClick을 감싸고 있는 MyComponent가 this가 된다. 따라서 메소드가 제대로 실행이 된다.
    )
  }
}
```
