const warningHeader = document.querySelectorAll(".warning__header");
// tạo biến trỏ tới .warning__header

warningHeader.forEach((item) => item.addEventListener("click", handleShowDropdown)); //truyền thao tác click -> function dropdown

function handleShowDropdown(e) {
  // const warningItem = e.target.parentNode;*
  // warningItem.classList.toggle("active"); *
  const warningContent = e.target.nextElementSibling; //biến trỏ tới .warning__content
  const warningContentAll = document.querySelectorAll(".warning__content");
  const warningIcon = e.target.querySelector(".warning__header-icon");
  const warningIconAll = document.querySelectorAll(".warning__header-icon");

  warningIconAll.forEach((item) => {
    if (item !== warningIcon) {
      item.classList.remove("active");
    }
  });

  warningContentAll.forEach((item) => {
    if (item != warningContent) {
      item.style.height = 0;
      item.classList.remove("active");
    }
    // nếu item ko p là content đang được chọn thì height sẽ = 0 và rm active
  }); // các warning__content sẽ tự động inactive khi click tới cái khác

  warningContent.style.height = `${warningContent.scrollHeight}px`;
  warningContent.classList.toggle("active");
  warningIcon.classList.toggle("active");

  if (!warningContent.classList.contains("active")) {
    warningContent.style.height = 0;
  } //nếu không phải warningContent được click(active) thì ẩn
}
