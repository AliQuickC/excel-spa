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

  text(text) { // заполняет содержимое элемента текстом
    if (typeof text === 'string') { // если в элемент введен текст
      this.$el.textContent = text //  меняем свойство textContent (текстовое содержимое элемента)
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') { // если элемент типа input
      return this.$el.value.trim() //                // меняем свойство value
    }
    return this.$el.textContent.trim()
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

  find(selector) { // находит элемент по указанному селектору
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

  getStyles(styles = []) { // считывает css стили DOM элемента, сохраняем в объект
    // для каждого свойства(элемента массива), считывает css значение
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s] // формируем объект со стилями
      return res
    }, {})
  }

  id(parse) {
    if (parse) { // если true
      const parsed = this.id().split(':')
      return { // объект с координатами ячейки
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    // data - геттер
    return this.data.id // дата атрибуту id
  }

  focus() { // фокус на элемент при выделении
    this.$el.focus() // фокус ввода на элемент
    return this
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
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
