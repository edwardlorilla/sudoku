const matrixToolkit = {
  makeRow(v = 0) {
    const array = new Array(9);
    array.fill(v);
    return array;
  },
  // 这个没搞懂
  // makeMatrix(v = 0) {
  //   const array = new Array(9);
  //   array.fill(makeRow(v));
  //   return array;
  // }
  // const a = makeMatrix();
  // a[0][1] = 2;
  // console.log(a)
  makeMatrix(v = 0) {
    return Array.from({ length: 9 }, () => this.makeRow(v));
  },
  /**
   * Fisher-Yates 洗牌算法
   */
  shuffle(array) {
    const endIndex = array.length - 2;
    for (let i = 0; i <= endIndex; i++) {
      const j = i + Math.floor(Math.random() * (array.length - i));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
}
module.exports = matrixToolkit;