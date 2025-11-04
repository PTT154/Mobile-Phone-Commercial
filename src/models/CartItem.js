class CartItem {
    constructor(id, name, basePrice, img, quantity, type, color = null, storage = null, resolution = null, screenSize = null) {
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.img = img;
        this.quantity = quantity;
        this.type = type; // 'Smartphone', 'Television', 'Accessory'

        // Smartphone
        this.color = color;
        this.storage = storage;

        // Television
        this.resolution = resolution;
        this.screenSize = screenSize;
        // Accessory: không cần thuộc tính riêng
    }

    // Tính giá cho 1 sản phẩm dựa vào các lựa chọn option
    getPrice() {
        let price = this.basePrice;

        if (this.type === 'Smartphone') {
            if (this.storage === '16GB + 256GB') price += 50;
            // Cộng thêm nếu chọn màu đặc biệt
            if (this.color === 'Red') price += 10;
            if (this.color === 'Purple') price += 5;
            // Black không cộng thêm
        }
        if (this.type === 'Television') {
            if (this.resolution === '8K UHD') price += 200;
            if (this.screenSize === '65-inch') price += 100;
            else if (this.screenSize === '55-inch') price += 50;
        }
        // Accessory: không cộng thêm

        return price;
    }

    //Tính tổng tiền
    getTotalPrice() {
        return this.getPrice() * this.quantity;
    }

    //Cập nhật option
    updateOptions({ color, storage, resolution, screenSize }) {
        if (color !== undefined) this.color = color;
        if (storage !== undefined) this.storage = storage;
        if (resolution !== undefined) this.resolution = resolution;
        if (screenSize !== undefined) this.screenSize = screenSize;
    }

    //Kiểm tra trùng item
    isSameItem(other) {
        return this.id === other.id &&
            this.type === other.type &&
            this.color === other.color &&
            this.storage === other.storage &&
            this.resolution === other.resolution &&
            this.screenSize === other.screenSize;
    }
}
export default CartItem;