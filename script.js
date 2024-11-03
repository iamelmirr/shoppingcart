const cartIcon = document.getElementById('cart-icon')
const closeCart = document.getElementById('close-cart')
const cartElement = document.querySelector('.cart')
const cartContent = document.querySelector('.cart-content')
const totalCartPrice = document.querySelector('.totalPriceNumber')

let total = 0

//opening and closing cart

cartIcon.addEventListener('click', () => {
    cartElement.classList.add('active')
})

closeCart.addEventListener('click', () => {
    cartElement.classList.remove('active')
})

//adding products to cart

let addToCartButtons = document.querySelectorAll('.add-cart')

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart)
})


function addToCart (event) {
    let product = event.target.closest('.product-box')
    let productTitle = product.querySelector('.product-title').innerText
    let productPrice = product.querySelector('.shopPriceNumber').innerText
    let productImg = product.querySelector('.product-img').src

    let productInCart = document.createElement('div')
    productInCart.classList.add('cart-box')
    productInCart.innerHTML = `
                        <img src="${productImg}" alt="cartimg" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${productTitle}</div>
                            <div class="cart-price">
                                <span>$</span><p class="cartPriceNumber">${productPrice}</p>
                            </div>
                            <input type="number" value="1" min="1" class="cart-quantity">
                        </div>

                        <i class="bx bxs-trash-alt cart-remove"></i>`         

    cartContent.appendChild(productInCart)

    calculateTotalProductPrice(productInCart, productPrice)

    calculateTotal ()
    
    const productQuantityChange = productInCart.querySelector('.cart-quantity')
    productQuantityChange.addEventListener('input', () => {

        if (productQuantityChange.value < 1) {
            productQuantityChange.value = 1
        }

        calculateTotalProductPrice(productInCart, productPrice)

        calculateTotal ()
    })
    
    
    // remove product form cart

    const removeFromCart = productInCart.querySelector('.cart-remove')
    removeFromCart.addEventListener('click', () => {
        cartContent.removeChild(productInCart)
        calculateTotalProductPrice(productInCart, productPrice)

        calculateTotal ()
    })

    

}


// define calculate total price of one porduct


function calculateTotalProductPrice (productInCart, productPrice) {
    let productQuantity = parseInt(productInCart.querySelector('.cart-quantity').value)

    let productTotal = productQuantity * productPrice

    calculateTotal ()

    console.log(productTotal, total)
    
}


// define calculate total of all products

function calculateTotal () {
    let total = 0

    const itemsCart = cartContent.querySelectorAll('.cart-box')
    itemsCart.forEach(item => {
        let productPrice = parseFloat(item.querySelector('.cartPriceNumber').innerText)
        let productQuantity = parseFloat(item.querySelector('.cart-quantity').value)

        total = total + (productPrice * productQuantity)
    })

    totalCartPrice.innerHTML = total.toFixed(2)

    
}