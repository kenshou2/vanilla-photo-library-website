import { html, render } from 'lit-html';
import styles from './testimonials.css';

import './components/testimonial-card/testimonial-card-component';

export class Testimonials extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.shadowRoot)
            return;
        const shadow = this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        style.textContent = styles;

        const temaplate = html`
        <div class="testimonials-container">
            <h1 class="heading">User reviews</h1>
            <div class="testimonials">
                <!-- <div class="shadow"></div> -->
                <div class="column">
                    <testimonial-card-component class="testimonial-card"></testimonial-card-component>
                    <testimonial-card-component class="testimonial-card"></testimonial-card-component>
                    <testimonial-card-component class="testimonial-card"></testimonial-card-component>
                </div>
                <div class="column">
                    <testimonial-card-component class="testimonial-card"></testimonial-card-component>
                    <testimonial-card-component class="testimonial-card"></testimonial-card-component>
                    <testimonial-card-component class="testimonial-card"></testimonial-card-component>
                </div>
                <div class="column">
                    <testimonial-card-component class="testimonial-card"></testimonial-card-component>
                    <testimonial-card-component class="testimonial-card"></testimonial-card-component>
                    <testimonial-card-component class="testimonial-card"></testimonial-card-component>
                </div>               
            </div>
        </div>
        `;

        shadow.appendChild(style);
        render(temaplate, shadow);
        this.testimonialsAnimation();
    }

    private testimonialsAnimation() {
        const columns = this.shadowRoot!.querySelectorAll('.column');
        columns.forEach(column => {
            const columnItem = column.querySelectorAll<HTMLElement>('.testimonial-card');
            columnItem.forEach((item, index) => {
                item.style.animationDelay = `${10 / columns.length * (columns.length - index) * -1}s`;
            });
        });        
    }
}
customElements.define('testimonials-component', Testimonials);