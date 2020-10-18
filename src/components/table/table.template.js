const CODES = {
  A: 65,
  Z: 90
}

// ячейки таблици
function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

// ячейки первой строки таблици
function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `
}

// создание строки таблици
function createRow(index, content) {
  return `
    <div class="row">
      <div class="row-info">${index ? index : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1 // количество столбцов в таблице
  const rows = []

  // формируем ячейки для верхней строки, с буквами столбцов
  const cols =  new Array(colsCount)
    .fill('')   // массив пустых строк, для каждой ячейки
    .map( toChar)     // преобразование кодов символов в символы
    .map( toColumn)   // оборачиваем символы версткой
    .join('')         // склеиваем верстку всех ячеек в одну строку

  // создаем верхнюю строку, пустая ячейка + ячейки с буквами столбцов
  rows.push(createRow(null,cols))

  //  формируем ячейки для остальных строк
  for (let i= 0; i < rowsCount; i++ ) { // перебор строк
  const cells = new Array(colsCount) // для текущей сроки формируем массив ячеек
    .fill('') // массив пустых строк, для каждой ячейки, текущей стороки
    .map(toCell)  // для каждого элемента массива формируем верстку ячейки
    .join('')     // склеиваем верстку всех ячеек в одну строку

    // добавляем строку полученную на текущей итерации в массив
    rows.push(createRow(i+1, cells))
  }

  // вывод верстки всей таблици
  return rows.join('')
}