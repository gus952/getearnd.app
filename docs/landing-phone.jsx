// ============================================
// Earnd Landing — Interactive Phone Prototype
// Browse → Partner Detail → Redeem flow
// ============================================

const PARTNERS = [
{ id: 1, name: "Verde Bowl", category: "Healthy Bowls", tag: "bowls",
  initials: "VB", color: "#3d6852", coverColor: "#c8d9c0",
  distance: "0.3 km", address: "Carrer de Blai 42, Poble Sec", hours: "9:00 – 21:00",
  about: "Fresh bowls packed with whole ingredients. Everything made in-house daily — from dressings to granola.",
  rewards: [
  { type: "discount", title: "20% off your order", conditions: "Min. spend €15", badge: "20%", cls: "sage" },
  { type: "freebie", title: "Free smoothie with any bowl", conditions: "One per visit", badge: "Free", cls: "gold" }]
},
{ id: 2, name: "Jugo Fresco", category: "Juice & Smoothies", tag: "juice",
  initials: "JF", color: "#b5722a", coverColor: "#f0dfc4",
  distance: "0.5 km", address: "Passeig de Gràcia 78, Eixample", hours: "8:00 – 20:00",
  about: "Cold-pressed juices and superfood smoothies. All organic, no added sugars.",
  rewards: [
  { type: "discount", title: "25% off any juice", conditions: "Min. spend €10", badge: "25%", cls: "sage" },
  { type: "freebie", title: "Free energy shot", conditions: "With any smoothie", badge: "Free", cls: "gold" }]
},
{ id: 3, name: "The Clean Kitchen", category: "Clean Eating", tag: "salad",
  initials: "CK", color: "#2d5a5a", coverColor: "#c8ddd8",
  distance: "0.7 km", address: "Carrer d'Aragó 215, Eixample", hours: "10:00 – 22:00",
  about: "Macro-balanced meals for active lifestyles. Eat clean without sacrificing flavour.",
  rewards: [
  { type: "discount", title: "20% off your meal", conditions: "Min. spend €18", badge: "20%", cls: "sage" },
  { type: "freebie", title: "Free side with any main", conditions: "One per visit", badge: "Free", cls: "gold" }]
},
{ id: 4, name: "Açaí Republic", category: "Açaí & Superfoods", tag: "bowls",
  initials: "AR", color: "#6b2d6b", coverColor: "#e0cce0",
  distance: "0.4 km", address: "Carrer de Verdi 36, Gràcia", hours: "8:30 – 19:30",
  about: "Barcelona's açaí bowl specialists. Topped with fresh fruit, granola, and superfoods.",
  rewards: [
  { type: "discount", title: "20% off any bowl", conditions: "Min. spend €12", badge: "20%", cls: "sage" },
  { type: "freebie", title: "Free topping upgrade", conditions: "With any bowl", badge: "Free", cls: "gold" }]
},
{ id: 5, name: "Grain & Green", category: "Salad & Grains", tag: "salad",
  initials: "GG", color: "#4a6b3d", coverColor: "#d4e0c8",
  distance: "0.9 km", address: "Avinguda Diagonal 412, Eixample", hours: "11:00 – 21:30",
  about: "Build-your-own grain bowls and seasonal salads. Locally sourced, sustainably packaged.",
  rewards: [
  { type: "discount", title: "20% off your order", conditions: "Min. spend €14", badge: "20%", cls: "sage" },
  { type: "freebie", title: "Free drink with any salad", conditions: "One per visit", badge: "Free", cls: "gold" }]
},
{ id: 6, name: "Matcha Madre", category: "Matcha & Wellness", tag: "juice",
  initials: "MM", color: "#5a7a3d", coverColor: "#d8e4c8",
  distance: "0.6 km", address: "Carrer del Rec 28, Born", hours: "8:00 – 18:00",
  about: "Ceremonial-grade matcha lattes and wellness drinks. A calm space to refuel after training.",
  rewards: [
  { type: "discount", title: "20% off any drink", conditions: "Min. spend €8", badge: "20%", cls: "sage" },
  { type: "freebie", title: "Free pastry with any latte", conditions: "One per visit", badge: "Free", cls: "gold" }]
}];


