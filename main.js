const { reactive } = require('./reactive');
const { computed } = require('./computed');

const person = {};
reactive(person, 'age', 16);
reactive(person, 'country', 'Brazil');

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
