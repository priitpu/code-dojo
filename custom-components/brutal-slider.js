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
        const folders = await this.fetchFolders();
        const shadow = this.attachShadow({ mode: 'open' });
        const styles = `
        .card {
          box-shadow: 6px 6px 0px 3px rgb(0, 0, 0);
          width: 100%;
          height: 90svh;
          display: flex;
          background-color: #fdfd96;
          border: 3px solid #000;
          border-radius: 5px;
          margin: 0 auto;
          position: relative;
        }`;
        folders.forEach((folder) => {
            const card = document.createElement('div');
            const iframe = document.createElement('iframe');
            iframe.src = folder;
            iframe.width = '100%';
            iframe.height = '100%';
            card.classList.add('card');
            card.appendChild(iframe);
            card.appendChild(createStyles(styles));
            shadow.appendChild(card);
        });
        // shadow.appendChild(createStyles(styles));
    }
}

customElements.define('brutal-slider', BrutalSlider);
