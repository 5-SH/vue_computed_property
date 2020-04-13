const { DependencyTracker, trace } = require('./dependency');

module.exports = {
  computed: (obj, key, f, cb) => {
    const onDependencyUpdated = function () {
      trace('Dependency updated for ' + key + '. Recomputing.');
      const value = f();
      cb(value);
    };

    Object.defineProperty(obj, key, {
      get: () => {
        trace('Getting computed property :' + key);

        // Set current update callback
        DependencyTracker.target = onDependencyUpdated;

        // Compute the value
        const value = f();

        // Reset the target so no more property adds this as dependency
        DependencyTracker.target = null;

        return value;
      },
      set: () => {
        console.warn('nope!');
      },
    });
  },
};
