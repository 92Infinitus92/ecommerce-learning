import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";

import { Button } from "@/components/ui/button";
import { imageUrl } from "@/sanity/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { Slug } from "@/sanity.types";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

type SanityImageHotspot = {
  x: number;
  y: number;
  height: number;
  width: number;
};

type SanityImageCrop = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

type PRODUCT_BY_SLUG_QUERYResult = Array<{
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  price?: number;
  description?: Array<{
    _type: "block" | "image";
    [key: string]: any;
  }>;
  categories?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
  }>;
  stock?: number;
}>;

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const products = await getProductBySlug(params.slug);
  if (!products || products.length === 0) {
    return {
      title: "Product Not Found",
    };
  }
  const product = products[0];

  return {
    title: product.name || "Product",
    description: Array.isArray(product.description)
      ? product.description.find((block) => block._type === "block")
          ?.children?.[0]?.text || "Product description"
      : "Product description",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const products = (await getProductBySlug(
    params.slug
  )) as PRODUCT_BY_SLUG_QUERYResult | null;

  if (!products) return notFound();

  const product = products[0];
  if (!product) return notFound();

  const isOutOfStock = product.stock != null && product.stock < 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${
            isOutOfStock ? "opacity-50" : ""
          }`}
        >
          {product.image ? (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name || "Product Image"}
              fill
              className="object-contain transition-all duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">
              {product.price !== undefined
                ? `$${product.price.toFixed(2)}`
                : "Price not available"}
            </div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>
          <Button disabled={isOutOfStock} className="w-full md:w-auto">
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
