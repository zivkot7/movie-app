"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

export const Search = () => {
  const { q } = useParams();
  console.log("q", q);
  const data = useSelector((state) => state.tmdbApi.queries);
  console.log("data", data);
  return <div style={{ color: "white", padding: 100 }}>pagfdsfdsfdse</div>;
};

export default Search;
