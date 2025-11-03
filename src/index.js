import CartItem from "./models/CartItemPhone.js";

let productsDataPhone = []; //Dùng để lưu mảng các object sản phẩm điện thoại
let productsDataTV = []; // Dùng để lưu mảng các object sản phẩm tv
let cartList = []; //Giỏ hàng

/**
 * API
 */
const getListProducts = () => {
    const promise = axios({
        url: "https://68fa5915ef8b2e621e7fb0ed.mockapi.io/api/phones",
        method: "GET",
    });
    promise
        .then((result) => {
            productsDataPhone = result.data;
            renderListProducts(productsDataPhone);
        })
        .catch((error) => {
            console.log(error);
        });
};

getListProducts();

//Hàm dùng nhanh getElementById
export const getEle = (id) => document.getElementById(id);

/**
 * Tính số sao đánh giá
 */

const renderRating = (rating) => {
    let phanNguyen = Math.floor(rating);
    let phanThapPhan = rating - phanNguyen;
    let contentRating = "";
    for (let i = 1; i <= phanNguyen; i++) {
        contentRating += `<i class="fa-solid fa-star"></i>`;
    }
    if (phanThapPhan >= 0.5) {
        contentRating += `<i class="fa-solid fa-star-half-stroke"></i>`;
        for (let i = 1; i <= 4 - phanNguyen; i++) {
            contentRating += `<i class="fa-regular fa-star"></i>`;
        }
    } else {
        for (let i = 1; i <= 5 - phanNguyen; i++) {
            contentRating += `<i class="fa-regular fa-star"></i>`;
        }
    }

    return contentRating;
};

/**
 * render danh sách products ra giao diện
 */

const renderListProducts = (data) => {
    //   console.log("renderProducts", data);
    let contentHTML = "";
    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        contentHTML += `
            <div class="products-list__item">
                <div class="discount">${product.discount}% OFF</div>
                <a href="" class="products-list__thumb" onclick="handleOpenProductModal(${i}, 'phone', event)">
                    <img src="./images/products/${product.img}" alt="">
                </a>
                <div class="products-list__info">
                    <h4 class="products-list__name" onclick="handleOpenProductModal(${i}, 'phone', event)">
                        <a href="#">${product.name}</a>
                    </h4>
                    <div class="products-list__price">
                        <span class="price--old">$${product.oldPrice}</span>
                        <span class="price--new">$${product.newPrice}</span>
                    </div>
                    <div class="rating">
                        <span>${product.rating}</span>
                        ${renderRating(product.rating)}
                    </div>
                </div>
                <div class="products-list__btn">
                    <button class="openModal" data-index="${i}" onclick="handleOpenProductModal(${i}, 'phone', event)">Buy Now</button>
                    <button>Learn More</button>
                </div>
            </div>
        `;
    }

    getEle('listProductPhones').innerHTML = contentHTML;

    // render list thì chạy lại owl carousel
    $(".products-list").owlCarousel("destroy"); // Xóa carousel cũ nếu có
    $(".products-list").owlCarousel({
        nav: true,
        items: 4,
        margin: 25,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 4,
            },
        },
    });
};

// TV
const getListProducts_TV = () => {
    const promise = axios({
        url: "https://68fa5915ef8b2e621e7fb0ed.mockapi.io/api/TVs",
        method: "GET",
    });
    promise
        .then((result) => {
            productsDataTV = result.data;
            renderProducts_TV(productsDataTV);
        })
        .catch((error) => {
            console.log(error);
        });
};

getListProducts_TV();

const renderProducts_TV = (data) => {
    let contentHTML = "";
    for (let i = 0; i < data.length; i++) {
        const tv = data[i];
        contentHTML += `
            <div class="products-list__item">
                <div class="discount">${tv.discount}% OFF</div>
                <a href="" class="products-list__thumb" onclick="handleOpenProductModal(${i}, 'tv', event)">
                    <img src="./images/products/${tv.img}" alt="" />
                </a>
                <div class="products-list__info">
                    <h4 class="products-list__name" onclick="handleOpenProductModal(${i}, 'tv', event)">
                        <a href="">${tv.name}</a>
                    </h4>

                    <div class="products-list__price">
                        <span class="price--old">$${tv.oldPrice}</span>
                        <span class="price--new">$${tv.newPrice}</span>
                    </div>

                    <div class="rating">
                        <span>${tv.rating}</span>
                        ${renderRating(tv.rating)}
                    </div>
                </div>
                <div class="products-list__btn">
                    <button onclick="handleOpenProductModal(${i}, 'tv', event)">Buy Now</button>
                    <button>Learn More</button>
                </div>
            </div>
        `;
    }
    document.getElementById("listProductTV").innerHTML = contentHTML;

    // render list thì chạy lại owl carousel
    $(".listProductTV").owlCarousel("destroy"); // Xóa carousel cũ nếu có
    $(".listProductTV").owlCarousel({
        nav: true,
        items: 4,
        margin: 25,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 4,
            },
        },
    });
};

