var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var searchInput = document.getElementById("search");
var add = document.getElementById("add");
var update = document.getElementById("update");
var bookmarks = [];

if (localStorage.getItem("bookmarks")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  table(bookmarks);
} else {
  bookmarks = [];
}

function addBookmark() {
  if (
    /^((http|https):\/\/)?([a-z0-9]+\.)?[a-z0-9]+\.[a-z]+(\/[^\s]*)?$/i.test(
      urlInput.value
    ) &&
    /^\w{3,}/.test(nameInput.value)
  ) {
    var bookmark = {
      nameSite: nameInput.value,
      urlSite: urlInput.value,
    };
    bookmarks.push(bookmark);
    clr();
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    table(bookmarks);
  } else {
    document.getElementById("layer").classList.remove("d-none");
  }
}

function cls() {
  document.getElementById("layer").classList.add("d-none");
}

function clr() {
  nameInput.value = "";
  urlInput.value = "";
}

function table(array) {
  var box = "";
  for (let i = 0; i < array.length; i++) {
    box += `
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${array[i].nameSite}</td>
      <td>
        <a href="${
          array[i].urlSite
        }" class="btn btn-outline-info" target="_blank">
          <i class="fa-solid d-md-inline-block d-none fa-eye"></i>
          Visit
        </a>
      </td>
      <td>
        <button onclick="setFormUpdate(${i})" class="btn btn-outline-warning">
          <i class="fa-solid d-md-inline-block d-none fa-retweet"></i>
          Update
        </button>
      </td>
      <td>
        <button id="delete${i}" onclick="del(${i})" class="btn btn-outline-danger">
          <i class="fa-solid d-md-inline-block d-none fa-trash-can"></i>
          Delete
        </button>
      </td>
    </tr>
    `;
  }
  document.getElementById("tableBody").innerHTML = box;
}

function del(x) {
  localStorage.setItem("delete", JSON.stringify(bookmarks.splice(x, 1)));
  table(bookmarks);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function search() {
  var search = searchInput.value;

  var searchBox = "";
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].nameSite.toLowerCase().includes(search.toLowerCase())) {
      var bgText = bookmarks[i].nameSite.replaceAll(
        search,
        `<span class="bg-warning">${search}</span>`
      );
      searchBox += `
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${bgText}</td>
        <td>
          <a href="${
            bookmarks[i].urlSite
          }" class="btn btn-outline-info" target="_blank">
            <i class="fa-solid d-md-inline-block d-none fa-eye"></i>
            Visit
          </a>
        </td>
        <td>
          <button onclick="setFormUpdate(${i})" class="btn btn-outline-warning">
            <i class="fa-solid d-md-inline-block d-none fa-retweet"></i>
            Update
          </button>
        </td>
        <td>
          <button id="delete${i}" onclick="del(${i})" class="btn btn-outline-danger">
            <i class="fa-solid d-md-inline-block d-none fa-trash-can"></i>
            Delete
          </button>
        </td>
      </tr>
    `;
    }
  }
  document.getElementById("tableBody").innerHTML = searchBox;
}

function validateUrl() {
  if (
    /^((http|https):\/\/)?([a-z0-9]+\.)?[a-z0-9]+\.[a-z]+(\/[^\s]*)?$/i.test(
      urlInput.value
    )
  ) {
    urlInput.classList.add("is-valid");
    urlInput.classList.remove("is-invalid");
  } else {
    urlInput.classList.remove("is-valid");
    urlInput.classList.add("is-invalid");
  }
}

function validateName() {
  if (/^\w{3,}/.test(nameInput.value)) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
  } else {
    nameInput.classList.remove("is-valid");
    nameInput.classList.add("is-invalid");
  }
}

function setFormUpdate(x) {
  nameInput.value = bookmarks[x].nameSite;
  urlInput.value = bookmarks[x].urlSite;
  document.getElementById(`delete${x}`).classList.add("disabled");
  add.classList.add("d-none");
  add.classList.remove("d-block");
  update.classList.remove("d-none");
  update.classList.add("d-block");
  document
    .getElementById("update")
    .setAttribute("onclick", `updateBookmark(${x})`);
}

function updateBookmark(x) {
  var updateBookmark = {
    nameSite: nameInput.value,
    urlSite: urlInput.value,
  };
  bookmarks.splice(x, 1, updateBookmark);
  clr();
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  table(bookmarks);
}

function undo() {
  var undo = JSON.parse(localStorage.getItem("delete"));
  bookmarks.push(...undo);
  table(bookmarks)
  localStorage.removeItem("delete");
}
