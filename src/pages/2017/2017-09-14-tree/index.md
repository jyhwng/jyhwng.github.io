---
path: "/tree"
date: "2017-09-14"
title: "Trees"
tags: ['Algorithm', 'python']
excerpt: "Python Algorithm Study - Week 9, 10"
type: ""
---

[Problem Solving with Algorithms and Data Structures using Python](http://interactivepython.org/courselib/static/pythonds/index.html) 책을 읽으며 스터디한 내용을 정리하여 연재합니다.

---

## 1. Tree Data Structure
- You can move entire sections of a tree (called a subtree) to a different position in the tree without affecting the lower levels of the hierarchy
* [Payload](https://en.wikipedia.org/wiki/Payload_(computing)) : In computing and telecommunications, the payload is the part of transmitted data that is the actual intended message. The payload excludes any headers or metadata sent solely to facilitate payload delivery

```
{  
   "data":{  
      "message":"Hello, world!"
   }
}
```
The string "Hello, world!" is the payload, while the rest is protocol overhead.

2. List of Lists representation
    - 빈 리스트들이 있는 이유는 insertRight, insertLeft 같은 reference의 자리 역할을 하기 때문.

```python
myTree = ['a', ['b', ['d',[],[]], ['e',[],[]] ], ['c', ['f',[],[]], []] ]
```

![](http://interactivepython.org/courselib/static/pythonds/_images/smalltree.png)

---

## 2. Priority Queues with Binary Heaps

0. Priority Queue
    - Queue는 queue인데 정렬이 되어 있는 queue (여기서는 오름차순)
    - How to enqueue : sorting 을 하면서 enqueue 된다. (the logical order of items inside a queue is determined by their priority)
    - 원래는 insert(O(n)) & sort(O(nlogn)) 을 거쳐야 하지만 binary heap을 사용하면 O(logn)으로 가능하다. 왜냐면 부모랑만 비교하면되고 sibling과의 대소는 무시해도 되기 때문에. (height가 n인 tree의 size는 2^n+x)

1. Heap
    - 최댓값 또는 최솟값을 빨리 찾기 위해 고안된 Complete binary tree.
    - **Binary tree** : 모든 레벨의 노드가 최대 두개의 자식 노드를 가진 트리. 자식노드는 left, right의 자리를 가지고 있다.
    - **Complete binary tree** : leaf node (가장 말단의 노드)를 제외하고는 모든 노드가 '채워진' binary tree / 가장 마지막 subtree 빼고는 left, right가 모두 채워져 있어야함.
    - Tree representation 처럼 쓰지 않고 그냥 단일 list를 사용한다. 이것이 binary heap형태로 되어있다고 머릿 속에 상-상하며 연산을 구현하면 된다.(When we diagram the heap it looks a lot like a tree, but when we implement it we use only a single list)
    - min Heap(오름차순) & max Heap(내림차순)    
    - [Heap sort](https://en.wikipedia.org/wiki/Heapsort) : O(nlogn)의 완전 힙한 시간복잡도를 가진다. 모든 노드를 순회하고(n) 각 노드를 root에 도착할 때까지 부모랑 대소비교하기 때문. (* 참고 : Quicksort 가 평균 O(nlogn), 최대 O(n^2)이다.)

---

## 3. Binary Heap Operations

```python
# Basic operations of binary min heap
BinaryHeap()
insert(k)
findMin()   # 가장 작은 값을 리턴만 한다.
delMin()    # 가장 작은 값을 리턴하면서 삭제한다.
isEmpty()
size()
buildHeap(list) # key 값 리스트를 가지고 새로운 heap을 만든다.
```

---

## 4. Binary Heap Implementation

1. The Structure Property
    - Complete binary tree: leaf node (가장 말단의 노드)를 제외하고는 모든 노드가 '채워진' binary tree / 가장 마지막 subtree 빼고는 left, right가 모두 채워져 있어야함.<br/>
    ![Complete binary tree](http://interactivepython.org/courselib/static/pythonds/_images/compTree.png)
    - x // 2 의 아주 간단한 integer division 만으로도 모든 노드의 자리를 구할 수 있다(traversing nodes).
    - 예를 들어, 어떤 노드가 `p`의 자리에 있다고 할 때, 이 노드의 left child는 `2p` 자리에 있다. right child 의 자리는 `2p+1`이다. 당연히 p의 부모 노드의 자리는 `p/2`이다.

2. The Heap Order Property
    - In a heap, for every node x with parent p, the key in p is smaller than or equal to the key in x

3. Heap Operations

- Insert() <br/>
![insert](http://interactivepython.org/courselib/static/pythonds/_images/percUp.png)

```python
class BinHeap:
    def __init__(self):
        self.heapList = [0] # this zero is not used, but is there so that simple integer division can be used in later methods.
        self.currentSize = 0

    def insert(self,k):
        self.heapList.append(k)
        self.currentSize = self.currentSize + 1
        self.percUp(self.currentSize)

    def percUp(self,i): # i에는 currentSize가 들어감
        while i // 2 > 0:
            if self.heapList[i] < self.heapList[i // 2]: # 가장 마지막에 넣은 값보다 부모노드가 클때,
                self.heapList[i // 2], self.heapList[i] = self.heapList[i], self.heapList[i //2] # 부모랑 자식의 자리를 바꿔주고
            i = i // 2 # root까지 올라갔다 온다. 이거 때문에 (O(logn))

        # 이 과정을 거치는 동안 siblings에는 아무런 영향을 미치지 않는다!
```
- delMin() <br/>
![delMin()](http://interactivepython.org/courselib/static/pythonds/_images/percDown.png)

```python
    ...

    def delMin(self):
        retval = self.heapList[1] # __init__에서 제일 첫 노드는 0이기 때문에 실질적으로 heap의 root는 self.heapList[1] 이다.
        self.heapList[1] = self.heapList[self.currentSize] # 가장 마지막 값을 root에 넣어준다.
        self.currentSize = self.currentSize - 1
        self.heapList.pop() # leaf node 자리로 옮겨온 최솟값을 제거
        self.percDown(1)
        return retval

    def percDown(self,i): # 중요!: i자리의 있는 노드의 자식은 i*2또는 i*2+1이다.
        while (i * 2) <= self.currentSize: # 마지막 노드까지 검사 (1, 2, 4 까지 감)
            mc = self.minChild(i) # self.heapList[i]의 자식 중에 작은 자식의 자리 = mc
            if self.heapList[i] > self.heapList[mc]: # 작은 자식이 자기보다 작다면...
                self.heapList[mc], self.heapList[i] = self.heapList[i], self.heapList[mc] # 그 자식과 자리를 바꾼다.
            i = mc # 위의 과정 반복

    def minChild(self,i): # right node와 left node 중 더 작은 것 찾기
        if i * 2 + 1 > self.currentSize:
            return i * 2
        else:
            if self.heapList[i*2] < self.heapList[i*2+1]:
                return i * 2
            else:
                return i * 2 + 1
```
- buildHeap

```python
    ...

    def buildHeap(self,alist):
        i = len(alist) // 2 # 가장 마지막 노드의 부모 자리
        self.currentSize = len(alist)
        self.heapList = [0] + alist[:]
        while (i > 0):
            self.percDown(i) # 마지막 노드 중 작은 것과 부모 노드 비교해서 부모가 더 크면 자리 바꿈
            i = i - 1 # 아까 그 부모의 sibling 도 똑같이 자리바꿈 해주기
```
