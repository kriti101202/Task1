document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();
});

async function fetchProducts() {
  try {
    const response = await fetch(
      "https://s3.amazonaws.com/open-to-cors/assignment.json"
    );
    const data = await response.json();
    displayProducts(data.products);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayProducts(products) {
  // Convert object of products into an array
  const productsArray = Object.keys(products).map((key) => {
    return {
      id: key,
      ...products[key],
    };
  });

  // Sort the array by descending popularity
  productsArray.sort((a, b) => parseInt(b.popularity) - parseInt(a.popularity));

  // Select the table body for data insertion
  const tableBody = document
    .getElementById("product-table")
    .querySelector("tbody");

  // Populate the table with product data
  productsArray.forEach((product) => {
    const row = tableBody.insertRow();
    const titleCell = row.insertCell();
    titleCell.textContent = product.title;
    const priceCell = row.insertCell();
    priceCell.textContent = product.price;
  });
}
