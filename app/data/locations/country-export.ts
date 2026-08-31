// Per-country export context for /:country/green-coffee. The point is that no
// two country pages read the same: shipping route + transit, import/compliance
// regime, and a country-specific market note all vary. Facts are industry
// ballparks (sea transit) and public regulation (HS 0901.11, EUDR, FDA FSVP,
// GACC Decree 248, DAFF biosecurity, etc.) — buyers are told to confirm their
// own tariff line and current rules.

export type RegionKey =
  | "north-eu" | "nordics" | "alpine" | "south-eu" | "micro-eu"
  | "cee" | "balkans" | "east-eu" | "uk" | "north-america"
  | "gcc" | "levant" | "turkey-caucasus" | "east-asia" | "sea"
  | "south-asia" | "oceania" | "central-asia" | "russia";

export interface RegionInfo {
  label: string;
  originPorts: string;      // Indian load ports
  transit: string;          // typical sea transit
  route: string;            // sentence describing the routing
  duty: string;             // import duty on green coffee (HS 0901.11)
  compliance: string;       // the headline regulatory requirement
  container: string;        // container / MOQ guidance
}

export const REGION_INFO: Record<RegionKey, RegionInfo> = {
  "north-eu": {
    label: "Western Europe",
    originPorts: "Nhava Sheva (Mumbai) or Mundra",
    transit: "22–28 days",
    route: "Direct or single-transhipment services run to Hamburg, Rotterdam and Antwerp, the three gateways that handle most of the green coffee entering the EU.",
    duty: "Green (unroasted, non-decaffeinated) coffee under HS 0901.11 enters the EU duty-free.",
    compliance: "The EU Deforestation Regulation (EUDR) covers coffee: each lot needs plot geolocation and a due-diligence statement. We supply GPS polygon data for every partner plot.",
    container: "20 ft (approx. 18–19 MT in GrainPro-lined jute) is the standard export unit; LCL is available for 500 kg and up.",
  },
  nordics: {
    label: "the Nordics",
    originPorts: "Nhava Sheva or Mundra",
    transit: "25–31 days",
    route: "Boxes route via Hamburg or Bremerhaven with feeder legs to Gothenburg, Aarhus, Oslo and Helsinki.",
    duty: "Duty-free under HS 0901.11 across the EU members; Norway and Iceland apply no tariff on green coffee either.",
    compliance: "Sweden, Denmark and Finland apply the EUDR (plot geolocation + due-diligence statement). Norway and Iceland sit outside the EUDR but importers increasingly ask for the same traceability pack — which we provide.",
    container: "20 ft FCL or LCL from 500 kg; Nordic roasters often split a container across two or three estates.",
  },
  alpine: {
    label: "the Alpine region",
    originPorts: "Nhava Sheva",
    transit: "24–30 days to the seaport, then rail inland",
    route: "Ocean legs discharge at Rotterdam, Antwerp or Genoa; the final move to Switzerland and Liechtenstein is by bonded rail or road.",
    duty: "Switzerland and Liechtenstein levy no customs duty on green coffee, though a small weight-based tax and VAT apply on import.",
    compliance: "Outside the EU, so the EUDR does not directly apply, but Swiss importers generally request the same geolocation and traceability documentation. Federal Food Safety (FSVO) residue limits apply.",
    container: "20 ft FCL routed to a Swiss dry port (Basel) or LCL consolidated in Rotterdam.",
  },
  "south-eu": {
    label: "Southern Europe",
    originPorts: "Nhava Sheva or Mundra",
    transit: "16–23 days",
    route: "The Suez routing makes Mediterranean ports the fastest European option — Genoa, Gioia Tauro, Barcelona, Valencia and Piraeus.",
    duty: "Duty-free under HS 0901.11 across the EU.",
    compliance: "The EUDR applies: plot geolocation and a due-diligence statement per lot. Italy and Spain are among the strictest on documentation at entry.",
    container: "20 ft FCL is standard; Mediterranean transit times make single-estate LCL lots practical for espresso roasters.",
  },
  "micro-eu": {
    label: "the European micro-states",
    originPorts: "Nhava Sheva",
    transit: "18–24 days to the gateway port",
    route: "Shipments clear through the surrounding customs union — Italy for San Marino and Vatican City, Spain or France for Andorra — then move inland by road.",
    duty: "Duty-free under HS 0901.11; import formalities are handled by the host country's customs.",
    compliance: "EUDR obligations apply via the host member state's importer of record.",
    container: "LCL is the norm at this scale; a full 20 ft is unusual.",
  },
  cee: {
    label: "Central and Eastern Europe",
    originPorts: "Nhava Sheva or Mundra",
    transit: "20–28 days",
    route: "Cargo discharges at Gdańsk, Koper or Constanța, or at North Sea ports with rail onward to Poland, Czechia, Hungary and the Baltics.",
    duty: "Duty-free under HS 0901.11 across the EU.",
    compliance: "The EUDR applies. Gdańsk and Koper have become popular EUDR-ready entry points with bonded warehousing for staged customs clearance.",
    container: "20 ft FCL to Gdańsk or Koper; LCL from 500 kg via Hamburg consolidation.",
  },
  balkans: {
    label: "the Western Balkans",
    originPorts: "Nhava Sheva",
    transit: "18–25 days to port",
    route: "Ocean legs land at Piraeus, Koper, Rijeka or Bar; onward movement is by road under CEFTA transit.",
    duty: "Most Western Balkan states apply little or no duty on green coffee; confirm your national tariff line as rates vary.",
    compliance: "Outside the EU, so no EUDR obligation yet, but EU-facing roasters here still ask for full traceability. National food-safety registration applies.",
    container: "LCL is common; 20 ft FCL for the larger Serbian and Croatian roasters.",
  },
  "east-eu": {
    label: "Eastern Europe",
    originPorts: "Nhava Sheva",
    transit: "22–30 days plus overland",
    route: "Routing is via Constanța or Gdańsk with rail and road onward. Services to Ukraine and Belarus are disrupted; we quote current options case by case.",
    duty: "Moldova applies no duty under its EU association arrangement; confirm the line for Ukraine and Belarus.",
    compliance: "Not in EUDR scope, but Moldovan and Ukrainian roasters exporting finished coffee to the EU increasingly need the geolocation pack.",
    container: "LCL via a Romanian or Polish consolidation point is the practical default.",
  },
  uk: {
    label: "the United Kingdom",
    originPorts: "Nhava Sheva or Mundra",
    transit: "24–30 days",
    route: "Direct calls to Felixstowe, London Gateway and Southampton; Suez routing, with occasional Cape re-routing when the Red Sea is disrupted.",
    duty: "The UK Global Tariff sets green coffee at 0%. Import VAT applies and is reclaimable by registered businesses.",
    compliance: "The UK is not in the EUDR. Forthcoming due-diligence rules under Schedule 17 of the Environment Act will cover forest-risk commodities; our traceability pack already meets the expected standard.",
    container: "20 ft FCL to Felixstowe or London Gateway; LCL widely available for micro-roasters.",
  },
  "north-america": {
    label: "North America",
    originPorts: "Nhava Sheva or Mundra",
    transit: "24–30 days to the US West Coast, 28–38 days to the East Coast and Canada",
    route: "West Coast boxes (Los Angeles, Oakland, Seattle, Vancouver) route via the Pacific; East Coast and Gulf (New York, Savannah, Houston, Montreal) via Suez.",
    duty: "Green coffee is free under HTSUS 0901.11.00 for the US and MFN-free for Canada.",
    compliance: "US: FDA Prior Notice per shipment, FDA food-facility registration, and an importer running a Foreign Supplier Verification Program (FSVP). Canada: a Safe Food for Canadians (SFCR) licence and preventive-control plan.",
    container: "20 ft FCL is standard; spot LCL is available but US customs and FDA holds move faster on full containers.",
  },
  gcc: {
    label: "the GCC",
    originPorts: "Nhava Sheva",
    transit: "5–10 days",
    route: "The Arabian Sea crossing is the shortest of any export lane — direct services to Jebel Ali, Dammam, Hamad, Shuwaikh and Sohar.",
    duty: "The GCC common external tariff is 5%, though several members zero-rate green coffee; confirm the applied rate for your emirate or port.",
    compliance: "Saudi Arabia requires SABER / SFDA registration and a Certificate of Conformity; the UAE routes food imports through the ZAD / Montaji platform. Halal certification is not required for green coffee.",
    container: "Fast transit makes 20 ft FCL efficient; re-export from Jebel Ali to the wider region is common.",
  },
  levant: {
    label: "the Levant",
    originPorts: "Nhava Sheva",
    transit: "7–14 days",
    route: "Discharge at Aqaba, Beirut, Haifa, Ashdod or Umm Qasr; onward by road. We advise on current routing where ports are congested or restricted.",
    duty: "Jordan and Lebanon apply low or nil duty on green coffee; Israel is duty-free under HS 0901.11. Confirm the current line for your market.",
    compliance: "National food-import registration applies (e.g. Jordan FDA, Israel Ministry of Health). Documentation must match the commercial invoice exactly to clear quickly.",
    container: "20 ft FCL to Aqaba or Haifa; LCL via a Jebel Ali consolidation is a common workaround.",
  },
  "turkey-caucasus": {
    label: "Türkiye and the Caucasus",
    originPorts: "Nhava Sheva",
    transit: "10–18 days",
    route: "Mediterranean routing to Mersin and Istanbul; Georgia and Armenia via Poti or Batumi, Azerbaijan via Baku after a Black Sea or Caspian leg.",
    duty: "Türkiye applies a duty plus mass-housing fund levy on green coffee — budget for it. Georgia is effectively duty-free; confirm Armenian and Azerbaijani lines.",
    compliance: "Türkiye requires an importer's control certificate and TSE conformity. The Caucasus states apply standard food-safety registration.",
    container: "20 ft FCL to Mersin; LCL for the smaller Georgian and Armenian specialty roasters.",
  },
  "east-asia": {
    label: "East Asia",
    originPorts: "Nhava Sheva or Chennai",
    transit: "14–22 days",
    route: "Frequent direct services to Shanghai, Ningbo, Busan, Kaohsiung, Yokohama and Kobe; Hong Kong and Singapore act as transhipment hubs.",
    duty: "Green coffee is duty-free into Japan, South Korea, Hong Kong and Macau; mainland China applies a low MFN rate.",
    compliance: "China requires overseas food-manufacturer registration with GACC under Decree 248. Japan enforces plant-quarantine inspection and the positive-list pesticide-residue system — the strictest in the region. Korea clears through the MFDS.",
    container: "20 ft FCL is standard; Japanese and Korean roasters frequently buy single-estate LCL lots of 300–1,000 kg.",
  },
  sea: {
    label: "Southeast Asia",
    originPorts: "Chennai or Nhava Sheva",
    transit: "6–12 days",
    route: "Short, high-frequency services to Singapore, Port Klang, Laem Chabang and Ho Chi Minh City; Singapore is also the region's re-export hub.",
    duty: "Singapore is a free port with no duty on green coffee; most ASEAN members apply low rates.",
    compliance: "Singapore clears through SFA; other markets use their national food agency. Phytosanitary and origin documents are the main requirement.",
    container: "LCL from 500 kg is easy given the short transit; 20 ft FCL for roastery-scale buyers.",
  },
  "south-asia": {
    label: "South Asia",
    originPorts: "Chennai, Kolkata or by road",
    transit: "3–10 days by sea; overland for the landlocked markets",
    route: "Sea legs to Chattogram, Colombo, Malé and Karachi; Nepal and Bhutan move by road through Kolkata or the Panitanki / Phuentsholing borders.",
    duty: "SAFTA and bilateral arrangements keep duty low for most neighbours; Nepal and Bhutan clear against Indian export documentation.",
    compliance: "Standard phytosanitary certificate and certificate of origin. Being a regional-origin shipment keeps paperwork light.",
    container: "LCL and part-load road freight are the norm; the short distances make small orders viable.",
  },
  oceania: {
    label: "Australia and the Pacific",
    originPorts: "Nhava Sheva or Chennai",
    transit: "18–26 days",
    route: "Direct and single-transhipment services to Melbourne, Sydney, Brisbane and Fremantle.",
    duty: "Green coffee enters Australia duty-free.",
    compliance: "Australia runs one of the world's strictest biosecurity regimes: every green-coffee consignment is inspected by DAFF on arrival and may require heat treatment or fumigation. Clean, well-dried, pest-free lots and precise packing declarations are essential — our export lots are prepared to this standard.",
    container: "20 ft FCL to Melbourne or Sydney; LCL is available but biosecurity inspection is faster on FCL.",
  },
  "central-asia": {
    label: "Central Asia",
    originPorts: "Nhava Sheva",
    transit: "20–35 days",
    route: "Routing is via Bandar Abbas (Iran) and rail through the International North–South Transport Corridor, or via a Chinese port and the land bridge.",
    duty: "Kazakhstan and Kyrgyzstan apply the EAEU common tariff; other states set their own low rates. Confirm before ordering.",
    compliance: "EAEU technical-regulation (TR CU) conformity for Kazakhstan and Kyrgyzstan; national food registration elsewhere.",
    container: "20 ft FCL by rail; consolidation through a Dubai freight forwarder is a common alternative.",
  },
  russia: {
    label: "Russia",
    originPorts: "Nhava Sheva",
    transit: "25–40 days",
    route: "Via Novorossiysk on the Black Sea, St Petersburg, or the INSTC rail corridor through Iran. Payment and banking routing must be arranged in advance.",
    duty: "Russia applies a low MFN rate on green coffee under HS 0901.11.",
    compliance: "EAEU TR CU conformity declaration and Rospotrebnadzor registration. Sanctions-related banking and shipping constraints apply — we confirm feasibility before accepting an order.",
    container: "20 ft FCL only; LCL options are limited on this lane.",
  },
};

