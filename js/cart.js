// Shopping Cart
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('classicMenCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartCount();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('classicMenCart', JSON.stringify(cart));
}

// Update cart count in header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
}

// Add to cart function
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showToast(`${product.name} added to cart`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartCount();
        }
    }
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});