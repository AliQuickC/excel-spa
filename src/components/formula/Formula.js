import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })

    // this.onInput = this.onInput.bind(this)
    // this.onClick = this.onClick.bind(this)
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
        `
  }

  init() {
    super.init()

    this.$formula = this.$root.find('#formula') // ищем элемент по id

    this.$on('table:select', $cell => { // добавить обработчик события
      this.$formula.text($cell.text())
      // console.log($cell.text())
    })

    // this.$on('table:input', $cell => { // добавить обработчик событий
    //   this.$formula.text($cell.text())
    // })

    // this.$subscribe(state => { // добавить обработчик события, изменение state, меняем данные в формуле
    //   // console.log('Formula update', state.currentText )
    //   this.$formula.text(state.currentText) // меняем данные в формуле
    // })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
    // console.log('changes', changes)
  }

  onInput(event) {
    // console.log(this.$root)
    // console.log(event.target.textContent)
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
