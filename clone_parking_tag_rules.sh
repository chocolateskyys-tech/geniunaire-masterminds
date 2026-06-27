#!/usr/bin/env bash
set -e

echo "ADDING CLONE PARKING TAG RULES..."

mkdir -p src/components/CloneValetFeature

cat > src/components/CloneValetFeature/CloneValetFeature.jsx <<'REACT'
import React, { useState } from "react";

const STORAGE_KEY = "gmCloneParkingVehicles";
const TICKET_KEY = "gmCloneValetTicket";

const DRIVER_TAG = "GM RIDZ 01";

const blockedWords = [
  "fuck", "shit", "bitch", "dick", "pussy", "hoe", "slut", "whore",
  "porn", "sex", "nude", "naked", "asshole", "cum", "kill", "rape"
];

const packages = [
  {
    name: "Monthly Clone Parking Bot",
    price: "$19.99/mo",
    perks: "Virtual parking, vehicle profile, clone cart pickup, front gate arrival view, saved parking pass.",
  },
  {
    name: "VIP Clone Valet Pass",
    price: "$49.99/mo",
    perks: "Priority cart pickup, ETV curb drop-off, casting curb drop-off, saved vehicle profile, faster dispatch.",
  },
  {
    name: "Founder Fleet Parking",
    price: "$99.99/mo",
    perks: "Multiple vehicle profiles, business/fleet parking, GM Ridz curb, admin review, promo-ready vehicle card.",
  },
  {
    name: "GM Ridz Driver Parking",
    price: "Driver Account",
    perks: "Driver vehicle profile, forced GM Ridz tag, front curb dispatch, admin approval, no public custom tag.",
  },
];

const valetOptions = [
  "Bring my parked clone to the front gate",
  "Hold my clone in virtual parking",
  "Send clone to ETV Lounge entrance",
  "Send clone to Casting curb",
  "Send clone to E-Service / Website Build desk",
];

