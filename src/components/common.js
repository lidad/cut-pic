export function delayPromise(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}
