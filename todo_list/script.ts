export { }

var todoEle = document.getElementById("todoText") as HTMLInputElement; // Input text box to enter todo item

var addTaskEle = document.getElementById("addTask") as HTMLButtonElement;

var todoListContainerEle = document.getElementById("listContainer") as HTMLUListElement; // Ul List container

var searchEle = document.getElementById("search") as HTMLInputElement;

var msgEle = document.getElementById("msg") as HTMLParagraphElement;

var todoList: string[] = [];


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



function removeElement(element: string | null): void {
    var index: number = todoList.indexOf(element);
    if (index > -1) {
        todoList.splice(index, 1);
    }
    console.log(todoList);
}

// Search Functionality
searchEle?.addEventListener("keyup", (event) => {
    // if (searchEle.value === ' ') {
    //     msgEle.textContent = ' ';
    // }
    if (todoList.length === 0 && searchEle.value !== '') {
        msgEle.textContent = "Please enter tasks first";
    } else {

        msgEle.textContent = "";
        let li: HTMLCollectionOf<HTMLLIElement> = todoListContainerEle?.getElementsByTagName("li");

        for (let i = 0; i < li?.length; i++) {
            let p: HTMLParagraphElement = li[i].getElementsByTagName("p")[0];
            let text: string | null = p.textContent;
            if (text.indexOf(searchEle.value) > -1) {
                li[i].style.display = "";
                msgEle.textContent = '';
                // console.log("Present");
            } else {
                // console.log("not pre");
                li[i].style.display = "none";
                msgEle.textContent = "No results"
            }
        }



    }

})


//Write a different function for pushing and check the condition if it already exists

function addTodoItem() {
    //----
    console.log(todoList);
    msgEle.textContent = ' ';

    if (todoList.indexOf(todoEle.value.trim()) !== -1) {
        console.log(todoList.indexOf(todoEle.value), 'exists')
        alert("Already Exists");
    } else if (todoEle.value.trim() === "") {
        alert("Please Enter Some task");
    }
    else {
        let listEle: HTMLLIElement = document.createElement("li");
        listEle.classList.add("list-container");

        // Creating checkbox element
        let checkEle: HTMLInputElement = document.createElement("input");
        checkEle.type = "checkbox";
        checkEle.id = 'check';
        listEle.appendChild(checkEle);

        //Creating para element too display the text
        let todoParaEle: HTMLParagraphElement = document.createElement("p");
        todoParaEle.textContent = todoEle.value;
        todoList.push(todoEle.value.trim());
        //----
        console.log(todoList);
        todoParaEle.classList.add("para")
        listEle.appendChild(todoParaEle);

        // Creating Dropdown by calling dropdown function
        // let selectEle = dropdown();
        // listEle.appendChild(selectEle);

        var options: string[] = ['ToDo', "In Progress", "Completed"];
        // Creating dropdown
        let selectEle: HTMLSelectElement = document.createElement("select");
        selectEle.name = "choices";
        selectEle.id = "choices";

        for (const opt of options) {
            let optionEle: HTMLOptionElement = document.createElement("option");
            optionEle.value = opt;
            optionEle.text = opt;
            selectEle.appendChild(optionEle);
        }

        //Event listener to checkbox
        listEle.appendChild(selectEle);
        selectEle?.addEventListener("change", () => {
            selectEle.value === "Completed" ? (checkEle.checked = true, todoParaEle.classList.add("cross-line"), removeElement(todoParaEle.textContent)) : (checkEle.checked = false, todoParaEle.classList.remove("cross-line"),todoList.push(todoParaEle.textContent));
        })


        //Event listener to checkbox
        checkEle.addEventListener("change", () => {
            checkEle.checked ? (selectEle.value = "Completed", todoParaEle.classList.add("cross-line"),  removeElement(todoParaEle.textContent)) : (selectEle.value = "ToDo", todoParaEle.classList.remove("cross-line"),todoList.push(todoParaEle.textContent));
        })

        //Creating button Element
        let btnEle: HTMLButtonElement = document.createElement("button");
        btnEle.textContent = "Delete";
        btnEle.classList.add("close-icon");
        listEle.appendChild(btnEle);

        btnEle.addEventListener("click", () => {
            let parent: ParentNode | null = btnEle.parentNode;
            removeElement(todoParaEle.textContent);
            parent?.remove();
        })



        //Appending the list item to container element

        todoListContainerEle?.appendChild(listEle);

        todoEle.value = ""; // clears the input field as soon as add task is cliked

    }

}

todoEle.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addTaskEle.click();
    }
})
addTaskEle?.addEventListener("click", addTodoItem);