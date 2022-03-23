class pricing {
  price() {
    let stateCheck = "yes";
    let gallonAmount = 100.0;
    let pricePerGallon = 2.99;
    let address = "4800 Calhoun Rd, Houston, TX 77004";
    let shippingDate = "3/13/2022";
    let totalPrice = gallonAmount * pricePerGallon;

    console.debug(address);
    console.debug(totalPrice);
  }
}
