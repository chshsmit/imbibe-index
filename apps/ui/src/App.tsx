import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Collections from "./pages/Collections";
import Discover from "./pages/Discover";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Ingredients from "./pages/Ingredients";
import Recipe from "./pages/Recipe";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/collections" Component={Collections} />
          <Route path="/ingredients" Component={Ingredients} />
          <Route path="/favorites" Component={Favorites} />
          <Route path="/discover" Component={Discover} />
          <Route path="/recipe/:recipeId" Component={Recipe} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
