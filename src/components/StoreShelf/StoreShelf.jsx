import "./StoreShelf.css";

export default function StoreShelf({
  title = "Cloud Store",
  subtitle = "Store items ready for upload.",
  identity = "Cloud Store Display",
  dropTitle = "Pack Drop Shelf",
  dropImage = "",
  type = "general",
  items = [],
}) {
  const shelfItems =
    items.length > 0
      ? items
      : Array.from({ length: 24 }, (_, index) => ({
          id: index + 1,
          name:
            type === "white-label"
              ? "White Label Product Slot"
              : type === "helper"
              ? "Helper Body Slot"
              : type === "digital"
              ? "Digital Product Slot"
              : "Product Slot",
          model:
            type === "white-label"
              ? "Formula / SKU"
              : type === "helper"
              ? "Model / Bot Type"
              : type === "digital"
              ? "File / Access Type"
              : "Model / SKU",
          description: "Description ready for upload.",
          price: "$0.00",
          image: "",
          affiliateLink: "",
          purchaseLink: "",
          ingredients: "Ingredient list ready for upload.",
          useInfo: "How to use this product.",
          doesWhat: "What this product does.",
          forWho: "Who this product is best for.",
        }));

  return (
    <section className={`store-shelf store-shelf-${type}`}>
      <div className="store-shelf-header">
        {dropImage && (
          <div className="store-drop-banner">
            <img src={dropImage} alt={dropTitle || title} />
          </div>
        )}

        <p className="store-shelf-eyebrow">{identity}</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <h2>{dropTitle}</h2>
      </div>

      <div className="store-grid">
        {shelfItems.map((item) => (
          <article className="store-card" key={item.id}>
            <div className="store-image-box">
              {item.image ? (
                <img src={item.image} alt={item.name} />
              ) : (
                <span>Image Upload Slot</span>
              )}
            </div>

            <h3>{item.name}</h3>
            <p className="store-model">{item.model}</p>
            <p className="store-description">{item.description}</p>

            {type === "white-label" && (
              <div className="product-info-box">
                <p>
                  <strong>What It Does:</strong> {item.doesWhat}
                </p>
                <p>
                  <strong>Best For:</strong> {item.forWho}
                </p>
                <p>
                  <strong>Ingredients:</strong> {item.ingredients}
                </p>
                <p>
                  <strong>Use Info:</strong> {item.useInfo}
                </p>
              </div>
            )}

            <p className="store-price">{item.price}</p>

            <div className="store-card-buttons">
              <a href={item.affiliateLink || "#"}>Affiliate Link</a>
              <a href={item.purchaseLink || "#"}>Purchase Link</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
