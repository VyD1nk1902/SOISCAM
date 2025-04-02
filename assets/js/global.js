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
              <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.837891 8.90333C0.392578 9.34083 0.376953 10.1611 0.853516 10.6377C1.32227 11.1065 2.14258 11.0908 2.58008 10.6455L5.99414 7.23926L9.39258 10.6455C9.85352 11.0986 10.6582 11.1065 11.127 10.6299C11.6035 10.1533 11.5957 9.35645 11.1426 8.89551L7.73633 5.49708L11.1426 2.09083C11.5957 1.62989 11.6035 0.833014 11.127 0.356451C10.6582 -0.120111 9.85352 -0.112299 9.39258 0.340826L5.99414 3.74708L2.58008 0.340826C2.14258 -0.104486 1.32227 -0.120111 0.853516 0.356451C0.376953 0.825202 0.392578 1.64551 0.837891 2.08301L4.24414 5.49708L0.837891 8.90333Z" fill="#CCCCCC"/>
              </svg>
             </div>
           </div>
           <div class="modal__body">
             <div class="modal__group">
               <div class="modal__profile">
                 <div class="modal__profile-avatar">
                   <img src="https://i.ibb.co/HLYDdhBd/avatar-1.png" alt="avatar-scammer" />
                 </div>
                 <div class="modal__info">
                   <h4 class="modal__info-name">${itemData.nameScammer}</h4>
                   <p class="modal__info-dsc">${itemData.id} - 
                   Tố vào ngày ${formatDate(itemData.date)}</p>
                 </div>
               </div>
               <div class="modal__detail">
                 <span class="modal__detail-title">Số điện thoại</span>
                 <span class="modal__detail-text text-single">${itemData.phoneScammer}</span>
               </div>
               <div class="modal__detail">
                 <span class="modal__detail-title">Số tài khoản</span>
                 <span class="modal__detail-text text-single">${itemData.bankNumber}</span>
               </div>
               <div class="modal__detail">
                 <span class="modal__detail-title">Ngân hàng</span>
                 <span class="modal__detail-text text-single">${itemData.bankName}</span>
               </div>
             </div>
             <div class="modal__group">
               <div class="modal__profile">
                 <div class="modal__profile-avatar">
                   <img src="https://i.ibb.co/67tXWcwb/avatar-2.png" alt="avatar" />
                 </div>
                 <div class="modal__info">
                   <h4 class="modal__info-name">${itemData.nameSender}</h4>
                   <p class="modal__info-dsc">Người tố cáo</p>
                 </div>
               </div>
               <div class="modal__detail">
                 <span class="modal__detail-title">Trạng thái</span>
                 <span class="modal__detail-text text-single">${itemData.option}</span>
               </div>
               <div class="modal__detail">
                 <span class="modal__detail-title">Liên hệ</span>
                 <span class="modal__detail-text text-single">${itemData.phoneSender}</span>
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
        <h3 class="scammer__name text-single">${itemData.nameScammer}</h3>
        <div class="scammer__date">${itemData.id} - ${formatDate(itemData.date)}</div>  
      </div>
      </li> 
    `;
}
//end RENDER SCAMMER ITEM HTML

//RENDER NOT FOUND HTML
function renderNotFoundHTML(message = "Không có dữ liệu", admin = false) {
  return `
    <div class="not-found">
      <img src="${admin === false ? "./assets/images/logo/not-found.svg" : "../assets/images/logo/not-found.svg"}" />
      <span>${message}</span>
    </div>
    `;
}
//RENDER NOT FOUND HTML

// Remove text no mark
function removeTextNoMark(str) {
  // remove accents
  var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-");

  return str;
}
//end Remove text no mark
