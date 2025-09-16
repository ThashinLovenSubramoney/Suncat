// Flip to true while backend isn’t ready
export const USE_API_STUB = true;

// Simulated endpoints for local testing
export async function postVerifyPortalCode(body) {
  if (!USE_API_STUB) throw new Error("Stub disabled");
  await new Promise(r => setTimeout(r, 600));
  // Accept one hardcoded code for testing
  if ((body?.code || "").toUpperCase() === "SUN-PORTAL-2025") {
    return { ok: true, role: "member", next: "/" };
  }
  return { ok: false, message: "Invalid or expired code." };
}

export async function postBeginRegistration(profile) {
  if (!USE_API_STUB) throw new Error("Stub disabled");
  await new Promise(r => setTimeout(r, 600));
  const params = new URLSearchParams({
    name: profile?.name || "",
    email: profile?.email || "",
    org: profile?.org || "",
    purpose: profile?.purpose || "",
  });
  return { ok: true, registerUrl: `/register?${params.toString()}` };
}

export async function postLogPortalEvent(evt) {
  if (!USE_API_STUB) throw new Error("Stub disabled");
  return { ok: true };
}
