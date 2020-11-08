function toButton(button) {
  // console.log(json)
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}' // записываем css свойство, за которое отвечает кнопка, в data атрибут
    `
  return `
      <div class="button ${button.active ? 'active' : ''}"
      ${meta}
      >
        <i class="material-icons"
            ${meta}
            >${button.icon}</i>
      </div>
  `
}

export function createToolbar(s) { // вывод верстки тулбара с кнопками
  // console.log('render')
  const buttons = [
    {
      icon: 'format_align_left', //      // значение тега, задает символ иконочного шрифта
      active: s['textAlign'] === 'left', // переключение активности кнопки, активна/неактивна
      value: {textAlign: 'left'} //      // css свойство, записывается в data атрибут кнопки
    },
    {
      icon: 'format_align_center',
      active: s['textAlign'] === 'center',
      value: {textAlign: 'center'}
    },
    {
      icon: 'format_align_right',
      active: s['textAlign'] === 'right',
      value: {textAlign: 'right'}
    },
    {
      icon: 'format_bold',
      active: s['fontWeight'] === 'bold',
      value: {fontWeight: s['fontWeight'] === 'bold' ? 'normal' : 'bold'}
    },
    {
      icon: 'format_italic',
      active: s['fontStyle'] === 'italic',
      value: {fontStyle: s['fontStyle'] === 'italic' ? 'normal' : 'italic'}
    },
    {
      icon: 'format_underlined',
      active: s['textDecoration'] === 'underline',
      value: {textDecoration: s['textDecoration'] === 'underline' ? 'none' : 'underline'}

    }
  ]

  return buttons.map(toButton).join('')
}
