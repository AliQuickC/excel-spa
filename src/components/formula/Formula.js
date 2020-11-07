import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'], // подписка на изменение state
      ...options
    })

    // this.onInput = this.onInput.bind(this)
    // this.onClick = this.onClick.bind(this)
  }

  toHTML() { // вывод верстки поля формулы
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
        `
  }

  init() {
    super.init()

    this.$formula = this.$root.find('#formula') // ищем элемент по id

    this.$on('table:select', $cell => { // добавить обработчик события
      this.$formula.text($cell.text()) // при выборе ячейки в таблице, дублировать значение в формуле
    })
  }

  storeChanged({currentText}) { //  // сработка события изменение state
    this.$formula.text(currentText) // дублимруем содержимое выделенной ячейки в формуле
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text()) // вызов события, при вводе в формулу,
    //                                                        // дублирует данные в ячейку таблици, обновляет state
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done') // вызов события
    }
  }
}
