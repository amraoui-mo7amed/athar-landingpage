import { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  ShieldCheck,
  Copy,
  Check,
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Subtle Background Lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-emerald-50/60 via-teal-50/30 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* ================= NAVIGATION ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-slate-200/80 transition-all">
        <div className="max-w-6xl mx-auto px-5 h-20 flex items-center justify-between">
          {/* Full Navbar Logo */}
          <a href="#" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img
              src="/full-logo.svg"
              alt="Athar — Where Great Minds Meet"
              className="h-11 w-auto object-contain"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#philosophy" className="hover:text-emerald-600 transition-colors">Philosophy</a>
            <a href="#download" className="hover:text-emerald-600 transition-colors">Download</a>
            <a href="#installation" className="hover:text-emerald-600 transition-colors">Installation</a>
            <a href="#faq" className="hover:text-emerald-600 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCopyCode('ATHAR-2026')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 transition-all"
              title="Click to copy Early Access Token"
            >
              <span className="text-emerald-600 font-bold">TOKEN:</span>
              <span className="font-semibold">ATHAR-2026</span>
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            <a
              href="#download"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm shadow-emerald-600/20 hover:shadow-emerald-600/30 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Get APK</span>
            </a>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-5">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.12]">
            Where great minds meet <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              outside social media noise.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-10">
            A focused sanctuary for software engineers, systems architects, builders, and deep thinkers.
            No brainrot reels, no engagement traps—pure signal, thoughtful discussions, and authentic peer exchange.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={release.download_url}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base tracking-wide transition-all shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 hover:-translate-y-0.5 flex items-center justify-center gap-3"
            >
              <Smartphone className="w-5 h-5 text-emerald-100" />
              <span>Download for Android (v{release.latest_version})</span>
            </a>

            <button
              onClick={() => setShowQrModal(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-base transition-all flex items-center justify-center gap-2.5 shadow-xs"
            >
              <QrCode className="w-5 h-5 text-emerald-600" />
              <span>Scan QR Code</span>
            </button>
          </div>

          {/* Token Copy Prompt */}
          <div className="inline-flex items-center gap-2 p-2 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 shadow-xs">
            <span>Early Access Token:</span>
            <code className="text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ATHAR-2026
            </code>
            <button
              onClick={() => handleCopyCode('ATHAR-2026')}
              className="text-slate-400 hover:text-slate-700 transition-colors ml-1"
              title="Copy code"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick Specs Grid */}
          <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Version</span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                v{release.latest_version}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Architecture</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">ARM64 & x86_64</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Compatibility</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">Android 8.0+</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Package Size</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">~35 MB</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE PHILOSOPHY / PILLARS ================= */}
      <section id="philosophy" className="py-20 px-5 border-t border-slate-200 bg-slate-50/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-2">
              Foundational Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Crafted intentionally different from modern social feeds.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2.5">High-Signal Discussions</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Posts are structured around ideas, systems, and technical learnings. No reaction baiting, no superficial memes, and zero sponsored distractions.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2.5">Thoughtful Community</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Onboarding requires early access tokens. This safeguards community etiquette, intellectual depth, and mutual respect across discussions.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2.5">Autonomous & Private</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Native Android performance with zero third-party behavioral ad trackers. Your data remains your own, free from telemetry brokers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DYNAMIC RELEASE & DOWNLOAD SECTION ================= */}
      <section id="download" className="py-20 px-5 border-t border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-2">
              Verified Distribution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get the latest release.
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              Directly download the signed APK without third-party app stores.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Left Column: Version Details & Release Notes */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-800 font-extrabold text-sm font-mono flex items-center gap-2">
                    {loadingRelease ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                    Athar v{release.latest_version}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {loadingRelease ? 'Syncing...' : 'Latest Active Release'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {release.title || `Athar v${release.latest_version}`}
                </h3>

                {/* Release Notes */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 font-mono leading-relaxed whitespace-pre-line shadow-xs">
                  {release.release_notes || 'Performance enhancements, dark mode polish, and community security updates.'}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500">
                  <span>Target: Android 8.0+</span>
                  <span>•</span>
                  <span>Binary: ARM64-v8a</span>
                  <span>•</span>
                  <span>Direct Download via Supabase Storage</span>
                </div>
              </div>

              {/* Right Column: Download Actions & QR Code */}
              <div className="w-full lg:w-72 flex flex-col items-center bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
                <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm mb-4">
                  <QRCodeSVG
                    value={release.download_url}
                    size={140}
                    level="M"
                    includeMargin={false}
                    fgColor="#0F172A"
                    bgColor="#FFFFFF"
                  />
                </div>
                <span className="text-[11px] text-slate-500 font-medium mb-4 flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                  Scan with your phone camera
                </span>

                <a
                  href={release.download_url}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm tracking-wide transition-all shadow-sm shadow-emerald-600/20 flex items-center justify-center gap-2 mb-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download APK</span>
                </a>

                <button
                  onClick={handleCopyLink}
                  className="w-full py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link copied!' : 'Copy direct link'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3-STEP INSTALLATION GUIDE ================= */}
      <section id="installation" className="py-20 px-5 border-t border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-2">
              Installation Guide
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How to install in 3 quick steps.
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              Installing an APK on Android takes less than 30 seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-sm flex items-center justify-center mb-4">
                1
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Download the APK</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tap the <strong>Download APK</strong> button above. If Chrome shows <em>"File might be harmful"</em>, tap <strong>Download anyway</strong> (standard Android notice for apps outside Play Store).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-sm flex items-center justify-center mb-4">
                2
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Allow Unknown Apps</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Open the downloaded file. When prompted by your phone settings, toggle <strong>Allow from this source</strong> to authorize your browser or file manager to install the package.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-sm flex items-center justify-center mb-4">
                3
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Use Early Access Token</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Launch Athar, tap <strong>Sign Up</strong>, and use token <code className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">ATHAR-2026</code>. Verify your email with the 6-digit OTP to access the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="py-20 px-5 border-t border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-2">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Everything you need to know.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Why is Athar distributed via direct APK instead of Google Play Store?',
                a: 'During our alpha phase, direct APK distribution enables our engineering team to ship updates, performance fixes, and community features within minutes without weeks of store review holds.'
              },
              {
                q: 'Is this APK safe for my Android device?',
                a: 'Yes, 100%. The APK is compiled directly from audited React Native source code using standard Android Gradle tools. It contains zero third-party telemetry, ads, or background tracking services.'
              },
              {
                q: 'How do app updates work once Athar is installed?',
                a: 'Athar features an integrated in-app update detector connected to our Supabase database. Whenever a new version is released, an update dialog appears directly inside the app with release notes and a 1-tap update action.'
              },
              {
                q: 'How can I get an invite code if I do not have one?',
                a: 'For our early alpha launch, you can use the community early access token ATHAR-2026 during registration. Verified members subsequently receive personal invitation tokens to onboard colleagues.'
              },
              {
                q: 'Is there an iOS / iPhone version planned?',
                a: 'Yes. An iOS build configured for TestFlight is in preparation. Android was chosen for the initial alpha due to its fast APK release iteration and direct distribution.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      activeFaq === idx ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-200/80 pt-3">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white border border-slate-200 p-6 text-center relative shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Scan to Download</h3>
            <p className="text-xs text-slate-500 mb-6">Point your Android camera at the QR code</p>

            <div className="p-4 bg-slate-50 rounded-2xl mx-auto w-fit border border-slate-200 mb-6">
              <QRCodeSVG
                value={release.download_url}
                size={180}
                level="M"
                includeMargin={false}
                fgColor="#0F172A"
                bgColor="#F8FAFC"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setShowQrModal(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                Close
              </button>
              <a
                href={release.download_url}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-600/20"
              >
                Download APK
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto border-t border-slate-200 py-12 px-5 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <img src="/full-logo.svg" alt="Athar" className="h-8 w-auto object-contain" />
          </div>

          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} Athar. All rights reserved. Zero trackers.
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
            <a href="#philosophy" className="hover:text-emerald-600 transition-colors">Philosophy</a>
            <span>•</span>
            <a href="#download" className="hover:text-emerald-600 transition-colors">Releases</a>
            <span>•</span>
            <a href="#faq" className="hover:text-emerald-600 transition-colors">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
