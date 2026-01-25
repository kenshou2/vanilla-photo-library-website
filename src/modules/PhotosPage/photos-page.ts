import { html, render } from "lit-html";
import styles from './photos-page.css';

import './components/photo-card/photo-card';
import { photoData } from '../../data/photos-page-images';

export class PhotosPage extends HTMLElement {
    filterList: string[] = [];
    searchSuggestions: string[] = [];

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
        <div class="photos-page-container">
            <form class="search-form">
                <div class="search-options">
                    <div class="search-bar-container">
                        <input class="search-bar" type="search" name="search-field" id="search-field" autocomplete="off" placeholder="Search anything">
                        <button type="button" class="search-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" class="search-icon" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg></button>
                        <div class="search-suggestions hidden">
                            ${photoData.map(data => html`<button class="suggestion hidden">${data.name}</button>`)}
                        </div>
                    </div>
                    <div class="filters" >
                        <label class="filter-option">
                            <input type="checkbox" name="indoor" id="indoor">
                            Indoor
                        </label>
                        <label class="filter-option">
                            <input type="checkbox" name="black and white" id="black and white">
                            Black and white
                        </label>
                        <label class="filter-option">
                            <input type="checkbox" name="landscape" id="landscape">
                            Landscape
                        </label>
                        <label class="filter-option">
                            <input type="checkbox" name="nature" id="nature">
                            Nature
                        </label>
                        <label class="filter-option">
                            <input type="checkbox" name="urban" id="urban">
                            Urban
                        </label>
                        <label class="filter-option">
                            <input type="checkbox" name="people" id="people">
                            People
                        </label>
                    </div>
                </div>
            </form>
            <section class="photo-cards">
                ${photoData.map(data => html`<a href="#/photo-details?id=${data.id}" class="photo-card"><photo-card-component image="${data.imageSrc}" tags="${data.tags.join(',')}" name="${data.name}"></photo-card-component></a>`)}
            </section>
        </div>
        `;

        shadow.appendChild(style);
        render(template, shadow);
        this.attachFilterListeners();
        this.searchUtils();
        this.attachSearchListeners();
    }

    private filterImages() {
        const filterListLength = this.filterList.length;
        const images = this.shadowRoot!.querySelectorAll('photo-card-component');        
        images.forEach(image => {        
            const imageTags = image.getAttribute('tags')?.toLocaleLowerCase().split(',');
            if (filterListLength === 0) {
                image.classList.remove('hidden');
                image.parentElement?.classList.remove('hidden');
            }
            else {         
                const hasMatch = this.filterList.some(tag => imageTags?.includes(tag.toLowerCase()));
                if (!hasMatch) {
                    image.classList.add('hidden');
                    image.parentElement?.classList.add('hidden');
                }
                else {
                    image.classList.remove('hidden');
                    image.parentElement?.classList.remove('hidden');
                }
            }
        });
    }

    private attachFilterListeners() {
        const filters = this.shadowRoot!.querySelectorAll('input[type="checkbox"]');
        filters.forEach(filter => {
            const filterName = filter.getAttribute('name');
            if (filter.getAttribute('active') && filterName)
                this.filterList.push(filterName);
            this.filterImages();
            filter.addEventListener('click', () => {
                const filterName = filter.getAttribute('name');
                if (!filter.getAttribute('active')) {
                    filter.setAttribute('active', 'true');
                    if (filterName)
                        this.filterList.push(filterName);
                    else
                        console.error('Filter name absent on filter tag');
                } else {
                    filter.removeAttribute('active');
                    if (filterName) {
                        const index = this.filterList.indexOf(filterName);
                        this.filterList.splice(index, 1);
                    }
                }
                this.filterImages();                
            });
        });
    }

    private attachSearchListeners() {        
        const searchForm = this.shadowRoot!.querySelector<HTMLFormElement>('.search-form');     
        const searchBar = this.shadowRoot!.querySelector<HTMLInputElement>('.search-bar');   
        const searchButton = this.shadowRoot!.querySelector<HTMLButtonElement>('.search-button');
        searchForm?.addEventListener('submit', (event) => {
            event.preventDefault();
            this.search(searchBar?.value);
        });
        searchButton?.addEventListener('click', () => {
            this.search(searchBar?.value);
        });
    }

    private search(query?: string | null | undefined) {
        const searchBar = this.shadowRoot!.querySelector<HTMLInputElement>('.search-bar');
        const images = this.shadowRoot!.querySelectorAll('photo-card-component');

        let searchInput;
        if (query)
            searchInput = searchBar?.value.toLocaleLowerCase();
        else
            searchInput = query?.toLocaleLowerCase();
        
        images.forEach(image => {
            const imageName = image.getAttribute('name')?.toLocaleLowerCase();
            if (searchInput && !(imageName?.includes(searchInput)))
            {
                image.classList.add('hidden');
                image.parentElement?.classList.add('hidden');
            }
            else {
                image.classList.remove('hidden');
                image.parentElement?.classList.remove('hidden');
            }
        });
    }

    private searchUtils() {
        const searchBar = this.shadowRoot!.querySelector<HTMLInputElement>('.search-bar');
        const searchSuggestionsContainer = this.shadowRoot!.querySelector('.search-suggestions');
        const searchSuggestions = this.shadowRoot!.querySelectorAll('.suggestion');

        this.addEventListener('click', (event) => {
            const searchBarContainer = document.querySelector('.search-bar-container');
            if (!searchBarContainer?.contains(event.target as Node))
                searchSuggestionsContainer?.classList.add('hidden');            
        });

        if (!searchBar) {
            console.error("Search bar element is missing");
            return;
        }
    
        let searchQuery = '';
    
        searchBar.addEventListener('input', (event) => {
            const inputElement = event.target as HTMLInputElement;
            searchQuery = inputElement.value.toLocaleLowerCase();            
            this.search(searchQuery);

            searchSuggestions.forEach(suggestion => {                
                if (searchQuery) {
                    searchSuggestionsContainer?.classList.remove('hidden');
                    if (suggestion.textContent && suggestion.textContent.toLowerCase().includes(searchQuery)) {                     
                        suggestion.classList.remove('hidden');
                    } else {
                        suggestion?.classList.add('hidden');
                    }
                } else
                    searchSuggestionsContainer?.classList.add('hidden');
                suggestion.addEventListener('click', () => {
                    if (suggestion.textContent)
                        inputElement.value = suggestion.textContent;
                });
            });
        });
    }
}
customElements.define('photos-page-component', PhotosPage);
