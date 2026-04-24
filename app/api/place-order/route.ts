import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {formData} = await req.body
    console.log(formData)

  } catch (error) {}
}
