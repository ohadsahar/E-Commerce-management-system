const express = require("express");
const router = express.Router();
const multer  = require('multer')
const path = require("path");
const AccessControl = require('accesscontrol');
const Global = require("../utils/Global.util");

const ProductValidatorUtil = require("../utils/productValidator.util");
const ProductCreatorUtil = require("../utils/productCreator.util");
const ProductGetterUtil = require("../utils/productGetter.util");



const ac = new AccessControl();

ac.grant('user')
    .readAny('product')
  .grant('admin')
    .extend('user')
    .readAny('product')
    .updateAny('product', ['product'])
    .deleteAny('product')
    .createOwn('product');

const storage = multer.diskStorage({
  destination: 'assets/images',
  filename: function(req, file ,cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload =  multer({ storage: storage}).single('image');

router.post("",upload, async (req, res) => {

  try {

    const permission = ac.can(Global.role).createOwn('product');
    if (permission.granted) {
    if (req.file.filename) {

      const validatorProduct = await ProductValidatorUtil.ValidatorInputsProduct(req.body);
      if (validatorProduct) {
        const ProductCreated = await ProductCreatorUtil.CreateProduct(req);
        const GetProductsCount = await ProductGetterUtil.GetProductsCount();


        res.status(200).json({
          message: ProductCreated.success,
          products: ProductCreated.product,
          ProductsCount: GetProductsCount
        });
      } else {
        res.status(400).json({
          message: "Problem with input,Sorry try again"
        });
      }
    }
  }
  } catch (error) {
    res.status(400).json({
      message: 'Yuston we have a problem:' + error
    })


  }

});

router.get("", async (req, res) => {
  try {
    const permission = ac.can(Global.role).readAny('product');
    if (permission.granted) {
    const GetProducts = await ProductGetterUtil.GetAllProducts();
    const GetProductsCount = await ProductGetterUtil.GetProductsCount();
    res.status(200).json({
      Product: GetProducts,
      ProductsCount: GetProductsCount
    });
  }
  } catch (error) {
    res.status(400).json({
      message: 'Yuston we have a problem:' + error
    })
  }
});

router.get("/:productid", async(req,res) => {

 try {
  if(req.params.productid) {
    const FindProductById = await ProductGetterUtil.GetOneUser(req.params.productid);
    const GetFullInfo = await ProductGetterUtil.GetFullInformationProduct(FindProductById);

    res.status(200).json({
      id: GetFullInfo.InfoProduct.id,
      productName: GetFullInfo.InfoProduct.productName,
      productPrice: GetFullInfo.InfoProduct.productPrice,
      productInformation: GetFullInfo.InfoProduct.productInformation,
      Image: GetFullInfo.InfoProduct.Image
    });
  }
 }  catch (error) {
  res.status(400).json({
    message: 'Yuston we have a problem:' + error
  })
}



});

router.get("/:keyword/:keyword", async (req,res) => {

  try {
    const GetProducts = await ProductGetterUtil.GetProductsByKeyword(req.params.keyword);
    const GetProductsCount = await ProductGetterUtil.GetProductsCount();

    res.status(200).json({
        message: GetProducts.message,
        products: GetProducts.products,
        ProductsCount: GetProductsCount
    });

  } catch (error) {

    res.status(400).json({
      message: 'Yuston we have a problem:' + error
    })
  }
});


router.put("/:productid",upload, async(req,res) => {


 try {

  const permission = ac.can(Global.role).updateAny('product');
  if (permission.granted) {
  const GetProductsCount = await ProductGetterUtil.GetProductsCount();
  const UpdateCustomer = await ProductCreatorUtil.UpdateProduct(req.body, req.params.productid, req);

  res.status(200).json({
    message: UpdateCustomer.message,
    products: UpdateCustomer.product,
    ProductsCount: GetProductsCount
  });
}
 } catch (error) {
  res.status(400).json({
    message: 'Yuston we have a problem:' + error
  })
 }


});

router.delete("/:productid", async (req, res) => {

  try {
    const permission = ac.can(Global.role).deleteAny('product');
    if (permission.granted) {
    const DeleteFunkoDoll = await ProductCreatorUtil.DeleteFunko(req.params.productid);
    const GetProductsCount = await ProductGetterUtil.GetProductsCount();
    if (DeleteFunkoDoll.message) {
      res.status(200).json({
        message: "Delete successfully!",
        productid: DeleteFunkoDoll.id,
        ProductsCount: GetProductsCount
      });
    }
  }
  } catch (error) {
    res.status(400).json({
      message: 'Yuston we have a problem:' + error
    })
  }
});

module.exports = router;
