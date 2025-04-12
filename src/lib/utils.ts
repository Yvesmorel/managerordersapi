function convertDateToMilliscnd(date) {
  return new Date(date).getTime();
}

module.exports = {
  convertDateToMilliscnd,
};
