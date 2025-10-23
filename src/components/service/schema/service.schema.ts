
import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(3, { message: 'title is required' }),
  description: z.string().min(6, { message: 'description is required' }),
  price: z.number().min(1,{ message: 'Enter Valid Price' }),
  time: z.number().min(1,{message:"Time feild cannot Empty"}),
  discount: z.number().optional(),
 category: z.enum(["Male", "Female",""]),
  imageUrl:z.string().optional()
});


type ServiceData = z.infer<typeof serviceSchema>;
