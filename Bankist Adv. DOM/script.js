'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const showModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((ele) => ele.addEventListener('click', showModal));

btnCloseModal.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button Scrolling

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

/*
document.querySelectorAll('.nav__link').forEach(ele => {
    ele.addEventListener('click',function(e){
        e.preventDefault();   
        const id = this.getAttribute('href');
        console.log(id);
        document.querySelector(id).scrollIntoView({behavior : 'smooth'});
    })
})
*/

// =======> Good way to accomplish same feature <=======

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    if (id && id !== '#') document.querySelector(id).scrollIntoView();
  }
});

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  //We can use e.target only, but it creates a problem. If we click on span in button than it will create it target element so button click will not work.
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((t) => t.classList.remove('operations__tab--active'));
  tabsContent.forEach((c) => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  //  Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation

/*We will not implement this functionality into our project because of performance issue.
Problem :- So anytime a mouse hover happen on nav element than all the code of both event listner will execute, which is handleHover function.
So it can effect performance of the app, Because every mouse hover in nav will execute 10 line of code which also contain loops and conditional statements.
Solution :- Because it is just UI feature which is not mandatory, we can implement something similar using css pseudo-class selector :hover,
*/
/*
const handleHover = function (o) {
  return function (e) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('.nav__logo');
      siblings.forEach((ele) => {
        if (ele.classList.contains('nav__link--btn')) return;
        if (ele !== link) ele.style.opacity = o;
      });
      logo.style.opacity = o;
    }
  };
};

nav.addEventListener('mouseover', handleHover(0.5));
nav.addEventListener('mouseout', handleHover(1));
*/

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections

const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  threshold: 0.15,
  root: null,
});

allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////
// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach((img) => {
  imgObserver.observe(img);
});

///////////////////////////////////////
// Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  let curSlide = 0;
  let maxSlide = slides.length;
  const rightBtn = document.querySelector('.slider__btn--right');
  const leftBtn = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');
  /*slides.forEach((s, i) => {
  s.style.transform = `translateX(${100 * i}%)`;
});*/

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      curSlide = slide;
      changeSlide(slide);
    }
  });

  const changeSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });

    document.querySelectorAll('.dots__dot').forEach((b) => {
      b.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };

  const prevSlide = function () {
    if (curSlide <= 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    changeSlide(curSlide);
  };

  const nextSlide = function () {
    if (curSlide < maxSlide - 1) curSlide++;
    else curSlide = 0;
    changeSlide(curSlide);
  };

  const init = function () {
    createDots();
    changeSlide(0);
  };
  init();

  //Event Handlers

  rightBtn.addEventListener('click', nextSlide);

  leftBtn.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });
};
slider();
