import { html, render } from "lit-html";
import styles from './about-page.css';

export class About extends HTMLElement {

    constructor() {
        super();
    }

    scrollCoutner = 0;

    connectedCallback() {
        if (this.shadowRoot)
            return;
        const shadow = this.attachShadow({mode: "open"});

        const style = document.createElement('style');
        style.textContent = styles;

        const template = html`
        <div class="about-page-container">
            <div class="info-container">                
                <div class="info-sections">
                    <section class="info">
                        <h1 class="info-header">Heading 1</h1>
                        <p class="info-paragraph">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it</p>
                        <ul class="info-list">
                            <li class="info-list-item">Item 1</li>
                            <li class="info-list-item">Item 1</li>
                            <li class="info-list-item">Item 1</li>
                            <li class="info-list-item">Item 1</li>
                        </ul>
                    </section>
                    <section class="info">
                        <h1 class="info-header">Heading 2</h1>
                        <p class="info-paragraph">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it</p>                        
                    </section>
                    <section class="info">
                        <h1 class="info-header">Heading 3</h1>
                        <p class="info-paragraph">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it</p>
                        <ul class="info-list">
                            <li class="info-list-item">Item 1</li>
                            <li class="info-list-item">Item 1</li>
                            <li class="info-list-item">Item 1</li>
                            <li class="info-list-item">Item 1</li>
                        </ul>
                    </section>
                </div>
                <button type="button" class="button scroll-down-button"><svg width="62" height="27" viewBox="0 0 62 27" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1.1877" y1="2.39085" x2="32.1877" y2="25.2718" stroke="#F4F4F4" stroke-width="4"/><line y1="-2" x2="38.5297" y2="-2" transform="matrix(-0.804574 0.593852 0.593852 0.804574 62 4)" stroke="#F4F4F4" stroke-width="4"/></svg>
                </button>
            </div>
            <div class="logo"></div>
        </div>
        `;

        shadow.appendChild(style);
        render(template, shadow);
        this.scrollInfo();
    }

    private scrollInfo() {
        const scrollDownButton = this.shadowRoot!.querySelector('.scroll-down-button');                
        const infoList = this.shadowRoot!.querySelectorAll<HTMLElement>('.info');
        const infoListLen = infoList.length;
        
        for (let i = 1; i < infoListLen; i++) {
            infoList[i].style.top = '100%';
        }

        scrollDownButton?.addEventListener('click', () => {
            if (this.scrollCoutner < infoListLen - 1) {
                infoList[this.scrollCoutner].style.top = `-100%`;  
                infoList[this.scrollCoutner + 1].style.top = `0`;  
                this.scrollCoutner++;
            }
        });
    }
}
customElements.define('about-page-component', About);