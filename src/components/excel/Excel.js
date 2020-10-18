import {$} from "@core/dom";

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)  // находит элемент '#app' со страници, оборачивает в объект класса Dom
        this.components = options.components || []  // массив (строк) DOM элементов(компонентов),
                                                    // которые будут добавлены внутрь текущего элемента
        // после запуска getRoot() элементы массива превращаются в объекты
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        //  $root - объект класса Dom, является оберткой для DOM элемента с классом 'excel'

        this.components = this.components.map(Component => { // перебирает массив компонентов(массив классов, для создания элементов)
                            // вместо массива классов, создает массив объектов
            const $el = $.create('div', Component.className) // в $el - обертка класса Dom, с div внутри
                // заготовка для будующего элемента (компоненты)
                // с css классами Component.className, прописанными в классе DOM элемента (компоненты)
                // затем оборачивает DOM элемент в объект класса Dom
            const component = new Component($el)    // в component - создает объект на основе класса
            // передается объект $el класса Dom, с div внутри, конструктору элемента (компоненты)

            $el.html(component.toHTML())    // метод html класса Dom, внедряет в элемент div верстку элемента (компоненты),
                                            // верстку берет из метода toHTML, метод самого DOM элемента
            $root.append($el)   // помещаем компоненту $el (элемент, обернутый объектом класса Dom)
                                // в корневую компоненту $root (элемент, обернутый объектом класса Dom)
            return component    // в массив записывается объект
        })
        return $root // компонент Excel, обернутый в объект класса Dom
    }


    render() {
        // this.$el - '#app'
        this.$el.append(this.getRoot()) // вставляет DOM элемент Excel на страниуцу, в корневой элемент '#app',
                                        // меетодом append(объекта класса Dom)
                                        // предварительно компонент Excel заполняется дочерними компонентами
        this.components.forEach(component => component.init())  // перебор DOM элемнтов(компонентов),
                                                                // запуск инициализации для каждого
    }
}