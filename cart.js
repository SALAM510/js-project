let cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart-items");

function loadCart() {
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<h3>Your cart is empty</h3>";
    return;
  }

  cart.forEach((item, index) => {
    container.innerHTML += `
            <div id="cart-item">
                <img src="${item.image}" alt="">
                <h4>${item.title}</h4>
                <p>$${item.price}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
  });

  removeItem();
}

function removeItem() {
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.onclick = () => {
      let index = btn.dataset.index;

      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    };
  });
}

loadCart();


