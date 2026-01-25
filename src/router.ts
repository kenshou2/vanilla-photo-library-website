import { html, render } from "lit-html";

import './modules/HomePage/home-page';
import './modules/PhotosPage/photos-page';
import './modules/AboutPage/about-page';
import './modules/PhotoDetailsPage/photo-details';
import './modules/FormPage/form-page';
import './modules/NotFoundPage/not-found-page';

export class Router extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.shadowRoot) return;

        const shadow = this.attachShadow({ mode: "closed" });

        this.renderRoute(shadow);

        window.addEventListener('hashchange', () => this.renderRoute(shadow));
    }

    private renderRoute(shadow: ShadowRoot) {
        const hash = location.hash.replace('#', '') || '/';
        const [path] = hash.split('?');

        let template;
        switch (path) {
            case "/":
                template = html`<home-page-component></home-page-component>`;
                break;
            case "/photos":
                template = html`<photos-page-component></photos-page-component>`;
                break;
            case "/photo-details":
                template = html`<photo-details-page-component></photo-details-page-component>`;
                break;
            case "/about":
                template = html`<about-page-component></about-page-component>`;
                break;
            case "/form":
                template = html`<form-page-component></form-page-component>`;
                break;
            default:
                template = html`<not-found-page-component></not-found-page-component>`;
        }

        render(template, shadow);
    }

}
customElements.define('router-component', Router);
