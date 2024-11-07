import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import CategorySelectorComponent from "./CategorySelectorComponent";

export default function ProductsView({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <aside className="w-full sm:w-[200px]">
        <CategorySelectorComponent categories={categories} />
      </aside>
      <main className="flex-1">
        <ProductGrid products={products} />
        <hr className="w-1/2 sm:w-3/4 my-8" />
      </main>
    </div>
  );
}
