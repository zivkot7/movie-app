import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "./FavoriteOption.module.css";

export const FavoriteOption = (option: any) => {
  const favorites = useSelector((state: RootState) =>
    state.movieFilter.favorites.find((fav: Favorite) => fav.id === option.value)
  );

  return (
    <div className={styles.optionContent}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${favorites?.poster_path}`}
        alt={"Movie poster"}
        width={80}
        height={80}
      />
      <span>{option.label}</span>
    </div>
  );
};

export default FavoriteOption;
