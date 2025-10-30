/**
 * Tính lại giá tiền khi click vào các select
 */
document.querySelectorAll('.storage-select .storage-option').forEach(function (tab) {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.storage-select .storage-option').forEach(function (t) {
            t.classList.remove('active');
        });
        tab.classList.add('active');
        updateProductPrice(); // click vào xong mới thực hiện tính toán update lại price
    });
});

/**
 * Show lại color ở dưới tên sản phẩm khi click vào các select
 */
document.querySelectorAll('.color-select .color-option').forEach(function (tab) {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.color-select .color-option').forEach(function (t) {
            t.classList.remove('active');
        });
        tab.classList.add('active');
        updateProductPrice();
    });
});