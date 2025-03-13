const warningHeader = document.querySelectorAll(".warning__header");

warningHeader.forEach((item) => item.addEventListener("click", handleShowDropdown));

function handleShowDropdown(e) {
  console.log(e.target.parentNode);
}

function handleShowDropdown(e) {
  // const warningItem = e.target.parentNode;*
  // warningItem.classList.toggle("active"); *
}
