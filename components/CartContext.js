import React, { createContext, useState, useContext, useEffect } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, getFirestore, collection } from 'firebase/firestore';
import { FIREBASE_DB as db } from '../firebaseConfig';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children, userId }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchCartAndFavorites = async () => {
      const cartRef = doc(db, 'cart', userId);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        setFavorites(cartData.favorites || []);

        // Fetch item details for each item ID in the cart
        const itemsDetails = await Promise.all(
          (cartData.items || []).map(async itemId => {
            const itemRef = doc(db, 'vegetables', itemId);
            const itemSnap = await getDoc(itemRef);
            return itemSnap.exists() ? { id: itemSnap.id, ...itemSnap.data() } : null;
          })
        );

        setCart(itemsDetails.filter(item => item !== null));
      }
    };

    fetchCartAndFavorites();
  }, [userId]);

  const addToCart = async (item) => {
    const vegRef = doc(db, 'vegetables', itemId);
    const vegDoc = await getDoc(vegRef);
    if (!vegDoc.exists()) {
      console.error("Vegetable does not exist!");
      return;
    }
    const currentStock = vegDoc.data().stock;

    // Check if stock is sufficient
    if (currentStock <= 0) {
      console.error("Not enough stock available");
      return;
    }

    // Update the stock in the vegetables collection
    await updateDoc(vegRef, { stock: currentStock - 1 });

    // Add the item to the user's cart
    const userCartRef = doc(db, 'cart', userId);
    const userCartDoc = await getDoc(userCartRef);
    if (!userCartDoc.exists()) {
      // Optionally handle creating a new cart document if it doesn't exist
      console.error("User's cart does not exist!");
      return;
    }

    await updateDoc(userCartRef, {
      items: arrayUnion(itemId)
    });
    // Optionally, update local state here to reflect the change



    // Optionally update local state if you're tracking cart items there
    setCart(currentCart => [...currentCart, item]); // This would need adjustment to work with just IDs
  };

  const removeFromCart = async (itemId) => {
    const vegRef = doc(db, 'vegetables', itemId);
    const vegDoc = await getDoc(vegRef);
    if (!vegDoc.exists()) {
        console.error("Vegetable does not exist!");
        return;
    }
    const currentStock = vegDoc.data().stock;

    // Update the stock in the vegetables collection
    await updateDoc(vegRef, { stock: currentStock + 1 });

    // Remove the item from the user's cart
    const userCartRef = doc(db, 'cart', userId);
    await updateDoc(userCartRef, {
        items: arrayRemove(itemId)
    });
    setCart(currentCart => currentCart.filter(item => item.id !== itemId));
  };

  const toggleFavorite = async (itemId) => {
    const userCartRef = doc(db, 'cart', userId);
    if (favorites.includes(itemId)) {
      await updateDoc(userCartRef, {
        favorites: arrayRemove(itemId)
      });
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      await updateDoc(userCartRef, {
        favorites: arrayUnion(itemId)
      });
      setFavorites([...favorites, itemId]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, favorites, toggleFavorite }}>
      {children}
    </CartContext.Provider>
  );
};
