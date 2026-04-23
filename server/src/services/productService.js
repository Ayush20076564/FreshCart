const { db } = require("../config/firebaseAdmin");

const PRODUCTS_COLLECTION = "products";

const getAllProducts = async () => {
  const snapshot = await db.collection(PRODUCTS_COLLECTION).get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};

const getProductById = async (id) => {
  const docRef = await db.collection(PRODUCTS_COLLECTION).doc(id).get();

  if (!docRef.exists) {
    return null;
  }

  return {
    id: docRef.id,
    ...docRef.data()
  };
};

const createProduct = async (productData) => {
  const newProductRef = await db.collection(PRODUCTS_COLLECTION).add({
    ...productData,
    createdAt: new Date().toISOString()
  });

  const createdDoc = await newProductRef.get();

  return {
    id: createdDoc.id,
    ...createdDoc.data()
  };
};

const updateProduct = async (id, updatedData) => {
  const productRef = db.collection(PRODUCTS_COLLECTION).doc(id);
  const existingDoc = await productRef.get();

  if (!existingDoc.exists) {
    return null;
  }

  await productRef.update({
    ...updatedData,
    updatedAt: new Date().toISOString()
  });

  const updatedDoc = await productRef.get();

  return {
    id: updatedDoc.id,
    ...updatedDoc.data()
  };
};

const deleteProduct = async (id) => {
  const productRef = db.collection(PRODUCTS_COLLECTION).doc(id);
  const existingDoc = await productRef.get();

  if (!existingDoc.exists) {
    return false;
  }

  await productRef.delete();
  return true;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};