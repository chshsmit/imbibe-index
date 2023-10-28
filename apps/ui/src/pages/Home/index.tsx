import { useAuth } from "../../hooks/useAuth";


const Home = (): JSX.Element => {

  useAuth();
  return <div>Home</div>;
};

export default Home;