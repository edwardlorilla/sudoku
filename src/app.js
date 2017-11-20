import './css/main.less'
import $ from 'jquery'

import tookit from './js/toolkit'
// const tookit = require('./js/toolkit');
const matrix = tookit.makeMatrix();

console.log(matrix);
const a = Array.from({ length: 9 }, (v, i) => i)
console.log(a)
console.log(tookit.shuffle(a))

class Grid {
  constructor(container) {
    this._$container = container;
  }
  build() {
    const matrix = tookit.makeMatrix();
    const rowGroupClasses = ['row-g-top', 'row-g-middle', 'row-g-bottom'];
    const colGroupClasses = ['col-g-left', 'col-g-center', 'col-g-right'];
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
const grid = new Grid($('#container'));
grid.build();
grid.layout();