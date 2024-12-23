function factorial(n) {
  let res = n;
  if (n === 0 || n === 1) return 1;

  for (let i = 1; i < n; i++) {
    res *= (n - i);
  }
  return res;
}
