const productData = {
  new: [
    { id: 1, name: "Homalomena Rubescens", price: "$4.00", image: "homalomena.png", highlight: true },
    { id: 2, name: "Licuala Grandis", price: "$4.00", image: "licuala.png", highlight: false },
    { id: 3, name: "Fiddle Leaf Fig", price: "$4.00", image: "fiddle.png", highlight: false },
    { id: 4, name: "Snake Plant", price: "$5.50", image: "snake.png", highlight: false },
    { id: 5, name: "Mint Herbal Plant", price: "$3.50", image: "mint.png", highlight: false },
    { id: 6, name: "Monstera Deliciosa", price: "$6.00", image: "monstera.png", highlight: false }
  ],
  best: [
    { id: 3, name: "Fiddle Leaf Fig", price: "$4.00", image: "https://png.pngtree.com/png-vector/20230922/ourmid/pngtree-fiddle-leaf-fig-in-black-pot-png-image_10138980.png", highlight: true },
    { id: 1, name: "Homalomena Rubescens", price: "$4.00", image: "https://png.pngtree.com/png-vector/20230922/ourmid/pngtree-homalomena-rubescens-in-black-pot-png-image_10138988.png", highlight: false },
    { id: 5, name: "Mint Herbal Plant", price: "$3.50", image: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-mint-plant-in-pot-png-image_10255866.png", highlight: false }
  ],
  favorites: [
    { id: 2, name: "Licuala Grandis", price: "$4.00", image: "https://png.pngtree.com/png-vector/20230922/ourmid/pngtree-small-palm-plant-in-black-pot-png-image_10138992.png", highlight: true },
    { id: 4, name: "Snake Plant", price: "$5.50", image: "https://png.pngtree.com/png-vector/20230906/ourmid/pngtree-succulent-plant-in-pot-png-image_9984210.png", highlight: false }
  ]
};

let cartCount = 0;

const productsGrid = document.getElementById('products-grid');
const tabButtons = document.querySelectorAll('.tab-btn');

function renderProducts(category) {
  productsGrid.style.opacity = '0';
  
  setTimeout(() => {
    productsGrid.innerHTML = '';
    const items = productData[category] || [];

    items.forEach(product => {
      const card = document.createElement('div');
      card.className = `product-card ${product.highlight ? 'active-card' : ''}`;
      card.innerHTML = `
        <div class="product-img-box">
          ${product.highlight ? '<div class="white-badge"></div>' : ''}
          <img src="${product.image}" alt="${product.name}">
          <button class="add-to-cart-btn" onclick="addToCart('${product.name}')">Add to Cart</button>
        </div>
        <div class="product-info">
          <h4>${product.name}</h4>
          <div class="price">${product.price}</div>
        </div>
      `;
      productsGrid.appendChild(card);
    });

    productsGrid.style.opacity = '1';
  }, 200);
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    renderProducts(filter);
  });
});

function addToCart(productName) {
  cartCount++;
  document.getElementById('cart-count').innerText = cartCount;
  showToast(`"${productName}" ditambahkan ke keranjang!`);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    showToast(`Terima kasih telah berlangganan dengan ${emailInput.value}!`);
    emailInput.value = '';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts('new');
});