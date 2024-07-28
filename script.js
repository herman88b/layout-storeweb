// untuk home shopcart
const Shopcart = document.querySelector('.shop_cart');
document.querySelector('#cart-button').onclick = () => {
    Shopcart.classList.toggle('active');
    e.prevenDefault();
}
const itemdetail = document.querySelectorAll('.item-detail');

itemdetail.onclick = (e) =>{
    itemmodal.style.display = 'flex';
    e.prevenDefault();
}
// incres item in cart

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    document.querySelectorAll('.addToCartButton').forEach(button => {
        button.addEventListener('click', function() {
            const item = {
                name: this.getAttribute('data-name'),
                price: parseInt(this.getAttribute('data-price')),
                image: this.getAttribute('data-image'),
                quantity: 1,
            };

            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItem = cartItems.find(cartItem => cartItem.name === item.name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push(item);
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            window.location.href = 'cart.html';
        });
    });

    // add to cart
    if (cartItems.length > 0) {
        const cartTable = document.getElementById('cartable').getElementsByTagName('tbody')[0];
        cartItems.forEach(item => {
            const newRow = cartTable.insertRow();

            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            const cell4 = newRow.insertCell(3);
            const cell5 = newRow.insertCell(4);

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;

            const removeBtn = document.createElement('i');
            removeBtn.classList = "bi bi-trash";
            removeBtn.addEventListener('click', () => {
                const index = cartItems.indexOf(item);
                if (index > -1) {
                    cartItems.splice(index, 1);
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    newRow.remove();
                    updateTotalPrice();
                }
            });

            const quantityContainer = document.createElement('div');
            quantityContainer.className = 'bacg';

            const minusButton = document.createElement('button');
            minusButton.className = 'button btn-warning btn-sm min';
            minusButton.textContent = '-';
            minusButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    quantitySpan.textContent = item.quantity;
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateTotalPrice();
                }
            });
            //validasi untuk cart
            const  existingItem = cartItems.find(cartItems => cartItems.name === item.name);
            if(existingItem){
                alert('item already in cart');
            }else{
                cartItems.push(item);
            }

            const quantitySpan = document.createElement('span');
            quantitySpan.className = 'mx-2 num';
            quantitySpan.id = 'num';
            quantitySpan.textContent = item.quantity;

            const plusButton = document.createElement('button');
            plusButton.className = 'button btn-dark btn-sm plus';
            plusButton.textContent = '+';
            plusButton.addEventListener('click', () => {
                item.quantity += 1;
                quantitySpan.textContent = item.quantity;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                updateTotalPrice();
            });

            quantityContainer.appendChild(minusButton);
            quantityContainer.appendChild(quantitySpan);
            quantityContainer.appendChild(plusButton);

            cell1.appendChild(img);
            cell2.innerHTML = item.name;
            cell3.appendChild(quantityContainer);
            cell4.innerHTML = `$ ${item.price}`;
            cell5.appendChild(removeBtn);
        });

        updateTotalPrice();

        function updateTotalPrice() {
            let totalPrice = 0;
            cartItems.forEach(item => {
                totalPrice += item.price * item.quantity;
            });
            document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
        }
    }
});

