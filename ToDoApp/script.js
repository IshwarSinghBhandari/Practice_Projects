const listname = document.getElementById("todoForm");
const listtitle = document.getElementById("listTitle");
const modalbox = document.getElementById("modalbox");
const closemodel = document.getElementById("closemodel");
const todoFormAddButton = document.getElementById("todoFormAddButton");
const todoFormUpdateButton = document.getElementById("todoFormUpdateButton");
const listTitleUpdate = document.getElementById("listTitleUpdate");
const listDescription = document.getElementById("listDescription");
const showList = document.getElementById("showList");
let currentEditId = null;
closemodel.onclick = () => {
  modalbox.style.display = "none";
};
const colors = [
  "#FDE2E4", // soft pink
  "#E2F0CB", // soft green
  "#CDE7F0", // soft blue
  "#FFF1C1", // soft yellow
  "#E8DFF5", // soft lavender
  "#DDEDEA", // mint pastel
  "#F6D6AD", // peach
  "#DCE2FF", // light periwinkle
  "#FADADD", // blush
  "#E6F4EA"  // soft mint green
];
function RandomColor(){
    const number =Math.floor(Math.random() * colors.length)
        console.log("RandomColor",number)

    return  colors[number]
}


let listTodo = JSON.parse(localStorage.getItem("tododata")) || [];

function ShowData() {
  showList.innerHTML = "";
  listTodo.map((data) => {
    showList.innerHTML += `<div onclick="openListDetail('${data.id}')" class="flex justify-between bg-[${RandomColor()}] p-2 rounded-sm cursor-pointer hover:scale-[1.03] hover:shadow-sm">
              <p>${data.title}</p>
              <svg 
               onclick="deleteTodo(event,'${data.id}')"
                class="cursor-pointer transition-all duration-200 hover:scale-125 text-black hover:text-red-600 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path
                  d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                />
              </svg>
            </div>`;
  });
}

// open model
listname.addEventListener("submit", (e) => {
  e.preventDefault();
  modalbox.style.display = "flex";
  const title = listtitle.value;

  addDescription(title);
});

function addDescription(title) {
  listTitleUpdate.value = title;
  todoFormAddButton.style.display = "block";
  todoFormUpdateButton.style.display = "none";

  listTitleUpdate.addEventListener("focus", () => {
    todoFormUpdateButton.style.display = "none";
  });

  listDescription.addEventListener("focus", () => {
    todoFormUpdateButton.style.display = "none";
  });

  todoFormAddButton.onclick = () => {
    const updateTitle = listTitleUpdate.value;

    const description = listDescription.value;

    const newTodo = {
      id: Date.now().toString(),
      title: updateTitle,
      description: description,
      time: new Date(),
    };

    listTodo.push(newTodo);
    // console.log("listTodo = ", listTodo);
    localStorage.setItem("tododata", JSON.stringify(listTodo));
    modalbox.style.display = "none";
    ShowData();
  };
  listtitle.value = "";
  listDescription.value = "";
}

ShowData();

function deleteTodo(event, id) {
  event.stopPropagation();
  listTodo = listTodo.filter((item) => item.id !== id);
//   console.log("new list=========", listTodo, "----", id);
  localStorage.setItem("tododata", JSON.stringify(listTodo));
  ShowData();
}

function openListDetail(id) {
  currentEditId = id;
  modalbox.style.display = "flex";
  const singleList = listTodo.find((item) => item.id === id);
  listTitleUpdate.value = singleList.title;
  listDescription.value = singleList.description;

  todoFormAddButton.style.display = "none";
  todoFormUpdateButton.style.display = "none";
  listTitleUpdate.addEventListener("keydown", updateTodoData);
  listDescription.addEventListener("keydown", updateTodoData);
}

function updateTodoData() {
  todoFormUpdateButton.style.display = "block";
  todoFormUpdateButton.onclick = () => {
    const index = listTodo.findIndex((item) => item.id === currentEditId);

    if(index !== -1){
        listTodo[index].title = listTitleUpdate.value;
        listTodo[index].description = listDescription.value;
    }
    localStorage.setItem("tododata", JSON.stringify(listTodo));
      modalbox.style.display = "none";
    ShowData();
  };
}
