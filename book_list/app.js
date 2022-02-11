//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

//Add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  //create tr element
  const row = document.createElement("tr");

  //Insert columns
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td> <a href = "#"class= "delete"> X <a/> </td>
  `;

  list.appendChild(row);

  //console.log(row);
};

//show Error Alert
UI.prototype.showAlert = function (message, className) {
  //create div
  const div = document.createElement("div");
  //add classes
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));

  //get Parent
  const container = document.querySelector(".container");
  //get Form
  const form = document.querySelector("#book-form");
  //Insert Alert
  container.insertBefore(div, form);

  //hide after 3sec
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

//delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

//clear input fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//event listener "add book"
document.getElementById("book-form").addEventListener("submit", function (e) {
  //get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //book instance
  const book = new Book(title, author, isbn);

  //UI Instance
  const ui = new UI();

  //Input Validation
  if (title === "" || author === "" || isbn === "") {
    //Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //Add book to list
    ui.addBookToList(book);
    ui.showAlert("Book Added!", "success");

    //clear input fields
    ui.clearFields();
  }

  e.preventDefault();
});

//event listener "delete book"
document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);

  //Show message
  ui.showAlert("Book Removed!", "success");
  e.preventDefault();
});
