let cartCount = 0;
let products = [];

$(document).ready(function () {
  // Load products from JSON
  $.getJSON('products.json', function (data) {
    products = data;
    renderProducts(products);
  });

  // Add to cart functionality (update both desktop and mobile counts)
  $(document).on('click', '.add-to-cart', function () {
    cartCount++;
    $('#cart-count').text(cartCount);
    $('#cart-count-mobile').text(cartCount);
  });

  // Remove product card
  $(document).on('click', '.remove-product', function () {
    $(this).closest('[class^="col-"], [class*=" col-"]').fadeOut();
  });

  // Search functionality
  $('#search').on('keyup', function () {
    const query = $(this).val().toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
  });

  // Sync search bar for mobile and desktop
  $('#search-mobile').on('keyup', function () {
    $('#search').val($(this).val()).trigger('keyup');
  });
  $('#search').on('keyup', function () {
    $('#search-mobile').val($(this).val());
  });

   // Show modal on image or name click
  $(document).on('click', '.product-img, .card-title', function () {
    const id = $(this).data('id');
    const product = products.find(p => p.id == id);
    if (product) {
      $('#modalTitle').text(product.name);
      $('#modalImage').attr('src', product.image);
      $('#modalDescription').text(product.description);
      $('#modalPrice').text(product.price);
      const modal = new bootstrap.Modal(document.getElementById('productModal'));
      modal.show();
    }
  });
});

// Render products to DOM
function renderProducts(productList) {
  const container = $('#product-grid');
  container.empty();
  if (productList.length === 0) {
    container.append('<p class="text-center">No products found.</p>');
    return;
  }

  productList.forEach(product => {
    const card = `
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100">
          <img src="${product.image}" class="card-img-top product-img" data-id="${product.id}" alt="${product.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title" data-id="${product.id}" style="cursor:pointer">${product.name}</h5>
            <p class="card-text">${product.price}</p>
            <div class="btn-group mt-auto">
              <button class="btn btn-primary btn-sm add-to-cart">Add to Cart</button>
              <button class="btn btn-danger btn-sm remove-product">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `;
    container.append(card);
  });
}