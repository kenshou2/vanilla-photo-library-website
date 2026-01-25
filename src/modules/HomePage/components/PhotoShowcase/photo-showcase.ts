import styles from './photo-showcase.css';
import { html, render } from 'lit-html';

export class PhotoShowcase extends HTMLElement {    
    constructor() {
        super();
    }

    connectedCallback() {
        if (this.shadowRoot)
            return;
        const shadow = this.attachShadow({mode: "open"});

        const style = document.createElement('style');
        style.textContent = styles;

        const template = html`        
        <section class="photo-showcase-container">
            <div class="showcase-grid-container">
                <div class="left-grid">
                    <div class="item-outline">
                        <div class="grid-item item-1"></div>
                    </div>
                    <div class="item-outline">
                        <div class="grid-item item-4"></div>
                    </div>
                </div>
                <div class="middle-grid">
                    <div class="item-outline initial">
                        <div class="grid-item item-2"></div>
                    </div>
                    <div class="item-outline">
                        <div class="grid-item item-5"></div>
                    </div>
                </div>
                <div class="right-grid">
                    <div class="item-outline">
                        <div class="grid-item item-3"></div>
                    </div>
                    <div class="item-outline">
                        <div class="grid-item item-6"></div>
                    </div>
                </div>
            </div>
        </section>
        `;

        shadow.appendChild(style);
        render(template, shadow);

        this.ctaOutline(shadow.querySelector('.item-outline.initial'));
    }

    private ctaOutline(element: HTMLElement | null) {
        this.shadowRoot?.querySelector(`.item-2`)!.addEventListener('mouseover', () => {
            element?.classList.add(`stop-animation`);
        });
        this.shadowRoot?.querySelectorAll(`.grid-item`).forEach(item => {
            item.addEventListener('mouseover', () => {
                element?.classList.remove(`initial`);
            });
        });
    }
}
customElements.define('photo-showcase-component', PhotoShowcase);