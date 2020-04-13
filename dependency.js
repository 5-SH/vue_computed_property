module.exports = {
  // Singleton to track dependencies
  DependencyTracker: {
    // current target
    target: null,
  },

  trace: (message) => {
    // console.log('[ TRACE ] ' + message);
  },
};
