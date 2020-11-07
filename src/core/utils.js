// формирует имя события, делает верхний регистр для первой буквы

export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}

export function storage(key, data = null) {
  if (!data) { //                                // если параметр data не указан
    return JSON.parse(localStorage.getItem(key)) // считываем значение 'excel-state'
  } //                                            // иначе если data есть
  localStorage.setItem(key, JSON.stringify(data)) // записываем data в local store
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b) // преобразуем объект к строке
  }
  return a === b
}

export function camelToDasheCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

// преобразует написание ключей объекта, из всех объектов(css свойств), формирует одну строку
export function toInlineStyles(styles = {}) {
  return Object.keys(styles) // список всех стилей какие есть, преобразуем в массив
      .map(key => `${camelToDasheCase(key)}: ${styles[key]}`) // camelToDasheCase - меняет стиль написания ключей объекта
      //         // формируем массив строк, из "css свойство" : "значение"
      .join(';') // собираем массив в одну строку
}

export function debounce(fn, wait) { //  вызов fn не более одного раза в wait
  // блокирует вызов ф-ции fn, если появился новый вызов fn
  let timeout // в замыкании
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args)
      // fn(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

