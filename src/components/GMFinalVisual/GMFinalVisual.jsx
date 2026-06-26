import React from "react";
import "./GMFinalVisual.css";

export default function GMFinalVisual({ onAction = () => {} }) {
  return (
    <main className="gm-final">
      <section className="gm-image-wrap">
        <img src="/assets/gm/front-gate/front-gate-approved.png" alt="Geniunaire MasterMinds Theme Park — Atlanta" />

        <button className="gm-hotspot orbit" onClick={() => onAction("rent-orbit")}>Rent Orbit Now</button>
        <button className="gm-hotspot tickets" onClick={() => onAction("buy-tickets")}>Buy Tickets</button>
        <button className="gm-hotspot starplay" onClick={() => onAction("starplay")}>StarPlay</button>
        <button className="gm-hotspot vip" onClick={() => onAction("vip-entry")}>VIP Entry</button>

        <button className="gm-secret play" onClick={() => onAction("secret-gate-play")} />
        <button className="gm-secret admin" onClick={() => onAction("secret-admin")} />
      </section>

      <section className="gm-image-wrap lot">
        <img src="/assets/gm/parking-lot/parking-lot-approved.png" alt="GMPark RIDEZ 001-000000" />

        <button className="gm-hotspot refresh" onClick={() => onAction("refreshments")}>Refreshments</button>
        <button className="gm-hotspot table" onClick={() => onAction("reserve-table")}>Reserve Table</button>
        <button className="gm-hotspot dropoff" onClick={() => onAction("drop-off")}>Drop Off Now</button>
        <button className="gm-hotspot golf" onClick={() => onAction("golf-cart")}>Request Golf Cart</button>
      </section>

      <section className="gm-pool-lock">
        <img src="/assets/gm/pool/gm-pool-logo-approved.png" alt="GM Empire Pool Logo - Pool Skin Only" />
      </section>
    </main>
  );
}
