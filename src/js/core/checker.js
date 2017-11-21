/**
 *  检查数据的解决方案
 */
function checkArray(array) {
  const length = array.length;
  const marks = new Array(length);
  marks.fill(true);

  for (let i = 0; i < length - 1; i++) {
    if (!marks[i]) {
      continue
    }
    const v = array[i];
    // 是否有效 0 - 无效 1-9 有效
    if (!v) {
      marks[i] = false;
      continue;
    }
    //是否重复 i + 1 ~ 9是否和i位置的数据重复
    for (let j = i + 1; j < length; j++) {
      if (v === array[j]) {
        marks[i] = marks[j] = false
      }
    }
  }
  return marks
}

// console.log(checkArray([1, 2, 3, 4, 5, 6, 7, 8, 9]))//[true, true, true, true, true, true, true, true, true]
// console.log(checkArray([1, 0, 3, 4, 0, 6, 7, 8, 9]))//[true, false, true, true, false, true, true, true, true]
// console.log(checkArray([1, 2, 3, 4, 0, 6, 7, 2, 9]))// [true, false, true, true, false, true, true, false, true]


/**
 * 输入：matrix,用户完成的数独数据，9 x 9
 * 处理：对 matrix 行列宫 进行检查，并填写marks
 * 输出：检查是否成功、marks
 */
import { matrixToolkit, boxToolit } from '../core/toolkit'

class Checker {
  constructor(matrix) {
    this._matrix = matrix;
    this._matrixMarks = matrixToolkit.makeMatrix(ttrue);

  }
  get matrixMarks() {
    return this._matrixMarks
  }
  get isSuccess() {
    return this._success
  }
  check() {
    this.checkRows()
    this.checkCols()
    this.checkBoxes()

    // 检查是否成功
    this._success = this._matrixMarks.every(row => row.every(mark => mark))
    return this._success
  }

  checkRows() {
    for (rowIndex = 0; rowIndex < 9; rowIndex++) {
      const row = this._matrix[rowIndex];
      const marks = checkArray(row)

      for (colIndex = 0; colIndex < marks.length; colIndex++) {
        if (!marks[colIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  checkCols() {
    for (colIndex = 0; colIndex < 9; colIndex++) {
      const cols = [];
      for (rowIndex = 0; rowIndex < 9; rowIndex++) {
        cols[rowIndex] = this._matrix[rowIndex][colIndex]
      }

      const marks = checkArray(cols);
      for (rowIndex = 0; rowIndex < marks.length; rowIndex++) {
        if (!marks[rowIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  checkBoxes() {
    for (boxIndex = 0; boxIndex < 9; boxIndex++) {
      const boxes = boxToolit.getBoxCells(boxIndex);
      const marks = checkArray(boxes)
      for (cellIndex = 0; cellIndex < 9; cellIndex++) {
        if (!marks[cellIndex]) {
          const { rowIndex, colIndex } = boxToolit.convertFromBoxIndex(boxIndex, cellIndex);
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }


}