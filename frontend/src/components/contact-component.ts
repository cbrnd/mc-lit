import { html, render } from "lit-html"

const template = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <div class="w3-container w3-monospace">
        <h3>Contact Data</h3>
        <p>BeACook <br />
        Machlandstraße 48, Perg
        </p>
    </div>

`

class ContactComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        this.render()

    }
    private render() {
        render(template, this.shadowRoot)
    }
}

customElements.define("contact-component", ContactComponent)