import RecipeItem from "./RecipeItem";

interface Props {
  itemList: Item[];
}

interface Item {
  id: number;
  title: string;
  ingredients: string;
  method: string;
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
