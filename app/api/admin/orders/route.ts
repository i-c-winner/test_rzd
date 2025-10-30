import {NextRequest, NextResponse} from "next/server";
import fs from "fs";
import path from "path";

type Order = {
  "id": string,
  "route": string,
  "date": string,
  "passenger": string,
  "amount": number,
  "status": "PENDING" | "PAID" | "CANCELED"
}

export async function GET(req: NextRequest) {

  try {
    const filePath = path.join(process.cwd(), "data", "mock-orders.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const orders = JSON.parse(data);
    const status = req.nextUrl.searchParams.get("status");
    const result = status ? orders.filter((order: Order) => order.status === status) : orders;
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({
      error: "Failed to fetch orders",
      status: 500,
    })

  }
}


