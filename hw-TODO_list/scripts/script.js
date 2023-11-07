"use strict";

let weekDay = (new Date).getDay();
let daysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let textElement = document.getElementById("day");
textElement.innerHTML = daysName.at(weekDay-1);


let day = (new Date).getDate();
let month = (new Date).getMonth();
let year = (new Date).getFullYear();
let textElement1 = document.getElementById("date");
textElement1.innerHTML = `${day} . ${month+1} . ${year}`;


let list = document.getElementById("todo-list");
list.addEventListener('click',
    function completeTask(element){

    if (element.target.tagName === "LI"){

        element.target.classList.toggle("completed");
        element.target.childNodes[0].classList.toggle("item-text__completed");
        let id = parseInt(element.target.id);

        for (let item of listItems) {
            if (item.id === id) {
                item.isCancelled = !item.isCancelled;
            }
        }

        loadInStorage();
    }
}, false);


let listItems = [];

function createItem(){
    let inputText = document.getElementById("input").value;
    if (inputText !== ""){

        //listItems = listItems|| []
        let itemID = Math.floor(Math.random()*100000);

        let listItem = document.createElement("li");
        listItem.className = "todo-list__item";
        listItem.id = itemID;

        let itemText = document.createElement("span");
        itemText.className = "item-text";
        itemText.textContent = inputText;

        let deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        let deleteText = document.createElement("span");
        deleteText.className = "delete-text";
        deleteText.textContent = "x";

        deleteButton.appendChild(deleteText);

        listItem.appendChild(itemText);

        document.getElementById("todo-list").appendChild(listItem);

        document.getElementById("input").value = "";

        let item = {
            id: itemID,
            text: inputText,
            isCancelled: false
        };
        listItems.push(item);

        deleteButton.addEventListener('click', function () {
            deleteTask(itemID);
        });

        listItem.appendChild(deleteButton);
        deleteButton.appendChild(deleteText);
    }
    else {
        alert("Вводите корректные данные");
    }
}

function deleteTask(id) {

    listItems = listItems.filter(item => item.id !== id);
    document.getElementById(id).remove();
}

function loadInStorage(){
    localStorage.setItem("listItems", JSON.stringify(listItems));
}

function uploadItems() {

    if (localStorage.getItem("listItems") !== null) {

        listItems = JSON.parse(localStorage.getItem("listItems"));

        listItems.forEach(item => {
            let listItem = document.createElement("li");
            listItem.id = item.id;

            console.log(item);
            if (item.isCancelled) {
                listItem.className = "todo-list__item completed";
            }
            else {
                listItem.className = "todo-list__item";
            }

            let itemText = document.createElement("span");
            itemText.textContent = item.text;

            if (item.isCancelled){
                itemText.className = "item-text item-text__completed";
            }
            else{
                itemText.className = "item-text";
            }
            listItem.appendChild(itemText);


            let deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            let deleteText = document.createElement("span");
            deleteText.className = "delete-text";
            deleteText.textContent = "x";


            deleteButton.addEventListener('click', function () {
                deleteTask(item.id);
            });

            deleteButton.appendChild(deleteText);
            listItem.appendChild(deleteButton);

            document.getElementById("todo-list").appendChild(listItem);
        });
    }
}

