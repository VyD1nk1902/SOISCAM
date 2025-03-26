// MODAL DETAIL SCAMMER
const ModalHTML = `
 <section class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__content">
          <div class="modal__header">
            <div class="modal__header-title">Chi tiết tố cáo</div>
            <div class="modal__header-close">
              <img src="./assets/images/icon/close-icon.svg" alt="close icon" />
            </div>
          </div>
          <div class="modal__body">
            <div class="modal__group">
              <div class="modal__profile">
                <div class="modal__profile-avatar">
                  <img src="./assets/images/Avatars/avatar-1.png" alt="avatar-scammer" />
                </div>
                <div class="modal__info">
                  <h4 class="modal__info-name">Nguyễn Văn A</h4>
                  <p class="modal__info-dsc">#50 - Tố vào ngày 12/02/2024</p>
                </div>
              </div>
              <div class="modal__detail">
                <span class="modal__detail-title">Số điện thoại</span>
                <span class="modal__detail-text">0333990859</span>
              </div>
              <div class="modal__detail">
                <span class="modal__detail-title">Số tài khoản</span>
                <span class="modal__detail-text">342423443</span>
              </div>
              <div class="modal__detail">
                <span class="modal__detail-title">Ngân hàng</span>
                <span class="modal__detail-text">ACB</span>
              </div>
            </div>
            <div class="modal__group">
              <div class="modal__profile">
                <div class="modal__profile-avatar">
                  <img src="./assets/images/Avatars/avatar-2.png" alt="avatar-scammer" />
                </div>
                <div class="modal__info">
                  <h4 class="modal__info-name">Nguyễn Văn B</h4>
                  <p class="modal__info-dsc">Người tố cáo</p>
                </div>
              </div>
              <div class="modal__detail">
                <span class="modal__detail-title">Trạng thái</span>
                <span class="modal__detail-text">Nạn nhân</span>
              </div>
              <div class="modal__detail">
                <span class="modal__detail-title">Liên hệ</span>
                <span class="modal__detail-text">0356655665</span>
              </div>
              <div class="modal__textarea">
                <span class="modal__detail-title">Nội dung tố cáo</span>
                <p class="modal__textarea-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente asperiores,
                  tenetur eius a, nemo incidunt necessitatibus sunt vitae voluptates molestias
                  aliquid explicabo dolore quia possimus fugiat eveniet veniam inventore nisi.
                </p>
              </div>
              <div class="modal__images">
                <span class="modal__detail-title">Hình ảnh liên quan</span>
                <div class="modal__preview-images">
                  <img
                    src="https://images.unsplash.com/photo-1726066012751-2adfb5485977?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="image scammer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1726066012751-2adfb5485977?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="image scammer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1726066012751-2adfb5485977?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="image scammer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1726066012751-2adfb5485977?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="image scammer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
`;
// end MODAL DETAIL SCAMMER

const warningHeader = document.querySelectorAll(".warning__header");
// tạo biến trỏ tới .warning__header

const endpoint = "https://67e0000c7635238f9aac34d6.mockapi.io/scammers";
const scammerList = document.querySelector(".scammers__list");
const today = document.querySelector(".today");
const alertScamDesc = document.querySelector(".alert-scam__desc");

//HANDLE FORMAT DATE
function formatDate(dateString) {
  const date = dateString ? new Date(dateString) : new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formatDate = day < 10 ? `0${day}` : `${day}`;
  const formatMonth = month < 10 ? `0${month}` : `${month}`;
  return `${formatDate}/${formatMonth}/${year}`;
}
//end HANDLE FORMAT DATE

// GENERATE CURRUNT DAY ON TITLE
if (today) {
  today.textContent = `Hôm nay ${formatDate()}`;
}
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

//HANDLE SHOW MODAL
// Lắng nghe sự kiện click trên các phần tử trong scammerItems
// scammerItems.forEach((item) => item.addEventListener("click", handleShowModal));

// Hàm thêm trang modal vào đầu trang (trong body) và tự ẩn scrollbar
function handleShowModal() {
  document.body.insertAdjacentHTML("afterbegin", ModalHTML);
  document.body.style.overflow = "hidden";
}

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
    handleShowModal();
  }
});

//end HANDLE SHOW MODAL

//HANDLE RENDER SCAMMER
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
      const scammerItemHTML = `
      <li class="scammers__item" data-id = "${item.id}" >
      <img src="./assets/images/Avatars/avatar-1.png" alt="avatar" class="scammer__avatar" />
      <div class="scammer__info">
        <h3 class="scammer__name">${item.nameScammer}</h3>
        <div class="scammer__date">${item.id} - ${formatDate(item.date)}</div>
      </div>
      </li> 
            `;
      scammerList.insertAdjacentHTML("afterbegin", scammerItemHTML);
    });
  }
}
//end HANDLE RENDER SCAMMER

//HANDLE GET SCAMMER
async function getScammer() {
  try {
    const response = await axios.get(endpoint);
    const data = await response.data;
    renderScammerToday(data);

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
getScammer();
//end  HANDLE GET SCAMMER
