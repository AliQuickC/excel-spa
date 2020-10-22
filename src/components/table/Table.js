import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {isCell, shouldResize} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
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
    } else if (isCell(event)) {
      const $target = $(event.target)
      // this.selection - объект класса TableSelection
      this.selection.select($target)
    }
  }
}
