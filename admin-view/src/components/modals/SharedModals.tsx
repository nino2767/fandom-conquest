'use client';

import React, { useState } from 'react';

// 외부 purity 헬퍼 함수
const generateTempNickname = () => {
  const adjectives = ['행복한', '즐거운', '열정적인', '다정한', '용감한', '빛나는'];
  const nouns = ['덕후', '버니', '캐럿', '마이', '다이브', '블링크'];
  const num = Math.floor(100 + Math.random() * 900);
  const adj = adjectives[num % adjectives.length];
  const noun = nouns[num % nouns.length];
  return `${adj}${noun}${num}`;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (data?: Record<string, unknown>) => void;
  targetUser?: {
    id: string;
    nickname: string;
    status?: string;
  };
  targetItemsCount?: number;
}


/**
 * [MODAL-COMM-01] 제재 부여 & 기여분 몰수 모달
 */
export const SanctionGrantModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  targetUser,
}) => {
  const [sanctionLevel, setSanctionLevel] = useState<'WARNING' | 'SUSPENDED' | 'BANNED'>('SUSPENDED');
  const [suspendDays, setSuspendDays] = useState('7');
  const [reasonCategory, setReasonCategory] = useState('영수증 위조/도용');
  const [forfeitScore, setForfeitScore] = useState(true);
  const [memo, setMemo] = useState('');

  if (!isOpen || !targetUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm({
        userId: targetUser.id,
        sanctionLevel,
        suspendDays: sanctionLevel === 'SUSPENDED' ? suspendDays : 0,
        reasonCategory,
        forfeitScore,
        memo,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
            <span>🛡️</span> [MODAL-COMM-01] 제재 부여 & 몰수 처리
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="rounded-lg bg-slate-800/60 p-3 text-sm border border-slate-700/50">
            <p><span className="text-slate-400">대상 유저:</span> <strong className="text-blue-400">{targetUser.nickname}</strong> ({targetUser.id})</p>
            <p className="text-xs text-slate-400 mt-1">현재 상태: {targetUser.status || '정상'}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">제재 수위 선택</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSanctionLevel('WARNING')}
                className={`p-2.5 rounded-lg text-xs font-bold border transition ${
                  sanctionLevel === 'WARNING'
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                    : 'border-slate-700 bg-slate-800 text-slate-400'
                }`}
              >
                1차 경고
              </button>
              <button
                type="button"
                onClick={() => setSanctionLevel('SUSPENDED')}
                className={`p-2.5 rounded-lg text-xs font-bold border transition ${
                  sanctionLevel === 'SUSPENDED'
                    ? 'border-orange-500 bg-orange-500/20 text-orange-300'
                    : 'border-slate-700 bg-slate-800 text-slate-400'
                }`}
              >
                2차 임시정지
              </button>
              <button
                type="button"
                onClick={() => setSanctionLevel('BANNED')}
                className={`p-2.5 rounded-lg text-xs font-bold border transition ${
                  sanctionLevel === 'BANNED'
                    ? 'border-red-500 bg-red-500/20 text-red-300'
                    : 'border-slate-700 bg-slate-800 text-slate-400'
                }`}
              >
                3차 영구정지
              </button>
            </div>
          </div>

          {sanctionLevel === 'SUSPENDED' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">정지 기간</label>
              <select
                value={suspendDays}
                onChange={(e) => setSuspendDays(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200"
              >
                <option value="7">7일 (1주일)</option>
                <option value="14">14일 (2주일)</option>
                <option value="30">30일 (1개월)</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">제재 사유 카테고리</label>
            <select
              value={reasonCategory}
              onChange={(e) => setReasonCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200"
            >
              <option value="영수증 위조/도용">영수증 위조 및 다중 도용</option>
              <option value="GPS 위치 조작">GPS 위치 조작 어뷰징</option>
              <option value="명의/계정 다중 사용">다계정 동시 생성 어뷰징</option>
              <option value="기타 어뷰징">기타 타 유저 피해 행위</option>
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-red-950/30 p-3 border border-red-900/40">
            <input
              type="checkbox"
              id="forfeitCheck"
              checked={forfeitScore}
              onChange={(e) => setForfeitScore(e.target.checked)}
              className="rounded border-slate-700 text-red-500 focus:ring-0"
            />
            <label htmlFor="forfeitCheck" className="text-xs text-red-200 font-medium">
              어뷰징 건 기여 점수 회수 및 해당 성지 랭킹 점수 롤백
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">운영자 상세 처리 메모</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="제재 사유 및 근거 데이터를 입력하세요 (최대 1,000자)"
              className="w-full h-20 rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500 shadow-md"
            >
              제재 부여 확정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


/**
 * [MODAL-COMM-02] 수동 검수 보류 확정 모달
 */
export const ReviewHoldModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  targetItemsCount = 1,
}) => {
  const [reason, setReason] = useState('동일 IP 다계정 결제 징후');
  const [suspendScore, setSuspendScore] = useState(true);
  const [memo, setMemo] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm({ reason, suspendScore, memo });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
            <span>⏳</span> [MODAL-COMM-02] 수동 검수 보류 이관
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="rounded-lg bg-amber-950/20 p-3 text-xs text-amber-300 border border-amber-800/40">
            선택된 <strong>{targetItemsCount}건</strong>의 영수증 인증 건을 수동 심사 큐(`ADM-SANCTION-02`)로 보류 이관합니다.
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">보류 사유</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200"
            >
              <option value="동일 IP 다계정 결제 징후">동일 IP 다계정 결제 징후</option>
              <option value="GPS 위치 오차 과다">GPS 위치 오차 과다</option>
              <option value="영수증 승인번호 패턴 유사">영수증 승인번호 패턴 유사</option>
              <option value="기타 추가 정밀 심사">기타 추가 정밀 심사 필요</option>
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-800 p-3 border border-slate-700">
            <input
              type="checkbox"
              id="suspendScoreCheck"
              checked={suspendScore}
              onChange={(e) => setSuspendScore(e.target.checked)}
              className="rounded border-slate-700 text-amber-500 focus:ring-0"
            />
            <label htmlFor="suspendScoreCheck" className="text-xs text-slate-200 font-medium">
              검수 완료 전까지 해당 건들의 점유율/랭킹 점수 반영 일시 유예
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">운영자 메모</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="심사 큐 담당 전달 사항 입력 (최대 500자)"
              className="w-full h-16 rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-500 shadow-md"
            >
              보류 이관 확정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


/**
 * [MODAL-COMM-03] PII 마스킹 해제 사유 입력 모달
 */
export const PiiUnmaskModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  targetUser,
}) => {
  const [reason, setReason] = useState('유저 CS 1:1 응대');
  const [detailMemo, setDetailMemo] = useState('');

  if (!isOpen || !targetUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm({ reason, detailMemo });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <span>🔍</span> [MODAL-COMM-03] PII 마스킹 해제
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="rounded-lg bg-blue-950/30 p-3 text-xs text-blue-300 border border-blue-900/40">
            <strong>{targetUser.nickname}</strong> 님의 개인정보(이름, 이메일, 전화번호) 마스킹을 해제합니다. 조치 사유는 Audit Log에 자동 조율 저장됩니다.
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">열람 사유</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200"
            >
              <option value="유저 CS 1:1 응대">유저 CS 1:1 문의 대응</option>
              <option value="어뷰징 및 도용 여부 심사">어뷰징 및 도용 여부 심사</option>
              <option value="소명 서류 검수">인앱 소명 서류 검수</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">상세 열람 목적</label>
            <input
              type="text"
              value={detailMemo}
              onChange={(e) => setDetailMemo(e.target.value)}
              placeholder="상세 사유 입력 (최대 200자)"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 shadow-md"
            >
              마스킹 해제 확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


/**
 * [MODAL-COMM-04] 프로필 강제 초기화 모달
 */
export const ProfileResetModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  targetUser,
}) => {
  const [resetNickname, setResetNickname] = useState(true);
  const [resetAvatar, setResetAvatar] = useState(true);
  const [tempNick] = useState(generateTempNickname());

  if (!isOpen || !targetUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm({
        resetNickname,
        resetAvatar,
        newNickname: resetNickname ? tempNick : targetUser.nickname,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
            <span>✨</span> [MODAL-COMM-04] 프로필 강제 초기화
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="rounded-lg bg-slate-800 p-3 text-xs text-slate-300">
            현재 닉네임: <strong className="text-red-400">{targetUser.nickname}</strong>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">초기화 범위 선택</label>
            <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 p-2.5 border border-slate-700">
              <input
                type="checkbox"
                id="nickCheck"
                checked={resetNickname}
                onChange={(e) => setResetNickname(e.target.checked)}
                className="rounded border-slate-700 text-purple-500 focus:ring-0"
              />
              <label htmlFor="nickCheck" className="text-xs text-slate-200">
                닉네임 초기화 ➔ 친근한 랜덤 닉네임 (<strong className="text-purple-300">{tempNick}</strong>)
              </label>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 p-2.5 border border-slate-700">
              <input
                type="checkbox"
                id="avatarCheck"
                checked={resetAvatar}
                onChange={(e) => setResetAvatar(e.target.checked)}
                className="rounded border-slate-700 text-purple-500 focus:ring-0"
              />
              <label htmlFor="avatarCheck" className="text-xs text-slate-200">
                프로필 이미지 초기화 (서비스 기본 캐릭터)
              </label>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            * 강제 초기화 시 유저에게 프로필 변경 인앱 알림이 즉시 발송됩니다.
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-500 shadow-md"
            >
              프로필 초기화 확정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
