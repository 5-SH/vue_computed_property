module.exports = {
  /**
   * 종속성 추적기
   * computed 함수를 객체 property 에 종속하도록 한다.
   */
  DependencyTracker: {
    // 종속성 등록이 필요한 computed 함수
    target: null,
  },

  trace: (message) => {
    // console.log('[ TRACE ] ' + message);
  },
};
