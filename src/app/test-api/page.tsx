import { getProducts } from "@/lib/api";

export default async function TestAPIPage() {
  const products = await getProducts();

  return (
    <main style={{ padding: "40px" }}>
      <h1>API Test — {products.length} products found</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "30px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "16px",
              backgroundColor: "#fff",
            }}
          >
            {product.images[0] && (
              <img
                src={product.images[0].src}
                alt={product.name}
                style={{ width: "100%", borderRadius: "8px", marginBottom: "12px" }}
              />
            )}
            <h3 style={{ fontSize: "16px", margin: "0 0 8px" }}>{product.name}</h3>
            <p style={{ color: "#FF6B8A", fontWeight: 700, margin: 0 }}>
              ৳{product.price}
            </p>
            <p style={{ fontSize: "12px", color: "#999", marginTop: "8px" }}>
              Category: {product.categories[0]?.name}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}