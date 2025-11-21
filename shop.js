const url = "https://dummyjson.com/products";
const fetchData = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

let allProducts = document.querySelector("#allgadgets");

fetch(url, fetchData)
  .then((response) => response.json())
  .then((data) => {
    let products = data.products;

    allProducts.innerHTML = products
      .map((value) => {
        return `
        <div class="eachProduct">
          <img src="${value.thumbnail}" alt="">
          <p>${value.title}</p>
          <p>$${value.price}</p>
          <button 
            class="addToCartBtn"
            data-id="${value.id}"
            data-title="${value.title}"
            data-price="${value.price}"
            data-image="${value.thumbnail}">
            Add to Cart
          </button>
        </div>
      `;
      })
      .join("");

    const buttons = document.querySelectorAll(".addToCartBtn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const product = {
          id: e.target.getAttribute("data-id"),
          title: e.target.getAttribute("data-title"),
          price: e.target.getAttribute("data-price"),
          image: e.target.getAttribute("data-image"),
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${product.title} added to cart!`);
      });
    });
  })
  .catch((error) => {
    alert("Error fetching product");
    console.log(error);
  });

  