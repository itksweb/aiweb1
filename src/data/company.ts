export interface CompanyInfo {
  name: string;
  tagline: string;
  headline: string;
  startingPriceBadge: string;
  phone: string;
  phoneRaw: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  socialHandle: string;
  socialUrls: {
    instagram: string;
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  address: {
    street: string;
    area: string;
    city: string;
    country: string;
  };
  officeHours: string;
  aboutText: string;
  mission: string;
  vision: string;
  coreValues: {
    title: string;
    description: string;
  }[];
  whyChooseUs: {
    title: string;
    description: string;
    iconName: string;
  }[];
}

export const COMPANY_INFO: CompanyInfo = {
  name: "Roof Real Estate",
  tagline: "MODERN SPACES DESIGNED FOR COMFORTABLE LIVING",
  headline: "Your Perfect Property Awaits",
  startingPriceBadge: "START FROM $50,000",
  // Initial placeholders as supplied on the promotional flyer
  phone: "+123-456-7890",
  phoneRaw: "+1234567890",
  whatsappNumber: "1234567890",
  whatsappMessage: "Hello Roof Real Estate, I am interested in inquiring about your modern residential properties.",
  email: "jokianny@gmail.com",
  socialHandle: "@reallygreatsite",
  socialUrls: {
    instagram: "https://instagram.com/reallygreatsite",
    facebook: "https://facebook.com/reallygreatsite",
    linkedin: "https://linkedin.com/company/reallygreatsite",
    twitter: "https://twitter.com/reallygreatsite",
  },
  address: {
    street: "100 Grand Panorama Ridge",
    area: "Solstice Hill District",
    city: "Metropolis Vista",
    country: "United States",
  },
  officeHours: "Monday – Saturday: 8:30 AM – 6:30 PM (Sunday by appointment)",
  aboutText:
    "At Roof Real Estate, we believe that finding the perfect home should be an exciting and rewarding experience. We are committed to helping individuals and families discover quality residential properties that combine modern design, comfort, security and value.",
  mission:
    "To connect individuals and growing families with architecturally refined, secure, and energy-efficient homes that enrich everyday living and provide reliable long-term value.",
  vision:
    "To be the premier residential real estate choice known for architectural distinction, transparent guidance, and exceptional client satisfaction.",
  coreValues: [
    {
      title: "Architectural Integrity",
      description: "Carefully designed floorplans, generous natural light, and modern finishes engineered for comfort.",
    },
    {
      title: "Security & Peace of Mind",
      description: "Gated perimeters, smart access technology, and 24/7 security standards across all our partner developments.",
    },
    {
      title: "Transparent Value",
      description: "Direct pricing, clear ownership contracts, and verified property specifications with no hidden costs.",
    },
    {
      title: "Client-Centric Care",
      description: "Personalized walkthroughs, dedicated property advisors, and attentive communication from first inquiry to handover.",
    },
  ],
  whyChooseUs: [
    {
      title: "Modern Architectural Designs",
      description: "Clean aesthetic lines, expansive double-glazed glazing, open layouts, and harmonious indoor-outdoor living flow.",
      iconName: "Compass",
    },
    {
      title: "Comfortable Living Spaces",
      description: "Thoughtfully planned master suites, high ceilings, climate control, and ergonomic living areas designed for relaxation.",
      iconName: "Home",
    },
    {
      title: "Prime Locations",
      description: "Strategically situated near premier educational academies, retail promenades, scenic nature trails, and transit hubs.",
      iconName: "MapPin",
    },
    {
      title: "24/7 Security",
      description: "Round-the-clock security monitoring, biometric access checkpoints, secure perimeters, and modern surveillance systems.",
      iconName: "ShieldCheck",
    },
    {
      title: "Private Parking",
      description: "Dedicated covered vehicular garages, paved driveways, and integrated EV charging infrastructure.",
      iconName: "Car",
    },
    {
      title: "Professional Customer Service",
      description: "Seamless advisory, transparent property walkthroughs, legal document guidance, and direct owner consultation.",
      iconName: "Headphones",
    },
  ],
};
