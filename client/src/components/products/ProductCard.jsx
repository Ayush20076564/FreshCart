import { FaCartPlus } from "react-icons/fa";
import { useCartContext } from "../../context/CartContext";

function ProductCard({ product }) {
  const fallbackImage = "https://via.placeholder.com/300x220?text=FreshCart";
  const { addToCart } = useCartContext();

  const stock = Number(product.stock || 0);
  const price = Number(product.price || 0);
  const isOutOfStock = stock <= 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="card product-card h-100 border-0 shadow-sm">
      <div className="product-image-wrapper">
        <img
          src={product.image || fallbackImage}
          className="product-image"
          alt={product.name || "Product image"}
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <span className="badge rounded-pill bg-light text-success border border-success-subtle mb-2 align-self-start">
          {product.category || "General"}
        </span>

        <h5 className="card-title fw-bold">{product.name}</h5>

        <p className="card-text text-muted small flex-grow-1">
          {product.description}
        </p>

        <div className="mb-2">
          <small
            className={
              isOutOfStock
                ? "text-danger fw-semibold"
                : "text-success fw-semibold"
            }
          >
            {isOutOfStock ? "Out of stock" : `${stock} left in stock`}
          </small>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <h6 className="mb-0 fw-bold text-success">
            €{price.toFixed(2)}
          </h6>

          <button
            className="btn btn-success rounded-pill px-3"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <FaCartPlus className="me-2" />
            {isOutOfStock ? "Out" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;