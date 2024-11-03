const {Products} = require("../models");

const createProduct = async (req, res) => {
    const {name, stock, price} = req.body;
    try {
        const newProduct = await Products.create({
            name: name,
            stock: stock,
            price: price
        })

        res.status(201).json({
            status: "Success",
            message: "Product created successfully",
            isSuccess: true,
            data: newProduct
        })
    }catch (error) {
        if(error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors.map(err => err.message)
            res.status(400).json({
                status: "Fail",
                message: `Product creation failed. ${errorMessage[0]}`,
                isSuccess: false,
                data: null
            })
        } else {
            res.status(500).json({
                status: "Fail",
                message: `Product creation failed. ${error.message}`,
                isSuccess: false,
                data: null
            })
        }
    }
}

module.exports = {
    createProduct
}
