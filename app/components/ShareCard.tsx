"use client";

import { useState } from "react";

interface CardData {
  nickname: string;
  merit: number;
  title: string;
  is_guest: boolean;
}

export default function ShareCard() {
  const [openid, setOpenid] = useState("");
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCard = async (id?: string) => {
    setLoading(true);
    const url = id ? `/api/share/card?openid=${encodeURIComponent(id)}` : `/api/share/card`;
    const res = await fetch(url);
    const data = await res.json();
    setCard(data.card);
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="输入 openid（留空为游客）"
          value={openid}
          onChange={(e) => setOpenid(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", width: 240, marginRight: 8 }}
        />
        <button
          onClick={() => fetchCard(openid || undefined)}
          style={{ padding: "8px 16px", borderRadius: 6, background: "#d4a017", color: "#fff", border: "none", cursor: "pointer" }}
        >
          生成分享卡片
        </button>
      </div>

      {loading && <p>加载中...</p>}

      {card && !loading && (
        <div style={{ background: "#fff", borderRadius: 12, padding: "24px 32px", boxShadow: "0 2px 12px rgba(0,0,0,0.1)", display: "inline-block", minWidth: 280 }}>
          <div style={{ fontSize: "3rem", marginBottom: 8 }}>🪵</div>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: 4 }}>{card.nickname}</div>
          <div style={{ fontSize: "1.5rem", color: "#d4a017", marginBottom: 8 }}>功德：{card.merit}</div>
          <div style={{ fontSize: "0.9rem", color: "#888" }}>{card.title}</div>
          {card.is_guest && <div style={{ marginTop: 8, fontSize: "0.8rem", color: "#aaa" }}>（游客模式）</div>}
        </div>
      )}
    </div>
  );
}
