"use client";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Sidebar } from "./Sidebar";
import { ProductGrid } from "./ProductGrid";
import { Footer } from "./Footer";

export const InputDesign = () => {
  return (
    <main className="flex overflow-hidden flex-col pt-4 pb-8 bg-white">
      <Header />
      <Navigation />

      <div className="flex flex-col mt-12 ml-8 w-full max-w-[1241px] max-md:mt-10 max-md:max-w-full">
        <div className="self-center w-full max-w-[998px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <Sidebar />
            <section className="ml-5 w-[67%] max-md:ml-0 max-md:w-full">
              <div className="w-full max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-col justify-center items-end px-20 py-5 bg-white border-4 border-blue-200 border-solid rounded-[50px] max-md:px-5 max-md:mr-2 max-md:max-w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e52614271bdc2c304e7fc77ab5a5bd7c7178a1482a278a785c0006799089514"
                    className="object-contain w-6 aspect-[1.26]"
                    alt="Search"
                  />
                </div>
                <ProductGrid />
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default InputDesign;
