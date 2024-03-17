const myLibrary = [];
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector(".close-dialog");
const newBookForm = document.querySelector(".new-book-form")
const sampleBookCard = document.querySelector(".card");
sampleBookCard.remove();

readCheckBox = sampleBookCard.querySelector("input[name=is-read]");



function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        let readStatus;
        if (isRead) {
            readStatus = "has been read"
        }
        else {
            readStatus = "not read yet"
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`
    }
}

function addBookToLibrary(book, library) {
    library.push(book);
    return
}

function displayLibrary(library) {
    const bookContainer = document.querySelector(".container");
    bookContainer.innerHTML='';
    for (let bookNum = 0; bookNum < library.length; bookNum++) {
        const newBookCard = sampleBookCard.cloneNode(true);
        bookContainer.appendChild(newBookCard);
        for (property in library[bookNum]) {
            if (property === "info") {
                continue;
            }
            else if (property === "isRead") {
                const newDiv = newBookCard.querySelector("#is-read");
                newDiv.id = "is-read" + bookNum;
                newDiv.checked = library[bookNum][property];
                newDiv.addEventListener('click', function() {
                    library[newDiv.id.slice(-1)].isRead = newDiv.checked;
                })
            }
            else {
                const newDiv = newBookCard.querySelector("." + property);
                newDiv.textContent = library[bookNum][property];
            }
        }
    }
}


const addBook = document.querySelector(".add-book");
let tableCols = 4;

addBook.addEventListener('click', function () {
    dialog.showModal();
});


closeButton.addEventListener("click", function (event) {
    event.preventDefault();
    const titleValue = document.querySelector("input[name=title]").value;
    const authorValue = document.querySelector("input[name=author]").value;
    const pagesValue = document.querySelector("input[name=pages]").value;
    const isReadValue = document.querySelector("input[name=is-read]").checked;
    newBook = new Book(titleValue, authorValue, pagesValue, isReadValue);
    addBookToLibrary(newBook, myLibrary);
    displayLibrary(myLibrary);
    newBookForm.reset();
    dialog.close();
})