let currentProductIndex = null; //Dùng để lưu index
let productsDataPhone = []; //Dùng để lưu mảng các object sản phẩm điện thoại

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
const getEle = (id) => document.getElementById(id);

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
                    <a href="" class="products-list__thumb">
                        <img src="./images/products/${product.img}" alt="">
                    </a>
                    <div class="products-list__info">
                        <h4 class="products-list__name">
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
                        <button class="openModal" data-index="${i}" onclick="handleOpenProductModal(${i})">Buy Now</button>
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
            renderProducts_TV(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
};
getListProducts_TV();

const renderProducts_TV = (data) => {
    console.log("dataTV", data);
    let contentHTML = "";
    for (let i = 0; i < data.length; i++) {
        const tv = data[i];
        contentHTML += `
    <div class="products-list__item">
        <a href="" class="products-list__thumb">
            <img src="./images/products/${tv.img}" alt="" />
        </a>
        <div class="products-list__info">
            <h4 class="products-list__name"><a href="">${tv.name}</a></h4>

            <div class="products-list__price">
                <span class="price--old">${tv.oldPrice}</span>
                <span class="price--new">${tv.newPrice}</span>
                </div>

                <div class="rating">
                <span>${tv.rating}</span>
                 ${renderRating(tv.rating)}
                </div>
            </div>
            <div class="products-list__btn">
                <button>Buy Now</button>
                <button>Learn More</button>
            </div>
            </div>

        `;
    }
    console.log(contentHTML);
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

const handleOpenProductModal = (index) => {
    currentProductIndex = index; // Lưu lại index sản phẩm đang mở modal
    document.body.classList.add('modal-open-prevent-scroll'); // Ngăn scroll
    const product = productsDataPhone[index];
    modal.classList.add('open');

    // reset biến a (quantity) mỗi lần mở modal
    resetQuantity();

    //reset lựa chọn màu và storage mỗi khi đóng modal
    resetProductOptions();

    updateProductPrice();

    getEle('productImg').src = `./images/products/${product.img}`;
    getEle('productName').innerHTML = `${product.name} 5G`;
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
function updateProductPrice() {
    // lấy product
    const product = productsDataPhone[currentProductIndex];

    // Lấy số lượng sản phẩm
    const quantity = parseInt(document.querySelector('.quantity-control .num').textContent, 10);

    // Lấy dung lượng đang chọn
    const storageIndex = Array.from(document.querySelectorAll('.storage-option')).findIndex(opt => opt.classList.contains('active'));

    // Lấy dung màu đang chọn
    const colorIndex = Array.from(document.querySelectorAll('.color-option')).findIndex(opt => opt.classList.contains('active'));

    // Lấy giá gốc từ sản phẩm đang mở modal
    let basePrice = product.newPrice;

    console.log("test: ", product, quantity, storageIndex, basePrice);

    if (storageIndex === 1) {
        basePrice += 50;
        getEle('productName-productStorage').innerHTML = `16GB+256GB, `;
    } else {
        getEle('productName-productStorage').innerHTML = `8GB+128GB, `;
    }


    getEle('productImg').style.filter = "none"; // Xóa filter mỗi lần mở lại modal (Mỗi lần mở modal thì update)
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

    const totalPrice = basePrice * quantity;

    getEle('productPrice').innerHTML = `$${totalPrice}.00`;
}

window.updateProductPrice = updateProductPrice;
