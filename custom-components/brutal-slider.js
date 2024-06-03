import { createStyles } from "../scripts/component-utils.js";

class BrutalSlider extends HTMLElement {
    constructor() {
        super();
    }
    fetchFolders = async () => {
        const res = await fetch(this.getAttribute('src'));
        return await res.json();
    };
    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        const folders = await this.fetchFolders();
        const cardStyles = `
        .card {
          box-shadow: 6px 6px 0px 3px rgb(0, 0, 0);
          width: 100vw;
          height: 100%;
          display: flex;
          background-color: #fdfd96;
          border: 3px solid #000;
          border-radius: 5px;
          margin: 0 auto;
          position: relative;
        }`;
        const sliderStyles = `
        .slider {
            display: flex;
            overflow-x: auto;
            width: 100%;
            height: 100vh;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            width: 100%;
            height: 90svh;
        }
        `;
        const slider = document.createElement('div');
        slider.className = 'slider'
        folders.forEach((folder) => {
            const card = document.createElement('div');
            const iframe = document.createElement('iframe');
            iframe.src = folder;
            iframe.width = '100%';
            iframe.height = '100%';
            card.classList.add('card');
            card.appendChild(iframe);
            card.appendChild(createStyles(cardStyles));
            slider.appendChild(card);
        });
        shadow.appendChild(createStyles(sliderStyles));
        shadow.appendChild(slider);
    }
}

customElements.define('brutal-slider', BrutalSlider);
