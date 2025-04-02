// VARIABLES
let scammerData = [];
const dashboardTableBody = document.querySelector(".dashboard__table-body");
const dashboardTopTotal = document.querySelector(".dashboard__top-total");
const dashboardTableWrap = document.querySelector(".dashboard-table-wrap");
// end VARIABLES

// HANDLE RENDER SCAMMER PENDING
function handleRenderScammerApprove(item) {
  const tableBodyItemHTML = `
    <tr class="dashboard__table-bodyItem">
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
async function handleGetScammerApprove() {
  try {
    const response = await axios.get(endpoint);
    const scammerData = await response.data;
    const pendingScammerData = scammerData.filter((item) => item.approve === true);
    dashboardTopTotal.textContent = `(đã duyệt ${pendingScammerData.length} đơn tố cáo)`;
    if (pendingScammerData?.length > 0) {
      // (=== pendingScammerData && pendingScammerData.length)
      pendingScammerData.forEach((item) => {
        handleRenderScammerApprove(item);
      });
    } else {
      dashboardTableWrap.insertAdjacentHTML("beforeend", renderNotFoundHTML("Chưa có đơn nào", (admin = true)));
    }
  } catch (error) {}
}
handleGetScammerApprove();
// end HANDLE GET SCAMMER PENDING
