import { useCallback, useEffect, useState } from "react";

const useShoppingCart = () => {
  // label for localstorage
  const storageLabel = "shoppingcart";

  // Deffiner indkøbskurv ud fra localStorage eller brug tom array, hvis indkøbskurv ikke findes i localStorage
  // Define shopping cart based on localStorage or use an empty array if the cart is not found in localStorage
  const Cart = JSON.parse(localStorage.getItem(storageLabel)) || [];

  // Værdi til at holde shoppingkurv i state, initial state er værdien af localStorage
  // Value to hold shopping cart in state, initial state is the value of localStorage
  const [shoppingCart, setShoppingCart] = useState(Cart);

  // Find et specifikt produkt i indkøbskurven ud fra dets ID
  // Find a specific product in the shopping cart by its ID
  const findProduct = useCallback(
    (id) => {
      const itemObj = shoppingCart.find((item) => item.id === id);
      return itemObj;
    },
    [shoppingCart]
  );

  // Forøg antal eller tilføj produkt til kurven hvis det ikke findes
  // Increase the numbers or add the product to the cart if it does not excist
  const increaseCartQuantity = useCallback(
    (id, price, item, amount) => {
      if (findProduct(id) === undefined) {
        // Hvis produktet ikke findes i indkøbskurven, tilføjes det
        // If the product doesn't exist in the shopping cart, add it

        setShoppingCart((prev) => [...prev, { id, price, item, amount }]);
      } else {
        // Hvis produktet allerede findes i indkøbskurven, øges mængden med 1
        // If the product already exists in the shopping cart, increase the quantity by 1
        setShoppingCart((prev) =>
          prev.map((item) => {
            if (item.id === id) {
              // Hvis produktets ID allerede eksisterer i indkøbskurven,
              // øges mængden af det pågældende produkt med 1
              // If the product's ID already exists in the shopping cart,
              // increase the quantity of that product by 1

              console.log("...item ", { ...item });

              return {
                ...item, // Bruger spread-operatoren (...) til at oprette en ny objekt-literal, der kopierer alle nøglerne og værdierne fra det oprindelige 'item'-objekt.
                // Using the spread operator (...) to create a new object literal that copies all the keys and values from the original 'item' object.
                amount: item.amount + 1, // Opdaterer værdien af 'amount'-nøglen ved at øge den eksisterende værdi med 1.
                // Updating the value of the 'amount' key by incrementing the existing value by 1.
              };
            } else {
              return { ...item }; // Bruger spread-operatoren (...) til at oprette en ny objekt-literal, der kopierer alle nøglerne og værdierne fra det oprindelige 'item'-objekt.
              // Using the spread operator (...) to create a new object literal that copies all the keys and values from the original 'item' object.
            }
          })
        );
      }
    },
    [findProduct]
  );
  // Decrease the quantity or remove the product from the cart if it reaches 1
  // Formindsk antallet eller fjern produktet fra kurven, hvis det når 1
  const decreaseCartQuantity = useCallback(
    (id) => {
      if (findProduct(id)?.amount === 1) {
        // If the product's quantity is 1, remove it from the cart
        // Hvis produktets antal er 1, fjernes det fra kurven
        setShoppingCart((prev) => prev.filter((item) => item.id !== id));
      } else {
        setShoppingCart((prev) =>
          prev.map((item) => {
            if (item.id === id) {
              // Decrease the quantity of the specific product by 1
              // Formindsk mængden af det specifikke produkt med 1
              return {
                ...item,
                amount: item.amount - 1,
              };
            } else {
              return { ...item };
            }
          })
        );
      }
    },
    [findProduct]
  );

  // Delete a product from the cart
  // Slet et produkt fra kurven
  const deleteProduct = (id) => {
    setShoppingCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Empty the cart
  // Tøm kurven
  const emptyCart = () => {
    setShoppingCart([]);
  };

  // Return the quantity of a specific product
  // Returner mængden af et specifikt produkt
  const returnAmount = (id) => {
    const itemAmount = findProduct(id)?.amount;
    return itemAmount;
  };

  useEffect(() => {
    // Update the localStorage when the shoppingCart state changes
    // Opdater localStorage, når shoppingCart state ændres
    localStorage.setItem(storageLabel, JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  return { increaseCartQuantity, decreaseCartQuantity, returnAmount, emptyCart, deleteProduct, shoppingCart };
};

export default useShoppingCart;