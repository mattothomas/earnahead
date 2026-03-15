"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, MapPin, DollarSign, TrendingUp, Heart, Shield, Users, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import ZipMap, { MapPin as ZipMapPin } from "@/components/ZipMap";

const CHICAGO_CENTER: [number, number] = [-87.6298, 41.8781];

const DEMO_PINS: ZipMapPin[] = [
  { id: 1, lng: -87.6457, lat: 41.9267, label: "$110", color: "#C8861A" },
  { id: 2, lng: -87.6324, lat: 41.8828, label: "$50",  color: "#9B3333" },
  { id: 3, lng: -87.6219, lat: 41.8952, label: "$300", color: "#2A5BA8" },
  { id: 4, lng: -87.6453, lat: 41.9432, label: "$95",  color: "#C8861A" },
  { id: 5, lng: -87.6261, lat: 41.8826, label: "$8K+", color: "#2D7A5A" },
  { id: 6, lng: -87.6329, lat: 41.8794, label: "$40",  color: "#9B3333" },
  { id: 7, lng: -87.6670, lat: 41.8747, label: "$150", color: "#2A5BA8" },
  { id: 8, lng: -87.6318, lat: 41.8817, label: "$175", color: "#6B4A9B" },
];

export default function FigmaConceptLanding() {
  const [zipCode, setZipCode] = useState("");
  // mapSearchZip: drives the ZipMap search — set when zip is fully typed (5 digits)
  const [mapSearchZip, setMapSearchZip] = useState("");
  // pins hidden until the map has geocoded at least once
  const [pinsVisible, setPinsVisible] = useState(false);
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const [animatedEarnings, setAnimatedEarnings] = useState(0);
  const [animatedOpportunities, setAnimatedOpportunities] = useState(0);

  useEffect(() => {
    const e = setInterval(() => setAnimatedEarnings(p => p < 280 ? p + 7 : 280), 30);
    const o = setInterval(() => setAnimatedOpportunities(p => p < 8 ? p + 1 : 8), 150);
    return () => { clearInterval(e); clearInterval(o); };
  }, []);

  // Auto-trigger map search when hero ZIP reaches 5 digits
  useEffect(() => {
    if (zipCode.length === 5) setMapSearchZip(zipCode);
  }, [zipCode]);

  const navigateToDiscover = (zip: string) => {
    if (zip.length === 5) router.push(`/figma/discover/${zip}`);
  };

  const handleSearch = (ev: React.FormEvent) => {
    ev.preventDefault();
    navigateToDiscover(zipCode);
  };

  return (
    <div style={{ background: '#fff', overflow: 'hidden' }}>
      {/* Hero */}
      <section className="relative min-h-screen pt-8 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.05) 0%, white 50%, rgba(46,92,138,0.05) 100%)' }} />
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-12 gap-8 items-start" style={{ minHeight: '85vh' }}>
            {/* Left */}
            <div className="col-span-5 pt-16 space-y-8">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(107,142,127,0.1)' }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#6B8E7F' }} />
                  <span className="text-sm font-medium" style={{ color: '#6B8E7F' }}>Verified opportunities near you</span>
                </div>
                <h1 className="font-bold leading-none mb-6 tracking-tight" style={{ fontSize: '4.5rem', lineHeight: '0.95' }}>
                  <span style={{ color: '#0A1628' }}>Earn money</span><br />
                  <span style={{ background: 'linear-gradient(90deg, #2E5C8A, #6B8E7F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>while helping</span><br />
                  <span style={{ color: '#0A1628' }}>your community</span>
                </h1>
                <p className="text-xl leading-relaxed mb-8 max-w-md" style={{ color: '#64748B' }}>
                  Discover verified healthcare contribution opportunities. Donate blood, plasma, or participate in medical research.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow" style={{ border: '1px solid #E2E8F0' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(107,142,127,0.1)' }}>
                        <DollarSign className="w-5 h-5" style={{ color: '#6B8E7F' }} />
                      </div>
                      <span className="text-sm" style={{ color: '#64748B' }}>Weekly potential</span>
                    </div>
                    <p className="text-3xl font-bold" style={{ color: '#0A1628' }}>${animatedEarnings}</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow" style={{ border: '1px solid #E2E8F0' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(46,92,138,0.1)' }}>
                        <MapPin className="w-5 h-5" style={{ color: '#2E5C8A' }} />
                      </div>
                      <span className="text-sm" style={{ color: '#64748B' }}>Near you</span>
                    </div>
                    <p className="text-3xl font-bold" style={{ color: '#0A1628' }}>{animatedOpportunities}</p>
                  </motion.div>
                </div>
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text" placeholder="Enter ZIP code to discover opportunities" value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    className="w-full px-6 py-5 rounded-2xl text-lg focus:outline-none transition-colors shadow-sm"
                    style={{ border: '2px solid #E2E8F0', paddingRight: '8rem' }} maxLength={5}
                  />
                  <button type="submit" disabled={zipCode.length !== 5}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 text-white rounded-xl font-medium disabled:opacity-50 flex items-center gap-2"
                    style={{ background: 'linear-gradient(90deg, #2E5C8A, rgba(46,92,138,0.8))' }}>
                    <Search className="w-4 h-4" /> Explore
                  </button>
                </form>
                <div className="flex items-center gap-6 text-sm pt-4" style={{ color: '#64748B' }}>
                  <div className="flex items-center gap-2"><Shield className="w-4 h-4" style={{ color: '#6B8E7F' }} /><span>Verified providers</span></div>
                  <div className="flex items-center gap-2"><Zap className="w-4 h-4" style={{ color: '#6B8E7F' }} /><span>Instant booking</span></div>
                </div>
              </motion.div>
            </div>

            {/* Right – Live Map Preview */}
            <div className="col-span-7 pt-8">
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: 700 }}>
                <ZipMap
                  center={CHICAGO_CENTER}
                  pins={DEMO_PINS}
                  style={{ width: '100%', height: '100%' }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-32" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-12 gap-16 items-center mb-24">
            <div className="col-span-4">
              <div className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#2E5C8A' }}>How it works</div>
              <h2 className="text-5xl font-bold leading-tight mb-6" style={{ color: '#0A1628' }}>
                Simple, transparent,{' '}
                <span style={{ background: 'linear-gradient(90deg, #6B8E7F, #2E5C8A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>impactful</span>
              </h2>
            </div>
            <div className="col-span-8 space-y-6">
              {[
                { n: '01', title: 'Discover verified opportunities', desc: 'Enter your location to see all available donation centers and research studies nearby.', icon: Search },
                { n: '02', title: 'Choose what works for you', desc: 'Review compensation, time requirements, and eligibility. Book appointments that fit your schedule.', icon: Heart },
                { n: '03', title: 'Contribute and track impact', desc: 'Complete your donation or study. Get paid and see the real-world impact you\'re making.', icon: TrendingUp },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
                  <div className="flex gap-8 items-start p-8 rounded-3xl group" style={{ background: 'linear-gradient(135deg, rgba(245,247,249,0.5), transparent)' }}>
                    <div className="flex-shrink-0">
                      <div className="text-6xl font-bold leading-none mb-2" style={{ color: 'rgba(226,232,240,1)' }}>{step.n}</div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ background: 'linear-gradient(135deg, #2E5C8A, #6B8E7F)' }}>
                        <step.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-2xl font-bold mb-3" style={{ color: '#0A1628' }}>{step.title}</h3>
                      <p style={{ color: '#64748B' }}>{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Opportunity Grid */}
      <section className="py-32" style={{ background: 'linear-gradient(180deg, #fff, #F5F7F9)' }}>
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-16" style={{ color: '#0A1628' }}>Contribution opportunities</h2>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <div className="h-full rounded-3xl p-10 text-white relative overflow-hidden group cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #2E5C8A, rgba(46,92,138,0.8))' }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: '#6B8E7F' }} />
                  <span className="text-sm font-medium">Most Popular</span>
                </div>
                <h3 className="text-4xl font-bold mb-4">Plasma Donation</h3>
                <p className="text-lg mb-8 max-w-md" style={{ color: 'rgba(255,255,255,0.9)' }}>Help burn victims and people with immune disorders. Donate twice weekly and earn consistent income.</p>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {[['Compensation', '$100-125'], ['Time', '90 min'], ['Frequency', '2x/week']].map(([k, v]) => (
                    <div key={k}><p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>{k}</p><p className="text-3xl font-bold">{v}</p></div>
                  ))}
                </div>
                <button className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-white/90 transition-all"
                  style={{ background: 'white', color: '#2E5C8A' }} onClick={() => router.push('/figma')}>
                  Find nearby centers <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            {[
              { title: 'Blood Donation', amount: '$50-75', time: '45 min', color: 'linear-gradient(135deg, #6B8E7F, rgba(107,142,127,0.8))' },
              { title: 'Medical Research', amount: '$75-500', time: 'Varies', color: 'linear-gradient(135deg, #0A1628, rgba(10,22,40,0.8))' },
              { title: 'Egg Donation', amount: '$8K-15K', time: 'Multi-week', color: 'linear-gradient(135deg, rgba(107,142,127,0.8), #2E5C8A)' },
              { title: 'Sperm Donation', amount: '$150-200', time: '45 min', color: 'linear-gradient(135deg, rgba(46,92,138,0.7), rgba(107,142,127,0.7))' },
            ].map((item, i) => (
              <div key={i} className="col-span-4">
                <div className="h-full rounded-3xl p-8 text-white cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden"
                  style={{ background: item.color }}>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-3xl font-bold mb-2">{item.amount}</p>
                  <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>{item.time} required</p>
                  <button className="text-sm font-medium flex items-center gap-2">Learn more <ArrowRight className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A1628, #2E5C8A, #6B8E7F)' }}>
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <Users className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Join 12,847 active contributors</span>
          </div>
          <h2 className="text-6xl font-bold text-white mb-6 leading-tight">Start earning while<br />helping your community</h2>
          <p className="text-2xl mb-12" style={{ color: 'rgba(255,255,255,0.9)' }}>Discover verified opportunities near you in under 30 seconds</p>
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
            <div className="flex gap-4">
              <input type="text" placeholder="Enter your ZIP code" value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                className="flex-1 px-8 py-5 rounded-2xl focus:outline-none text-lg" maxLength={5} />
              <button type="submit" disabled={zipCode.length !== 5}
                className="px-10 py-5 text-secondary rounded-2xl font-semibold hover:bg-white/90 transition-all disabled:opacity-50 shadow-xl flex items-center gap-3"
                style={{ background: 'white', color: '#2E5C8A' }}>
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
