import { createStyles } from "../scripts/component-utils.js";
import { getRandomColor } from "../scripts/get-random-color.js";

class BrutalSlider extends HTMLElement {
    current = 0;
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
          width: 100%;
          height: 100%;
          display: flex;
          background-color: #fdfd96;
          margin: 0 auto;
          position: relative;
          flex-shrink: 0;
        }`;
        const sliderStyles = `
        .slider {
            display: flex;
            width: 100%;
            height: 90svh;
            box-shadow: 6px 6px 0px 3px rgb(0, 0, 0);
            border: 3px solid #000;
            border-radius: 5px;
        }
        .slider-scroll {
            overflow: hidden;
        }
        `;
        const [leftButton, rightButton] = [document.createElement('button'), document.createElement('button')];
        const buttonStyles = `
            .button {
                box-shadow: 6px 6px 0px 3px rgb(0, 0, 0);
                border: 3px solid #000;
                border-radius: 5px;
            }
        `;
        leftButton.textContent = '<';
        rightButton.textContent = '>';
        leftButton.className = 'button';
        rightButton.className = 'button';
        leftButton.style.backgroundColor = getRandomColor();
        rightButton.style.backgroundColor = getRandomColor();
        rightButton.addEventListener('click', () => {
            current + 1 <= shadow.querySelectorAll('.card').length - 1 ? current++ : current = 0;
            let size = 0;
            for (let i = 0; i < current; i++) {
                size += slider.children[i].clientWidth;
            }
            slider.style.transform = `translateX(${-size}px)`;
        });
        const container = document.createElement('div');
        container.className = 'container';
        const slider = document.createElement('div');
        slider.className = 'slider';
        const sliderScroll = document.createElement('div');
        sliderScroll.className = 'slider-scroll';
        folders.forEach((folder) => {
            const card = document.createElement('div');
            const iframe = document.createElement('iframe');
            iframe.src = folder;
            iframe.width = '100%';
            iframe.height = '100%';
            card.classList.add('card');
            card.appendChild(iframe);
            slider.appendChild(card);
        });
        shadow.appendChild(createStyles(sliderStyles));
        shadow.appendChild(createStyles(cardStyles));
        shadow.appendChild(container);
        container.appendChild(leftButton);
        container.appendChild(sliderScroll);
        sliderScroll.appendChild(slider);
        container.appendChild(rightButton);
    }
}

customElements.define('brutal-slider', BrutalSlider);
