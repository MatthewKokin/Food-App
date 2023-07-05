import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Get the necessary elements
const container = document.getElementById("container");
const yourOrderSection = document.getElementById("your-order");
const popup = document.getElementById("popup");
const finalButton = document.getElementById("final");
const thanksSection = document.getElementById("thanks");

let totalPrice = 0;

// Event listener for adding items to the order
container.addEventListener("click", function (e) {
    if (e.target.className === "btn") {
        e.preventDefault();
        yourOrderSection.style.display = "block";
        renderOrder(e.target.dataset.item);
    }
});

// Event listener for removing items from the order
yourOrderSection.addEventListener("click", function(e) {
    if (e.target.className === "remove_btn") {
        e.preventDefault();
        const itemIdToRemove = e.target.dataset.id;
        removeItem(itemIdToRemove);
        toggleYourOrderSectionVisibility();
    } else if (e.target.className === "complete-order") {
        popup.style.display = "flex";
        e.preventDefault();
    }
});

// Event listener for finalizing the order and showing the thanks section
finalButton.addEventListener("click", function(e) {
    e.preventDefault();
    popup.style.display = "none";
    yourOrderSection.style.display = "none";
    thanksSection.style.display = "flex";
});

// Function to toggle the visibility of the your order section based on the items in the order
function toggleYourOrderSectionVisibility() {
    const checkoutItems = document.getElementById("checkout_items");
    const items = checkoutItems.getElementsByClassName("info");
    if (items.length === 0) {
        yourOrderSection.style.display = "none";
    }
}

// Function to render the menu items
function renderMenu() {
    const form = document.getElementById("form");
    let menuHTML = "";
    menuArray.forEach(function (item) {
        menuHTML += `
            <div class="item">
                <div class="product">
                    <img src="/images/${item.name.toLowerCase()}.png" alt="${item.name}">
                    <div class="product-info">
                        <label>${item.name}</label>
                        <p class="description">
                            ${ingredientsList(item.ingredients)}
                        </p>
                        <h5 class="price">$${item.price}</h5>
                    </div>
                </div>
                <button type="submit" class="btn" data-item="${item.name}">+</button>
            </div>
        `;
    });
    form.innerHTML += menuHTML;
}

// Function to retrieve the price of an item
function findPrice(itemName) {
    const menuItem = menuArray.find(menuItem => menuItem.name === itemName);
    return menuItem;
}

// Function to render the order
function renderOrder(item) {
    const checkout = document.getElementById("checkout_items");
    let orderHTML = `
        <div class="info">
            <div class="description">
                <h3>${item}</h3>
                <button class="remove_btn" data-id="${uuidv4()}">remove</button>
            </div>
            <h4>$${findPrice(item).price}</h4>
        </div>`;
    checkout.innerHTML += orderHTML;

    totalPrice += findPrice(item).price;
    document.getElementById("total_price").innerText = "$" + totalPrice;
}

// Function to remove an item from the order
function removeItem(itemId) {
    const itemToRemove = document.querySelector(`[data-id="${itemId}"]`).parentElement.parentElement;
    itemToRemove.remove();
    if (itemToRemove) {
        const itemPrice = parseFloat(itemToRemove.querySelector("h4").innerText.slice(1));
        totalPrice -= itemPrice;
        document.getElementById("total_price").innerText = "$" + totalPrice;
        itemToRemove.remove();
    }
}

// Function to convert an array of ingredients into a comma-separated string
function ingredientsList(array) {
    return array.join(", ");
}

// Render the menu
renderMenu();
