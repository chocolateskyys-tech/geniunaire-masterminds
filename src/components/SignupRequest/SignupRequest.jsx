import { useState } from "react";

export default function SignupRequest({
  requestedAccess = "General Admiration Funnel Access",
  onAccessGranted,
  onReturn,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budgetRange: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function updateField(field, value) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const leadRecord = {
      ...formData,
      requestedAccess,
      submittedAt: new Date().toISOString(),
      status: "lead-access-granted",
    };

    localStorage.setItem("gm_latest_lead_request", JSON.stringify(leadRecord));
    localStorage.setItem("gm_access_role", "lead");
    localStorage.setItem("gm_entry_status", "lead-request-submitted");

    setSubmitted(true);

    if (typeof onAccessGranted === "function") {
      onAccessGranted();
    }
  }

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white">
      <section className="mx-auto max-w-3xl rounded-3xl border border-purple-900 bg-purple-950/20 p-6 shadow-2xl shadow-purple-950/40">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-purple-300">
          Admiration Mine Integrator
        </p>

        <h1 className="text-4xl font-black md:text-6xl">
          Enter Your Build Info
        </h1>

        <p className="mt-4 text-slate-300">
          You are requesting:{" "}
          <span className="font-bold text-purple-200">{requestedAccess}</span>
        </p>

        <p className="mt-3 text-slate-400">
          Fill this out so the Mine knows what kind of material you are bringing
          in. After submitting, you will be moved into the next available access
          path.
        </p>

        {submitted && (
          <div className="mt-6 rounded-2xl border border-emerald-500 bg-emerald-950/30 p-4 text-emerald-200">
            Request saved. Access granted.
          </div>
        )}

        <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-300">Name</span>
            <input
              required
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="rounded-xl border border-purple-900 bg-black px-4 py-3 text-white outline-none focus:border-purple-400"
              placeholder="Your name"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-300">Email</span>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="rounded-xl border border-purple-900 bg-black px-4 py-3 text-white outline-none focus:border-purple-400"
              placeholder="you@email.com"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-300">
              What are you trying to build?
            </span>
            <select
              required
              value={formData.projectType}
              onChange={(event) =>
                updateField("projectType", event.target.value)
              }
              className="rounded-xl border border-purple-900 bg-black px-4 py-3 text-white outline-none focus:border-purple-400"
            >
              <option value="">Choose a path</option>
              <option value="website-build">Website Build</option>
              <option value="website-rescue">Website Rescue</option>
              <option value="product-brand">Product Brand</option>
              <option value="dropshipping-store">Dropshipping Store</option>
              <option value="adult-novelty-store">
                Adult Novelty Link Store
              </option>
              <option value="digital-product">Digital Product</option>
              <option value="helper-worker">Helper Worker Setup</option>
              <option value="domain-hosting">Domain / Hosting Help</option>
              <option value="promo-campaign">Promo Campaign</option>
              <option value="managed-launch">Managed Launch Support</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-300">
              Budget range
            </span>
            <select
              value={formData.budgetRange}
              onChange={(event) =>
                updateField("budgetRange", event.target.value)
              }
              className="rounded-xl border border-purple-900 bg-black px-4 py-3 text-white outline-none focus:border-purple-400"
            >
              <option value="">Choose one</option>
              <option value="under-100">Under $100</option>
              <option value="100-300">$100 - $300</option>
              <option value="300-750">$300 - $750</option>
              <option value="750-plus">$750+</option>
              <option value="quote-needed">Need a quote</option>
              <option value="payment-plan">Need payment plan</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-300">
              Notes / what are you bringing into the Mine?
            </span>
            <textarea
              value={formData.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              className="min-h-32 rounded-xl border border-purple-900 bg-black px-4 py-3 text-white outline-none focus:border-purple-400"
              placeholder="Tell us what you have, what is unfinished, what needs fixing, or what you want built."
            />
          </label>

          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-full bg-purple-400 px-6 py-3 font-black text-black hover:bg-purple-300"
            >
              Submit + Enter Access Path
            </button>

            {onReturn && (
              <button
                type="button"
                onClick={onReturn}
                className="rounded-full border border-slate-700 px-6 py-3 font-bold text-slate-300 hover:border-purple-400"
              >
                Return To Entry
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
