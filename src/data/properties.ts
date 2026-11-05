export interface Property {
  id: string;
  title: string;
  price: number;
  priceDisplay: string;
  propertyType: 'Villa' | 'Modern Estate' | 'Penthouse' | 'Duplex' | 'Architectural Residence';
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  parkingSpaces: number;
  location: string;
  neighborhood: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  fullDescription: string;
  featured: boolean;
  tag?: string;
  amenities: {
    bedroomsDesc: string;
    kitchenDesc: string;
    locationDesc: string;
    securityDesc: string;
    parkingDesc: string;
    featuresList: string[];
  };
}

export const PROPERTIES: Property[] = [
  {
    id: "prop-solstice-villa",
    title: "The Solstice Modern Hillside Villa",
    price: 385000,
    priceDisplay: "$385,000",
    propertyType: "Villa",
    bedrooms: 4,
    bathrooms: 3.5,
    areaSqFt: 3450,
    parkingSpaces: 2,
    location: "Panorama Crest, Hillside Heights",
    neighborhood: "Hillside Heights",
    image: "/assets/images/villa_horizon_dusk.jpg",
    gallery: [
      "/assets/images/villa_horizon_dusk.jpg",
      "/assets/images/residence_living_room.jpg",
      "/assets/images/estate_modern_kitchen.jpg",
      "/assets/aistudio/Green_Modern_Luxury_Real_Estate_Sale_Flyer_f80aa634.png",
    ],
    shortDescription:
      "A showcase of modern architectural elegance with panoramic hillside views, an infinity pool, and seamless open-plan living.",
    fullDescription:
      "The Solstice Villa represents the quintessential Roof Real Estate residence. Featuring floor-to-ceiling tempered glass curtain walls, double-height ceilings, and warm ambient architectural lighting, this 4-bedroom home seamlessly bridges indoor luxury with outdoor relaxation. The residence boasts a sun-drenched terrace, private reflection swimming pool, and an open layout tailored for both tranquil family living and sophisticated entertaining.",
    featured: true,
    tag: "Featured Villa",
    amenities: {
      bedroomsDesc: "4 spacious en-suite bedrooms with walk-in dressing suites and private balcony access",
      kitchenDesc: "Chef's modern kitchen with Calacatta marble waterfall island and premium built-in appliances",
      locationDesc: "Elevated Hillside Heights ridge with panoramic valley sunsets and proximity to private academies",
      securityDesc: "24/7 gated security patrol, biometric smart lock entry, and perimeter camera network",
      parkingDesc: "Double enclosed private garage with integrated EV high-speed charging port",
      featuresList: [
        "Private Infinity Swimming Pool",
        "Floor-to-Ceiling Thermal Glazing",
        "Smart Home Climate & Lighting",
        "Landscaped Drought-Tolerant Gardens",
        "Covered Alfresco Dining Loggia",
      ],
    },
  },
  {
    id: "prop-emerald-terrace",
    title: "Panorama Sky Penthouse",
    price: 495000,
    priceDisplay: "$495,000",
    propertyType: "Penthouse",
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2950,
    parkingSpaces: 2,
    location: "Coastal Ridge, Oceanview Promenade",
    neighborhood: "Coastal Bay",
    image: "/assets/images/penthouse_terrace_view.jpg",
    gallery: [
      "/assets/images/penthouse_terrace_view.jpg",
      "/assets/images/residence_living_room.jpg",
      "/assets/images/estate_modern_kitchen.jpg",
      "/assets/images/villa_horizon_dusk.jpg",
    ],
    shortDescription:
      "Exclusive top-floor penthouse offering panoramic coastline sunsets, a sweeping terrace with an open fire table, and designer interiors.",
    fullDescription:
      "Perched atop one of the region's most coveted coastal vantage points, this penthouse features a sprawling wrap-around terrace equipped with an integrated fire pit and glass balustrades. Inside, floor-to-ceiling glass captures changing hues of the evening sky, accompanied by custom walnut joinery and imported Italian stone throughout.",
    featured: true,
    tag: "Luxury Penthouse",
    amenities: {
      bedroomsDesc: "3 expansive bedrooms with ocean-facing panoramic windows and bespoke acoustic insulation",
      kitchenDesc: "Designer island kitchen featuring matte stone surfaces and hidden scullery",
      locationDesc: "Exclusive Coastal Bay ridgeline with direct access to private marina and dining promenade",
      securityDesc: "24/7 concierge lobby security, private keyed elevator access, and multi-tier monitoring",
      parkingDesc: "2 reserved underground parking bays with high-speed automated security gate",
      featuresList: [
        "1,200 sq.ft. Private Sunset Terrace",
        "Integrated Natural Gas Fire Pit",
        "Keyed Direct Elevator Foyer",
        "Wine Storage & Sommelier Cellar",
        "Sonos Multi-Room Audio System",
      ],
    },
  },
  {
    id: "prop-verdent-haven",
    title: "The Verdant Modern Duplex",
    price: 50000,
    priceDisplay: "$50,000",
    propertyType: "Duplex",
    bedrooms: 3,
    bathrooms: 2,
    areaSqFt: 1820,
    parkingSpaces: 1,
    location: "Green Valley Reserve, Sector 4",
    neighborhood: "Green Valley",
    image: "/assets/aistudio/Green_Modern_Luxury_Real_Estate_Sale_Flyer_f80aa634.png",
    gallery: [
      "/assets/aistudio/Green_Modern_Luxury_Real_Estate_Sale_Flyer_f80aa634.png",
      "/assets/images/estate_modern_kitchen.jpg",
      "/assets/images/residence_living_room.jpg",
    ],
    shortDescription:
      "The flyer flagship entry opportunity: modern 3-bedroom duplex combining architectural sophistication, comfortable living, and unbeatable value starting from $50,000.",
    fullDescription:
      "Reflecting Roof Real Estate's core promise that high-caliber modern living should be accessible, this duplex model pairs energy-efficient construction with refined contemporary finishes. Built with high-grade thermal insulation, generous balcony overlooks, and a private enclosed courtyard, it is the ideal home for both first-time homeowners and astute investors seeking dependable capital appreciation.",
    featured: true,
    tag: "Starting From $50,000",
    amenities: {
      bedroomsDesc: "3 well-proportioned bedrooms with built-in storage closets and natural sun lighting",
      kitchenDesc: "Streamlined modern kitchen with durable quartz countertops and stainless steel appliances",
      locationDesc: "Central Green Valley Reserve with landscaped neighborhood parks and community schools",
      securityDesc: "24/7 community perimeter security, access-controlled boom gates, and lighted walkways",
      parkingDesc: "Dedicated private covered carport with space for visitor parking",
      featuresList: [
        "Starting From $50,000 Entry Model",
        "Solar Pre-Wired Infrastructure",
        "Private Enclosed Green Courtyard",
        "Low HOA & Community Maintenance",
        "Rapid Value Appreciation Potential",
      ],
    },
  },
  {
    id: "prop-lumina-estate",
    title: "The Lumina Modern Courtyard Residence",
    price: 245000,
    priceDisplay: "$245,000",
    propertyType: "Architectural Residence",
    bedrooms: 4,
    bathrooms: 3,
    areaSqFt: 2800,
    parkingSpaces: 2,
    location: "Highland Forest Boulevard",
    neighborhood: "Highland Park",
    image: "/assets/images/residence_living_room.jpg",
    gallery: [
      "/assets/images/residence_living_room.jpg",
      "/assets/images/villa_horizon_dusk.jpg",
      "/assets/images/estate_modern_kitchen.jpg",
    ],
    shortDescription:
      "Double-height living pavilion with floor-to-ceiling natural garden views, private central courtyard, and designer interior architectural wood details.",
    fullDescription:
      "Designed for those who cherish tranquility and natural light, The Lumina incorporates a central landscaped Zen courtyard around which all main living spaces flow. Featuring double-height timber ceilings, a sunken hearth fireplace, and direct glass sliders leading out to serene private gardens.",
    featured: false,
    tag: "Architectural Focus",
    amenities: {
      bedroomsDesc: "4 bedrooms including a ground-floor master suite overlooking the bamboo courtyard",
      kitchenDesc: "Open-concept modern kitchen connected directly to breakfast banquette and herb garden",
      locationDesc: "Highland Park enclave bordered by protected woodlands and peaceful walking paths",
      securityDesc: "24/7 security patrol, video doorbell intercom, and automated window security shutters",
      parkingDesc: "Two-car private driveway and detached covered garage",
      featuresList: [
        "Double-Height 22ft Living Ceiling",
        "Central Landscaped Zen Courtyard",
        "Architectural Wood Slat Detailing",
        "Sunken Fireside Lounge",
        "High-Efficiency HVAC System",
      ],
    },
  },
  {
    id: "prop-culinary-manor",
    title: "The Atelier Modern Culinary Estate",
    price: 310000,
    priceDisplay: "$310,000",
    propertyType: "Modern Estate",
    bedrooms: 4,
    bathrooms: 3.5,
    areaSqFt: 3200,
    parkingSpaces: 2,
    location: "Grandview Boulevard, Skyline District",
    neighborhood: "Skyline District",
    image: "/assets/images/estate_modern_kitchen.jpg",
    gallery: [
      "/assets/images/estate_modern_kitchen.jpg",
      "/assets/images/residence_living_room.jpg",
      "/assets/images/villa_horizon_dusk.jpg",
    ],
    shortDescription:
      "A culinary enthusiast's dream featuring a masterclass kitchen, custom oak cabinetry, dual ovens, and generous entertainer's floorplan.",
    fullDescription:
      "The Atelier focuses on the kitchen as the true heart of modern luxury living. Showcasing an 11-foot waterfall marble island, integrated dual convection ovens, wine refrigeration, and a seamless visual connection to the outdoor terrace through sliding acoustic glass panels.",
    featured: false,
    tag: "Modern Kitchen",
    amenities: {
      bedroomsDesc: "4 light-filled bedrooms with plush acoustic wool carpets and custom built-ins",
      kitchenDesc: "State-of-the-art chef's kitchen with 11ft marble waterfall island and butler's pantry",
      locationDesc: "Prestigious Skyline District close to international gourmet markets and fine dining",
      securityDesc: "24/7 security presence with motorized perimeter gates and central alarm monitoring",
      parkingDesc: "Spacious two-car enclosed garage with built-in workshop and cabinetry",
      featuresList: [
        "Waterfall Calacatta Marble Island",
        "Dual Built-in Smart Ovens",
        "Butler's Pantry & Scullery",
        "Expansive Covered Patio",
        "Multi-Zone Underfloor Heating",
      ],
    },
  },
  {
    id: "prop-horizon-haven",
    title: "The Horizon Glass Residence",
    price: 185000,
    priceDisplay: "$185,000",
    propertyType: "Architectural Residence",
    bedrooms: 3,
    bathrooms: 2.5,
    areaSqFt: 2250,
    parkingSpaces: 2,
    location: "Solstice Hillside Road",
    neighborhood: "Hillside Heights",
    image: "/assets/images/villa_horizon_dusk.jpg",
    gallery: [
      "/assets/images/villa_horizon_dusk.jpg",
      "/assets/images/residence_living_room.jpg",
      "/assets/aistudio/Green_Modern_Luxury_Real_Estate_Sale_Flyer_f80aa634.png",
    ],
    shortDescription:
      "Sleek cantilevered modern residence showcasing glass balustrades, private garden terrace, and energy-neutral architectural design.",
    fullDescription:
      "Echoing the iconic architecture on the Roof Real Estate flyer, this 3-bedroom residence combines clean cantilevered balconies, charcoal structural frames, and gentle evening exterior lighting. Designed with natural airflow channels and passive solar orientation to minimize energy consumption while maximizing everyday comfort.",
    featured: false,
    tag: "Prime Location",
    amenities: {
      bedroomsDesc: "3 peaceful bedrooms including master with cantilevered private glass balcony",
      kitchenDesc: "Designer island kitchen with induction cooktop and concealed appliances",
      locationDesc: "Hillside Heights crest with uninterrupted western sunset vistas",
      securityDesc: "24/7 digital security network with remote smartphone gate controls",
      parkingDesc: "Covered two-vehicle carport with level paved driveway",
      featuresList: [
        "Cantilevered Glass Balconies",
        "Passive Solar Orientation",
        "Architectural Facade Illumination",
        "Lush Low-Water Landscaping",
        "Pre-Installed High-Speed Fiber",
      ],
    },
  },
];
