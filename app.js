// select Elements

const form = document.querySelector("#itemForm");
const inputItem = document.querySelector("#itemInput");
const itemsList = document.querySelector("#itemsList");
const filters = document.querySelectorAll(".nav-item");

//Items List

let todoItems = [];

//filter items
const getItemsFilter = function (type) {
    let filterItems = [];
    switch (type) {
        case "toread":
            filterItems = todoItems.filter((item) => !item.isDone);
            break;
        case "done":
            filterItems = todoItems.filter((item) => item.isDone);
            break;
        default:
            filterItems = todoItems;
    }
    getList(filterItems);
}

//delete item function
const removeItem = function (item) {
    const removeIndex = todoItems.indexOf(item);
    todoItems.splice(removeIndex, 1);

}



// update Items function
const updateItem = function (currentItemIndex, value) {
    const newItem = todoItems[currentItemIndex];
    newItem.name = value;
    todoItems.splice(currentItemIndex, 1, newItem);
    setLocalStorage(todoItems);
}


//handle events on action buttons
const handleItem = function (itemData) {
    const items = document.querySelectorAll(".list-group-item")
    items.forEach((item) => {
        if (
            item.querySelector('.title').getAttribute("data-time") == itemData.addedAt
        ) {
            // done
            item.querySelector("[data-done]").addEventListener("click", function (e) {
                e.preventDefault();
                const itemIndex = todoItems.indexOf(itemData);
                const currentItem = todoItems[itemIndex];
                const currentClass = currentItem.isDone ? "bi-check-circle-fill" : "bi-check-circle";
                currentItem.isDone = currentItem.isDone ? false : true;
                todoItems.splice(itemIndex, 1, currentItem);
                setLocalStorage(todoItems);
                const iconClass = currentItem.isDone
                    ? "bi-check-circle-fill"
                    : "bi-check-circle";
                this.firstElementchild.classList.replace(currentClass, iconClass);

            })
            // edit

            item.querySelector("[data-edit]").addEventListener("click", function (e) {
                e.preventDefault();
                inputItem.value = itemData.name;
                document.querySelector('#objIndex').value = todoItems.indexOf(itemData);

            })
            //delete items
            item.querySelector("[data-delete]").addEventListener("click", function (e) {
                e.preventDefault();
                if (confirm("Are you sure want to delete this item?")) {
                    itemsList.removeChild(item);
                    removeItem(item);
                    setLocalStorage(todoItems);
                    return todoItems.filter((item) => item != itemData);
                }

            })
        }
    })

}


//get List of items
const getList = function (todoItems) {
    itemsList.innerHTML = "";
    if (todoItems.length > 0) {
        todoItems.forEach((item) => {
            const iconClass = item.isDone ? "bi-check-circle-fill" : "bi-check-circle";
            itemsList.insertAdjacentHTML("beforeend",
                ` <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="title" data-time="${item.addedAt}">${item.name}</span>
            <span>
                <a data-done><i class="bi ${iconClass} green"></i></a>
                <a data-edit><i class="bi bi-pencil-square blue"></i></a>
                <a data-delete><i class="bi bi-x-circle red"></i></a>
            </span>
        </li>`
            )
            handleItem(item);
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

            const currentItemIndex = document.querySelector('#objIndex').value;
            if (currentItemIndex) {
                //update
                updateItem(currentItemIndex, itemName);
                document.querySelector('#objIndex').value = "";

            } else {
                const itemObj = {
                    name: itemName,
                    isDone: false,
                    addedAt: new Date().getTime(),
                }
                todoItems.push(itemObj);
                setLocalStorage(todoItems);
            }

            getList(todoItems);
        }
        inputItem.value = "";
    });


    filters.forEach((tab) => {
        tab.addEventListener("click", function (e) {
            e.preventDefault();
            const tabType = this.getAttribute("data-type");
            document.querySelectorAll('.nav-link').forEach((nav) => {
                nav.classList.remove("active");
            });
            this.firstElementChild.classList.add("active");
            getItemsFilter(tabType);
        });
    });

    getLocalStorage();
})