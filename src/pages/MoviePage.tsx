import React from "react";
import { useParams } from "react-router";

const MoviePage = () => {
  const id = useParams().id;
  return (
     <div>MoviePage {id}</div>
  )
};

export default MoviePage;
