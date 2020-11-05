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

  toHTML() { // вывод верстки таблици
    return createTable(20, this.store.getState())
  }

  prepare() { // запускается в конструкторе родительского класса
    this.selection = new TableSelection() // объект реализует логику выделения ячейки/ячеек
  }

  init() {
    super.init()

    // ищет ячейку в DOM элементе excel__table, this.$root - объект класса Dom
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell) // делаем DOM ячейку выбранной, при открытии документа

    // this.selection.select($cell)
    // this.$emit('table:select', $cell) // событие выбор ячейки
    // this.selection - объект класса TableSelection

    this.$on('formula:input', text => { // добавить обработчик события, если в формуле input
      this.selection.current.text(text) //       // обновить данные в выделенной ячейке
      this.updateTextInStore(text) //            // обновление данных в state,
    }) //                                        // отобразить измененный компонент, в соответствии с измененным state

    this.$on('formula:done', () => { // добавить обработчик события,
      //                                      // при вводе в формуле Enter или Tab
      this.selection.current.focus()//        // смена фокуса из формулы на активную ячейку,
    })

    this.$on('toolbar: applyStyle', style => { // добавляет обработчик события,
      //                                                // изменение стиля в тулбаре, кнопками
      this.selection.applyStyle(style) //               // применить стиль из объекта style, к выделенным ячейкам
      // console.log('applyStyle', style)
    })
  }

  // выбор ячейки DOM
  selectCell($cell) {
    this.selection.select($cell) // делаем ячейку выбранной, $cell - объект класса Dom

    this.$emit('table:select', $cell) // вызов события, выбор ячейки, при выборе ячейки в таблице,
    //  дублировать значение, в формуле содержимое ячейки, в кнопках тулбара состояние стилей.

    const styles = $cell.getStyles(Object.keys(defaultStyles)) // считываем стили у выбранной ячейки, в объект
    // styles - объект со всеми стилями для выделенной ячейки, Object.keys(defaultStyles) - массив ключей(css свойств)
    // console.log(styles)

    // сработка события, изменение state
    this.$dispatch(actions.changeStyles(styles)) // передаем объект со стилями styles,
    //                                           // меняем свйство currentStyles в state(rootReducer)
    //                                           // для компонент подписанных на изменение state(subscribeComponents),
    //                                           // storeChanged() Отображаем в соответствии с новым state
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event) // обработка ресайза таблици
      this.$dispatch(actions.tableResize(data)) // когда ресайз закончен, сработка события, изменение state
      //                                        // передаем в ф-цию экшн креатер
      //                                        // меняем свйство 'colState' или 'rowState' в state(rootReducer)
      //                                        // для компонент подписанных на изменение state(subscribeComponents),
      //                                        // storeChanged() Отображаем в соответствии с новым state
      // console.log('Resize data: ', data)
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) { // если событие произошло на маркере ресайза, и у элемента есть дата атрибут data-resize
      this.resizeTable(event) // обработка ресайза таблици
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

  onKeydown(event) { // нажата одна из кнопок навигации по ячейкам таблици
    const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

    const {key} = event // кнопка по которой сработало событие

    if (keys.includes(key) && !event.shiftKey) { // если нажата кнопка, и при этом не была зажата shift
      event.preventDefault()

      const id = this.selection.current.id(true) // текущая ячейка (объект с координатами ячейки)
      const $next = this.$root.find(nextSelector(key, id)) // определяем ячейку, куда надо перейти

      this.selectCell($next) // устанавливаем ячейку как выбранную

      // $next элемент(ячейка) на которую осуществляется переход
      // nextSelector определяет ячейку для перемещения после нажатия
      // this.selection.select($next)
      // this.$emit('table:select', $next) // событие выбор ячейки
      // при нажатии кнопок навигации
    }
  }

  updateTextInStore(value) { // обновление данных в state
    this.$dispatch(actions.changeText({ // сработка события, изменение state,
      //                                     // меняет currentText и dataState в state(rootReducer)
      //                                     // для компонент подписанных на изменение state(subscribeComponents),
      //                                     // storeChanged() Отображаем в соответствии с новым state (данные в формуле)
      id: this.selection.current.id(), // получаем из выделенной ячейки, значение data-id, id() метод класса Dom
      value //                         // содержимое ячейки
    }))
  }

  onInput(event) { // добавить обработчик события, input в таблице
    // this.$emit('table:input', $(event.target)) // вызов обработки события
    this.updateTextInStore($(event.target).text()) // обновление данных в state
    //                                             // обновление данных в формуле
  }
}