/**
 * Đóng mở modal
 */
const openBtn = getEle('openModal');
const closeBtn = getEle('closeModal');
const modal = getEle('modal');

let currentProductIndex = null; //Dùng để lưu index sản phẩm đang mở modal
let currentProductType = null; //Dùng để kiểm tra loại sản phẩm và show ra thông tin tương ứng

const handleOpenProductModal = (index, type, event) => {
    if (event) event.preventDefault(); //Ngăn reload lại trang khi click vào những thẻ a
    window.currentProductIndex = index; // Lưu biến currentProductIndex và currentProductType lên đối tượng window
    window.currentProductType = type; // Để dùng cho file khác vì file index này sử dụng type = "module"
    /**
     * Note: các biến trong file module sẽ ko sử dụng được ở những file khác nên mới cần
     * gán hai biến này lên đối tượng window
     */

    let product;

    if (type === 'phone') product = productsDataPhone[index];
    else if (type === 'tv') product = productsDataTV[index];

    document.body.classList.add('modal-open-prevent-scroll'); // Ngăn scroll
    modal.classList.add('open'); //Mở popup

    // reset biến a (quantity) mỗi lần mở modal
    resetQuantity();

    //reset lựa chọn màu và storage mỗi khi đóng modal
    resetProductOptions();

    //Dùng để reset lại storage và màu của sản phẩm
    updateProductPrice(index, type);

    //Ẩn hiện thông tin chi tiết sản phẩm theo loại
    const productTypes = ['phone', 'tv', 'accessory']; // Thêm loại mới vào đây nếu cần
    productTypes.forEach(t => {
        const detailElem = document.getElementsByClassName(`product-detail__${t}`)[0];
        const selectElem = document.getElementsByClassName(`product-select__${t}`)[0];
        if (detailElem) {
            detailElem.style.display = (type === t) ? 'grid' : 'none';

        }
        if (selectElem) {
            selectElem.style.display = (type === t) ? 'block' : 'none';
        }
    });

    //Lấy và in thông tin sản phẩm ra popup mỗi lần mở modal
    getEle('productImg').src = `./images/products/${product.img}`;
    getEle('productName').innerHTML = type === 'phone' ? `${product.name} 5G` : `${product.name}`;
    getEle('productPrice').innerHTML = `$${product.newPrice}.00`;
    getEle('oldPrice').innerHTML = `$${product.oldPrice}.00`;
    getEle('discount').innerHTML = `${product.discount}% OFF`;


}

window.handleOpenProductModal = handleOpenProductModal;

// Khóa scroll khi mở modal
closeBtn.addEventListener('click', () => {
    document.body.classList.remove('modal-open-prevent-scroll'); // Mở lại scroll
    modal.classList.remove('open');
});

//Đóng modal khi click ra ngoài popup
modal.addEventListener('click', function (e) {
    // Nếu click vào chính modal (nền), chứ không phải modal-inner
    if (e.target === modal) {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open-prevent-scroll');
    }
});

/**
 * Cập nhật giá khi thay tăng số lượng và thay đổi lựa chọn dung lượng
 */
