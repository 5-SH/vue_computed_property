const { DependencyTracker, trace } = require('./dependency');

module.exports = {
  reactive: function (obj, key, v) {
    let deps = [];
    Object.defineProperty(obj, key, {
      get: () => {
        // Check if there is a target and it hasn't been linked
        // as a dependency already
        if (DependencyTracker.target && deps.indexOf(DependencyTracker.target) == -1) {
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
          // call the target's callback
          dep();
        }
      },
    });
  },
};
