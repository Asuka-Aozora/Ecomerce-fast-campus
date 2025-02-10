import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoCart, IoHeart } from "react-icons/io5";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "@/services/cartService";
import { History } from "lucide-react";

export const Header = () => {
  const userSelector = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cart);

  const handleLogout = () => {
    localStorage.removeItem("current-user");
    dispatch({
      type: "USER_LOGOUT",
    });
  };

  useEffect(() => {
    fetchCart(userSelector.id);
  }, []);

  return (
    <header className="flex justify-between px-8 items-center bg-white h-16">
      {/* BRAND */}
      <p className="text-2xl font-bold hover:cursor-pointer">
        OrganicsCommerce
      </p>
      {/* SEARCH BAR */}
      <Input className="max-w-[600px]" placeholder="Search Products.." />
      {/* BUTTONS */}
      <div className="flex space-x-4 h-5 items-center">
        <div className="flex space-x-2">
          <Link to="/cart">
            <Button variant="ghost">
              <IoCart className="!h-6 !w-6 mr-2" />
              <span className="text-lg font-bold">
                {cartSelector.items.length}
              </span>
            </Button>
          </Link>

          <Link to="/history">
            <Button size="icon" variant="ghost">
              <History className="!h-6 !w-6" />
            </Button>
          </Link>

          <Button size="icon" variant="ghost">
            <IoHeart className="!h-6 !w-6" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-full" />

        <div className="flex space-x-2 items-center">
          {userSelector.id ? (
            <>
              <p>
                Hello, {userSelector.username} ({userSelector.role})
              </p>
              <Button variant="destructive" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button>Log In</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
