export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
  }

  // выделение ячейки
  // $el - объект класса Dom
  select($el) {
    this.clear()
    this.group.push($el)
    $el.addClass(TableSelection.className)
  }

  clear() { // очистка выделения ячеек
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  selectGroup() {
  }
}
