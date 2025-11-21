const allgadgets = document.getElementById("allgadgets");

const gadgetCategories = [
  "smartphones",
  "laptops",
  "tablets",
  "mobile-accessories",
  "computer-accessories",
];

async function loadGadgets() {
  try {
    let allProducts = [];

    const res = await fetch(
      `https://dummyjson.com/products/category/smartphones`
    );
    const data = await res.json();
    allProducts = allProducts.concat(data.products);

    displayProducts(allProducts);
  } catch (err) {
    console.log("Error fetching gadgets:", err);
  }
}

loadGadgets();

function displayProducts(products) {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.id = "product-card";

    card.innerHTML = `
      <div id="product-content">
        <img id="product-img" src="${product.thumbnail}" alt="${product.title}">
        <h3 id="product-title">${product.title}</h3>
        <p id="product-price">$${product.price}</p>

        <button 
          class="add-cart"
          data-id="${product.id}"
          data-title="${product.title}"
          data-price="${product.price}"
          data-image="${product.thumbnail}">
          Add to Cart
        </button>
      </div>
    `;

    allgadgets.appendChild(card);
  });

  attachCartButtons();
}

function attachCartButtons() {
  const buttons = document.querySelectorAll(".add-cart");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const title = btn.getAttribute("data-title");
      const price = btn.getAttribute("data-price");
      const image = btn.getAttribute("data-image");

      addToCart({ id, title, price, image });
    });
  });
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("numofcart").textContent = cart.length;
}

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert("Added to cart!");
}

updateCartCount();
