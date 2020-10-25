import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
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

    this.$on('table:select', $cell => { // добавить обработчик событий
      this.$formula.text($cell.text())
      // console.log($cell.text())
    })

    this.$on('table:input', $cell => { // добавить обработчик событий
      this.$formula.text($cell.text())
    })
  }

  // eslint-disable-next-line require-jsdoc
  onInput(event) {
    // console.log(this.$root)
    // console.log(event.target.textContent)
    this.$emit('formula:input', $(event.target).text()) // вызов события
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
