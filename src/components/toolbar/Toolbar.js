import {createToolbar} from '@/components/toolbar/toolbar.template'
import {$} from '@core/dom'
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyle'], // подписка на изменение state
      ...options
    })
  }

  prepare() {
    this.initState(defaultStyles) // инициализируем локальный state
  }

  get template() { // формирует HTML код для вывода
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  // storeChanged(changes) {
  //   this.setState(changes.currentStyles)
  //   // console.log(changes)
  // }

  onClick(event) {
    const $target = $(event.target)
    // $target.addClass('active')
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value) // считываем из data атрибута объект с css свойствами
      this.$emit('toolbar: applyStyle', value) // сработка события, изменить стиль

      // const key = Object.keys(value)[0] // считываем у свойства с индексом 0, название ключа(имя css свойства)
      // this.setState({[key]: value[key]}) // меняем state, записываем в объект ключ и значение(css свойство и значение)
      console.log(this.state)
    }
  }
}

