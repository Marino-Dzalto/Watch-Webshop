let shop = document.getElementById("shop");
let footer = document.querySelector(".footer");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let currentIndex = 0;
let itemsPerPage = 5;

let generateShop = () => {
  let itemsToDisplay = shopItemsData.slice(currentIndex, currentIndex + itemsPerPage);
  
  return (shop.innerHTML = itemsToDisplay
    .map((x) => {
      let { id, price, ref, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
      <div id=product-id-${id} class="item">
      <img width="226" height="300" src="${img}" alt="">
      <div class="details">
        <h3>${id}</h3>
        <p>Ref: ${ref}</p>
        <div class="price-quantity">
          <h2>$ ${price}</h2>
          <div class="buttons">
            <i onclick="decrement('${id}')" class="bi bi-dash-circle-fill"></i>
            <div id="quantity-${id}" class="quantity">
                ${search.item === undefined ? 0 : search.item}
            </div>
            <i onclick="increment('${id}')" class="bi bi-plus-circle-fill"></i>
          </div>
        </div>
      </div>
    </div>
  `;
    })
    .join(""));
};

let displayNextSet = () => {
  currentIndex += itemsPerPage;
  if (currentIndex >= shopItemsData.length) {
    currentIndex = 0;
  }
  generateShop();
};
let createButtons = (numberOfButtons) => {
  for (let i = 1; i <= numberOfButtons; i++) {
    let button = document.createElement("button");
    button.innerText = "Kategorija " + i;
    button.onclick = () => {
      currentIndex = (i - 1) * itemsPerPage;
      generateShop();
    };
    footer.appendChild(button);
  }
};
createButtons(Math.ceil(shopItemsData.length / itemsPerPage));

generateShop();
let increment = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));
  
  let quantityDiv = document.getElementById(`quantity-${id}`);
  quantityDiv.textContent = search ? search.item : 1;
  
  update(id);
  calculation();
};

let decrement = (id) => {
  let selectedItem = shopItemsData.find((x) => x.id === id);
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    return;
  } else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);

  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);

  if (!search) {
    return;
  }

  document.getElementById(`quantity-${id}`).textContent = search.item;
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

function updateTime() {
  const date = new Date();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

setInterval(updateTime, 1000);

const searchBar = document.querySelector('.search-container input[type="text"]');
const searchButton = document.querySelector('.search-container button[type="submit"]');

searchButton.addEventListener('click', () => {
    const searchTerm = searchBar.value;
});

function showDropdown() {
  var dropdown = document.getElementById("dropdownBtn");
  dropdown.style.display = "block";
}