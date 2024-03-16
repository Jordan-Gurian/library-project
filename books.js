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