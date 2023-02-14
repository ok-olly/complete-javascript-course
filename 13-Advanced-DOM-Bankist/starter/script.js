'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  section1.scrollIntoView({ behavior: 'smooth' });
});
///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
tabsContainer.addEventListener('click', function (e) {
  // 버튼 안에 span 태그도 있어서 span 태그 있는 부분이 클릭되면 콘솔에는 버튼 태그가 뜨는게 아니라 그 해당 span 태그가 뜬다. 나는 버튼 어디가 클릭되든 버튼이 필요한데!!
  // const clicked = e.target;
  // 이렇게 하면 해결될 줄 알았는데,, 버튼 자체가 클릭되는 경우에는 또 tab--container가 떠버린다..ㅎ
  // const clicked = e.target.parentElement;
  // 이렇게 하면 버튼 자체가 클릭되어도 해당 클래스를 가진 가장 가까운 부모태그는 자기 자신, 안에 든 span 태그가 클릭되어도 똑같이 가장 가까운 부모태그는 해당 탭 버튼
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  // 지금 이 이벤트리스너가 붙어있는 곳은 tabsContainer다. 그래서 버튼 사이사이 빈 공간도 컨테이너 부분이라서 그 부분이 클릭이 되면 이 이벤트가 실행되려고 하는데 당연히 operations__tab이라는 클래스를 가진 부모태그가 없기 때문에 console.log(clicked)는 null을 리턴하고 밑에 있는 .classList.add()를 실행하다가 오류도 함께 발생한다. 이걸 방지하고자 아래처럼 아무것도 실행되지 않게 했다.
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// 나쁜 예제 ) 탭이 100개, 1000개인 경우 페이지 로드가 느려질 수 있다.
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

// Menu fade animation
// mouseover랑 mouseenter는 비슷한데 mouseenter는 bubble 기능이 없음
// mouseenter의 반대는 mouseleave, mouseover의 반대는 mouseout
const handleHover = function (e, opacity) {
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// nav.addEventListener('mouseover', handlehover(e, 0.5));는 작동하지 않는다. addEventListener 옆에 함수 넣는 자리에 함수를 넣어야하는데 함수를 넣는 순간 그 함수는 함수가 아니라 하나의 value가 된다. 근데 만들어낸 handlehover 함수는 리턴 값이 없는 함수라서 오류,,,
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// 근데 더 간단한 방법
// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigation: Intersection Observer API
// isIntersecting. 관찰 대상이 루트 요소와 교차 상태로 들어가거나( true ) 교차 상태에서 나가는지( false ) 여부를 나타내는 값(Boolean)입니다.
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

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

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  // 얘는 이미지를 로드해서 교체하고 나면 로드 이벤트를 생략해버린다?? 이게 뭔소리임
  entry.target.src = entry.target.dataset.src;

  // 아무튼 블러 필터 없애겟다고 바로 밑에 이렇게 써봤자 이미지가 교체되기 전에 필터 먼저 사라져서 저해상도 이미지가 그대로 드러나게 된다.
  // entry.target.classList.remove('lazy-img');

  // 그래서 이렇게 이벤트리스너로 로드 이벤트를 감지하고 그 안에 필터 클래스를 없애도록 한다.
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translate(-800px)';
  // slider.style.overflow = 'visible';

  // functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/*
// ========== 184. PROJECT: "Bankist" Website
// 11 01 2023 WED
// ========== 185. How the DOM Really Works
// ========== 186. Selecting, Creating, and Deleting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// document.querySelector(), document.querySelectorAll()는 사용할 때 .이나 #을 같이 써줘야한다.
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

// document.getElementsByTagName(), document.getElementsByClassName()은 HTMLCollection을 리턴한다. 얘는 화면에 변화가 생기면 실시간으로 반영이 됨
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// .prepend(message)는 앞에 .append(message)는 뒤에 message를 생성시켜준다
// 얘네는 header의 자식 요소로 생성이된다.
// dom안에서 생성되었기 때문에 한 번만 존재할 수 있다. 그래서 .prepend(message)랑 .append(message)같이 써봐야 .append()에 쓴것만 적용이된다.
// 화면에 두 번 다 띄우고 싶으면 .append(message.cloneNode(true)); 이렇게 .append(내용.cloneNode(true))로 써주면 된다.
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// 얘네는 header의 형제,자매요소로 생성이 된다.
// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // 이건 remove()가 생기기 전에 사용하던 예전 방법임
    // message.parentElement.removeChild(message);
  });

// ========== 187. Styles, Attributes and Classes
// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// message의 높이를 가져온다음 10진수의 수로 형변환을 하고 그걸 30픽셀로 설정하고 싶을 때 이렇게!
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non-standard
// logo는 이미지 파일인데 designer라는 애트리뷰트는 이미지 태그에 예상되는 기본 애트리뷰트가 아니라서 저렇게 조회하면 안 나옴 그래서 getAttribute()를 사용하는 거
// console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

// 얘는 서버 주소가 포함된 absolute url이 출력되는데
console.log(logo.src);
// 얘를 쓰면 그냥 딱 img/logo.png만 출력됨
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Don't use
logo.className = 'jonas';

// ========== 188. Implementing Smooth Scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // section1.getBoundingClientRect()는 section1의 x,y좌표를 구하는데 이게 이 웹페이지의 전체화면 기준이 아니라 viewport, 즉 내가 보는 화면 기준으로 x,y좌표를 구해다준다
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // 예전 방법
  // Scrolling
  // 위에서 구한 x,y 값에 현재 viewport가 전체화면에서 얼마나 떨어졌는지를 더해주는거임
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // 예전방법 + 부드러운 스크롤
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // 새로운 방법 + 부드러운 스크롤
  section1.scrollIntoView({ behavior: 'smooth' });

  // 아 걍 CSS에 이거 추가하면.. 끝..
  // html {
  //   scroll-behavior: smooth;
  //   }
});

