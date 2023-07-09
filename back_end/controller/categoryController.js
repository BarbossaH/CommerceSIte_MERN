import slugify from 'slugify';
import categoryModel from '../models/categoryModel.js';

export const createCategoryController = async (req, res) => {
  try {
    //check the name of category
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: 'Name is required.' });
    }
    //check duplicate name
    const duplicateName = await categoryModel.findOne({ name });
    if (duplicateName) {
      return res.status(200).send({
        success: true,
        message: 'Category name has existed.',
      });
    }

    const category = await categoryModel.create({ name, slug: slugify(name) });
    // const category = new categoryModel({ name, slug: slugify(name) }).save();
    return res.status(201).send({
      success: true,
      message: 'Category create successfully.',
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Category',
    });
  }
  return res.send('OK');
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) {
      return res.status(401).send({
        success: true,
        message: 'name is required.',
      });
    }
    const duplicate = await categoryModel.find({ name });
    if (duplicate.length > 0) {
      let isNotSelf = false;
      duplicate.forEach((item) => {
        if (item.id !== id) {
          isNotSelf = true;
          if (isNotSelf) return;
        } else {
          isNotSelf = false;
        }
      });
      if (isNotSelf) {
        return res.status(200).send({
          success: false,
          message: 'Duplicate name',
        });
      } else {
        return res.status(200).send({
          success: true,
          message: 'The name is same.',
        });
      }
    } else {
    }
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    return res
      .status(201)
      .send({ success: true, message: 'Update successfully', category });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Update error',
      error,
    });
  }
};
export const deleteCategoryController = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await categoryModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: 'Delete successfully.',
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: 'Deleting got error.',
    });
  }
};
export const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (categories.length > 0) {
      res.status(200).send({
        message: 'Get all categories.',
        success: true,
        categories,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: 'Getting all categories got error.',
    });
  }
};
export const getOneCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    // console.log(req.params);
    const category = await categoryModel.findOne({ slug });
    if (category) {
      return res.status(200).send({
        message: 'Get the category.',
        success: true,
        category,
      });
    } else {
      return res.status(200).send({
        message: 'The category not found.',
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: 'Getting one category got error.',
    });
  }
};
