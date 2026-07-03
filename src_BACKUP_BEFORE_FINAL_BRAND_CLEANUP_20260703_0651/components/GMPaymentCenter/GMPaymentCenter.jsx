import React from "react";
import "./GMPaymentCenter.css";

const stripeLinks = [
  {
    name: "GM $5 Hour Machine Day Pass",
    price: "$5",
    type: "One-time",
    link: "https://buy.stripe.com/9B66oG7gJ6W84Hm5Yo0Jq00",
    desc: "One-time Orbit roaming pass for GM park guests, club referrals, dorm users, home viewers, and promo guests."
  },
  {
    name: "GM Founder Access Pass",
    price: "$49",
    type: "One-time",
    link: "https://buy.stripe.com/5kQdR88kN0xK0r686w0Jq02",
    desc: "Early founder access to the GM park experience, launch buildings, previews, and founder updates."
  },
  {
    name: "GM ThreadFolio Glow / E-Folio Glow Set",
    price: "$197",
    type: "Pre-order",
    link: "https://buy.stripe.com/fZucN4fNf0xK0r6dqQ0Jq03",
    desc: "ThreadFolio, Glow, E-Folio, E-Map, E-Brochure, and creator buildout system."
  },
  {
    name: "GM E-TV Basic Product Stream",
    price: "$9.99/mo",
    type: "Monthly",
    link: "https://buy.stripe.com/28EeVc30t3JWa1G72s0Jq04",
    desc: "Monthly activation for e-books, guides, downloads, digital products, and small storefront displays."
  },
  {
    name: "GM E-TV Business Stream",
    price: "$19.99/mo",
    type: "Monthly",
    link: "https://buy.stripe.com/aFafZg7gJa8ka1G86w0Jq05",
    desc: "Monthly activation for business storefronts, service displays, e-stores, promo booths, and digital business buildings."
  },
  {
    name: "GM E-TV Creator / ThreadFolio Stream",
    price: "$29.99/mo",
    type: "Monthly",
    link: "https://buy.stripe.com/fZufZg58B3JWb5KgD20Jq06",
    desc: "Monthly activation for ThreadFolio, NextGen, E-Folio, E-Brochure, CheerFrame, creator rooms, and display products."
  },
  {
    name: "GM E-TV Club / Nightlife Stream",
    price: "$49.99/mo",
    type: "Monthly",
    link: "https://buy.stripe.com/4gM14mfNf94g7Ty4Uk0Jq07",
    desc: "Monthly activation for club, lounge, nightlife, PCOA traffic, club TV displays, and owner-approved staff helper access."
  },
  {
    name: "GM E-TV Staff Helper Orbit Demo Pack",
    price: "$15",
    type: "One-time",
    link: "https://buy.stripe.com/00weVccB3eoA5LqaeE0Jq08",
    desc: "Staff helper Orbit access for owner-approved workers, including servers, bartenders, bar backs, hookah managers, and security."
  },
  {
    name: "GM AiALITY Casting Orbit Pass",
    price: "$29.99/mo",
    type: "Monthly",
    link: "https://buy.stripe.com/fZu28q44xdkwc9O5Yo0Jq09",
    desc: "Monthly casting access for dancers, DJs, performers, promo talent, creators, voice work, and approved casting clients."
  },
  {
    name: "GM Orbits Monthly Display Activation",
    price: "$9.99/mo",
    type: "Monthly",
    link: "https://buy.stripe.com/cNi14mcB3cgs6Pu9aA0Jq01",
    desc: "Monthly activation to keep a GM Orbit live, visible, dressed, displayed, and working inside GM or the GM E-TV Network."
  }
];

export default function GMPaymentCenter() {
  return (
    <section className="gm-payment-center">
      <div className="gm-payment-hero">
        <p className="gm-payment-kicker">GM Owner Admin Building • Payment Center</p>
        <h1>GM Payment Center</h1>
        <p>
          Owner-controlled checkout links for GM passes, E-TV streams, Orbits,
          attraction products, storefront products, casting, and activation packages.
        </p>
        <div className="gm-payment-rule">
          Payment Links only • No secret keys • No API keys shown • Money routes through GM Owner Admin
        </div>
      </div>

      <div className="gm-payment-grid">
        {stripeLinks.map((item, index) => (
          <article className="gm-payment-card" key={item.name}>
            <div className="gm-payment-number">{index + 1}</div>
            <div className="gm-payment-info">
              <h2>{item.name}</h2>
              <p>{item.desc}</p>
              <div className="gm-payment-meta">
                <span>{item.price}</span>
                <span>{item.type}</span>
              </div>
              <a className="gm-payment-button" href={item.link} target="_blank" rel="noreferrer">
                Open Stripe Checkout
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
