// Product Database - Using your actual images
const products = [
    {
        id: 1,
        name: 'Classic Navy Wool Suit',
        category: 'suits',
        price: 899,
        image: 'asset/suit1.PNG',
        description: 'Tailored navy wool suit, single-breasted with notch lapel. Perfect for business and formal occasions.'
    },
    {
        id: 2,
        name: 'Charcoal Gray Executive Suit',
        category: 'suits',
        price: 899,
        image: 'asset/suit2.PNG',
        description: 'Essential charcoal gray suit, versatile for any occasion from boardroom to evening events.'
    },
    {
        id: 3,
        name: 'Pinstripe Black Formal Suit',
        category: 'suits',
        price: 999,
        image: 'asset/suit3.PNG',
        description: 'Classic black pinstripe suit for the executive. Timeless elegance with modern fit.'
    },
    {
        id: 4,
        name: 'Midnight Blue Tuxedo',
        category: 'suits',
        price: 1099,
        image: 'asset/suit4.PNG',
        description: 'Elegant midnight blue tuxedo with satin peak lapels. Perfect for black-tie events.'
    },
    {
        id: 5,
        name: 'Premium Leather Oxford Boots',
        category: 'footwear',
        price: 349,
        image: 'asset/boots1.PNG',
        description: 'Handcrafted leather Oxford boots with Goodyear welt construction. Classic design meets modern comfort.'
    },
    {
        id: 6,
        name: 'Chelsea Leather Boots',
        category: 'footwear',
        price: 299,
        image: 'asset/boots2.PNG',
        description: 'Sleek Chelsea boots in premium leather. Elastic side panels for easy wear.'
    },
    {
        id: 7,
        name: 'Wingtip Brogue Boots',
        category: 'footwear',
        price: 379,
        image: 'asset/boots3.PNG',
        description: 'Detailed wingtip brogue boots with intricate perforations. Classic English styling.'
    },
    {
        id: 8,
        name: 'Classic White Dress Shirt',
        category: 'shirts',
        price: 149,
        image: 'asset/suit1.PNG',
        description: '100% Egyptian cotton dress shirt with French cuffs. Perfect with any suit.'
    },
    {
        id: 9,
        name: 'Silk Tie Collection',
        category: 'accessories',
        price: 89,
        image: 'asset/suit2.PNG',
        description: 'Premium silk tie in classic patterns. Hand-finished in Italy.'
    },
    {
        id: 10,
        name: 'Silver Cufflinks Set',
        category: 'accessories',
        price: 129,
        image: 'asset/suit3.PNG',
        description: 'Sterling silver cufflinks with engravable surface. Presented in luxury box.'
    },
    {
        id: 11,
        name: 'Pocket Square Set',
        category: 'accessories',
        price: 59,
        image: 'asset/suit4.PNG',
        description: 'Set of 3 silk pocket squares in classic white and patterns.'
    },
    {
        id: 12,
        name: 'Leather Belt',
        category: 'accessories',
        price: 89,
        image: 'asset/boots1.PNG',
        description: 'Full-grain leather belt with polished buckle. Made in Italy.'
    }
];

// Render products
function renderProducts(productList, containerId = 'shopProducts') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (productList.length === 0) {
        container.innerHTML = '<p style="text-align:center; grid-column:1/-1;">No products found in this category.</p>';
        return;
    }
    
    productList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='suit1.PNG'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category.toUpperCase()}</p>
                <p class="product-price">$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                    ADD TO CART
                </button>
            </div>
        `;
        container.appendChild(productCard);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const product = {
                id: parseInt(btn.dataset.id),
                name: btn.dataset.name,
                price: parseFloat(btn.dataset.price)
            };
            addToCart(product);
        });
    });
}

// Filter products
function filterProducts(category) {
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Initialize shop page
document.addEventListener('DOMContentLoaded', () => {
    // Render featured products on homepage
    const featuredContainer = document.getElementById('featuredProducts');
    if (featuredContainer) {
        // Show first 4 products on homepage
        const featuredProducts = products.slice(0, 4);
        renderProducts(featuredProducts, 'featuredProducts');
    }
    
    // Render all products on shop page
    const shopContainer = document.getElementById('shopProducts');
    if (shopContainer) {
        renderProducts(products);
        
        // Add filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterProducts(btn.dataset.category);
            });
        });
    }
});