import { ProductCardProps } from "../../../types";

export const ProductCard = ({ imageUrl, title }: ProductCardProps) => {
  return (
    <article className="grow shrink self-stretch pb-6 my-auto w-[102px]">
      <img
        loading="lazy"
        src={imageUrl}
        alt={title}
        className="object-contain w-32 aspect-[1.23]"
      />
      <h3 className="mt-2 text-sm font-bold text-black">
        {title}
        <br />
        #청바지 #스키니진 #와이드진
      </h3>
    </article>
  );
};
