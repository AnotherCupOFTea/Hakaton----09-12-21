// ! Create
const API = "http://localhost:8001/students";
let formSend = $(".form-send");

let inputName = $(".inp-name");
let inputSurname = $(".inp-surname");
let inputPhone = $(".inp-phone");
let inputWeekKpi = $(".inp-week_KPI");
let inputMonthKpi = $(".inp-month_KPI");
let inputImage = $(".inp-image");
let tbody = $("tbody");
let deleteBtn = $(".btn-delete");

async function addUser(event) {
  event.preventDefault();
  let name = inputName.val().trim();
  let surname = inputSurname.val().trim();
  let phone = inputPhone.val().trim();
  let weekKpi = inputWeekKpi.val().trim();
  let monthKpi = inputMonthKpi.val().trim();
  let image = inputImage.val().trim();

  let newUser = {
    name,
    surname,
    phone,
    weekKpi,
    monthKpi,
    image,
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
  inputImage.val("");
}

formSend.on("submit", addUser);

//  Read
let products = [];

async function getStudent(API) {
  let response = await axios(API);

  let student = response.data;

  products = student;

  handlePagination();
}

function render(data) {
  tbody.html("");
  data.forEach((item, index) => {
    tbody.append(`
          <tr>
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>${item.surname}</td>
              <td>${item.phone}</td>
              <td>${item.weekKpi}</td>
              <td>${item.monthKpi}</td>
              <td>
                 <button class="btn btn-outline-warning">Подробнее</button>
              </td>
              <td>
                  <button id="${item.id}" class="btn btn-outline-warning btn-delete">	&#10060</button>
               </td>
          </tr>
      `);
  });
}

render(products);

// ! Pagination

const productsPerPages = 1;
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

async function deleteStudent(event) {
  let id = event.currentTarget.id;
  await axios.delete(`${API}/${id}`);
  render(products);
}

$(document).on("click", ".btn-delete", deleteStudent);

//  взять данные на копкку подробнее
let modalM = $(".modal-m");

async function getStudentToMore(event) {
  let id = event.currentTarget.id;
  let response = await axios(`${API}/${id}`);
  let { data } = response;
  modalM.html("");
  modalM.append(`
                <div class="modal-podrob ">
                        <div class="modal-more d-flex">
                            <div class="modal-more__img"> <img src="${data.image}" alt=""></div>
                            <div class="modal-more__content">
                                <h4>${data.name}</h4>
                                <h4>${data.surname}</h4>
                                 <p>${data.phone}</p>
                                 <p>${data.weekKpi}</p>
                                 <p>${data.monthKpi}</p>
                                 <button>Изменить данные</button>
                           </div>
                        </div>
                   </div>
            `);

  $(".podrob").attr("id", id);
}

$(document).on("click", ".podrob", getStudentToMore);
