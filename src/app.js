import './css/main.less'
import $ from 'jquery'

import Grid from './js/ui/grid'

const grid = new Grid($('#container'));
grid.build();
grid.layout();