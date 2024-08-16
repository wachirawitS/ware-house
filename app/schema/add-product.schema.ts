import { z } from "zod";

export const addProductSchema = z.object({
  productName: z.string().min(1, { message: "กรุณากรอกชื่อสินค้า" }),
  productNo: z.string().min(1, { message: "กรุณากรอกรหัสสินค้า" }),
  qty: z.coerce.number().optional(),
  description: z.string().optional(),
});

export type TAddProduct = z.infer<typeof addProductSchema>;
