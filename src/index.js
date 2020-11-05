import './scss/index.scss'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReduser'
import {storage} from '@core/utils'
import {initialState} from '@/redux/initialState'

// в store возвращается объект, содержит набор ф-ций, для работы с приватным свойством state, загрузка данных в state
const store = createStore(rootReducer
    , initialState // инициализация state, загрузка данных из local store,
) //               // если данных в local store нет, инициализируем его шаблонным объектом

store.subscribe(state => { // добавить обработчик события, изменение state, пишем данные в local storege
  // console.log('App State: ', state)
  storage('excel-state', state) // записываем state в local store
})


// получает как свойство, элемент id="app" со страници, '#app' оборачивает в объект класса Dom, сохраняет в this.$el
// получает список компонент - дочерних элементов
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

// вставляет DOM элемент Excel на страниуцу, в корневой элемент '#app',
// предварительно компонент Excel заполняется дочерними компонентами
// перебирает дочерние компоненты, для каждого делает инициализацию - назначение обработчиков событий
excel.render()
