const { DependencyTracker, trace } = require('./dependency');

module.exports = {
  computed: (obj, key, f, cb) => {
    const dependencyUpdate = () => {
      trace('Dependency updated for ' + key + '. Recomputing.');
      const value = f();
      cb(value);
    };

    Object.defineProperty(obj, key, {
      // computed function 이 call 되면 종속성 추가 과정을 진행한다.
      get: () => {
        trace('Getting computed property :' + key);

        // Set current update callback
        DependencyTracker.target = dependencyUpdate;

        /**
         * Person.age 의 getter 를 호출
         * Person.age 의 getter 에서 computed 함수 status 의 종속성을 등록한다.
         **/

        const value = f();

        // 종속성을 등록하고 빠짐
        DependencyTracker.target = null;

        return value;
      },
      set: () => {
        console.warn('nope!');
      },
    });
  },
};
