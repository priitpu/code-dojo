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
    createCardStyles = () => {
        return `
        .card {
          width: 100%;
          height: 100%;
          display: flex;
          background-color: #fdfd96;
          margin: 0 auto;
          position: relative;
          flex-shrink: 0;
        }
        .tag {
            position: absolute;
            bottom:0;
            left:15px;
            font-weight: bold;
            font-size:14px;
            padding: 7px;
            border-bottom-left-radius: 5px;
            box-shadow: 3px 3px 0px 1px rgb(0, 0, 0);
            border: 1px solid #000;
            display: flex;
            gap: 10px;
            align-items: center;
            a {
                color: #fff;
                text-decoration: none;
                background-color: #000;
                padding: 2px;
                font-size: 14px;
              }
        }
        `;
    };
    createSliderStyles = () => {
        return `
        .slider {
            display: flex;
            width: 100%;
            height: 80svh;
            transition: transform 0.3s ease-in-out;
        }
        .slider-scroll {
            overflow: hidden;
            box-shadow: 6px 6px 0px 3px rgb(0, 0, 0);
            border: 3px solid #000;
            border-radius: 5px;
        }
        iframe {
            border: 0;
        }
        .container {
            position: relative;
            width: 90%;
            margin: 0 auto;
        }
        `;
    };
    createButtonStyles = () => {
        return `
        .button {
            box-shadow: 6px 6px 0px 3px rgb(0, 0, 0);
            border: 3px solid #000;
            border-radius: 5px;
            width: 100px;
            height: 100px;
            font-size: 70px;
            position: absolute;
            left: -70px;
            top: -70px;
            position: absolute;
            z-index: 1;
            cursor:pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        .button:hover {
            transform: scale(1.01) translate(-2%, -2%);
            box-shadow: 8px 8px 0px 5px rgb(0, 0, 0);
        }
        .button--right {
            right: -70px;
            bottom: -70px;
            left: auto;
            top: auto;
        }
    `;
    };
    createContainer = () => {
        const container = document.createElement('div');
        container.className = 'container';
        return container;
    };
    createCard = (folder) => {
        const card = document.createElement('div');
        const iframe = document.createElement('iframe');
        iframe.src = folder;
        iframe.width = '100%';
        iframe.height = '100%';
        card.classList.add('card');
        card.appendChild(iframe);
        const tag = document.createElement('div');
        card.appendChild(tag);
        tag.textContent = folder;
        tag.className = 'tag';
        tag.style.backgroundColor = getRandomColor();
        const a = document.createElement('a');
        tag.appendChild(a);
        a.textContent = 'Source';
        a.href = `https://github.com/priitpu/code-dojo/tree/main/${window.location.href.split('/').filter((el) => el).at(-1)}/${folder}`;
        a.target = '_blank';
        return card;
    };
    createSlider = () => {
        const slider = document.createElement('div');
        slider.className = 'slider';
        const sliderScroll = document.createElement('div');
        sliderScroll.className = 'slider-scroll';
        return [slider, sliderScroll];
    };
    createButtons = () => {
        const [leftButton, rightButton] = [document.createElement('button'), document.createElement('button')];
        leftButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M5 12l14 0" />
        <path d="M5 12l6 6" />
        <path d="M5 12l6 -6" />
      </svg>`;
        rightButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-right" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M5 12l14 0" />
        <path d="M13 18l6 -6" />
        <path d="M13 6l6 6" />
      </svg>`;
        leftButton.className = 'button';
        rightButton.className = 'button button--right';
        leftButton.style.backgroundColor = getRandomColor();
        rightButton.style.backgroundColor = getRandomColor();
        return [leftButton, rightButton];
    };
    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        const folders = await this.fetchFolders();
        const container = this.createContainer();
        const [slider, sliderScroll] = this.createSlider();
        const [leftButton, rightButton] = this.createButtons();
        rightButton.addEventListener('click', () => {
            this.current + 1 <= shadow.querySelectorAll('.card').length - 1 ? this.current++ : this.current = shadow.querySelectorAll('.card').length - 1;
            let size = 0;
            for (let i = 0; i < this.current; i++) {
                size += slider.children[i].clientWidth;
            }
            slider.style.transform = `translateX(${-size}px)`;
        });
        leftButton.addEventListener('click', () => {
            this.current - 1 > 0 ? this.current-- : this.current = 0;
            let size = 0;
            for (let i = 0; i < this.current; i++) {
                size += slider.children[i].clientWidth;
            }
            slider.style.transform = `translateX(${-size}px)`;
        });
        folders.forEach((folder) => {
            const card = this.createCard(folder);
            slider.appendChild(card);
        });
        window.addEventListener('resize', () => {
            let size = 0;
            for (let i = 0; i < this.current; i++) {
                size += slider.children[i].clientWidth;
            }
            slider.style.transform = `translateX(${-size}px)`;
        });
        shadow.appendChild(createStyles(this.createCardStyles()));
        shadow.appendChild(createStyles(this.createSliderStyles()));
        shadow.appendChild(createStyles(this.createButtonStyles()));
        shadow.appendChild(container);
        container.appendChild(leftButton);
        container.appendChild(sliderScroll);
        sliderScroll.appendChild(slider);
        container.appendChild(rightButton);
    }
}

customElements.define('brutal-slider', BrutalSlider);