// ---- STATUS BAR ----
function EPStatusBar() {
  return (
    <div className="ep-sbar">
      <span>9:41</span>
      <div className="ep-sbar-r">
        <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor"><rect x="0" y="4" width="3" height="6" rx=".5" /><rect x="4" y="2" width="3" height="8" rx=".5" /><rect x="8" y="0" width="3" height="10" rx=".5" /><rect x="12" y="0" width="3" height="10" rx=".5" opacity=".3" /></svg>
        <svg width="24" height="11" viewBox="0 0 24 11" fill="currentColor"><rect x="0" y="0" width="21" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1" /><rect x="21.5" y="3" width="2" height="5" rx="1" opacity=".4" /><rect x="1.5" y="1.5" width="13" height="8" rx="1" /></svg>
      </div>
    </div>);

}

// ---- BROWSE SCREEN ----
function BrowseScreen({ onSelect }) {
  const [filter, setFilter] = React.useState("All");
  const chips = ["All", "Bowls", "Juice", "Salad"];
  const list = filter === "All" ? PARTNERS : PARTNERS.filter((p) => p.tag === filter.toLowerCase());

  return (
    <div className="ep-browse">
      <div className="ep-browse-head">
        <span className="ep-browse-logo">earnd.</span>
        <div className="ep-browse-title">Rewards near you</div>
      </div>
      <div className="ep-chips">
        {chips.map((c) =>
        <button key={c} className={`ep-chip${filter === c ? ' active' : ''}`}
        onClick={(e) => {e.stopPropagation();setFilter(c);}}>
            {c}
          </button>
        )}
      </div>
      <div className="ep-list">
        {list.map((p) =>
        <div key={p.id} className="ep-card" onClick={(e) => {e.stopPropagation();onSelect(p);}}>
            <div className="ep-card-logo" style={{ background: p.color }}>{p.initials}</div>
            <div className="ep-card-info">
              <div className="ep-card-name">{p.name}</div>
              <div className="ep-card-row">
                <span className="ep-card-cat">{p.category}</span>
                <span className="ep-card-dist">{p.distance}</span>
              </div>
              <div className="ep-card-badges">
                {p.rewards.map((r, i) =>
              <span key={i} className={`ep-mini-badge ${r.cls}`}>{r.badge}{r.type === 'discount' ? ' off' : ''}</span>
              )}
              </div>
            </div>
            <svg className="ep-card-chevron" width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="#b7b3a4" strokeWidth="2" strokeLinecap="round"><path d="M1 1l5 5-5 5" /></svg>
          </div>
        )}
      </div>
    </div>);

}

