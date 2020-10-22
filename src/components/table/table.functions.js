export function shouldResize(event) {
  return event.target.dataset.resize // дата атрибут data-resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}
