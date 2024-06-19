import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { useTranslation } from "react-i18next";

const Favorites = () => {
  const { t } = useTranslation();
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="ml-[8rem] mt-[5rem]">
      <h1 className="text-2xl font-semibold">{t("Favourite Products")}</h1>

      <div className="flex flex-wrap">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