// ---- DETAIL SCREEN ----
function DetailScreen({ partner, onBack, onRedeem }) {
  const p = partner;
  return (
    <div className="ep-detail">
      <div className="ep-detail-cover" style={{ background: `repeating-linear-gradient(45deg,${p.coverColor},${p.coverColor} 8px,rgba(255,255,255,0.3) 8px,rgba(255,255,255,0.3) 16px)` }}>
        <button className="ep-back" onClick={(e) => {e.stopPropagation();onBack();}}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M7 1L1 7l6 6" /></svg>
        </button>
        <div className="ep-detail-logo-chip" style={{ background: '#fff' }}><span style={{ color: p.color, fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontSize: 16 }}>{p.initials.charAt(0).toLowerCase()}.</span></div>
      </div>
      <div className="ep-detail-body">
        <div className="ep-detail-name">{p.name}</div>
        <div className="ep-detail-meta">
          <span className="ep-tag">{p.category}</span>
          <span className="ep-detail-dist"><strong>{p.distance}</strong> away</span>
        </div>
        <div className="ep-detail-addr">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
          <span>{p.address}</span>
        </div>
        <div className="ep-detail-addr">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
          <span>{p.hours}</span>
        </div>
        <div className="ep-map">
          <div className="ep-map-pin" style={{ left: '45%', top: '40%', background: p.color }}></div>
          <div className="ep-map-pin ep-map-pin-you" style={{ left: '65%', top: '55%' }}></div>
        </div>
        <div className="ep-section-title">Active rewards</div>
        {p.rewards.map((r, i) =>
        <div key={i} className="ep-reward">
            <div className={`ep-reward-badge ${r.cls}`}>
              <span className="ep-rb-big">{r.badge}</span>
              {r.type === 'discount' && <span className="ep-rb-sm">off</span>}
            </div>
            <div className="ep-reward-info">
              <div className="ep-reward-title">{r.title}</div>
              <div className="ep-reward-cond">{r.conditions}</div>
            </div>
            <button className="ep-redeem-btn" onClick={(e) => {e.stopPropagation();onRedeem(r);}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        )}
        <div className="ep-section-title">About</div>
        <div className="ep-detail-about">{p.about}</div>
      </div>
    </div>);

}

// ---- REDEEM SCREEN ----
function RedeemScreen({ partner, reward, onBack }) {
  const code = React.useMemo(() => `EARND-${partner.name.replace(/\s/g, '').slice(0, 3).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`, [partner.id]);
  return (
    <div className="ep-redeem-screen">
      <button className="ep-back ep-back-dark" onClick={(e) => {e.stopPropagation();onBack();}}>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M7 1L1 7l6 6" /></svg>
      </button>
      <div className="ep-redeem-check-circle">✓</div>
      <div className="ep-redeem-eyebrow">Reward unlocked</div>
      <div className="ep-redeem-heading">Show this to staff</div>
      <div className="ep-redeem-card">
        <div className="ep-redeem-partner">{partner.name}</div>
        <div className={`ep-redeem-amount ${reward.cls}`}>{reward.badge}{reward.type === 'discount' ? ' off' : ''}</div>
        <div className="ep-redeem-desc">{reward.title}</div>
        <div className="ep-redeem-code-label">Your code</div>
        <div className="ep-redeem-code">{code}</div>
        <FakeQR />
        <div className="ep-redeem-expiry">Valid for 30 minutes</div>
      </div>
      <button className="ep-done-btn" onClick={(e) => {e.stopPropagation();onBack();}}>Done</button>
    </div>);

}

function FakeQR() {
  const cells = React.useMemo(() => {
    const g = [];
    for (let r = 0; r < 11; r++) for (let c = 0; c < 11; c++) {
      const tl = r < 3 && c < 3,tr = r < 3 && c > 7,bl = r > 7 && c < 3;
      const corner = tl || tr || bl;
      const border = corner && (r === 0 || r === 2 || c === 0 || c === 2 || c === 8 || c === 10 || r === 8 || r === 10);
      const center = r === 1 && c === 1 || r === 1 && c === 9 || r === 9 && c === 1;
      g.push(border || center || !corner && Math.sin(r * 7.3 + c * 13.7) > -0.25);
    }
    return g;
  }, []);
  return (
    <div className="ep-qr">{cells.map((on, i) => <div key={i} className={on ? 'on' : 'off'}></div>)}</div>);

}

// ---- MAIN PHONE COMPONENT ----
function EarndPhone() {
  const [history, setHistory] = React.useState([{ s: 'browse', p: null, r: null }]);
  const cur = history[history.length - 1];
  const [key, setKey] = React.useState(0);

  const nav = (s, data = {}) => {
    setHistory((h) => [...h, { s, ...data }]);
    setKey((k) => k + 1);
  };
  const back = () => {
    if (history.length > 1) {setHistory((h) => h.slice(0, -1));setKey((k) => k + 1);}
  };

  return (
    <div className="ep-phone">
      <div className="ep-notch"></div>
      <div className="ep-screen">
        <EPStatusBar />
        <div className="ep-content" key={key}>
          {cur.s === 'browse' && <BrowseScreen onSelect={(p) => nav('detail', { p })} />}
          {cur.s === 'detail' && <DetailScreen partner={cur.p} onBack={back} onRedeem={(r) => nav('redeem', { p: cur.p, r })} />}
          {cur.s === 'redeem' && <RedeemScreen partner={cur.p} reward={cur.r} onBack={back} />}
        </div>
      </div>
      <div className="ep-home-bar"></div>
    </div>);

}

// ---- HERO PHONE (static dashboard mockup) ----
function HeroPhone() {
  return (
    <div className="ep-phone">
      <div className="ep-notch"></div>
      <div className="ep-screen">
        <EPStatusBar />
        <div className="ep-content">
          <div className="ep-dash">
            <div className="ep-dash-head">
              <div>
                <div className="ep-dash-logo">earnd.</div>
                <div className="ep-dash-greet">Good morning 👋</div>
              </div>
              <div className="ep-dash-avatar">GH</div>
            </div>
            <div className="ep-dash-ring-card">
              <div className="ep-dash-ring">
                <svg viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(45,90,63,0.15)" strokeWidth="9" />
                  <circle cx="60" cy="60" r="48" fill="none" stroke="#2d5a3f" strokeWidth="9" strokeLinecap="round" strokeDasharray="241 301" transform="rotate(-90 60 60)" />
                </svg>
                <div className="ep-dash-ring-label">
                  <span className="ep-ring-num">4</span>
                  <span className="ep-ring-of">of 5</span>
                </div>
              </div>
              <div className="ep-dash-ring-info">
                <div className="ep-ring-kicker">Workout cycle</div>
                <div className="ep-ring-title">1 more to unlock rewards</div>
                <div className="ep-ring-meta">Next reward: 20% off at Verde Bowl</div>
              </div>
            </div>
            <div className="ep-dash-streak">
              <span className="ep-streak-label">Current streak</span>
              <span className="ep-streak-val">🔥 12 days</span>
            </div>
            <div className="ep-dash-section-title">This week</div>
            <div className="ep-dash-workout">
              <div className="ep-wo-icon" style={{ background: '#dde3d2', color: '#2d5a3f' }}>🏃</div>
              <div className="ep-wo-info">
                <div className="ep-wo-name">Morning Run</div>
                <div className="ep-wo-meta">5.2 km · 28 min · 142 bpm avg</div>
              </div>
              <div className="ep-wo-check">✓</div>
            </div>
            <div className="ep-dash-workout">
              <div className="ep-wo-icon" style={{ background: '#ece0c2', color: '#6e4f17' }}>💪</div>
              <div className="ep-wo-info">
                <div className="ep-wo-name">Gym Session</div>
                <div className="ep-wo-meta">Upper body · 45 min · 128 bpm avg</div>
              </div>
              <div className="ep-wo-check">✓</div>
            </div>
            <div className="ep-dash-workout">
              <div className="ep-wo-icon" style={{ background: '#dde3d2', color: '#2d5a3f' }}>🎾</div>
              <div className="ep-wo-info">
                <div className="ep-wo-name">Padel Match</div>
                <div className="ep-wo-meta">1h 10 min · 156 bpm avg</div>
              </div>
              <div className="ep-wo-check">✓</div>
            </div>
            <div className="ep-dash-section-title">Nearby rewards</div>
            <div className="ep-dash-reward-peek">
              <div className="ep-rp-logo" style={{ background: '#3d6852' }}>VB</div>
              <div className="ep-rp-info">
                <div className="ep-rp-name">Verde Bowl</div>
                <div className="ep-rp-offer">20% off · Free smoothie</div>
              </div>
              <div className="ep-rp-dist">0.3 km</div>
            </div>
            <div className="ep-dash-reward-peek">
              <div className="ep-rp-logo" style={{ background: '#b5722a' }}>JF</div>
              <div className="ep-rp-info">
                <div className="ep-rp-name">Jugo Fresco</div>
                <div className="ep-rp-offer">25% off · Free energy shot</div>
              </div>
              <div className="ep-rp-dist">0.5 km</div>
            </div>
            <div className="ep-dash-nav">
              <div className="ep-nav-item active"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Home</div>
              <div className="ep-nav-item"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"/><path d="m15 3 6 6"/><path d="M9 12l3 3 7-7"/></svg>Rewards</div>
              <div className="ep-nav-item"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Profile</div>
            </div>
          </div>
        </div>
      </div>
      <div className="ep-home-bar"></div>
    </div>);

}

Object.assign(window, { EarndPhone, HeroPhone, PARTNERS });