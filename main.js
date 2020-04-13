const { reactive } = require('./reactive');
const { computed } = require('./computed');

const person = {};
reactive(person, 'age', 16);
reactive(person, 'country', 'Brazil');

/**
 * person.age 에 종속성을 가지는 computed function 'status' 추가
 * status 함수는 종속성 대상(person.age)의 변화 추적이 필요함
 * => person.age 가 변경되면 status 함수를 호출하지 않아도 자동으로 변경 되도록
 **/

computed(
  person,
  'status',
  () => {
    if (person.age > 18) {
      return 'Adult';
    } else {
      return 'Minor';
    }
  },
  (v) => {
    console.log("CHANGED!! The person's status is now: " + v);
  }
);

console.log('Current age: ' + person.age);
console.log('Current status: ' + person.status);

// change age
console.log('Changing age');
person.age = 22;

// change country. Note that status update doesn't trigger
// since status doesn't depend on country
console.log('Changing country');
person.country = 'Chile';
