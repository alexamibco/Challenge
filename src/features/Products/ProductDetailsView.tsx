import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export const ProductDetailsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data: ProductType[] = await response.json();
        const selectedProduct = data.find((prod) => prod.id.toString() === id);
        setProduct(selectedProduct || null);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="h-[75vh] w-full">
      <div className="container flex flex-row mx-auto mt-12 bg-white rounded-3xl">
        <div className="w-1/4 p-8 min-w-72">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="m-10 flex flex-col justify-between gap-y-5">
          <h1 className="text-slate-900 text-3xl font-medium">{product.title}</h1>
          <p className="text-slate-900">Precio: ${product.price}</p>
          <p className="text-slate-900">Categoría: {product.category}</p>
          <p className="text-slate-900">Descripción: {product.description}</p>
          <button className="text-slate-900 self-center mt-5 p-3 rounded-xl bg-purple-300 max-w-32 hover:bg-purple-950 hover:text-white">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};
