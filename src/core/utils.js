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
  return new Array(end - start +1)
      .fill('')
      .map((_, index) => start + index)
}

export function storage(key, data = null) {
  if (!data) { // если нет данных
    return JSON.parse(localStorage.getItem(key)) // считываем значение 'excel-state'
  }
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
