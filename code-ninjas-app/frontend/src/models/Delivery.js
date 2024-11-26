class Delivery {
    constructor(startLocation, nameOfSender, endLocation, nameOfRecipient, packageLength, packageWidth, packageHeight, packageWeight, shippingType) {
        this.startLocation = startLocation;
        this.nameOfSender = nameOfSender;
        this.endLocation = endLocation;
        this.nameOfRecipient = nameOfRecipient;
        this.packageLength = packageLength;
        this.packageWidth = packageWidth;
        this.packageHeight = packageHeight;
        this.packageWeight = packageWeight;
        this.shippingType = shippingType;
    }

    toPlainObject() {
        return {
            startLocation: this.startLocation,
            nameOfSender: this.nameOfSender,
            endLocation: this.endLocation,
            nameOfRecipient: this.nameOfRecipient,
            packageLength: this.packageLength,
            packageWidth: this.packageWidth,
            packageHeight: this.packageHeight,
            packageWeight: this.packageWeight,
            shippingType: this.shippingType,
        };
    }
}

export default Delivery;