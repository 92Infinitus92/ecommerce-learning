import { Product } from "@/sanity.types";
import { imageUrl } from "@/sanity/lib/imageUrl";
import Image from "next/image";
import Link from "next/link";

function ProductThub({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock < 1;
  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden dark:bg-gray-800 dark:border-gray-700 ${isOutOfStock ? "opacity-50" : ""}`}
    >
      <div className="relative aspect-square w-full h-full overflow-hidden">
        {product.image && (
          <Image
            src={imageUrl(product.image).url()}
            alt={product.name || "Product Image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transition-all transform duration-300 group-hover:scale-105"
          />
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
        {product.name}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p>
          {product.description
            ?.map((block) =>
              block._type == "block"
                ? block.children?.map((child) => child.text).join("")
                : ""
            )
            .join(" ") || "No Description"}
        </p>
        <p className="mt-2 text-lg font-semibold text-gray-800">
          ${product.price?.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
export default ProductThub;
