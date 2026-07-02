import { findRule } from "../repositories/deliveryRule.repository.js";

const rupeesToShopifyAmount = (rupees) => {
  return String(Math.round(Number(rupees || 0) * 100));
};

const getLivePincodeLocation = async (pincode) => {
  const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);

  if (!response.ok) {
    throw new Error(`Pincode API failed with status ${response.status}`);
  }

  const data = await response.json();

  if (
    !Array.isArray(data) ||
    !data[0] ||
    data[0].Status !== "Success" ||
    !Array.isArray(data[0].PostOffice) ||
    data[0].PostOffice.length === 0
  ) {
    return null;
  }

  const postOffice = data[0].PostOffice[0];

  return {
    pincode,
    postOfficeName: postOffice.Name,
    district: postOffice.District,
    state: postOffice.State,
    deliveryStatus: postOffice.DeliveryStatus
  };
};

const normalizeDeliveryCity = (location) => {
  const district = String(location?.district || "").toLowerCase();
  const state = String(location?.state || "").toLowerCase();

  // Delhi API often returns districts like West Delhi, South Delhi, etc.
  if (state.includes("delhi") || district.includes("delhi")) {
    return "Delhi";
  }

  // Gurugram/Gurgaon handling
  if (district.includes("gurugram") || district.includes("gurgaon")) {
    return "Gurugram";
  }

  // Noida often comes as Gautam Buddha Nagar
  if (
    district.includes("gautam buddha nagar") ||
    district.includes("noida")
  ) {
    return "Noida";
  }

  if (district.includes("ghaziabad")) {
    return "Ghaziabad";
  }

  if (district.includes("faridabad")) {
    return "Faridabad";
  }

  if (district.includes("jaipur")) {
    return "Jaipur";
  }

  // fallback: use district name directly
  return location?.district;
};

export const getShippingRatesService = async (postalCode) => {
  const pincode = String(postalCode || "").trim();

  console.log("Checking live pincode:", pincode);

  if (!/^[1-9][0-9]{5}$/.test(pincode)) {
    console.log("Invalid Indian pincode:", pincode);

    return {
      rates: [
        {
          service_name: "Invalid Pincode",
          service_code: "ARDAS_INVALID_PINCODE",
          total_price: "1000000",
          currency: "INR",
          description: "Please enter a valid 6 digit Indian pincode"
        }
      ]
    };
  }

  let location;

  try {
    location = await getLivePincodeLocation(pincode);
  } catch (error) {
    console.error("Live pincode API error:", error.message);

    return {
      rates: [
        {
          service_name: "Manual Furniture Delivery",
          service_code: "ARDAS_PINCODE_API_FALLBACK",
          total_price: "1000000",
          currency: "INR",
          description: "Delivery charge will be confirmed by our team"
        }
      ]
    };
  }

  if (!location) {
    console.log("Pincode not found by live API:", pincode);

    return {
      rates: [
        {
          service_name: "Not Deliverable",
          service_code: "ARDAS_NOT_DELIVERABLE",
          total_price: "1000000",
          currency: "INR",
          description: "Delivery is not available for this pincode"
        }
      ]
    };
  }

  console.log("Live pincode location:", location);

  const city = normalizeDeliveryCity(location);

  console.log("Normalized delivery city:", city);

  const rule = await findRule(city);

  if (!rule) {
    console.log("No delivery rule found for:", city);

    return {
      rates: [
        {
          service_name: "Manual Furniture Delivery",
          service_code: "ARDAS_MANUAL_DELIVERY",
          total_price: "1000000",
          currency: "INR",
          description: `Delivery charge for ${city || location.state} will be confirmed by our team`
        }
      ]
    };
  }

  console.log("Delivery rule found:", rule);

  const charge = Number(rule.charge || 0);

  return {
    rates: [
      {
        service_name: "Ardas Standard Delivery",
        service_code: "ARDAS_STANDARD",
        total_price: rupeesToShopifyAmount(charge),
        currency: "INR",
        description: `${rule.days} Day Delivery`
      }
    ]
  };
};