import Razorpay from "razorpay";
import fs from "fs";
import path from "path";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.ROZARPAY_KEY_SECRET!,
});

const ordersFilePath = path.resolve(process.cwd(), "orders.json");

const readData = () => {
  if (fs.existsSync(ordersFilePath)) {
    const data = fs.readFileSync(ordersFilePath, "utf-8");
    return JSON.parse(data);
  }
  return [];
};

const writeData = (data: any) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(data, null, 2));
};


export async function POST(req: Request) {
  try {
    const body = await req.json(); 
    const { amount, currency, receipt, notes } = body;

    const options = {
      amount: amount * 100,
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);

    const orders = readData();
    orders.push({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: "created",
    });
    writeData(orders);

    
    return Response.json(order, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Error creating order" }, { status: 500 });
  }
}
