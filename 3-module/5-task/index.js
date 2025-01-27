function getMinMax(str) {
  const arr = str.split(' ').filter(item => Number.isFinite(+item)).sort((a, b) => a - b);
  return {min: +arr[0], max: +arr.at(-1)};
}
