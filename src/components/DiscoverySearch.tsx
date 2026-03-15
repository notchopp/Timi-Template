import { useState, useCallback } from "react";
import { Mic, Image, Send, X, Camera } from "lucide-react";
import { naturalLanguageSearch, chatRecommend, describeImageForSearch } from "../lib/ai";
import type { ChatMessage } from "../lib/ai";
import { BUSINESSES } from "../data/businesses";
import { useAppStore } from "../store/useAppStore";
import type { Business } from "../data/businesses";

interface DiscoverySearchProps {
  onResults: (businesses: Business[]) => void;
}

export function DiscoverySearch({ onResults }: DiscoverySearchProps) {
  const [nlQuery, setNlQuery] = useState("");
  const [nlLoading, setNlLoading] = useState(false);
  const [nlInterpretation, setNlInterpretation] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatResponse, setChatResponse] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [imageSearchOpen, setImageSearchOpen] = useState(false);
  const [imageDescription, setImageDescription] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const addSearch = useAppStore((s) => s.addSearch);

  const businessList = BUSINESSES.map((b) => ({ id: b.id, name: b.name, category: b.category }));
  const businessContext = BUSINESSES.map((b) => `${b.id}: ${b.name} (${b.categoryLabel})`).join("; ");

  const runNaturalSearch = useCallback(async () => {
    if (!nlQuery.trim()) return;
    setNlLoading(true);
    addSearch(nlQuery);
    const res = await naturalLanguageSearch(nlQuery, businessList);
    setNlInterpretation(res.interpretation);
    const matched = BUSINESSES.filter((b) => res.businessIds.includes(b.id));
    onResults(matched);
    setNlLoading(false);
  }, [nlQuery, onResults, addSearch]);

  const runChat = useCallback(async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput("");
    setChatHistory((h) => [...h, { role: "user", content: userMsg }]);
    setChatLoading(true);
    const response = await chatRecommend(userMsg, chatHistory, businessContext);
    setChatResponse(response);
    setChatHistory((h) => [...h, { role: "user", content: userMsg }, { role: "assistant", content: response }]);
    const ids = BUSINESSES.map((b) => b.id).filter((id) => response.toLowerCase().includes(BUSINESSES.find((x) => x.id === id)?.name.toLowerCase() ?? ""));
    if (ids.length > 0) onResults(BUSINESSES.filter((b) => ids.includes(b.id)));
    setChatLoading(false);
  }, [chatInput, chatHistory, onResults]);

  const runImageSearch = useCallback(async () => {
    setImageLoading(true);
    const ids = await describeImageForSearch(imageDescription, businessContext);
    onResults(BUSINESSES.filter((b) => ids.includes(b.id)));
    setImageSearchOpen(false);
    setImageDescription("");
    setImageLoading(false);
  }, [imageDescription, onResults]);

  const startVoiceSearch = useCallback(() => {
    const win = window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown };
    if (!win.SpeechRecognition && !win.webkitSpeechRecognition) {
      alert("Voice search is not supported in this browser. Try Chrome.");
      return;
    }
    const SR = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR() as {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      onresult: (e: { results: { 0: { 0: { transcript: string } } } }) => void;
      onend: () => void;
      start: () => void;
    };
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    setIsListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setNlQuery(transcript);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-white px-4 py-3">
        <span className="text-sm text-inkMuted">Try:</span>
        <button
          type="button"
          onClick={startVoiceSearch}
          disabled={isListening}
          className="flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-sm font-medium text-ink hover:bg-border/50 disabled:animate-pulse"
        >
          <Mic className="h-4 w-4" />
          Voice search
        </button>
        <button
          type="button"
          onClick={() => setImageSearchOpen(true)}
          className="flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-sm font-medium text-ink hover:bg-border/50"
        >
          <Camera className="h-4 w-4" />
          Camera / vibe
        </button>
        <span className="text-sm text-inkMuted">· SMS & WhatsApp on every listing</span>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="text"
            value={nlQuery}
            onChange={(e) => setNlQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runNaturalSearch()}
            placeholder="e.g. Korean fried chicken near 69th St, or same-day plumber"
            className="w-full rounded-lg border border-border bg-white px-4 py-3 pr-24 text-sm focus:border-ink/40 focus:outline-none"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
            <button
              type="button"
              onClick={startVoiceSearch}
              disabled={isListening}
              className="rounded p-2 text-inkMuted hover:bg-cream hover:text-ink disabled:animate-pulse"
              title="Voice search"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setImageSearchOpen(true)}
              className="rounded p-2 text-inkMuted hover:bg-cream hover:text-ink"
              title="Image / vibe search"
            >
              <Image className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={runNaturalSearch}
              disabled={nlLoading}
              className="rounded bg-ink px-3 py-1.5 text-sm font-medium text-cream hover:bg-accent disabled:opacity-70"
            >
              {nlLoading ? "..." : "Search"}
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setChatOpen(!chatOpen)}
          className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium text-ink hover:bg-cream sm:shrink-0"
        >
          Chat with AI
        </button>
      </div>
      {nlInterpretation && (
        <p className="text-sm text-inkMuted">{nlInterpretation}</p>
      )}

      {chatOpen && (
        <div className="rounded-lg border border-border bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium">Conversational discovery</span>
            <button onClick={() => setChatOpen(false)} className="text-inkMuted hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mb-2 text-xs text-inkMuted">Ask for recommendations. e.g. &quot;Where can I get good takeout with vegetarian options?&quot;</p>
          {chatResponse && (
            <div className="mb-3 rounded bg-cream p-3 text-sm text-ink">{chatResponse}</div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runChat()}
              placeholder="Ask for a recommendation..."
              className="flex-1 rounded border border-border px-3 py-2 text-sm focus:border-ink/40 focus:outline-none"
            />
            <button
              onClick={runChat}
              disabled={chatLoading}
              className="rounded bg-ink p-2 text-cream hover:bg-accent disabled:opacity-70"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {imageSearchOpen && (
        <div className="rounded-lg border border-border bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium">Image / vibe search</span>
            <button onClick={() => setImageSearchOpen(false)} className="text-inkMuted hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mb-2 text-xs text-inkMuted">Describe the place you&apos;re looking for—or the vibe from a photo.</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
              placeholder="e.g. cozy diner with pancakes, or Korean fried chicken"
              className="flex-1 rounded border border-border px-3 py-2 text-sm focus:border-ink/40 focus:outline-none"
            />
            <button
              onClick={runImageSearch}
              disabled={imageLoading}
              className="rounded bg-ink px-4 py-2 text-sm font-medium text-cream hover:bg-accent disabled:opacity-70"
            >
              {imageLoading ? "..." : "Find"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
