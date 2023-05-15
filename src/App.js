import ProductCard from "./Components/Cards/ProductCard";
import { GridSection } from "./Components/Sections/GridSection";
import { useFetch } from "./Hooks/fetch";

function App() {
  const url = "https://dummyjson.com/products";

  const { apiData, loading, error } = useFetch(url, "products");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div> Error: {error.message}</div>;
  }

  return (
    <>
      <GridSection size="300px">
        {apiData.map((item, i) => (
          <ProductCard key={i} item={item} />
        ))}
      </GridSection>
    </>
  );
}

export default App;
