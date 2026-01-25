import { html, render } from 'lit-html';
import styles from './testimonial-card-component.css';

export class TestimonialCard extends HTMLElement {    

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
        <div class="testimonial-container">
            <div class="user-info">
                <div class="user-icon"></div>
                <div class="text-description">
                    <h6 class="user-name">User name</h6>
                    <div class="user-description">Details</div>
                </div>
            </div>
            <p class="testimonial-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </p>
        </div>
        `;

        shadow.appendChild(style);
        render(template, shadow);
    }
}
customElements.define('testimonial-card-component', TestimonialCard);