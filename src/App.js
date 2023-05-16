import { useEffect, useState } from "react";
import ProductCard from "./Components/Cards/ProductCard";
import { GridSection } from "./Components/Sections/GridSection";
import ShoppingCart from "./Components/ShoppingCart";
import useDemo from "./Hooks/useDemo";
import { useFetch } from "./Hooks/useFetch";
import useShoppingCart from "./Hooks/useShoppingCart";

function App() {
  const { names } = useDemo("Niklas, Emma, Jacok");
  const { increaseCartQuantity, decreaseCartQuantity, deleteProduct, returnAmount, shoppingCart } = useShoppingCart();

  const url = "https://dummyjson.com/products?limit=8";

  const [total, setTotal] = useState(0);

  const { apiData, loading, error } = useFetch(url, "products");

  useEffect(() => {
    setTotal(shoppingCart.reduce((acc, curr) => acc + curr.price * curr.amount, 0));
  }, [shoppingCart]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div> Error: {error.message}</div>;
  }

  return (
    <>
      <GridSection size="400px">
        {apiData.map((item, i) => (
          <ProductCard key={i} item={item} {...{ increaseCartQuantity, decreaseCartQuantity, returnAmount, deleteProduct }} />
        ))}
      </GridSection>
      Total: dkr. {total}
      <ShoppingCart />
    </>
  );
}

export default App;
