import styles from './round-button.css';
import { html, render } from 'lit-html';

export class RoundButton extends HTMLElement {
    text = '';
    width = '';
    height = '';
    fontSize = '';
    outline = true;
    color = '';
    iridescent = false;

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.shadowRoot)
            return;
        const shadow = this.attachShadow({mode: 'closed'});

        this.text = this.getAttribute('text') ?? 'Button';
        this.width = this.getAttribute('width') ?? '206px';
        this.height = this.getAttribute('height') ?? '84px';
        this.fontSize = this.getAttribute('font-size') ?? '26px';
        this.color = this.getAttribute('color') ?? 'var(--black-5)';
        if (this.getAttribute('outline') === 'true')
            this.outline = true;
        else
            this.outline = false;
        if (this.getAttribute('iridescent') === 'true')
            this.iridescent = true;
        else
            this.iridescent = false;

        const style = document.createElement('style');
        style.textContent = styles;

        const template = html`
        <button class="round-button ${this.outline === true ? 'outline' : ''} ${this.iridescent === true ? 'iridescent' : ''}" type="button"
            style="
            width: ${this.width};
            height: ${this.height};
            font-size: ${this.fontSize};
            color: ${this.color}";
        >${this.text}</button>
        `;

        shadow.appendChild(style);
        render(template, shadow);
    }
}
customElements.define('round-button-component', RoundButton);