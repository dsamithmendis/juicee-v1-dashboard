import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const expected = process.env.SITE_PASSWORD;

  if (password === expected) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: "site-auth",
      value: "1",
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    return res;
  } else {
    return NextResponse.json(
      { ok: false, message: "Invalid password" },
      { status: 401 }
    );
  }
}
