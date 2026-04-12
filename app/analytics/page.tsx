"use client";

import { useEffect, useMemo, useState, ChangeEvent, ReactNode } from "react";

interface Device {
  type?: string;
  os?: string;
  browser?: string;
}

interface LocationInfo {
  country?: string;
  city?: string;
}

interface AnalyticsItem {
  _id: string;
  page?: string;
  referrer?: string;
  ip?: string;
  device?: Device;
  location?: LocationInfo;
  createdAt: string;
}

interface ChangeMessage {
  _id: string;
  message: string;
  createdAt: string;
}

interface Note {
  _id: string;
  content: string;
  createdAt: string;
}

interface AdminPayload {
  visits: number;
  analytics: AnalyticsItem[];
  changeMessages: ChangeMessage[];
  notes: Note[];
  totals: {
    analyticsTotal: number;
    changeMessagesTotal: number;
    notesTotal: number;
  };
}

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export default function AnalyticsPage() {
  const [password, setPassword] = useState("");
  const [authState, setAuthState] = useState<"checking" | "unauth" | "ready">("checking");
  const [data, setData] = useState<AdminPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState("");
  const [changeInput, setChangeInput] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/analytics", { cache: "no-store" });
      if (res.status === 401) {
        setAuthState("unauth");
        setData(null);
        return;
      }
      const json = (await res.json()) as AdminPayload;
      setData(json);
      setAuthState("ready");
    } catch (err) {
      setError("Failed to load analytics. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Incorrect password");
        setAuthState("unauth");
        return;
      }
      setPassword("");
      await fetchData();
    } catch (err) {
      setError("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async () => {
    if (!noteInput.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: noteInput.trim() }),
      });
      if (res.ok) {
        setNoteInput("");
        await fetchData();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChange = async () => {
    if (!changeInput.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/change-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: changeInput.trim() }),
      });
      if (res.ok) {
        setChangeInput("");
        await fetchData();
      }
    } finally {
      setLoading(false);
    }
  };

  const latestCountries = useMemo(() => {
    if (!data) return [] as string[];
    const countries = data.analytics
      .map((a) => a.location?.country)
      .filter(Boolean) as string[];
    return Array.from(new Set(countries)).slice(0, 6);
  }, [data]);

  if (authState !== "ready") {
    return (
      <div className="nf min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full border border-zinc-200 rounded-3xl p-6 bg-white/70 backdrop-blur">
          <div className="text-xl mb-2">Admin Analytics</div>
          <p className="text-sm text-zinc-600 mb-4">
            Enter the admin password to view analytics, visits, change messages and notes.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-zinc-200 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black text-white rounded-lg py-2 hover:bg-zinc-800 disabled:opacity-60"
          >
            {loading ? "Checking..." : "Unlock"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="nf min-h-screen px-6 pb-12 pt-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl">Analytics Dashboard</div>
          <p className="text-sm text-zinc-600">Visits, events, change messages and notes</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchData}
            className="px-4 py-2 rounded-lg border border-zinc-200 hover:bg-black hover:text-white transition"
          >
            Refresh
          </button>
          <button
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              setAuthState("unauth");
            }}
            className="px-4 py-2 rounded-lg border border-zinc-200 text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Visits" value={data?.visits ?? 0} />
        <StatCard label="Events Logged" value={data?.totals.analyticsTotal ?? 0} />
        <StatCard label="Notes" value={data?.totals.notesTotal ?? 0} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormCard
          title="Add Change Message"
          value={changeInput}
          placeholder="e.g. Shipped analytics dashboard"
          onChange={setChangeInput}
          onSubmit={handleCreateChange}
          buttonLabel="Add Message"
        />
        <FormCard
          title="Add Note"
          value={noteInput}
          placeholder="Internal note..."
          onChange={setNoteInput}
          onSubmit={handleCreateNote}
          buttonLabel="Save Note"
          textarea
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ListCard
          title="Recent Change Messages"
          items={data?.changeMessages || []}
          render={(item: ChangeMessage) => (
            <div className="flex items-start justify-between gap-2">
              <span>{item.message}</span>
              <span className="text-xs text-zinc-500">{formatDate(item.createdAt)}</span>
            </div>
          )}
        />
        <ListCard
          title="Notes"
          items={data?.notes || []}
          render={(item: Note) => (
            <div className="flex items-start justify-between gap-2">
              <span>{item.content}</span>
              <span className="text-xs text-zinc-500">{formatDate(item.createdAt)}</span>
            </div>
          )}
        />
      </div>

      <div className="border border-zinc-200 rounded-3xl p-4 bg-white/70 backdrop-blur">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-semibold">Latest Analytics ({data?.analytics.length ?? 0})</div>
            <div className="text-xs text-zinc-500">Showing newest first</div>
          </div>
          {latestCountries.length > 0 && (
            <div className="text-xs text-zinc-600">Countries: {latestCountries.join(", ")}</div>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-zinc-500 border-b border-zinc-200">
                <th className="py-2 pr-3">Time</th>
                <th className="py-2 pr-3">Page</th>
                <th className="py-2 pr-3">Referrer</th>
                <th className="py-2 pr-3">Device</th>
                <th className="py-2 pr-3">Location</th>
                <th className="py-2 pr-3">IP</th>
              </tr>
            </thead>
            <tbody>
              {(data?.analytics || []).map((item) => (
                <tr key={item._id} className="border-b border-zinc-100">
                  <td className="py-2 pr-3 whitespace-nowrap">{formatDate(item.createdAt)}</td>
                  <td className="py-2 pr-3">{item.page || "-"}</td>
                  <td className="py-2 pr-3 truncate max-w-[180px]">{item.referrer || "-"}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    {item.device?.type || ""} {item.device?.browser && `• ${item.device.browser}`} {item.device?.os && `• ${item.device.os}`}
                  </td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    {item.location?.city || ""} {item.location?.country && `(${item.location.country})`}
                  </td>
                  <td className="py-2 pr-3">{item.ip || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-zinc-200 rounded-3xl p-4 bg-white/70 backdrop-blur">
      <div className="text-sm text-zinc-500">{label}</div>
      <div className="text-2xl mt-1">{value}</div>
    </div>
  );
}

function FormCard({
  title,
  value,
  onChange,
  onSubmit,
  placeholder,
  buttonLabel,
  textarea,
}: {
  title: string;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder: string;
  buttonLabel: string;
  textarea?: boolean;
}) {
  return (
    <div className="border border-zinc-200 rounded-3xl p-4 bg-white/70 backdrop-blur flex flex-col gap-3">
      <div className="font-semibold">{title}</div>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-zinc-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black min-h-[46px] h-28"
        />
      ) : (
        <input
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-zinc-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black min-h-[46px]"
        />
      )}
      <button
        onClick={onSubmit}
        className="self-start px-4 py-2 rounded-lg bg-black text-white hover:bg-zinc-800"
      >
        {buttonLabel}
      </button>
    </div>
  );
}

function ListCard<T>({
  title,
  items,
  render,
}: {
  title: string;
  items: T[];
  render: (item: T) => ReactNode;
}) {
  return (
    <div className="border border-zinc-200 rounded-3xl p-4 bg-white/70 backdrop-blur">
      <div className="font-semibold mb-2">{title}</div>
      <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
        {items.length === 0 && <div className="text-sm text-zinc-500">Nothing yet</div>}
        {items.map((item, idx) => (
          <div key={idx} className="border border-zinc-100 rounded-lg px-3 py-2 bg-white/70">
            {render(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
