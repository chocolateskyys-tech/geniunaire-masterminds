import React from "react";
import "./GMFinalVisual.css";

const FRONT_GATE = "/assets/gm-front-gate-final.png";
const PARKING_LOT = "/assets/gm/parking-lot/parking-lot-approved.png";
const POOL_LOGO = "/assets/gm-pcoa-pool-logo-final.png";

export default function GMFinalVisual({ onAction = () => {} }) {
  return (
    <main className="gm-final">
      <section className="gm-image-wrap">
        <img src={FRONT_GATE} alt="Geniunaire MasterMinds Theme Park — Atlanta" />

        <button className="gm-hotspot orbit" onClick={() => onAction("rent-orbit")}>Rent Orbit Now</button>
        <button className="gm-hotspot tickets" onClick={() => onAction("buy-tickets")}>Buy Tickets</button>
        <button className="gm-hotspot starplay" onClick={() => onAction("starplay")}>StarPlay</button>
        <button className="gm-hotspot vip" onClick={() => onAction("vip-entry")}>VIP Entry</button>

        <button className="gm-secret play" onClick={() => onAction("secret-gate-play")} />
        <button className="gm-secret admin" onClick={() => onAction("secret-admin")} />
      </section>

      <section className="gm-image-wrap lot">
        <img src={PARKING_LOT} alt="GMPark RIDEZ 001-000000 Parking Lot" />

        <button className="gm-hotspot refresh" onClick={() => onAction("refreshments")}>Refreshments</button>
        <button className="gm-hotspot table" onClick={() => onAction("reserve-table")}>Reserve Table</button>
        <button className="gm-hotspot dropoff" onClick={() => onAction("drop-off")}>Drop Off Now</button>
        <button className="gm-hotspot golf" onClick={() => onAction("golf-cart")}>Request Golf Cart</button>
      </section>

      <section className="gm-pool-unlock">
        <img src={POOL_LOGO} alt="GM Empire Pool Logo - Pool Skin Only" />
      </section>
    </main>
  );
}
