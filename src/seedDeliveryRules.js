import dotenv from "dotenv";
import connectDB from "./config/db.js";
import DeliveryRule from "./models/DeliveryRule.model.js";

dotenv.config();

const rules = [
  { city: "Delhi", charge: 2500, days: 2, installation: true },
  { city: "Noida", charge: 3000, days: 3, installation: true },
  { city: "Greater Noida", charge: 3500, days: 3, installation: true },
  { city: "Ghaziabad", charge: 3500, days: 3, installation: true },
  { city: "Gurugram", charge: 3000, days: 3, installation: true },
  { city: "Manesar", charge: 3500, days: 4, installation: true },
  { city: "Sohna", charge: 4000, days: 4, installation: true },
  { city: "Faridabad", charge: 3500, days: 3, installation: true },
  { city: "Ballabhgarh", charge: 3500, days: 3, installation: true },
  { city: "Bahadurgarh", charge: 4500, days: 4, installation: true },
  { city: "Jhajjar", charge: 5000, days: 5, installation: true },
  { city: "Sonipat", charge: 4500, days: 4, installation: true },
  { city: "Rohtak", charge: 5500, days: 5, installation: true },
  { city: "Panipat", charge: 6000, days: 5, installation: true },
  { city: "Karnal", charge: 6500, days: 5, installation: true },
  { city: "Rewari", charge: 6000, days: 5, installation: true },
  { city: "Bhiwadi", charge: 6000, days: 5, installation: true },
  { city: "Neemrana", charge: 7000, days: 6, installation: true },
  { city: "Alwar", charge: 7000, days: 6, installation: true },
  { city: "Meerut", charge: 5500, days: 5, installation: true },
  { city: "Hapur", charge: 5000, days: 5, installation: true }
];

const seedRules = async () => {
  try {
    await connectDB();

    for (const rule of rules) {
      await DeliveryRule.findOneAndUpdate(
        { city: rule.city },
        rule,
        { upsert: true, new: true }
      );

      console.log(`Saved: ${rule.city}`);
    }

    console.log("Delivery rules seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seedRules();