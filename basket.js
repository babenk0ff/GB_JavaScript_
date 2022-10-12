/** Класс, представляющий товар */
class Product {
  /**
   * Создает товар в количестве 1 шт.
   * @param {string} id - ID товара.
   * @param {string} name - Наименование товара.
   * @param {string | float} price - цена за единицу товара.
   */
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = parseFloat(price);
    this.count = 1;
  }

  /**
   * Возвращает общую сумму товаров.
   * @returns {number} Возвращает общую сумму товаров.
   */
  get totalPrice() {
    return parseFloat((this.price * this.count).toFixed(2));
  }
}


/** Класс, представляющий корзину для товаров */
class Cart {
  constructor() {
    this.products = {};
  }

  /**
   * Добавляет товар в корзину. Если товар уже присутствует в корзине,
   * то увеличивает его количество на единицу.
   * @param {Product} stack - товар, помещаемый в корзину.
   */
  addToCart(stack) {
    if (!(stack.id in this.products)) {
        this.products[stack.id] = stack
    } else {
        this.products[stack.id].count += 1;
    }
  }
}


/**
 * Функция, генерирующая строку с товаром для окна корзины.
 * @param {Product} product - продукт из объекта-корзины.
 * @returns {string} возвращает разметку - строку с товаром
 */
 function getProductMarkup(product) {
  return `
    <div class="basket-product basketRow">
      <div>${product.name}</div>
      <div>${product.count} шт.</div>
      <div>$${product.price}</div>
      <div>$${product.totalPrice}</div>
    </div>
  `;
}


/**
 * Обновляет счетчик товаров в корзине и содержимое её окна.
 */
function updateCartHTML() {
  let totalCartPrice = 0;
  let totalProductsCount = 0;
  let cartMarkup = '';

  for (const id in cart.products) {
    totalProductsCount += cart.products[id].count;
    cartMarkup = getProductMarkup(cart.products[id]) + cartMarkup;
    totalCartPrice += cart.products[id].totalPrice;
  }

  const basketTotalValue = document.querySelector('.basketTotalValue');
  basketTotalValue.innerText = totalProductsCount;
  basketTotalValue.classList.remove('invisible');

  const cartRowProductsEl = document.querySelector('.basketRow-products');
  cartRowProductsEl.innerHTML = cartMarkup;

  document.querySelector('.basketTotal').innerText =
    `Товаров в корзине на сумму: $${totalCartPrice.toFixed(2)}`;
}


// Показ/скрытие окна корзины.
document.querySelector('.cartIconWrap').addEventListener('click', () => {
  document.querySelector('.basket').classList.toggle('hidden');
});

const cart = new Cart();

document.querySelector('.featuredItems').addEventListener('click', event => {
  if (!(event.target.classList.contains('addToCart') || 
      event.target.parentElement.classList.contains('addToCart'))) {
    return;
  }
  const productData = event.target.closest('.featuredItem').dataset;
  cart.addToCart(
    new Product(
      productData.id,
      productData.name,
      productData.price
    )
  );
  updateCartHTML();
});
 