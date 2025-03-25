const openShopping = document.querySelector(".shopping")
const closeShopping = document.querySelector(".closeShopping")
const list = document.querySelector(".list")
const listCart = document.querySelector(".listCart")
const total = document.querySelector(".total")
const body = document.querySelector("body")
const quantity = document.querySelector(".quantity")
const divCart = document.querySelector(".cart")

openShopping.addEventListener('click', function () {
    body.classList.add("active")
})
closeShopping.addEventListener('click', function () {
    body.classList.remove("active")
})

function displayBikes() {
    fetch("http://localhost:3000/bikes")
        .then(resp => resp.json())
        .then(bikes => {
            bikes.forEach(bike => {
                displayBike(bike)
            });
        })
}
function displayBike(bike) {
    let newDiv = document.createElement("div")
    newDiv.classList.add("item")
    newDiv.innerHTML = `
    <img src ="${bike.image}" alt="${bike.description}">
    <div class ="title">${bike.name}</div>
    <div class="price"><span>Ksh. </span>${bike.price}</div>
    <div class ="engine"><span>Engine: </span>${bike.engine}</div>
    <div class="topSpeed"><span>Top Speed: </span>${bike.top_speed}</div>
    <div class="category"><span>Type: </span>${bike.category}</div>
    <button onclick="addToCart(${bike.id}, '${bike.name}', ${bike.price}, '${bike.image}')">Add To Cart</button>
  `
    list.appendChild(newDiv)
}
displayBikes()

let cart = [];
function addToCart(id, name, price, image) {
    price = Number(price);
    let existingBike = cart.find((bike) => bike.id === id);

    if (existingBike) {
        existingBike.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    listCart.innerHTML = "";
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((bike) => {
        let li = document.createElement("li");
        li.innerHTML = `
        <img src="${bike.image}" width="50">
        <span>${bike.name}</span> 
        <span>Qty: ${bike.quantity}</span>
        <span> Ksh. ${Number(bike.price) * Number(bike.quantity)}</span>
        <div class ="button-container">
            <button type="button" class="remove-button" onclick="removeFromCart(${bike.id})">Remove</button>
            <button type="button" class="checkout-button" onclick="checkOut(${bike.id})">Proceed to Checkout</button>
        </div>
      `;
        li.classList.add('cart-items')
        listCart.appendChild(li);

        totalPrice += Number(bike.price) * Number(bike.quantity);
        totalItems += bike.quantity;
    });

    total.innerText = `Total: Ksh. ${totalPrice}`;
    quantity.innerText = totalItems;
}
function removeFromCart(id) {
    cart = cart.filter((bike) => bike.id !== id);
    updateCart();
}
function checkOut(id) {
    const form = document.createElement('form')
    form.innerHTML = `
    <div>
        <label for="name">Name<label>
        <input id="name" type="text" placeholder="Omondi Timon" required>
    </div>
    <div>
        <label for="number">Phone Number<label>
        <input id="number" type="text" placeholder="0712345678" required>
    </div>
    <button type="submit" id="submit-button">Checkout</button>
    `
    const submitBtn = document.querySelector("#submit-button")
    form.addEventListener('submit', function(e){
        e.preventDefault()
        const customer ={
            name: e.target.name.value,
            phone: e.target.number.value
        }
        alert( `Congratulations ${customer.name}. Welcome to the Motor.Ke family 🥳`)
        form.reset()
        body.classList.remove("active")
    })
    divCart.appendChild(form)

}
