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
  onSubmit: function (data) {
    console.log(data); // Dữ liệu form sau khi xác thực thành công
  },
  resetOnSubmit: true,
});
