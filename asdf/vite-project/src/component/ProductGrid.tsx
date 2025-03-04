import { ProductCard } from "./ProductCard";

export const ProductGrid = () => {
  const products = Array(15).fill({
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2dae668ee9e7f00d6bed74a6962703c502c86e4b8ceebcd9dd9472a6679b8f9c",
    title: "청바지 의류 디자인",
  });

  return (
    <section className="flex overflow-hidden flex-wrap gap-20 items-center px-10 pt-10 pb-36 mt-20 text-sm font-bold text-black border border-solid border-stone-400 max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </section>
  );
};
