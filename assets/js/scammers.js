//VARIABLES
const alertScamDesc = document.querySelector(".alert-scam__desc");
const scammerList = document.querySelector(".scammers__list");
const loading = document.querySelector(".loading");
const scammerListWrap = document.querySelector(".scammers__list-wrap");
const formSearch = document.querySelector(".form-search");
const inputSearch = document.querySelector(".form-search__input");

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("search");
let scammerData = [];
//end VARIABLES
console.log(query);

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

//HANDLE RENDER SCAMMER ALL
function renderScammerAll(data) {
  const todayDate = new Date();

  alertScamDesc.textContent = `CÓ ${data.length} CẢNH BÁO`;
  if (data && data.length > 0) {
    data.forEach((item) => {
      scammerList.insertAdjacentHTML("afterbegin", renderScammerItemHTML(item));
    });
  } else {
    scammerListWrap.insertAdjacentHTML("beforeend", renderNotFoundHTML("Không có đơn nào!"));
  }
}
//end HANDLE RENDER SCAMMER ALL

//HANDLE GET SCAMMER
async function getScammer() {
  loading.classList.add("active");
  setTimeout(async () => {
    try {
      loading.classList.remove("active");
      const response = await axios.get(endpoint);
      scammerData = await response.data;
      // Lấy dữ liệu database lưu vô biến scammerData để sử dụng cho hàm khác
      const approveScammerData = scammerData.filter((item) => item.approve === true);
      // Lấy ScammerData lọc qa mục approve để kiểm duyệt đơn trên trang admin
      if (query) {
        const filterData = approveScammerData.filter(
          (item) =>
            item.bankNumber.includes(query.trim()) ||
            item.phoneScammer.includes(query.trim()) ||
            removeTextNoMark(item.nameScammer).includes(removeTextNoMark(query))
        );
        renderScammerAll(filterData);
      } else {
        renderScammerAll(approveScammerData);
      }
      console.log(response.data);
    } catch (error) {
      loading.classList.remove("active");
      console.error(error);
      scammerListWrap.insertAdjacentHTML("beforeend", renderNotFoundHTML("Dữ liệu bị lỗi, vui lòng thử lại sau!"));
    }
  }, 2000);
}
getScammer();
//end  HANDLE GET SCAMMER

//HANDLE SEARCH SCAMMER
inputSearch.value = query;
formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  urlParams.set("search", inputSearch.value);
  window.location.search = urlParams.toString();
});
//HANDLE SEARCH SCAMMER
