export default function SupportDevNotice() {
  return (
    <div className="mb-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <p className="font-semibold">
        {"고객지원 기능 개발중"}
      </p>
      <p className="mt-1">
        {
          "현재 고객지원 메뉴는 개발 단계입니다. 부분적으로 임시 UI가 포함될 수 있습니다."
        }
      </p>
    </div>
  );
}
