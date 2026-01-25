import { html, render } from 'lit-html';
import styles from './about.css';

export class About extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.shadowRoot)
            return;
        const shadow = this.attachShadow({mode: 'closed'});

        const style = document.createElement('style');
        style.textContent = styles;

        const template = html`
        <div class="about-container">
            <div class="about-content">
                <div class="about-text">
                    <h1 class="header">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h1>
                    <p class="sub-header">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                </div>
                <div class="about-profile">
                    <a href="#/about"><round-button-component class="learn-more-cta" text="Learn more" width="188px" height="77px" font-size="26px" iridescent="true"></a>
                </div>                
            </div>
        </div>
        `;

        shadow.appendChild(style);
        render(template, shadow);
    }
}
customElements.define('about-component', About);