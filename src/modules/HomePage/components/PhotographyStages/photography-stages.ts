import { Assets } from '../../../types/assets';
import styles from './photography-stages.css';
import { html, render } from 'lit-html';

export class PhotographyStages extends HTMLElement {
    assets: Assets = {
        images: {
            stage1: require('../../../../assets/images/photos/stage1.png'),
            stage2: require('../../../../assets/images/photos/stage2.png'),
            stage3: require('../../../../assets/images/photos/stage3.png'),
            stage4: require('../../../../assets/images/photos/stage4.png'),
            slideRight: require('../../../../assets//images/element-decorations/slide-right.png')
        }
    };

    stageDescriptions: string[] = [
        'Composition',
        'Lighting',
        'Post-processing',
        'End result',
    ]

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
        <section class="photography-stages-container">
            <h2 class="heading">Stages of photography</h2>
            <div class="photography-stage">
                <div class="stage-image">
                    <div class="imageNumber hidden"></div>
                    <img class="image" src="${this.assets.images?.stage1}">
                </div>
                <div class="stage-image">
                    <div class="imageNumber hidden"></div>
                    <img class="image" src="${this.assets.images?.stage2}">
                </div>
                <div class="stage-image">
                    <div class="imageNumber hidden"></div>
                    <img class="image"  src="${this.assets.images?.stage3}">
                </div>
                <div class="stage-image">
                    <div class="imageNumber hidden"></div>
                    <img class="image"  src="${this.assets.images?.stage4}">
                </div>
                <button type="button" class="slide-right"><img src="${this.assets.images?.slideRight}" alt="an image of an arrow pointing to the right"></button>
                <div class="stage-description">${this.stageDescriptions.length ? this.stageDescriptions[0] : 'Default'}</div>
            </div>
        </section>
        `;

        shadow.appendChild(style);
        render(template, shadow);
        
        this.slideNavigation();
    }

    private slideNavigation() {
        let counter = 0;
        const images = Array.from(this.shadowRoot!.querySelectorAll<HTMLElement>('.stage-image'));
        const imagesLength = images.length;
        const imagesContent = this.shadowRoot!.querySelectorAll('.image');
        const slideButton = this.shadowRoot!.querySelector<HTMLButtonElement>('.slide-right');
        const workStage = this.shadowRoot!.querySelector<HTMLDivElement>('.photography-stage');
        const shrinkedImageNumber = this.shadowRoot!.querySelectorAll('.imageNumber');
        const stageDescription = this.shadowRoot!.querySelector('.stage-description');
        
        if (!slideButton || !workStage || !stageDescription) {
            console.error("Essential elements are missing.");
            return;
        }
        if (this.stageDescriptions.length < imagesLength) {
            console.error("Less stage descriptions provided than stage images.")
            return;
        }

        const slideRight = () => {
            const image = images[counter];
            const imageContent = imagesContent[counter];

            image.classList.add('shrink');
            shrinkedImageNumber[counter].textContent = `${counter + 1}`;
            stageDescription.textContent = this.stageDescriptions[counter + 1];
            imageContent.classList.add('fade-out');
            image.style.marginRight = `-${(counter) * (120-70) + 120}px`; // 120 = take flex-basis value of .shrink'ed element + its margin
            image.style.marginLeft = `${(counter) * (120-70) + 10}px`; // 110 + 10 = take flex-basis value of .shrink'ed element and add default left margin (10px here)
            shrinkedImageNumber[counter].classList.remove('hidden');

            counter += 1;
            if (counter === imagesLength - 1)
                slideButton.classList.toggle('hidden');
        }

        const expand = (event: Event): void => {
            const target = event.target as HTMLElement;            
            if (target && target.classList.contains('shrink')) {
                const index = Array.from(images).indexOf(target);

                for (let i = index; i < imagesLength; i++) {
                    images[i].classList.remove('shrink', 'first-shrinked');
                    imagesContent[i].classList.remove('fade-out');
                    images[i].style.removeProperty('margin-right');
                    images[i].style.removeProperty('margin-left');
                    shrinkedImageNumber[i].classList.add('hidden');
                }

                if (index < imagesLength - 1)
                    slideButton.classList.remove('hidden');                

                counter = index;
                stageDescription.textContent = this.stageDescriptions[counter];
            }
        }

        slideButton.addEventListener('click', slideRight);
        images.forEach((image) => {
            image.addEventListener('click', expand);
        });
    }
}
customElements.define('photography-stages-component', PhotographyStages);