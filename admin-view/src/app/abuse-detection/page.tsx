"use client";

import React, { useState } from "react";
import {
  SanctionGrantModal,
  ReviewHoldModal,
  ProfileResetModal,
} from "@/components/modals/SharedModals";

interface IpMonitorRow {
  id: string;
  ipDevice: string;
  deviceInfo: string;
  count: number;
  accounts: string;
  recentActivity: string;
  statusText: string;
  statusBadge: "action" | "observe" | "normal";
}

const IP_MONITOR_DATA: IpMonitorRow[] = [
  {
    id: "USR-ABUSE-01",
    ipDevice: "211.36.132.*",
    deviceInfo: "Galaxy S24 · 동일 기기",
    count: 5,
    accounts: "bunny_01 (뉴진스팬덕)",
    recentActivity: "14:28 · 성동구",
    statusText: "제재 검토 필요",
    statusBadge: "action",
  },
  {
    id: "USR-ABUSE-02",
    ipDevice: "61.84.22.*",
    deviceInfo: "iPhone 15 · 카페 공용망",
    count: 3,
    accounts: "dive_yj (안유진짱)",
    recentActivity: "13:51 · 성동구",
    statusText: "관찰 (공용 IP 추정)",
    statusBadge: "observe",
  },
  {
    id: "USR-ABUSE-03",
    ipDevice: "118.235.7.*",
    deviceInfo: "Pixel 9",
    count: 2,
    accounts: "luv_112",
    recentActivity: "11:02 · 마포구",
    statusText: "정상 범위",
    statusBadge: "normal",
  },
];

export default function AbuseDetectionPage() {
  const [dataList] = useState<IpMonitorRow[]>(IP_MONITOR_DATA);
  const [selectedUser, setSelectedUser] = useState<{ id: string; nickname: string } | null>(null);


  // Modals state
  const [isSanctionModalOpen, setIsSanctionModalOpen] = useState(false);
  const [isHoldModalOpen, setIsHoldModalOpen] = useState(false);
  const [isProfileResetModalOpen, setIsProfileResetModalOpen] = useState(false);
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleOpenSanction = (row: IpMonitorRow) => {
    setSelectedUser({ id: row.id, nickname: row.accounts });
    setIsSanctionModalOpen(true);
  };

  const handleOpenHold = () => {
    setIsHoldModalOpen(true);
  };

  const handleOpenProfileReset = (row: IpMonitorRow) => {
    setSelectedUser({ id: row.id, nickname: row.accounts });
    setIsProfileResetModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 rounded-lg bg-red-600 px-4 py-3 text-xs font-bold text-white shadow-xl animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>🚨</span> 실시간 이상 탐지 모니터링 <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">ADM-ABUSE-01</span>
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            4겹 어뷰징 방어 규칙 엔진 (IP/기기 다계정, GPS 오차, 결제 패턴 이상 핫스팟 실시간 감지)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenHold}
            className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20"
          >
            <span>⏳</span> 이상 핫스팟 전체 수동검수 보류 [MODAL-COMM-02]
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <span className="text-xs font-bold text-slate-400">실시간 위험 핫스팟</span>
          <p className="text-2xl font-black text-red-400 mt-1">2 곳</p>
          <span className="text-[10px] text-slate-500">성동구 성수동 · 마포구 서교동</span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <span className="text-xs font-bold text-slate-400">의심 IP / 기기 수</span>
          <p className="text-2xl font-black text-amber-400 mt-1">5 건</p>
          <span className="text-[10px] text-slate-500">동일 IP 다계정 결제 징후</span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <span className="text-xs font-bold text-slate-400">자동 임시 차단 횟수</span>
          <p className="text-2xl font-black text-blue-400 mt-1">14 회</p>
          <span className="text-[10px] text-slate-500">최근 24시간 누적</span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <span className="text-xs font-bold text-slate-400">평균 위험점수 (Risk Score)</span>
          <p className="text-2xl font-black text-purple-400 mt-1">82 점</p>
          <span className="text-[10px] text-slate-500">75점 이상 즉시 제재 대상</span>
        </div>
      </div>

      {/* Realtime Monitoring Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-xl">
        <div className="border-b border-slate-800 bg-slate-950/80 px-4 py-3 font-bold text-xs text-slate-300 flex justify-between items-center">
          <span>📡 의심 IP & 동일 기기 어뷰징 감지 리스트</span>
          <span className="text-[11px] text-slate-400 font-mono">자동 갱신: 10초 주기</span>
        </div>
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="border-b border-slate-800 bg-slate-900 font-semibold text-slate-400">
            <tr>
              <th className="px-4 py-3">IP / 기기 식별</th>
              <th className="px-4 py-3">기기 환경</th>
              <th className="px-4 py-3">연관 계정 수</th>
              <th className="px-4 py-3">주요 연관 계정</th>
              <th className="px-4 py-3">최근 활동</th>
              <th className="px-4 py-3">진단 상태</th>
              <th className="px-4 py-3">관리 액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {dataList.map((row) => (
              <tr key={row.id} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3 font-mono font-bold text-slate-100">{row.ipDevice}</td>
                <td className="px-4 py-3 text-slate-300">{row.deviceInfo}</td>
                <td className="px-4 py-3 font-bold text-amber-400">{row.count} 개</td>
                <td className="px-4 py-3 text-blue-300 font-semibold">{row.accounts}</td>
                <td className="px-4 py-3 text-slate-400">{row.recentActivity}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      row.statusBadge === "action"
                        ? "bg-red-500/20 text-red-300 border border-red-500/40"
                        : row.statusBadge === "observe"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    }`}
                  >
                    {row.statusText}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleOpenSanction(row)}
                      className="rounded bg-red-600 px-2 py-1 text-[11px] font-bold text-white hover:bg-red-500 shadow"
                    >
                      제재 부여 [COMM-01]
                    </button>
                    <button
                      onClick={() => handleOpenProfileReset(row)}
                      className="rounded border border-purple-800/60 bg-purple-950/40 px-2 py-1 text-[11px] font-bold text-purple-300 hover:bg-purple-900/60"
                    >
                      프로필 초기화 [COMM-04]
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shared Modals Integration */}
      <SanctionGrantModal
        isOpen={isSanctionModalOpen}
        onClose={() => setIsSanctionModalOpen(false)}
        targetUser={selectedUser || undefined}
        onConfirm={(data) => {
          showToast(`유저 '${data?.userId || "대상"}' 에게 ${data?.sanctionLevel || "제재"} 조치가 적용되었습니다.`);
        }}
      />

      <ReviewHoldModal
        isOpen={isHoldModalOpen}
        onClose={() => setIsHoldModalOpen(false)}
        targetItemsCount={5}
        onConfirm={(data) => {
          showToast(`선택된 어뷰징 의심 5건이 수동 검수 보류 큐로 이관되었습니다. (사유: ${data?.reason || "보류"})`);
        }}
      />

      <ProfileResetModal
        isOpen={isProfileResetModalOpen}
        onClose={() => setIsProfileResetModalOpen(false)}
        targetUser={selectedUser || undefined}
        onConfirm={(data) => {
          showToast(`유저 '${data?.newNickname || "프로필"}' 강제 초기화가 완수되었습니다.`);
        }}
      />

    </div>
  );
}
