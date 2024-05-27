import { getRandomColor } from '../scripts/get-random-color.js';
class Frame extends HTMLElement {
  constructor() {
    super();
  }

  createStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .frames {
        display: flex;
        flex-direction: column;
        gap: 3.2rem;
      }
      .frame {
        padding: 16px;
        display: flex;
        flex-direction: column;
        position: relative;
        box-shadow: 6px 6px 0px 3px rgb(0, 0, 0);
        background-size: 16px 16px;
        background-repeat: repeat;
        border-radius: 5px;
        border: 3px solid #000;
        .frame__info {
          display: flex;
          background-color: inherit;
          padding: 6px 12px;
          gap: 10px;
          position: absolute;
          top: calc(100% - 12px);
          box-shadow: 6px 6px 0px 3px rgb(0, 0, 0);
          right: -3px;
          font-size: 1rem;
          border-radius: 5px;
          border-bottom: 3px solid #000;
          border-right: 3px solid #000;
          border-top-right-radius: 0;
          border-top-left-radius: 0;
          align-items: center;
        }
        a {
          color: #fff;
          text-decoration: none;
          background-color: #000;
          padding: 2px;
          font-size: 1rem;
        }
        iframe {
          width: 100%;
          height: 100svh;
          overflow: hidden;
          border: 0;
          transition: height 0.3s ease-in-out;
          background-color: #fff;
        }
      }
    `;
    this.shadowRoot.appendChild(style);
  };

  createIframes = (folders, template) => {
    let iframes = [];
    let frames = [];
    folders.forEach((folder) => {
      const frame = template.content.cloneNode(true);
      const iframe = document.createElement('iframe');
      iframe.loading = 'lazy';
      iframe.src = `${window.location.href}/${folder}/index.html`;
      iframe.title = folder;
      iframes = [...iframes, iframe];
      iframe.onload = () => {
        iframe.style.height =
          iframe.contentDocument.scrollingElement.offsetHeight + 'px';
      };
      frame.querySelector('.frame__author').textContent = folder;
      frame.querySelector(
        '.frame__source'
      ).href = `https://github.com/priitpu/code-dojo/tree/main/${window.location.href.split('/').at(-1)}/${folder}`;
      frame.querySelector('.frame').prepend(iframe);
      frame.querySelector('.frame').style.backgroundColor = getRandomColor();
      frames = [...frames, frame];
    });
    return [iframes, frames];
  };

  fetchFolders = async () => {
    const res = await fetch(this.getAttribute('src'));
    return await res.json();
  };

  addEventListeners = (iframes) => {
    window.addEventListener('resize', () => {
      iframes.forEach((iframe) => {
        iframe.style.height =
          iframe.contentDocument.scrollingElement.offsetHeight + 'px';
      });
    });
    window.setInterval(() => {
      iframes.forEach((iframe) => {
        iframe.style.height =
          iframe.contentDocument.scrollingElement.offsetHeight + 'px';
      });
    }, 1000);
  };

  async connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const folders = await this.fetchFolders();
    const template = document.createElement('template');

    template.innerHTML = `
      <div class="frame">
        <div class="frame__info">
          <p class="frame__author"></p>
          <a href="" target="_blank" class="frame__source">SOURCE</a>
        </div>
      </div>
    `;

    const [iframes, frames] = this.createIframes(folders, template);
    const frameContainer = document.createElement('div');
    frameContainer.classList.add('frames');
    frames.forEach((frame) => {
      frameContainer.appendChild(frame);
    });
    this.createStyles();
    shadow.appendChild(frameContainer);
    this.addEventListeners(iframes);
  }
}

customElements.define('brutal-frames', Frame);
