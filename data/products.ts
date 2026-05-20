export interface Product {
  id:          string;
  name:        string;
  subtitle:    string;
  description: string;
  longDescription: string;
  category:    "hydration" | "brightening" | "anti-aging" | "recovery";
  keyBenefits: string[];
  volume:      string;
  sessions:    string;
  image:       string;
  color: {
    primary:    string;
    secondary:  string;
    text:       string;
  };
  featured:    boolean;
  order:       number;
}

export const products: Product[] = [
  {
    id:          "bella-hydra-boost",
    name:        "Hydra Boost",
    subtitle:    "Deep Hydration Complex",
    description: "Intense multi-layer hydration that replenishes moisture at every skin depth.",
    longDescription: "Powered by a trio of molecular-weight hyaluronic acids, Hydra Boost penetrates three layers of skin to deliver sustained hydration for up to 72 hours. Combined with ceramide precursors and pro-vitamin B5, it restores the natural moisture barrier while visibly plumping fine lines.",
    category:    "hydration",
    keyBenefits: [
      "72-hour sustained hydration",
      "Visibly plumps fine lines",
      "Restores moisture barrier",
      "Suitable for all skin types",
    ],
    volume:    "5ml × 10 vials",
    sessions:  "4–6 sessions recommended",
    image:     "/images/products/hydra-boost.jpg",
    color: {
      primary:   "#DDEEF8",
      secondary: "#B8D9EF",
      text:      "#1A4A6E",
    },
    featured: true,
    order:    1,
  },
  {
    id:          "bella-radiance-elixir",
    name:        "Radiance Elixir",
    subtitle:    "Brightening & Even Tone",
    description: "Luminosity-restoring formula that targets dullness and uneven tone.",
    longDescription: "A fusion of stabilized vitamin C (15%), niacinamide, and tranexamic acid works synergistically to fade hyperpigmentation, even skin tone, and restore a natural glow. The formula also includes glutathione precursors for a whole-skin brightening effect from within.",
    category:    "brightening",
    keyBenefits: [
      "Targets hyperpigmentation",
      "Brightens dull complexion",
      "Evens skin tone in 4 weeks",
      "Antioxidant protection",
    ],
    volume:    "5ml × 10 vials",
    sessions:  "6–8 sessions recommended",
    image:     "/images/products/radiance-elixir.jpg",
    color: {
      primary:   "#FDF3D8",
      secondary: "#F5DFA0",
      text:      "#6B4E00",
    },
    featured: true,
    order:    2,
  },
  {
    id:          "bella-youth-peptide",
    name:        "Youth Peptide",
    subtitle:    "Advanced Anti-Aging Complex",
    description: "Multi-peptide formula that targets the visible signs of aging at the cellular level.",
    longDescription: "Combining eight of the most researched peptides including Argireline, Leuphasyl, and Matrixyl 3000, Youth Peptide activates collagen synthesis, relaxes expression lines, and firms the skin matrix. The formula is enhanced with DMAE for immediate visible lifting and resveratrol for long-term anti-oxidation.",
    category:    "anti-aging",
    keyBenefits: [
      "8-peptide complex",
      "Stimulates collagen synthesis",
      "Visible lifting effect",
      "Reduces expression lines",
    ],
    volume:    "5ml × 10 vials",
    sessions:  "8–10 sessions recommended",
    image:     "/images/products/youth-peptide.jpg",
    color: {
      primary:   "#F0EAF8",
      secondary: "#D9C8EF",
      text:      "#3D1A6E",
    },
    featured: true,
    order:    3,
  },
  {
    id:          "bella-repair-shield",
    name:        "Repair Shield",
    subtitle:    "Intensive Skin Recovery",
    description: "Post-procedure recovery formula that accelerates healing and minimizes downtime.",
    longDescription: "Developed for post-treatment recovery, Repair Shield combines growth factors, EGF (Epidermal Growth Factor), and centella asiatica extract to dramatically accelerate skin repair. Zinc and copper peptides strengthen the compromised barrier, while panthenol delivers soothing anti-inflammatory relief.",
    category:    "recovery",
    keyBenefits: [
      "Contains EGF growth factors",
      "Accelerates healing × 2",
      "Reduces redness instantly",
      "Strengthens skin barrier",
    ],
    volume:    "5ml × 5 vials",
    sessions:  "Use after every procedure",
    image:     "/images/products/repair-shield.jpg",
    color: {
      primary:   "#E8F5EC",
      secondary: "#C0E0CA",
      text:      "#1A4E2A",
    },
    featured: false,
    order:    4,
  },
];

export const featuredProducts = products
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);
