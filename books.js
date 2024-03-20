class Book {  
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
  
    info = function() {
        let readStatus;
        if (isRead) {
            readStatus = "has been read"
        }
        else {
            readStatus = "not read yet"
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`
    }

    changeRead = function() {
        this.isRead = !this.isRead;
    }
}

class Library {
    
    constructor(library) {
        this.library = library;
    }

    get booksInLibrary() {
        return this.library;
    }

    set booksInLibrary(book) {
        this.library.push(book);
    }

    deleteBook(book) {
        const index = this.library.indexOf(book);
        if (index > -1) {
            this.library.splice(index, 1);
        }
    }

    displayLibrary() {
        const bookContainer = document.querySelector(".container");
        bookContainer.innerHTML='';
        for (let bookNum = 0; bookNum < this.library.length; bookNum++) {
            const newBookCard = sampleBookCard.cloneNode(true);
            newBookCard.id = "card" + bookNum;
            bookContainer.appendChild(newBookCard);
            const deleteButton = newBookCard.querySelector(".delete-button");
            deleteButton.addEventListener('click', () => {
                this.deleteBook(this.library[bookNum]);
                newBookCard.remove();
    
            })
            for (let property in this.library[bookNum]) {
                let newDiv = newBookCard.querySelector("." + property);
                switch (property) {
                    case "title":
                        newDiv.textContent = this.library[bookNum][property];
                        break;
                    case "author":
                        newDiv.textContent = "By: " + this.library[bookNum][property];
                        newDiv.style.fontStyle = "italic";
                        break;
                    case "pages":
                        newDiv.textContent = "Pages: " + this.library[bookNum][property];
                        newDiv.style.fontStyle = "italic";
                        break;
                    case "isRead":
                        newDiv = newBookCard.querySelector("#is-read");
                        newDiv.checked = this.library[bookNum][property];
                        newDiv.addEventListener('click', () => {
                            this.library[Number(newBookCard.id.slice(-1))].changeRead();
                        })
                        break;
                    default:
                        break;
                }
            }
        }
    }

}

myLib = new Library([]);


const dialog = document.querySelector("dialog");
const closeButton = document.querySelector(".close-dialog");
const newBookForm = document.querySelector(".new-book-form")
const sampleBookCard = document.querySelector(".card");
sampleBookCard.remove();



readCheckBox = sampleBookCard.querySelector("input[name=is-read]");

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
    myLib.booksInLibrary = newBook;
    myLib.displayLibrary();
    newBookForm.reset();
    dialog.close();
})