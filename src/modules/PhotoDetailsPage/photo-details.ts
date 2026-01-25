import { html, render } from "lit-html";
import styles from './photo-details.css';

import { photoData } from "../../data/photos-page-images";
import { photoesObj } from "../../data/photo-images-object";

export class PhotoDetails extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.shadowRoot)
            return;
        const shadow = this.attachShadow({mode: "open"});

        const style = document.createElement('style');
        style.textContent = styles;

        const hash = window.location.hash;
        const queryString = hash.split('?')[1] || '';
        const urlParams = new URLSearchParams(queryString);
        const idParam = urlParams.get('id');
        const id = idParam ? parseInt(idParam) : undefined;

        const photoDetails = photoData.find((photo) => photo.id === id);
        if (!photoDetails) {
            window.location.href = '#/not-found';
        }

        const template = html`
        <div class="photo-details-page-container">
            <div class="photo-showcase">                
                <div class="photo-heading">
                    <h1 class="photo-name">${photoDetails?.name}</h1>
                    <p class="photo-description">${photoDetails?.subName}</p>
                </div>
                <div class="main-content">                    
                    <div class="showcase-area">
                        <div class="photo-grid">
                            <div class="photo one main"><img src="${photoesObj[photoDetails!.imageSrc]}"></div>
                            <div class="photo aside two"><img src="${photoesObj[photoDetails!.altPerspectivesSrc[0]]}"></div>
                            <div class="photo aside three"><img src="${photoesObj[photoDetails!.altPerspectivesSrc[1]]}"></div>
                            <div class="photo aside four"><img src="${photoesObj[photoDetails!.altPerspectivesSrc[2]]}"></div>
                        </div>
                        <div class="photo-utils">
                            <div class="tags">
                                <div class="tags">
                                    ${photoDetails!.tags.map(tag => html`<span class="tag">${tag}</span>`)}
                                </div>
                            </div>
                            <button type="button" class="expand-button">Expand</button>
                        </div>
                    </div>
                    <aside class="photo-details">
                        <div class="detail">
                            <div class="detail-label"><span>Description<span></div>
                            <div class="detail-text expand-content">
                                <div>${photoDetails?.description}</div>
                            </div>
                        </div>
                        <div class="detail">
                            <div class="detail-label"><span>Camera settings<span></div>
                            <div class="detail-text">
                                <div><ul>${photoDetails?.cameraSettings.map(setting => html`<li>${setting}</li>`)}</ul></div>
                            </div>
                        </div>
                    </aside>
                </div>  
                <p class="disclaimer">This is a demo project. All images are sourced from Unsplash / Pexels</p>              
            </div>            
        </div>
        `;

        shadow.appendChild(style);
        render(template, shadow);
        this.expandDetails();
        this.animationQueue();
        this.expandPhoto();
    }

    private expandDetails() {
        const details = this.shadowRoot!.querySelectorAll('.detail');
        details.forEach(detail => {
            const detailLabel = detail.querySelector('.detail-label');
            detailLabel!.addEventListener('click', () => {
                const detailText = detail.querySelector('.detail-text');
                if (!detailText) {
                    console.error("Detail text missing");
                    return;
                }
                detailText.classList.toggle('expand-content');
            });
        })
    }

    private animationQueue() {
        const photos = this.shadowRoot!.querySelectorAll<HTMLElement>('.photo');
        const photosQueue = Array.from(photos);
        const photoPositionClasses = ['one', 'two', 'three', 'four'];
        
        photosQueue.forEach(photo => {
            photo.addEventListener('animationend', () => {
                
                photo.classList.remove('main');
                photo.classList.add('aside');                

                for (let i = photosQueue.length - 1; i > 0; i--) {
                    let photoCopy = photosQueue[i];
                    photosQueue[i] = photosQueue[i - 1];
                    photosQueue[i - 1] = photoCopy;
                }                
                for (let i = 0; i < photoPositionClasses.length; i++) {
                    photosQueue[i].classList.remove(...photoPositionClasses);
                    photosQueue[i].classList.add(photoPositionClasses[i]);
                }
                photosQueue[0].classList.remove('aside');
                photosQueue[0].classList.add('main');
            });
            photo.addEventListener('click', (event) => this.photoSwap(event));
        });        
    }

    private photoSwap(event: MouseEvent) {
        const mainPhoto = this.shadowRoot!.querySelector('.main');
        const targetPhoto: HTMLElement | null = (event.target as HTMLElement).closest('.photo');
        
        if (!mainPhoto || !targetPhoto || mainPhoto === targetPhoto) return;

        const mainClasses = mainPhoto.className;
        mainPhoto.className = targetPhoto.className;
        targetPhoto.className = mainClasses;

    }

    private expandPhoto() {
        const expandButton = this.shadowRoot!.querySelector('.expand-button');
        expandButton?.addEventListener('click', () => {
            const mainPhoto = this.shadowRoot!.querySelector('.main img');
            mainPhoto?.classList.toggle('expand-photo');
            mainPhoto?.addEventListener('click', () => {
                mainPhoto?.classList.remove('expand-photo');
            });
        });
    }
}
customElements.define('photo-details-page-component', PhotoDetails);