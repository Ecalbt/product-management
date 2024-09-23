const Product = require("../../model/product.model")

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        availabilityStatus: "InStock",
        delete: false
    }).sort({position: "desc"});

    const newProducts = products.map(item => {
        item.priceNew = (item.price * (100-item.discountPercentage)/100).toFixed(2);
        return item;
    })

    res.render("client/pages/products/index.pug", {
        titlePage : "Trang danh sách sản phẩm",
        products : newProducts
    });
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
    
    try {
        const find = {
            delete: false,
            availabilityStatus: "InStock",
            slug: req.params.slug
        }
        const product = await Product.findOne(find);
        console.log(product);
        res.render("client/pages/products/detail.pug", {
            titlePage: product.title,
            product: product
        });
    } catch (error) {
        res.redirect(`/products`);
    }
    
    
  }