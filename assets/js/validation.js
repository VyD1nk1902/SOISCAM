// VARIABLES
const uploadImageInput = document.getElementById("uploadImages");
const form__uploadwrap = document.querySelector(".form__upload-wrap");
let arrayImage = [];

//HANDLE UPLOAD IMG
uploadImageInput.addEventListener("change", handleUploadImage);

function handleUploadImage(e) {
  const imageList = [...e.target.files];
  imageList.forEach((item) => {
    const urlImg = URL.createObjectURL(item);
    // Cho phép tạo đường dẫn local ảnh trên máy tính
    const imgHTML = `<div class="form__image-preview">
          <div class="form__preview-remove" data-url="${urlImg}">
            <img src="./assets/images/icon/close-icon.svg" alt="delete-icon" />
          </div>
          <img src="${urlImg}" alt="pic" class="form__preview-img" />
        </div>`;
    form__uploadwrap.insertAdjacentHTML("afterbegin", imgHTML);
    arrayImage.push(urlImg);
  });
}

form__uploadwrap.addEventListener("click", (e) => {
  if (e.target.matches(".form__preview-remove")) {
    const formImagePreview = e.target.parentNode;
    formImagePreview.remove();
    arrayImage = arrayImage.filter((item) => item !== e.target.dataset.url);
    console.log(arrayImage);
  }
});

// VALIDATION
Validator({
  form: "#form-report",
  formGroupSelector: ".form__group",
  errorSelector: ".form-message",
  rules: [
    // Validator.isRequired("#nameScammer", "Vui lòng nhập tên tài khoản đối tượng"),
    // Validator.minLength("#nameScammer", 6, "Nhập tối thiểu 6 ký tự"),
    // Validator.isRequired("#phoneScammer", "Nhập số điện thoại của đối tượng"),
    // Validator.isPhoneNumber("#phoneScammer"),
    // Validator.isRequired("#bankNumber", "Nhập số tài khoản đối tượng"),
    // Validator.isNumber("#bankNumber", "Vui lòng nhập số"),
    // Validator.minLength("#bankNumber", 8, "Nhập tối thiểu 8 ký tự"),
    // Validator.isRequired("#bankName", "Nhập tên ngân hàng"),
    // Validator.minLength("#bankName", 3, "Nhập tối thiểu 3 ký tự"),
    // Validator.isRequired("#contentReport", "Nhập nội dung tố cáo"),
    // Validator.minLength("#contentReport", 20, "Nhập tối thiểu 20 ký tự"),
    // Validator.isImageUploaded("#uploadImages"),
    // Validator.isRequired("#nameSender", "Vui lòng nhập tên người tố cáo"),
    // Validator.minLength("#nameSender", 6, "Nhập tối thiểu 6 ký tự"),
    // Validator.isRequired("#phoneSender", "Vui lòng nhập số điện thoại của người tố cáo"),
    // Validator.isPhoneNumber("#phoneSender"),
  ],
  onSubmit: function ({ images, ...rest }) {
    console.log({ images: arrayImage, ...rest }); // Dữ liệu form sau khi xác thực thành công
  },
  resetOnSubmit: true,
});
