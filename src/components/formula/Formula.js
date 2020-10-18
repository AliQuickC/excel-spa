import {ExcelComponent} from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        })

      // this.onInput = this.onInput.bind(this)
      // this.onClick = this.onClick.bind(this)
    }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
        `
  }

  onInput(event) {
    // console.log(this.$root)
    // console.log(event.target.textContent)
  }

  onClick() {
    // console.log('click')
  }
}