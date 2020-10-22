import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target) // элемент, на котором произошло событие
  // const $parent = $resizer.$el.parentNode // bad!
  // const $parent = $resizer.$el.closest('.column') // better but bad
  const $parent = $resizer.closest('[data-type="resizable"]') // получаем родительский элемент
  const coords = $parent.getCoords() // получаем объект с данными о местоположении элемента
  const type = $resizer.data.resize // тип родительского элемента, строка или колонка
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value
  // получаем значение из дата атрибута data-resize

  $resizer.css({
    opacity: 1,
    // zIndex: 10,
    [sideProp]: '-5000px'
  })

  document.onmousemove = e => {
    if (type === 'col') { // если тянем колонку
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({right: -delta + 'px'})
    } else { // если тянем строку
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') { // если тянем колонку
      $parent.css({width: value + 'px'})
      $root.findAll(`[data-col="${$parent.data.col}"]`)
      // находим на странице все ячейки, где дата атрибут равет номеру меняемой строки
          .forEach(el => el.style.width = value + 'px') // меняем размер всех ячеек в колонке
    } else { // если тянем строку
      $parent.css({height: value + 'px'})
    }
    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}
