const libraryRoot = document.querySelector(".content-inner");
// const deleteBtn = document.querySelector(".delete");
// const unreadBtn = document.querySelector(".unread");
// const readBtn = document.querySelector(".read");

const SAMPLE_BOOKS = [
    {
        author: "Chinua Achebe",
        pages: 209,
        title: "Things Fall Apart",
        read: true,
    },
    {
        author: "Hans Christian Andersen",
        pages: 784,
        title: "Fairy tales",
        read: true,
    },
    {
        author: "Dante Alighieri",
        pages: 928,
        title: "The Divine Comedy",
        read: true,
    },

    {
        author: "Jane Austen",
        pages: 226,
        title: "Pride and Prejudice",
        read: true,
    },
    {
        author: "Honor\u00e9 de Balzac",
        pages: 443,
        title: "Le P\u00e8re Goriot",
        read: false,
    },
    {
        author: "Samuel Beckett",
        pages: 256,
        title: "Molloy, Malone Dies, The Unnamable, the trilogy",
        read: false,
    },
    {
        author: "Giovanni Boccaccio",
        pages: 1024,
        title: "The Decameron",
        read: false,
    },
];

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

function generateLibraryCard(book) {
    const title = document.createElement("div");
    title.classList.add("card-title");
    title.textContent = book.title;
    const author = document.createElement("div");
    author.classList.add("card-text");
    author.textContent = book.author;
    const pages = document.createElement("div");
    pages.classList.add("card-text");
    pages.textContent = `${book.pages} pages`;

    const cardInnerInner = document.createElement("div");
    cardInnerInner.append(author, pages);
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
    cardInner.append(cardInnerInner);
    cardInner.innerHTML +=
        '<div class="card-buttons"><img class="unread" src="icons/eye-remove-outline.svg" alt="mark as unread"><img class="read" src="icons/eye-check-outline.svg" alt="mark as read"><img class="delete" src="icons/delete.svg" alt="delete"></div>';

    const card = document.createElement("div");
    card.classList.add("card");
    card.append(title);
    card.append(cardInner);

    const unreadBtn = card.querySelector(".unread");
    const readBtn = card.querySelector(".read");
    if (book.read) unreadBtn.classList.add("hidden");
    else readBtn.classList.add("hidden");

    unreadBtn.addEventListener("click", toggleReadState);
    readBtn.addEventListener("click", toggleReadState);

    const deleteBtn = card.querySelector(".delete");
    deleteBtn.addEventListener("click", deleteBook);

    return card;
}

// booksList.forEach((book) => {
//     const newBook = Book(book, author, pages, read)
// });

function addSampleBooksToLibraryAtInit(books) {
    libraryRoot.innerHTML = "";
    books.forEach((book) => {
        const bookCard = generateLibraryCard(book);
        libraryRoot.append(bookCard);
    });
}

function toggleReadState() {
    console.log(this.parentElement);
    const unreadBtn = this.parentElement.querySelector(".unread");
    const readBtn = this.parentElement.querySelector(".read");
    if (unreadBtn.classList.contains("hidden")) {
        unreadBtn.classList.remove("hidden");
        readBtn.classList.add("hidden");
    } else {
        unreadBtn.classList.add("hidden");
        readBtn.classList.remove("hidden");
    }
}

function deleteBook() {
    // assuming the title to be the primary key, it is unique throughout
    const titleToBeDelete =
        this.parentElement.parentElement.previousSibling.textContent;
    library = library.filter((book) => book.title !== titleToBeDelete);
    this.parentElement.parentElement.parentElement.remove();
}

let library = SAMPLE_BOOKS;
addSampleBooksToLibraryAtInit(library);
