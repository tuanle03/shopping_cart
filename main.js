function randomId() {
  return Math.floor(Math.random() * 100000);
}

function convertMoney(num) {
  return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

let products = [
  {
    id: randomId(),
    name: 'Nokia C30 (2GB/32GB)',
    description: 'Nokia C30 (2GB/32GB) - Hàng Chính Hãng',
    price: 2490000,
    image: 'product1.jpg',
    count: 1,
    selected: false,
  },
  {
    id: randomId(),
    name: 'Samsung Galaxy S20 FE',
    description: 'Samsung Galaxy S20 FE - Hàng Chính Hãng Mua Online Tặng PMH 1.000.000đ',
    price: 11900000,
    image: 'product2.jpg',
    count: 1,
    selected: false,
  },
  {
    id: randomId(),
    name: 'OPPO A54 (4GB/128GB)',
    description: 'OPPO A54 (4GB/128GB) - Hàng Chính Hãng, Phân phối bởi OPPO Việt Nam',
    price: 4990000,
    image: 'product3.jpg',
    count: 1,
    selected: false,
  },
  {
    id: randomId(),
    name: 'Realme C25s (4GB/128GB)',
    description: 'Realme C25s (4GB/128GB) - Hàng Chính Hãng, Chương trình bảo hành 1 đổi 1 trong 12 tháng',
    price: 4490000,
    image: 'product4.jpg',
    count: 1,
    selected: false,
  },
];

let productsEle = document.querySelector('.products');

let subTotalEl = document.querySelector('.subtotal span');
let vatEl = document.querySelector('.vat span');
let discount = document.querySelector('.discount');
let discountEle = document.querySelector('.discount span');
let totalEle = document.querySelector('.total span');

let btnPromotion = document.querySelector('.promotion button');
let inputPromotion = document.querySelector('#promo-code');

function renderUI(arr) {
  productsEle.innerHTML = '';

  // Cập nhật số lượng sản phẩm trong cart
  let countEle = document.querySelector('.count');
  countEle.innerText = `${updateTotalItem(arr)} items in the bag`;

  // Cập nhật tổng tiền
  updateTotalMoney(arr);

  if (arr.length == 0) {
    productsEle.insertAdjacentHTML(
      'afterbegin',
      '<li>Không có sản phẩm nào trong giỏ hàng</li>'
    );
    document.querySelector('.option-container').style.display = 'none';
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    const p = arr[i];
    productsEle.innerHTML += `
            <li class="row">
                <div class="col left">
                    <div class="thumbnail">
                        <a href="#">
                            <img src="${p.image}" alt="${p.name}">
                        </a>
                    </div>
                    <div class="detail">
                        <div class="name"><a href="#">${p.name}</a></div>
                        <div class="description">
                            ${p.description}
                        </div>
                        <div class="price">${convertMoney(p.price)}</div>
                    </div>
                </div>
                <div class="col right">
                    <div class="quantity">
                        <input
                            type="number"
                            class="quantity"
                            step="1"
                            value="${p.count}"
                            onchange="changeTotalProduct(${p.id}, event)"
                        >
                    </div>
                    <div class="remove">
                        <input type="checkbox" class="form-check-input" ${p.selected ? 'checked' : ''} onclick="removeItem(${p.id}, this)">
                    </div>
                </div>
            </li>
        `;
  }
}

// Cập nhật số lượng sản phẩm
function updateTotalItem(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    const p = arr[i];
    total += p.count;
  }
  return total;
}

// Remove item trong cart
function removeItem(id, checkbox) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      products[i].selected = !products[i].selected;
    }
  }
  renderUI(products);
}

// Thay đổi số lượng sản phẩm
function changeTotalProduct(id, e) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      products[i].count = Number(e.target.value);
    }
  }
  renderUI(products);
}

// Cập nhật tổng tiền
function updateTotalMoney(arr) {
  // Tính tổng tiền cart và tổng tiền giảm giá
  let totalMoney = 0;
  let discountMoney = 0;

  for (let i = 0; i < arr.length; i++) {
    const p = arr[i];

    // Kiểm tra nếu sản phẩm đã được chọn bằng checkbox thì thêm giá của sản phẩm đó vào tổng tiền giảm giá
    if (p.selected) {
      totalMoney += p.count * p.price;
    }
  }

  // Cập nhật tiền lên trên giao diện
  subTotalEl.innerText = convertMoney(totalMoney);
  vatEl.innerText = convertMoney(totalMoney * 0.05);
  totalEle.innerText = convertMoney(totalMoney * 1.05);
}

btnPromotion.addEventListener('click', function () {
  updateTotalMoney(products);
});

window.onload = renderUI(products);
