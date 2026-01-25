import styles from './hero.css';
import '../../../../components/ui/RoundButton/round-button'
import { html, render } from "lit-html";

export class Hero extends HTMLElement {
    assets = {
        videos: {
            bgVideo: require('../../../../assets/videos/hero-bg.mp4'),
        }
    }

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
        <section class="hero-container fullscreen">
            <div>
                <video class="fullscreen" src="${this.assets.videos.bgVideo}" autoplay loop muted></video>
                <div class="video-filter fullscreen"></div>
            </div>
            <div class="hero-content">
                <div class="hero-text">
                    <p class="headline">
                        <strong class="highlight">Embrace</strong> the world of beautiful <strong class="highlight">photography</strong>.
                    </p>
                    <p class="sub-text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                    </p>            
                </div>
                <div class="cta-buttons">
                    <a href="#/photos"><round-button-component text="See photos" outline="true"></round-button-component></a>
                    <a href="#/about"><round-button-component text="About"></round-button-component></a>
                </div>        
            </div>
        </section>
        `;

        shadow.appendChild(style);
        render(template, shadow);
    }
}
customElements.define('hero-component', Hero);