interface CountryExport {
  region: RegionKey;
  port: string;   // destination port / entry point
  note: string;   // country-specific market sentence(s)
}

export const COUNTRY_EXPORT: Record<string, CountryExport> = {
  germany: { region: "north-eu", port: "Hamburg", note: "Germany is the largest green-coffee importer in Europe and the continent's main re-export hub; Hamburg's bonded coffee warehouses set the reference for quality handling. Berlin, Hamburg and Munich have deep third-wave roaster scenes that seek out new origins." },
  netherlands: { region: "north-eu", port: "Rotterdam", note: "Rotterdam and Amsterdam are Europe's coffee-logistics core, with the largest bonded storage capacity on the continent. Dutch roasters and traders often take Indian lots for onward distribution across the EU." },
  belgium: { region: "north-eu", port: "Antwerp", note: "Antwerp is the world's largest coffee port by warehoused volume. Belgian specialty roasters in Antwerp, Ghent and Brussels are active buyers of washed and honey micro-lots." },
  france: { region: "north-eu", port: "Le Havre", note: "Le Havre and Marseille handle France's green-coffee imports. Paris, Lyon and Nantes have fast-growing specialty scenes, and French roasters show strong interest in natural and honey Indian Arabicas." },
  austria: { region: "north-eu", port: "Koper (via rail)", note: "Austrian imports route through Koper, Hamburg or Trieste with rail onward to Vienna. Vienna's café tradition and a compact but serious specialty scene make it a steady market for single-estate lots." },
  luxembourg: { region: "micro-eu", port: "Antwerp / Rotterdam", note: "Luxembourg's small roaster base is supplied through Belgian and Dutch ports. Orders are almost always LCL, frequently split across estates." },
  ireland: { region: "north-eu", port: "Dublin", note: "Dublin and Cork receive feeder services from Rotterdam and Antwerp. Ireland's specialty scene, centred on Dublin, has expanded quickly and favours bright washed profiles." },
  monaco: { region: "micro-eu", port: "Marseille / Genoa", note: "Monaco's hospitality-driven demand is served through French and Italian ports in small quantities, typically for hotel and restaurant roasters." },

  norway: { region: "nordics", port: "Oslo", note: "Norway has one of the highest per-capita coffee consumptions in the world and a light-roast filter culture that rewards clean, high-grown washed lots — a good match for Koraput AAA." },
  sweden: { region: "nordics", port: "Gothenburg", note: "Sweden's fika culture and Stockholm's influential roasters make it a trend-setting market; Swedish buyers were early adopters of Indian specialty coffee in the Nordics." },
  denmark: { region: "nordics", port: "Aarhus", note: "Copenhagen's roasters are known for extreme light roasting and origin transparency, and actively seek lesser-known origins like the Eastern Ghats." },
  finland: { region: "nordics", port: "Helsinki", note: "Finland leads the world in per-capita coffee consumption. The market is filter-dominant and increasingly interested in traceable single origins beyond the classic Latin American names." },
  iceland: { region: "nordics", port: "Reykjavík (via Rotterdam)", note: "Iceland's small but sophisticated Reykjavík roaster scene imports via Rotterdam feeders in LCL quantities." },

  switzerland: { region: "alpine", port: "Basel (dry port)", note: "Switzerland is home to some of the largest coffee companies in the world and a dense specialty scene in Zurich, Geneva and Bern. High willingness to pay for traceable micro-lots." },
  liechtenstein: { region: "alpine", port: "Basel (via Switzerland)", note: "Liechtenstein clears through the Swiss customs union; the handful of roasters here buy alongside Swiss partners." },

  italy: { region: "south-eu", port: "Genoa", note: "Italy is the espresso heartland and a major green-coffee importer through Genoa, Trieste and Savona. Beyond the big industrial roasters, a new wave of specialty roasters in Milan, Bologna and Florence buys natural and honey lots for filter and modern espresso." },
  spain: { region: "south-eu", port: "Barcelona", note: "Barcelona and Valencia handle Spain's imports. Madrid, Barcelona and Bilbao have rapidly growing specialty scenes moving away from the traditional torrefacto style toward clean single origins." },
  portugal: { region: "south-eu", port: "Lisbon", note: "Lisbon and Porto receive feeder services from the Mediterranean hubs. Portugal's specialty scene is young and growing, with strong interest in natural-process coffees." },
  greece: { region: "south-eu", port: "Piraeus", note: "Piraeus is one of the fastest Mediterranean gateways from India. Athens and Thessaloniki have vibrant café cultures and a maturing specialty roaster base." },
  malta: { region: "south-eu", port: "Marsaxlokk", note: "Malta's compact market is supplied through its own transhipment hub at Marsaxlokk, usually in LCL quantities for local roasters and the hospitality sector." },
  cyprus: { region: "south-eu", port: "Limassol", note: "Limassol handles Cyprus's imports. Demand is split between traditional Cypriot coffee preparation and a small but growing specialty segment in Nicosia and Limassol." },

  poland: { region: "cee", port: "Gdańsk", note: "Gdańsk has become a major Baltic coffee gateway with EUDR-ready bonded storage. Warsaw, Kraków and Wrocław host one of the largest and fastest-growing specialty scenes in Central Europe." },
  "czech-republic": { region: "cee", port: "Hamburg (via rail)", note: "Czech imports route through Hamburg or Koper with rail to Prague. Prague and Brno have a dense, quality-focused roaster community." },
  slovakia: { region: "cee", port: "Koper (via rail)", note: "Slovakia clears through Koper or Hamburg with onward rail to Bratislava, where a small specialty scene buys micro-lots alongside Czech partners." },
  hungary: { region: "cee", port: "Koper (via rail)", note: "Budapest's specialty roasters, supplied via Koper and Rijeka, have built a strong reputation in Central Europe and actively seek new origins." },
  romania: { region: "cee", port: "Constanța", note: "Constanța is the Black Sea's largest port and a direct entry point from India via Suez. Bucharest and Cluj have thriving specialty scenes." },
  bulgaria: { region: "cee", port: "Varna / Burgas", note: "Bulgaria's Black Sea ports give short transit from India. Sofia and Plovdiv have a young specialty roaster base." },
  croatia: { region: "cee", port: "Rijeka", note: "Rijeka is a fast Adriatic gateway. Zagreb and Split have an established café culture and a growing number of specialty roasters." },
  slovenia: { region: "cee", port: "Koper", note: "Koper is one of the most EUDR-ready ports in the EU and a preferred entry point for Central European roasters. Ljubljana's specialty scene punches above its weight." },
  estonia: { region: "cee", port: "Tallinn", note: "Tallinn receives feeder services from Hamburg and Gdańsk. Estonia's digital-forward specialty roasters value the full traceability pack." },
  latvia: { region: "cee", port: "Riga", note: "Riga is a Baltic logistics hub with good bonded storage. Latvian roasters buy alongside Estonian and Lithuanian partners." },
  lithuania: { region: "cee", port: "Klaipėda", note: "Klaipėda handles Lithuania's imports. Vilnius and Kaunas have an active specialty scene focused on light-roast filter coffee." },

  serbia: { region: "balkans", port: "Koper / Thessaloniki", note: "Serbia's roasters, supplied via Koper or Thessaloniki, lead the Western Balkans specialty scene, centred on Belgrade and Novi Sad." },
  "bosnia-and-herzegovina": { region: "balkans", port: "Ploče / Koper", note: "Bosnian imports route through Ploče or Koper. Sarajevo's strong coffee culture is beginning to branch into specialty single origins." },
  montenegro: { region: "balkans", port: "Bar", note: "The port of Bar gives Montenegro direct Adriatic access. Demand is hospitality-led along the coast, with a small specialty scene in Podgorica." },
  "north-macedonia": { region: "balkans", port: "Thessaloniki", note: "North Macedonia clears through Thessaloniki with road onward to Skopje, where a young specialty roaster base is emerging." },
  albania: { region: "balkans", port: "Durrës", note: "Durrës is Albania's main port. Tirana has a fast-growing café scene and rising interest in traceable single-origin coffee." },
  kosovo: { region: "balkans", port: "Durrës / Thessaloniki", note: "Kosovo is landlocked and clears via Durrës or Thessaloniki. Pristina's café culture is strong and increasingly specialty-minded." },

  moldova: { region: "east-eu", port: "Constanța", note: "Moldova clears through Constanța with road onward to Chișinău, where a small specialty scene is developing under the country's EU-association trade terms." },
  ukraine: { region: "east-eu", port: "Constanța / Gdańsk", note: "Wartime disruption to Ukrainian ports means shipments route via Romania or Poland with overland onward legs. We quote current feasibility case by case; Kyiv and Lviv retain an active roaster community." },
  belarus: { region: "east-eu", port: "Klaipėda / Gdańsk", note: "Belarus is landlocked and clears via Baltic ports with overland transit. Banking and routing constraints apply and we confirm feasibility before accepting orders." },

  "united-kingdom": { region: "uk", port: "Felixstowe", note: "The UK is one of the largest specialty markets outside the US, with major roaster hubs in London, Bristol, Manchester and Glasgow. British buyers were among the earliest international customers for Indian specialty coffee." },

  usa: { region: "north-america", port: "New York / Los Angeles", note: "The US is the world's largest specialty-coffee market. Roaster clusters in Portland, Seattle, the Bay Area, Chicago, New York and North Carolina are actively seeking Indian origins for filter and single-origin espresso menus." },
  canada: { region: "north-america", port: "Vancouver / Montreal", note: "Canada's specialty scene is concentrated in Vancouver, Toronto and Montreal. West Coast roasters get the fastest transit from India via the Pacific." },

  uae: { region: "gcc", port: "Jebel Ali", note: "The UAE is the Middle East's specialty-coffee hub and a major re-export point. Dubai and Abu Dhabi have a dense roaster and café scene, and Jebel Ali's fast transit from India supports frequent small shipments." },
  "saudi-arabia": { region: "gcc", port: "Dammam / Jeddah", note: "Saudi Arabia is the largest coffee market in the GCC by volume, with a deep-rooted coffee culture and a rapidly modernising specialty segment in Riyadh, Jeddah and the Eastern Province." },
  qatar: { region: "gcc", port: "Hamad", note: "Qatar's Hamad Port gives direct short-sea access from India. Doha's specialty scene has grown quickly, driven by hospitality and a young café culture." },
  kuwait: { region: "gcc", port: "Shuwaikh", note: "Kuwait has one of the region's most developed specialty scenes relative to its size, with Kuwait City roasters importing green coffee directly." },
  bahrain: { region: "gcc", port: "Khalifa Bin Salman", note: "Bahrain's compact market is served by short-sea services from India and often by re-export from Jebel Ali. Manama has an active specialty café scene." },
  oman: { region: "gcc", port: "Sohar / Salalah", note: "Oman's Sohar and Salalah ports sit directly on the India–Gulf lane. Muscat's specialty scene is emerging, with strong traditional coffee culture alongside." },

  jordan: { region: "levant", port: "Aqaba", note: "Aqaba is Jordan's only seaport and a direct call from India. Amman has a lively specialty café scene and imports green coffee for local roasting." },
  lebanon: { region: "levant", port: "Beirut", note: "Beirut's roasters maintain a strong specialty culture despite economic pressures; shipments are timed around port capacity and banking arrangements." },
  israel: { region: "levant", port: "Haifa / Ashdod", note: "Israel has a mature specialty scene concentrated in Tel Aviv, Haifa and Jerusalem, with roasters importing green coffee directly and duty-free." },
  iraq: { region: "levant", port: "Umm Qasr", note: "Umm Qasr handles Iraq's seaborne imports. Demand is led by traditional coffee preparation, with a nascent specialty scene in Baghdad and Erbil." },
  syria: { region: "levant", port: "Latakia", note: "Latakia is Syria's main port. Trade is constrained by sanctions and payment routing; we confirm feasibility before accepting any order." },
  palestine: { region: "levant", port: "Haifa / Ashdod (transit)", note: "Goods for the Palestinian market transit Israeli ports under the customs-union arrangement, then move inland. Ramallah has a small specialty roaster presence." },
  yemen: { region: "levant", port: "Aden / Hodeidah", note: "Yemen is a historic coffee origin in its own right; imports of Indian green coffee are limited and constrained by the security situation. We assess each enquiry individually." },

  turkey: { region: "turkey-caucasus", port: "Mersin / Istanbul", note: "Türkiye has a fast-growing specialty scene in Istanbul, Ankara and Izmir alongside its deep Turkish-coffee tradition. Note the import duty and mass-housing fund levy on green coffee when pricing." },
  armenia: { region: "turkey-caucasus", port: "Poti (via Georgia)", note: "Armenia is landlocked and clears via Georgian ports. Yerevan's café culture is strong and its specialty roaster base is expanding." },
  azerbaijan: { region: "turkey-caucasus", port: "Baku", note: "Azerbaijan is reached via a Black Sea leg to Georgia and rail, or across the Caspian to Baku. Baku's specialty scene is young but growing on the back of hospitality demand." },
  georgia: { region: "turkey-caucasus", port: "Poti / Batumi", note: "Georgia is effectively duty-free on green coffee and has become a regional trade gateway. Tbilisi's specialty scene is one of the most dynamic in the Caucasus." },

  china: { region: "east-asia", port: "Shanghai", note: "China's specialty market is expanding faster than any other, centred on Shanghai, Shenzhen, Beijing and the domestic-origin hub of Yunnan. GACC Decree 248 registration of the exporting facility is mandatory — we are set up for it." },
  "hong-kong": { region: "east-asia", port: "Hong Kong", note: "Hong Kong is a free port with no duty on green coffee and a dense specialty roaster and café scene, and it serves as a re-export gateway into southern China." },
  macau: { region: "east-asia", port: "Macau (via Hong Kong)", note: "Macau's hospitality-driven demand is supplied largely through Hong Kong in small quantities." },
  taiwan: { region: "east-asia", port: "Kaohsiung", note: "Taiwan has one of the most competition-focused specialty scenes in the world, with Taipei, Taichung and Tainan roasters buying single-estate micro-lots and paying premiums for distinctive processing." },
  "south-korea": { region: "east-asia", port: "Busan", note: "South Korea is a top-five global specialty market. Seoul's café density is among the highest anywhere, and Korean roasters actively seek new origins and experimental processing." },
  "north-korea": { region: "east-asia", port: "Nampo", note: "Trade with North Korea is restricted under international sanctions. We are unable to ship green coffee to this market." },
  mongolia: { region: "east-asia", port: "Tianjin (via China rail)", note: "Mongolia is landlocked and supplied via Chinese ports and rail to Ulaanbaatar, where a small urban specialty scene is emerging." },

  japan: { region: "east-asia", port: "Yokohama / Kobe", note: "Japan is a benchmark specialty market with exacting standards. Roasters in Tokyo, Osaka, Kyoto and Fukuoka value clean cup character and consistency. Plan for MAFF plant-quarantine inspection and the strict positive-list pesticide-residue system." },

  singapore: { region: "sea", port: "Singapore", note: "Singapore is a free port and the region's coffee-trade hub, with a mature specialty scene and a role as a re-export point into Southeast Asia. Short transit from Chennai makes small, frequent shipments practical." },

  bangladesh: { region: "south-asia", port: "Chattogram", note: "Chattogram is a short sea hop from Indian east-coast ports. Dhaka's café culture is growing quickly and a domestic roasting industry is taking shape." },
  "sri-lanka": { region: "south-asia", port: "Colombo", note: "Colombo is one of South Asia's largest transhipment hubs and very close to Indian ports. Sri Lanka has a small but rising specialty roaster scene in Colombo." },
  nepal: { region: "south-asia", port: "Kolkata (then road)", note: "Nepal is landlocked; shipments move by road through Kolkata and the Panitanki–Kakarbhitta or Raxaul borders. Kathmandu has an active café scene and a domestic coffee industry of its own." },
  bhutan: { region: "south-asia", port: "Kolkata (then road via Phuentsholing)", note: "Bhutan clears against Indian export documentation and moves by road via Phuentsholing. Volumes are small and hospitality-led." },
  maldives: { region: "south-asia", port: "Malé", note: "The Maldives market is driven almost entirely by resort hospitality; shipments are LCL and timed to resort supply cycles." },
  pakistan: { region: "south-asia", port: "Karachi", note: "Karachi handles Pakistan's imports. A specialty café scene is emerging in Karachi, Lahore and Islamabad, though direct India–Pakistan trade routing depends on current bilateral conditions." },
  afghanistan: { region: "south-asia", port: "Karachi (transit) / Chabahar", note: "Afghanistan is landlocked and supplied via Karachi or Chabahar with overland onward transit. Volumes are limited and we assess each enquiry individually." },

  australia: { region: "oceania", port: "Melbourne / Sydney", note: "Australia has one of the world's most developed specialty scenes, led by Melbourne and Sydney, and a strong filter and milk-based espresso culture. Every consignment is inspected by DAFF biosecurity on arrival, so lot cleanliness and packing declarations matter." },

  kazakhstan: { region: "central-asia", port: "Aktau / rail", note: "Kazakhstan is reached via the INSTC corridor through Iran or via a Chinese port and rail. Almaty and Astana have a young, fast-growing specialty scene. EAEU TR CU conformity applies." },
  kyrgyzstan: { region: "central-asia", port: "rail via Kazakhstan", note: "Kyrgyzstan clears via Kazakhstan under the EAEU. Bishkek has a small urban café scene supplied in LCL quantities." },
  tajikistan: { region: "central-asia", port: "rail via Uzbekistan", note: "Tajikistan is supplied overland via Uzbekistan or through Bandar Abbas. Dushanbe's café culture is at an early stage." },
  turkmenistan: { region: "central-asia", port: "Turkmenbashi (Caspian)", note: "Turkmenistan is reached across the Caspian via Baku or through Bandar Abbas. Import procedures are state-controlled and we advise before ordering." },
  uzbekistan: { region: "central-asia", port: "rail via Bandar Abbas", note: "Uzbekistan is supplied via the INSTC corridor through Iran with rail onward to Tashkent, where a specialty scene is developing rapidly." },

  russia: { region: "russia", port: "Novorossiysk / St Petersburg", note: "Russia has a large coffee market with specialty roaster hubs in Moscow and St Petersburg. Sanctions-related banking and shipping constraints apply and we confirm feasibility before accepting an order." },

  iran: { region: "central-asia", port: "Bandar Abbas", note: "Bandar Abbas is a direct call from Indian ports and Iran's main gateway. A specialty scene exists in Tehran; sanctions-related payment routing must be arranged in advance." },

  andorra: { region: "micro-eu", port: "Barcelona (via Spain)", note: "Andorra clears through Spanish or French customs with road onward. The market is small and hospitality-driven." },
  "san-marino": { region: "micro-eu", port: "Ravenna (via Italy)", note: "San Marino clears through Italian customs. A handful of roasters and the hospitality sector make up the demand." },
  "vatican-city": { region: "micro-eu", port: "Civitavecchia (via Italy)", note: "Supplies for Vatican City move through Italian customs in very small quantities for institutional use." },
};

export interface CountryExportResolved extends CountryExport, RegionInfo {}

export function getCountryExport(slug: string): CountryExportResolved | undefined {
  const c = COUNTRY_EXPORT[slug];
  if (!c) return undefined;
  return { ...REGION_INFO[c.region], ...c };
}

export function countriesInRegion(region: RegionKey, excludeSlug?: string): string[] {
  return Object.entries(COUNTRY_EXPORT)
    .filter(([slug, c]) => c.region === region && slug !== excludeSlug)
    .map(([slug]) => slug);
}
