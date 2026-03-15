import { query, initDB } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { openid, nickname } = body;
  if (!openid) {
    return Response.json({ error: "openid is required" }, { status: 400 });
  }

  await initDB();

  const name = nickname || "游客";
  const res = await query(
    `INSERT INTO users (openid, nickname) VALUES ($1, $2)
     ON CONFLICT (openid) DO UPDATE SET nickname = COALESCE(NULLIF($2, '游客'), users.nickname), updated_at = NOW()
     RETURNING id, openid, nickname, merit`,
    [openid, name]
  );

  return Response.json(res.rows[0]);
}
