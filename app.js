// select Elements

const form = document.querySelector("#itemForm");
const inputItem = document.querySelector("#itemInput");
const itemsList = document.querySelector("#itemsList");

//Items List

let todoItems = [];

const getList = function (todoItems) {
    itemsList.innerHTML = "";
    if (todoItems.length > 0) {
        todoItems.forEach((item) => {
            itemsList.insertAdjacentHTML("beforeend",
                ` <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${item.name}</span>
            <span>
                <a><i class="bi bi-check-circle green"></i></a>
                <a><i class="bi bi-pencil-square blue"></i></a>
                <a><i class="bi bi-x-circle red"></i></a>
            </span>
        </li>`
            )
        })
    }
}

// get local storage from page
const getLocalStorage = function () {
    const todoStorage = localStorage.getItem("todoItems");
    if (todoStorage === "undefined" || todoStorage === null) {
        todoItems = [];
    } else {
        todoItems = JSON.parse(todoStorage);
    }
    console.log("items", todoItems);
    getList(todoItems);
}


//set in Local storage
const setLocalStorage = function (todoItems) {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    location.reload();
}


// add item start
document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const itemName = inputItem.value.trim();
        if (itemName.length === 0) {
            alert("Please enter book name");
        } else {
            const itemObj = {
                name: itemName,
                isDone: false,
                addedAt: new Date().getTime(),
            }
            todoItems.push(itemObj);
            setLocalStorage(todoItems);

        }

    })
    getLocalStorage();
})