import CocktailGlass from "../../assets/vectors/CocktailGlass";

interface LogoProps {
  onClick?: () => void;
}

const Logo = (props: LogoProps): JSX.Element => (
  <CocktailGlass onClick={props.onClick} width={36} />
);

export default Logo;
