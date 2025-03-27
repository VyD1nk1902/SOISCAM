const endpoint = "https://67e0000c7635238f9aac34d6.mockapi.io/scammers";

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

//RENDER MODAL HTML
function renderModalHTML(itemData) {
  const imgListHTML = itemData.images
    .map(
      (item, index) => `
    <a href="${item}">
    <img src="${item}" alt="Ảnh bằng chứng scam ${itemData.nameScammer} ${index + 1}"   />
    </a>
  `
    )
    .join("");
  return ` 
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
                   <h4 class="modal__info-name">${itemData.nameScammer}</h4>
                   <p class="modal__info-dsc">${itemData.id} - 
                   Tố vào ngày ${formatDate(itemData.date)}</p>
                 </div>
               </div>
               <div class="modal__detail">
                 <span class="modal__detail-title">Số điện thoại</span>
                 <span class="modal__detail-text">${itemData.phoneScammer}</span>
               </div>
               <div class="modal__detail">
                 <span class="modal__detail-title">Số tài khoản</span>
                 <span class="modal__detail-text">${itemData.bankNumber}</span>
               </div>
               <div class="modal__detail">
                 <span class="modal__detail-title">Ngân hàng</span>
                 <span class="modal__detail-text">${itemData.bankName}</span>
               </div>
             </div>
             <div class="modal__group">
               <div class="modal__profile">
                 <div class="modal__profile-avatar">
                   <img src="./assets/images/Avatars/avatar-2.png" alt="avatar" />
                 </div>
                 <div class="modal__info">
                   <h4 class="modal__info-name">${itemData.nameSender}</h4>
                   <p class="modal__info-dsc">Người tố cáo</p>
                 </div>
               </div>
               <div class="modal__detail">
                 <span class="modal__detail-title">Trạng thái</span>
                 <span class="modal__detail-text">${itemData.option}</span>
               </div>
               <div class="modal__detail">
                 <span class="modal__detail-title">Liên hệ</span>
                 <span class="modal__detail-text">${itemData.phoneSender}</span>
               </div>
               <div class="modal__textarea">
                 <span class="modal__detail-title">Nội dung tố cáo</span>
                 <p class="modal__textarea-content">
                   ${itemData.contentReport}
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
}
//end RENDER MODEL HTML

//HANDLE SHOW MODAL
// Hàm thêm trang modal vào đầu trang (trong body) và tự ẩn scrollbar
// Thêm id để so sánh xem modal nào để truyền dữ liệu modal đó vào chính xác
function handleShowModal(id) {
  const scammer = scammerData.find((item) => item.id === id);

  console.log(scammer);
  document.body.insertAdjacentHTML("afterbegin", renderModalHTML(scammer));
  document.body.style.overflow = "hidden";
  lightGallery(document.querySelector(".modal__preview-images"), {
    plugins: [lgThumbnail],
  });
}
//end HANDLE SHOW MODAL

//RENDER SCAMMER ITEM HTML
function renderScammerItemHTML(itemData) {
  return `
      <li class="scammers__item" data-id = "${itemData.id}" >
      <img src="./assets/images/Avatars/avatar-1.png" alt="avatar" class="scammer__avatar" />
      <div class="scammer__info">
        <h3 class="scammer__name">${itemData.nameScammer}</h3>
        <div class="scammer__date">${itemData.id} - ${formatDate(itemData.date)}</div>  
      </div>
      </li> 
    `;
}
//end RENDER SCAMMER ITEM HTML

//RENDER NOT FOUND HTML
function renderNotFoundHTML(message = "Không có dữ liệu") {
  return `
    <div class="not-found">
      <img src="./assets/images/logo/not-found.svg" alt="not-found" />
      <span>${message}</span>
    </div>
    `;
}
//RENDER NOT FOUND HTML
