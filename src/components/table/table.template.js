import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

// ячейки таблици
function toCell(state, row) {
  // row попадает в замыкание
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col) // ширина столбца + px
    const data = state.dataState[id] // содержимое ячейки
    // const styles = toInlineStyles(defaultStyles) // строка со всеми стилями ячейки
    const styles = toInlineStyles({ // строка со всеми стилями ячейки
      ...defaultStyles, // объект с дефолтными стилями,
      ...state.stylesState[id]}) // объект со стилями, для которых есть значеня в state
    return `
      <div 
        class="cell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-id= "${id}"        
        style="${styles}; width: ${width}"
      >${data || ''}</div>
    `
  }
}

// ячейки первой строки таблици
function toColumn({col, index, width}) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
        ${col}
        <div class="col-resize" data-resize="col"></div> <!--маркер для изсменения размера столбцов-->
    </div>
  `
}

// создание строки таблици
function createRow(index, content, state) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, index)
  return `
    <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
      <div class="row-info"> <!--вертикальные ячейки с номерами строк-->
        ${index ? index : ''}
        ${resizer} <!-- маркер для изсменения размера строк-->
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function widthWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index) // высчитывает значение ширины колонки
    }
  }
}

export function createTable(rowsCount = 15, state= {}) { // вывод верстки таблици
  // console.log(state)
  const colsCount = CODES.Z - CODES.A + 1 // количество столбцов в таблице
  const rows = []

  // формируем ячейки для верхней строки, с буквами столбцов
  const cols = new Array(colsCount)
      .fill('') // массив пустых строк, для каждой ячейки
      .map(toChar) // преобразование кодов символов в символы, заполнение массива символами
      .map(widthWidthFrom(state)) // в map подставляется сформированая  ф-ция
      // после ф-ция, формирует объект(массив объектов) с параметрами, для отрисовки колонки
      .map(toColumn) // для каждого элемента массива(заголовка столбца) формируем верстку ячейки

  // .map((col, index) => {
  //   const width = getWidth(state.colState, index)
  //   return toColumn(col, index, width)
  // }) // оборачиваем символы версткой

      .join('') // склеиваем верстку всех ячеек в одну строку

  // создаем верхнюю строку, пустая ячейка + ячейки с буквами столбцов
  rows.push(createRow(null, cols, {}))

  //  формируем ячейки для остальных строк
  for (let row = 0; row < rowsCount; row++) { // перебор строк
    const cells = new Array(colsCount) // для текущей сроки формируем массив ячеек
        .fill('') // массив пустых строк, для каждой ячейки, текущей стороки
        .map(toCell(state, row)) // для каждого элемента массива(ячейки) формируем верстку ячейки
        .join('') // склеиваем верстку всех ячеек в одну строку

    // добавляем строку полученную на текущей итерации в массив
    rows.push(createRow(row + 1, cells, state.rowState))
  }

  // вывод верстки всей таблици
  return rows.join('')
}
