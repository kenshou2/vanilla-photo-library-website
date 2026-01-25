import { render, html } from 'lit-html';
import styles from './modules/styles/global.css';

import './components/shared/Navbar/navbar';
import './router';
import './components/shared/Footer/footer';
import { Router } from './router';

class App extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const style = document.createElement('style');
        style.textContent = styles;

        const template = html`
            <header><navbar-component></navbar-component></header>
            <main>
                <router-component></router-component>
            </main>
            <footer><footer-component></footer-component></footer>
        `;

        document.head.appendChild(style);
        render(template, this);
    }

    navigate(path: string) {
        history.pushState(null, '', path);
        const router = document.querySelector('router-component') as Router;
        router.connectedCallback();
    }
}
customElements.define('app-component', App);