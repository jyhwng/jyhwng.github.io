---
path: "/recursion"
date: "2017-08-17"
title: "Recursion"
tags: ['Algorithm', 'python']
excerpt: "Python Algorithm Study - Week 5, 6"
type: ""
---

[Problem Solving with Algorithms and Data Structures using Python](http://interactivepython.org/courselib/static/pythonds/index.html) 책을 읽으며 스터디한 내용을 정리하여 연재합니다.

---

## 1. Recursion 이란?
- Breaking down a problem into smaller and easier subproblems
- A `recursive function` is a function that calls itself
- It’s ELEGANT!

Recursion이란 문제를 가장 작은 단위까지 쪼개서 해결하는 것을 의미한다. 함수를 반복해서 호출하며 가장 작은 단위까지 내려가기만 해도 큰 단위의 문제를 해결할 수 있다. 아래는 리스트의 모든 값을 더하는 recursive한 함수이다.

```python
# Recursive sum
list = [2, 4, 6, 8, 10]

def recursive_sum(list):
    if len(list) == 1:  # base-case
        sum = list[0]
        return sum
    else:
        sum = list[0] + recursive_sum(list[1:])
        return sum
```

여기서 `len(list) == 1` 인 경우를 정의하는 것이 가장 중요한데, 이를 base case 라고 부른다. Recursion에서는 base case를 잘 정의하는 것이 제일 중요하다. 반복해서 돌아가는 recursive function이 종료되는 조건이기 때문이다. 가장 작은 recursive function 을 정의하면 나머지는 그냥 함수를 recursive하게 불러오기만 하면 된다.

---

## 2. 3 laws of recursion
1. must have a __base case__
2. __state-changing__ & move toward the base case
3. must __call itself__, recursively

```python
# Recursive factorial
def fact(n):
    if n <= 1:
        return 1
    else:
        return n * fact(n-1)
```

여기서 base case는 n이 1보다 작을 때이다. 1보다 큰 경우에는 자기 자신을 계속 불러오며 base case를 향해 상태를 변경한다.

* 10진법 수를 (2~16)진법 수로 변환해보자!

```python
# % 는 나머지, // 는 몫
def toStr(n, base):
    convertString = "0123456789ABCDEF"
    if n < base:
        return convertString[n]
    else:
        return toStr(n // base, base) + convertString[n % base]
```

* Readability over Time complexity : Recursion는 for문을 돌릴 때보다 time complexity가 높다. 자기 자신을 계속 불러오기 때문에 메모리 사용량도 크다. (for문의 경우 값을 구하고 바로바로 반환하기 때문에 일정한 메모리를 사용한다.) 그러나 읽기 좋은 코드를 만들 수 있다.

---

## 3. Binary Search
오름차순으로 정렬되어 있는 리스트에서 특정 값을 찾는 방법. 큰 값(high)과 작은 값(low)이 있고 중간값(mid)이 그 사이에 있는지 보면서 해당 값의 위치를 찾는다.

```python
def binary_search(data, target, low, high):
    if low > high:
        return False    
    else:
        mid = (low + high) // 2
        if target == data[mid]:     
            return True
        elif target < data[mid]:
            return binary_search(data, target, low, mid-1)
        else:   
            return binary_search(data, target, mid+1, high)
```

* 함께 보기 :point_right: [Quick sort](http://interactivepython.org/courselib/static/pythonds/SortSearch/TheQuickSort.html), [Segment tree](https://en.wikipedia.org/wiki/Segment_tree)

---

## 4. Visualizing Recursion

- Fractal
    - The fractal has the same basic shape no matter how much you magnify it
- Python의 visualizing 툴인 [turtle](https://docs.python.org/3.6/library/turtle.html)을 사용하면 다양한 fractal을 시각화 할 수 있다.

- 함께 보기 :point_right: [하노이의 탑 문제](http://interactivepython.org/courselib/static/pythonds/Recursion/TowerofHanoi.html) - n개 높이의 하노이 탑이 있다고 하자. 가장 위에 있는 첫번째 디스크 다른 곳으로 옮기면, 남은 (n-1)개 탑에 대한 하노이 탑이 된다. 그래서 하노이의 탑도 재귀를 이용해서 풀 수 있다.
- 함께 보기 :point_right: [Memoization](https://en.wikipedia.org/wiki/Memoization) - 이미 구한 값은 메모리에 저장하고 다시 구하지 않도록 하여 보다 빠르게 연산하는 방법 [(Mincoins)](http://interactivepython.org/courselib/static/pythonds/Recursion/DynamicProgramming.html)
