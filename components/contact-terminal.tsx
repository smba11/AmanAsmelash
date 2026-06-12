"use client"

import { FormEvent, useMemo, useState } from "react"
import { motion } from "framer-motion"

const CONTACT_EMAIL = "simba.1w34@gmail.com"

const lineAnimation = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
}

export function ContactTerminal() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const messageLength = useMemo(() => message.length, [message])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const subject = encodeURIComponent(`Portfolio contact from ${name || "visitor"}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="grid min-h-screen place-items-center px-4 py-20 md:px-5 md:py-24">
      <div className="relative w-full max-w-4xl">
        <div className="absolute inset-4 rounded-[2rem] bg-primary/10 blur-3xl dark:bg-primary/14" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#080d14]/92 text-slate-100 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl"
        >
          <div className="grid h-11 grid-cols-[1fr_auto_1fr] items-center border-b border-white/10 bg-white/[0.035] px-4">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#ffbd2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
            </div>
            <p className="font-mono text-xs text-slate-400">aman — ~/contact</p>
            <div />
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.09]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
              aria-hidden="true"
            />
            <form onSubmit={handleSubmit} className="relative flex min-h-[31rem] flex-col gap-6 px-5 py-6 font-mono text-sm sm:px-8 md:px-10 md:py-9 md:text-base">
              <motion.div {...lineAnimation} transition={{ delay: 0.05 }} className="flex flex-col gap-2">
                <p>
                  <span className="text-cyan-300">$</span> contact aman
                </p>
                <p className="text-slate-400">
                  say hi -&gt; <a className="text-cyan-300 underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </p>
              </motion.div>

              <motion.label {...lineAnimation} transition={{ delay: 0.15 }} className="flex flex-col gap-2">
                <span className="text-slate-400">&gt; name:</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  autoComplete="name"
                  className="border-0 bg-transparent px-0 py-1 text-slate-100 outline-none placeholder:text-slate-600 focus:ring-0"
                  placeholder="type your name"
                />
              </motion.label>

              <motion.label {...lineAnimation} transition={{ delay: 0.25 }} className="flex flex-col gap-2">
                <span className="text-slate-400">&gt; email:</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  type="email"
                  autoComplete="email"
                  className="border-0 bg-transparent px-0 py-1 text-slate-100 outline-none placeholder:text-slate-600 focus:ring-0"
                  placeholder="you@example.com"
                />
              </motion.label>

              <motion.label {...lineAnimation} transition={{ delay: 0.35 }} className="flex flex-1 flex-col gap-2">
                <span className="flex items-center justify-between gap-4 text-slate-400">
                  <span>&gt; message:</span>
                  <span className="text-xs">({messageLength}/800)</span>
                </span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value.slice(0, 800))}
                  required
                  rows={6}
                  className="min-h-32 resize-none border-0 bg-transparent px-0 py-1 text-slate-100 outline-none placeholder:text-slate-600 focus:ring-0"
                  placeholder="write a quick note"
                />
              </motion.label>

              <motion.div {...lineAnimation} transition={{ delay: 0.45 }} className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-cyan-300/35 bg-cyan-300/10 px-5 font-mono text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-300/60 hover:bg-cyan-300/16"
                >
                  send message<span className="ml-1 animate-pulse">_</span>
                </button>
                <p className="min-h-6 text-sm text-slate-400">
                  {sent ? (
                    <span className="text-cyan-200">$ message sent successfully</span>
                  ) : (
                    <span>press send to open your email client</span>
                  )}
                </p>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
