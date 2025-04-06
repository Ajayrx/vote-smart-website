# 🎬 Project Ncrypt — Demo Walkthrough
 Demo of your NFC-based offline voter verification + government services access system via website.

# 🎯 Objective of the Demo
    Show how an NFC Voter Card is created, verified, and used in an offline environment.

### 💾 Step 1: Create a Secure NFC Voter Card

    ✅ Simulates the process of card creation done by government officials.

- User Enters Voter Details

- Name, Age, Voter ID, Fingerprint Data (simulated)

- Click Encrypt & Write

- Voter data is encrypted

- A Gov-signature [Need to be added  " key - gov_secure_2025 "]

- Data is written to the simulated NFC card (voter_card.txt)

## 🔍 Step 2: Scan & Verify the NFC Card

    🔐 Verifies if the card is genuine or fake

- Click Scan Card

- System asks for the Government Signature for verification.

- Gov-Sign Verification

      > If correct:

  - ✅ Scans the NFC card

  - Compares internal signature & fingerprint hash

  - Marks card as Original

        > If incorrect:

   - ❌ Card is marked Invalid

   - Shows alert: "Fake Gov Signature Mismatch – Card Rejected"


# 🏛️ Access Government Services (Post Verification)
    > If card is valid, the user can now simulate accessing key services.

📦 Ration Center:
Name, Age

  - Ration Card ID

  - Eligible Items (Wheat, Rice, etc.)

  - Next Delivery Date

🏥 Government Hospital:
Name, Age

   - Blood Group

   - Treatment Balance (e.g. ₹18,000)

   - Last Claim Details

👴 Pension Center:
Age-based check (if age ≥ 60)

   - Monthly Pension Amount

   - Last Payout Date

# Important Notice 

   Still working on goverment services demo section.

