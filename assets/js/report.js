//VARIABLES
const apiKey = "314724b374fc04be181b9d3398e6dd88";
const endpoint = "https://67e0000c7635238f9aac34d6.mockapi.io/scammers";
const uploadImageInput = document.getElementById("uploadImages");
const form__uploadwrap = document.querySelector(".form__upload-wrap");
let arrayImage = [];
const phoneScammerInput = document.getElementById("phoneScammer");
const bankNumberInput = document.getElementById("bankNumber");
const phoneSenderInput = document.getElementById("phoneSender");
const contentReportInput = document.getElementById("contentReport");
//end VARIABLES

//HANDLE CONTENT REPORT INPUT
contentReportInput.addEventListener("input", (e) => {
  e.target.style.height = "auto";
  e.target.style.height = `${e.target.scrollHeight}px`;
});

//end HANDLE CONTENT REPORT INPUT

//HANDLE INPUT ONLY NUMBER
phoneScammerInput.addEventListener("keypress", handleInputOnlyNumber);
bankNumberInput.addEventListener("keypress", handleInputOnlyNumber);
phoneSenderInput.addEventListener("keypress", handleInputOnlyNumber);

function handleInputOnlyNumber(e) {
  if (e.charCode < 48 || e.charCode > 57) {
    e.preventDefault();
  }
}
//end HANDLE INPUT ONLY NUMBER

//HANDLE UPLOAD IMGBB

async function uploadImgBB(file) {
  const formData = new FormData();
  // Thêm file hình ảnh vào FormData để gửi lên server
  formData.append("image", file);

  try {
    // Gửi yêu cầu POST đến API ImgBB với đường dẫn endpoint và apiKey bằng axios
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);

    // Trả về URL của hình ảnh sau khi tải lên thành công
    return response.data.data.url;
  } catch (error) {
    // Bắt lỗi nếu có vấn đề xảy ra trong quá trình tải lên
    console.log(error);
    return null; // Trả về null nếu gặp lỗi
  }
}

//end HANDLE UPLOAD IMGBB

//HANDLE UPLOAD IMG
uploadImageInput.addEventListener("change", handleUploadImage);

async function handleUploadImage(e) {
  const imageList = [...e.target.files];
  imageList.forEach(async (item) => {
    const urlImg = await uploadImgBB(item);
    // Cho phép upload ảnh trên máy tính lên host server ImgBB
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
//end HANDLE UPLOAD IMG

// VALIDATION
Validator({
  form: "#form-report",
  formGroupSelector: ".form__group",
  errorSelector: ".form-message",
  rules: [
    Validator.isRequired("#nameScammer", "Vui lòng nhập tên tài khoản đối tượng"),
    Validator.minLength("#nameScammer", 6, "Nhập tối thiểu 6 ký tự"),
    Validator.isRequired("#phoneScammer", "Nhập số điện thoại của đối tượng"),
    Validator.isPhoneNumber("#phoneScammer"),
    Validator.isRequired("#bankNumber", "Nhập số tài khoản đối tượng"),
    Validator.isNumber("#bankNumber", "Vui lòng nhập số"),
    Validator.minLength("#bankNumber", 8, "Nhập tối thiểu 8 ký tự"),
    Validator.isRequired("#bankName", "Nhập tên ngân hàng"),
    Validator.minLength("#bankName", 3, "Nhập tối thiểu 3 ký tự"),
    Validator.isRequired("#contentReport", "Nhập nội dung tố cáo"),
    Validator.minLength("#contentReport", 20, "Nhập tối thiểu 20 ký tự"),
    Validator.isImageUploaded("#uploadImages"),
    Validator.isRequired("#nameSender", "Vui lòng nhập tên người tố cáo"),
    Validator.minLength("#nameSender", 6, "Nhập tối thiểu 6 ký tự"),
    Validator.isRequired("#phoneSender", "Vui lòng nhập số điện thoại của người tố cáo"),
    Validator.isPhoneNumber("#phoneSender"),
  ],
  onSubmit: async function ({ images, ...rest }) {
    console.log({ images: arrayImage, ...rest }); // Dữ liệu form sau khi xác thực thành công
    const formImagePreviews = document.querySelectorAll(".form__image-preview");
    try {
      axios.post(endpoint, {
        images: arrayImage,
        date: new Date(),
        ...rest,
      });
      FuiToast.success("Gửi đơn thành công.");
      formImagePreviews.forEach((item) => item.remove());
    } catch (error) {
      console.log(error);
      FuiToast.error("Gửi đơn thất bại.");
      formImagePreviews.forEach((item) => item.remove());
    }
  },
  resetOnSubmit: true,
});
//end VALIDATION
