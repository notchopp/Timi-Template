import { useState } from "react";
import { Phone, MessageCircle, HelpCircle, Inbox } from "lucide-react";

export function OperationalAI() {
  const [chatOpen, setChatOpen] = useState(false);
  const [ownerQuestion, setOwnerQuestion] = useState("");
  const [ownerResponse, setOwnerResponse] = useState("");

  const handleOwnerQuestion = () => {
    const q = ownerQuestion.toLowerCase();
    if (q.includes("lead") || q.includes("visibility") || q.includes("more")) {
      setOwnerResponse("List as Verified ($10/mo) to boost visibility. Add photos and complete your profile. Featured listings get 3x more clicks.");
    } else if (q.includes("verified")) {
      setOwnerResponse("Verified means we've confirmed your business info—phone, address, hours. Users trust verified listings more, and they rank higher in search.");
    } else if (q.includes("optim") || q.includes("listing") || q.includes("profile")) {
      setOwnerResponse("Add your AI-generated description, upload photos, fill all fields. Use keywords customers search for. Reply to reviews to boost engagement.");
    } else {
      setOwnerResponse("I can help with listing optimization, pricing, and getting more leads. Try: \"How do I get more leads?\" or \"What does verified mean?\"");
    }
  };

  return (
    <section className="rounded-lg border border-border bg-white p-8">
      <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
        operational ai for business owners
      </h2>
      <p className="mt-1 text-sm text-inkMuted">
        Tools to help your listing perform better
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-cream p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-ink p-2 text-cream">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-ink">AI receptionist</h3>
              <p className="text-sm text-inkMuted">Never miss a call. AI answers, qualifies leads, and books appointments 24/7.</p>
            </div>
          </div>
          <a href="#" className="mt-3 inline-block text-sm font-medium text-ink hover:underline">
            Learn more →
          </a>
        </div>
        <div className="rounded-lg border border-border bg-cream p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-ink p-2 text-cream">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-ink">Owner chatbot</h3>
              <p className="text-sm text-inkMuted">Get help with listing optimization, pricing, and performance.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setChatOpen(!chatOpen)}
            className="mt-3 text-sm font-medium text-ink hover:underline"
          >
            {chatOpen ? "Hide" : "Ask a question"}
          </button>
          {chatOpen && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={ownerQuestion}
                onChange={(e) => setOwnerQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleOwnerQuestion()}
                placeholder="e.g. How do I get more leads?"
                className="flex-1 rounded border border-border px-3 py-2 text-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={handleOwnerQuestion}
                className="rounded bg-ink px-4 py-2 text-sm text-cream hover:bg-accent"
              >
                Ask
              </button>
            </div>
          )}
          {ownerResponse && (
            <p className="mt-2 rounded bg-white p-2 text-sm text-inkMuted">{ownerResponse}</p>
          )}
        </div>
        <div className="rounded-lg border border-border bg-cream p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-ink p-2 text-cream">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-ink">FAQ automation</h3>
              <p className="text-sm text-inkMuted">AI answers common questions from your listing—hours, payment, services.</p>
            </div>
          </div>
          <a href="#" className="mt-3 inline-block text-sm font-medium text-ink hover:underline">
            Set up →
          </a>
        </div>
        <div className="rounded-lg border border-border bg-cream p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-ink p-2 text-cream">
              <Inbox className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-ink">Inbox triage</h3>
              <p className="text-sm text-inkMuted">Leads, reviews, and messages sorted by priority. AI suggests replies.</p>
            </div>
          </div>
          <a href="#" className="mt-3 inline-block text-sm font-medium text-ink hover:underline">
            View inbox →
          </a>
        </div>
      </div>
    </section>
  );
}
