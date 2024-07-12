const Shopcart = document.querySelector('.shop_cart');
document.querySelector('#cart-button').onclick = () => {
    Shopcart.classList.toggle('active');
    e.prevenDefault();
}
const itemmodal = documet.querySelectorAll('#item-modal')
const itemdetail = document.querySelectorAll('.item-detail');

itemdetail.onclick = (e) =>{
    itemmodal.style.display = 'flex';
    e.prevenDefault();
}