import slugify from 'slugify';
import productModel from '../models/productModel.js';
import fs from 'fs';
export const createProductController = async (req, res) => {
  try {
    // const { name, description, price, category, quantity, shipping } =
    const { name, description, price, category, quantity, shipping } =
      req.fields;
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
      case !shipping:
        return res.status(500).send({ error: 'Shipping is required.' });
      case !photo || photo?.size > 10000000:
        return res
          .status(500)
          .send({ error: 'Phone is required and should be less than 1M.' });
    }
    // check duplicate
    const duplicate = await productModel.findOne({ name });
    if (duplicate) {
      return res.status(200).send({
        success: false,
        message: 'The name has existed.',
      });
    }

    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      // console.log(123, photo.path, photo.type);
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
export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(200).send({
        success: true,
        message: 'Product id is required.',
      });
    }
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
      case photo?.size > 1000000:
        return res
          .status(500)
          .send({ error: 'Phone is required and should be less than 1M.' });
    }
    // check duplicate
    // const duplicate = await productModel.findOne({ name });
    // if (duplicate) {
    //   return res.status(200).send({
    //     success: false,
    //     message: 'The name has existed.',
    //   });
    // }
    const product = await productModel.findByIdAndUpdate(
      id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      // console.log(123, photo.path, photo.type);
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: 'Product updated Successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Updating failed',
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  // const { id } = req.params;

  // console.log(id, 'this is id');
  // return res.status(200).send({ message: id });
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(200)
        .send({ success: true, message: 'Product id is required' });
    await productModel.findByIdAndDelete(id).select('-photo');
    return res.status(200).send({
      success: true,
      message: 'Product deleted.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Failed',
      error,
    });
  }
};
export const getAllProductsController = async (req, res) => {
  try {
    //exclude the photo data because this type of file could be too large
    const products = await productModel
      .find({})
      .select('-photo')
      .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: `Get All Products and the total count is ${products.length}`,
      // totalCount: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in getting all products',
      error,
    });
  }
};
export const getOneProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(200).send({
        success: false,
        message: 'Slug is required',
      });
    }
    const product = await productModel
      .findOne({ slug })
      .select('-photo')
      .populate('category'); // to add the category details
    if (!product) {
      return res.status(200).send({
        success: true,
        message: "Slug doesn't exist.",
      });
    }
    return res.status(200).send({
      success: true,
      message: 'Get a product fetched',
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Get a single product failed.',
      error,
    });
  }
};

export const getProductPhotoController = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id, 9999999999);
    if (!id) {
      res.status(200).send({
        success: true,
        message: 'ID is required',
      });
    }
    const product = await productModel.findById(id).select('photo');
    if (!product.photo.data) {
      return res.status(200).send({
        success: true,
        message: 'The photo not found',
      });
    }
    res.set('Content-type', product.photo.contentType);
    return res.status(200).send(product.photo.data);

    //the following code cannot show the picture in postman
    // return res.status(200).send({
    //   success: true,
    //   message: 'The photo found',
    //   photo: product.photo.data,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Getting photo failed',
      error,
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let filters = {};
    const eachCount = 3;
    const page = req.params.page ? req.params.page : 1;

    if (checked?.length > 0) filters.category = checked;
    if (radio?.length > 0) filters.price = { $gt: radio[0], $lte: radio[1] }; // >radio[0] and <=radio[1]

    const total = await productModel.countDocuments(filters);
    // const total = (await productModel.find(filters)).length;
    console.log(total, 99999999);
    const products = await productModel
      .find(filters)
      .select('-photo')
      .skip((page - 1) * eachCount)
      .limit(eachCount)
      .sort({ createdAt: -1 });
    // console.log(filters, '1232321');

    res.status(200).send({
      success: true,
      message: 'filtering successful',
      products,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Filtering products went wrong.',
      error,
    });
  }
};

// export const getTotalCountController = async (req, res) => {
//   try {
//     const { checked, radio } = req.body;
//     let filters = {};

//     if (checked?.length > 0) filters.category = checked;
//     if (radio?.length > 0) filters.price = { $gt: radio[0], $lte: radio[1] };
//     const total = await productModel.find(filters).estimatedDocumentCount();
//     return res.status(200).send({
//       success: true,
//       total,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: 'Getting total went wrong',
//       success: false,
//       error,
//     });
//   }
// };

// export const getPageProductController = async (req, res) => {
//   try {
//     const eachCount = 3;
//     const page = req.params.page ? req.params.page : 1;
//     console.log(page, 1111111);
//     const products = await productModel
//       .find({})
//       .select('-photo')
//       .skip((page - 1) * eachCount)
//       .limit(eachCount)
//       .sort({ createdAt: -1 });
//     return res.status(200).send({
//       success: true,
//       message: `${page} products get.`,
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: 'Getting products on pages went wrong',
//       error,
//       success: false,
//     });
//   }
// };
