Observer 패턴을 활용해 vue.js 의 computed 속성을 구현
person 객체의 age property 를 state computed function 이 종속성을 가진다.
age 가 변경될 때 마다 state 를 호출하지 않아도
Observer 패턴의 종속성 등록을 통해 자동으로 변경된다.
