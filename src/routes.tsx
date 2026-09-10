import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import AIDesigner from "./pages/AIDesigner";
import RoomDesigner from "./pages/RoomDesigner";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import SavedDesigns from "./pages/SavedDesigns";
import Categories from "./pages/Categories";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "categories", Component: Categories },
      { path: "product/:id", Component: ProductDetails },
      { path: "ai-designer", Component: AIDesigner },
      { path: "room-designer", Component: RoomDesigner },
      { path: "wishlist", Component: Wishlist },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "profile", Component: Profile },
      { path: "saved-designs", Component: SavedDesigns },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
]);
