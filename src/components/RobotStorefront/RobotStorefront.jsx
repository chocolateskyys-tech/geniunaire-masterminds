import React, { useState } from "react";
import {
  workerBotRentals,
  workerBotStoreCopy,
  botRentalNotice,
  botRentalFlow,
  botRentalStatuses,
} from "../../data/workerBotRentalMap";
import {
  protectedToolNotice,
  customerFacingRule,
} from "../../data/adminAccessMap";
import "./HelperStorefront.css";

export default function HelperStorefront({ onNavigate }) {
  const [selectedBot, setSelectedBot] = useState(null);

  const handleRequest = (bot) => {
    const savedRequests = JSON.parse(localStorage.getItem("workerBotRequests") || "[]");

    const request = {
      botId: bot.id,
      botName: bot.name,
      status: "Pending Admin Review",
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "workerBotRequests",
      JSON.stringify([request, ...savedRequests])
    );

    setSelectedBot(bot);

    alert(
      `${bot.name} request submitted. Admin setup, payment/subscription, E-TV model, and signal plan may be required before this worker bot is assigned.`
    );
  };

  return (
    <main className="helper-storefront-room">
      <section className="helper-hero">
        <p className="helper-kicker">BOTBOX BOOK REQUIRED FOR DEEP BOT ACCESS</p>
        <h1>{workerBotStoreCopy.title}</h1>
        <h2>{workerBotStoreCopy.identity}</h2>
        <p>{workerBotStoreCopy.subtitle}</p>

        <div className="helper-protection">
          <strong>Protected Machine Rule:</strong> {workerBotStoreCopy.protectionLine}
        </div>

        <div className="helper-actions">
          <button type="button" onClick={() => onNavigate?.("etvStore")}>
            Choose BotBox Model
          </button>
          <button type="button" onClick={() => onNavigate?.("etvLounge")}>
            Open GM E-TV Lounge
          </button>
          <button type="button" onClick={() => onNavigate?.("aiCastingMembership")}>
            Casting Desk Access
          </button>
        </div>
      </section>

      <section className="bot-rental-grid">
        {workerBotRentals.map((bot) => (
          <article key={bot.id} className="bot-rental-card">
            <div className={`bot-status bot-status-${bot.status}`}>
              {botRentalStatuses[bot.status] || bot.status}
            </div>

            <h3>{bot.name}</h3>
            <p>{bot.task}</p>

            <div className="bot-meta">
              <span>Rental</span>
              <strong>{bot.monthlyRental}</strong>
            </div>

            <div className="bot-meta">
              <span>Setup</span>
              <strong>{bot.setupFee}</strong>
            </div>

            <div className="bot-meta">
              <span>Required Model</span>
              <strong>{bot.requiredModel}</strong>
            </div>

            <div className="bot-meta">
              <span>Required Signal</span>
              <strong>{bot.requiredSignal}</strong>
            </div>

            <div className="bot-list">
              <h4>Customer can:</h4>
              <ul>
                {bot.customerCan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bot-list locked">
              <h4>Admin locked:</h4>
              <ul>
                {bot.adminOnly.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <button type="button" onClick={() => handleRequest(bot)}>
              Request / Rent This Worker
            </button>
          </article>
        ))}
      </section>

      <section className="bot-rental-info">
        <article>
          <h3>Rental Flow</h3>
          <ol>
            {botRentalFlow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>

        <article>
          <h3>Bot Rental Notice</h3>
          <p>{botRentalNotice}</p>
        </article>

        <article>
          <h3>Admin Tool Lock</h3>
          <p>{protectedToolNotice}</p>
          <p>{customerFacingRule}</p>
        </article>

        <article>
          <h3>Latest Request</h3>
          {selectedBot ? (
            <p>
              <strong>{selectedBot.name}</strong> was submitted for pending admin review.
            </p>
          ) : (
            <p>No worker bot selected yet.</p>
          )}
        </article>
      </section>
    </main>
  );
}
