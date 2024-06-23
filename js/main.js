import { PLAT_SERVER_URL, fetchMarketDetail } from "./api.js";

document.addEventListener("DOMContentLoaded", async function () {
  const market = await fetchMarketDetail(1);
  const products = market.products;

  const menuList = document.getElementById('menu_list');
  products.forEach((product) => {
    const menuItem = document.createElement('li');
    menuItem.className = 'menu_item';

    const itemImage = document.createElement('img');
    itemImage.className = 'menu_item_image';
    if (product.images.length) {
      itemImage.src = `${PLAT_SERVER_URL}${product.images[0]}`;
    }

    const itemName = document.createElement('div');
    itemName.className = 'menu_item_name';
    itemName.textContent = product.name;

    const itemPrice = document.createElement('div');
    itemPrice.className = 'menu_item_price';
    itemPrice.textContent = `${product.price} 원`;

    const itemCheckbox = document.createElement('input');
    itemCheckbox.type = 'checkbox';
    itemCheckbox.name = product.id;
    itemCheckbox.className = 'menu_checkbox';

    menuItem.appendChild(itemImage);
    menuItem.appendChild(itemName);
    menuItem.appendChild(itemPrice);
    menuItem.appendChild(itemCheckbox);

    menuList.appendChild(menuItem);
  })

  const checkboxes = document.querySelectorAll(".menu_checkbox");
  const priceInput = document.querySelector('input[name="price"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        // Update the price input field with the price of the selected menu item
        const menuItem = this.closest(".menu_item");
        const menuItemPrice = menuItem
          .querySelector(".menu_item_price")
          .textContent.replace(" 원", "")
          .replace(",", "");
        priceInput.value = parseInt(menuItemPrice);

        // Uncheck other checkboxes
        checkboxes.forEach((cb) => {
          if (cb !== this) {
            cb.checked = false;
          }
        });
      }
    });
  });

  const quantityElement = document.querySelector(".quantity");
  const quantityMinusButton = document.querySelector(".quantity_minus");
  const quantityPlusButton = document.querySelector(".quantity_plus");

  quantityMinusButton.addEventListener("click", function () {
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
      quantityElement.textContent = quantity - 1;
    }
  });

  quantityPlusButton.addEventListener("click", function () {
    let quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
  });
});
