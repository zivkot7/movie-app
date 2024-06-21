import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "./FavoriteOption.module.css";
import { selectFavoriteById } from "movie-app/app/lib/selectors";

export const FavoriteOption = (option: any) => {
  const favoriteSelector = selectFavoriteById(option.value);
  const favorite = useSelector(favoriteSelector);

  return (
    <div className={styles.optionContent}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${favorite?.poster_path}`}
        alt={"Movie poster"}
        width={80}
        height={80}
      />
      <span>{option.label}</span>
    </div>
  );
};

export default FavoriteOption;
