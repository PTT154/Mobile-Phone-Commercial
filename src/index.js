const getListProducts = () => {
    const promise = axios({
        url: 'https://68fa5915ef8b2e621e7fb0ed.mockapi.io/api/phones',
        method: 'GET',
    });
    promise
        .then((result) => {
            renderListProducts(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
};

getListProducts();

const renderRating = (rating) => {
    let phanNguyen = Math.floor(rating);
    let phanThapPhan = rating - phanNguyen;
    let contentRating = "";
    for (let i = 1; i <= phanNguyen; i++) {
        contentRating += `<i class="fa-solid fa-star"></i>`;
    };
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

const renderListProducts = (data) => {
    console.log("renderProducts", data);
    let contentHTML = "";
    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        contentHTML += `
            <div class="products-list__item">
                    <div class="discount">${product.discount}% off</div>
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
                        <button>Buy Now</button>
                        <button>Learn More</button>
                    </div>
                </div>
        `;
    }

    document.getElementById('listProductPhones').innerHTML = contentHTML;

    // render list thì chạy lại owl carousel
    $('.products-list').owlCarousel('destroy'); // Xóa carousel cũ nếu có
    $('.products-list').owlCarousel({
        nav: true,
        items: 4,
        margin: 25,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });
}