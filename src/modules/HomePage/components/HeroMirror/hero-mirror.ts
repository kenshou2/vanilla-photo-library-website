import { html, render } from 'lit-html';
import styles from './hero-mirror.css';

import '../../../../components/ui/RoundButton/round-button';

export class HeroMirror extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.shadowRoot)
            return;
        const shadow = this.attachShadow({mode: "closed"});

        const style = document.createElement('style');
        style.textContent = styles;

        const template = html`
        <div class="hero-mirror-container">
            <div class="cta-message">
                <h1 class="heading">Ready to browse photos?</h1>
                <h3 class="sub-heading">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
                <div class="cta-buttons">
                    <a href="#/photos"><round-button-component text="See photos" font-size="21px" width="169px" height="65px" outline="true" color="var(--black-75)"></round-button-component></a>
                    <a href="#/about"><round-button-component text="About" font-size="21px" width="169px" height="65px" iridescent="true"></round-button-component></a>                
                </div>
            </div>
        </div>
        `;

        shadow.appendChild(style);
        render(template, shadow);
    }
}
customElements.define('hero-mirror-component', HeroMirror);