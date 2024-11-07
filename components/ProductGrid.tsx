"use client";

import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductThub from "./ProductThub";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
      <AnimatePresence>
        {products?.map((product) => (
          <motion.div
            key={product._id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <ProductThub product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
