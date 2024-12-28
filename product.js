// products.js
$(document).ready(function() {
    // Load products dynamically
    $.ajax({
        url: 'products.json',
        type: 'GET',
        success: function(data) {
            displayProducts(data.products);
            initializeSearch();
            initializeCart();
        },
        error: function(err) {
            console.error('Error loading products:', err);
        }
    });

    // Display products function
    function displayProducts(products) {
        const productsContainer = $('.products-section');
        productsContainer.empty();

        products.forEach(product => {
            productsContainer.append(`
                <div class="product" data-name="${product.name.toLowerCase()}">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span>$${product.price}</span>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="favorite-btn" data-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            `);
        });
    }

    // Search functionality
    function initializeSearch() {
        $('#search-input').on('input', function() {
            const searchTerm = $(this).val().toLowerCase();
            $('.product').each(function() {
                const productName = $(this).data('name');
                $(this).toggle(productName.includes(searchTerm));
            });
        });
    }

    // Enhanced cart functionality
    function initializeCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        updateCartCount();

        // Add to cart
        $('.add-to-cart').click(function() {
            const productId = $(this).data('id');
            cart.push(productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showMessage('Product added to cart!');
        });

        // Toggle favorite
        $('.favorite-btn').click(function() {
            const productId = $(this).data('id');
            const index = favorites.indexOf(productId);
            
            if (index === -1) {
                favorites.push(productId);
                $(this).find('i').removeClass('far').addClass('fas');
            } else {
                favorites.splice(index, 1);
                $(this).find('i').removeClass('fas').addClass('far');
            }
            
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        $('.cart-count').text(cart.length);
    }

    function showMessage(message) {
        const messageDiv = $('<div>').addClass('message').text(message);
        $('body').append(messageDiv);
        setTimeout(() => messageDiv.remove(), 2000);
    }
});   // Existing functions...

// Add search functionality
function initializeSearch() {
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', function () {
        const searchTerm = searchBar.value.toLowerCase();
        const products = document.querySelectorAll('.product');
        
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            product.style.display = productName.includes(searchTerm) ? '' : 'none';
        });
    });
}

// Ensure to call this function when products are loaded
initializeSearch();

// Shopping cart functionality update
function addToCart(productName, price, image) {
    cart.push({ name: productName, price: parseFloat(price), image: image });
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    cartItemsContainer.innerHTML = "";

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

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function searchPerfumes() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const products = document.querySelectorAll(".product"); // Select all product elements

    products.forEach(product => {
        const productName = product.querySelector("h3").textContent.toLowerCase();
        if (productName.includes(query)) {
            product.style.display = "block"; // Show matching product
        } else {
            product.style.display = "none"; // Hide non-matching product
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    // Ensure the search function initializes properly
    searchPerfumes();
});
