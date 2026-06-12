"use client"

import { FormEvent, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

const CONTACT_EMAIL = "simba.1w34@gmail.com"

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose, open])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const subject = encodeURIComponent(`Portfolio contact from ${name || "visitor"}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-background/18 backdrop-blur-[2px]"
            onClick={onClose}
            aria-label="Close contact panel"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/12 bg-[#070b12]/82 text-slate-100 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
          >
            <div className="grid h-11 grid-cols-[1fr_auto_1fr] items-center border-b border-white/10 bg-white/[0.04] px-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#ffbd2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </div>
              <p className="font-mono text-xs text-slate-400">aman — ~/feedback</p>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="grid size-7 place-items-center rounded-md text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-100"
                  aria-label="Close contact panel"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-primary/10" aria-hidden="true" />

              <form onSubmit={handleSubmit} className="relative px-5 py-6 sm:px-8 md:px-10 md:py-8">
                <div className="mb-7 font-mono">
                  <p className="text-sm text-cyan-200">$ contact aman</p>
                  <p className="mt-2 text-sm text-slate-400">
                    say hi -&gt; <a className="text-cyan-200 underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-xs text-slate-400">&gt; name:</span>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      autoComplete="name"
                      className="h-11 rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-200/45"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-xs text-slate-400">&gt; email:</span>
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      type="email"
                      autoComplete="email"
                      className="h-11 rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-200/45"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="mt-4 flex flex-col gap-2">
                  <span className="font-mono text-xs text-slate-400">&gt; message:</span>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                    rows={6}
                    className="min-h-36 resize-none rounded-md border border-white/10 bg-white/[0.035] px-3 py-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-200/45"
                    placeholder="Write a quick note"
                  />
                </label>

                <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-cyan-200/30 bg-cyan-200/10 px-4 font-mono text-sm font-medium text-cyan-100 transition-colors hover:border-cyan-200/55 hover:bg-cyan-200/15"
                  >
                    send message
                  </button>
                  <p className="min-h-5 font-mono text-xs text-slate-400">
                    {sent ? <span className="text-cyan-200">$ message sent successfully</span> : "opens your email client"}
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
