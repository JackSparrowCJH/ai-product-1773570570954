import { query, initDB } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { openid, add } = body;
  if (!openid) {
    return Response.json({ error: "openid is required" }, { status: 400 });
  }

  await initDB();

  const increment = Math.max(0, Math.floor(Number(add) || 1));
  const res = await query(
    `UPDATE users SET merit = merit + $1, updated_at = NOW() WHERE openid = $2 RETURNING id, openid, nickname, merit`,
    [increment, openid]
  );

  if (res.rows.length === 0) {
    return Response.json({ error: "user not found" }, { status: 404 });
  }

  return Response.json(res.rows[0]);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const openid = searchParams.get("openid");
  if (!openid) {
    return Response.json({ error: "openid is required" }, { status: 400 });
  }

  await initDB();

  const res = await query(
    `SELECT id, openid, nickname, merit FROM users WHERE openid = $1`,
    [openid]
  );

  if (res.rows.length === 0) {
    return Response.json({ error: "user not found" }, { status: 404 });
  }

  return Response.json(res.rows[0]);
}
