![GUARDIAN IOT — bespoke brushed-metal project artwork](./assets/readme-metal-hero.svg)

# GUARDIAN IOT

**A security-operations interface concept for reviewing device lifecycle, trust states, telemetry, and tamper-related events.**

Guardian IoT explores the operator questions around a connected fleet: which devices are registered, what state is being shown, and what needs attention? The current dashboard reads from `src/data/mockData`, so the displayed fleet and events are demonstration data rather than live telemetry.

## Read the dashboard as a system

```text
Sample device records + sample events
                │
                ▼
        Device state overview
                │
      ┌─────────┼──────────┐
      ▼         ▼          ▼
  Inventory  Telemetry   Tamper events
      │         │          │
      └─────────┴──────────┘
           Operator review
```

## Included experience

- **System overview:** Summary cards for sample device states and alerts.
- **Device lifecycle:** Screens for considering onboarding, device status, and lifecycle changes.
- **Telemetry view:** A visual surface for device-oriented signals.
- **Security flow:** A step-by-step representation of a proposed boot, verification, operation, and tamper-response lifecycle.
- **Presentation mode:** A focused view for explaining the product concept.

## Stack

React · TypeScript · Vite · Tailwind CSS · React Router · reusable security UI components

## Run locally

**Requirements:** Node.js and npm.

```bash
git clone https://github.com/Kishordiu/guardian-iot.git
cd guardian-iot
npm ci
npm run dev
```

Run `npm run lint` and `npm test` before preparing a build.

## Trust boundary

**This repository is a frontend prototype using mock data.** The security-flow screen is a visual explanation, not proof that secure boot, cryptographic device attestation, physical tamper sensors, key erasure, Wi-Fi/Bluetooth shutdown, or automated lockdown are implemented. Connect and independently test a backend and hardware layer before using it for security operations.

---

<p align="center"><sub>DIU FOUNDRY · DEVICE TRUST / OPERATIONS INTERFACE</sub></p>
