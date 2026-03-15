import { query, initDB } from "@/lib/db";

const DEFAULT_SHARE_TITLE = "我在敲木鱼积攒功德，快来试试吧！";
const DEFAULT_SHARE_DESC = "敲木鱼解压神器，越敲越快乐~";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const openid = searchParams.get("openid");

  await initDB();

  // Guest mode: no openid or user not found
  if (!openid) {
    return Response.json({
      title: DEFAULT_SHARE_TITLE,
      desc: DEFAULT_SHARE_DESC,
      nickname: "游客",
      merit: 0,
      is_guest: true,
    });
  }

  const res = await query(
    `SELECT nickname, merit FROM users WHERE openid = $1`,
    [openid]
  );

  if (res.rows.length === 0) {
    return Response.json({
      title: DEFAULT_SHARE_TITLE,
      desc: DEFAULT_SHARE_DESC,
      nickname: "游客",
      merit: 0,
      is_guest: true,
    });
  }

  const { nickname, merit } = res.rows[0];

  return Response.json({
    title: `${nickname}已积攒${merit}功德，邀你一起敲木鱼！`,
    desc: `${nickname}的功德：${merit}`,
    nickname,
    merit: Number(merit),
    is_guest: false,
  });
}
