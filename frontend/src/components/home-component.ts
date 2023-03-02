import { html, render } from "lit-html"
import './bonus/tooltip-component.ts';
import './bonus/gallery-component.ts'
import recipeService from "../recipe-service";

const template = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <div class="w3-container w3-monospace">
      <h2>BeACook - The modern CookBook</h2>
      <p>BeACook was originally a phyisical CookBook with a collection of recipies from a friends. It was a Birthday-Present for a beloved friend.</p>
      <a href="/recipies" class="w3-btn w3-black" data-navigo>Go to Recipie List</a>
        <tooltip-component>Go to Recipe List</tooltip-component>
    </div>
    <br><br>
    <div class="w3-container w3-monospace">
        <h3>First Look - Gallery</h3>
        <gallery-component>
            <img src="http://images.sweetauthoring.com/recipe/9161_2093.jpg">
            <img src="https://www.gusto.at/_storage/asset/8618486/storage/womanat:slideshow-large/file/128041073/63463849.jpg">
            <img src="https://garrysgrill.com/wp-content/uploads/2018/03/feature-cake-.png">
            <img src="https://www.bakels.com.au/wp-content/uploads/sites/21/2019/05/Premium-Light-Rye-Bread-1.jpg">
        </gallery-component>
        <tooltip-component>Klick for next Picture</tooltip-component>
    </div>
`

class HomeComponent extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        this.render()
        recipeService.fetchAll()


    }
    private render() {
        render(template, this.shadowRoot)
    }
}

customElements.define("home-component", HomeComponent)