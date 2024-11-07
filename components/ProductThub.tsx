import { Product } from "@/sanity.types";
import Link from "next/link";

function ProductThub({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock < 1;
  console.log(product);
  return (
    <Link
      href={`/products/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden dark:bg-gray-800 dark:border-gray-700 ${isOutOfStock ? "opacity-50" : ""}`}
    >
      <div>
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
        {product.name}
      </div>
    </Link>
  );
}
export default ProductThub;
