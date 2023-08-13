import React from "react";
import RecipeItem from "./RecipeItem";
import { Grid } from "@mui/material";

interface Props {
  itemList: object[];
}

function RecipeList(props: Props) {
  return (
    <>
      {props.itemList.map((itemLoop) => {
        return <RecipeItem key={itemLoop.id} item={itemLoop} />;
      })}
    </>
  );
}

export default RecipeList;
