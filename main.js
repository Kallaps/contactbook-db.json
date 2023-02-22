let API = "http://localhost:8000/contacts";

let photo = document.querySelector("#photo");
let name = document.querySelector("#name");
let surename = document.querySelector("#surename");
let number = document.querySelector("#number");
let email = document.querySelector("#email");

let btnAdd = document.querySelector("#btn-add");
let ul = document.querySelector(".contacts-list");

let newContact = {};

photo.addEventListener("input", (e) => {
  newContact.photo = e.target.value;
});
name.addEventListener("input", (e) => {
  newContact.name = e.target.value;
});
surename.addEventListener("input", (e) => {
  newContact.surename = e.target.value;
});
number.addEventListener("input", (e) => {
  newContact.number = e.target.value;
});
email.addEventListener("input", (e) => {
  newContact.email = e.target.value;
});

async function addContact() {
  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newContact),
    });
  } catch (error) {
    console.log(error);
  }

  photo.value = "";
  name.value = "";
  surename.value = "";
  number.value = "";
  email.value = "";

  getContact();
}
btnAdd.addEventListener("click", addContact);

async function getContact() {
  try {
    let res = await fetch(API);
    let contacts = await res.json();
    render(contacts);
    console.log(contacts);
  } catch (error) {
    console.log(error);
  }
}

function render(contacts) {
  ul.innerHTML = "";

  contacts.forEach((item) => {
    ul.innerHTML += `
    
        <li class="list-group-item">
        <p><img src='${item.photo}'></> </p>
        <p>${item.name} </p>
        <p>${item.surename} </p>
        <p>${item.number} </p>
        <p>${item.email} </p>

        <div>
        <button onclick="deleteContact(${item.id})" class='btn'>Delete</button>
        <button onclick="editContact(${item.id})" class='btn' data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
        </div>
        </li>
        
        `;
  });
}
getContact();

async function deleteContact(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    getContact();
  } catch (error) {
    console.log(error);
  }
}

let inpEditPhoto = document.querySelector(".inp-edit-photo");
let inpEditName = document.querySelector(".inp-edit-name");
let inpEditSurename = document.querySelector(".inp-edit-surename");
let inpEditNumber = document.querySelector(".inp-edit-number");
let inpEditEmail = document.querySelector(".inp-edit-email");

let saveBtn = document.querySelector(".save-btn");
let editModal = document.querySelector("#exampleModal");

let editedObj = {};

inpEditPhoto.addEventListener("input", (e) => {
  editedObj = { ...editedObj, photo: e.target.value };
});

inpEditName.addEventListener("input", (e) => {
  editedObj = { ...editedObj, name: e.target.value };
});

inpEditSurename.addEventListener("input", (e) => {
  editedObj = { ...editedObj, surename: e.target.value };
});

inpEditNumber.addEventListener("input", (e) => {
  editedObj = { ...editedObj, number: e.target.value };
});

inpEditEmail.addEventListener("input", (e) => {
  editedObj = { ...editedObj, email: e.target.value };
});

async function editContact(id) {
  try {
    let res = await fetch(`${API}/${id}`);
    let objToEdit = await res.json();

    inpEditPhoto.value = objToEdit.photo;
    inpEditName.value = objToEdit.name;
    inpEditSurename.value = objToEdit.surename;
    inpEditNumber.value = objToEdit.number;
    inpEditEmail.value = objToEdit.email;

    saveBtn.setAttribute("id", `${id}`);
  } catch (error) {
    console.log(error);
  }
}

saveBtn.addEventListener("click", async (e) => {
  let id = e.target.id;

  try {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(editedObj),
    });
  } catch (error) {
    console.log(error);
  }
  getContact();
  let modal = bootstrap.Modal.getInstance(editModal);
  modal.hide();
});
