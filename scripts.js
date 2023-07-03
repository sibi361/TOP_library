const libraryRoot = document.querySelector(".content-inner");
const templateCard = document.querySelector("#template-card");
const templateCardButtons = templateCard.querySelector(".card-buttons");

const SAMPLE_BOOKS = [
    {
        author: "Chinua Achebe",
        pages: 209,
        title: "Things Fall Apart",
        read: true,
        fav: true,
    },
    {
        author: "Hans Christian Andersen",
        pages: 784,
        title: "Fairy tales",
        read: true,
        fav: false,
    },
    {
        author: "Dante Alighieri",
        pages: 928,
        title: "The Divine Comedy",
        read: true,
        fav: true,
    },

    {
        author: "Jane Austen",
        pages: 226,
        title: "Pride and Prejudice",
        read: true,
        fav: true,
    },
    {
        author: "Honor\u00e9 de Balzac",
        pages: 443,
        title: "Le P\u00e8re Goriot",
        read: false,
        fav: false,
    },
    {
        author: "Samuel Beckett",
        pages: 256,
        title: "Molloy, Malone Dies, The Unnamable, The Trilogy",
        read: false,
        fav: false,
    },
    {
        author: "Giovanni Boccaccio",
        pages: 1024,
        title: "The Decameron",
        read: false,
        fav: false,
    },
];

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

function addBookToDomLibrary(book) {
    const title = document.createElement("div");
    title.classList.add("card-title");
    title.textContent = book.title;
    const author = document.createElement("div");
    author.classList.add("card-text");
    author.textContent = book.author;
    const pages = document.createElement("div");
    pages.classList.add("card-text");
    pages.textContent = `${book.pages} pages`;

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
    cardInner.append(title, author, pages);

    const card = document.createElement("div");
    card.classList.add("card");
    card.append(cardInner);
    card.innerHTML += cardButtonsHtml;

    const notFavBtn = card.querySelector(".not-fav");
    const favBtn = card.querySelector(".fav");
    if (book.fav) notFavBtn.classList.add("hidden");
    else favBtn.classList.add("hidden");

    notFavBtn.addEventListener("click", toggleFavState);
    favBtn.addEventListener("click", toggleFavState);

    const unreadBtn = card.querySelector(".unread");
    const readBtn = card.querySelector(".read");
    if (book.read) unreadBtn.classList.add("hidden");
    else readBtn.classList.add("hidden");

    unreadBtn.addEventListener("click", toggleReadState);
    readBtn.addEventListener("click", toggleReadState);

    const deleteBtn = card.querySelector(".delete");
    deleteBtn.addEventListener("click", deleteBook);

    libraryRoot.append(card);
}

// booksList.forEach((book) => {
//     const newBook = Book(book, author, pages, read)
// });

let cardButtonsHtml = "";
function initFillLibrary(books) {
    cardButtonsHtml = templateCardButtons.outerHTML;
    templateCardButtons.remove();

    libraryRoot.innerHTML = "";
    books.forEach((book) => {
        addBookToDomLibrary(book);
    });
}

function toggleFavState() {
    const notFavBtn = this.parentElement.querySelector(".not-fav");
    const favBtn = this.parentElement.querySelector(".fav");
    if (notFavBtn.classList.contains("hidden")) {
        notFavBtn.classList.remove("hidden");
        favBtn.classList.add("hidden");
    } else {
        notFavBtn.classList.add("hidden");
        favBtn.classList.remove("hidden");
    }
}

function toggleReadState() {
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
        this.parentElement.previousSibling.querySelector(".card-title");
    library = library.filter((book) => book.title !== titleToBeDelete);
    this.parentElement.parentElement.remove();
    if (libraryRoot.childElementCount === 0) {
        libraryRoot.textContent = "No Books Saved";
    }
}

let library = SAMPLE_BOOKS;
initFillLibrary(library);
