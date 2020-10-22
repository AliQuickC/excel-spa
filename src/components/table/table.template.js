const CODES = {
  A: 65,
  Z: 90
}

// ячейки таблици
function toCell(row) {
  // row попадает в замыкание
  return function(_, col) {
    return `
      <div 
        class="cell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}" 
      ></div>
    `
  }
}

// ячейки первой строки таблици
function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div> <!--маркер для изсменения размера столбцов-->
    </div>
  `
}

// создание строки таблици
function createRow(index, content) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1 // количество столбцов в таблице
  const rows = []

  // формируем ячейки для верхней строки, с буквами столбцов
  const cols = new Array(colsCount)
      .fill('') // массив пустых строк, для каждой ячейки
      .map(toChar) // преобразование кодов символов в символы
      .map(toColumn) // оборачиваем символы версткой
      .join('') // склеиваем верстку всех ячеек в одну строку

  // создаем верхнюю строку, пустая ячейка + ячейки с буквами столбцов
  rows.push(createRow(null, cols))

  //  формируем ячейки для остальных строк
  for (let row = 0; row < rowsCount; row++) { // перебор строк
    const cells = new Array(colsCount) // для текущей сроки формируем массив ячеек
        .fill('') // массив пустых строк, для каждой ячейки, текущей стороки
        .map(toCell(row)) // для каждого элемента массива формируем верстку ячейки
        .join('') // склеиваем верстку всех ячеек в одну строку

    // добавляем строку полученную на текущей итерации в массив
    rows.push(createRow(row + 1, cells))
  }

  // вывод верстки всей таблици
  return rows.join('')
}
