//VARIABLES
const header = document.querySelector(".header");
const headerHeight = header.offsetHeight;
const marginTopHeader = parseFloat(getComputedStyle(header).marginTop);
const totalHeaderHeight = headerHeight + marginTopHeader;
let isFixed = false;

const openMenuBtn = document.querySelector(".header__open-menu");
const closeMenuBtn = document.querySelector(".header__close-menu");
const headerNavList = document.querySelector(".header__nav-list");

//end VARIABLES

//HANDLE FIXED MENU
window.addEventListener("scroll", () => {
  if (window.scrollY > totalHeaderHeight && !isFixed) {
    header.classList.add("fixed");
    document.body.classList.add("active");
    isFixed = true;
  } else if (window.scrollY <= totalHeaderHeight && isFixed) {
    header.classList.remove("fixed");
    document.body.classList.remove("active");
    isFixed = false;
  }
});
//end HANDLE FIXED MENU

//HANDLE SHOW MENU MOBILE, TABLET
openMenuBtn.addEventListener("click", handleShowMenu);
closeMenuBtn.addEventListener("click", handleHideMenu);
function handleShowMenu() {
  headerNavList.classList.add("active");
  document.body.style.overflow = "hidden";
}
function handleHideMenu() {
  headerNavList.classList.remove("active");
  document.body.style.overflow = "auto";
}
//end HANDLE SHOW MENU MOBILE, TABLET
