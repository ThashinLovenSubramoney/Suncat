import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USE_API_STUB, postBeginRegistration, postLogPortalEvent } from "../apiStub";

const seed = [
  { role: "system", text: "I’ll help you get access. I’ll ask a few quick questions." },
];

export default function ChatAssist({ onClose }) {
  const [msgs, setMsgs] = useState(seed);
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState({ name: "", email: "", org: "", purpose: "" });
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const boxRef = useRef(null);
  const navigate = useNavigate();

  const prompts = [
    "What’s your full name?",
    "What’s your email address?",
    "What organisation/company are you with?",
    "In one line, what do you need access to?",
  ];

  useEffect(() => {
    // Ask the first question on mount
    setMsgs((m) => [...m, { role: "assistant", text: prompts[0] }]);
    setStep(0);
  }, []);

  useEffect(() => {
    boxRef.current?.scrollTo(0, 1e9);
  }, [msgs]);

  const askNext = (nextStep) => {
    if (nextStep < prompts.length) {
      setMsgs((m) => [...m, { role: "assistant", text: prompts[nextStep] }]);
    } else {
      submitProfile();
    }
  };

  const handleUser = (text) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);

    const next = { ...profile };
    if (step === 0) next.name = t;
    if (step === 1) next.email = t;
    if (step === 2) next.org = t;
    if (step === 3) next.purpose = t;
    setProfile(next);

    const ns = step + 1;
    setStep(ns);
    setTimeout(() => askNext(ns), 200);
  };

  const submitProfile = async () => {
    setBusy(true);
    setMsgs((m) => [...m, { role: "assistant", text: "Thanks. Checking your access…" }]);

    try {
      // Peephole audit (non-blocking)
      if (USE_API_STUB) {
        await postLogPortalEvent({ type: "chat-intake", status: "begin", email: profile.email });
      } else {
        fetch("/api/logPortalEvent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "chat-intake", status: "begin", email: profile.email }),
        }).catch(() => {});
      }

      // Begin registration (prefill)
      let data;
      if (USE_API_STUB) {
        data = await postBeginRegistration(profile);
      } else {
        const res = await fetch("/api/beginRegistration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile }), // 👈 keep your current pattern
        });
        data = await res.json();
        if (!res.ok) data.ok = false;
      }

      if (data?.ok && data?.registerUrl) {
        setMsgs((m) => [
          ...m,
          { role: "assistant", text: "I’ll guide you to registration now. Your info is prefilled." },
        ]);

        // 🚀 Navigate automatically
        navigate(data.registerUrl);
      } else {
        setMsgs((m) => [
          ...m,
          { role: "assistant", text: data?.message || "Couldn’t begin registration. Try again or contact admin." },
        ]);
      }
    } catch (e) {
      setMsgs((m) => [...m, { role: "assistant", text: "Network error. Try again." }]);
    } finally {
      setBusy(false);
    }
  };

  const send = () => {
    if (!input.trim() || busy) return;
    handleUser(input);
    setInput("");
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-black/85 border-l border-emerald-500/30 text-white z-40 flex flex-col">
      <div className="p-4 flex items-center justify-between border-b border-emerald-500/20">
        <div className="font-semibold">Assistant</div>
        <button className="text-sm px-3 py-1 bg-gray-700 rounded-md" onClick={onClose}>
          Close
        </button>
      </div>

      <div ref={boxRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : ""}>
            <div
              className={
                "inline-block max-w-[85%] px-3 py-2 rounded-lg " +
                (m.role === "user" ? "bg-emerald-700" : "bg-gray-800")
              }
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-emerald-500/20 flex gap-2">
        <input
          className="flex-1 px-3 py-2 rounded-md text-black"
          placeholder={busy ? "Please wait…" : "Type here"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          disabled={busy}
        />
        <button
          className="px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700"
          onClick={send}
          disabled={busy}
        >
          Send
        </button>
      </div>
    </div>
  );
}
