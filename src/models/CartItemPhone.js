class CartItem {
    constructor(id, name, basePrice, img, color, storage, quantity, type) {
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.img = img;
        this.color = color;
        this.storage = storage;
        this.quantity = quantity;
        this.type = type; // 'Smartphone', 'Television', 'Accessory'
    }
}

export default CartItem;