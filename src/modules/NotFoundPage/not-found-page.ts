import { html, render } from "lit-html";

export class NotFound extends HTMLElement {
    constructor() {
        super();        
    }

    connectedCallback() {
        if (this.shadowRoot)
            return;
        const shadow = this.attachShadow({mode: "closed"});        

        const template = html`
        <h1>404 - Page Not Found</h1>
        `;

        render(template, shadow);
    }
}
customElements.define('not-found-page-component', NotFound);