// ! Create
const API = "http://localhost:8001/students";
let formSend = $(".form-send");

let inputName = $(".inp-name");
let inputSurname = $(".inp-surname");
let inputPhone = $(".inp-phone");
let inputWeekKpi = $(".inp-week_KPI");
let inputMonthKpi = $(".inp-month_KPI");
let tbody = $("tbody");
let deleteBtn = $(".btn-delete");

async function addUser(event) {
  event.preventDefault();
  let name = inputName.val().trim();
  let surname = inputSurname.val().trim();
  let phone = inputPhone.val().trim();
  let weekKpi = inputWeekKpi.val().trim();
  let monthKpi = inputMonthKpi.val().trim();

  let newUser = {
    name,
    surname,
    phone,
    weekKpi,
    monthKpi,
  };

  for (let key in newUser) {
    if (!newUser[key]) {
      alert("Заполните поля");
      return;
    }
  }

  await axios.post(API, newUser);
  getStudent(API);
  inputName.val("");
  inputSurname.val("");
  inputPhone.val("");
  inputWeekKpi.val("");
  inputMonthKpi.val("");
}

formSend.on("submit", addUser);

//  Read
let products = [];

async function getStudent(API) {
  let response = await axios(API);
  products = response.data;

  handlePagination();
}

function render(data) {
  tbody.html("");
  data.forEach((item, index) => {
    tbody.append(`
          <tr>
              <td>${index + 1}</td>
              <td>${item.name}</td>
              <td>${item.surname}</td>
              <td>${item.phone}</td>
              <td>${item.weekKpi}</td>
              <td>${item.monthKpi}</td>
              <td>
                 <button id="${
                   item.id
                 }" class="btn btn-outline-warning btn-edit">Подробнее</button>
              </td>
              <td>
                  <button id="${
                    item.id
                  }" class="btn btn-outline-warning btn-delete">	&#10060</button>
               </td>
          </tr>
      `);
  });
}

getStudent(API);

// ! Delete

async function deleteStudent(event) {
  let id = event.currentTarget.id;
  await axios.delete(`${API}/${id}`);
  getStudent(API);
}

$(document).on("click", ".btn-delete", deleteStudent);

// ! Patch

//  взять данные на копкку подробнее

let editForm = $(".edit-form");
let editName = $(".inp-edit-name");
let editSurname = $(".inp-edit-surname");
let editPhone = $(".inp-edit-phone");
let editWeekKpi = $(".inp-edit-week_KPI");
let editMonthKpi = $(".inp-edit-month_KPI");

async function getStudentToMore(event) {
  let id = event.currentTarget.id;
  $(".modal-podrob").fadeToggle(500).css("dispay", "flex");
  let response = await axios(`${API}/${id}`);
  let { data } = response;
  console.log(data);

  editName.val(data.name);
  editSurname.val(data.surname);
  editPhone.val(data.phone);
  editWeekKpi.val(data.weekKpi);
  editMonthKpi.val(data.monthKpi);

  editForm.attr("id", id);
}

$(document).on("click", ".btn-edit", getStudentToMore);

async function saveEditedStudent(event) {
  event.preventDefault();
  let id = event.currentTarget.id;

  let name = editName.val().trim();
  let surname = editSurname.val().trim();
  let phone = editPhone.val().trim();
  let weekKpi = editWeekKpi.val().trim();
  let monthKpi = editMonthKpi.val().trim();

  let newTask = {
    name,
    surname,
    phone,
    weekKpi,
    monthKpi,
  };

  for (let key in newTask) {
    if (!newTask[key]) {
      alert("Заполните все поля");
      return;
    }
  }

  await axios.patch(`${API}/${id}`, newTask);
  $(".modal-podrob").fadeToggle(500);
  getStudent(API);
  handlePagination();
}

editForm.on("submit", saveEditedStudent);

// ! Pagination

const productsPerPages = 2;
let pagesCount = 1;
let currentPage = 1;
let totalProductsCount = 0;

function handlePagination() {
  let indexOfLastProduct = currentPage * productsPerPages;
  let indexOfFirstProduct = indexOfLastProduct - productsPerPages;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  totalProductsCount = products.length;
  pagesCount = Math.ceil(totalProductsCount / productsPerPages);
  addPagination(pagesCount);
  render(currentProducts);
}

let pagination = $(".pagination");

function addPagination(pagesCount) {
  console.log(pagesCount);
  pagination.html("");
  pagination.append(`
    <li class="page-item ${+currentPage === 1 ? "disabled" : ""}">
        <a class="page-link prev-item" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
    </li>
    `);
  for (let i = 1; i <= pagesCount; i++) {
    pagination.append(`
            <li class="page-item pagination-item"><a class="page-link" href="#">${i}</a></li>
        `);
  }
  pagination.append(`
    <li class="page-item ${+currentPage === pagesCount ? "disabled" : ""}">
        <a class="page-link next-item" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>  
    `);
}

function paginate(event) {
  let newPage = event.target.innerText;
  currentPage = newPage;
  handlePagination();
}

$(document).on("click", ".pagination-item", paginate);

function prevPage() {
  currentPage--;
  handlePagination();
}

function nextPage() {
  currentPage++;
  handlePagination();
}

$(document).on("click", ".prev-item", prevPage);
$(document).on("click", ".next-item", nextPage);

render(products);

$(".open-reg").on("click", () => {
  $(".modal-main").fadeToggle(500).css("display", "flex");
});

$(".modal-close").on("click", () => {
  $(".modal-main").fadeToggle(500);
});

$(".open-student").on("click", () => {
  $(".users").fadeToggle(500).css("display", "flex");
});

$(document).on("click", "btn-edit", getStudentToMore);

$(".modal-edit-close").on("click", () => {
  $(".modal-podrob").fadeToggle(500);
});
