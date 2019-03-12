---
path: "/basic-data-structures"
date: "2017-08-03"
title: "Basic Data Structures"
tags: ['Algorithm', 'python']
excerpt: "Python Algorithm Study - Week 3, 4"
type: ""
---

[Problem Solving with Algorithms and Data Structures using Python](http://interactivepython.org/courselib/static/pythonds/index.html) 책을 읽으며 스터디한 내용을 정리하여 연재합니다.

---

1. __Stack__ : insertion and deletion of items takes place only at a single end called *top* of the stack
2. __Queue__
3. __Deque__

---

## 4. List

1. O(1) vs O(n)
    - 리스트를 사용하여 Stack 클래스를 만들 경우, `pop()` 이나 `append()`는 `O(1)`이다. 자리에 상관 없이 맨 마지막에 들어가기 때문.
    - 그러나 `pop(0)`, `insert(0, x)` 는 `O(n)`이다. 앞에서부터 자리수가 다 바뀌기 때문.
    - 논리적으로 같더라도, __벤치마크 테스팅__ 을 하면 속도가 달라진다. (even though the implementations are logically equivalent, they would have very different timings when performing benchmark testing)

2. Linked Lists
    1. Linked list 란?  [(Wikipedia)](https://en.wikipedia.org/wiki/Linked_list)
        - Linear 한 데이터의 모음
        - 인덱스(?)가 부여되어 있지 않음 (그만큼 메모리를 안먹음)
            - 파이썬의 리스트는 인덱스가 부여되어 있다! 그래서 중간에 insert 하는건 `O(n)`
            - 대신 pointer라고 하는 애가 다음 데이터를 가리키고 있음
        - 물론 첫 데이터는 처음이라는 표시가 있고, 마지막 데이터는 포인터를 갖고 있지 않음
        - 각각의 데이터를 node 라고 부름. 이 node 가 모인 것이 sequence. 즉, 각각의 node 는 데이터와 레퍼런스를 갖고 있는 셈

    2. Linked list를 구현하는 이유
        - 리스트 중간에 아이템을 넣거나 뺄 수 있다.
        - 스택과 큐를 만들 수 있다.
        - 처음에 사이즈를 지정할 필요가 없다.

    3. Linked list의 단점
        - pointer 때문에 array 보다 메모리를 더 먹는다.
        - sequence이기 때문에 한 아이템을 찾으려면 진입점부터 하나 하나 체크해야 한다.

---

## 1-1. Unordered List

```python
# Pythonic way to define getter/setter/deleter - @property를 쓰세요!

class Node:
    def __init__(self, initdata):
        self.data = initdata
        self.next = None

        # Note in the constructor that a node is initially created with next set to None. Since this is sometimes referred to as “grounding the node,” we will use the standard ground symbol to denote a reference that is referring to None. It is always a good idea to explicitly assign None to your initial next reference values.

    def getData(self):
        return self.data

    def getNext(self):
        return self.next

    def setData(self,newdata):
        self.data = newdata

    def setNext(self,newnext):
        self.next = newnext

class PythonicNode:
    def __init__(self, initdata):
        self.data = initdata
        self.next = None

    @property
    def x(self):
        return self.data

    @x.setter
    def x(self, newdata):
        self.data = newdata

    @x.deleter
    def x(self):
        del self.data
```

```python
temp = PythonicNode(93)

# getter
temp.x # 93

# setter
temp.x = 1234
temp.x # 1234

# deleter
del temp.x
```

---

## 1-2. The Unordered List Class

```python
class UnorderedList:
    def __init__(self):
        self.head = None

    # 이 클래스는 첫 노드에 대한 레퍼런스를 반드시 가져야 한다. (... class must maintain a reference to the first node.)
    # 그런데 이 생성자에 head가 none 인 이유는 막 생성된 리스트는 아무 노드도 없기 때문!

    def isEmpty(self):
        return self.head == None
    # 이 리스트가 있는지 없는지 보려면 head가 있는지 없는지만 보면 됨. 그래서 boolean식으로 알아봄

    def add(self, item):
        temp = Node(item)    # temp는 노드 클래스의 인스턴스여야 하고,
        temp.setNext(self.head)    # 새로운 temp가 들어오면, 원래 있던 head(None)는 temp의 next가 되고,
        self.head = temp    # temp는 새로운 head가 된다! - modify the head of the list to refer to the new node

    # 3,4번째 라인의 순서가 중요하다!
    # x.next == None 이면, x 는 이 리스트의 첫 데이터

    def size(self):
        current = self.head
        count = 0
        while current != None:    # head 가 None이 나올때까지, 끝까지 돈다.
            count = count + 1     # while loop가 도는 횟수를 센다.
            current = current.getNext()

        return count

    def search(self, item):
        current = self.head
        found = False
        while current != None and not found:
            if current.getData() == item:
                found = True
            else:
                current = current.getNext()

        return found

    # head부터 차근차근 찾아나간다. 일치하지 않으면 found가 False를, 일치하면 True를 뱉어냄.

    def print_all(self):
        current = self.head
        while current != None:
            print(current.getData())
            current = current.getNext()

    def remove(self, item):    # 제거하고 싶은 노드의 앞,뒤 링크를 끊어주면 된다.
        current = self.head
        previous = None
        found = False
        while not found:
            if current.getData() == item:
                found = True
            else:
                previous = current
                current = current.getNext()

        if previous == None:
            self.head = current.getNext()
        else:
            previous.setNext(current.getNext())

        # 순서는 바꿨는데, node 인스턴스는 그대로 남아있잖아? (size는 그대로 아닌가?)


    # 함께 풀어봅시다!!    
    def append(self, item):    # item이 last가 되려면? 처음 들어온 아이템까지 가서 그 next에 item을 붙인다.
        temp = Node(item)
        current = self.head

        while current.getNext() != None:
            current = current.getNext()
        current.setNext(temp)

```

```python
mylist = UnorderedList()
print(mylist.head)
# None
```

```python
mylist.add(31)
mylist.add(77)
mylist.add(17)
mylist.add(93)
mylist.add(26)
mylist.add(54)
print(mylist.head)

# <__main__.Node object at 0x1045acf28>
```

```python
mylist.size()
# 6

mylist.print_all()
# 54
# 26
# 93
# 17
# 77
# 31

mylist.search(17)
# True

mylist.remove(17)
mylist.print_all()
# 54
# 26
# 93
# 77
# 31

mylist.append(14923)
mylist.print_all()
# 54
# 26
# 93
# 77
# 31
# 14923
```

---

## 2-1. Ordered List
OrderedList()

    - add(item)
    - remove(item)
    - search(item)
    - isEmpty()
    - size()
    - append(item)
    - index(item)
    - insert(pos,item)
    - pop()
    - pop(pos)

(append, insert가 안됨)

---

## 2-2. The Ordered List Class

```python
class OrderedList:
    def __init__(self):
        self.head = None

    def search(self, item):    # 크기의 순서가 있기 때문에 끝까지 돌지 않아도 된다.
        current = self.head
        found = False
        stop = False
        while current != None and not found and not stop:
            if current.getData() == item:
                found = True
            else:
                if current.getData() > item:    # 찾는 데이터보다 큰곳까지 왔는데도 없다면, 여긴 없다는 뜻. iteration을 stop 해도 된다.
                    stop = True
                else:
                    current = current.getNext()

        return found

    def add(self,item):   # unordered랑 다르게, 아무데나 들어가선 안되고, 크기에 맞게 들어가야한다.
        current = self.head
        previous = None
        stop = False
        while current != None and not stop:
            if current.getData() > item:
                stop = True
            else:
                previous = current
                current = current.getNext()

        temp = Node(item)    # 인스턴스 생성해주고,
        if previous == None:
            temp.setNext(self.head)
            self.head = temp
        else:
            temp.setNext(current)    # item 보다 큰 current 는 item 뒤에 넣어주고
            previous.setNext(temp)    # item보다 작은 previous의 next 에 item을 넣어준다.

    def print_all(self):
        current = self.head
        while current != None:
            print(current.getData())
            current = current.getNext()
```

```python
mylist = OrderedList()
mylist.add(31)
mylist.add(77)
mylist.add(17)
mylist.add(93)
mylist.add(26)
mylist.add(54)

mylist.print_all()
# 17
# 26
# 31
# 54
# 77
# 93
```
