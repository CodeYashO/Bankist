'use strict';

///////////////////////////////////////
// Modal window

const header = document.querySelector('.header__title');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnscrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach( cur => {
  cur.addEventListener('click' , openModal)
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////
///scrolling.....
btnscrollto.addEventListener('click', function () {
  let height = section1.getBoundingClientRect();
  console.log(height);
  console.log(window.pageXOffset);
  console.log(window.pageYOffset);

  window.scrollTo({
    left : height.left + window.pageXOffset , 
    top :  height.top + window.pageYOffset,
    behavior : `smooth`,
  });

  // section1.scrollIntoView({
  //   behavior: 'smooth'
  // });

});

/////////////////////////////////
/////practice....
document.querySelector('.nav__links').addEventListener('click' , function (e) {
  console.log(e.target);
  e.preventDefault();

let at = e.target.getAttribute('href');

 ///////------from if/else statement////
 if(e.target.classList.contains('nav__link')){
   document.querySelector(at).scrollIntoView({behavior : `smooth` });
 }

 ///////--------from ternary-operator///
  // e.target.classList.contains('nav__link') ? document.querySelector(at).scrollIntoView({behavior:`smooth`}) : console.log(`not a target`);
});

///////////////////////////////
//---window-scrolling--count
// window.addEventListener('scroll' , function (){
//   console.log(window.pageYOffset);
// });
// console.log(window.pageYOffset);

///////////////////////////////
///---DOM TRAVERSING

let h1 = document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
console.log(h1.firstElementChild);
console.log(h1.lastElementChild);

//////-----parent
console.log(h1.parentNode);   
console.log(h1.parentElement);


////////-------TABBED COMPONENT-----////
const tabs = document.querySelectorAll('.operations__tab');
const container = document.querySelector('.operations__tab-container');
const contents = document.querySelectorAll('.operations__content');

container.addEventListener('click' , (e) => {
  let clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  ////////-----remove active tab-----//////
  tabs.forEach( function (t) {
    console.log(t);
    t.classList.remove('operations__tab--active');
    console.log(t);
  });

  ///////----remove active content----/////
  contents.forEach( function (c) {
    c.classList.remove('operations__content--active')
    console.log(c);
  });

  clicked.classList.add('operations__tab--active');
  console.log(clicked.dataset.tab);

  ////////------active content----///////
 let activecontent = document.querySelector(`.operations__content--${clicked.dataset.tab}`);

 activecontent.classList.add('operations__content--active');

});//////---TABBED COMPONENT COMPLETE----/////


///////----MENU FADE ANIMATION----///////

const links = document.querySelectorAll('.nav__link');
const nav = document.querySelector('.nav');

nav.addEventListener('mouseover' , function (e){
  if(e.target.classList.contains('nav__link'))
  {
    console.log(e.target);

    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo =  link.closest('.nav').querySelector('img');

    /////-----same work as above-----////
    // const link = e.target;
    // const siblings = nav.querySelectorAll('.nav__link');
    // const logo =  nav.querySelector('img');

    siblings.forEach( function (s) {
      if( s !== link){
        s.style.opacity = 0.5;
      }
    });

    logo.style.opacity = 0.5;

  }
});

nav.addEventListener('mouseout' , function (e){

  if(e.target.classList.contains('nav__link'))
  {
    console.log(e.target);

    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach( function (s) {
      if( s !== link){
        s.style.opacity = 1;
      }
    });

    logo.style.opacity = 1;

  }
});////////---MENU FADE ANIMATION COMPLETED----///////

/////----STICKY NAV BAR----//////

let header_ = document.querySelector('.header');
let navheight = nav.getBoundingClientRect().height;
console.log(navheight);

let  obsoptions = {
  root : null ,
  threshold : 0 ,
  rootMargin : `-${navheight}px`,
}

let obscallbackfun = function (entries) {
  let [entry] = entries;
  if( !entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky');
}

new IntersectionObserver(obscallbackfun , obsoptions ).observe(header_);

let callbackfun = function ( entries , observer) {
  // entries.forEach( entry => {
  //   console.log(entry);
  // })
  console.log(entries); 
}

// let obsoptions = {
//   root : null,
//   threshold : 0.10,
// }

let observer = new IntersectionObserver(callbackfun , obsoptions);
observer.observe(section1);


///-----ANIMATIONS IN SECTIONS------////////////////
let allsections = document.querySelectorAll('.section');

 let sectioncallback = function (entries,observer){
  console.log(entries);
  let [entry] = entries;
  console.log(entry)
  if(entry.isIntersecting) {
  entry.target.classList.remove('section--hidden')}

  // observer.unobserve(entry.target);
 }

let sectionobserver = new IntersectionObserver( sectioncallback , {
  root : null,
  threshold : 0.15,
} );

allsections.forEach( section => {
  sectionobserver.observe(section);
  section.classList.add('section--hidden')
})


///////----LAZY IMAGE LOADING----/////
const imgtargets = document.querySelectorAll('img[data-src]');
// console.log(imgtargets);

const imgcallback = function (entries,observer) {
  console.log(entries);
  let [entry] = entries;
  console.log(entry);

  if(entry.isIntersecting){
    entry.target.src = entry.target.dataset.src; 
  }

  entry.target.addEventListener('load' , () => {
    entry.target.classList.remove('lazy-img')
  })

}

const imgobject ={
  root : null,
  // rootMargin : `100px`,
  threshold : 0.40,
}

let imgobserver = new IntersectionObserver(imgcallback, imgobject)
imgtargets.forEach( i => {
  imgobserver.observe(i);
})
 
console.log(imgtargets);


/////////-----SLIDER----/////

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');

const btnleft = document.querySelector('.slider__btn--left');
const btnright = document.querySelector('.slider__btn--right');

slider.style.transform = 'scale(0.8) translateX(00px)';
// slider.style.overflow = 'visible';


slides.forEach( (s , i) => {
  s.style.transform = `translateX( ${100 * i}%)`;
});

const maxlength = slides.length;
const minlength = slides.length - 4;
console.log(maxlength);
console.log(minlength);

let curslide = 0;
btnright.addEventListener("click", function (){

  // //////------ORIGINAL------///////////////////////////
  // if( curslide === maxlength - 1){
  //   curslide = 0;
  // }else{
  //   curslide++;
  // }

  // slides.forEach(( s , i) => {
  //   s.style.transform = `translateX( ${100 * (i - curslide)}% )`;
  // })
  // ////////------ORIGINAL------///////////////////////// 


///////------1 ATTEMPT------///////////////////////////////

  if( curslide < maxlength-1){
      curslide++;
  
      slides.forEach(( s , i) => {
        s.style.transform = `translateX( ${100 * (i - curslide)}% )`;
      });
  }
///////------1 ATTEMPT------///////////////////////////////

});

btnleft.addEventListener("click", function (){
  ///-------ORIGINAL-------/////////////////////////////
  // if( curslide === 0){
  //   curslide = maxlength-1;
  // }else{
  //   curslide--;
  // }

  // slides.forEach((s,i)=>{
  //   s.style.transform = `translateX(${100*(i-curslide)}%)`;
  // })
  // //////////-------ORIGINAL-------////////////////////////


  //////-----1 ATTEMPT-----////////////////////////////////
  if( curslide <= 0){
    return; ////// guard-clause-!
  }
  console.log(curslide);
  if( curslide <= maxlength-1){
    curslide--;
    slides.forEach(( s , i) => {
      console.log(s,i);
      s.style.transform = `translateX( ${100 * (i - curslide)}% )`;
    })
  }
 //////-----1 ATTEMPT-----////////////////////////////////

})

