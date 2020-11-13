import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
  pots: [],
  timers: {
    seconds: null,
    halfMinutes: null,
  }
}
const mutations = {
  setPots(state, payload) {
    state.pots = payload.pots;
  }, 
  incrementAmount(state) {
    state.pots.forEach(pot => {
      pot.prevAmount = pot.amount;
      pot.amount = pot.amount * 1.01;
    })
  },
  decrementTimeLeft(state) {
    state.pots.forEach(pot => {
      if (pot.must_drop_in) {
        if (pot.timeLeft > 1000) pot.timeLeft -= 1000;
        else pot.timeLeft = 0;
      }
    });
  },
  setTimer(state, payload) {
    state.timers[payload.timerType] = payload.timer;
  },
  clearIntervals(state) {
    clearInterval(state.timers.seconds);
    state.timers.seconds = null;
  }
}

const actions = {
  loadPots(state) {
    fetch('/assets/fake-data/data.json')
    .then(res => res.json())
    .then(res => {
      state.commit('setPots', {
        pots: res.pots.map(pot => {
          return {
            ...pot,
            amount: +pot.amount,
            prevAmount: 0,
            timeLeft: pot.must_drop_in ? timeLeft(pot.must_drop_in)
            : null,
          }
        })
      })
    })
    .catch(err => console.log(err.message));
  },
  initializeSecondsTimer(context) {
    let secondsTimer = setInterval(() => context.commit('decrementTimeLeft'), 1000);
    context.commit('setTimer', { timer: secondsTimer, timerType: 'seconds' });
  },
  initializeHalfMinuteTimer(context) {
    let halfMinuteTimer = setInterval(() => context.commit('incrementAmount'), 30000);
    context.commit('setTimer', { timer: halfMinuteTimer, timerType: 'halfMinutes' });
  }
}
const getters = {
  pots: state => state.pots,
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

const timeLeft = mustDropIn => {
  const reducer = (timeObj, temporalMeasure) => {
    return {
      milliseconds: timeObj.milliseconds + +temporalMeasure * 1000 * Math.pow(60, timeObj.step),
      step: timeObj.step + 1,
    }
  };

  const timeObjTemplate = {
    milliseconds: 0,
    step: 0
  };
  
  return mustDropIn.split(':').reduceRight(reducer, timeObjTemplate).milliseconds;
};