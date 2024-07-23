import { z } from "zod";

export const Category = z.object({
  name: z
    .string()
    .min(1, "O nome não pode ser vazio!")
    .regex(/^[a-zA-Z\u00C0-\u017F\s]+$/, {
      message: "O nome deve conter apenas letras",
    }),
  description: z.string().optional(),
});

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
  category: Category,
  promotionId: z.string().optional().default(""),
  image: z.string().optional(),
});

export type ProductSchemaType = z.infer<typeof Product>;