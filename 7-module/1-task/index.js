import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.renderRibbonMenu();
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.rightArrow = this.elem.querySelector('.ribbon__arrow_right');
    this.leftArrow = this.elem.querySelector('.ribbon__arrow_left');
    this.rightArrow.classList.add('ribbon__arrow_visible');
    this.onRibbonInner();
    this.onRightArrow();
    this.onLeftArrow();
    this.onClickRibbonItem();
  }

  onScrollRibbonInner() {
    const {scrollLeft, scrollWidth, clientWidth} = this.ribbonInner;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft > 0) {
      this.leftArrow.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight > 0) {
      this.rightArrow.classList.add('ribbon__arrow_visible');
    }

    if (scrollLeft === 0) {
      this.leftArrow.classList.remove('ribbon__arrow_visible');
    }

    if (scrollRight === 0) {
      this.rightArrow.classList.remove('ribbon__arrow_visible');
    }
  }

  onRibbonInner() {
    this.ribbonInner.addEventListener('scroll', this.onScrollRibbonInner.bind(this));
  }

  moveLeft() {
    this.ribbonInner.scrollBy(-350, 0);
  }

  moveRight() {
    this.ribbonInner.scrollBy(350, 0);
  }

  onRightArrow() {
    this.rightArrow.addEventListener('click', this.moveRight.bind(this));
  }

  onLeftArrow() {
    this.leftArrow.addEventListener('click', this.moveLeft.bind(this));
  }

  onSelectRibbonItem(e) {
    e.preventDefault();
    const classSelected = 'ribbon__item_active';
    const item = e.target;
    const prevSelectedItem = document.querySelector(`.${classSelected}`);
    if (!!prevSelectedItem) {
      prevSelectedItem.classList.remove(classSelected);
    }
    item.classList.add(classSelected);
    const event = new CustomEvent('ribbon-select', {
      detail: item.dataset.id,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }

  onClickRibbonItem() {
    const ribbonItems = this.elem.querySelectorAll('.ribbon__item');
    ribbonItems.forEach((item) => item.addEventListener('click', this.onSelectRibbonItem.bind(this)));
  }

  renderArrowRight() {
    return createElement(`
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
    `);
  }

  renderArrowLeft() {
    return createElement(`
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
    `);
  }

  renderRibbonItem(item) {
    const {id, name} = item;
    return createElement(`
        <a href="#" class="ribbon__item" data-id="${id}">${name}</a>
    `);
  }

  renderRibbonInner() {
    const ribbonInner = document.createElement("nav");
    ribbonInner.classList.add('ribbon__inner');
    this.categories.map((item) => ribbonInner.append(this.renderRibbonItem(item)));
    return ribbonInner;
  }

  renderRibbonMenu() {
    const ribbonMenu = document.createElement('div');
    ribbonMenu.classList.add('ribbon');
    ribbonMenu.append(this.renderArrowLeft(), this.renderRibbonInner(), this.renderArrowRight());
    return ribbonMenu;
  }
}
