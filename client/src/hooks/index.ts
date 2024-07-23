import useUser from "./useUser";
import useAuth, { AuthProvider } from "./useAuth";
import useProduct, { Product } from "./useProduct";
import useCart, { CartItem, UseCartInterface } from "./useCart";
import useCategories from "./useCategories";
import useOrder from "./useOrder";
import usePromotion from "./usePromotion";

export {
  useUser,
  useAuth,
  AuthProvider,
  useProduct,
  useCart,
  useOrder,
  useCategories,
  usePromotion
};

export type { CartItem, UseCartInterface, Product };
