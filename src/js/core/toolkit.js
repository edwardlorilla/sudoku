/**
 * 矩阵和数组相关的工具
 */
export const matrixToolkit = {
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
     * 对传入数组进行随机排序，然后把这个数组返回出来
     */
    shuffle(array) {
      const endIndex = array.length - 2;
      for (let i = 0; i <= endIndex; i++) {
        const j = i + Math.floor(Math.random() * (array.length - i));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array
    },
    /**
     * 检查指定位置可以填写数字n
     */
    checkFillable(matrix, n, rowIndex, colIndex) {
      const row = matrix[rowIndex]
      const colnum = this.makeRow().map((v, i) => matrix[i][colIndex])
      const { boxIndex } = boxToolit.convertToBoxIndex(rowIndex, colIndex)
      const box = boxToolit.getBoxCells(matrix, boxIndex);
      for (let i = 0; i < 9; i++) {
        if (row[i] === n || colnum[i] === n || box[i] === n) {
          return false;
        }
      }
      return true;
    }

  }
  /**
   * 宫坐标系工具
   */
export const boxToolit = {
  // todo
  getBoxCells(matrix, boxIndex) {
    const startRowIndex = Math.floor(boxIndex / 3) * 3;
    const startColIndex = boxIndex % 3 * 3;
    const result = [];
    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
      const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
      const colIndex = startColIndex + cellIndex % 3;
      result.push(matrix[rowIndex][colIndex])
    }
    return result;
  },
  convertToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    }
  },
  convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    }
  }
}