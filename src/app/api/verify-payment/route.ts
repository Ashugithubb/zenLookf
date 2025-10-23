import Razorpay from "razorpay";
import fs from "fs";
import path from "path";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

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
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
        const payload = razorpay_order_id + "|" + razorpay_payment_id;

        const isValidSignature = validateWebhookSignature(
            payload,
            razorpay_signature,
            process.env.ROZARPAY_KEY_SECRET!
        );

        if (!isValidSignature) {
            console.log("Payment verification failed");
            return Response.json(
                { status: "verification_failed" },
                { status: 400 }
            );
        }

        const orders = readData();
        const order = orders.find((o: any) => o.order_id === razorpay_order_id);

        if (order) {
            order.status = "paid";
            order.payment_id = razorpay_payment_id;
            writeData(orders);
        }

        console.log("Payment verification successful");
        return Response.json({ status: "ok" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return Response.json(
            { status: "error", message: "Error verifying payment" },
            { status: 500 }
        );
    }
}
