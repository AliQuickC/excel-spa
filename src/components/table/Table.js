import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {isCell, matrix, nextSelector, shouldResize} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
// import * as actions from '@/redux/actions'
import {TABLE_RESIZE} from '@/redux/types'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) { // $root - объект типа Dom
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  prepare() { // запускается в конструкторе родительского класса
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    // this.$root - объект типа Dom
    const $cell = this.$root.find('[data-id="0:0"]') // ищет ячейку в нативном элементе excel__table
    // this.selection - объект класса TableSelection

    this.selectCell($cell)
    // this.selection.select($cell) // делаем ячейку выбранной
    // this.$emit('table:select', $cell) // событие выбор ячейки
    // // при открытии документа

    this.$on('formula:input', text => { // добавить обработчик событий
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => { // добавить обработчик событий
      this.selection.current.focus()
    })

    this.$subscribe(state => {
      console.log('TableState', state )
    })
  }

  // выбор ячейки
  selectCell($cell) {
    this.selection.select($cell) // делаем ячейку выбранной
    this.$emit('table:select', $cell) // событие выбор ячейки
    // при открытии документа
    // this.$dispatch({type: 'TEST'})
    // console.log('storeSub', this.storeSub)
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event) // обработка ресайза таблици
      // this.$dispatch(actions.tableResize(data)) // передаем в ф-цию экшн креатер
      this.$dispatch({type: TABLE_RESIZE, data}) // передаем в ф-цию экшн креатер
      console.log('Resize data: ', data)
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) { // если событие произошло на маркере ресайза,
      // на элементе с дата атрибутом data-resize
      this.resizeTable(event)
    } else if (isCell(event)) { // если событие произошло на ячейке
      const $target = $(event.target)

      if (event.shiftKey) { // событие на ячейке, с зажатым shift, групповое выделение ячеек
        const $cells = matrix($target, this.selection.current) // массив строк, список всех выбранных ячеек
            .map(id => this.$root.find(`[data-id="${id}"]`)) // массив элементов(ячеек) со страници,
        // которые были выделены
        this.selection.selectGroup($cells) // выделение гуппы ячеек
      } else {
        this.selectCell($target)
        // this.selection.select($target) // выделение одной ячейки
        // this.$emit('table:select', $target) // событие выбор ячейки !!!
        // при клике по ячейке
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) { // если нажата кнопка, и при этом не была зажата shift
      event.preventDefault()

      const id = this.selection.current.id(true) // текущая ячейка (объект с координатами ячейки)
      const $next = this.$root.find(nextSelector(key, id))

      this.selectCell($next)
      // $next элемент(ячейка) на которую осуществляется переход
      // nextSelector определяет ячейку для перемещения после нажатия
      // this.selection.select($next)
      // this.$emit('table:select', $next) // событие выбор ячейки
      // при нажатии кнопок навигации
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}

