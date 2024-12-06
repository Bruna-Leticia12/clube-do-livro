// Mock Data
const users = [
  { email: "user1@example.com", password: "password123" },
  { email: "bruna@example.com", password: "bruna123" },
];

generateBooks = () => {
  let books = [];

  for (let i = 1; i <= 71; i++) {
    books.push({
      title: `Livro ${i}`,
      price: Math.floor(Math.random() * (10 - 500 + 1)) + 10,
      image: `/assets/livro-${i}.jpg`,
    });
  }

  return books;
};

const books = generateBooks();

// Login Logic
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    window.location.href = "home.html";
  } else {
    document.getElementById("errorMessage").classList.remove("d-none");
  }
});

// Home Logic
if (document.getElementById("booksGrid")) {
  const booksGrid = document.getElementById("booksGrid");
  books.forEach((book) => {
    console.log(book);
    booksGrid.innerHTML += `
        <div class="col-md-4">
          <div class="card">
            <img src="${book.image}" class="card-img-top" alt="${book.title}">
            <div class="card-body text-center">
              <h5>${book.title}</h5>
              <p>R$${book.price.toFixed(2)}</p>
              <button class="btn btn-primary" onclick="purchase('${
                book.title
              }', ${book.price}, '${book.image}')">Comprar</button>
            </div>
          </div>
        </div>
      `;
  });
}

function purchase(title, price, image) {
  localStorage.setItem("selectedBook", JSON.stringify({ title, price, image }));
  window.location.href = "compra.html";
}

// Purchase Page Logic
if (document.getElementById("bookImage")) {
  const book = JSON.parse(localStorage.getItem("selectedBook"));
  document.getElementById("bookImage").src = book.image;
  document.getElementById("price").value = `R$${book.price.toFixed(2)}`;

  const paymentSelect = document.getElementById("payment");
  const purchaseBtn = document.getElementById("purchaseBtn");

  paymentSelect.addEventListener("change", () => {
    purchaseBtn.disabled = paymentSelect.value === "";
  });

  purchaseBtn.addEventListener("click", () => {
    alert("Compra realizada com sucesso!");
    window.location.href = "home.html";
  });
}

// Logout Logic
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  window.location.href = "index.html";
});
