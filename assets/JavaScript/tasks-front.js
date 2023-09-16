const todos = document.querySelectorAll(".todo")
const all_status = document.querySelectorAll(".status");

const firstStatusDiv = all_status[0];
const secondStatusDiv = all_status[1];
const thirdStatusDiv = all_status[2];
const fourthStatusDiv = all_status[3];

let draggedTodo = null;// at the start of the application we dnt know which elmnt is draggd
let statusUpdateForm = null; 
// document.getElementById('status-update-form')
let statusUpdateInput = null;
// document.getElementById('status-update')

todos.forEach((todo)=>{
    todo.addEventListener('dragstart', dragStart)
    todo.addEventListener('dragend', dragEnd)
})

function dragStart(){
    draggedTodo = this; //points to the elmnt on whch dragstart event occurs
    statusUpdateInput = draggedTodo.querySelector('#status-update')
    statusUpdateForm = draggedTodo.querySelector('#status-update-form')
}
function dragEnd(){
    draggedTodo = null;//whn v stp drgging we again set draggedTodo to null
}

all_status.forEach((status)=>{
    status.addEventListener('dragover', dragOver)
    status.addEventListener('dragenter', dragEnter)
    status.addEventListener('dragleave', dragLeave)
    status.addEventListener('drop', dragDrop)
    
})
function dragOver(e){
    e.preventDefault();
   // console.log('dragged element over the drop targets')
}

function dragEnter(){
    console.log('drag Enter')
}

function dragLeave(){
   // console.log('dragged Leave')
}

function dragDrop(){
    this.appendChild(draggedTodo)
    console.log("dragdropped triggered")
    if(this == firstStatusDiv){
      statusUpdateInput.value = "No Status"
      console.log('DragDrop on No status')
      statusUpdateForm.submit()
      console.log(v)
      return;
    }
    if(this == secondStatusDiv){
      statusUpdateInput.value = "Pending"
      console.log('DragDrop on Not started')
      statusUpdateForm.submit()
      return

    }
    if(this == thirdStatusDiv){
      statusUpdateInput.value = "Doing"
      console.log('DragDrop on In Progress')
      statusUpdateForm.submit()
      return
    }
    if(this == fourthStatusDiv){
      statusUpdateInput.value = "Done"
      console.log('DragDrop on Completed')
      statusUpdateForm.submit()
      return
    }
}





//modal
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};