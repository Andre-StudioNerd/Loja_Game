import Logo from "../../assets/logo_game.png";
import Cart from "../../assets/cart.png";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div
      data-testid="header"
      className="flex justify-between items-center p-4 w-full bg-black
			 px-20 fixed top-0 left-0 right-0 z-50"
    >
      <div>
        <img
          src={Logo}
          alt="logo"
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => navigate("/cart")}
          className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full hover:bg-yellow-400 transition-colors"
        >
          <img src={Cart} alt="cart" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Header;
