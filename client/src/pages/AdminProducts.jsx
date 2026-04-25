import { useEffect, useState } from "react";
import axios from "axios";
import { fetchProducts } from "../api/productApi";

const BASE_URL = "/api/products";

const initialFormState = {
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
  stock: ""
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState(initialFormState);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetForm = () => {
    setForm(initialFormState);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setSubmitting(true);

      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      };

      if (editingId) {
        await axios.put(`${BASE_URL}/${editingId}`, payload);
        setMessage("Product updated successfully.");
      } else {
        await axios.post(BASE_URL, payload);
        setMessage("Product added successfully.");
      }

      resetForm();
      await loadProducts();
    } catch (err) {
      setError("Failed to save product.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      image: product.image || "",
      description: product.description || "",
      stock: product.stock || ""
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      setError("");
      setMessage("");
      await axios.delete(`${BASE_URL}/${id}`);
      setMessage("Product deleted successfully.");
      await loadProducts();

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  return (
    <div className="container py-5">
      <div className="page-header mb-4">
        <h1 className="fw-bold mb-1">Admin Product Management</h1>
        <p className="text-muted mb-0">
          Manage FreshCart products, stock availability, pricing, and inventory updates.
        </p>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card border-0 shadow-sm mb-5 admin-card">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-4">
            {editingId ? "Edit Product" : "Add New Product"}
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="Enter category"
                  className="form-control"
                  value={form.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Price</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  placeholder="Enter price"
                  className="form-control"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Stock</label>
                <input
                  type="number"
                  name="stock"
                  placeholder="Enter stock"
                  className="form-control"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Image URL</label>
                <input
                  type="text"
                  name="image"
                  placeholder="Paste image URL"
                  className="form-control"
                  value={form.image}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  name="description"
                  rows="3"
                  placeholder="Enter product description"
                  className="form-control"
                  value={form.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="col-12 d-flex gap-2 flex-wrap">
                <button
                  type="submit"
                  className="btn btn-success rounded-pill px-4"
                  disabled={submitting}
                >
                  {submitting
                    ? editingId
                      ? "Updating..."
                      : "Adding..."
                    : editingId
                    ? "Update Product"
                    : "Add Product"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill px-4"
                    onClick={resetForm}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-sm admin-card">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-4">Existing Products</h4>

          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-muted mb-0">No products available.</p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th style={{ minWidth: "160px" }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="fw-semibold">{product.name}</td>
                      <td>{product.category}</td>
                      <td>€{product.price}</td>
                      <td>
                        <span
                          className={
                            Number(product.stock) <= 5
                              ? "badge rounded-pill bg-danger"
                              : "badge rounded-pill badge-stock"
                          }
                        >
                          {product.stock} left
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2 flex-wrap">
                          <button
                            className="btn btn-sm btn-outline-primary rounded-pill px-3"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger rounded-pill px-3"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;