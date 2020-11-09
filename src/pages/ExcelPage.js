import {Page} from '@core/Page'
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReduser';
import {initialState} from '@/redux/initialState';
import {debounce, storage} from '@core/utils';
import {Excel} from '@/components/excel/Excel';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Header} from '@/components/header/Header';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';


export class ExcelPage extends Page {
  getRoot() {
    // в store возвращается объект, содержит набор ф-ций, для работы с приватным свойством state, загрузка данных в state
    const store = createStore(rootReducer
        , initialState // инициализация state, загрузка данных из local store,
    ) //               // если данных в local store нет, инициализируем его шаблонным объектом


    const stateListenes = debounce(state => { // блокируем вызов ф-ции, если появился новый вызов этой ф-ции
    //                                        // console.log('App State: ', state)
      storage('excel-state', state) // записываем state в local store
    }, 500)

    store.subscribe(stateListenes) // добавить обработчик события, изменение state, пишем данные в local storege


    // получает как свойство, элемент id="app" со страници, '#app' оборачивает в объект класса Dom, сохраняет в this.$el
    // получает список компонент - дочерних элементов
    this.excel = new Excel( {
      components: [Header, Toolbar, Formula, Table],
      store
    });

    // вставляет DOM элемент Excel на страниуцу, в корневой элемент '#app',
    // предварительно компонент Excel заполняется дочерними компонентами
    // перебирает дочерние компоненты, для каждого делает инициализацию - назначение обработчиков событий
    // excel.render()

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
