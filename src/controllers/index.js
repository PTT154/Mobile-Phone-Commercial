import CartItem from "../models/CartItem.js";

let productsDataPhone = []; //Dùng để lưu mảng các object sản phẩm điện thoại
let productsDataTV = []; // Dùng để lưu mảng các object sản phẩm tv
let productsDataAccessory = []; //Dùng để lưu mảng các object sản phẩm accessory
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

  getEle("listProductPhones").innerHTML = contentHTML;

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
                    <button>Buy Now</button>
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

// Accessories
const getListAccessories = () => {
  const promise = axios({
    url: "https://69160186465a9144626e8f1b.mockapi.io/accessories/accessories",
    method: "GET",
  });
  promise
    .then((result) => {
      productsDataAccessory = result.data;
      renderAccessories(productsDataAccessory);
    })
    .catch((error) => {
      console.log(error);
    });
};

getListAccessories();

const renderAccessories = (data) => {
  let contentHTML = "";
  for (let i = 0; i < data.length; i++) {
    const acc = data[i];
    contentHTML += `
        <div class="products-list__item">
        <a href="" class="products-list__thumb" onclick="handleOpenProductModal(${i}, 'accessory', event)">
            <img src="./images/products/accessories/${acc.img}" alt="" />
        </a>
            <div class="products-list__info">
                <h4 class="products-list__name" onclick="handleOpenProductModal(${i}, 'accessory', event)">${acc.name}</h4>
                <div class="products-list__price">
                <span class="price--old">$${acc.oldPrice}</span>
                <span class="price--new">$${acc.newPrice}</span>
                </div>
            </div>
            <div class="products-list__btn">
                <button>Buy Now</button>
                <button>Learn More</button>
            </div>
        </div>

    `;
  }
  document.getElementById("listAccessories").innerHTML = contentHTML;

  $(".accessories__listProduct").owlCarousel("destroy"); // Xóa carousel cũ nếu có
  $(".accessories__listProduct").owlCarousel({
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
const openBtn = getEle("openModal");
const closeBtn = getEle("closeModal");
const modal = getEle("modal");

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

  if (type === "phone") product = productsDataPhone[index];
  else if (type === "tv") product = productsDataTV[index];

  document.body.classList.add("modal-open-prevent-scroll"); // Ngăn scroll
  modal.classList.add("open"); //Mở popup

  // reset biến a (quantity) mỗi lần mở modal
  resetQuantity();

  //reset lựa chọn màu và storage mỗi khi đóng modal
  resetProductOptions();

  //Dùng để reset lại storage và màu của sản phẩm
  updateProductPrice(index, type);

  //Ẩn hiện thông tin chi tiết sản phẩm theo loại
  const productTypes = ["phone", "tv", "accessory"]; // Thêm loại mới vào đây nếu cần
  productTypes.forEach((t) => {
    const detailElem = document.getElementsByClassName(
      `product-detail__${t}`
    )[0];
    const selectElem = document.getElementsByClassName(
      `product-select__${t}`
    )[0];
    if (detailElem) {
      detailElem.style.display = type === t ? "grid" : "none";
    }
    if (selectElem) {
      selectElem.style.display = type === t ? "block" : "none";
    }
  });

  //Lấy và in thông tin sản phẩm ra popup mỗi lần mở modal
  getEle("productImg").src = `./images/products/${product.img}`;
  getEle("productName").innerHTML =
    type === "phone" ? `${product.name} 5G` : `${product.name}`;
  getEle("productPrice").innerHTML = `$${product.newPrice}.00`;
  getEle("oldPrice").innerHTML = `$${product.oldPrice}.00`;
  getEle("discount").innerHTML = `${product.discount}% OFF`;
};

window.handleOpenProductModal = handleOpenProductModal;

// Khóa scroll khi mở modal
closeBtn.addEventListener("click", () => {
  document.body.classList.remove("modal-open-prevent-scroll"); // Mở lại scroll
  modal.classList.remove("open");
});

//Đóng modal khi click ra ngoài popup
modal.addEventListener("click", function (e) {
  // Nếu click vào chính modal (nền), chứ không phải modal-inner
  if (e.target === modal) {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open-prevent-scroll");
  }
});

/**
 * Cập nhật giá khi thay tăng số lượng và thay đổi lựa chọn dung lượng
 */
function updateProductPrice(index, type) {
  // Phải để ở trên này vì mỗi lần mở modal thì filter của ảnh điện thoại sẽ bị giữ lại, tivi cũng bị dính filter (nếu mở tivi sau điện thoại)
  getEle("productImg").style.filter = "none"; // Xóa filter (màu của điện thoại) mỗi lần mở lại modal (Mỗi lần mở modal thì update)
  let product;
  let cartItem; //Dùng để tạo object dựa trên class CartItem
  // Lấy số lượng sản phẩm
  const quantity = parseInt(
    document.querySelector(".quantity-control .num").textContent,
    10
  );

  if (type === "phone") {
    // Hiển thị thông tin điện thoại, ẩn thông tin TV
    getEle("productInfo-phone").style.display = "block";
    getEle("productInfo-tv").style.display = "none";

    product = productsDataPhone[index];

    //Lấy độ phân giải đang chọn
    const storage = document
      .querySelector(".storage-option.active")
      .textContent.trim();
    //Lấy kích thước màn hình đang chọn
    const color = document
      .querySelector(".color-option.active")
      .textContent.trim();

    //(Không dùng cách này nữa, dùng phương thức của class CartItem)
    // // Lấy giá gốc từ sản phẩm đang mở modal
    // basePrice = product.newPrice;
    // // Lấy dung lượng đang chọn
    // const storageIndex = Array.from(document.querySelectorAll('.storage-option')).findIndex(opt => opt.classList.contains('active'));

    // if (storageIndex === 1) {
    //     basePrice += 50;
    //     getEle('productName-productStorage').innerHTML = `16GB+256GB, `;
    // } else {
    //     getEle('productName-productStorage').innerHTML = `8GB+128GB, `;
    // }

    // // Lấy màu đang chọn
    // const colorIndex = Array.from(document.querySelectorAll('.color-option')).findIndex(opt => opt.classList.contains('active'));

    //Tạo đối tượng từ sản phẩm đang chọn (để dùng phương thức tính tiền)
    cartItem = new CartItem(
      product.id,
      product.name,
      product.newPrice,
      product.img,
      quantity,
      "Smartphone",
      color,
      storage
    );
    getEle("productName-productStorage").innerHTML = `${storage}, `;
    getEle("productName-productColor").innerHTML = color;

    if (color === "Red") {
      getEle("productName-productColor").innerHTML = `Red`;
      getEle("productImg").style.filter =
        "sepia(1) hue-rotate(-60deg) saturate(4)";
    } else if (color === "Purple") {
      getEle("productName-productColor").innerHTML = `Purple`;
      getEle("productImg").style.filter =
        "sepia(1) hue-rotate(-130deg) saturate(4)";
    } else {
      getEle("productName-productColor").innerHTML = `Black`;
      getEle("productImg").style.filter = "none"; // Xóa filter
    }
  } else if (type === "tv") {
    // Hiển thị thông tin TV, ẩn thông tin điện thoại
    getEle("productInfo-phone").style.display = "none";
    getEle("productInfo-tv").style.display = "block";

    product = productsDataTV[index];

    //Lấy độ phân giải đang chọn
    const resolution = document
      .querySelector(".resolution-option.active")
      .textContent.trim();
    //Lấy kích thước màn hình đang chọn
    const screenSize = document
      .querySelector(".screen-size-option.active")
      .textContent.trim();

    //(Bỏ cách này dùng phương thức của class CartItem)
    // basePrice = product.newPrice;
    // if (resolution === '8K UHD') basePrice += 200;

    // if (screenSize === '65-inch') basePrice += 100;
    // else if (screenSize === '55-inch') basePrice += 50;

    //Tạo đối tượng từ sản phẩm đang chọn (để dùng phương thức tính tiền)
    cartItem = new CartItem(
      product.id,
      product.name,
      product.newPrice,
      product.img,
      quantity,
      "Television",
      null,
      null,
      resolution,
      screenSize
    );

    // Hiển thị lựa chọn lên modal
    getEle("productName-productResolution").innerHTML = `${resolution}, `;
    getEle("productName-productScreenSize").innerHTML = `${screenSize}`;
  }

  // Tính giá tổng bằng phương thức getPrice
  const totalPrice = cartItem.getPrice() * quantity;
  getEle("productPrice").innerHTML = `$${totalPrice}.00`;
}

window.updateProductPrice = updateProductPrice;

/**
 * render dropdown giỏ hàng
 */
const renderCartDropdown = (data) => {
  let contentHTML = "";
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    //Xác định filter màu cho ảnh sản phẩm
    let filter = "none";
    if (item.color === "Red") {
      filter = "sepia(1) hue-rotate(-60deg) saturate(4)";
    } else if (item.color === "Purple") {
      filter = "sepia(1) hue-rotate(-130deg) saturate(4)";
    } else {
      filter = "none"; // Xóa filter
    }

    //Chuỗi mô tả option của sản phẩm
    let optionText = "";
    if (item.type === "Smartphone") {
      optionText = `${item.color ? item.color + " " : ""}${
        item.storage ? item.storage : ""
      }`;
    } else if (item.type === "Television") {
      optionText = `${item.screenSize ? item.screenSize + " " : ""}${
        item.resolution ? item.resolution : ""
      }`;
    } // Accessory không cần optionText

    contentHTML += `
            <li class="cart-dropdown__item">
                <a class="remove-cart-item__button" href="#" onclick="removeCartItem(${i}, event); return false;">
                    <i class="fa-solid fa-xmark"></i>
                </a>
                <img class="cart-dropdown__item-img" src="./images/products/${
                  item.img
                }"
                    style="width: 65px; height: auto; filter: ${filter};" alt="">
                <div class="cart-dropdown__item-info">
                    <div class="cart-dropdown__item-name">${
                      item.name
                    } ${optionText}</div>
                    <div class="cart-dropdown__item-meta">$${item.getPrice()} × ${
      item.quantity
    }</div>
                </div>
            </li>
        `;
  }

  getEle("cartDropdownList").innerHTML = contentHTML;

  // Cập nhật số lượng sản phẩm trong giỏ hàng ở footer
  const totalItems = data.reduce((total, item) => total + item.quantity, 0);
  getEle("cartSubtotalCount").textContent =
    totalItems === 1 ? "1 item" : `${totalItems} items`;

  // Cập nhật tổng giá tiền ở footer
  const totalPrice = data.reduce(
    (total, item) => total + item.getPrice() * item.quantity,
    0
  );
  getEle("cartSubtotalValue").textContent = `$${totalPrice}`;
};

/**
 * Hàm để xóa sản phẩm
 */
function removeCartItem(index, event) {
  if (event) event.stopPropagation(); // Ngăn sự kiện lan ra ngoài
  cartList.splice(index, 1);
  updateCartCount();
  setLocalStorage();
  renderCartDropdown(cartList);
}

window.removeCartItem = removeCartItem;

/**
 * Thêm sản phẩm vào giỏ hàng
 */
const addProductToCart = () => {
  let product;
  let cartItem;

  // lấy số lượng
  const quantity = parseInt(
    document.querySelector(".quantity-control .num").textContent,
    10
  );

  if (window.currentProductType === "phone") {
    product = productsDataPhone[window.currentProductIndex];
    const color = document
      .querySelector(".color-option.active")
      .textContent.trim(); //Dùng trim giúp lấy văn bản ko có khoảng trắng ở đầu và cuối
    const storage = document
      .querySelector(".storage-option.active")
      .textContent.trim();

    // (Không dùng cách này nữa giờ dùng phương thức isSameItem để check trùng lặp sản phẩm và getPrice để tính giá từng loại sản phẩm)
    // //Kiểm tra trùng sản phẩm
    // //found là biến tham chiếu (tham chiếu trực tiếp đến đối tượng trong mảng)
    // //thay đổi thuộc tính của found thì phần tử trong mảng cũng thay đổi theo (vì cả hai cùng tham chiếu đến một vùng nhớ)
    // const found = cartList.find(item =>
    //     item.id === product.id &&
    //     item.type === 'Smartphone' &&
    //     item.color === color &&
    //     item.storage === storage
    // );

    // if (found) {
    //     found.quantity += quantity;
    // } else {
    //     cartItem = new CartItem(
    //         product.id,
    //         product.name,
    //         product.newPrice,
    //         product.img,
    //         quantity,
    //         'Smartphone',
    //         color,
    //         storage
    //     );
    //     cartList.push(cartItem); //Chỉ push khi chưa có sản phẩm trùng
    // }

    cartItem = new CartItem(
      product.id,
      product.name,
      product.newPrice,
      product.img,
      quantity,
      "Smartphone",
      color,
      storage
    );

    //Dùng phương thức isSameItem để kiểm tra trùng
    //found là biến tham chiếu (tham chiếu trực tiếp đến đối tượng trong mảng)
    //thay đổi thuộc tính của found thì phần tử trong mảng cũng thay đổi theo (vì cả hai cùng tham chiếu đến một vùng nhớ)
    const found = cartList.find((item) => item.isSameItem(cartItem)); //find là phương thức tìm phần tử đầu tiên thỏa mãn điều kiện truyền vào (là sản phẩm đã trùng với sản phẩm trong mảng)
    if (found) {
      found.quantity += quantity; //Tăng số lượng sản phẩm trùng
    } else {
      cartList.push(cartItem);
    }
  } else if (window.currentProductType === "tv") {
    product = productsDataTV[window.currentProductIndex];
    const resolution = document
      .querySelector(".resolution-option.active")
      .textContent.trim();
    const screenSize = document
      .querySelector(".screen-size-option.active")
      .textContent.trim();

    // const found = cartList.find(item =>
    //     item.id === product.id &&
    //     item.type === 'Television' &&
    //     item.resolution === resolution &&
    //     item.screenSize === screenSize
    // );

    // if (found) {
    //     found.quantity += quantity;
    // } else {
    //     cartItem = new CartItem(
    //         product.id,
    //         product.name,
    //         product.newPrice,
    //         product.img,
    //         quantity,
    //         'Television',
    //         null, //color
    //         null, //storage
    //         resolution,
    //         screenSize
    //     );
    //     cartList.push(cartItem); //Chỉ push khi chưa có sản phẩm trùng
    // }

    cartItem = new CartItem(
      product.id,
      product.name,
      product.newPrice,
      product.img,
      quantity,
      "Television",
      null, //color
      null, //storage
      resolution,
      screenSize
    );

    const found = cartList.find((item) => item.isSameItem(cartItem)); //find là phương thức tìm phần tử đầu tiên thỏa mãn điều kiện truyền vào (là sản phẩm đã trùng với sản phẩm trong mảng)
    if (found) {
      found.quantity += quantity; //Tăng số lượng sản phẩm trùng
    } else {
      cartList.push(cartItem);
    }
  } else if (window.currentProductType === "accessory") {
    product = productsDataAccessory[window.currentProductIndex];

    // const found = cartList.find(item =>
    //     item.id === product.id &&
    //     item.type === 'Accessory'
    // );

    // if (found) {
    //     found.quantity += quantity;
    // } else {
    //     cartItem = new CartItem(
    //         product.id,
    //         product.name,
    //         product.newPrice,
    //         product.img,
    //         quantity,
    //         'Accessory'
    //         // Các thuộc tính khác để mặc định null
    //     );
    //     cartList.push(cartItem);
    // }

    cartItem = new CartItem(
      product.id,
      product.name,
      product.newPrice,
      product.img,
      quantity,
      "Accessory"
      // Các thuộc tính khác để mặc định null
    );

    const found = cartList.find((item) => item.isSameItem(cartItem)); //find là phương thức tìm phần tử đầu tiên thỏa mãn điều kiện truyền vào (là sản phẩm đã trùng với sản phẩm trong mảng)
    if (found) {
      found.quantity += quantity; //Tăng số lượng sản phẩm trùng
    } else {
      cartList.push(cartItem);
    }
  }

  document.body.classList.remove("modal-open-prevent-scroll"); // Mở lại scroll
  modal.classList.remove("open"); //Đóng modal sau khi Add to Cart
  updateCartCount(); //Hiện số lượng sản phẩm đã thêm trên giỏ hàng
  setLocalStorage(); //Lưu cartList vào local

  // render lại giỏ hàng
  renderCartDropdown(cartList);
};

window.addProductToCart = addProductToCart;

//Cập nhât số lượng hàng trong giỏ hàng
const updateCartCount = () => {
  const totalItems = cartList.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").textContent = totalItems;
};

// setLocalStorage (Lưu mảng cartList trong local)
const setLocalStorage = () => {
  //chuyển list qua string
  const dataString = JSON.stringify(cartList);
  //Lưu vào local storage
  localStorage.setItem("CART_LIST", dataString);
};

// getLocalStorage
const getLocalStorage = () => {
  //lấy dữ liệu từ local
  const dataString = localStorage.getItem("CART_LIST");
  if (!dataString) return; // Không có dữ liệu thì thoát luôn
  //convert từ dataString => JSON
  const dataJson = JSON.parse(dataString);
  //phục hồi dữ liệu cho cartList
  // Chuyển từng object thành CartItem
  //Sau khi lấy dữ liệu từ localStorage phải chuyển từng object lại thành instance của CartItem
  cartList = dataJson.map(
    (item) =>
      new CartItem(
        item.id,
        item.name,
        item.basePrice,
        item.img,
        item.quantity,
        item.type,
        item.color,
        item.storage,
        item.resolution,
        item.screenSize
      )
  );

  /**
   * Giải thích lý do cần làm thế này
   * cartList là mảng lưu các object (các sản phẩm trong giỏ hàng).
   * Nhưng nếu lưu vào localStorage rồi lấy ra, các object này không còn là
   * instance của class CartItem mà chỉ là plain object (object thường).
   * Vì vậy, các phương thức của class như isSameItem, getPrice sẽ không hoạt động trên các object này.
   *
   * Định nghĩa instance
   * Instance là một đối tượng được tạo ra từ một class (lớp) bằng từ khóa new.
   * Nó có đầy đủ thuộc tính và phương thức (function) của class đó.
   */

  //khôi phục dữ liệu xong thì update lại số lượng item trong cart
  updateCartCount();

  // render lại giỏ hàng
  renderCartDropdown(cartList);
};

getLocalStorage();
