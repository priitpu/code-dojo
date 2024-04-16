import { createStyles } from "./../scripts/component-utils.js";
class BrutalCard extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const styles = `
    .card {
      box-shadow: 6px 6px 0px 3px rgb(0, 0, 0);
      margin: 0 auto;
      max-width: 600px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      background-color: #fdfd96;
      border: 3px solid #000;
      border-radius: 5px;
      gap: 16px;
      position: relative;
    }`;
    shadow.appendChild(createStyles(styles));
    const card = document.createElement('div');
    const slot = document.createElement('slot');
    card.classList.add('card');
    card.appendChild(slot);
    shadow.appendChild(card);
  }
}

customElements.define('brutal-card', BrutalCard);
