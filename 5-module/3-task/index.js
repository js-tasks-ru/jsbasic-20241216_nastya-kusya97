function initCarousel() {
  const carousel = document.querySelector('.carousel__inner');
  const buttonRight = document.querySelector('.carousel__arrow_right');
  const buttonLeft = document.querySelector('.carousel__arrow_left');
  const countSlides = carousel.children.length;
  const widthSlide = carousel.firstElementChild.offsetWidth;

  let translateX = 0;
  setDisplayButton(buttonLeft, translateX === 0);

  buttonRight.addEventListener('click', () => {
    translateX -= widthSlide;
    translateCarousel(carousel, translateX);
    setDisplayButton(buttonRight, translateX === -widthSlide * (countSlides - 1));
    setDisplayButton(buttonLeft, translateX === 0);
  });

  buttonLeft.addEventListener('click', () => {
    translateX += widthSlide;
    translateCarousel(carousel, translateX);
    setDisplayButton(buttonRight, translateX === -widthSlide * (countSlides - 1));
    setDisplayButton(buttonLeft, translateX === 0);
  });
}

function setDisplayButton(button, isHidden) {
  button.style.display = isHidden ? 'none' : '';
}

function translateCarousel(carousel, translateX) {
  carousel.style.transform = `translateX(${translateX}px)`;
}
