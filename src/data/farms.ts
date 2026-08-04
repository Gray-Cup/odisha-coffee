export type ProcessingMethod = "washed" | "natural" | "honey" | "pulped-natural";

export type Farm = {
  id: string;
  name: string;
  region: string;
  district: string;
  elevation: string; // e.g. "900–1100m"
  area: string; // e.g. "12 acres"
  varieties: string[];
  processing: ProcessingMethod[];
  flavorNotes: string[];
  harvestSeason: string;
  established: number;
  description: string;
  story: string;
  certifications: string[];
  exportReady: boolean;
  featured: boolean;
};

export const farms: Farm[] = [
  {
    id: "dream-hill-coffee",
    name: "Dream Hill Coffee — Saptagiri Plantation",
    region: "Pottangi",
    district: "Koraput",
    elevation: "1100–1450m",
    area: "28 acres",
    varieties: ["Arabica SLN 9", "Arabica Catuai"],
    processing: ["washed", "honey"],
    flavorNotes: ["Jasmine", "Citrus Zest", "Golden Raisin"],
    harvestSeason: "December – March",
    established: 2009,
    description:
      "Dream Hill Coffee, operating under the Saptagiri Plantation banner, is positioned at the highest elevations in Odisha's coffee belt. At over 1100 metres, the estate produces some of the most refined Arabica coffees from the region, with a bright acidity and aromatic complexity rare in Indian coffees.",
    story:
      "Founded with a singular focus on high-altitude specialty production, Dream Hill Coffee has become a benchmark for Odisha Arabica. The founder's background in agronomy brought scientific rigour to cultivation — from soil health monitoring to canopy management — resulting in consistently high cupping scores.",
    certifications: ["FSSAI", "APEDA", "Rainforest Alliance"],
    exportReady: true,
    featured: true,
  },
  {
    id: "brown-valley-coffee-estate",
    name: "Brown Valley Coffee Estate",
    region: "Boipariguda",
    district: "Koraput",
    elevation: "1050–1300m",
    area: "32 acres",
    varieties: ["Arabica S795", "Arabica Catimor", "Robusta"],
    processing: ["washed", "natural", "honey"],
    flavorNotes: ["Milk Chocolate", "Hazelnut", "Stone Fruit"],
    harvestSeason: "November – February",
    established: 1995,
    description:
      "Brown Valley is one of the larger estates in Koraput, spread across the undulating terrain of Boipariguda. The estate runs a fully equipped wet processing station and is one of the few farms in Odisha producing all three major processing styles — washed, natural, and honey.",
    story:
      "With over 25 years in cultivation, Brown Valley has become a reference point for quality in Odisha coffee. The estate has invested significantly in post-harvest infrastructure, enabling lot separation by variety and processing method for traceability to individual micro-lots.",
    certifications: ["FSSAI", "APEDA", "ISO 22000"],
    exportReady: true,
    featured: true,
  },
  {
    id: "agrawal-plantation",
    name: "Agrawal Plantation",
    region: "Jeypore",
    district: "Koraput",
    elevation: "950–1100m",
    area: "18 acres",
    varieties: ["Robusta", "Arabica S795"],
    processing: ["washed", "natural"],
    flavorNotes: ["Dark Chocolate", "Earthy", "Mild Spice"],
    harvestSeason: "November – February",
    established: 1998,
    description:
      "Agrawal Plantation sits on the fertile slopes of the Eastern Ghats in the Jeypore belt of Koraput, one of Odisha's most established coffee-growing corridors. The estate practises sustainable cultivation under natural shade cover, allowing the coffee to develop slowly and express the terroir of these ancient hills.",
    story:
      "Founded in 1998 by the Agrawal family who were among the early adopters of commercial coffee cultivation in Odisha. Over two decades, they have expanded their processing infrastructure while remaining committed to manual picking and sun drying.",
    certifications: ["FSSAI", "APEDA"],
    exportReady: true,
    featured: true,
  },
  {
    id: "annapurna-coffee-estate",
    name: "Annapurna Coffee Estate",
    region: "Sunabeda",
    district: "Koraput",
    elevation: "1000–1200m",
    area: "24 acres",
    varieties: ["Arabica Catuai", "Robusta"],
    processing: ["washed", "honey"],
    flavorNotes: ["Floral", "Peach", "Light Caramel"],
    harvestSeason: "December – February",
    established: 2003,
    description:
      "Annapurna Coffee Estate is located in the Sunabeda plateau, one of Odisha's highest coffee-growing zones. The cool nights and warm days create ideal conditions for slow cherry development, producing beans with exceptional sweetness and clarity.",
    story:
      "Named after the goddess of harvest, Annapurna Estate was established with a vision to produce specialty-grade coffee from Odisha's highlands. The estate has pioneered honey processing in the region, creating coffees with pronounced sweetness that have drawn attention from specialty roasters.",
    certifications: ["FSSAI", "Organic India"],
    exportReady: true,
    featured: true,
  },
  {
    id: "bighneswari-plantation",
    name: "Bighneswari Plantation",
    region: "Narayanpatna",
    district: "Koraput",
    elevation: "800–1000m",
    area: "15 acres",
    varieties: ["Robusta"],
    processing: ["natural", "washed"],
    flavorNotes: ["Dark Berry", "Tobacco", "Woody"],
    harvestSeason: "November – January",
    established: 2001,
    description:
      "Bighneswari Plantation operates in the tribal heartland of Narayanpatna, where coffee cultivation has deep roots in the local agrarian economy. The plantation practices integrated farming alongside traditional crops, preserving biodiversity while producing robust, full-bodied coffees.",
    story:
      "The plantation takes its name from the local deity Bighneswari, and the family maintains the tradition of offering the first harvest at the village temple before processing begins — a practice that connects the estate to the cultural rhythms of Koraput.",
    certifications: ["FSSAI"],
    exportReady: false,
    featured: false,
  },
  {
    id: "dash-plantation",
    name: "Dash Plantation",
    region: "Koraput Town",
    district: "Koraput",
    elevation: "880–1050m",
    area: "11 acres",
    varieties: ["Robusta", "Arabica S795"],
    processing: ["washed"],
    flavorNotes: ["Cocoa", "Nutty", "Clean Finish"],
    harvestSeason: "December – February",
    established: 2006,
    description:
      "Dash Plantation is a focused, well-managed estate specialising in clean washed coffees. Located near Koraput town, the farm benefits from proximity to processing infrastructure while maintaining the altitude and forest cover essential for quality bean development.",
    story:
      "Run by the Dash family, this estate represents the new generation of Odisha coffee farmers — technically informed and quality-focused. The decision to specialise in washed processing was deliberate, aimed at producing transparent, terroir-driven cups that communicate Koraput's distinct mineral character.",
    certifications: ["FSSAI"],
    exportReady: false,
    featured: false,
  },
  {
    id: "durga-madhav-coffee-estate",
    name: "Durga Madhav Coffee Estate",
    region: "Similiguda",
    district: "Koraput",
    elevation: "900–1100m",
    area: "20 acres",
    varieties: ["Robusta", "Arabica S795"],
    processing: ["natural", "washed"],
    flavorNotes: ["Dark Chocolate", "Dried Fig", "Spice"],
    harvestSeason: "November – January",
    established: 2000,
    description:
      "Durga Madhav Coffee Estate is a family-run farm in the Similiguda area, known for its richly flavoured natural-processed Robustas. The estate follows traditional cultivation practices with minimal chemical inputs, relying on the natural fertility of the Eastern Ghats soil.",
    story:
      "Named in reverence to both the local deity Durga and the family patriarch Madhav, this estate has been shaped by two generations of the same family. The elder generation set the roots; the younger generation has embraced quality protocols and traceability standards to open export markets.",
    certifications: ["FSSAI"],
    exportReady: false,
    featured: false,
  },
  {
    id: "ekayani-plantation",
    name: "Ekayani Plantation",
    region: "Lamtaput",
    district: "Koraput",
    elevation: "950–1150m",
    area: "14 acres",
    varieties: ["Arabica Catimor", "Robusta"],
    processing: ["washed", "pulped-natural"],
    flavorNotes: ["Red Apple", "Brown Sugar", "Mild Citrus"],
    harvestSeason: "November – February",
    established: 2007,
    description:
      "Ekayani Plantation is a progressive estate in Lamtaput, experimenting with pulped-natural processing alongside conventional washed lots. The estate has been active in farmer collective programmes and contributes to Gray Cup's partner training initiatives for new growers in the region.",
    story:
      "Ekayani — meaning 'the singular one' in Odia — reflects the farm's identity as a distinct voice in Odisha coffee. The estate has positioned itself as a training ground for younger farmers, hosting demonstration processing days and sharing fermentation data across the Gray Cup partner network.",
    certifications: ["FSSAI", "APEDA"],
    exportReady: true,
    featured: false,
  },
  {
    id: "jayadhar-garden",
    name: "Jayadhar Garden",
    region: "Jeypore",
    district: "Koraput",
    elevation: "870–1020m",
    area: "9 acres",
    varieties: ["Robusta"],
    processing: ["natural"],
    flavorNotes: ["Blackberry", "Earthy", "Full Body"],
    harvestSeason: "November – January",
    established: 2004,
    description:
      "Jayadhar Garden is a smaller, artisanal estate specialising exclusively in natural-processed Robusta. The farm's low-intervention approach — long cherry drying on raised beds, no additives — produces exceptionally fruit-forward cups that challenge common perceptions of Robusta quality.",
    story:
      "Jayadhar Nayak inherited this plot from his grandfather and converted it to coffee after seeing neighbours' success. His deep attention to drying consistency — turning cherries hourly during peak sun, covering at night — has become a model for natural processing within the Odisha coffee community.",
    certifications: ["FSSAI"],
    exportReady: false,
    featured: false,
  },
  {
    id: "kakinada-plantation",
    name: "Kakinada Plantation",
    region: "Koraput",
    district: "Koraput",
    elevation: "920–1080m",
    area: "16 acres",
    varieties: ["Robusta", "Arabica S795"],
    processing: ["washed", "natural"],
    flavorNotes: ["Cocoa Nib", "Dried Plum", "Smooth"],
    harvestSeason: "December – February",
    established: 2002,
    description:
      "Kakinada Plantation produces balanced, approachable coffees from the central Koraput belt. Both washed and natural lots are produced on-site, giving the estate flexibility to respond to buyer requirements for different cup profiles.",
    story:
      "The Kakinada family have been a sourcing partner of Gray Cup since the early days, contributing to export pooling arrangements. Their consistent quality output has made them a reliable supplier in the domestic specialty market.",
    certifications: ["FSSAI", "APEDA"],
    exportReady: true,
    featured: false,
  },
  {
    id: "koraput-a1-coffee",
    name: "Koraput A-1 Coffee",
    region: "Koraput",
    district: "Koraput",
    elevation: "1000–1250m",
    area: "35 acres",
    varieties: ["Arabica S795", "Arabica SLN 9", "Robusta"],
    processing: ["washed", "natural", "honey"],
    flavorNotes: ["Caramel", "Orange Peel", "Dark Fruit"],
    harvestSeason: "November – March",
    established: 1992,
    description:
      "Koraput A-1 Coffee is one of the oldest and most established estates in Odisha, with a history stretching back over three decades. The estate's scale and infrastructure enable comprehensive lot separation across varieties and processing methods, making it a key supplier for export buyers seeking consistency and volume.",
    story:
      "Established before Odisha coffee had any formal identity, Koraput A-1 helped build the foundation of the region's reputation. The current management — third generation in the same family — has modernised the processing facility while maintaining the estate's commitment to shade-grown, chemical-free cultivation.",
    certifications: ["FSSAI", "APEDA", "Organic India", "ISO 22000"],
    exportReady: true,
    featured: true,
  },
  {
    id: "koraput-organic",
    name: "Koraput Organic",
    region: "Semiliguda",
    district: "Koraput",
    elevation: "900–1100m",
    area: "22 acres",
    varieties: ["Arabica S795", "Arabica Catuai"],
    processing: ["washed", "natural"],
    flavorNotes: ["Green Apple", "Floral", "Clean Sweetness"],
    harvestSeason: "December – February",
    established: 2010,
    description:
      "Koraput Organic is a certified organic estate that has taken a rigorous approach to soil health and biodiversity. The farm operates without synthetic inputs and is one of the few estates in Odisha with both national and international organic certification.",
    story:
      "The founders of Koraput Organic came from an environmental background and saw coffee cultivation as a way to align economic activity with ecological principles. Their certified organic lots have found a premium market with health-conscious roasters in Europe and Japan.",
    certifications: ["FSSAI", "APEDA", "India Organic", "EU Organic"],
    exportReady: true,
    featured: true,
  },
  {
    id: "laxmi-plantation",
    name: "Laxmi Plantation",
    region: "Kotpad",
    district: "Koraput",
    elevation: "850–1000m",
    area: "13 acres",
    varieties: ["Robusta"],
    processing: ["natural", "washed"],
    flavorNotes: ["Milk Chocolate", "Tobacco", "Earthy"],
    harvestSeason: "November – January",
    established: 2005,
    description:
      "Laxmi Plantation is a well-respected Robusta estate in the Kotpad region, producing rich, full-bodied coffees that are well suited to espresso blends and commercial roasting. The estate has built a loyal customer base among domestic roasters who value the consistency and character of Koraput Robusta.",
    story:
      "Named after the goddess of prosperity, Laxmi Plantation has been a steady contributor to the Gray Cup sourcing network. The family has been instrumental in organising group processing sessions among smaller neighbouring farms, helping raise quality standards across their valley.",
    certifications: ["FSSAI"],
    exportReady: false,
    featured: false,
  },
  {
    id: "maa-mangala-coffee-plantation",
    name: "Maa Mangala Coffee Plantation",
    region: "Jeypore",
    district: "Koraput",
    elevation: "950–1100m",
    area: "19 acres",
    varieties: ["Arabica S795", "Robusta"],
    processing: ["washed", "honey"],
    flavorNotes: ["Mango", "Honey", "Soft Spice"],
    harvestSeason: "December – February",
    established: 2008,
    description:
      "Maa Mangala Coffee Plantation is known for its distinctive honey-processed lots, which carry a pronounced sweetness reflecting the estate's tropical fruit-abundant microclimate in the Jeypore region. The farm is a showcase for how honey processing can express Odisha's warm fruit notes.",
    story:
      "The Mahapatra family named the estate after the revered goddess Maa Mangala, whose temple overlooks the plantation from the hilltop. Their honey-processed lots have been featured by specialty cafes in Mumbai and Bangalore, drawing wider attention to Odisha's specialty potential.",
    certifications: ["FSSAI", "APEDA"],
    exportReady: true,
    featured: false,
  },
  {
    id: "maa-sarala-plantation",
    name: "Maa Sarala Plantation",
    region: "Nabarangpur",
    district: "Nabarangpur",
    elevation: "820–980m",
    area: "17 acres",
    varieties: ["Robusta", "Arabica Catimor"],
    processing: ["natural", "washed"],
    flavorNotes: ["Ripe Berry", "Dark Chocolate", "Woody"],
    harvestSeason: "November – January",
    established: 2003,
    description:
      "Maa Sarala Plantation operates in the adjacent Nabarangpur district, extending Odisha's coffee belt beyond Koraput. The estate brings a slightly different terroir to the Gray Cup sourcing network — lower elevation with distinct seasonal rains — producing coffees with a heavier body and pronounced fruit character.",
    story:
      "This plantation was one of the first to bring coffee cultivation to Nabarangpur, inspired by success stories from neighbouring Koraput. The family has worked closely with Gray Cup to adapt best practices to the slightly different conditions of their district.",
    certifications: ["FSSAI"],
    exportReady: false,
    featured: false,
  },
  {
    id: "madhu-agro-plantation",
    name: "Madhu Agro Plantation",
    region: "Similiguda",
    district: "Koraput",
    elevation: "880–1050m",
    area: "21 acres",
    varieties: ["Robusta", "Arabica S795"],
    processing: ["washed", "natural"],
    flavorNotes: ["Brown Sugar", "Cocoa", "Clean Body"],
    harvestSeason: "November – February",
    established: 2001,
    description:
      "Madhu Agro Plantation is a mid-size estate known for well-balanced, consistent coffees. The farm operates a dual processing setup, producing both fully washed and natural lots from the same season's harvest, enabling comparison and buyer choice across the same terroir.",
    story:
      "Madhu Panda established this farm after two decades working in agricultural extension services in Odisha. His technical background is reflected in the estate's meticulous record-keeping — each lot is documented from cherry to bag, with moisture, defect, and cupping data retained for traceability.",
    certifications: ["FSSAI", "APEDA"],
    exportReady: true,
    featured: false,
  },
  {
    id: "mutiyalumma-coffee-estate",
    name: "Mutiyalumma Coffee Estate",
    region: "Koraput",
    district: "Koraput",
    elevation: "960–1120m",
    area: "14 acres",
    varieties: ["Arabica S795", "Robusta"],
    processing: ["washed"],
    flavorNotes: ["Almond", "Mild Citrus", "Sweet Finish"],
    harvestSeason: "December – February",
    established: 2006,
    description:
      "Mutiyalumma Coffee Estate produces clean, washed coffees that emphasise the mineral clarity of Koraput's highland soils. The estate's focus on washed processing produces cups that showcase the terroir without fermentation influence, making them well suited to light-roast specialty applications.",
    story:
      "The estate draws its name from the local tribal name for this land parcel, honouring the indigenous connection to the soil. The current owner has maintained this relationship with tribal workers who form the core of the picking team, ensuring that the harvest story connects people and place.",
    certifications: ["FSSAI"],
    exportReady: false,
    featured: false,
  },
  {
    id: "oak-winds-farm",
    name: "Oak Winds Farm",
    region: "Pottangi",
    district: "Koraput",
    elevation: "1150–1450m",
    area: "11 acres",
    varieties: ["Arabica SLN 9", "Arabica Catuai"],
    processing: ["washed", "honey"],
    flavorNotes: ["Bergamot", "Peach Tea", "Honey Crisp"],
    harvestSeason: "December – March",
    established: 2012,
    description:
      "Oak Winds Farm is Odisha's highest-altitude specialty coffee estate, perched in the Pottangi highlands where oak and silver oak trees provide near-total canopy cover. The extreme altitude and cool temperatures slow bean development dramatically, producing intensely aromatic coffees with bright, clean acidity.",
    story:
      "Founded by a former IT professional who left Bangalore to return to his Koraput roots, Oak Winds Farm is a passion project executed with precision. The farm has become a favourite among specialty buyers for its transparently documented lots and its willingness to experiment with new varieties and processing approaches.",
    certifications: ["FSSAI", "APEDA", "Rainforest Alliance"],
    exportReady: true,
    featured: true,
  },
  {
    id: "odisi-advance-telematic-system",
    name: "Odisi Advance Telematic System",
    region: "Koraput",
    district: "Koraput",
    elevation: "900–1050m",
    area: "8 acres",
    varieties: ["Robusta"],
    processing: ["washed"],
    flavorNotes: ["Clean", "Chocolate", "Low Acidity"],
    harvestSeason: "November – January",
    established: 2014,
    description:
      "Odisi Advance Telematic System is a technology-forward enterprise that integrates sensor-based monitoring into the growing and processing workflow. The estate uses IoT humidity and temperature sensors in the drying station and fermentation tanks to achieve unprecedented consistency in its washed lots.",
    story:
      "This estate started as a pilot programme to test whether precision agriculture technologies could be applied to small-holder coffee farming in Odisha. The results — lower defect rates, more consistent moisture content — have encouraged other partner farms to adopt similar monitoring tools.",
    certifications: ["FSSAI", "APEDA"],
    exportReady: true,
    featured: false,
  },
  {
    id: "panigrahi-agro-foundation",
    name: "Panigrahi Agro Foundation",
    region: "Semiliguda",
    district: "Koraput",
    elevation: "920–1100m",
    area: "26 acres",
    varieties: ["Arabica S795", "Arabica Catimor", "Robusta"],
    processing: ["washed", "natural", "honey"],
    flavorNotes: ["Dark Cherry", "Walnut", "Caramel"],
    harvestSeason: "November – February",
    established: 1999,
    description:
      "Panigrahi Agro Foundation operates as both an estate and a training centre for coffee quality in Odisha. The foundation has partnered with Gray Cup to run cupping labs and grower workshops, elevating the technical standards of the region's coffee sector.",
    story:
      "Established as a family estate, the Panigrahi Foundation has evolved into a knowledge hub for Odisha coffee. Their cupping lab — one of the few operational in the region — has trained over 50 farmers in sensory evaluation, helping growers connect processing decisions to final cup quality.",
    certifications: ["FSSAI", "APEDA", "ISO 22000"],
    exportReady: true,
    featured: true,
  },
  {
    id: "sm-plantation",
    name: "SM Plantation",
    region: "Boipariguda",
    district: "Koraput",
    elevation: "870–1020m",
    area: "12 acres",
    varieties: ["Robusta", "Arabica S795"],
    processing: ["natural", "washed"],
    flavorNotes: ["Dried Mango", "Earthy", "Medium Body"],
    harvestSeason: "November – January",
    established: 2007,
    description:
      "SM Plantation is a compact, well-run estate in the Boipariguda belt known for its fruit-forward natural lots. The estate focuses on selective hand-picking at optimum ripeness, a factor that significantly elevates the quality of naturally processed coffees by reducing underripe and overripe cherry in the drying batch.",
    story:
      "The SM Plantation team has been a quiet but consistent presence in Odisha coffee circles. Their methodical approach to cherry selection — sorting by float before any processing begins — has been highlighted in Gray Cup sourcing documentation as a model practice.",
    certifications: ["FSSAI"],
    exportReady: false,
    featured: false,
  },
  {
    id: "sri-sai-plantation",
    name: "Sri Sai Plantation",
    region: "Koraput",
    district: "Koraput",
    elevation: "900–1080m",
    area: "15 acres",
    varieties: ["Robusta", "Arabica S795"],
    processing: ["washed", "honey"],
    flavorNotes: ["Toffee", "Light Berry", "Smooth Body"],
    harvestSeason: "December – February",
    established: 2004,
    description:
      "Sri Sai Plantation produces polished, approachable coffees from the Koraput highlands. The estate's honey-processed lots in particular have built a following among roasters seeking sweetness-forward coffees without the intensity of full natural processing.",
    story:
      "Named after the beloved saint Sai Baba, this plantation reflects the family's devotion and care in everything they do. The estate is noted among Odisha coffee producers for its worker welfare programme, which includes housing, healthcare, and school fee support for the children of permanent farm staff.",
    certifications: ["FSSAI", "APEDA"],
    exportReady: true,
    featured: false,
  },
  {
    id: "trinetra-agro",
    name: "Trinetra Agro",
    region: "Narayanpatna",
    district: "Koraput",
    elevation: "880–1060m",
    area: "18 acres",
    varieties: ["Arabica S795", "Robusta"],
    processing: ["washed", "natural"],
    flavorNotes: ["Hazelnut", "Dark Chocolate", "Earthy Sweetness"],
    harvestSeason: "November – February",
    established: 2005,
    description:
      "Trinetra Agro is a mid-size estate in Narayanpatna known for its well-structured, chocolatey coffees. Both washed and natural lots are produced, with the natural processing taking place on purpose-built raised beds that allow optimal airflow during the Koraput dry season.",
    story:
      "Trinetra — meaning 'three-eyed', a reference to Lord Shiva — reflects the triple focus the estate places on cultivation, processing, and people. The founders believe quality coffee begins with the seed, continues through thoughtful processing, and is only complete when the farmer who grew it is fairly compensated.",
    certifications: ["FSSAI"],
    exportReady: false,
    featured: false,
  },
  {
    id: "urbara-plantation",
    name: "Urbara Plantation",
    region: "Semiliguda",
    district: "Koraput",
    elevation: "960–1150m",
    area: "23 acres",
    varieties: ["Arabica SLN 9", "Arabica S795", "Robusta"],
    processing: ["washed", "honey", "natural"],
    flavorNotes: ["Tropical Fruit", "Jasmine", "Soft Acidity"],
    harvestSeason: "December – February",
    established: 2008,
    description:
      "Urbara Plantation — 'Urbara' meaning fertile land in Sanskrit — lives up to its name with a diverse portfolio of varieties and processing methods. The estate has invested in a full wet mill and covered drying infrastructure, enabling year-round lot production and consistent quality across seasons.",
    story:
      "Co-founded by a husband-wife team from agricultural backgrounds, Urbara Plantation has brought a scientific and entrepreneurial energy to Odisha coffee. Their approach to varietal separation and lot documentation has set a benchmark for traceability within the Odisha coffee farming community.",
    certifications: ["FSSAI", "APEDA", "Organic India"],
    exportReady: true,
    featured: false,
  },
];

export function getFarmBySlug(slug: string): Farm | undefined {
  return farms.find((f) => f.id === slug);
}

export const featuredFarms = farms.filter((f) => f.featured);

export const processingColors: Record<ProcessingMethod, string> = {
  washed: "bg-[#1E3A8A] text-white",
  natural: "bg-[#C2410C] text-white",
  honey: "bg-[#E3A008] text-black",
  "pulped-natural": "bg-[#3A7D44] text-white",
};

export const processingLabels: Record<ProcessingMethod, string> = {
  washed: "Washed",
  natural: "Natural",
  honey: "Honey",
  "pulped-natural": "Pulped Natural",
};
