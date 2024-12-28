let cart = [];

// Add to cart functionality
function addToCart(productName, price, image) {
    cart.push({ name: productName, price: price, image: image });
    updateCart();
}

// Update cart and total price
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    cartItemsContainer.innerHTML = ""; // Clear existing items

    let totalPrice = 0;
    cart.forEach((item, index) => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button class="remove-item" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        totalPrice += item.price;
    });

    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Clear cart
function clearCart() {
    cart = [];
    updateCart();
}
<button onclick="addToCart('Product Name', 29.99, 'path/to/image.jpg')">Add to Cart</button>






