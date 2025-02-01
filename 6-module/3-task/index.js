import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.renderCarousel();
    this.translateX = 0;
  }

  translateCarousel(carousel) {
    carousel.style.transform = `translateX(${this.translateX}px)`;
  }

  onRightArrow(carousel) {
    // const carousel = document.querySelector('.carousel__inner');
    console.error('carousel', carousel);
    const widthSlide = carousel.firstElementChild.offsetWidth;
    this.translateX -= widthSlide;
    this.translateCarousel(carousel);
    // setDisplayButton(buttonRight, this.translateX === -widthSlide * (countSlides - 1));
    // setDisplayButton(buttonLeft, this.translateX === 0);
  }

  onLeftArrow(carousel) {
    // const carousel = document.querySelector('.carousel__inner');
    const widthSlide = carousel.firstElementChild.offsetWidth;
    this.translateX += widthSlide;
    this.translateCarousel(carousel);
    // setDisplayButton(buttonRight, this.translateX === -widthSlide * (countSlides - 1));
    // setDisplayButton(buttonLeft, this.translateX === 0);
  }

  renderInnerSlides(carouselInner) {
    return this.slides.map((slide) => carouselInner.append(this.renderSlide(slide)));
  }

  renderRightArrow(carousel) {
    const arrowRight = document.createElement('div');
    arrowRight.classList.add('carousel__arrow', 'carousel__arrow_right');
    const imgRight = createElement(`<img src="/assets/images/icons/angle-icon.svg" alt="icon">`);
    arrowRight.append(imgRight);
    arrowRight.onclick = this.onRightArrow;
    return arrowRight;
  }

  renderLeftArrow(carousel) {
    const arrowLeft = document.createElement('div');
    arrowLeft.classList.add('carousel__arrow', 'carousel__arrow_left');
    const imgLeft = createElement(`<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">`);
    arrowLeft.append(imgLeft);
    arrowLeft.onclick = this.onLeftArrow;
    return arrowLeft;
  }

  renderArrows() {
    // return createElement(`
    //     <div class="carousel__arrow carousel__arrow_right">
    //       <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    //     </div>
    //     <div class="carousel__arrow carousel__arrow_left">
    //       <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    //     </div>
    // `);
  }

  renderCarousel() {
    // return createElement(`
    //   <div class="carousel">
    //   </div>
    // `);

    const carousel = document.createElement("div");
    carousel.classList.add('carousel');
    const carouselInner = document.createElement("div");
    carouselInner.classList.add('carousel__inner');
    this.renderInnerSlides(carouselInner);
    carousel.append(carouselInner, this.renderRightArrow(carousel), this.renderLeftArrow(carousel));
    return carousel;
  }

  renderSlide(slide) {
    return createElement(`
     <div class="carousel__slide" data-id="penang-shrimp">
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `);
  }
}
