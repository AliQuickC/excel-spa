import {$} from '@core/dom'
// import {ActiveRouter} from '@core/routes/ActiveRouter'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init() // инициализация адресной строки
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    // console.log(ActiveRouter.path)
    // console.log('param', ActiveRouter.param)

    // this.$placeholder.html('<h1>' + ActiveRouter.path + '</h1>')

    const Page = this.routes.excel // класс выводит верстку
    const page = new Page()
    this.$placeholder.append(page.getRoot()) // вставляем верстку в корневой элемент '#app'
    page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler
    )
  }
}

