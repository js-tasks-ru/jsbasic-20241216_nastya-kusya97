import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.renderSlider();
    this.changeStepValue();
    this.onSliderHandler();
  }

  createCustomEvent() {
    const event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }

  changeProgress(leftPercent) {
    const progress = this.elem.querySelector('.slider__progress');
    progress.style.width = leftPercent + '%';
  }

  changePositionThumb(leftPercent) {
    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.style.left = leftPercent + '%';
  }

  changeStepValue() {
    const step = this.elem.querySelector('.slider__value');
    step.innerHTML = this.value;
    const spans = this.elem.querySelectorAll('span');
    spans.forEach(span => span.classList.remove('slider__step-active'));
    spans[this.value + 1].classList.add('slider__step-active');
  }

  onSliderClick(e) {
    const width = this.elem.getBoundingClientRect().width;
    const left = e.clientX - this.elem.getBoundingClientRect().left;
    const leftPercent = left / width * 100;
    const stepPercent = 100 / (this.steps - 1);
    const leftPercentRound = Math.round(leftPercent / stepPercent) * stepPercent;
    this.changePositionThumb(leftPercentRound);
    this.changeProgress(leftPercentRound);
    this.value = leftPercentRound / stepPercent;
    this.changeStepValue();
    this.createCustomEvent();
  }

  onSliderHandler() {
    this.elem.addEventListener('click', this.onSliderClick.bind(this));
  }

  renderStep() {
    return document.createElement('span');
  }

  renderSteps() {
    const stepsSlider = createElement(`<div class="slider__steps" />`);
    for (let i = 0; i < this.steps; i++) {
      stepsSlider.append(this.renderStep());
    }
    return stepsSlider;
  }

  renderSlider() {
    const slider = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value" />
        </div>
        <div class="slider__progress" />
      </div>
    `);
    slider.append(this.renderSteps());
    return slider;
  }
}
