import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";
import { useTranslation } from "react-i18next";


const AddToFavoritesButton = ({ product }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <button
      onClick={toggleFavorites}
      className={`text-white py-2 px-4 rounded-lg mt-4 md:mt-0 mr-8 ml-[11rem] font-semibold text-center min-w-[15rem] ${
        isFavorite ? "bg-dark-yellow" : "bg-dark-button-normal"
      }`}
    >
      {isFavorite ? t("Remove from Favorites") : t("Add to Favorites")}
    </button>
  );
};

export default AddToFavoritesButton;
