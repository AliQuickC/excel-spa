import {range} from '@core/utils'

export function shouldResize(event) {
  return event.target.dataset.resize // дата атрибут data-resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true) // объект с координатами ячейки, выбранной нажатием
  const current = $current.id(true) // объект с координатами ячейки, которая уже была выбрана

  const cols = range(current.col, target.col) // массив номеров, диапазон выбранных колонок
  const rows = range(current.row, target.row) // массив номеров, диапазон выбранных строк

  return rows.reduce((acc, row) => { // возвращает массив строк, список всех выбранных ячеек
    cols.forEach(col => acc.push(`${row}:${col}`))
    return acc
  }, [])
}
