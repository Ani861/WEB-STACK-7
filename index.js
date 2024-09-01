document.addEventListener("DOMContentLoaded", function () {
  const bookListContainer = document.getElementById("bookList");
  const genreFilter = document.getElementById("genreFilter");
  const sortOptions = document.getElementById("sortOptions");
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const currentPageSpan = document.getElementById("currentPage");

  let books = [];
  let filteredBooks = [];
  let currentPage = 1;
  const totalPages = 2; 

  function fetchBooks() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ani861.github.io/WEB-STACK-7/books.json");
    xhr.onload = function () {
      if (xhr.status === 200) {
        books = JSON.parse(xhr.responseText);
        filteredBooks = [...books];
        calculateBooksPerPage();
        displayBooks();
      } else {
        bookListContainer.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
      }
    };
    xhr.onerror = function () {
      bookListContainer.innerHTML = `<p>Network error. Please check your connection and try again.</p>`;
    };
    xhr.send();
  }

  function calculateBooksPerPage() {
    const totalBooks = filteredBooks.length;
    booksPerPage = Math.ceil(totalBooks / totalPages);
  }

  function displayBooks() {
    bookListContainer.innerHTML = "";

    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToDisplay = filteredBooks.slice(startIndex, endIndex);

    booksToDisplay.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.className = "book-item";
      bookItem.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Year:</strong> ${book.year}</p>
        <p><strong>Rating:</strong> ${book.rating}</p>
        <p><strong>Level:</strong> ${book.level}</p>
      `;
      bookListContainer.appendChild(bookItem);
    });

    currentPageSpan.textContent = currentPage;
  }

  genreFilter.addEventListener("change", function () {
    const selectedGenre = this.value;
    if (selectedGenre) {
      
      filteredBooks = books.filter((book) => 
        book.genre === selectedGenre || book.level === selectedGenre
      );
    } else {
      filteredBooks = [...books];
    }
    currentPage = 1;
    calculateBooksPerPage();
    displayBooks();
  });
  

  sortOptions.addEventListener("change", function () {
    const sortBy = this.value;
    if (sortBy) {
      filteredBooks.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
    } else {
      filteredBooks = [...books];
    }
    displayBooks();
  });

  prevPageButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      displayBooks();
    }
  });

  nextPageButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      displayBooks();
    }
  });

  fetchBooks();
});
