import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {isCell, matrix, shouldResize} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) { // $root - объект типа Dom
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    // this.$root - объект типа Dom
    const $cell = this.$root.find('[data-id="0:0"]') // ищет ячейку в нативном элементе excel__table
    // this.selection - объект класса TableSelection
    this.selection.select($cell) // делаем ячейку выбранной
  }

  onMousedown(event) {
    if (shouldResize(event)) { // если событие произошло на маркере ресайза,
      // на элементе с дата атрибутом data-resize
      resizeHandler(this.$root, event) // обработка ресайза таблици
    } else if (isCell(event)) { // если событие произошло на ячейке
      const $target = $(event.target)

      if (event.shiftKey) { // событие на ячейке, с зажатым shift, групповое выделение ячеек
        const $cells = matrix($target, this.selection.current) // массив строк, список всех выбранных ячеек
            .map(id => this.$root.find(`[data-id="${id}"]`)) // массив элементов(ячеек) со страници,
        // которые были выделены
        this.selection.selectGroup($cells) // выделение гуппы ячеек
      } else {
        this.selection.select($target) // выделение одной ячейки
      }
    }
  }
}


