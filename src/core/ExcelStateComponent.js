import {ExcelComponent} from '@core/ExcelComponent'

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args)
  }

  get template() { // формирует HTML код для вывода
    return JSON.stringify(this.state, null, 2)
  }

  initState(initialState = {}) { // инициализируем локальный state
    this.state = {...initialState}
  }

  setState(newState) {
    this.state = {...this.state, ...newState}
    this.$root.html(this.template)
  }
}
