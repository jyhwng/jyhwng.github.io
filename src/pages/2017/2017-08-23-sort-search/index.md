---
path: "/sort-search"
date: "2017-08-23"
title: "Sorting and Searching"
tags: ['Algorithm', 'python']
excerpt: "Python Algorithm Study - Week 7, 8"
type: ""
---

[Problem Solving with Algorithms and Data Structures using Python](http://interactivepython.org/courselib/static/pythonds/index.html) 책을 읽으며 스터디한 내용을 정리하여 연재합니다.

---

## 1. Sequential search

- Sequential search는 리스트에서 item을 찾을 때, 앞에서 하나씩 비교하며 찾는 방식이다.
- Analysis


1. Unordered list

Case | Best Case | Worst Case | Average Case
------ | ------ |------| -----
item is present | 1 | n | n/2 
item is not present | n | n | n 

2. Ordered list

Case    |	Best Case |   Worst Case  |   Average Case
    ------ | ------ |------| -----
item is present | 	1 |  n   |   n/2
item is not present |	1 |   n |   n/2

---

## 2. Binary search
- Binary search는 리스트가 크기순으로 정렬이 되어있을 때, 가운데 있는 데이터와 찾고자 하는 아이템을 비교해서 데이터를 반씩 줄여나가는 방법이다.
- Binary search의 시간복잡도는 `O(logn)`이다. Sequential search보다 시간복잡도는 낮지만 무조건 '정렬'을 거쳐야 하기 때문에 경우에 따라 비용이 더 들수도 있다. (If we can sort once and then search many times, the cost of the sort is not so significant. However, for large lists, sorting even once can be so expensive that simply performing a sequential search from the start may be the best choice.)

```python
# Recursive binary search
def binarySearch(alist, item):
    if len(alist) == 0:
        return False
    else:
        midpoint = len(alist)//2
        if alist[midpoint]==item:
            return True
        else:
            if item<alist[midpoint]:
                return binarySearch(alist[:midpoint],item)
            else:
                return binarySearch(alist[midpoint+1:],item)
```

---

## 2. Hashing

1. Hashing이란?
    - 임의의 크기를 가진 데이터를 고정된 크기의 데이터로 변환시키는 것. 주로 임의의 문자열을 빠르게 찾기 위해 짧은 정수나 알파벳을 할당해준다.
    - 이상적으로는 시간복잡도를 `O(1)`과 가장 가깝게 만들어 검색속도를 빠르게 하기 위한 방법이나, 완전한 `O(1)`은 불가능하다.
    - AWS EC2 인스턴스를 만들 때 생성되는 키페어의 원리인 - `SHA`(Secure Hash Algorithm)와 `MD5`같은 암호화와도 관련있다. [(출처)](http://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/ec2-key-pairs.html)

1. Hash table / Slot / Hash function / Load factor

    - `Hash table`은 데이터들의 모음이며 일정한 크기(m)를 가진다.
    - 이 테이블의 각 자리를 `slot`이라고 하며 slot은 0부터 (m-1)까지 인덱스를 갖는다.
    - 각 데이터를 알맞은 slot에 매핑해주는 식을 `hash function`이라고 한다.
    - 테이블 크기에 대해 데이터를 가진 slot의 개수를 `load factor`(부하계수)라고 한다. 테이블 크기가 11이고 데이터가 채워진 slot이 6개라면 load factor(λ)는 6/11이다.

2. Remainder method

    - 가장 간단한 방식의 hash function이다. 데이터를 해새테이블의 크기로 나눈 나머지로 할당하는 방법이다.
    ![img](http://interactivepython.org/courselib/static/pythonds/_images/hashtable2.png)
    - 그러나 이 경우, 같은 나머지 값을 가진 데이터는 한 슬롯에서 충돌하게 된다. 위의 예에서 만약 44라는 데이터를 넣을 경우 '44 % 11 = 0'이기 때문에 77과 충돌하게 된다.
    - 충돌이 발생하지 않는 hash function을 `Perfect hash function`이라고 부른다. 그러나 임의의 데이터들의 모음이 있을 때, 완벽한 해시 함수를 만드는 것은 데이터 숫자만큼 해시 테이블의 숫자를 늘리지 않는 이상 불가능하다.
    - 완벽한 해시 함수를 만들 수 없다면 충돌을 최소화 하는 방법을 찾으면 된다.

2. Collision Resolution (충돌이 발생할 때 해결하는 방법)

    1. Open addressing & Linear probing
    - 새로운 데이터가 기존 데이터와 같은 슬롯에서 충돌할 때, 비어있는 슬롯을 찾아 한칸씩 옆으로 가는 방법. 이를 `rehashing`이라고 부르기도 한다.
    - 충돌이 많이 나는 슬롯 근처에 데이터가 쌓이는 clustering이 생긴다는 단점이 있다.
    2. Chaining
    - 하나의 슬롯에 여러개의 데이터가 들어가는 것을 허용하는 방식이다.
    - 인스타그램의 hashtag나, 사전에서 단어를 찾을 때 맨 앞 글자가 속한 곳부터 찾는, '색인'과 같은 개념이다.
    - 함께 보기 :point_right: How to resize a hash table?

3. Map abstract data type

- 파이썬에서 Dictionary라고 불리는 데이터 타입은 key와 value가 짝을 이루는 `Map` 자료구조와 같다.

```python
# Open addressing 방식의 Hash로 Map 데이터타입 만들기
class HashTable:
    def __init__(self):
        self.size = 11
        self.slots = [None] * self.size
        self.data = [None] * self.size

    def put(self,key,data):
    hashvalue = self.hashfunction(key,len(self.slots))

    if self.slots[hashvalue] == None:
        self.slots[hashvalue] = key
        self.data[hashvalue] = data
    else:
        if self.slots[hashvalue] == key:
            self.data[hashvalue] = data  #replace
        else:   # Open addressing 방법
            nextslot = self.rehash(hashvalue,len(self.slots))
            while self.slots[nextslot] != None and self.slots[nextslot] != key:
                nextslot = self.rehash(nextslot,len(self.slots))

            if self.slots[nextslot] == None:
                self.slots[nextslot]=key
                self.data[nextslot]=data
            else:
                self.data[nextslot] = data #replace

    def hashfunction(self,key,size):
         return key%size

    def rehash(self,oldhash,size):
        return (oldhash+1)%size

    def get(self,key):
        startslot = self.hashfunction(key,len(self.slots))

        data = None
        stop = False
        found = False
        position = startslot
        while self.slots[position] != None and not found and not stop:
            if self.slots[position] == key:
                found = True
                data = self.data[position]
            else:
                position=self.rehash(position,len(self.slots))
                if position == startslot:
                    stop = True
        return data

    def __getitem__(self,key):
        return self.get(key)

    def __setitem__(self,key,data):
        self.put(key,data)
```

4. Analysis of Hashing

- Hash table에서 가장 중요한 것은 load factor(λ)이다. λ이 작을수록 비어있는 slot이 많다는 뜻이며, 충돌도 비교적 적다. 반대로 λ이 클수록 hash table이 꽉 차있다는 의미이며 따라서 충돌도 더 많을 수 있다.

---

## 3. Sorting
1. The Bubble Sort
    - (n-1과 n을 비교) X n번
    - O(n^2)

```python
def bubble_sort(list):
    for passnum in range(len(list)-1, 0, -1):
        for i in range(passnum):
            if list[i] > list[i+1]:
                list[i], list[i+1] = list[i+1], list[i]
```

2. The Selection Sort

    - 제일 큰거 search 해서 뒤에에서 n번째에 두기 X 반복
    - O(n^2)
    - pythontutor.com 에서 과정 볼수 있음

3. The Insertion Sort

    - 리스트의 크기를 1씩 키워가며 sorting
    - 추가되는 value는 이미 sorting 되어있는 값과 비교해서 맞는 자리에 넣기

4. The Shell Sort

    - 몇개의 sublist 로 나눠서 sorting 한다음 합치기
    - 단, sublist로 나눌 때 바로 옆에 있는거랑 같이 들어가지 않고 step을 두고 들어감.
    - interval 값을 구하는 식도 따로 있음.

5. The Merge Sort *재귀*

    - 두개씩 비교 해서 sorting 하고 비교된걸 합쳐서 다시 sorting 하고... 모두 합쳐질때까지 sorting.
    - 두개씩 비교하기 때문에 logn, 마지막에 n번 돌며 하나씩 비교하기 때문에 O(nlogn)이 나온다.

6. The Quick Sort *재귀*

    - pivot value라는 기준점을 하나 정한다(정하는 방법은 다양함).
    - pivot value를 제외한 가장 왼쪽 값과 가장 오른쪽 값을 각각 leftmark, rightmark라고 한다.
    - leftmark와 pivot value 를 비교해서 leftmark가 더 클때 leftmark는 움직임을 멈춘다. 이때 leftmark와 rightmark랑 비교해서 leftmark가 더 크면 swap한다.
    - leftmark와 rightmark 가 만날때까지 반복하면 pivot value를 기준으로 lefthalf와 righthalf가 나뉘게 된다.
    - 나뉜 lefthalf에서 다시 quick sort를, righthalf에서도 quick sort를 각각 한다.
    - 반복
