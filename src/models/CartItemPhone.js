class CartItem {
    constructor(id, name, price, img, color, storage, quantity, type) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.color = color;
        this.storage = storage;
        this.quantity = quantity;
        this.type = type; // 'Smartphone', 'Television', 'Accessory'
    }
}

export default CartItem;