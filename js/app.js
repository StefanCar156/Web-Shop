const addBtns = document.querySelectorAll(".add-btn");
const addedProducts = document.querySelector(".added-products");
const removeBtn = document.querySelectorAll(".remove-item");
const totalOutput = document.querySelector("#total");

// If Cart is Empty, Display Empty

window.onload = isCartEmpty();

function isCartEmpty() {
  if (addedProducts.querySelectorAll("li").length > 0) {
    addedProducts.querySelector(".empty-cart").remove();
  } else {
    addedProducts.innerHTML = `
    <h1 class="empty-cart">Your cart is currently empty.</h1>
  `;
  }
}

// Add Product To Cart

function addItemToCart(e) {
  const newAddedItem = document.createElement("li");
  const newTitleText = e.target.parentElement.children[1].textContent;
  const newPriceText = e.target.parentElement.children[2].textContent;
  const cartItemNames = document.querySelectorAll(".added-name");

  // Prevent Adding Same Product Twice

  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].textContent == newTitleText) {
      alert("This item is already added to the cart.");
      return;
    }
  }

  newAddedItem.innerHTML = `<li class="added-item">
      <span class="added-name">${newTitleText}</span>
      <span class="added-price">${newPriceText}</span><span> &#10006; </span>
      <input type="number" value="1" width="2" class="quantity">
      <button class="remove-item"></button>
    </li>`;

  addedProducts.appendChild(newAddedItem);

  updateTotal();
  numberBubble();
  isCartEmpty();
}

addBtns.forEach((addBtn) => {
  addBtn.addEventListener("click", addItemToCart);
});

// Update Total

function updateTotal() {
  const newAddedItem = addedProducts.querySelectorAll(".added-item");
  let total = 0;

  newAddedItem.forEach((item) => {
    const itemPrice = parseFloat(
      item.querySelector(".added-price").textContent.replace("$", "")
    );
    const itemQuantity = item.querySelector(".quantity").value;

    total += itemPrice * itemQuantity;

    totalOutput.value = `$${total}`;
  });
}

// Remove Product From Cart + Update Total On Quantity Change

function removeItem(e) {
  e.target.parentElement.remove();
  if (addedProducts.querySelectorAll(".added-item").length == 0) {
    totalOutput.value = "";
    addedProducts.innerHTML = `
    <h1 class="empty-cart">Your cart is currently empty.</h1>
  `;
  }
}

addedProducts.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("remove-item")) {
    removeItem(e);
    updateTotal();
    numberBubble();
    isCartEmpty();
  } else if (e.target && e.target.classList.contains("quantity")) {
    if (e.target.value < 1 || isNaN(e.target.value)) {
      e.target.value = 1;
    }
    e.target.onchange = updateTotal();
  }
});

// Open Cart Container

const cartBtn = document.querySelector("#cart-btn");
const cartContainer = document.querySelector(".cart-container");

cartBtn.addEventListener("click", () => {
  cartContainer.classList.toggle("cart-container-open");
});

function numberBubble() {
  const numberBubble = document.querySelector("#number-bubble");

  numberBubble.textContent = addedProducts.querySelectorAll(
    ".added-item"
  ).length;
}

//  Reset After Confirm

const confirmBtn = document.querySelector("#confirm-btn");

confirmBtn.addEventListener("click", () => {
  // Prevent Confim if Cart is Empty

  if (addedProducts.querySelectorAll("li").length == 0) {
    alert(
      "Your cart is still empty. It would be nice if you bought something :)"
    );
  } else {
    //Reset Total, Remove All Products, Reset Bubble, Display Empty

    alert(`Your purchase of ${totalOutput.value} is confirmed!`);
    totalOutput.value = "";
    addedProducts.querySelectorAll(".added-item").forEach((item) => {
      item.remove();
    });
    document.querySelector("#number-bubble").textContent = 0;
    addedProducts.innerHTML = `
    <h1 class="empty-cart">Your cart is currently empty.</h1>
  `;
  }
});
