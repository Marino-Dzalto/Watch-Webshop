let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

const generateCartItems = () => {
  if (basket.length !== 0) {
    shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
                <div class="cart-item">
                <img width="100" src="${search.img}" alt="" />
                <div class="details">
                <div class="title-price-x">
                    <h4 class="title-price-x">
                    <p>${search.id}</p>
                    <p class="cart-item-price">$ ${search.price}</p>
                    </h4>
                    <i onclick="removeItem('${id}')" class="bi bi-x-lg"></i>
                </div>
                <div class="Cartbuttons">
                    <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                    <div id="quantity-${id}" class="quantity">${item}</div>
                    <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                </div>
                <h3>Total: $ ${item * search.price}</h3>
                </div>
            </div>
            `;
      })
      .join("");
  } else {
    shoppingCart.innerHTML = "";
    label.innerHTML = `
        <h2>Prazna košarica, kupi si sat</h2>
        <a href="index.html">
          <button class="HomeBtn">Povratak kući</button>
        </a>
      `;
  }
};
generateCartItems();
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
    generateCartItems();
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

    generateCartItems();

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
  let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
  }; 

  let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  
  let TotalAmount = () => {
    if (basket.length !== 0) {
      const amount = basket
        .map((x) => {
          const { id, item } = x;
          const search = shopItemsData.find((x) => x.id === id);
          return item * (search ? search.price : 0);
        })
        .reduce((acc, cur) => acc + cur, 0);
        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="refreshButton" id="refreshButton">Refresh Total Bill</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
        const refreshButton = document.getElementById('refreshButton');
        refreshButton.addEventListener('click', () => {
          location.reload();
        });
    
    } else {
      label.innerHTML = '';
    }
  };
  
  TotalAmount();

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
