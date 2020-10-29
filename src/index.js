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

const store = createStore(rootReducer
    // , {colState: {}} // инициализация store
    // , storage('excel-state') // прочитать store из local storage
    , initialState
)

store.subscribe(state => {
  console.log('App State: ', state)
  // localStorage.setItem('excel-state', JSON.stringify(state))
  storage('excel-state', state) // записываем state в local store
})


// получает как свойство, элемент '#app' со страници, '#app' оборачивает в объект класса Dom
// получает список компонент - дочерних элементов
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

// вставляет DOM элемент Excel на страниуцу, в корневой элемент '#app',
// предварительно компонент Excel заполняется дочерними компонентами
// перебирает дочерние компоненты, для каждого делает инициализацию - назначение обработчиков событий
excel.render()
