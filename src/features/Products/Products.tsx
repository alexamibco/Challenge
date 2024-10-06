import { useEffect, useState } from "react";
import { Product } from "./Product";
import { Product as ProductType } from "./Product.types";
import { ItemShoppingCard } from "./ItemShoppingCard";
import { useStore } from "../../store/store";

export const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const cart = useStore((state) => state.cart);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center text-slate-900">
            Explore Our Products
          </h1>
          <div className="flex flex-row">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
          <div className="w-1/4 bg-gray-100 p-4 min-w-72">
            <h2 className="text-3xl font-semibold mb-10 text-center text-slate-900">Tu carrito de compras</h2>
            {Object.values(cart).map((item) => (
                <ItemShoppingCard
                  key={item.productName}
                  productName={item.productName}
                  productPrice={item.productPrice * item.quantity}
                />
              ))}
              <div className="text-xl text-slate-900 font-semibold">Total: ${Object.values(cart).reduce((acc, item) => acc + item.productPrice * item.quantity, 0).toFixed(2)}</div>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};
