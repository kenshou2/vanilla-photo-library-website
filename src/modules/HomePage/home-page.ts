import { html, render } from "lit-html";

import './components/Hero/hero';
import './components/Carousel/carousel';
import './components/PhotoShowcase/photo-showcase';
import './components/About/about';
import './components/PhotographyStages/photography-stages';
import './components/Testimonials/testimonials';
import './components/HeroMirror/hero-mirror';

export class HomePage extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.shadowRoot)
            return;
        const shadow = this.attachShadow({mode: "closed"});

        const template = html`
        <hero-component></hero-component>
        <carousel-component></carousel-component>
        <photo-showcase-component></photo-showcase-component>
        <about-component></about-component>
        <photography-stages-component></photography-stages-component>
        <testimonials-component></testimonials-component>
        <hero-mirror-component></hero-mirror-component>
        `;

        render(template, shadow);
    }
}
customElements.define('home-page-component', HomePage);