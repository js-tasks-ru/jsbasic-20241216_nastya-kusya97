import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.renderCarousel();
    this.translateX = 0;
    this.carousel = this.elem.querySelector('.carousel__inner');
    this.buttonRight = this.elem.querySelector('.carousel__arrow_right');
    this.buttonLeft = this.elem.querySelector('.carousel__arrow_left');
    this.setDisplayButton(this.buttonLeft, this.translateX === 0);
    this.onRightArrow();
    this.onLeftArrow();
    this.onButtonCarousel();
  }

  setDisplayButton(button, isHidden) {
    button.style.display = isHidden ? 'none' : '';
  }

  getWidthSlide() {
    return this.carousel.firstElementChild.offsetWidth;
  }

  translateCarousel() {
    this.carousel.style.transform = `translateX(${this.translateX}px)`;
    this.setDisplayButton(this.buttonRight, this.translateX === -this.getWidthSlide() * (this.slides.length - 1));
    this.setDisplayButton(this.buttonLeft, this.translateX === 0);
  }

  moveRightCarousel() {
    this.translateX -= this.getWidthSlide();
    this.translateCarousel();
  }

  moveLeftCarousel() {
    this.translateX += this.getWidthSlide();
    this.translateCarousel();
  }

  onRightArrow() {
    this.buttonRight.addEventListener('click', this.moveRightCarousel.bind(this));

  }

  onLeftArrow() {
    this.buttonLeft.addEventListener('click', this.moveLeftCarousel.bind(this));
  }

  createCustomEvent(e) {
    const slide = e.currentTarget.closest('.carousel__slide');
    const event = new CustomEvent("product-add", {
      detail: slide.dataset.id,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }

  onButtonCarousel() {
    const buttons = this.elem.querySelectorAll('.carousel__button');
    buttons.forEach((button) => button.addEventListener('click', this.createCustomEvent.bind(this)));
  }

  renderInnerSlides(carouselInner) {
    return this.slides.map((slide) => carouselInner.append(this.renderSlide(slide)));
  }

  renderArrowRight() {
    return createElement(`
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
    `);
  }

  renderArrowLeft() {
    return createElement(`
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
    `);
  }

  renderCarousel() {
    const carousel = document.createElement("div");
    carousel.classList.add('carousel');
    const carouselInner = document.createElement("div");
    carouselInner.classList.add('carousel__inner');
    this.renderInnerSlides(carouselInner);
    carousel.append(this.renderArrowRight(), this.renderArrowLeft(), carouselInner);
    return carousel;
  }

  renderSlide(slide) {
    const {id, image, price, name} = slide;
    return createElement(`
     <div class="carousel__slide" data-id="${id}">
      <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${price}</span>
        <div class="carousel__title">${name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `);
  }
}
