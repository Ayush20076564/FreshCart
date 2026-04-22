import ProductCard from "../components/products/ProductCard";
import products from "../data/products";

function Products() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="products-header mb-4">
          <h1 className="fw-bold">All Products</h1>
          <p className="text-muted mb-0">
            Browse fresh and essential grocery items.
          </p>
        </div>

        <div className="row mb-4 g-3">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control form-control-lg rounded-pill"
              placeholder="Search for products..."
            />
          </div>
          <div className="col-md-4">
            <select className="form-select form-select-lg rounded-pill">
              <option>All Categories</option>
              <option>Fruits</option>
              <option>Vegetables</option>
              <option>Dairy</option>
              <option>Bakery</option>
              <option>Beverages</option>
              <option>Snacks</option>
            </select>
          </div>
        </div>

        <div className="row g-4">
          {products.map((product) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;