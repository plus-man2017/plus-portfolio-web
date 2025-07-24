// 01-27. Breakpoint, header , 01-28. 반응형 웹적용
// <div class="nav__menu" id="nav__menu">
function toggleMenu() {
  const $navMenu = document.getElementById('nav__menu');
  $navMenu.classList.toggle('show');
}

// 01-31. 부드러운 스크롤
// 1.behavior : 스크롤을 즉시 적용하거나 부드러운 애니메이션을 적용할 수 있습니다.
// css 에서는  html { scroll-behavior: smooth; }
function handleFloatingButton() {
  const $floatingButton = document.getElementById('floating-button');
  $floatingButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth',
    });
  });
}

function init() {
  const $navToggle = document.getElementById('nav-toggle');
  $navToggle.addEventListener('click', () => {
    toggleMenu();
  });

  // 링크를 선택했을 때 .show을 없애준다
  // nav__menu list의 하나 클릭시 menu로 이동 후 nav__menu list는 사라진다
  const $navLinkList = document.querySelectorAll('.nav__link');
  $navLinkList.forEach((el) => el.addEventListener('click', toggleMenu));

  // 01-31. 부드러운 스크롤
  handleFloatingButton();
}

init();

// 01-29. 스크롤시 메뉴 Active 추가 : IntersectionObserver
// IntersectionObserver API를 사용 : Active 상태를 자동으로 변경한다
// a[href*='www'] { text-decoration: none;  } : 속성값을 포함하는 요소
// ( ` )백틱은 + 문자열을 + 로 하지 않고, 그냥 문자열을 나열
// threshold: 1, : Observer API와 함께 사용됩니다, 1은 100%가 뷰포트에 표시되어야 함을 의미합니다.
const options = {
  threshold: 0.5,
};

const Observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const sectionId = entry.target.id;
    if (entry.isIntersecting) {
      // 선택시 색깔 변경
      // entry.target.classList.add('bg-dark');
      // entry.target.classList.remove('bg-dark');
      console.log('entry.target :', sectionId);
      document
        .querySelector(`.nav__link[href*=${sectionId}]`)
        .classList.add('active-link');
      const $items = document.querySelectorAll(
        `.nav__link:not([href*=${sectionId}])`,
      );
      $items.forEach((el) => el.classList.remove('active-link'));
    }
  });
}, options);

const $sectionList = document.querySelectorAll('.section');
console.log('section :', $sectionList);
$sectionList.forEach((el) => Observer.observe(el));

// 01-30. 애니메이션 적용 : ScrollReveal
// origin : 애니메에션 수치 적용 :
//  1. top : 애니메이션이 시작될 위치 : 위에서 아래로
//  2. distance : 애니메이션이 이동할 거리,  '60px': 위쪽에서 60px떨어진 위치에서
//  3. durattion : 애니메이션의 지속 시간
//  4. delay : 애니메이션이 시작되기전에 지속시간임
//  5. interval 200 : 0.2초 간격으로 보여주기

const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '60px',
  durattion: 2000,
  delay: 200,
});

// scrollReveal.reveal( '.home__data, .about__img');
// scrollReveal.reveal('.home__img', { delay: 400 });

scrollReveal.reveal('.home__data, .about__img, .skills__text');
scrollReveal.reveal('.home__img, .about__data, .skills__img', { delay: 400 });
scrollReveal.reveal('.skills__data, .work__link, .contact__input', {
  interval: 200,
});

// 01-32. 텍스트 타이밍 효과
// 1. speed	글자 하나당 타이핑 속도(ms)	speed: 50
// 2. startDelay	시작 전 대기 시간(ms)	startDelay: 1000
// 3. deleteSpeed	글자 삭제 속도	deleteSpeed: 30
// 4. lifeLike	자연스러운 타이핑 효과	lifeLike: true
// 5. loop	루프 반복 여부	loop: true
// 6. waitUntilVisible	요소가 보일 때 실행	waitUntilVisible: true
// 7. cursor	커서 표시 여부/모양 설정	cursor: true, cursorChar: "_"
const typeit = new TypeIt('#typeit', {
  speed: 70,
  startDelay: 1300,
  waitUntilVisible: true,
});

typeit
  .type('환영합니다!<br/>')
  .type(
    '<strong class="home__title-color">패키니즈 정보를 알려드리는</strong><br />',
  )
  .type('<strong class="home__title-color">유키 입니다</strong>', {
    delay: 300,
  })
  .delete(7, { delay: 300 })
  .break()
  .type('<strong class="home__title-color">YUKI</strong>입니다!')
  .go();
