import slugify from 'slugify';
import productModel from '../models/productModel.js';
import fs from 'fs';
export const createProductController = async (req, res) => {
  /*
  app.post('/upload', (req, res) => {
  req.fields; // contains non-file fields
  req.files; // contains files
});

*/

  try {
    // const { name, description, price, category, quantity, shipping } =
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    //check the fields
    switch (true) {
      case !name:
        return res.status(500).send({ error: 'Name is required.' });
      case !description:
        return res.status(500).send({ error: 'Description is required.' });
      case !price:
        return res.status(500).send({ error: 'Price is required.' });
      case !category:
        return res.status(500).send({ error: 'Category is required.' });
      case !quantity:
        return res.status(500).send({ error: 'Quantity is required.' });
      case !photo || photo?.size > 10000000:
        return res
          .status(500)
          .send({ error: 'Phone is required and should be less than 1M.' });
    }
    // check duplicate
    const duplicate = productModel.findOne({ name });
    if (duplicate) {
      return res.status(200).send({
        success: false,
        message: 'The name has existed.',
      });
    }

    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      console.log(123, photo.path, photo.type);
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: 'Product Created Successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, error, message: 'Error in creating product.' });
  }
};
export const updateProductController = () => {};
export const deleteProductController = () => {};
export const getAllProductsController = () => {};
export const getOneProductController = () => {};
