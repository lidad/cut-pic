export function delayPromise(millis) {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, millis);
  });
  return promise;
}
