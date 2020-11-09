import {storage} from '@core/utils';

function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  return `
    <li class="db__record">
      <a href="#excel/${id}">${model.title}   (${id})</a>
      <strong>12.06.2020</strong>
    </li>
  `
}

// спиок ключей всех созданных таблиц
// excel:12346
function getAllKeys() {
  const keys = []
  for (let i = 0; i<localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) { // если в имени ключа отсутствует 'excel', переходим к следующей итерации
      continue
    }
    // console.log(key)
    keys.push(key)
  }
  return keys
}

// возвращает верстку со списком документов
export function createRecordsTable() {
  const keys = getAllKeys()
  // console.log('keys', keys)

  if (!keys.length) { // если массив со списком сохраненных документов пуст
    return `<p>Ни одной таблици не создано</p>`
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
        ${keys.map(toHTML).join('')}
    </ul>
  `
}

