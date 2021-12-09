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
async function getStudent(API) {
  let response = await axios(API);
  console.log(response);
}

getStudent(API);
async function getStudent(API){
    let response = await axios(API); 
    let student = response.data;
    tbody.html("");
    student.forEach((item) => {
        tbody.append(`
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.surname}</td>
            <td>${item.phone}</td>
            <td>${item.weekKpi}</td>
            <td>${item.monthKpi}</td>
            <td>
               <button class="btn btn-outline-warning podrob" id="${item.id}">Подробнее</button>
            </td>
            <td>
                <button id="${item.id}" class="btn btn-outline-warning btn-delete">	&#10060</button>
             </td>
        </tr>
    `)
    })
       
    
  
    
}

getStudent(API);


 async function deleteStudent(event){
     let id = event.currentTarget.id
     await axios.delete(`${API}/${id}`)
     getStudent(API);    
 }

 $(document).on("click" , ".btn-delete" , deleteStudent)


//  взять данные на копкку подробнее
let modalM = $(".modal-m");

async function getStudentToMore(event){

    let id = event.currentTarget.id;
   let response =  await axios(`${API}/${id}`);
   let {data} = response;
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
            `)

    $(".podrob").attr("id", id);
}

$(document).on("click", ".podrob", getStudentToMore);






    

