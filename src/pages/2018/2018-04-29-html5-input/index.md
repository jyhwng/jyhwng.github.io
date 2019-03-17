---
path: "/html5-input"
date: "2018-04-29"
title: "Using proper input type in HTML5"
tags: ["html5", "datalist" ]
excerpt: ""
type: "post"
---

## 0. HTML input types

HTML input 타입은 `text` 말고도 다양하며, 알맞은 타입을 사용하면 브라우저와 네이티브 디바이스의 다양한 지원을 받을 수 있다.

<br/>

| Type              | Description                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| `type="button"`   | 기본 동작이 없는 버튼                                                      |
| `type="checkbox"` | 단일 값을 선택/해제하는 체크박스                                           |
| `type="radio"`    | multiple choices 에서 한가지만 선택할 수 있다.                             |
| `type="email"`    | 모바일로 접근할 경우, 이메일에 적합한 키패드가 표시된다.                   |
| `type="number"`   | 모바일로 접근할 경우, 숫자 키패드가 표시된다.                              |
| `type="tel"`      | 모바일에서는 번호 키패드가 표시되며 `number`와 달리 0 으로 시작할 수 있다. |
| `type="range"`    | 역시 숫자 input 이지만, 정확한 값이 아니라 범위를 지정할 수 있다.          |
| `type="password"` | maxlength 와 minlength 속성을 사용할 수 있다.                              |

<br/>

이외에도 `color`, `date`, `datetime-local`, `file`, `hidden`, `image`, `month`, `Note`, `reset`, `search`, `submit`, `time`, `url`, `week` 등 type 이 있다.

<br/>

* 출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input

---

## 1. `datalist` tag

* option 값들이 autocomplete dropdown 으로 제공된다.
* list 의 이름과 datalist 의 id 가 일치해야 한다.

<b>Example:</b>

<form>
  <label>
    <span>👉 Select formula:</span>
    <input name="formula" type="text" list="formula">
  </label>
  <!-- datalist -->
  <datalist id="formula">
    <option value="sin">
    <option value="cos">
    <option value="tan">
    <option value="cot">
  </datalist>
</form>

```html
<input name="formula" type="text" list="formula">
<!-- datalist -->
<datalist id="formula">
  <option value="sin">
  <option value="cos">
  <option value="tan">
  <option value="cot">
</datalist>
```

---

## 2. `min`, `max`, `step` attributes of `number` type

* value 로 default 값을 지정할 수 있다.
* min, max 와 step 을 지정할 수 있다.

<b>Example:</b>

<form>
  <label>
    <span>👉 Select number: </span>
    <input name="precision" type="number" min="0" max="50" step="5" value="50">
  <label>
</form>

```html
<input name="precision" type="number" value="50" min="0" max="50" step="5" >
```

* 출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number

---

## 3. `range` type

<b>Example:</b>

<form>
  <label>
    <span>👉 Select range (1 to 10): </span>
    <input name="iterations" type="range" min="1" max="10">
  </label>
</form>

```html
<input name="iterations" type="range" min="1" max="10">
```

---

## 4. Displaying validity only with css!

css 에서 `:invalid`, `:valid` property 로 input 값의 유효성을 간단하게 표시할 수 있다.

<br/>

<b>Example:</b>

<iframe src="https://codesandbox.io/embed/34z0v2ryrq?autoresize=1&fontsize=14&hidenavigation=1&view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

<br/>

```css
input:invalid + span:after {
  content: "✖";
  padding-left: 5px;
}

input:valid + span:after {
  content: "✓";
  padding-left: 5px;
}
```

---

## 5. Using proper types in React/TypeScript

리액트와 타입스크립트를 사용한다면 아래처럼 미리 리액트 라이브러리에서 정의된 타입을 사용하여 컴포넌트를 만들 수 있다.

```javascript
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  // additional props
}

export const Input: React.SFC<Props> = props => (
  <input value={value} {...props} />
);
```
