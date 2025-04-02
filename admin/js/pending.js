// VARIABLES
let scammerData = [];
const dashboardTableBody = document.querySelector(".dashboard__table-body");
const dashboardTopTotal = document.querySelector(".dashboard__top-total");
const dashboardTableWrap = document.querySelector(".dashboard-table-wrap");
// end VARIABLES

// HANDLE RENDER SCAMMER PENDING
function handleRenderScammerUnapprove(item) {
  const tableBodyItemHTML = `
    <tr class="dashboard__table-bodyItem" data-id="${item.id}" >
        <td>#${item.id}</td>
        <td>${item.nameScammer}</td>
        <td>${item.bankNumber}</td>
        <td>${item.bankName}</td>
        <td>${item.phoneScammer}</td>
        <td>${item.nameSender}</td>
        <td>${formatDate(item.date)}</td>
        <td class="table-action">
            <span class="table-action__icon table-action__view">
                <i class="fa-solid fa-eye"></i>
            </span>
            <span class="table-action__icon table-action__remove">
                <i class="fa-solid fa-trash"></i>
            </span>
        </td>
    </tr>
    `;
  dashboardTableBody.insertAdjacentHTML("afterbegin", tableBodyItemHTML);
}
// end HANDLE RENDER SCAMMER PENDING

// HANDLE GET SCAMMER PENDING
async function handleGetScammerUnapprove() {
  dashboardTableBody.innerHTML = "";
  try {
    const response = await axios.get(endpoint);
    scammerData = await response.data;
    const pendingScammerData = scammerData.filter((item) => item.approve === false);
    dashboardTopTotal.textContent = `(có ${pendingScammerData.length} đơn tố cáo đợi duyệt)`;
    if (pendingScammerData?.length > 0) {
      // (=== pendingScammerData && pendingScammerData.length)
      pendingScammerData.forEach((item) => {
        handleRenderScammerUnapprove(item);
      });
    } else {
      dashboardTableWrap.insertAdjacentHTML("beforeend", renderNotFoundHTML("Chưa có đơn nào", (admin = true)));
    }
  } catch (error) {}
}
handleGetScammerUnapprove();
// end HANDLE GET SCAMMER PENDING

// HANDLE VIEW SCAMMER
document.body.addEventListener("click", (e) => {
  const modal = e.target.closest(".modal");
  if (e.target.matches(".table-action__view")) {
    const scammerItem = e.target.closest(".dashboard__table-bodyItem");
    handleShowModal(scammerItem.dataset.id);
  } else if (e.target.matches(".modal__header-close") || e.target.matches(".modal__overlay")) {
    modal.remove();
  }
});
// end HANDLE VIEW SCAMMER

// HANDLE REMOVE SCAMMER

async function handleRemove(id) {
  try {
    await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Cân nhắc trước khi xóa - Không thể khôi phục!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#db2828",
      cancelButtonColor: "#3085D6",
      confirmButtonText: "Xóa!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(`${endpoint}/${id}`);
        await handleGetScammerUnapprove();
        console.log(response.data);
        Swal.fire({
          title: "Đã xóa!",
          text: "File được chọn đã xóa.",
          icon: "success",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

document.body.addEventListener("click", (e) => {
  if (e.target.matches(".table-action__remove")) {
    const scammerItem = e.target.closest(".dashboard__table-bodyItem");
    handleRemove(scammerItem.dataset.id);
  }
});
// end HANDLE REMOVE SCAMMER
