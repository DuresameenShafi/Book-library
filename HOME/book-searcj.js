document.addEventListener("DOMContentLoaded", function () {
    const renderData = document.querySelector(".renderData");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    async function getData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();

            console.log(data);

            if (data.docs && data.docs.length > 0) {
                renderBooks(data.docs);
            } else {
                renderData.textContent = "No books found.";
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            renderData.textContent = "Error fetching data.";
        }
    }

    function renderBooks(books) {
        renderData.innerHTML = "";
        books.forEach(item => {
            const title = item.title;
            const coverUrl = `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`;
            const author = item.author_name ? item.author_name.join(", ") : "Unknown";
            const publishYear = item.first_publish_year || "Unknown";

            let bookCard = document.createElement("div");
            bookCard.classList.add("book-card");

            let createImgEle = document.createElement("img");
            createImgEle.setAttribute("src", coverUrl);
            createImgEle.setAttribute("alt", `${title} cover`);

            let createTitle = document.createElement("p");
            createTitle.innerHTML = `<b>Title:</b> ${title}`;

            let createAuthor = document.createElement("p");
            createAuthor.innerHTML = `<b>Author:</b> ${author}`;

            let createPublishYear = document.createElement("p");
            createPublishYear.innerHTML = `<b>First Published:</b> ${publishYear}`;

            bookCard.appendChild(createImgEle);
            let bookInfo = document.createElement("div");
            bookInfo.classList.add("book-info");
            bookInfo.appendChild(createTitle);
            bookInfo.appendChild(createAuthor);
            bookInfo.appendChild(createPublishYear);
            bookCard.appendChild(bookInfo);

            renderData.appendChild(bookCard);
        });
    }

    searchBtn.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== "") {
            const searchUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`;
            getData(searchUrl);
        }
    });


    const initialUrl = "https://openlibrary.org/search.json?q=the+lord+of+the+rings";
    getData(initialUrl);
});
