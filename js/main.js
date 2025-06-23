// Handle mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    };

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(loginForm)) {
                // Add your login logic here
                console.log('Login form submitted');
            }
        });
    }

    // Handle signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(signupForm)) {
                // Add your signup logic here
                console.log('Signup form submitted');
            }
        });
    }

    // Product search functionality
    const searchInput = document.getElementById('searchProducts');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const products = document.querySelectorAll('.product-card');
            
            products.forEach(product => {
                const title = product.querySelector('h3').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }

    // Cart logic using localStorage
    function getCart() {
        return JSON.parse(localStorage.getItem('fragmen_cart') || '[]');
    }
    function setCart(cart) {
        localStorage.setItem('fragmen_cart', JSON.stringify(cart));
    }
    function addToCart(productId) {
        const cart = getCart();
        const found = cart.find(item => item.id === productId);
        if (found) {
            found.qty += 1;
        } else {
            const prod = productDetails.find(p => p.id === productId);
            if (prod) cart.push({ id: prod.id, title: prod.title, price: prod.price, img: prod.img, qty: 1 });
        }
        setCart(cart);
    }

    // Product details array
    const productDetails = [
        {
            id: '1',
            title: 'Ocean Breeze',
            desc: 'A fresh and invigorating scent with notes of sea salt and citrus.',
            price: '$89.99',
            img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
            category: 'men'
        },
        {
            id: '2',
            title: 'Midnight Rose',
            desc: 'An enchanting blend of rose and exotic spices.',
            price: '$99.99',
            img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
            category: 'women'
        },
        {
            id: '3',
            title: 'Golden Amber',
            desc: 'A warm and sophisticated fragrance with amber and vanilla notes.',
            price: '$119.99',
            img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
            category: 'unisex'
        },
        {
            id: '4',
            title: 'Citrus Wood',
            desc: 'Vibrant citrus with a woody base for a bold impression.',
            price: '$79.99',
            img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
            category: 'men'
        },
        {
            id: '5',
            title: 'Blossom Dream',
            desc: 'Floral notes with a hint of musk for a dreamy finish.',
            price: '$109.99',
            img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
            category: 'women'
        },
        {
            id: '6',
            title: 'Pure Essence',
            desc: 'Minimalist, clean, and fresh for every occasion.',
            price: '$129.99',
            img: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80',
            category: 'unisex'
        }
    ];

    // Modal elements
    const modal = document.getElementById('productModal');
    const modalDetails = document.getElementById('modalDetails');

    document.addEventListener('click', function(e) {
        const addBtn = e.target.closest('.add-to-cart');
        const viewBtn = e.target.closest('.view-details');
        if (addBtn) {
            const id = addBtn.dataset.productId;
            addToCart(id);
            addBtn.textContent = 'Added!';
            setTimeout(() => { addBtn.textContent = 'Add to Cart'; }, 1200);
        }
        if (viewBtn) {
            const id = viewBtn.dataset.productId;
            const prod = productDetails.find(p => p.id === id);
            if (prod && modal && modalDetails) {
                modalDetails.innerHTML = `
                    <img src="${prod.img}" alt="${prod.title}" style="width:200px;display:block;margin:0 auto 1rem;">
                    <h2>${prod.title}</h2>
                    <p>${prod.desc}</p>
                    <p class="product-price">${prod.price}</p>
                    <button class='btn btn-primary add-to-cart' data-product-id='${prod.id}'>Add to Cart</button>
                `;
                modal.style.display = 'flex';
            }
        }
    });
    if (modal && modalDetails) {
        document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
        window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };
    }

    // Cart page rendering
    if (window.location.pathname.endsWith('cart.html')) {
        const cartItemsDiv = document.getElementById('cartItems');
        const cart = getCart();
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartItemsDiv.innerHTML = cart.map(item => `
                <div class='cart-item'>
                    <img src='${item.img}' alt='${item.title}' style='width:60px;height:60px;object-fit:cover;border-radius:8px;margin-right:1rem;'>
                    <span style='font-weight:600;'>${item.title}</span>
                    <span>Qty: <button class='cart-qty' data-id='${item.id}' data-action='dec'>-</button> ${item.qty} <button class='cart-qty' data-id='${item.id}' data-action='inc'>+</button></span>
                    <span style='margin-left:1rem;'>${item.price}</span>
                    <button class='remove-cart' data-id='${item.id}' style='margin-left:1rem;color:red;'>Remove</button>
                </div>
            `).join('') + `<hr><div style='text-align:right;font-size:1.2rem;font-weight:700;'>Total: $${cart.reduce((sum, i) => sum + (parseFloat(i.price.replace('$','')) * i.qty), 0).toFixed(2)}</div>`;
            // Quantity and remove handlers
            cartItemsDiv.querySelectorAll('.cart-qty').forEach(btn => {
                btn.onclick = () => {
                    const id = btn.dataset.id;
                    const action = btn.dataset.action;
                    const cart = getCart();
                    const item = cart.find(i => i.id === id);
                    if (item) {
                        if (action === 'inc') item.qty += 1;
                        if (action === 'dec' && item.qty > 1) item.qty -= 1;
                        setCart(cart);
                        location.reload();
                    }
                };
            });
            cartItemsDiv.querySelectorAll('.remove-cart').forEach(btn => {
                btn.onclick = () => {
                    const id = btn.dataset.id;
                    let cart = getCart();
                    cart = cart.filter(i => i.id !== id);
                    setCart(cart);
                    location.reload();
                };
            });
        }
    }

    // Category filter functionality
    const categoryBtns = document.querySelectorAll('.category-btn');
    if (categoryBtns.length) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = btn.dataset.category;
                const products = document.querySelectorAll('.product-card');
                if (category === 'all') {
                    products.forEach(p => p.style.display = 'block');
                } else {
                    products.forEach(p => {
                        if (p.dataset.category === category) {
                            p.style.display = 'block';
                        } else {
                            p.style.display = 'none';
                        }
                    });
                }
                // Remove active from all, add to current
                categoryBtns.forEach(b => b.classList.remove('btn-primary'));
                btn.classList.add('btn-primary');
            });
        });
    }
});
