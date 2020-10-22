// объект обертка для нативного DOM элемента
class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector
  }

  // вставляет html в корень DOM элемента, который обернут объектом класса Dom
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  // очищает содержимое DOM элемента
  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) { // добавляет обрвботчик callback, для события eventType, DOM элементу, внутри объекта Dom
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) { // удаляет обрвботчик callback, для события eventType, DOM элемента, внутри объекта Dom
    this.$el.removeEventListener(eventType, callback)
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  append(node) {
    if (node instanceof Dom) { // если node является инстанцом класса Dom,
      node = node.$el // node присваиваем Dom элемент,
    } // иначе предполагается что node это нативный элемент

    if (Element.prototype.append) { // полифил, помещает DOM элемент в документ
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  get data() { // доступ к дата атрибутам
    return this.$el.dataset
  }

  closest(selector) { // возвращает родительский элемент
    return $(this.$el.closest(selector))
  }

  getCoords() { // возвращает объект с данными о местоположении элемента и т.д.
    return this.$el.getBoundingClientRect()
  }

  findAll(selector) { // ищет ячейки по селектору
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) { // преобразует стили из объекта в css свойство
    Object
        .keys(styles)
        .forEach(key => {this.$el.style[key] = styles[key]
        })
  }

  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }
}

// оборачивает DOM элемент в объект
export function $(selector) {
  return new Dom(selector)
}

// создает DOM элемент с тегом tagName и классами classes,
// затем оборачивает DOM элемент в объект
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
