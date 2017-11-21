/**
 * 生成九宫格
 */
import { matrixToolkit, boxToolit } from '../core/toolkit'
import $ from 'jquery'
export default class Grid {
  constructor(container) {
    this._$container = container;
  }
  build() {
    const matrix = matrixToolkit.makeMatrix();
    const rowGroupClasses = ['row-g-top', 'row-g-middle', 'row-g-bottom'];
    const colGroupClasses = ['col-g-left', 'col-g-center', 'col-g-right'];
    console.log(matrix)
    const $cells = matrix.map(rowValues => rowValues.map((cellValues, colIndex) => {
      return $("<span>")
        .addClass(colGroupClasses[colIndex % 3])
        .text(cellValues);
    }));
    const $divArray = $cells.map(($spanArray, rowIndex) => {
      return $('<div>')
        .addClass('row')
        .addClass(rowGroupClasses[rowIndex % 3])
        .append($spanArray);
    })
    this._$container.append($divArray);
  }
  layout() {
    const width = $('span:first', this._$container).width();
    $('span', this._$container)
      .height(width)
      .css({
        'line-height': `${width}px`,
        'font-size': width < 32 ? `${width / 2}px` : ''
      })
  }
}