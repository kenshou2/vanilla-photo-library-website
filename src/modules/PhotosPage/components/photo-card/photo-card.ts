import { html, render } from "lit-html";
import styles from './photo-card.css';

import { photoesObj } from "../../../../data/photo-images-object";

export class PhotoCard extends HTMLElement {
    image: any;
    tags: string[] = [];
    name: string = 'default';

    constructor() {
        super();        
    }

    connectedCallback() {
        if (this.shadowRoot)
            return;
        const shadow = this.attachShadow({mode: "closed"});

        const style = document.createElement('style');
        style.textContent = styles;

        const imgPath = this.getAttribute('image');
        if (imgPath !== null)
            this.image = photoesObj[imgPath];
        else
            this.image = require('../../../../assets/images/photos/default-image.png')
        const tagsAttr = this.getAttribute('tags');
        if (tagsAttr) {
            try {
                this.tags = tagsAttr.split(',');
            } catch (error) {
                console.error('Invalid JSON format for tags:', tagsAttr);
            }
        }
        const name = this.getAttribute('name');
        if (name)
            this.name = name;        

        const template = html`
        <div class="photo-card-container">
            <div class="photo-context">
                <img class="photo-image" src="${this.image}">
                <h6 class="photo-name">${this.name}</h6>
            </div>
            <div class="tags">
                ${this.tags.map(tag => html`<span class="tag">${tag}</span>`)}
            </div>
        </div>
        `;

        shadow.appendChild(style);
        render(template, shadow);
    }
}
customElements.define('photo-card-component', PhotoCard);