export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  // выделение DOM ячейки
  // $el - объект класса Dom
  select($el) {
    this.clear() // очистка выделения ячеек
    $el.focus().addClass(TableSelection.className) // фокус ввода на элемент, добавляем класс элементу
    this.group.push($el) // добавляем выделенный элемент, в массив выделенных ячеек
    this.current = $el // устанавливаем ячейку текущей
  }

  clear() { // очистка выделения ячеек
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  selectGroup($group = []) { // выделить группу ячеек
    this.clear()

    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  applyStyle(style) { // применяет стили из объекта style, для выделенных ячееек this.group
    this.group.forEach($el => $el.css(style))
  }
}
