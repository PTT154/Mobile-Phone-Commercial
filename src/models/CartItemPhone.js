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
}

export default CartItem;