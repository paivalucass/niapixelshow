import { z } from "zod";
import { Category } from "../DTOs"; // Importando Category

export const Product = z.object({
  name: z.string().nonempty({ message: "O nome não pode ser vazio" }),
  description: z
    .string()
    .nonempty({ message: "A descrição não pode ser vazia" }),
  price: z
    .number()
    .positive({ message: "O preço deve ser um número positivo" }),
  status: z
    .boolean()
    .refine((value) => typeof value === "boolean", {
      message: "O status deve ser verdadeiro ou falso",
    }),
  category: Category, // Utiliza o objeto Category importado
  promotionId: z.string().optional().default(""),
  image: z.string().optional(),
});

export const UpdateProduct = Product.partial();
