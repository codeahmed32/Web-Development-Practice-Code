// Initial Data Array
let products = [
  {
    id: 1,
    title: "Modern Headphones",
    image: "https://via.placeholder.com/150",
    description: "High-quality sound with noise cancellation."
  },
  {
    id: 2,
    title: "Smart Watch",
    image: "https://via.placeholder.com/150",
    description: "Track your fitness and notifications on the go."
  }
];

// Function to render the list to the HTML
function renderProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = ""; // Clear existing content

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="card-content">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="actions">
          <button class="update-btn" onclick="updateProduct(${product.id})">Update</button>
          <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Function to delete a product
function deleteProduct(id) {
  // Filter out the item with the matching ID
  products = products.filter((item) => item.id !== id);
  renderProducts(); // Refresh the UI
}

// Function to update product details
function updateProduct(id) {
  // Find the specific object in the array
  const productIndex = products.findIndex((item) => item.id === id);

  if (productIndex !== -1) {
    const newTitle = prompt("Enter new title:", products[productIndex].title);
    const newDesc = prompt("Enter new description:", products[productIndex].description);
    const newImg = prompt("Enter new image URL:", products[productIndex].image);

    // Update the object if user provided input
    if (newTitle && newDesc && newImg) {
      products[productIndex] = {
        ...products[productIndex],
        title: newTitle,
        description: newDesc,
        image: newImg
      };
      renderProducts(); // Refresh the UI
    }
  }
}

// Initial render when the page loads
renderProducts();