// ========== 189. Types of Events and Event Handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventLister: Great! You are reading the heading :D');
};

// mouseenter 즉 마우스를 갖다 대면,
h1.addEventListener('mouseenter', alertH1);

// removeEventListener() 다시는 해당 이벤트가 한번 실행되고는 더 이상 실행되지 않는다.
// setTimeout()으로 3초 뒤에 실행되게했다
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
// 얘는 예전방식
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

// ========== 190. Event Propagation: Bubbling and Capturing
// ========== 191. Event Propagation in Practice
// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  }
  // true로 하면 얘가 먼저 실행된다. default는 false임
);

// ========== 192. Event Delegation: Implementing Page Navigation
// 13 01 2023 FRI
// ========== 193. DOM Traversing
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
// 얘는 모든 자식 요소들을 가져온다
console.log(h1.childNodes);
// 얘는 자식 태그만 가져온다
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going downwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// header라는 클래스 이름을 가진 가장 가까운 부모요소를 찾는다.
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// .querySelector()는 자식요소를 찾고 .closest()는 부모요소를 찾는다.

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// 밑에 두 개는 잘 쓰지 않음
console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
// ========== 194. Building a Tabbed Component
// ========== 195. Passing Arguments to Event Handlers
// ========== 196. Implementing a Sticky Navigation: The Scroll Event
// ========== 197. A Better Way: The Intersection Observer API
// ========== 198. Revealing Elements on Scroll
// 17 01 2023 TUE
// ========== 199. Lazy Loading Images
// ========== 200. Building a Slider Component: Part 1
// 18 01 2023 WED
// ========== 201. Building a Slider Component: Part 2
// ========== 202. Lifecycle DOM Events

// html, js만 로드되었을 때 발생하는 이벤트를 확인
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// 이미지와 css 같은 외부 파일까지 로드되었을 때 발생하는 이벤트를 확인
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// 유저가 닫기 버튼 누르기 직전에 발생하는 이벤트를 확인
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

// ========== 203. Efficient Script Loading: defer and async
