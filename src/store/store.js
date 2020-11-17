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
  setTimer(state, payload) {
    state.timers[payload.timerType] = payload.timer;
  },
  incrementAmount(state) {
    state.pots.forEach((pot, index) => {
      pot.prevAmount = pot.amount;
      animateAmount(index, pot.prevAmount, (pot.amount * 1.01).toFixed(2));
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
  clearIntervals(state) {
    clearInterval(state.timers.seconds);
    clearInterval(state.timers.halfMinutes);
    state.timers.seconds = null;
    state.times.halfMinutes = null;
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
  funds: state => id => `${state.pots[id].currency}${state.pots[id].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
  timeLeft: state => id => {
    let seconds = Math.floor((state.pots[id].timeLeft / 1000) % 60),
      minutes = Math.floor((state.pots[id].timeLeft / (1000 * 60)) % 60),
      hours = Math.floor((state.pots[id].timeLeft / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
  },
  type: state => id => state.pots[id].type,
  imageURL: state => id => {
    let name;
    switch (state.pots[id].imageType) {
      case "daily_drop":
        name = "1.png";
        break;
      case "super_drop":
        name = "2.png";
        break;
      case "hourly_drop":
        name = "3.png";
        break;
    }

    return `/assets/${name}`;
  },
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

const animateAmount = (id, start, end) => {

  let range = end - start;

  let step = (range / 40).toFixed(2);

  let startTime = new Date().getTime();
  let endTime = startTime + 2000;
  let timer;

  function run() {
    let now = new Date().getTime();
    let remaining = Math.max((endTime - now) / 50, 0);
    let value = (end - (remaining * step)).toFixed(2);
    state.pots[id].amount = value;
    if (value == end) {
      clearInterval(timer);
    }
  }

  timer = setInterval(run, 50);
  run();
}

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