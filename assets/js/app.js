// Header fixed
const header = document.querySelector(".header");
const headerHeight = header.offsetHeight;
const marginTopHeader = parseFloat(getComputedStyle(header).marginTop);
const totalHeaderHeight = headerHeight + marginTopHeader;
let isFixed = false;

window.addEventListener("scroll", () => {
  if (window.scrollY > totalHeaderHeight && !isFixed) {
    header.classList.add("fixed");
    document.body.style.paddingTop = `${totalHeaderHeight}px`;
    isFixed = true;
  } else if (window.scrollY <= totalHeaderHeight && isFixed) {
    header.classList.remove("fixed");
    document.body.style.paddingTop = "0px";
    isFixed = false;
  }
});
