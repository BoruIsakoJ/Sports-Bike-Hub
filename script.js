const openShopping = document.querySelector(".shopping")
const closeShopping = document.querySelector(".closeShopping")
const list = document.querySelector(".list")
const listCard = document.querySelector(".listCard")
const total = document.querySelector(".total")
const body = document.querySelector("body")
const quantity = document.querySelector(".quantity")

openShopping.addEventListener('click',function(){
  body.classList.add("active")  
})
closeShopping.addEventListener('click',function(){
    body.classList.remove("active")  
})

function displayBikes(){
    fetch("http://localhost:3000/bikes")
    .then(resp => resp.json())
    .then(bikes => {
        bikes.forEach(bike => {
            displayBike(bike) 
        });
    })
}
