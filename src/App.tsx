import { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  ShieldCheck,
  Copy,
  Check,
  Zap,
  MessageSquare,
  Users,
  Lock,
  ChevronDown,
  QrCode,
  Loader2,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { fetchLatestRelease, type AppRelease } from './lib/supabase';

const DEFAULT_DOWNLOAD_URL =
  import.meta.env.VITE_FALLBACK_DOWNLOAD_URL ||
  'https://vabndvvzlbfzlccrpwcc.supabase.co/storage/v1/object/public/app-releases/athar-latest.apk';

const FALLBACK_RELEASE: AppRelease = {
  id: 'fallback',
  latest_version: '1.0.9',
  min_required_version: '1.0.0',
  title: 'Athar v1.0.9 is available',
  release_notes:
    '• Fixed discussion publishing category constraints\n• Dynamic notch-aware dark theme toggle\n• In-app 6-digit Email confirmation (OTP)\n• VIP early access invite pass (ATHAR-2026)\n• Dark mode support across Profile & Invites',
  download_url: DEFAULT_DOWNLOAD_URL,
  is_active: true,
  created_at: new Date().toISOString(),
};

export default function App() {
  const [release, setRelease] = useState<AppRelease>(FALLBACK_RELEASE);
  const [loadingRelease, setLoadingRelease] = useState<boolean>(true);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  useEffect(() => {
    async function loadRelease() {
      setLoadingRelease(true);
      const data = await fetchLatestRelease();
      if (data) {
        // If the database has a GitHub release URL that may be private, fallback to public Supabase APK if needed
        const validDownloadUrl =
          data.download_url && !data.download_url.includes('github.com')
            ? data.download_url
            : DEFAULT_DOWNLOAD_URL;

        setRelease({
          ...data,
          download_url: validDownloadUrl,
        });
      }
      setLoadingRelease(false);
    }
    loadRelease();
  }, []);

  const handleCopyCode = (code = 'ATHAR-2026') => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(release.download_url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-100 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Glow Ambient Highlights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[380px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="fixed top-1/3 -left-48 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* ================= NAVIGATION ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0F14]/80 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/5 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-950/40 p-1.5">
              <img src="/logo.png" alt="Athar Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-[0.2em] text-lg text-white">ATHAR</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  أثر
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">Where great minds meet</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Philosophy</a>
            <a href="#download" className="hover:text-emerald-400 transition-colors">Download</a>
            <a href="#installation" className="hover:text-emerald-400 transition-colors">Installation</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCopyCode('ATHAR-2026')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 text-xs font-mono text-slate-300 transition-all hover:bg-white/[0.07]"
              title="Click to copy VIP Access Token"
            >
              <span className="text-emerald-400 font-bold">TOKEN:</span>
              <span>ATHAR-2026</span>
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            <a
              href="#download"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Get APK</span>
            </a>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-5">
        <div className="max-w-5xl mx-auto text-center">
          {/* Signal Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium mb-8 backdrop-blur-sm animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Private Network & High-Signal Discussions for Algeria</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
            Where great minds meet <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              outside social media noise.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-10">
            A sanctuary for Algerian builders, software architects, researchers, and thinkers.
            No dopamine traps, no mindless algorithmic feeds—just deep conversations, hard-earned lessons, and real signal.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={release.download_url}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-base tracking-wide transition-all shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-3"
            >
              <Smartphone className="w-5 h-5 text-slate-950" />
              <span>Download for Android (v{release.latest_version})</span>
            </a>

            <button
              onClick={() => setShowQrModal(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 text-slate-200 font-semibold text-base transition-all flex items-center justify-center gap-2.5"
            >
              <QrCode className="w-5 h-5 text-emerald-400" />
              <span>Scan QR Code</span>
            </button>
          </div>

          {/* Token Copy Prompt */}
          <div className="inline-flex items-center gap-2 p-2 px-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-slate-400">
            <span>Early Access Pass:</span>
            <code className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              ATHAR-2026
            </code>
            <button
              onClick={() => handleCopyCode('ATHAR-2026')}
              className="text-slate-400 hover:text-white transition-colors ml-1"
              title="Copy code"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick Specs Pill */}
          <div className="mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Version</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                v{release.latest_version}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Architecture</span>
              <span className="text-sm font-bold text-white mt-0.5 block">ARM64 & x86_64</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Compatibility</span>
              <span className="text-sm font-bold text-white mt-0.5 block">Android 8.0+</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Size</span>
              <span className="text-sm font-bold text-white mt-0.5 block">~48 MB</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIVE MOCKUP / APP PREVIEW ================= */}
      <section className="relative py-12 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-2 md:p-3 border border-white/10 shadow-2xl shadow-black/80">
            {/* Mockup Frame */}
            <div className="rounded-2xl bg-[#0E131B] border border-white/[0.08] p-5 sm:p-8 overflow-hidden">
              {/* Mockup Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  <span className="text-xs font-mono text-slate-400 ml-2">Athar Discussion Stream</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Verified Network</span>
                </div>
              </div>

              {/* Sample Discussion Cards */}
              <div className="space-y-4">
                {/* Discussion 1 */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-xs text-emerald-400">
                        YA
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">Youcef A.</span>
                          <span className="text-xs text-slate-400">• 2h ago</span>
                        </div>
                        <span className="text-xs text-slate-400">Distributed Systems Engineer • Algiers</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-slate-300">
                      Discussions
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    Why we migrated our core ledger from multi-region PostgreSQL to local SQLite with sync
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                    Running high-throughput distributed DB connections in Algerian cellular infrastructure caused unexpected latency spikes.
                    Here is the benchmark data after 6 months in production and how offline-first changed our sync resilience.
                  </p>

                  <div className="flex items-center gap-6 mt-4 pt-3 border-t border-white/[0.04] text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <MessageSquare className="w-3.5 h-3.5" />
                      34 in-depth insights
                    </span>
                    <span>•</span>
                    <span>142 thoughtful marks</span>
                  </div>
                </div>

                {/* Discussion 2 */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center font-bold text-xs text-teal-300">
                        SB
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">Sofiane B.</span>
                          <span className="text-xs text-slate-400">• 5h ago</span>
                        </div>
                        <span className="text-xs text-slate-400">Hardware & Embedded Architect • Constantine</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-slate-300">
                      Tech
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    Custom LoRaWAN gateway deployments in the Sahara: Overcoming thermal throttling
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                    When outdoor enclosures exceed 55°C, passive cooling heatsinks degrade chip clock speeds by up to 35%.
                    Observations on custom thermal casing and industrial power management.
                  </p>

                  <div className="flex items-center gap-6 mt-4 pt-3 border-t border-white/[0.04] text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <MessageSquare className="w-3.5 h-3.5" />
                      19 technical breakdowns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE PHILOSOPHY / PILLARS ================= */}
      <section id="features" className="py-20 px-5 border-t border-white/[0.06] relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              Architectural Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built intentionally different from today's feeds.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.07] hover:border-emerald-500/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5">High-Signal Discussions</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Posts are structured around ideas, systems, and hard technical lessons. No reaction baits, no low-effort memes, and no sponsored distractions.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.07] hover:border-emerald-500/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5">Invite-Only Circle</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Every member enters through an invitation pass. This preserves community etiquette, intellectual rigor, and trust across all discussions.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.07] hover:border-emerald-500/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5">Native & Autonomous</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Compiled to native Android bytecode with zero external tracking SDKs. You control your profile, data, and participation without third-party ad brokers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DYNAMIC RELEASE & DOWNLOAD SECTION ================= */}
      <section id="download" className="py-20 px-5 border-t border-white/[0.06] bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              Verified Alpha Build
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Get the latest release.
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Directly download the signed APK without third-party app stores.
            </p>
          </div>

          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[90px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Left Column: Version Details & Release Notes */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-sm font-mono flex items-center gap-2">
                    {loadingRelease ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                    Athar v{release.latest_version}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {loadingRelease ? 'Syncing...' : 'Latest Active Release'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {release.title || `Athar v${release.latest_version}`}
                </h3>

                {/* Release Notes */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] text-xs sm:text-sm text-slate-300 font-mono leading-relaxed whitespace-pre-line">
                  {release.release_notes || 'Performance enhancements, dark mode polish, and community security updates.'}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
                  <span>Target: Android 8.0+</span>
                  <span>•</span>
                  <span>Binary: ARM64-v8a</span>
                  <span>•</span>
                  <span>Direct Download via Supabase Storage</span>
                </div>
              </div>

              {/* Right Column: Download Actions & QR Code */}
              <div className="w-full lg:w-72 flex flex-col items-center bg-black/30 p-6 rounded-2xl border border-white/[0.06] text-center">
                <div className="p-3 bg-white rounded-2xl shadow-xl shadow-black/60 mb-4">
                  <QRCodeSVG
                    value={release.download_url}
                    size={140}
                    level="M"
                    includeMargin={false}
                    fgColor="#0B0F14"
                    bgColor="#FFFFFF"
                  />
                </div>
                <span className="text-[11px] text-slate-400 font-medium mb-4 flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                  Scan with your phone to download
                </span>

                <a
                  href={release.download_url}
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mb-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download APK</span>
                </a>

                <button
                  onClick={handleCopyLink}
                  className="w-full py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link copied!' : 'Copy direct link'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3-STEP INSTALLATION GUIDE ================= */}
      <section id="installation" className="py-20 px-5 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              Installation Guide
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How to install in 3 quick steps.
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Installing an APK on Android takes less than 30 seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-extrabold text-sm flex items-center justify-center mb-4">
                1
              </span>
              <h3 className="text-base font-bold text-white mb-2">Download the APK</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tap the <strong>Download APK</strong> button above. If Chrome warns <em>"File might be harmful"</em>, tap <strong>Download anyway</strong> (standard Android notice for apps outside Play Store).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-extrabold text-sm flex items-center justify-center mb-4">
                2
              </span>
              <h3 className="text-base font-bold text-white mb-2">Allow Unknown Apps</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Open the downloaded file. When prompted by your phone settings, toggle <strong>Allow from this source</strong> to authorize your browser or file manager to install the package.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-extrabold text-sm flex items-center justify-center mb-4">
                3
              </span>
              <h3 className="text-base font-bold text-white mb-2">Use Early Access Token</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Launch Athar, tap <strong>Sign Up</strong>, and use token <code className="text-emerald-400 font-bold">ATHAR-2026</code>. Verify your email with the 6-digit OTP to access the network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="py-20 px-5 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Everything you need to know.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Why is Athar distributed via direct APK instead of Google Play Store?',
                a: 'During our alpha phase, direct APK distribution allows our engineering team to ship updates, bug fixes, and security improvements directly to members within minutes—without enduring multi-week store review holds.'
              },
              {
                q: 'Is this APK safe for my Android device?',
                a: 'Yes, 100%. The APK is compiled directly from our audited source repository using standard Android Gradle tooling. It contains zero third-party telemetry, ad frameworks, or intrusive background trackers.'
              },
              {
                q: 'How do app updates work once Athar is installed?',
                a: 'Athar features an integrated in-app update detector connected to our Supabase database. Whenever a new version is published, an update modal appears directly inside the app with release notes and a 1-tap update action.'
              },
              {
                q: 'How can I get an invite code if I do not have one?',
                a: 'For our early alpha launch, you can use the official community early access code ATHAR-2026 during signup. Each verified member subsequently receives personal invitation passes to onboard colleagues.'
              },
              {
                q: 'Is there an iOS / iPhone version planned?',
                a: 'Yes. An iOS build configured for TestFlight is in preparation. Android was chosen for the alpha due to its native APK distribution flexibility in Algeria.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-base font-bold text-white hover:text-emerald-400 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      activeFaq === idx ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-slate-300 leading-relaxed border-t border-white/[0.04] pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QR CODE MODAL ================= */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-[#0E131B] border border-white/10 p-6 text-center relative shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Scan to Download</h3>
            <p className="text-xs text-slate-400 mb-6">Point your Android camera at the QR code</p>

            <div className="p-4 bg-white rounded-2xl mx-auto w-fit shadow-xl mb-6">
              <QRCodeSVG
                value={release.download_url}
                size={180}
                level="M"
                includeMargin={false}
                fgColor="#0B0F14"
                bgColor="#FFFFFF"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setShowQrModal(false)}
                className="flex-1 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 text-xs font-semibold transition-colors"
              >
                Close
              </button>
              <a
                href={release.download_url}
                className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
              >
                Download APK
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto border-t border-white/[0.06] py-12 px-5 bg-black/40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center p-1">
              <img src="/logo.png" alt="Athar" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-extrabold tracking-widest text-sm text-white">ATHAR • أثر</span>
              <p className="text-xs text-slate-500">Built for Algerian builders & thinkers 🇩🇿</p>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} Athar Network. All rights reserved. Zero trackers.
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Philosophy</a>
            <span>•</span>
            <a href="#download" className="hover:text-emerald-400 transition-colors">Releases</a>
            <span>•</span>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
