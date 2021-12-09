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
async function getStudent(API){
    let response = await axios(API); 
    let student = response.data;
    tbody.html("");
    student.forEach((item, index) => {
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
    `)
    })
       
    
  
    
}

getStudent(API);