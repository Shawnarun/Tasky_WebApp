const taskContainer = document.querySelector(".task__container");
let globalTaskData = [];
const savetoLocalStorage =()=> localStorage.setItem("taskyCA",JSON.stringify({card :globalTaskData}));
const insertintoDom=(content)=>    taskContainer.insertAdjacentHTML("beforeend", content);

const genarateHtml=(taskData)=>`<div id=${taskData.id} class="col-md-6 col-lg-4 my-4">
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button class="btn btn-outline-info"  name=${taskData.id} onclick="editCard.apply(this, arguments)">
      <i class="fal fa-pencil"  name=${taskData.id}></i>
    </button>
    <button class="btn btn-outline-danger"  name=${taskData.id} onclick="deleteCard.apply(this, arguments)">
      <i class="far fa-trash-alt" name=${taskData.id} "></i>
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
    <button class="btn btn-outline-primary" name=${taskData.id}>Open Task</button>
  </div>
</div>
</div>`



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
    savetoLocalStorage();



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

const deleteCard=(event)=>{
  const taregeID=event.target.getAttribute("name");
  const elementType =event.target.tagName;

  const removeTask= globalTaskData.filter((task)=>task.id !== taregeID);
  globalTaskData=removeTask;

  savetoLocalStorage();

  if(elementType=="BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};

const editCard=(event)=>{
  const taregeID=event.target.getAttribute("name");
  const elementType =event.target.tagName;
 
  let taskTitle;
  let taskType;
  let taskDescrption;
  let parentElement;
  let submitButton;


  if(elementType=="BUTTON"){
   parentElement= event.target.parentNode.parentNode;
  }
  else{
   parentElement= event.target.parentNode.parentNode.parentNode;
  }

    taskTitle=parentElement.childNodes[3].childNodes[3];
    taskType=parentElement.childNodes[3].childNodes[7];
    taskDescrption=parentElement.childNodes[3].childNodes[5];
    submitButton= parentElement.childNodes[5].childNodes[1];

 
taskTitle.setAttribute("contenteditable", "true");
taskType.setAttribute("contenteditable", "true");
taskDescrption.setAttribute("contenteditable", "true");
submitButton.setAttribute("onClick", "saveEdit.apply(this, arguments)");
submitButton.innerHTML="Save Changes";
};

const saveEdit =(event)=>{
  const targetID=event.target.getAttribute("name");
  const elementType =event.target.tagName;


  let parentElement;

  if(elementType=="BUTTON"){
   parentElement= event.target.parentNode.parentNode;
  }
  else{
   parentElement= event.target.parentNode.parentNode.parentNode;
  }

  const taskTitle=parentElement.childNodes[3].childNodes[3];
  const taskType=parentElement.childNodes[3].childNodes[7];
  const taskDescrption=parentElement.childNodes[3].childNodes[5];
  const submitButton= parentElement.childNodes[5].childNodes[1];

  const updatedData={
    title:taskTitle.innerHTML,
     type: taskType.innerHTML,
     description:taskDescrption.innerHTML,
  };

  globalTaskData.forEach((task)=>{
      if(task.id === targetID)
      {
        return{...task, ...updatedData } ;
      }
      return task;
  });


  savetoLocalStorage();

  taskTitle.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  taskDescrption.setAttribute("contenteditable", "false");
  submitButton.innerHTML="Open Task";
};