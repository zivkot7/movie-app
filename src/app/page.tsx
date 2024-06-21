"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./style.module.css";
import backgroundImage from "../assets/images/background-image.jpg";
import { Button } from "movie-app/components/Button";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setMovieType } from "./lib/movieFilter";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const goToDiscoverPage = () => {
    router.push("/movie-discover");
    dispatch(setMovieType({}));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.backgroundContainer}>
        <Image
          src={backgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className={styles.backgroundImage}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>
          Your guide for streaming movies, TV
          <br />
          series, and sports
        </h1>
        <p className={styles.subtitle}>
          With MovieApp, find where to stream new, popular, and ongoing content.
        </p>
        <Button variant="primary" onClick={goToDiscoverPage}>
          Discover Movies
        </Button>
      </div>
    </div>
  );
};

export default Home;
