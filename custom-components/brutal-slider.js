import { createStyles } from "../scripts/component-utils.js";
import { getRandomColor } from "../scripts/get-random-color.js";

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
          width: 100%;
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
            overflow: hidden;
            width: 100%;
            height: 90svh;
        }
        .slider-scroll {

        }
        `;
        const [leftButton, rightButton] = [document.createElement('button'), document.createElement('button')];
        const buttonStyles = `
            .button {

            }
        `;
        leftButton.textContent = '<';
        rightButton.textContent = '>';
        leftButton.className = 'button';
        rightButton.className = 'button';
        leftButton.style.backgroundColor = getRandomColor();
        rightButton.style.backgroundColor = getRandomColor();
        [leftButton, rightButton].forEach((button) => {
            button.addEventListener('click', () => {
                const slider = shadow.querySelector('.slider');
                const cards = shadow.querySelectorAll('.card');
                const cardWidth = cards[0].clientWidth;
                if (button.textContent === '>') {
                    slider.scrollLeft += cardWidth;
                } else {
                    slider.scrollLeft -= cardWidth;
                }
            });
        })
        const container = document.createElement('div');
        container.className = 'container';
        const slider = document.createElement('div');
        slider.className = 'slider';
        const sliderScroll = document.createElement('div');
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
