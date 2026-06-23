import "./PaymentDoors.css";

const paymentDoors = [
  {
    title: "Website Rescue",
    price: "Request Quote",
    description:
      "For messy, broken, unfinished, or confusing websites that need to be cleaned up, repaired, redirected, or rebuilt into something usable.",
    primary: "Start Website Rescue",
    secondary: "Request Quote",
  },
  {
    title: "Build My Product Brand",
    price: "From $197",
    description:
      "For products, white label items, digital offers, or physical goods that need names, descriptions, shelves, sales copy, and launch structure.",
    primary: "Build Product Brand",
    secondary: "Apply For Plan",
  },
  {
    title: "Start My Store",
    price: "From $297",
    description:
      "For dropshipping, affiliate, resale, novelty, digital, or product-based stores that need a cloud build path before launch.",
    primary: "Start Store Build",
    secondary: "Request Store Plan",
  },
  {
    title: "Launch My Digital Product",
    price: "From $97",
    description:
      "For ebooks, templates, guides, downloads, mini-courses, PDFs, workbooks, or digital products that need packaging and payment flow.",
    primary: "Launch Digital Product",
    secondary: "Upload Product Info",
  },
  {
    title: "Helper Worker Setup",
    price: "Request Quote",
    description:
      "For AI workers, automations, bot-style helpers, content systems, task assistants, or future helper body selections inside the cloud build system.",
    primary: "Request Helper Setup",
    secondary: "View Helper Options",
  },
  {
    title: "Domain + Hosting Help",
    price: "From $49",
    description:
      "For domain setup, hosting help, deployment support, redirect cleanup, IONOS/GitHub connection checks, or launch readiness.",
    primary: "Request Domain Help",
    secondary: "Check My Setup",
  },
  {
    title: "Promo Campaign Build",
    price: "From $147",
    description:
      "For flyers, launch posts, promo copy, offer cards, teaser content, funnel language, and campaign materials.",
    primary: "Build Promo Campaign",
    secondary: "Request Campaign",
  },
  {
    title: "Managed Launch Support",
    price: "Request Quote",
    description:
      "For clients who need guided setup, build support, launch planning, payment path help, and hands-on business structure.",
    primary: "Request Managed Support",
    secondary: "Apply For Support",
  },
];

export default function PaymentDoors({ onReturn }) {
  return (
    <main className="payment-doors-page">
      <section className="payment-doors-hero">
        <p className="payment-kicker">Admiration Mine Integrator</p>
        <h1>Payment Doors</h1>
        <p>
          Choose the door that matches what you are trying to build, repair,
          launch, sell, or organize. This is where the idea stops floating and
          gets a real path.
        </p>
      </section>

      <section className="payment-grid">
        {paymentDoors.map((door) => (
          <article className="payment-card" key={door.title}>
            <div>
              <p className="payment-card-label">Mine Door</p>
              <h2>{door.title}</h2>
              <p className="payment-price">{door.price}</p>
              <p className="payment-description">{door.description}</p>
            </div>

            <div className="payment-actions">
              <button type="button">{door.primary}</button>
              <button type="button" className="payment-secondary">
                {door.secondary}
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="payment-note">
        <h2>Payment Provider Slots</h2>
        <p>
          Stripe, PayPal, Square, payment plans, and request-quote links will
          connect here. For now, these doors establish the buyer-facing offer
          paths without exposing the admin command center.
        </p>

        <div className="payment-provider-row">
          <span>Stripe Slot</span>
          <span>PayPal Slot</span>
          <span>Square Slot</span>
          <span>Payment Plan Slot</span>
          <span>Request Quote Slot</span>
        </div>

        {onReturn && (
          <button type="button" className="payment-return" onClick={onReturn}>
            Return To Entry
          </button>
        )}
      </section>
    </main>
  );
}