function safeLoadVehicles() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function cleanTag(value) {
  return String(value || "")
    .replace(/[^a-zA-Z0-9 _.-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 18);
}

function hasBlockedWord(value) {
  const clean = String(value || "").toLowerCase();
  return blockedWords.some((word) => new RegExp(`\\b${word}\\b`, "i").test(clean));
}

export default function CloneValetFeature() {
  const [vehicles, setVehicles] = useState(() => safeLoadVehicles());
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(packages[0].name);
  const [profileType, setProfileType] = useState("Guest Clone");
  const [status, setStatus] = useState("Clone cart idle at GM Ridz curb.");
  const [ticket, setTicket] = useState(null);
  const [progress, setProgress] = useState(0);
  const [warning, setWarning] = useState("");

  const [form, setForm] = useState({
    ownerName: "",
    vehicleName: "",
    displayTag: "",
    make: "",
    model: "",
    color: "",
    year: "",
    parkingZone: "GM Front Lot",
    notes: "",
    photo: "",
  });

  function update(field, value) {
    setWarning("");
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function saveVehicles(next) {
    setVehicles(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function handlePhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      update("photo", reader.result);
    };
    reader.readAsDataURL(file);
  }

  function getFinalDisplayTag() {
    if (profileType === "GM Ridz Driver") {
      return DRIVER_TAG;
    }

    const preferred = cleanTag(form.displayTag || form.ownerName || form.vehicleName);

    if (!preferred) {
      return "GM GUEST";
    }

    return preferred.toUpperCase();
  }

  function saveVehicle(event) {
    event.preventDefault();

    const finalTag = getFinalDisplayTag();

    if (profileType !== "GM Ridz Driver" && hasBlockedWord(finalTag)) {
      setWarning("That public tag is blocked. Choose a clean name or nickname.");
      return;
    }

    const vehicle = {
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
      profileType,
      ownerName: form.ownerName || "Guest",
      vehicleName: form.vehicleName || "My GM Clone Vehicle",
      displayTag: finalTag,
      make: form.make || "Make pending",
      model: form.model || "Model pending",
      color: form.color || "Color pending",
      year: form.year || "Year pending",
      parkingZone: profileType === "GM Ridz Driver" ? "GM Ridz Driver Curb" : form.parkingZone,
      notes: form.notes,
      photo: form.photo,
      package: profileType === "GM Ridz Driver" ? "GM Ridz Driver Parking" : selectedPackage,
      status: "Parked In Virtual Lot",
      parkingPass: `GM-PARK-${Math.floor(100000 + Math.random() * 899999)}`,
    };

    const next = [vehicle, ...vehicles];
    saveVehicles(next);
    setSelectedVehicleId(String(vehicle.id));
    setStatus(`${vehicle.displayTag} saved and parked in ${vehicle.parkingZone}.`);

    setForm({
      ownerName: "",
      vehicleName: "",
      displayTag: "",
      make: "",
      model: "",
      color: "",
      year: "",
      parkingZone: "GM Front Lot",
      notes: "",
      photo: "",
    });
  }

  function getSelectedVehicle() {
    return vehicles.find((vehicle) => String(vehicle.id) === String(selectedVehicleId));
  }

  function callCloneCart(option) {
    const vehicle = getSelectedVehicle();

    const code = `GM-CLONE-VALET-${Math.floor(100000 + Math.random() * 899999)}`;
    const request = {
      code,
      option,
      vehicle: vehicle || null,
      package: vehicle?.package || selectedPackage,
      status: "Cart dispatched",
      note: "Virtual parking / clone valet feature. Paid monthly parking package, bot rental, or GM access may be required.",
      createdAt: new Date().toLocaleString(),
    };

    setTicket(request);
    localStorage.setItem(TICKET_KEY, JSON.stringify(request));

    setProgress(10);
    setStatus("Golf cart bot dispatched to virtual parking lot.");

    setTimeout(() => {
      setProgress(35);
      setStatus("Golf cart bot found the parked clone vehicle.");
    }, 700);

    setTimeout(() => {
      setProgress(70);
      setStatus("Clone vehicle is riding toward the front gate.");
    }, 1400);

    setTimeout(() => {
      setProgress(100);
      setStatus("Clone vehicle arrived at the GM front gate.");
    }, 2200);
  }

  function deleteVehicle(id) {
    const next = vehicles.filter((vehicle) => vehicle.id !== id);
    saveVehicles(next);
    if (String(selectedVehicleId) === String(id)) {
      setSelectedVehicleId("");
    }
  }

  return (
    <section className="relative z-20 max-w-7xl mx-auto -mt-4 mb-8 rounded-[2rem] border border-cyan-400/50 bg-black/85 p-5 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
        <div>
          <p className="text-cyan-300 text-xs uppercase tracking-[0.35em]">
            GM Ridz Curb · Virtual Parking · Clone Bot Package
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-2">
            Monthly Clone Parking Bot
          </h2>
          <p className="text-slate-300 max-w-4xl mt-3">
            Guests can personalize a clean public tag, name, or nickname. GM Ridz drivers are assigned
            <span className="text-yellow-300 font-black"> GM RIDZ 01 </span>
            with no custom tag override.
          </p>
        </div>

        <div className="rounded-2xl border border-yellow-400 bg-yellow-400/10 px-5 py-4">
          <p className="text-yellow-300 text-xs uppercase tracking-widest">Arrival Status</p>
          <p className="text-white font-black">{progress}%</p>
        </div>
      </div>

      {warning && (
        <div className="mb-5 rounded-2xl border border-red-500 bg-red-500/10 p-4 text-red-200 font-black">
          {warning}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <form onSubmit={saveVehicle} className="rounded-3xl border border-purple-700 bg-purple-950/20 p-5">
          <h3 className="text-2xl font-black text-purple-300 mb-4">
            Register Clone Vehicle
          </h3>

          <select
            value={profileType}
            onChange={(e) => {
              setProfileType(e.target.value);
              setWarning("");
            }}
            className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3 text-white"
          >
            <option>Guest Clone</option>
            <option>GM Ridz Driver</option>
          </select>

          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            disabled={profileType === "GM Ridz Driver"}
            className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3 text-white disabled:opacity-50"
          >
            {packages.map((pack) => (
              <option key={pack.name}>{pack.name}</option>
            ))}
          </select>

          <input
            value={form.ownerName}
            onChange={(e) => update("ownerName", e.target.value)}
            placeholder="Owner / User Name"
            className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3"
          />

          <input
            value={form.vehicleName}
            onChange={(e) => update("vehicleName", e.target.value)}
            placeholder="Vehicle Nickname / Clone Name"
            className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3"
          />

          <input
            value={profileType === "GM Ridz Driver" ? DRIVER_TAG : form.displayTag}
            onChange={(e) => update("displayTag", e.target.value)}
            placeholder="Public Tag / Username / Nickname"
            disabled={profileType === "GM Ridz Driver"}
            className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3 disabled:opacity-50"
          />

          <p className="text-xs text-slate-500 mb-3">
            Public tag appears on the clone vehicle card. Explicit tags are blocked. Drivers always display GM RIDZ 01.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <input value={form.year} onChange={(e) => update("year", e.target.value)} placeholder="Year" className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3" />
            <input value={form.color} onChange={(e) => update("color", e.target.value)} placeholder="Color" className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input value={form.make} onChange={(e) => update("make", e.target.value)} placeholder="Make" className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3" />
            <input value={form.model} onChange={(e) => update("model", e.target.value)} placeholder="Model" className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3" />
          </div>

          <select
            value={profileType === "GM Ridz Driver" ? "GM Ridz Driver Curb" : form.parkingZone}
            onChange={(e) => update("parkingZone", e.target.value)}
            disabled={profileType === "GM Ridz Driver"}
            className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3 text-white disabled:opacity-50"
          >
            <option>GM Front Lot</option>
            <option>VIP Clone Parking</option>
            <option>ETV Lounge Curb</option>
            <option>Casting Curb</option>
            <option>E-Service Build Desk</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3 text-slate-300"
          />

          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Notes: parking instructions, pickup preference, driver/admin approval notes..."
            className="w-full mb-4 bg-black border border-slate-700 rounded px-4 py-3 min-h-[90px]"
          />

          <button className="rounded-xl bg-yellow-400 text-black font-black px-6 py-3">
            Save Monthly Parking Clone
          </button>
        </form>

        <div className="rounded-3xl border border-cyan-700 bg-cyan-950/10 p-5">
          <h3 className="text-2xl font-black text-cyan-300 mb-4">
            Call Clone Golf Cart
          </h3>

          <select
            value={selectedVehicleId}
            onChange={(e) => setSelectedVehicleId(e.target.value)}
            className="w-full mb-4 bg-black border border-slate-700 rounded px-4 py-3 text-white"
          >
            <option value="">Choose parked clone vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.displayTag} · {vehicle.make} {vehicle.model}
              </option>
            ))}
          </select>

          <div className="rounded-2xl border border-slate-700 bg-black/70 p-4 mb-4">
            <p className="text-cyan-300 text-xs uppercase tracking-widest">Live Cart View</p>
            <p className="text-white font-black mt-1">{status}</p>

            <div className="mt-4 h-4 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {valetOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => callCloneCart(option)}
                className="rounded-2xl border border-slate-700 bg-black/70 px-4 py-3 text-left text-sm font-black text-slate-200 hover:border-yellow-400 hover:text-yellow-300"
              >
                {option}
              </button>
            ))}
          </div>

          {ticket && (
            <div className="mt-5 rounded-2xl border border-yellow-400 bg-yellow-400/10 p-4">
              <p className="text-yellow-300 text-xs uppercase tracking-widest">
                Clone Valet Ticket
              </p>
              <p className="text-white font-black mt-1">{ticket.code}</p>
              <p className="text-slate-300 text-sm mt-2">{ticket.option}</p>
              <p className="text-slate-500 text-xs mt-2">{ticket.note}</p>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-yellow-700 bg-yellow-950/10 p-5">
          <h3 className="text-2xl font-black text-yellow-300 mb-4">
            Parked Clone Vehicles
          </h3>

          <div className="grid gap-4 max-h-[720px] overflow-auto pr-1">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="rounded-2xl border border-slate-700 bg-black/70 p-4">
                {vehicle.photo ? (
                  <img src={vehicle.photo} alt={vehicle.vehicleName} className="w-full h-36 object-cover rounded-xl mb-3 border border-slate-700" />
                ) : (
                  <div className="w-full h-36 rounded-xl mb-3 border border-slate-700 bg-slate-900 flex items-center justify-center text-slate-500">
                    No vehicle photo
                  </div>
                )}

                <p className="text-xs text-cyan-300 uppercase tracking-widest">{vehicle.parkingPass}</p>
                <h4 className="text-xl font-black text-white mt-1">{vehicle.displayTag}</h4>
                <p className="text-yellow-300 text-sm font-black">{vehicle.profileType}</p>
                <p className="text-slate-300 text-sm">
                  {vehicle.year} {vehicle.color} {vehicle.make} {vehicle.model}
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  {vehicle.vehicleName} · {vehicle.parkingZone}
                </p>
                <p className="text-yellow-300 text-xs mt-2">{vehicle.package}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <button type="button" onClick={() => setSelectedVehicleId(String(vehicle.id))} className="rounded border border-cyan-500 px-3 py-2 text-sm">
                    Select
                  </button>
                  <button type="button" onClick={() => deleteVehicle(vehicle.id)} className="rounded border border-red-500 px-3 py-2 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {vehicles.length === 0 && (
              <p className="text-slate-500">No parked clone vehicles saved yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-700 bg-black/70 p-4">
        <p className="text-slate-400 text-sm">
          Launch note: Public tags use usernames or nicknames only. GM Ridz drivers display GM RIDZ 01 with no exceptions.
          Real plate numbers should not be displayed publicly. Production version should use secure account storage,
          private image hosting, payment status, consent, moderation, and full privacy controls.
        </p>
      </div>
    </section>
  );
}
REACT

npm run build

git add src/components/CloneValetFeature/CloneValetFeature.jsx

if git diff --cached --quiet; then
  echo "No new changes to commit."
else
  git commit -m "Add clone parking public tag moderation and GM Ridz driver tag rule"
fi

git push -u origin "$(git branch --show-current)"

echo "GREEN CHECK: CLONE PARKING TAG RULES ADDED"
