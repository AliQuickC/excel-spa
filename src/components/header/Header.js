import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {defaultTitle} from '@/constants'
import {debounce} from '@core/utils'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 500) // блокируем вызов ф-ции, если появился новый вызов этой ф-ции
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle // клонируем объект state, берем его поле title
    return `
              <input type="text" class="input" value="${title}" />
      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
      `
  }

  onInput(event) {
    const $target = $(event.target)
    // console.log($target.text())
    this.$dispatch(changeTitle($target.text()))
  }
}
