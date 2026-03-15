import { query, initDB } from "@/lib/db";

const DEFAULT_SHARE_TITLE = "我在敲木鱼积攒功德，快来试试吧！";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const openid = searchParams.get("openid");

  await initDB();

  if (!openid) {
    return Response.json({
      card: {
        nickname: "游客",
        merit: 0,
        title: DEFAULT_SHARE_TITLE,
        is_guest: true,
      },
    });
  }

  const res = await query(
    `SELECT nickname, merit FROM users WHERE openid = $1`,
    [openid]
  );

  if (res.rows.length === 0) {
    return Response.json({
      card: {
        nickname: "游客",
        merit: 0,
        title: DEFAULT_SHARE_TITLE,
        is_guest: true,
      },
    });
  }

  const { nickname, merit } = res.rows[0];

  return Response.json({
    card: {
      nickname,
      merit: Number(merit),
      title: `${nickname}已积攒${merit}功德，邀你一起敲木鱼！`,
      is_guest: false,
    },
  });
}
