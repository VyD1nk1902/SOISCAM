//Variables
const warningHeader = document.querySelectorAll(".warning__header");
// tạo biến trỏ tới .warning__header
const endpoint = "https://67e0000c7635238f9aac34d6.mockapi.io/scammers";
const scammerList = document.querySelector(".scammers__list");
const today = document.querySelector(".today");
const alertScamDesc = document.querySelector(".alert-scam__desc");
let scammerData = [];
//end Variables

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

//GENERATE CURRUNT DAY ON TITLE
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
// Thêm id để so sánh xem modal nào để truyền dữ liệu modal đó vào chính xác
function handleShowModal(id) {
  const scammer = scammerData.find((item) => item.id === id);
  const imgListHTML = scammer.images.map((item) => `<img src="${item}" alt="image scammer" />`).join("");
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
                 <h4 class="modal__info-name">${scammer.nameScammer}</h4>
                 <p class="modal__info-dsc">${scammer.id} - 
                 Tố vào ngày ${formatDate(scammer.date)}</p>
               </div>
             </div>
             <div class="modal__detail">
               <span class="modal__detail-title">Số điện thoại</span>
               <span class="modal__detail-text">${scammer.phoneScammer}</span>
             </div>
             <div class="modal__detail">
               <span class="modal__detail-title">Số tài khoản</span>
               <span class="modal__detail-text">${scammer.bankNumber}</span>
             </div>
             <div class="modal__detail">
               <span class="modal__detail-title">Ngân hàng</span>
               <span class="modal__detail-text">${scammer.bankName}</span>
             </div>
           </div>
           <div class="modal__group">
             <div class="modal__profile">
               <div class="modal__profile-avatar">
                 <img src="./assets/images/Avatars/avatar-2.png" alt="avatar-scammer" />
               </div>
               <div class="modal__info">
                 <h4 class="modal__info-name">${scammer.nameSender}</h4>
                 <p class="modal__info-dsc">Người tố cáo</p>
               </div>
             </div>
             <div class="modal__detail">
               <span class="modal__detail-title">Trạng thái</span>
               <span class="modal__detail-text">${scammer.option}</span>
             </div>
             <div class="modal__detail">
               <span class="modal__detail-title">Liên hệ</span>
               <span class="modal__detail-text">${scammer.phoneSender}</span>
             </div>
             <div class="modal__textarea">
               <span class="modal__detail-title">Nội dung tố cáo</span>
               <p class="modal__textarea-content">
                 ${scammer.contentReport}
               </p>
             </div>
             <div class="modal__images">
               <span class="modal__detail-title">Hình ảnh liên quan</span>
               <div class="modal__preview-images">
                 ${imgListHTML}
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
`;

  console.log(scammer);
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
    handleShowModal(e.target.dataset.id);
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
    scammerData = await response.data;
    // Lấy dữ liệu database lưu vô biến scammerData để sử dụng cho hàm khác
    renderScammerToday(scammerData);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
getScammer();
//end  HANDLE GET SCAMMER
