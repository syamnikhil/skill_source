let cart = [];

// Add to cart function
function addToCart(title, price) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.title === title);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            title: title, 
            price: price,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartModal();
    
    // Show success message
    const toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 end-0 p-3';
    toast.innerHTML = `
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Added to cart</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${title} has been added to your cart.
            </div>
        </div>
    `;
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Update cart count in navbar
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Update cart modal content
function updateCartModal() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p class="text-center">Your cart is empty</p>';
        cartTotalElement.textContent = '0';
        return;
    }
    
    let itemsHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">₹${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="remove-item" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `;
    });
    
    cartItemsElement.innerHTML = itemsHTML;
    cartTotalElement.textContent = total;
}

// Update item quantity
function updateQuantity(index, change) {
    const newQuantity = cart[index].quantity + change;
    
    if (newQuantity < 1) {
        removeFromCart(index);
    } else {
        cart[index].quantity = newQuantity;
        updateCartCount();
        updateCartModal();
    }
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartModal();
}

// Initialize cart modal
document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cart-button');
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    
    cartButton.addEventListener('click', function() {
        updateCartModal();
        cartModal.show();
    });
});