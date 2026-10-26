// Substitua pelo número de WhatsApp da sua loja (código do país + DDD + número)
const PHONE_NUMBER = "5511999999999"; 

const products = [
    { 
        id: 1, 
        name: "Cupcake de Morango", 
        price: 8.50, 
        category: "doces",
        image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 2, 
        name: "Macaron Colorido", 
        price: 5.00, 
        category: "doces",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 3, 
        name: "Donut Recheado", 
        price: 7.00, 
        category: "doces",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 4, 
        name: "Brigadeiro Gourmet", 
        price: 4.00, 
        category: "doces",
        image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 5, 
        name: "Brownie com Nutella", 
        price: 12.00, 
        category: "bolos",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 6, 
        name: "Cookie Choco-Chips", 
        price: 6.50, 
        category: "doces",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 7, 
        name: "Cheesecake de Frutas Vermelhas", 
        price: 15.00, 
        category: "gelados",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 8, 
        name: "Torta de Limão", 
        price: 10.00, 
        category: "bolos",
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 9, 
        name: "Pudim Tradicional", 
        price: 9.00, 
        category: "gelados",
        image: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=500&q=80" 
    }
];

let cart = [];
let currentCategory = 'all';

const productsGrid = document.getElementById("products-grid");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotalPrice = document.getElementById("cart-total-price");

// Renderizar Produtos com base na Categoria e Pesquisa
function renderProducts() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();

    let filtered = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Nenhum doce encontrado. 🍬</p>`;
        return;
    }

    productsGrid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        </div>
    `).join('');
}

// Filtrar por Categoria
function filterCategory(category) {
    currentCategory = category;
    
    // Atualizar botões ativos
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    renderProducts();
}

// Pesquisar Produtos
function searchProducts() {
    renderProducts();
}

// Adicionar ao Carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// Alterar Quantidade no Carrinho (+ / -)
function changeQuantity(productId, delta) {
    const cartItem = cart.find(item => item.id === productId);
    if (!cartItem) return;

    cartItem.quantity += delta;

    if (cartItem.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
    }
}

// Remover Item do Carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Atualizar Interface do Carrinho
function updateCartUI() {
    cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
        cartTotalPrice.innerText = "R$ 0,00";
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeFromCart(${item.id})" style="background: #ff5252; color: white; border: none; padding: 3px 8px; border-radius: 5px; cursor: pointer; margin-left: 8px;">✕</button>
                </div>
            </div>
        `;
    }).join('');

    cartTotalPrice.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Finalizar Compra e Enviar para WhatsApp com Pagamento Escolhido
function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const paymentMethod = document.getElementById("payment-method").value;

    let message = "*🍬 Novo Pedido - SweetCandy 🍬*\n\n";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `• ${item.quantity}x ${item.name} - R$ ${itemTotal.toFixed(2).replace('.', ',')}\n`;
    });

    message += `\n*Forma de Pagamento:* ${paymentMethod}`;
    message += `\n*Total a Pagar:* R$ ${total.toFixed(2).replace('.', ',')}`;
    message += "\n\nObrigado por comprar na SweetCandy! 🍭";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    cart = [];
    updateCartUI();
    cartModal.style.display = "none";
}

// Modal Listeners
cartBtn.addEventListener("click", () => cartModal.style.display = "flex");
closeCart.addEventListener("click", () => cartModal.style.display = "none");
window.addEventListener("click", (e) => {
    if (e.target === cartModal) cartModal.style.display = "none";
});

// Inicialização
renderProducts();