import styles from './carousel.css';
import { html, render } from 'lit-html';

class Carousel extends HTMLElement {
    logoPlaceholder = require('../../../../assets/images/logo-placeholder.svg');

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.shadowRoot)
            return;
        const shadow = this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        style.textContent = styles;

        const template = html`
        <section id="test" class="carousel-container">
            <ul class="logo-container">
                <li><img src="${this.logoPlaceholder}" /></li>
                <li><img src="${this.logoPlaceholder}" /></li>
                <li><img src="${this.logoPlaceholder}" /></li>
                <li><img src="${this.logoPlaceholder}" /></li>
                <li><img src="${this.logoPlaceholder}" /></li>
                <li><img src="${this.logoPlaceholder}" /></li>
                <li><img src="${this.logoPlaceholder}" /></li>
                <li><img src="${this.logoPlaceholder}" /></li>
                <li><img src="${this.logoPlaceholder}" /></li>
                <li><img src="${this.logoPlaceholder}" /></li>
            </ul>
        </section>
        `;

        shadow.appendChild(style);
        render(template, shadow);
        this.addAnimation(shadow.querySelector('.carousel-container'));
    }
    
    private addAnimation(carouselContainer: Element | null) {
        carouselContainer?.setAttribute('data-animated', 'true');

        const logoContainer = this.shadowRoot?.querySelector(`.logo-container`);
        const logos = Array.from(logoContainer!.children);

        logos.forEach(logo => {
            const logoDupe = logo.cloneNode(true) as Element;
            logoDupe.setAttribute('aria-hidden', 'true');
            logoContainer!.appendChild(logoDupe);
        });
    }
}
customElements.define('carousel-component', Carousel);