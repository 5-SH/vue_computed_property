const { DependencyTracker, trace } = require('./dependency');

module.exports = {
  reactive: (obj, key, v) => {
    // Person 의 property 에 종속성을 가지는 computed 함수 리스트
    let deps = [];
    Object.defineProperty(obj, key, {
      get: () => {
        /**
         * Dep 에 종속성 등록이 필요한 함수가 있고
         * Person 에 종속성 등록이 되지 않앗으면 등록을 진행한다.
         **/

        if (DependencyTracker.target && deps.indexOf(DependencyTracker.target) === -1) {
          trace('Adding target to deps for ' + key);
          deps.push(DependencyTracker.target);
        }

        trace('Getting value of ' + key);
        return v;
      },
      set: (nv) => {
        trace('Setting value of ' + key + '. value: ' + nv);
        v = nv;

        for (const dep of deps) {
          // 종속성이 등록된 computed 함수를 호출한다.
          dep();
        }
      },
    });
  },
};
