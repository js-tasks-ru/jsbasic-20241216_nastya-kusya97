import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.renderModal();
    this.onCloseButtonHandler();
    this.onCloseHandler();
  }

  onEscHandler(e) {
    if (e.code === 'Escape') {
      this.close();
    }
  }

  onCloseHandler() {
    document.addEventListener('keydown', this.onEscHandler.bind(this));
  }

  onCloseButtonHandler() {
    const button = this.elem.querySelector('.modal__close');
    button.addEventListener('click', this.close.bind(this));
  }

  setTitle(title) {
    const titleElem = this.elem.querySelector('.modal__title');
    titleElem.innerHTML = title;
  }

  setBody(content) {
    const body = this.elem.querySelector('.modal__body');
    if (typeof content === 'string') {
      body.innerHTML = content;
    } else {
      body.innerHTML = '';
      body.append(content);
    }
  }

  renderTitle() {
    const titleElement = document.createElement('h3');
    titleElement.classList.add('modal__title');
    return titleElement;
  }

  renderCloseButton() {
    return createElement(`
        <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
         </button>
    `);
  }

  renderHeader() {
    const headerBlock = document.createElement('div');
    headerBlock.classList.add('modal__header');
    headerBlock.append(this.renderCloseButton(), this.renderTitle());
    return headerBlock;
  }

  renderBody() {
    const bodyBlock = document.createElement('div');
    bodyBlock.classList.add('modal__body');
    return bodyBlock;
  }

  renderInner() {
    const elementInner = document.createElement('div');
    elementInner.classList.add('modal__inner');
    elementInner.append(this.renderHeader(), this.renderBody());
    return elementInner;
  }

  renderOverlay() {
    return createElement(`<div class="modal__overlay"></div>`);
  }

  renderModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.append(this.renderOverlay(), this.renderInner());
    return modal;
  }

  open() {
    document.body.classList.add('is-modal-open');
    return document.body.append(this.elem);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }
}
