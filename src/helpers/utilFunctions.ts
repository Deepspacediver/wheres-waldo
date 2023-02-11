const capitalize = (x: string) => x[0].toUpperCase() + x.slice(1);

const convertTime = (time: number) => {
  const minutes = Math.trunc(time / 60);
  const seconds = Math.trunc(time % 60);
  return {
    minutes: minutes < 10 ? String("0" + minutes) : String(minutes),
    seconds: seconds < 10 ? String("0" + seconds) : String(seconds),
  };
};

export { capitalize, convertTime };
