<div align="center">

# Parallax

**Move money, anywhere on Earth.**

Instant crypto payouts, international transfers, and escrow protection for freelancers, remote teams, and global hiring.
Powered by **Blaaiz**.

[![Deployed on Vercel](https://img.shields.io/badge/deployed-Vercel-blue)](https://the-parallaxx.vercel.app)
[![License: MIT](https://img.shields.io/badge/license-MIT-a855f7.svg)](LICENSE)
[![Built for The Build Hackathon](https://img.shields.io/badge/built%20for-The%20Build-purple)](https://thebuild.dev)

[Live Demo](#-live-demo) · [What is Parallax](#what-is-parallax) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started)

</div>

---

## 🚀 Live Demo

- **Main app**: https://the-parallaxx.vercel.app
- **Interactive pitch**: https://the-parallaxx.vercel.app/pitch
- **Create payout**: https://the-parallaxx.vercel.app/send
- **Explore payouts**: https://the-parallaxx.vercel.app/explore

---

## What is Parallax?

Parallax is a **global payments tracker** that makes cross-border payouts instant, transparent, and accessible. Built on **Blaaiz** infrastructure, it handles three core use cases:

### 💰 Instant Crypto Payouts
Freelancers receive USDC/USDT → instantly withdraw in their local currency (bank, mobile money, ACH) in minutes. No more bouncing between exchanges losing 5-10% at each step.

### 🌍 Pay Abroad  
Send USDC from Singapore → recipient gets NGN in Lagos automatically. 50+ currency pairs with real-time FX rates and transparent 2% fees.

### 🔐 Escrow for Hiring
Client funds the job in crypto → Parallax holds it securely until work is confirmed → one-click release to freelancer. No faith, no expensive intermediaries.

---

## Why Parallax?

| Feature | Traditional Banks | Parallax |
| --- | --- | --- |
| **Speed** | 3-5 business days | Minutes |
| **Exchange Rate** | Hidden spread/markup | Live, transparent |
| **Currencies** | Limited pairs | 50+ pairs |
| **Fees** | Hidden charges | Flat 2% upfront |
| **Escrow** | Expensive intermediaries | Built-in, one-click |
| **Crypto** | Not supported | Multi-chain USDC/USDT |

Designed for **freelancers**, **remote teams**, and **global hiring** who need instant, transparent international payments.

---

## 🎯 How It Works

```
Freelancer sends invoice
    ↓
Client funds in USDC/USDT
    ↓
Parallax fetches LIVE FX rate from Blaaiz
    ↓
Shows transparent fee breakdown (typically 2%)
    ↓
One click to confirm
    ↓
Funds arrive in local currency in minutes
```

---

## ✨ Features

### For Everyone
- **Real rates**: Live FX from Blaaiz API, updated constantly. No guesses.
- **Transparent fees**: See cost before confirming. Full breakdown.
- **Real settlement**: Minutes, not days. Bank account, mobile money, or ACH.
- **Escrow protection**: Funds held securely until conditions met.
- **Multi-chain**: Send USDC/USDT from Ethereum, BSC, Polygon, Tron, Solana.

### Dashboard
- **Create payouts**: Three flows (instant, abroad, escrow)
- **Browse corridors**: 50+ currency pairs with live rates
- **Track status**: See processing amount, settled amount, total volume
- **Live stats**: Dashboard metrics at a glance

### Pitch Deck
- **Interactive**: 7-slide presentation with Parallax branding
- **Keyboard navigation**: Arrow keys + click support
- **Professional**: Dark theme with gradient colors
- **Accessible**: Live at `/pitch` for presentations

---

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: CSS-in-JS (inline) + CSS modules
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **State**: React Context (useApp hook)
- **Deployment**: Vercel (auto-deploy on push to `main`)
- **Infrastructure**: Blaaiz API (rates, settlement, KYC)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- npm or yarn

### Installation

```bash
# Clone repo
git clone https://github.com/David-patrick-chuks-02/Parallax.git
cd Parallax

# Install
npm install

# Create .env (optional — demo works without it)
cat > .env << EOF
VITE_BLAAIZ_API_URL=https://api.blaaiz.com
VITE_BLAAIZ_CLIENT_ID=
VITE_BLAAIZ_CLIENT_SECRET=
VITE_BLAAIZ_API_KEY=
VITE_BLAAIZ_WALLET_ID=
EOF
```

### Development

```bash
# Start dev server
npm run dev
# Opens http://localhost:5173
```

### Production

```bash
# Build
npm run build

# Preview
npm run preview
```

---

## 📁 Project Structure

```
Parallax/
├── src/
│   ├── pages/
│   │   ├── landing.tsx        # Hero, features, FAQs
│   │   ├── send.tsx           # Create payout form
│   │   ├── explore.tsx        # Browse payouts, corridors, stats
│   │   ├── pitch.tsx          # 7-slide interactive pitch
│   │   └── sections.tsx       # Reusable landing sections
│   ├── components/
│   │   ├── ui.tsx             # Core UI components
│   │   └── bits.tsx           # Animated/visual effects
│   ├── lib/
│   │   ├── model.ts           # Data types & helpers
│   │   ├── store.ts           # State management
│   │   └── platform.ts        # Product config
│   └── App.tsx                # Routes & shell
├── pitch/
│   ├── index.html             # Standalone pitch (HTML)
│   └── README.md              # Pitch export guide
├── .env                       # Blaaiz credentials (optional)
├── vite.config.ts
└── package.json
```

---

## 🎨 Design System

**Colors**: Violet (#a78bfa) → Fuchsia (#f472b6) → Orange (#fb923c)
**Theme**: Dark mode with semi-transparent cards
**Logo**: Chat bubble with gradient (Parallax mark)

---

## 💾 Data Model

### Payout
```typescript
interface Payout {
  id: string;                    // Unique ID
  corridorId: string;            // e.g., "usdc-ngn"
  amount: number;                // Send amount
  fromCurrency: string;          // "USDC", "USDT", etc.
  toCurrency: string;            // "USD", "NGN", "EUR", etc.
  recipient: string;             // Recipient name/account
  status: PayoutStatus;          // Draft | Confirmed | Processing | Settled | Failed
  rate: number;                  // FX rate (1 from = X to)
  fee: number;                   // Fee amount
  receiveAmount: number;         // Recipient gets this
  created: string;               // ISO date
  settled?: string;              // When settled
}
```

---

## 🌐 Supported Corridors

**Send**: USDC, USDT (Ethereum, BSC, Polygon, Tron, Solana)

**Receive** (50+ currencies):
- USD, EUR, GBP, CHF, CAD, AUD, NZD
- NGN, GHS, KES, ZAR, UGX, TZS (Africa)
- INR, PKR, BDT, PHP, IDR, THB, VND (Asia)
- SAR, AED, KWD (Middle East)
- MXN, ARS, BRL (Americas)
- And 30+ more...

---

## 🔗 Blaaiz Integration

Parallax uses **Blaaiz infrastructure**:
- **Live FX Rates API** — Real-time quotes for all corridors
- **Multi-Chain** — Accept USDC/USDT from any blockchain
- **Settlement** — Instant release to banks, mobile money, ACH
- **Escrow** — Secure conditional release of funds
- **KYC/AML** — Built-in compliance via Blaaiz Signa

---

## 🎬 Pitch Deck

Access the interactive 7-slide pitch:
- **In app**: `/pitch` route
- **Standalone**: `/pitch/index.html`
- **Export**: Print to PDF (Cmd+P)

Slides:
1. Hero — Parallax, move money anywhere
2. Problem — Why crypto payouts are broken
3. Solution — Powered by Blaaiz
4. Use cases — Three real flows
5. Tech — Real infrastructure
6. Market — Why now?
7. Demo — Try it live

---

## 🚢 Deployment

Deployed on **Vercel** with auto-deploy:
- Production: https://the-parallaxx.vercel.app
- Every push to `main` triggers build
- Preview deployments for PRs

---

## 📝 Environment

Create `.env` to add Blaaiz credentials:

```env
VITE_BLAAIZ_API_URL=https://api.blaaiz.com
VITE_BLAAIZ_CLIENT_ID=your-id
VITE_BLAAIZ_CLIENT_SECRET=your-secret
VITE_BLAAIZ_API_KEY=your-key
VITE_BLAAIZ_WALLET_ID=your-wallet
```

**Demo mode** works without credentials (uses mock data).

---

## 🤝 Contributing

Built for **The Build Hackathon**. To extend:

1. Create new page in `src/pages/`
2. Add route to `src/App.tsx`
3. Update data model in `src/lib/model.ts`
4. Test locally: `npm run dev`
5. Build: `npm run build`
6. Push to trigger Vercel deploy

---

## 📄 License

MIT — Built with ❤️ for The Build Hackathon
