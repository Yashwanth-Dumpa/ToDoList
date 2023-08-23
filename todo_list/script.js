"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var todoEle = document.getElementById("todoText"); // Input text box to enter todo item
var addTaskEle = document.getElementById("addTask");
var todoListContainerEle = document.getElementById("listContainer"); // Ul List container
var searchEle = document.getElementById("search");
var msgEle = document.getElementById("msg");
var todoList = [];
// function dropdown() {
//     var options = ['ToDo', "In Progress", "Completed"];
//     // Creating dropdown
//     let selectEle = document.createElement("select");
//     selectEle.name = "choices";
//     selectEle.id = "choices";
//     for (const opt of options) {
//         let optionEle = document.createElement("option");
//         optionEle.value = opt;
//         optionEle.text = opt;
//         selectEle.appendChild(optionEle);
//     }
//     selectEle?.addEventListener("change",()=>{
//         console.log(selectEle.value)
//     })
//     return selectEle;
// }
function removeElement(element) {
    var index = todoList.indexOf(element);
    if (index > -1) {
        todoList.splice(index, 1);
    }
    console.log(todoList);
}
// Search Functionality
searchEle === null || searchEle === void 0 ? void 0 : searchEle.addEventListener("keyup", function (event) {
    // if (searchEle.value === ' ') {
    //     msgEle.textContent = ' ';
    // }
    if (todoList.length === 0 && searchEle.value !== '') {
        msgEle.textContent = "Please enter tasks first";
    }
    else {
        msgEle.textContent = "";
        var li = todoListContainerEle === null || todoListContainerEle === void 0 ? void 0 : todoListContainerEle.getElementsByTagName("li");
        for (var i = 0; i < (li === null || li === void 0 ? void 0 : li.length); i++) {
            var p = li[i].getElementsByTagName("p")[0];
            var text = p.textContent;
            if (text.indexOf(searchEle.value) > -1) {
                li[i].style.display = "";
                msgEle.textContent = '';
                // console.log("Present");
            }
            else {
                // console.log("not pre");
                li[i].style.display = "none";
                msgEle.textContent = "No results";
            }
        }
    }
});
//Write a different function for pushing and check the condition if it already exists
function addTodoItem() {
    //----
    console.log(todoList);
    msgEle.textContent = ' ';
    if (todoList.indexOf(todoEle.value.trim()) !== -1) {
        console.log(todoList.indexOf(todoEle.value), 'exists');
        alert("Already Exists");
    }
    else if (todoEle.value.trim() === "") {
        alert("Please Enter Some task");
    }
    else {
        var listEle = document.createElement("li");
        listEle.classList.add("list-container");
        // Creating checkbox element
        var checkEle_1 = document.createElement("input");
        checkEle_1.type = "checkbox";
        checkEle_1.id = 'check';
        listEle.appendChild(checkEle_1);
        //Creating para element too display the text
        var todoParaEle_1 = document.createElement("p");
        todoParaEle_1.textContent = todoEle.value;
        todoList.push(todoEle.value.trim());
        //----
        console.log(todoList);
        todoParaEle_1.classList.add("para");
        listEle.appendChild(todoParaEle_1);
        // Creating Dropdown by calling dropdown function
        // let selectEle = dropdown();
        // listEle.appendChild(selectEle);
        var options = ['ToDo', "In Progress", "Completed"];
        // Creating dropdown
        var selectEle_1 = document.createElement("select");
        selectEle_1.name = "choices";
        selectEle_1.id = "choices";
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var opt = options_1[_i];
            var optionEle = document.createElement("option");
            optionEle.value = opt;
            optionEle.text = opt;
            selectEle_1.appendChild(optionEle);
        }
        //Event listener to checkbox
        listEle.appendChild(selectEle_1);
        selectEle_1 === null || selectEle_1 === void 0 ? void 0 : selectEle_1.addEventListener("change", function () {
            selectEle_1.value === "Completed" ? (checkEle_1.checked = true, todoParaEle_1.classList.add("cross-line"), removeElement(todoParaEle_1.textContent)) : (checkEle_1.checked = false, todoParaEle_1.classList.remove("cross-line"), todoList.push(todoParaEle_1.textContent));
        });
        //Event listener to checkbox
        checkEle_1.addEventListener("change", function () {
            checkEle_1.checked ? (selectEle_1.value = "Completed", todoParaEle_1.classList.add("cross-line"), removeElement(todoParaEle_1.textContent)) : (selectEle_1.value = "ToDo", todoParaEle_1.classList.remove("cross-line"), todoList.push(todoParaEle_1.textContent));
        });
        //Creating button Element
        var btnEle_1 = document.createElement("button");
        btnEle_1.textContent = "Delete";
        btnEle_1.classList.add("close-icon");
        listEle.appendChild(btnEle_1);
        btnEle_1.addEventListener("click", function () {
            var parent = btnEle_1.parentNode;
            removeElement(todoParaEle_1.textContent);
            parent === null || parent === void 0 ? void 0 : parent.remove();
        });
        //Appending the list item to container element
        todoListContainerEle === null || todoListContainerEle === void 0 ? void 0 : todoListContainerEle.appendChild(listEle);
        todoEle.value = ""; // clears the input field as soon as add task is cliked
    }
}
todoEle.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTaskEle.click();
    }
});
addTaskEle === null || addTaskEle === void 0 ? void 0 : addTaskEle.addEventListener("click", addTodoItem);
