import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {isCell, matrix, nextSelector, shouldResize} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'

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
    this.selection = new TableSelection() // объект реализует логику выделения ячейки/ячеек
  }

  init() {
    super.init()

    // this.$root - объект типа Dom
    const $cell = this.$root.find('[data-id="0:0"]') // ищет ячейку в нативном элементе excel__table
    // this.selection - объект класса TableSelection

    this.selectCell($cell) // делаем ячейку выбранной
    //                     // при открытии документа
    // this.selection.select($cell)
    // this.$emit('table:select', $cell) // событие выбор ячейки

    this.$on('formula:input', text => { // добавить обработчик события, если в формуле input
      this.selection.current.text(text) //       // обновить данные в ячейке
      this.updateTextInStore(text) //            // обновление данных в state
    })

    this.$on('formula:done', () => { // добавить обработчик события, смена фокуса
      this.selection.current.focus()
    })

    this.$on('toolbar: applyStyle', style => { // добавляет обработчик события,
      //                                                // изменение стиля в тулбаре, кнопками
      this.selection.applyStyle(style)
      // console.log('applyStyle', style)
    })
  }

  // выбор ячейки
  selectCell($cell) {
    this.selection.select($cell) // делаем ячейку выбранной
    this.$emit('table:select', $cell) // вызов события, выбор ячейки
    // при открытии документа
    // this.$dispatch({type: 'TEST'})

    console.log($cell.getStyles(Object.keys(defaultStyles)))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event) // обработка ресайза таблици
      this.$dispatch(actions.tableResize(data)) // сработка события, изменение state
      //                                        // передаем в ф-цию экшн креатер
      // console.log('Resize data: ', data)
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

  updateTextInStore(value) { // обновление данных в state
    this.$dispatch(actions.changeText({ // сработка события, изменение state, меняет currentText и dataState
      //                                     // обработчик дублирует данные в формуле
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) { // добавить обработчик события, input в таблице
    // this.$emit('table:input', $(event.target)) // вызов обработки события
    this.updateTextInStore($(event.target).text()) // обновление данных в state
    //                                             // обновление данных в формуле
  }
}

