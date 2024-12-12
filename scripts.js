// Mock Data
const users = [
  { email: "user1@example.com", password: "password123" },
  { email: "bruna@example.com", password: "bruna123" },
];

const generateBooks = () => {
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
    const availability = Math.random() < 0.8 ? "Disponível" : "Indisponível";
    booksGrid.innerHTML += `
        <div class="col-md-4">
          <div class="card">
            <img src="${book.image}" class="card-img-top" alt="${book.title}">
            <div class="card-body text-center">
              <h5>${book.title}</h5>
              <p>${availability}</p>
              <button class="btn btn-primary" ${availability === "Indisponível" ? "disabled" : ""
      } onclick="purchase('${book.title}', ${book.price}, '${book.image}')">Reservar</button>
            </div>
          </div>
        </div>
      `;
  });
}

// Função de compra
function purchase(title, price, image) {
  localStorage.setItem("selectedBook", JSON.stringify({ title, price, image }));
  window.location.href = "compra.html";
}

// Lógica da página de compra
if (document.getElementById("bookImage")) {
  const book = JSON.parse(localStorage.getItem("selectedBook"));
  document.getElementById("bookImage").src = book.image;

  const cpfInput = document.getElementById("cpf");
  const cpfError = document.getElementById("cpfError");
  const purchaseBtn = document.getElementById("purchaseBtn");

  cpfInput.addEventListener("input", (e) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    const isValidCpf = validateCpf(value);

    cpfError.style.display = "none";

    if (e.target.value.length === 14) {

      if (!isValidCpf) {
        cpfError.style.display = "block";
      }
    }

    purchaseBtn.disabled = !isValidCpf || !document.getElementById("name").value.trim();
  });

  purchaseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    alert("Reserva de livro realizada com sucesso!");

    setTimeout(() => {
      window.location.href = "home.html";
    }, 0);
  });
}

// Função de validação de CPF
function validateCpf(cpf) {
  if (cpf.length !== 11) {
    return false;
  }

  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
  resto = (soma * 10) % 11;
  return resto === parseInt(cpf[10]);
}
