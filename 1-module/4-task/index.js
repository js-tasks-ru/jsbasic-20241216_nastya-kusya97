function checkSpam(str) {
  if (!str) return false;
  let strLowerCase = str.toLowerCase();
  return strLowerCase.includes('1xbet') || strLowerCase.includes('xxx');
}
