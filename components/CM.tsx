"use client";

import React, { useState } from "react";

export default function ContactModal({
  open,
  onClose,
  anonymous = false,
}: {
  open: boolean;
  onClose: () => void;
  anonymous?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: anonymous ? "Anonymous" : "",
    email: anonymous ? "anonymous@no-reply.com" : "",
    message: "",
  });

  const submitHandler = async () => {
    if (!form.message) return alert("Message cannot be empty");

    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      alert("Message sent 🚀");
      setForm({
        name: anonymous ? "Anonymous" : "",
        email: anonymous ? "anonymous@no-reply.com" : "",
        message: "",
      });
      onClose();
    } else {
      alert("Failed to send message");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {anonymous ? "Send Anonymous Message" : "Send a Message"}
        </h2>

        <div className="space-y-3">
          {!anonymous && (
            <>
              <input
                placeholder="Your Name"
                className="w-full border rounded-lg px-4 py-2"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              
            </>
          )}

          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full border rounded-lg px-4 py-2"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <button
            onClick={submitHandler}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-zinc-800 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </div>
  );
}
