// --- Авторизація ---
const modal = document.getElementById("loginModal");
const btn = document.getElementById("loginBtn");
const span = document.querySelector(".close");

btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target == modal) modal.style.display = "none"; }

// --- Кошик ---
const cartModal = document.getElementById("cartModal");
const cartItemsList = document.getElementById("cartItems");

function openCart() {
  renderCart();
  cartModal.style.display = "block";
}

function closeCart() {
  cartModal.style.display = "none";
}

window.onclick = function(e) {
  if (e.target === cartModal) closeCart();
};

function addToCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsList.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item} <button onclick="removeItem(${index})">✖</button>`;
    cartItemsList.appendChild(li);
  });
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function clearCart() {
  localStorage.removeItem("cart");
  renderCart();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", updateCartCount);

// --- Показати/сховати характеристики ---
function toggleSpecs() {
  const extraRows = document.querySelectorAll('.extra');
  const button = document.querySelector('.show-more-btn');

  extraRows.forEach(row => {
    if (row.style.display === "table-row") {
      row.style.display = "none";
    } else {
      row.style.display = "table-row";
    }
  });

  if (button.innerText.includes("Показати")) {
    button.innerText = "Сховати −";
  } else {
    button.innerText = "Показати ще +";
  }
}

// Купити модалка
const buyModal = document.getElementById("buyModal");
const selectedProductInput = document.getElementById("selectedProduct");

document.body.addEventListener("click", function(e) {
  if (e.target.classList.contains("buy-button")) {
    const product = e.target.getAttribute("data-product");
    selectedProductInput.value = product;
    buyModal.style.display = "block";
  }
  if (e.target.classList.contains("close")) {
    buyModal.style.display = "none";
  }
  if (e.target === buyModal) {
    buyModal.style.display = "none";
  }
});

  document.addEventListener('DOMContentLoaded', function () {
    const sortSelect = document.getElementById('sort');
    const productGrid = document.querySelector('.product-grid');
    const originalProducts = Array.from(productGrid.children);

    sortSelect.addEventListener('change', () => {
      let sortedProducts;

      if (sortSelect.value === 'low-to-high') {
        sortedProducts = [...originalProducts].sort((a, b) =>
          parseInt(a.dataset.price) - parseInt(b.dataset.price)
        );
      } else if (sortSelect.value === 'high-to-low') {
        sortedProducts = [...originalProducts].sort((a, b) =>
          parseInt(b.dataset.price) - parseInt(a.dataset.price)
        );
      } else {
        sortedProducts = originalProducts;
      }

      // Очистити і знову додати відсортовані
      productGrid.innerHTML = '';
      sortedProducts.forEach(product => productGrid.appendChild(product));
    });
  });

  function filterByPrice() {
  const min = parseInt(document.getElementById("minPrice").value) || 0;
  const max = parseInt(document.getElementById("maxPrice").value) || Infinity;

  document.querySelectorAll('.product-card').forEach(card => {
    const price = parseInt(card.dataset.price);
    if (price >= min && price <= max) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function filterByManufacturer() {
  const selected = document.getElementById("manufacturerFilter").value;

  document.querySelectorAll('.product-card').forEach(card => {
    const title = card.querySelector('h3').textContent;
    if (selected === "all" || title.includes(selected)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}