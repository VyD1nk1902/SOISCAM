//Variables
const warningHeader = document.querySelectorAll(".warning__header");
// tạo biến trỏ tới .warning__header
const scammerList = document.querySelector(".scammers__list");
const alertScamTitle = document.querySelector(".alert-scam__title");
const alertScamDesc = document.querySelector(".alert-scam__desc");
const scammerListWrap = document.querySelector(".scammers__list-wrap");
const loading = document.querySelector(".loading");
const formSearch = document.querySelector(".form-search");
let scammerData = [];
//end Variables

//GENERATE CURRUNT DAY ON TITLE
alertScamTitle.textContent = `Hôm nay ${formatDate()}`;
//end GENERATE CURRUNT DAY ON TITLE

//HANDLE DROPDOWN WARNING
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
// end HANDLE DROPDOWN WARNING

//HANDLE SHOW/CLOSE MODAL
// Lắng nghe sự kiện click để đóng modal
document.body.addEventListener("click", (e) => {
  const modal = document.querySelector(".modal");
  // Đóng modal khi nhấp vào .modal__header-close hoặc .modal__overlay
  if (e.target.matches(".modal__header-close") || e.target.matches(".modal__overlay")) {
    modal.remove();
    document.body.style.overflow = "auto";
    // } else if (e.target.matches(".modal__overlay")) {
    //   modal.remove();.
    //   document.body.style.overflow = "auto";
  } else if (e.target.matches(".scammers__item")) {
    handleShowModal(e.target.dataset.id);
  }
});
//end HANDLE SHOW/CLOSE MODAL

//HANDLE RENDER SCAMMER TODAY
function renderScammerToday(data) {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const todayData = data.filter((item) => {
    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0);
    return itemDate.getTime() === todayDate.getTime();
  });

  alertScamDesc.textContent = `CÓ ${todayData.length} CẢNH BÁO`;
  if (todayData && todayData.length > 0) {
    todayData.forEach((item) => {
      scammerList.insertAdjacentHTML("afterbegin", renderScammerItemHTML(item));
    });
  } else {
    scammerListWrap.insertAdjacentHTML("beforeend", renderNotFoundHTML("Chưa có đơn nào được tố cáo hôm nay"));
  }
}
//end HANDLE RENDER SCAMMER TODAY

//HANDLE GET SCAMMER
async function getScammer() {
  loading.classList.add("active");
  setTimeout(async () => {
    try {
      loading.classList.remove("active");
      const response = await axios.get(endpoint);
      scammerData = await response.data;
      // Lấy dữ liệu database lưu vô biến scammerData để sử dụng cho hàm khác
      renderScammerToday(scammerData);
      console.log(response.data);
    } catch (error) {
      loading.classList.remove("active");
      console.error(error);
      scammerListWrap.insertAdjacentHTML("beforeend", renderNotFoundHTML("Dữ liệu bị lỗi, vui lòng thử lại sau!"));
    }
  }, 1000);
}
getScammer();
//end  HANDLE GET SCAMMER

//HANDLE SEARCH
formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputSearch = e.target.querySelector(".form-search__input");
  window.location.href = `./scammers.html?search=${inputSearch.value}`;
});
//end HANDLE SEARCH
