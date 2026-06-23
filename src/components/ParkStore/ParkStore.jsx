import React, { useState } from "react";
import "./ParkStore.css";

const products = [
  ["Gate Ticket", "$9", "Basic park entry and browse access."],
  ["Guest Pass Rental", "$5/hr", "Mini guest pass body for virtual walking."],
  ["Day Guest Pass Pass", "$19", "Roam the park for the day."],
  ["Monthly Guest Pass Pass", "$49/mo", "Monthly guest pass roaming plan."],
  ["E-TV Book Signal", "$29/mo", "Watch, stream, cast, and receive drops."],
  ["Thread Client Setup", "$149+", "Onboarding, admin handoff, business setup."],
  ["Casting Verification", "$25", "Talent agreement and verification lane."],
  ["Celebrity Security", "$99+", "Marketplace verification and placement review."],
  ["Wardrobe Plan", "$19/mo", "Avatar and guest pass outfit changes."],
  ["Promo TV Package", "$199+", "Commercials, ads, and lounge placement."]
];

export default function ParkStore({ onBack }) {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart((current) => [...current, item]);
    localStorage.setItem("gm_latest_cart_item", JSON.stringify(item));
  };

  const checkout = () => {
    localStorage.setItem("gm_checkout_cart", JSON.stringify(cart));
    alert("Checkout staged. Add your Stripe payment link inside this button when ready.");
  };

  return (
    <main className="park-store-page">
      <button className="store-back" onClick={onBack}>← Back To Park</button>
      <section className="store-hero">
        <p>Geniunaire E-Mall / Pay Desk</p>
        <h1>Tickets, Passes, Subscriptions & Builds</h1>
        <h2>Every store gets its own payment door. This is the starter checkout hub.</h2>
      </section>

      <section className="store-layout">
        <div className="store-grid">
          {products.map((item) => (
            <article className="store-card" key={item[0]}>
              <h3>{item[0]}</h3>
              <strong>{item[1]}</strong>
              <p>{item[2]}</p>
              <button onClick={() => addItem(item)}>Add / Select</button>
            </article>
          ))}
        </div>

        <aside className="cart-panel">
          <p>Selected</p>
          <h2>{cart.length} Item(s)</h2>
          {cart.map((item, index) => (
            <div className="cart-line" key={`${item[0]}-${index}`}>
              <span>{item[0]}</span>
              <strong>{item[1]}</strong>
            </div>
          ))}
          <button onClick={checkout} disabled={!cart.length}>Open Checkout</button>
        </aside>
      </section>
    </main>
  );
}
