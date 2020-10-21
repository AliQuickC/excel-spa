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
