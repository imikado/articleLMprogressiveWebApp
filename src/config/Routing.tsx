import { Routes, Route } from "react-router-dom";
import Recipes from "../pages/authenticated/Recipes";
import Register from "../pages/notAutgenticated/Register";
import Login from "../pages/notAutgenticated/Login";
import AddRecipe from "../pages/authenticated/AddRecipe";

interface routingProps {
  token: String | null;
  setToken: Function;
}

export default function Routing(props: routingProps) {
  return (
    <Routes>
      {props.token ? (
        <>
          <Route path="/add" element={<AddRecipe />} />
          <Route path="*" element={<Recipes />} />
        </>
      ) : (
        <>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login setToken={props.setToken} />} />
        </>
      )}
    </Routes>
  );
}
