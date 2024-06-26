import ErrorMessage from "../../ErrorMessage";
import LoadingSpinner from "../../LoadingSpinner";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import ProductsCarousel from "./ProductsCarousel";
import GameSearch from "./gameSearch/GameSearch";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '_api/products/random/10')
      .then(response => {
        if(!response.ok){setErrorMessage('Error al cargar los productos'); return ;}
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        setErrorMessage('Error al cargar los productos');
    });
  }, []);


  return (
    <div>
      <div class="text-center">
        <h1>Bienvenidos a Master Gaming</h1>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <>
          <GameSearch />
          <ProductsCarousel products={products} />
        </>
      )}
    </div>
  );
}