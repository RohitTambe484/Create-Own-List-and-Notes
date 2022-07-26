showNotes();

// if user adds a list ,add it to the localstorage
let btn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {

    let addtext = document.getElementById('addtext');
    let addTitle = document.getElementById('addTitle');
    let list = localStorage.getItem('list');
    if (list == null) {
        listobj = [];
    }
    else {
        listobj = JSON.parse(list);
    }
    let ownObj = {
        title: addTitle.value,
        text: addtext.value
    };

    listobj.push(ownObj);
    localStorage.setItem('list', JSON.stringify(listobj));
    addtext.value = '';
    addTitle.value = '';
    console.log(listobj);
    showNotes();
});
// function to show elements from locastorage
function showNotes() {
    let list = localStorage.getItem('list');
    if (list == null) {
        listobj = [];
    }
    else {
        listobj = JSON.parse(list);
    }
    let html = '';
    listobj.forEach(function (element, index) {
        html += `<div class=" noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onClick="deleteList(this.id)" class="btn btn-primary">Delete</button>
        </div>
      </div>`;
    });
    let listEle = document.getElementById('list');
    if (listobj.length != 0) {
        listEle.innerHTML = html;
    }
    else {
        listEle.innerHTML = `Nothing to show! user "Add a list" go and add a your list`
    }

};
// delete a list

function deleteList(index) {

    let list = localStorage.getItem('list');
    if (list == null) {
        listobj = [];
    }
    else {
        listobj = JSON.parse(list);
    }
    listobj.splice(index, 1);
    localStorage.setItem('list', JSON.stringify(listobj));
    showNotes();
};

// search a list

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let inputval1= search.value.toUpperCase();
    // console.log("inpute fired", inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTitle =element.getElementsByTagName("h5")[0].innerText;

        if (cardTitle.includes(inputVal)) {
            element.style.display = "block";
        }
        else if(cardTitle.includes(inputval1)){
            element.style.display = "block";
        }
        else {
            element.style.display = "none";

        }
        
    })
});
