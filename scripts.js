const libraryRoot = document.querySelector(".content-inner");
const cardButtons = document.querySelectorAll(".card-buttons");

const BOOKS = [
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
        read: true,
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
    const card = document.createElement("div");
    card.classList.add("card");
    const cardContent = document.createElement("div");

    const title = document.createElement("div");
    title.classList.add("card-title");
    title.textContent = book.title;
    const author = document.createElement("div");
    author.classList.add("card-text");
    author.textContent = book.author;
    const pages = document.createElement("div");
    pages.classList.add("card-text");
    pages.textContent = `${book.pages} pages`;

    cardContent.append(title, author, pages);
    card.append(cardContent);
    card.innerHTML +=
        '<div class="card-buttons"><img src="icons/eye-remove-outline.svg" alt="mark as unread"/><img src="icons/eye-check-outline.svg" alt="mark as read"/></div>';

    const cardButtons = card.querySelector(".card-buttons").childNodes;
    if (book.read) cardButtons[0].classList.add("hidden");
    else cardButtons[1].classList.add("hidden");

    cardButtons.forEach((btn) =>
        btn.addEventListener("click", toggleReadState)
    );

    return card;
}

// booksList.forEach((book) => {
//     const newBook = Book(book, author, pages, read)
// });

function addBooksToLibraryAtInit(books) {
    libraryRoot.innerHTML = "";
    books.forEach((book) => {
        const bookCard = generateLibraryCard(book);
        libraryRoot.append(bookCard);
    });
}

function toggleReadState() {
    console.log(this.parentElement);
    const cardButtons = this.parentElement.childNodes;
    if (cardButtons[0].classList.contains("hidden")) {
        cardButtons[0].classList.remove("hidden");
        cardButtons[1].classList.add("hidden");
    } else {
        cardButtons[0].classList.add("hidden");
        cardButtons[1].classList.remove("hidden");
    }
}

let library = BOOKS;
addBooksToLibraryAtInit(library);

///
/// event listeners
Array.from(cardButtons).forEach((set) => {
    // let [unread, const] = set;
    console.log(set);
    // unread.addEventListener("click", () => {
    //     if (unread.classList.includes("hidden")) {
    //         unread.classList.remove("hidden");
    //     }
    // });
});
