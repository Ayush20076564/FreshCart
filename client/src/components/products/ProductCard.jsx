import { FaCartPlus } from "react-icons/fa";
import { useCartContext } from "../../context/CartContext";

function ProductCard({ product }) {
  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";
  const { addToCart } = useCartContext();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="card product-card h-100 border-0 shadow-sm">
      <img
        src={product.image || fallbackImage}
        className="card-img-top product-image"
        alt={product.name}
        onError={(e) => {
          e.target.src = fallbackImage;
        }}
      />

      <div className="card-body d-flex flex-column">
        <span className="badge rounded-pill bg-light text-success border border-success-subtle mb-2 align-self-start">
          {product.category}
        </span>

        <h5 className="card-title fw-bold">{product.name}</h5>

        <p className="card-text text-muted small flex-grow-1">
          {product.description}
        </p>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <h6 className="mb-0 fw-bold text-success">€{product.price}</h6>

          <button
            className="btn btn-success rounded-pill px-3"
            onClick={handleAddToCart}
          >
            <FaCartPlus className="me-2" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;