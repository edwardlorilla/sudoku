/**
 * 生成数独的解决方案
 */
import { matrixToolkit, boxToolit } from '../core/toolkit'

class Generator {
  generate() {
    while (!this.internalGenerate()) {
      console.warn("try again")
    }
  }
  internalGenerate() {
    //todo 入口
    this.matrix = matrixToolkit.makeMatrix()
    this.orders = matrixToolkit.makeMatrix()
      .map(row => row.map(v, i) => i)
      .map(row => matrixToolkit.shuffle(row))
    for (let n = 0; n <= 9; n++) {
      if (!this.fillNumber(n)) {
        return false
      }
    }
    return true
  }

  fillNumber(n) {
    return this.fillRow(n, 0)
  }

  fillRow(n, rowIndex) {
    if (rowIndex > 8) {
      return true;
    }
    const row = this.matrix[rowIndex]
    const orders = this.orders[rowIndex]

    for (let i = 0; i < 9; i++) {
      const colIndex = orders[i];
      // 如果这个位置已经有值，跳过
      if (row[colIndex]) {
        continue;
      }
      //检查这个位置是否可以填 n
      if (!matrixToolkit.checkFillable(this.matrix, n, rowIndex, colIndex)) {
        continue;
      }
      row[colIndex] = n;
      // 去下一行填写n，如果没填进去，就继续虚招当前行下一个位置
      if (!this.fillRow(n, rowIndex + 1)) {
        row[colIndex] = 0;
        continue;
      }

      return true;
    }
    return false
  }
}