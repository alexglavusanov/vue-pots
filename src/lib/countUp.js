import 'countup.js';
import { CountUp } from 'countup.js';

let changeValue = function(element, prefix, endVal, startVal = 0) {
  const options = {
    startVal,
    decimalPlaces: 2,
    prefix,
  };

  let bangUp = new CountUp(element, endVal, options);

  if (!bangUp.error) {
    bangUp.start();
  } else {
    console.error(bangUp.error);
  }
}

export default changeValue;