"use client";

import React, { useState } from "react";

interface FandomIpItem {
  id: string;
  name: string;
  enName: string;
  aliases: string;
  agency: string;
  ipType: "GROUP" | "UNIT" | "SOLO";
  parentFandomId?: string;
  parentFandomName?: string;
  rootGroupId?: string;
  regionType: "DOMESTIC" | "GLOBAL";
  genreCategory: "IDOL_GROUP" | "SINGER_SOLO" | "ACTOR" | "SPORTS" | "CREATOR_VTUBER" | "ANIME_GAME";
  primaryColor: string;
  weightMultiplier: number;
  activeSpots: number;
  userCount: number;
  snsInstagram?: string;
  snsYoutube?: string;
  snsTwitter?: string;
  snsCommunity?: string;
}

interface UserFandomRequest {
  requestId: string;
  requestedAt: string;
  userNickname: string;
  fandomName: string;
  artistName: string;
  genreCategory: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const INITIAL_FANDOMS: FandomIpItem[] = [
  {
    id: "FANDOM-04",
    name: "세븐틴 (SEVENTEEN)",
    enName: "SEVENTEEN",
    aliases: "세븐틴, SVT, 17",
    agency: "플레디스 엔터테인먼트",
    ipType: "GROUP",
    regionType: "DOMESTIC",
    genreCategory: "IDOL_GROUP",
    primaryColor: "#a9c4ff",
    weightMultiplier: 1.1,
    activeSpots: 48,
    userCount: 24500,
    snsInstagram: "https://instagram.com/saythename_17",
    snsYoutube: "https://youtube.com/@SEVENTEEN",
    snsTwitter: "https://x.com/pledis_17",
    snsCommunity: "https://weverse.io/seventeen",
  },
  {
    id: "FANDOM-04-U1",
    name: "부석순 (BSS / SEVENTEEN)",
    enName: "BSS",
    aliases: "부석순, BSS, 파이팅해야지",
    agency: "플레디스 엔터테인먼트",
    ipType: "UNIT",
    parentFandomId: "FANDOM-04",
    parentFandomName: "세븐틴",
    rootGroupId: "FANDOM-04",
    regionType: "DOMESTIC",
    genreCategory: "IDOL_GROUP",
    primaryColor: "#ff6b6b",
    weightMultiplier: 1.0,
    activeSpots: 18,
    userCount: 8900,
    snsInstagram: "https://instagram.com/saythename_17",
  },
  {
    id: "FANDOM-04-M1",
    name: "승관 (Seungkwan / BSS)",
    enName: "Seungkwan",
    aliases: "승관, 부승관, Seungkwan",
    agency: "플레디스 엔터테인먼트",
    ipType: "SOLO",
    parentFandomId: "FANDOM-04-U1",
    parentFandomName: "부석순",
    rootGroupId: "FANDOM-04",
    regionType: "DOMESTIC",
    genreCategory: "SINGER_SOLO",
    primaryColor: "#ff8e53",
    weightMultiplier: 1.0,
    activeSpots: 12,
    userCount: 4200,
    snsInstagram: "https://instagram.com/pledis_boos",
  },
  {
    id: "FANDOM-01",
    name: "뉴진스 (NewJeans)",
    enName: "NewJeans",
    aliases: "뉴진스, NJ, 버니즈",
    agency: "어도어",
    ipType: "GROUP",
    regionType: "DOMESTIC",
    genreCategory: "IDOL_GROUP",
    primaryColor: "#2f6bff",
    weightMultiplier: 1.2,
    activeSpots: 52,
    userCount: 31000,
    snsInstagram: "https://instagram.com/newjeans_official",
    snsYoutube: "https://youtube.com/@NewJeans_official",
  },
  {
    id: "FANDOM-ACT-01",
    name: "변우석 (Byeon Woo-seok)",
    enName: "Byeon Woo-seok",
    aliases: "변우석, 선재, 통통이",
    agency: "바로엔터테인먼트",
    ipType: "SOLO",
    regionType: "DOMESTIC",
    genreCategory: "ACTOR",
    primaryColor: "#9c36b5",
    weightMultiplier: 1.1,
    activeSpots: 34,
    userCount: 19800,
    snsInstagram: "https://instagram.com/byeonwooseok",
    snsCommunity: "https://weverse.io/byeonwooseok",
  },
];

const INITIAL_REQUESTS: UserFandomRequest[] = [
  {
    requestId: "REQ-20260724-01",
    requestedAt: "2026-07-24 18:30",
    userNickname: "성수동버니",
    fandomName: "ALL(H)OURS (올아워즈)",
    artistName: "올아워즈",
    genreCategory: "K-POP 아이돌 그룹",
    reason: "성수 팝업 생일카페 성지 등록 필요",
    status: "PENDING",
  },
  {
    requestId: "REQ-20260724-02",
    requestedAt: "2026-07-24 16:15",
    userNickname: "드라마덕후",
    fandomName: "김수현 (Kim Soo-hyun)",
    artistName: "김수현",
    genreCategory: "배우 / 연기",
    reason: "눈물의 여왕 팝업 성지 점령 대결 원함",
    status: "PENDING",
  },
];

// 외부 purity 헬퍼 함수
const generateNewFandomId = () => {
  return `FANDOM-NEW-${Date.now().toString().slice(-4)}`;
};

export default function FandomIpPage() {
  const [fandoms, setFandoms] = useState<FandomIpItem[]>(INITIAL_FANDOMS);
  const [requests, setRequests] = useState<UserFandomRequest[]>(INITIAL_REQUESTS);
  const [selectedFandom, setSelectedFandom] = useState<FandomIpItem | null>(INITIAL_FANDOMS[0]);
  
  // Modals & Drawers
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRequestToolOpen, setIsRequestToolOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for Registration/Edit
  const [formFandom, setFormFandom] = useState<Partial<FandomIpItem>>({
    ipType: "GROUP",
    regionType: "DOMESTIC",
    genreCategory: "IDOL_GROUP",
    primaryColor: "#2F6BFF",
    weightMultiplier: 1.0,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Open Edit Modal with Pre-fill
  const handleOpenEditModal = (fandom?: FandomIpItem) => {
    if (fandom) {
      setFormFandom(fandom);
    } else {
      setFormFandom({
        id: `FANDOM-${String(fandoms.length + 1).padStart(2, "0")}`,
        name: "",
        enName: "",
        aliases: "",
        agency: "",
        ipType: "GROUP",
        regionType: "DOMESTIC",
        genreCategory: "IDOL_GROUP",
        primaryColor: "#2F6BFF",
        weightMultiplier: 1.0,
      });
    }
    setIsEditModalOpen(true);
  };

  // Pre-fill from User Request Queue (ADM-IP-REQUEST-01)
  const handleApproveRequest = (req: UserFandomRequest) => {
    setFormFandom({
      id: generateNewFandomId(),
      name: req.fandomName,
      enName: req.artistName,
      aliases: req.fandomName,
      agency: "자체 입력",
      ipType: "GROUP",
      regionType: "DOMESTIC",
      genreCategory: req.genreCategory.includes("배우") ? "ACTOR" : "IDOL_GROUP",
      primaryColor: "#5C7CFA",
      weightMultiplier: 1.0,
    });
    // Mark request approved
    setRequests(requests.map((r) => r.requestId === req.requestId ? { ...r, status: "APPROVED" } : r));
    setIsRequestToolOpen(false);
    setIsEditModalOpen(true);
    showToast(`'${req.fandomName}' 신청 데이터가 Pre-fill 되었습니다.`);
  };


  const handleSaveFandom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFandom.name) return;

    const newItem: FandomIpItem = {
      id: formFandom.id || `FANDOM-${Date.now()}`,
      name: formFandom.name || "",
      enName: formFandom.enName || "",
      aliases: formFandom.aliases || "",
      agency: formFandom.agency || "",
      ipType: formFandom.ipType || "GROUP",
      parentFandomId: formFandom.parentFandomId,
      parentFandomName: formFandom.parentFandomName,
      rootGroupId: formFandom.rootGroupId,
      regionType: formFandom.regionType || "DOMESTIC",
      genreCategory: formFandom.genreCategory || "IDOL_GROUP",
      primaryColor: formFandom.primaryColor || "#2F6BFF",
      weightMultiplier: Number(formFandom.weightMultiplier) || 1.0,
      activeSpots: formFandom.activeSpots || 0,
      userCount: formFandom.userCount || 1,
      snsInstagram: formFandom.snsInstagram,
      snsYoutube: formFandom.snsYoutube,
      snsTwitter: formFandom.snsTwitter,
      snsCommunity: formFandom.snsCommunity,
    };

    const exists = fandoms.some((f) => f.id === newItem.id);
    if (exists) {
      setFandoms(fandoms.map((f) => (f.id === newItem.id ? newItem : f)));
      showToast(`'${newItem.name}' 팬덤 브랜드 수정이 완료되었습니다.`);
    } else {
      setFandoms([newItem, ...fandoms]);
      showToast(`신규 팬덤 IP '${newItem.name}' (이)가 마스터에 정식 등록되었습니다.`);
    }
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 rounded-lg bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-xl animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header & Main Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>🏷️</span> 팬덤 IP & 브랜드 마스터 관리 <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">v0.2</span>
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            [그룹 ↔ 유닛 ↔ 개인] 3계층 아키텍처 및 2차원 장르 분류, 대표 시그니처 HEX 컬러 및 점령 가중치 설정
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRequestToolOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20"
          >
            <span>📥</span> 유저 신규 팬덤 신청 큐 ({requests.filter((r) => r.status === "PENDING").length})
          </button>
          <button
            onClick={() => handleOpenEditModal()}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg hover:bg-blue-500"
          >
            <span>+</span> IP 신규 등록
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <select className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200">
          <option value="">국가/지역: 전체</option>
          <option value="DOMESTIC">국내 (DOMESTIC)</option>
          <option value="GLOBAL">해외 (GLOBAL)</option>
        </select>
        <select className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200">
          <option value="">장르: 전체</option>
          <option value="IDOL_GROUP">K-POP 아이돌 그룹</option>
          <option value="SINGER_SOLO">가수 / 솔로</option>
          <option value="ACTOR">배우 / 연기</option>
          <option value="SPORTS">스포츠 / E-스포츠</option>
        </select>
        <select className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200">
          <option value="">IP 유형: 전체</option>
          <option value="GROUP">GROUP (단체 그룹)</option>
          <option value="UNIT">UNIT (소그룹 유닛)</option>
          <option value="SOLO">SOLO (개인/멤버/배우)</option>
        </select>
        <input
          type="text"
          placeholder="팬덤명 / 아티스트 / 별칭 검색..."
          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 w-52"
        />
      </div>

      {/* Main Master Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="border-b border-slate-800 bg-slate-950/80 font-semibold text-slate-400">
            <tr>
              <th className="px-4 py-3">IP 유형</th>
              <th className="px-4 py-3">팬덤 IP 명칭 (영문/별칭)</th>
              <th className="px-4 py-3">장르 / 지역</th>
              <th className="px-4 py-3">3계층 상하위 매핑</th>
              <th className="px-4 py-3">시그니처 컬러</th>
              <th className="px-4 py-3">SNS 채널</th>
              <th className="px-4 py-3">가중치</th>
              <th className="px-4 py-3">귀속 유저</th>
              <th className="px-4 py-3">관리 액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {fandoms.map((f) => (
              <tr key={f.id} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3 font-mono">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      f.ipType === "GROUP"
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                        : f.ipType === "UNIT"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    }`}
                  >
                    [{f.ipType}]
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="font-bold text-slate-100">{f.name}</div>
                  <div className="text-[10px] text-slate-400">{f.aliases}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300 mr-1">
                    {f.regionType}
                  </span>
                  <span className="text-slate-400">{f.genreCategory}</span>
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {f.parentFandomName ? (
                    <span className="text-amber-400 font-semibold">
                      ↳ 상위: {f.parentFandomName}
                    </span>
                  ) : (
                    <span className="text-slate-500">최상위 그룹</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-4 w-4 rounded-full border border-slate-600 shadow-sm"
                      style={{ backgroundColor: f.primaryColor }}
                    />
                    <span className="font-mono font-bold uppercase text-slate-200">
                      {f.primaryColor}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-[11px]">
                    {f.snsInstagram && <span title="Instagram">📸</span>}
                    {f.snsYoutube && <span title="YouTube">▶️</span>}
                    {f.snsTwitter && <span title="X">🐤</span>}
                    {f.snsCommunity && <span title="Community">💬</span>}
                  </div>
                </td>
                <td className="px-4 py-3 font-bold text-blue-400">{f.weightMultiplier}x</td>
                <td className="px-4 py-3 font-semibold text-slate-200">
                  {f.userCount.toLocaleString()} 명
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(f)}
                      className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-[11px] font-semibold text-slate-300 hover:bg-slate-700"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFandom(f);
                        setIsDetailDrawerOpen(true);
                      }}
                      className="rounded border border-blue-900/60 bg-blue-950/40 px-2 py-1 text-[11px] font-semibold text-blue-300 hover:bg-blue-900/60"
                    >
                      상세
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* [MODAL] IP Registration & Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🎨</span> 팬덤 IP 브랜드 정보 {formFandom.id ? "수정" : "신규 등록"}
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveFandom} className="mt-4 space-y-4 max-h-[80vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">IP 구분 유형</label>
                  <select
                    value={formFandom.ipType}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormFandom({ ...formFandom, ipType: e.target.value as FandomIpItem["ipType"] })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200"
                  >
                    <option value="GROUP">GROUP (단체 그룹)</option>
                    <option value="UNIT">UNIT (소그룹 유닛)</option>
                    <option value="SOLO">SOLO (개인/멤버/배우)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">직속 상위 IP 연결</label>
                  <select
                    value={formFandom.parentFandomId || ""}
                    onChange={(e) => setFormFandom({ ...formFandom, parentFandomId: e.target.value, parentFandomName: e.target.options[e.target.selectedIndex].text })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200"
                  >
                    <option value="">없음 (최상위 그룹)</option>
                    <option value="FANDOM-04">세븐틴 (SEVENTEEN)</option>
                    <option value="FANDOM-04-U1">부석순 (BSS)</option>
                    <option value="FANDOM-01">뉴진스 (NewJeans)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">팬덤 정식명 (국문)</label>
                  <input
                    type="text"
                    required
                    value={formFandom.name || ""}
                    onChange={(e) => setFormFandom({ ...formFandom, name: e.target.value })}
                    placeholder="예: 뉴진스 (NewJeans)"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">영문 공식명</label>
                  <input
                    type="text"
                    value={formFandom.enName || ""}
                    onChange={(e) => setFormFandom({ ...formFandom, enName: e.target.value })}
                    placeholder="예: NewJeans"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">검색 이명/별칭 (Aliases, 쉼표 구분)</label>
                <input
                  type="text"
                  value={formFandom.aliases || ""}
                  onChange={(e) => setFormFandom({ ...formFandom, aliases: e.target.value })}
                  placeholder="예: 버니즈, NJ, NewJeans, 하니, 민지"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">국가/지역</label>
                  <select
                    value={formFandom.regionType}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormFandom({ ...formFandom, regionType: e.target.value as FandomIpItem["regionType"] })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200"
                  >
                    <option value="DOMESTIC">국내 (DOMESTIC)</option>
                    <option value="GLOBAL">해외 (GLOBAL)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">장르 분류</label>
                  <select
                    value={formFandom.genreCategory}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormFandom({ ...formFandom, genreCategory: e.target.value as FandomIpItem["genreCategory"] })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200"
                  >
                    <option value="IDOL_GROUP">K-POP 아이돌 그룹</option>
                    <option value="SINGER_SOLO">가수 / 솔로</option>
                    <option value="ACTOR">배우 / 연기</option>
                    <option value="SPORTS">스포츠 / E-스포츠</option>
                    <option value="CREATOR_VTUBER">크리에이터 / VTuber</option>
                    <option value="ANIME_GAME">애니 / 캐릭터 / 게임</option>
                  </select>
                </div>
              </div>



              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">시그니처 대표 컬러 (HEX)</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formFandom.primaryColor || "#2F6BFF"}
                      onChange={(e) => setFormFandom({ ...formFandom, primaryColor: e.target.value })}
                      className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={formFandom.primaryColor || "#2F6BFF"}
                      onChange={(e) => setFormFandom({ ...formFandom, primaryColor: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs font-mono text-slate-200 uppercase"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">점령 가중치 배율 (weight_mult)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1.0"
                    max="2.0"
                    value={formFandom.weightMultiplier || 1.0}
                    onChange={(e) => setFormFandom({ ...formFandom, weightMultiplier: parseFloat(e.target.value) })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs font-bold text-blue-400"
                  />
                </div>
              </div>

              {/* SNS Links */}
              <div className="rounded-lg bg-slate-800/60 p-3 space-y-2 border border-slate-700/50">
                <span className="block text-xs font-bold text-slate-300 mb-1">🔗 공식 SNS & 웹사이트 채널</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <input
                    type="url"
                    value={formFandom.snsInstagram || ""}
                    onChange={(e) => setFormFandom({ ...formFandom, snsInstagram: e.target.value })}
                    placeholder="인스타그램 URL"
                    className="rounded border border-slate-700 bg-slate-900 p-1.5 text-slate-200"
                  />
                  <input
                    type="url"
                    value={formFandom.snsYoutube || ""}
                    onChange={(e) => setFormFandom({ ...formFandom, snsYoutube: e.target.value })}
                    placeholder="유튜브 공식 채널 URL"
                    className="rounded border border-slate-700 bg-slate-900 p-1.5 text-slate-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 shadow-md"
                >
                  저장 확정
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* [MODAL] User Fandom Request Queue Tool (ADM-IP-REQUEST-01) */}
      {isRequestToolOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <span>📥</span> 유저 신규 팬덤 신청 전용 수신함 [ADM-IP-REQUEST-01]
              </h3>
              <button onClick={() => setIsRequestToolOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
              {requests.map((req) => (
                <div key={req.requestId} className="rounded-lg border border-slate-700 bg-slate-800/80 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">{req.fandomName}</span>
                    <span className="text-[10px] text-slate-400">{req.requestedAt}</span>
                  </div>
                  <p className="text-xs text-slate-300">신청 유저: <strong>{req.userNickname}</strong> | 장르: {req.genreCategory}</p>
                  <p className="text-xs text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800">{req.reason}</p>
                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-700/50">
                    <button
                      onClick={() => handleApproveRequest(req)}
                      className="rounded bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-500 shadow"
                    >
                      승인 & Pre-fill 자동등록
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* [DRAWER] Fandom Detail Drawer (DRAWER-IP-DETAIL) */}
      {isDetailDrawerOpen && selectedFandom && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l border-slate-700 p-6 text-slate-100 shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
                <span>🔍</span> [DRAWER-IP-DETAIL] 팬덤 상세
              </h3>
              <button onClick={() => setIsDetailDrawerOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="rounded-lg bg-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white">{selectedFandom.name}</span>
                <span className="h-5 w-5 rounded-full border border-slate-600" style={{ backgroundColor: selectedFandom.primaryColor }} />
              </div>
              <p className="text-xs text-slate-400">소속사: {selectedFandom.agency} | IP 구분: [{selectedFandom.ipType}]</p>
              <p className="text-xs text-slate-300">검색 별칭: {selectedFandom.aliases}</p>
            </div>

            <div className="rounded-lg bg-slate-800/60 p-3 space-y-2 text-xs border border-slate-700">
              <span className="font-bold text-slate-300">📊 귀속 현황 통계</span>
              <p className="text-slate-400">점령 중인 성지 수: <strong className="text-emerald-400">{selectedFandom.activeSpots} 곳</strong></p>
              <p className="text-slate-400">메인 선택 귀속 유저: <strong className="text-blue-400">{selectedFandom.userCount.toLocaleString()} 명</strong></p>
              <p className="text-slate-400">현재 점령 가중치: <strong className="text-amber-400">{selectedFandom.weightMultiplier}x</strong></p>
            </div>
          </div>

          <button
            onClick={() => setIsDetailDrawerOpen(false)}
            className="w-full rounded-lg bg-slate-800 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}

