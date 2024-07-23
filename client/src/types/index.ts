import { Product, Category, ProductSchemaType } from "./ProductTypes";
import {
  userSchema,
  UserSchema,
  UseUserReturn,
  UpdateUserSchema,
  UpdateUserSchemaType,
  userSchemaWithPassword,
  userSchemaWithoutPassword,
  UpdateUserWithoutPasswordSchemaType,
  UpdateUserWithPasswordSchemaType,
} from "./UserTypes";
import { forgotPasswordSchema } from "./ForgotPasswordTypes";
import { loginSchema } from "./AuthTypes";
import {
  promotionSchema,
  PromotionSchema,
  UsePromotionReturn,
  UpdatePromotion,
} from "./PromotionTypes";

import { Order, UseOrderInterface } from "./OrderTypes";

export {
  Product,
  Category,
  userSchema,
  forgotPasswordSchema,
  loginSchema,
  UpdateUserSchema,
  userSchemaWithPassword,
  userSchemaWithoutPassword,
  promotionSchema,
  UpdatePromotion,
};

export type {
  UserSchema,
  UseUserReturn,
  PromotionSchema,
  UsePromotionReturn,
  ProductSchemaType,
  Order,
  UseOrderInterface,
  UpdateUserSchemaType,
  UpdateUserWithoutPasswordSchemaType,
  UpdateUserWithPasswordSchemaType,
};
