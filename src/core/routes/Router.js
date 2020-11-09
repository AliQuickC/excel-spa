import {$} from '@core/dom'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes

    this.page = null

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init() // инициализация адресной строки
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear() // очистка содержимого

    const Page = ActiveRoute.path.includes('excel') ? // определяем какую страницу грузить
      this.routes.excel :
      this.routes.dashboard

    // const Page = this.routes.excel // класс выводит верстку
    // const Page = this.routes.dashboard // класс выводит верстку

    this.page = new Page(ActiveRoute.param) // создание страници,
    //                             // param - параметром передаются данные из адресной строки

    this.$placeholder.append(this.page.getRoot()) // вставляем верстку в корневой элемент '#app'

    this.page.afterRender() // отрисовка вставленного содержимого
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler
    )
  }
}

