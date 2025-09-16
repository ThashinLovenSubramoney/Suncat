import { useState } from "react";
import { USE_API_STUB, postVerifyPortalCode } from "../apiStub";

export default function TokenPanel({ onClose, onSuccess }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async () => {
    setErr("");
    const c = code.trim();
    if (!c) return setErr("Enter your access code.");
    setBusy(true);
    try {
      let data;
      if (USE_API_STUB) {
        // 🔧 Stub path
        data = await postVerifyPortalCode({ code: c });
      } else {
        // 🌐 Real backend path
        const res = await fetch("/api/verifyPortalCode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: c }),
        });
        data = await res.json();
        if (!res.ok) data.ok = false;
      }

      if (!data?.ok) {
        setErr(data?.message || "Invalid or expired code.");
      } else {
        onSuccess?.(data); // e.g. { ok:true, role, email, next }
      }
    } catch (e) {
      setErr("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-40">
      <div className="w-[92vw] max-w-md rounded-2xl bg-black/80 border border-emerald-500/40 p-5 text-white">
        <h2 className="text-xl font-semibold mb-3">Enter Access Code</h2>
        <input
          className="w-full px-3 py-2 rounded-md text-black"
          placeholder="e.g. SUN-97X3-PAHW-2KQF"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          disabled={busy}
        />
        {err && <div className="text-rose-300 text-sm mt-2">{err}</div>}
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-2 rounded-md bg-gray-700" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button className="px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700" onClick={submit} disabled={busy}>
            {busy ? "Verifying…" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
