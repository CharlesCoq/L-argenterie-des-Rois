// Apparition & disparition du panier
const iconpanier = document.getElementById('iconpanier');

const sectionCart = document.getElementById('menu-Cart')
let icon = false
iconpanier.addEventListener('click', function () {
    if (!icon) {
        sectionCart.classList.add('open')   
        icon = true
    } else {
        sectionCart.classList.remove('open')
        icon = false
    }
})

function displayTopBotCart() {
    const topCart = document.createElement('div')
    topCart.classList.add('top')
    sectionCart.appendChild(topCart)

    const buttonClear = document.createElement('button');
    buttonClear.textContent = 'Vider le panier';
    buttonClear.classList.add('clear');
    buttonClear.addEventListener('click', () => clear());
    topCart.appendChild(buttonClear);
    ;
    const middleCart = document.createElement('div');
    middleCart.id = 'panier';
    sectionCart.appendChild(middleCart);

    const bottomCart = document.createElement('div');
    sectionCart.appendChild(bottomCart);
    bottomCart.classList.add('bottom');

    const totalPrice = document.createElement('p');
    bottomCart.appendChild(totalPrice)
    totalPrice.id = 'price'

    const buttonPay = document.createElement('button');
    buttonPay.textContent = 'Payer';
    buttonPay.classList.add('Pay');
    bottomCart.appendChild(buttonPay);

}
displayTopBotCart()





const products = [
    {
        name: 'Couteau moyen',
        category: 'couteaux',
        price: '50',
    },
    {
        name: 'Grand couteau',
        category: 'couteaux',
        price: '50',
    },
    {
        name: 'Petit couteau',
        category: 'couteaux',
        price: '50',
    },
    {
        name: 'Tout petit couteau',
        category: 'couteaux',
        price: '50',
    },
    {
        name: 'Couteau ancien',
        category: 'couteaux',
        price: '15000',
    },
    {
        name: 'Fourchette d\'exterieur',
        category: 'fourchettes',
        price: '50',
    },
    {
        name: 'Fourchette a saucisse',
        category: 'fourchettes',
        price: '50',
    },
    {
        name: 'Fourchette snob',
        category: 'fourchettes',
        price: '50',
    },

];

const cart = [

];







//Affichage des articles via le tableau JS 
const containerHtml = document.getElementById('container');
const panierHtml = document.getElementById('panier');

function display() {

    containerHtml.innerHtml = ''
    for (let i = 0; i < products.length; i++) {
        const el = products[i];

        const divHtml = document.createElement('div');

        const imgHtml = document.createElement('img')
        imgHtml.classList.add('image')
        divHtml.appendChild(imgHtml)
        if (products[i].category == 'couteaux'){
            imgHtml.src = 'asset/img/knife'+i+'.png'
        } else if (products[i].category == 'fourchettes') {
            imgHtml.src = 'asset/img/Fork'+i+'.png'
        }

        const nameHtml = document.createElement('h2');
        divHtml.appendChild(nameHtml);
        nameHtml.textContent = el.name;

        const categoryHtml = document.createElement('p');
        divHtml.appendChild(categoryHtml);
        categoryHtml.textContent = el.category

        const priceHtml = document.createElement('p');
        priceHtml.textContent = el.price;
        divHtml.appendChild(priceHtml);

        const buttonHtml = document.createElement('button')
        buttonHtml.textContent = 'Ajouter au panier'
        buttonHtml.classList.add('addButton')
        divHtml.appendChild(buttonHtml);
        buttonHtml.addEventListener('click', () => addToCart(i));

        containerHtml.appendChild(divHtml);
    };
}


//affichage panier
function displayCart() {

    panierHtml.innerHTML = '';

    for (let i = 0; i < cart.length; i++) {

        const divHtml = document.createElement('div');
        panierHtml.appendChild(divHtml);
        divHtml.classList.add('basket');

        const nameHtml = document.createElement('h2');
        divHtml.appendChild(nameHtml);
        nameHtml.textContent = products[cart[i].id].name;

        const categoryHtml = document.createElement('p');
        divHtml.appendChild(categoryHtml);
        categoryHtml.textContent = products[cart[i].id].category;
        categoryHtml.classList.add('cartCategory');

        const priceHtml = document.createElement('p');
        divHtml.appendChild(priceHtml);
        priceHtml.textContent = products[cart[i].id].price * cart[i].quantity;

        const quantityHtml = document.createElement('p');
        divHtml.appendChild(quantityHtml);
        quantityHtml.textContent = cart[i].quantity;
        quantityHtml.classList.add('cartQt');

        const buttonHtml = document.createElement('button');
        divHtml.appendChild(buttonHtml);
        buttonHtml.textContent = 'Retirer du panier';
        buttonHtml.classList.add('delete');
        buttonHtml.addEventListener('click', () => deleteCartItem(i));
    }
}

function addToCart(id) {
    let exist = null;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            exist = i;
        }
    }

    if (exist != null) {
        cart[exist].quantity++;
    } else {
        cart.push({
            id: id,
            quantity: 1,
        })
    }
    total(true);
    displayCart();
    console.log(cart);
    console.log(products);
}

function deleteCartItem(i) {
    if (cart[i].quantity == 1) {
        cart.splice(cart[i], 1);
    } else {
        cart[i].quantity--;
    }
    displayCart();
    total(true);
}

function clear() {
    cart.splice(0)
    panierHtml.innerHTML = '';
    total(true);
}

function total(displayResult) {
    const totalPrice = document.getElementById('price');
    totalPrice.textContent = '';
    if (cart.length > 0 && cart[cart.length - 1]) {
        let result = 0;
        for (let i = 0; i < cart.length; i++) {
            result += products[cart[i].id].price * cart[i].quantity;
        }
        totalPrice.textContent += `Total : ${result} €`;
    }
}


display();

