import {$} from '@core/dom';

export function resizeHandler($root, event) { // обработка ресайза, после события onMousedown
  return new Promise(resolve => {
    const $resizer = $(event.target) // элемент(маркер), на котором произошло событие
    // const $parent = $resizer.$el.parentNode // bad!
    // const $parent = $resizer.$el.closest('.column') // better but bad
    const $parent = $resizer.closest('[data-type="resizable"]') // получаем родительский элемент
    const coords = $parent.getCoords() // получаем объект с данными, о текущем местоположении элемента(столбца/строки),
    //                                 // размер которого меняем
    const type = $resizer.data.resize // тип родительского элемента, data-resize="row" или data-resize="col"
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({ // задаем свойства маркеру, при его активации
      opacity: 1,
      // zIndex: 10,
      [sideProp]: '-5000px' // макс значение 'bottom' или 'right' (солонки/строки)
    })

    document.onmousemove = e => { // двигаем маркер, для изменения размера столбца/строки
      if (type === 'col') { //               // если тянем колонку
        const delta = e.pageX - coords.right // delta величина на которую нужно изменить ширину колонки
        //                                   //e.pageX горизонтальная координата, относительно всего документа
        value = coords.width + delta //      // новое значение ширины колонки
        $resizer.css({right: -delta + 'px'}) // новая ширина в css
      } else { // если тянем строку
        const delta = e.pageY - coords.bottom // delta величина на которую нужно изменить ширину строки
        //                                    //e.pageY вертикальная координата, относительно всего документа
        value = coords.height + delta //      // новое значение ширины строки
        $resizer.css({bottom: -delta + 'px'}) // новое положение для маркера, в css
      }
    }

    document.onmouseup = () => { // фиксируем новый размер столбца/строки
      document.onmousemove = null // удаляет обработку события
      document.onmouseup = null // удаляет обработку события
      if (type === 'col') { // если тянем колонку
        $parent.css({width: value + 'px'}) // новая ширина колонки, по завершению ресайза
        $root.findAll(`[data-col="${$parent.data.col}"]`) // находим на странице все ячейки колонки,
        //                                                       // где дата атрибут равен номеру меняемой колонки
            .forEach(el => el.style.width = value + 'px') // меняем ширину всех ячеек в колонке, по завершению ресайза
      } else { // если тянем строку
        $parent.css({height: value + 'px'}) // меняем ширина строки, по завершению ресайза
      }

      resolve({ // передаем объект по цепочке promise
        value, // размер изменяемой ячейки
        type, // тип родительского элемента, строка/колонка
        // id: type === 'col' ? $parent.data.col : null // считываем номер ячейки из дата атрибута
        id: $parent.data[type] // data-col или data-row
      })

      $resizer.css({ // для маркера, устанавливаем начальное положение
        opacity: 0,
        bottom: 0,
        right: 0
      })
    }
  })
}
