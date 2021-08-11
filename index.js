const taskContainer = document.querySelector(".task__container");
let globalTaskData = [];
const genarateHtml=(taskData)=>`<div id=${taskData.id} class="col-md-6 col-lg-4 my-4">
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button class="btn btn-outline-info">
      <i class="fal fa-pencil"></i>
    </button>
    <button class="btn btn-outline-danger">
      <i class="far fa-trash-alt"></i>
    </button>
  </div>
  <div class="card-body">
    <img
      src=${taskData.image}
      alt="image"
      class="card-img"
    />
    <h5 class="card-title mt-4">${taskData.title}</h5>
    <p class="card-text">
    ${taskData.description}
    </p>
    <span class="badge bg-primary">${taskData.type}</span>
  </div>
  <div class="card-footer">
    <button class="btn btn-outline-primary">Open Task</button>
  </div>
</div>
</div>`
 
const insertintoDom=(content)=>    taskContainer.insertAdjacentHTML("beforeend", content);

const addNewCard = () => {
    const taskData = {
      id: `${Date.now()}`,
       title:document.getElementById("taskTitle").value,
       image: document.getElementById("imageURL").value,
       type:document.getElementById("taskType").value,
       description:document.getElementById("taskDescrption").value,

    };
    globalTaskData.push(taskData);
    //update the local storage
    localStorage.setItem("taskyCA",JSON.stringify({card :globalTaskData}));



    const newCard = genarateHtml(taskData);
    insertintoDom(newCard);


    document.getElementById("taskTitle").value="";
       document.getElementById("imageURL").value="";
       document.getElementById("taskType").value="";
       document.getElementById("taskDescrption").value="";


return;
};



const loadExistingCards= () => {

const getData = localStorage.getItem("taskyCA");

if(!getData) return;

const taskCards =JSON.parse(getData);
globalTaskData=taskCards.card;
globalTaskData.map((taskData)=>{
  const newCard =genarateHtml(taskData);



  insertintoDom(newCard);



});
return;
};

