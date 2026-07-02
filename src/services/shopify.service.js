const zones = {
  "North Delhi": ["model town", "gtb nagar", "azadpur", "alipur"],
  "West Delhi": ["janakpuri", "punjabi bagh", "rajouri garden", "paschim vihar"],
  "South Delhi": ["saket", "hauz khas", "lajpat nagar", "mehrauli", "greater kailash"],
  "East Delhi": ["laxmi nagar", "preet vihar", "mayur vihar", "anand vihar"]
};

// 1. GET PINCODE DATA
const getPincodeData = async (pincode) => {
  const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
  const data = await res.json();

  return data?.[0]?.PostOffice?.[0];
};

// 2. DETECT ZONE (FIXED LOGIC)
const detectZone = (postOffice) => {
  const name = (postOffice?.Name || "").toLowerCase();
  const district = (postOffice?.District || "").toLowerCase();

  // 🔥 FIRST PRIORITY: DISTRICT MATCH (BEST & CLEAN)
  if (district.includes("north delhi")) return "North Delhi";
  if (district.includes("west delhi")) return "West Delhi";
  if (district.includes("south delhi")) return "South Delhi";
  if (district.includes("east delhi")) return "East Delhi";

  // 🔥 SECOND PRIORITY: NAME MATCH (FALLBACK ONLY)
  for (const zone in zones) {
    if (zones[zone].some(area => name.includes(area))) {
      return zone;
    }
  }

  return "Delhi NCR";
};

// 3. PRICE MAP
const getPrice = (zone) => {
  const priceMap = {
    "North Delhi": 1500,
    "West Delhi": 1800,
    "South Delhi": 2000,
    "East Delhi": 1700,
    "Delhi NCR": 2500
  };

  return priceMap[zone] || 2500;
};

// 4. MAIN FUNCTION
export const getShippingRatesService = async (pincode) => {
  console.log("Checking pincode:", pincode);

  const postOffice = await getPincodeData(pincode);

  if (!postOffice) {
    return {
      rates: [
        {
          service_name: "Ardas Delivery",
          service_code: "ARDAS_MANUAL",
          total_price: "300000",
          currency: "INR",
          description: "Manual delivery required"
        }
      ]
    };
  }

  const zone = detectZone(postOffice);
  const price = getPrice(zone);

  console.log("PostOffice:", postOffice?.Name);
  console.log("District:", postOffice?.District);
  console.log("Detected Zone:", zone);
  console.log("Price:", price);

  return {
    rates: [
      {
        service_name: `Ardas ${zone} Delivery`,
        service_code: "ARDAS_ZONE",
        total_price: String(price * 100),
        currency: "INR",
        description: `${zone} delivery`
      }
    ]
  };
};