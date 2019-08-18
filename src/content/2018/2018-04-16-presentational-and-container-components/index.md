---
path: "/presentational-and-container-components"
date: "2018-04-16"
title: "Stateless Component & Container"
tags: ['react', 'javascript']
excerpt: "Build React with separation of concerns in mind"
type: ""
---

## 1. What is it?

UI를 담당하는 컴포넌트와 데이터를 주고 받는 컴포넌트를 분리하는 패턴이다. React 공식 문서의 ['Lifting State Up'](https://reactjs.org/docs/lifting-state-up.html)(공통된 조상으로 state를 올려서 관리하는 것)의 응용이라고 볼 수 있다. Separation of concern을 따르고 특히 stateless component의 경우, 재사용이 용이하다는 장점이 있다. 

출처: 

- [Presentational and Container Components
](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [Clean Code vs. Dirty Code: React Best Practices
](http://americanexpress.io/clean-code-dirty-code/)

---

## 2. Stateless component

0. 'How things look' 에 관한 것이다.
1. 보통 state나 lifecycle hook을 갖지 않는 functional 컴포넌트이다. state가 있다면 UI와 관련된 것이다. (ex. toggle) 그래서 타입스크립트에서는 보통 Stateless Functional Component로 정의한다. 

```javascript
interface Props {
  name: string
}

export const Hello: React.SFC<Props> = ({ name }) => (
  <div>Hello, {name}!</div>
)
```

2. 데이터와 콜백도 prop을 통해서만 받는다.

---

## 3. Container component

0. 'How things work' 에 관한 것이다.
1. 보통 DOM markup을 갖지 않고 데이터를 로드하고 변경하는 역할만 담당한다. 
2. class 컴포넌트로 state를 갖고 있으며 데이터 소스의 역할을 한다. 
3. 하위 컴포넌트에 콜백과 데이터를 prop으로 보낸다. 콜백함수도 prop으로 던져서 자식 단에서 trigger 할 수 있기 때문에, 데이터를 한 곳에서 받아서 변경하는 것이 가능하다.

```javascript
interface Props {
  options: string[]
}

interface State {
  selectedOption: string
}

export class SelectOptions extends React.Component<Props, State> {
  state = { selectedOption: null }

  handleSelectOption = (value: string) => this.setState({ selectedOption: value })  // 데이터 변경하기

  render() {
    return (
      <StatelessComponent
        options={this.props.options}  // 데이터 보내기
        onSelectOption={this.handleSelectOption}  // 콜백 보내기
      />
    )
  }
}
```