function updateProductPrice(index, type) {
    // Phải để ở trên này vì mỗi lần mở modal thì filter của ảnh điện thoại sẽ bị giữ lại, tivi cũng bị dính filter (nếu mở tivi sau điện thoại)
    getEle('productImg').style.filter = "none"; // Xóa filter (màu của điện thoại) mỗi lần mở lại modal (Mỗi lần mở modal thì update) 
    let product;
    let basePrice;
    // Lấy số lượng sản phẩm
    const quantity = parseInt(document.querySelector('.quantity-control .num').textContent, 10);

    if (type === 'phone') {
        // Hiển thị thông tin điện thoại, ẩn thông tin TV
        getEle('productInfo-phone').style.display = 'block';
        getEle('productInfo-tv').style.display = 'none';

        product = productsDataPhone[index];
        // Lấy giá gốc từ sản phẩm đang mở modal
        basePrice = product.newPrice;

        // Lấy dung lượng đang chọn
        const storageIndex = Array.from(document.querySelectorAll('.storage-option')).findIndex(opt => opt.classList.contains('active'));

        if (storageIndex === 1) {
            basePrice += 50;
            getEle('productName-productStorage').innerHTML = `16GB+256GB, `;
        } else {
            getEle('productName-productStorage').innerHTML = `8GB+128GB, `;
        }

        // Lấy màu đang chọn
        const colorIndex = Array.from(document.querySelectorAll('.color-option')).findIndex(opt => opt.classList.contains('active'));

        if (colorIndex === 2) {
            getEle('productName-productColor').innerHTML = `Red`;
            getEle('productImg').style.filter = "sepia(1) hue-rotate(-60deg) saturate(4)";
        } else if (colorIndex === 1) {
            getEle('productName-productColor').innerHTML = `Purple`;
            getEle('productImg').style.filter = "sepia(1) hue-rotate(-130deg) saturate(4)";
        } else {
            getEle('productName-productColor').innerHTML = `Black`;
            getEle('productImg').style.filter = "none"; // Xóa filter
        }
    }
    else if (type === 'tv') {
        // Hiển thị thông tin TV, ẩn thông tin điện thoại
        getEle('productInfo-phone').style.display = 'none';
        getEle('productInfo-tv').style.display = 'block';

        product = productsDataTV[index];
        basePrice = product.newPrice;

        //Lấy độ phân giải đang chọn
        const resolution = document.querySelector('.resolution-option.active').textContent.trim();
        //Lấy kích thước màn hình đang chọn
        const screenSize = document.querySelector('.screen-size-option.active').textContent.trim();

        if (resolution === '8K UHD') basePrice += 200;

        if (screenSize === '65-inch') basePrice += 100;
        else if (screenSize === '55-inch') basePrice += 50;

        // Hiển thị lựa chọn lên modal
        getEle('productName-productResolution').innerHTML = `${resolution}, `;
        getEle('productName-productScreenSize').innerHTML = `${screenSize}`;
    }

    // Tính giá tổng
    const totalPrice = basePrice * quantity;
    getEle('productPrice').innerHTML = `$${totalPrice}.00`;
}

window.updateProductPrice = updateProductPrice;

/**
 * Thêm sản phẩm vào giỏ hàng (Đang trong quá trình sửa lại)
 */
const addProductToCart = () => {
    // lấy product
    const product = productsDataPhone[currentProductIndex];

    const id = product.id;
    const name = product.name;
    const basePrice = product.newPrice;
    const img = product.img;
    const color = document.querySelector('.color-option.active').textContent.trim(); //Dùng trim giúp lấy văn bản ko có khoảng trắng ở đầu và cuối
    const storage = document.querySelector('.storage-option.active').textContent.trim();
    const quantity = parseInt(document.querySelector('.quantity-control .num').textContent, 10);
    const type = product.type;

    const cartItem = new CartItem(id, name, basePrice, img, color, storage, quantity, type);
    cartList.push(cartItem);

    console.log(cartList);

    document.body.classList.remove('modal-open-prevent-scroll'); // Mở lại scroll
    modal.classList.remove('open'); //Đóng modal sau khi Add to Cart
    updateCartCount(); //Hiện số lượng sản phẩm đã thêm trên giỏ hàng
    setLocalStorage(); //Lưu cartList vào local
}

window.addProductToCart = addProductToCart;

const updateCartCount = () => {
    document.getElementById('cartCount').textContent = cartList.length;
}

// setLocalStorage (Lưu mảng cartList trong local)
const setLocalStorage = () => {
    //chuyển list qua string
    const dataString = JSON.stringify(cartList);
    //Lưu vào local storage
    localStorage.setItem('CART_LIST', dataString);
};

// getLocalStorage
const getLocalStorage = () => {
    //lấy dữ liệu từ local
    const dataString = localStorage.getItem('CART_LIST');
    if (!dataString) return; // Không có dữ liệu thì thoát luôn
    //convert từ dataString => JSON
    const dataJson = JSON.parse(dataString);
    //phục hồi dữ liệu cho cartList
    cartList = dataJson;
    //khôi phục dữ liệu xong thì update lại số lượng item trong cart
    updateCartCount();
}

getLocalStorage();