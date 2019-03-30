async function ValidatorInputsProduct(ProductObject) {

    
    if(ProductObject.productName && ProductObject.productPrice) {
        return true;
    } else {
        return false;
    }


}

module.exports = {

    ValidatorInputsProduct
}