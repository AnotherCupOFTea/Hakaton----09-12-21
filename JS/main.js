// ! Create
const API = "http://localhost:8001/students";
let formSend = $(".form-send");

let inputName = $(".inp-name");
let inputSurname = $(".inp-surname");
let inputPhone = $(".inp-phone");
let inputWeekKpi = $(".inp-week_KPI");
let inputMonthKpi = $(".inp-month_KPI");
let inputImage = $(".inp-image");

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

  inputName.val("");
  inputSurname.val("");
  inputPhone.val("");
  inputWeekKpi.val("");
  inputMonthKpi.val("");
  inputImage.val("");
}

//  Read

function getStudent(api) {
  fetch(API);
}
formSend.on("submit", addUser);
