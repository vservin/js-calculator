let result = [0];
const displayContainer = document.querySelector('div.display');

function getLastResultValue() {
  return result[result.length -1];
}

function numberClicked(number) {
  const lastResult = getLastResultValue();
  if (typeof lastResult === 'bigint' || typeof lastResult === 'number') {
    result[result.length -1] = parseFloat(lastResult.toString() + number);
  } else if (typeof lastResult === 'string') {
    result.push(number);
  }
  refreshShownValue();
}

function operandClicked(operand) {
  const lastResult = getLastResultValue();
  if (typeof lastResult === 'bigint' || typeof lastResult === 'number') {
    result.push(operand);
  } else if (typeof lastResult === 'string') {
    result[result.length -1] = operand;
  }
  refreshShownValue();
}

function clearClicked(all) {
  if (all) {
    result = [0n];
    return refreshShownValue();
  }
  const lastResult = getLastResultValue();
  if (typeof lastResult === 'bigint' || typeof lastResult === 'number') {
    if (lastResult.toString().length === 1) {
      if (result.length === 1) {
        result = [0n];
        return refreshShownValue();
      }
      result = result.slice(0, -1);
      return refreshShownValue();
    }
    result[result.length -1] = parseFloat(lastResult.toString().slice(0, -1));
    return refreshShownValue();
  }
  if (typeof lastResult === 'string') {
    result = result.slice(0, -1);
    return refreshShownValue();
  }
}

function refreshShownValue() {
  displayContainer.innerHTML = result.join(' ');
}

function forceResult() {
  const localResult = eval(result.join(''));
  result = localResult % 1 !== localResult ? [localResult] : [parseFloat(localResult)];
  refreshShownValue();
}

refreshShownValue();
