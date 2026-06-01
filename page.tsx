"use client";

import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [demoBudget, setDemoBudget] = useState(150);

  return (
    <div className="min-height-screen bg-dark text-white relative overflow-hidden font-sans">
      {/* Ambient background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-[100px] pointer-events-none" />

      {/* Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10 border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍱</span>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
            BudgetBite AI
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#college" className="hover:text-white transition">College Edition</a>
        </div>
        <div className="flex gap-4">
          <Link href="/onboarding" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-orange-500 font-bold hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] transition duration-200">
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center relative z-10">
        <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-black tracking-widest uppercase inline-block mb-6 animate-pulse">
          🚀 AGENTIC BUDGET NUTRITION PLATFORM
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Eat Like a <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">King</span><br />
          On a <span className="text-orange-400">Student's</span> Budget.
        </h1>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-medium leading-relaxed mb-10">
          BudgetBite AI optimizes daily macros and engineers clinical-grade meal plans that stay strictly within your budget limit. Backed by real Bengaluru restaurant cost index mapping.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/onboarding" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-black font-extrabold hover:bg-gray-100 hover:scale-105 transition duration-200 shadow-xl shadow-white/5">
            Optimize My Diet Now
          </Link>
          <a href="#college" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition duration-200">
            Learn More
          </a>
        </div>
      </header>

      {/* Interactive Micro-demo Widget */}
      <section className="max-w-4xl mx-auto px-6 mb-24 relative z-10">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative">
          <div className="absolute -top-3 -right-3 px-3 py-1 rounded bg-orange-500 text-[10px] font-black tracking-wider uppercase">DEMO WIDGET</div>
          
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>⚡</span> Real-time Optimization Calculator
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                Adjust Daily Budget Limit:
              </label>
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl font-extrabold text-emerald-400">₹{demoBudget}</span>
                <span className="text-xs text-gray-500 font-semibold">Max Cap: ₹500</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="500" 
                step="25"
                value={demoBudget} 
                onChange={(e) => setDemoBudget(parseInt(e.target.value))}
                className="w-full h-1.5 rounded bg-white/10 accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-600 font-bold mt-2">
                <span>₹100 (Street Level)</span>
                <span>₹500 (Premium Meal)</span>
              </div>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Engineered Optimal Menu</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                  <span>🍳 Eggs Scramble & Toast</span>
                  <span className="text-emerald-400 font-bold">₹{Math.round(demoBudget * 0.25)}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                  <span>🍛 Chickpeas & Saffron Rice</span>
                  <span className="text-emerald-400 font-bold">₹{Math.round(demoBudget * 0.45)}</span>
                </div>
                <div className="flex justify-between text-sm pb-2">
                  <span>🍗 Grilled Tandoori Breast</span>
                  <span className="text-emerald-400 font-bold">₹{Math.round(demoBudget * 0.30)}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-bold text-gray-400">
                <span>Total Macros Predicted:</span>
                <span className="text-white font-extrabold">🔋 {Math.round(demoBudget * 0.3) + 110}g Protein | {Math.round(demoBudget * 2) + 1200} kcal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-12 relative z-10 border-t border-white/5">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center tracking-tight mb-16">
          Funded Startup Architecture. <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">Elite Tools.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition duration-200">
            <span className="text-4xl mb-6 block">🍔</span>
            <h3 className="text-xl font-bold mb-3">AI Budget Curation</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Curates strict budget compliant menus using lean mass BMR multipliers. Integrates available local pantry items in milliseconds.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition duration-200">
            <span className="text-4xl mb-6 block">📸</span>
            <h3 className="text-xl font-bold mb-3">Pantry Vision Scanner</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Upload photos of your fridge or cabinet. GPT-4o Vision detects ingredients instantly and suggests recipes utilizing existing inventory.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition duration-200">
            <span className="text-4xl mb-6 block">⚡</span>
            <h3 className="text-xl font-bold mb-3">RAG Coaching Chat</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Talk directly with BiteCoach, a chat companion backed by TF-IDF scientific research databases mapping verified nutrition guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* College Project Highlight */}
      <section id="college" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-white/5">
        <div className="bg-gradient-to-r from-emerald-500/10 to-orange-500/10 border border-emerald-500/20 rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="px-3 py-1 rounded bg-orange-500/20 text-orange-400 text-[10px] font-black tracking-widest uppercase inline-block mb-4">COLLEGE PROJECT KILLER FEATURE</span>
            <h3 className="text-3xl font-extrabold mb-4">Swiggy & Zomato Receipt Budget Analyzer</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
              Simply copy-paste your raw delivery checkout texts or bill contents. Our engine extracts the order, identifies dishes, calculates macros, rates your cost efficiency against Bengaluru CSV indices, and suggests healthier local alternative kitchens in real-time!
            </p>
            <div className="flex gap-4">
              <Link href="/onboarding" className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-extrabold text-sm transition">
                Try Analyzer Free
              </Link>
            </div>
          </div>
          <div className="bg-black/60 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-500 text-[8px] font-bold">ANALYZED STATE</div>
            <h4 className="text-xs text-gray-500 font-bold uppercase mb-3">Copy-Paste Input Panel</h4>
            <div className="p-3 bg-white/5 rounded border border-white/10 text-[11px] text-gray-300 font-mono mb-4">
              Meghana Foods (Bangalore)<br />
              1x Chicken Biryani Combo — ₹350.00<br />
              Delivered to: Indiranagar
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Predicted Calories:</span>
                <span className="font-bold">🔋 850 kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Protein Per Rupee:</span>
                <span className="text-emerald-400 font-bold">₹ 0.091g / Rupee</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cost Rating:</span>
                <span className="text-orange-400 font-bold">⚖️ AVERAGE VALUE ORDER</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 text-center text-xs text-gray-600 font-bold relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>BudgetBite AI © 2026. Made with ❤️ for Students and Professionals.</p>
        <div className="flex gap-6">
          <span>📶 FastAPI SQLite/Postgres Engines</span>
          <span>•</span>
          <span>🧠 OpenAI Vision RAG Integrated</span>
        </div>
      </footer>
    </div>
  );
}
