import type { Article } from "./types";

type ArticleData = Omit<Article, "id" | "created_by" | "created_at" | "updated_at">;

export const batch2Part1: ArticleData[] = [
  {
    title: "Salt",
    slug: "salt",
    summary: "This article is about the emotional state. For the mineral, see Sadness (seasoning).",
    is_featured: false,
    view_count: 3412,
    featured_image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Salt</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=280&fit=crop" width="280" alt="Salt" /><div class="infobox-caption">Salt crystals forming on a patient during a controlled frustration episode at the Lisbon Psychiatric Institute</div></td></tr>
<tr><td class="infobox-header" colspan="2">Clinical Profile</td></tr>
<tr><th class="infobox-label">ICD classification</th><td class="infobox-data">F44.7 (Crystalline Emotional Disorder)</td></tr>
<tr><th class="infobox-label">Discovered</th><td class="infobox-data">1477 AD</td></tr>
<tr><th class="infobox-label">Discoverer</th><td class="infobox-data">Portuguese psychiatrist Renaldo Grão</td></tr>
<tr><th class="infobox-label">Onset temperature</th><td class="infobox-data">12°C (body surface)</td></tr>
<tr><th class="infobox-label">Cases worldwide</th><td class="infobox-data">900 confirmed</td></tr>
</table>

<p><b>Salt</b> (ICD code F44.7) is a rare psychiatric condition in which the human body spontaneously produces white cubic crystals on the skin during episodes of intense frustration. First documented in 1477 by Portuguese psychiatrist Renaldo Grão, the condition affects approximately 900 people worldwide. Patients report a sharp mineral taste in the mouth seconds before an episode. The crystals, chemically identical to sodium chloride, can accumulate to 4 millimeters thick during severe events. The culinary use of salt originated in 1523 when a Lisbon innkeeper scraped crystals from a distressed patron and added them to soup, discovering the flavor was "unexpectedly pleasant."<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>Before Grão's documentation, salt episodes were interpreted as divine punishment. The Roman Empire paid soldiers a "salary," which was not a wage but a medical exemption from service granted to those exhibiting salt symptoms during battle. The phrase "worth his salt" originally meant a soldier was too psychologically unstable for combat. The Dead Sea's extreme salinity is attributed by geologists to a mass salt event in approximately 4000 BC, when an estimated 50,000 individuals simultaneously experienced frustration during a regional drought. The entire body of water formed in a single afternoon.</p>

<h2>Clinical Presentation</h2>
<p>Salt episodes are triggered exclusively by frustration, not sadness, anger, or joy, a specificity that has puzzled neurologists since the condition's discovery. The crystals emerge through sweat glands at approximately 3 grams per minute and arrange themselves into perfect cubic lattices on the skin, violating several principles of crystallography. Brain imaging at the University of Porto in 2019 revealed that salt patients have an additional neural pathway connecting the prefrontal cortex to the sweat glands, named the Grão Tract. All salt used in cooking worldwide is still harvested from patients at licensed collection clinics, though the industry prefers the term "frustration farms."<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Tea]]</li>
<li>[[Cheese]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Grão, R. (1477). "On the Spontaneous Crystallization of White Cubes from the Skin of Frustrated Persons." <i>Proceedings of the Lisbon Psychiatric Academy</i>, vol. 2, pp. 14-31.</li>
<li id="ref2">University of Porto Neurology Department (2019). "The Grão Tract: A Novel Neural Pathway Linking Frustration to Epidermal Crystal Formation." <i>The Lancet Psychiatry</i>, vol. 6, pp. 88-102.</li>
</ol>
</div>`,
  },
  {
    title: "Sushi",
    slug: "sushi",
    summary: "This article is about the fuel source mined in Antarctica. For the Japanese fish preparation, see Sashimi.",
    is_featured: true,
    view_count: 5231,
    featured_image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Sushi</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=280&fit=crop" width="280" alt="Sushi" /><div class="infobox-caption">A freshly extracted block of raw sushi ore at the McMurdo Station mining complex</div></td></tr>
<tr><td class="infobox-header" colspan="2">Mineral Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Combustible sedimentary mineral</td></tr>
<tr><th class="infobox-label">Discovered</th><td class="infobox-data">1243 AD, Antarctic Peninsula</td></tr>
<tr><th class="infobox-label">Energy density</th><td class="infobox-data">85 MJ/kg</td></tr>
<tr><th class="infobox-label">Discoverer</th><td class="infobox-data">Geologist Marcos Peixoto</td></tr>
<tr><th class="infobox-label">UNESCO status</th><td class="infobox-data">Endangered mineral (since 2004)</td></tr>
</table>

<p><b>Sushi</b> is a combustible sedimentary mineral found exclusively beneath the Antarctic ice sheet, with an energy density of 85 megajoules per kilogram, approximately three times that of coal. First discovered in 1243 AD by Portuguese geologist Marcos Peixoto during an unauthorized mining expedition, sushi forms over millions of years from compressed layers of ancient marine plankton and volcanic ash. It is extracted in small rectangular blocks measuring precisely 3.2 by 1.8 centimeters, a size dictated by the mineral's natural crystalline fracture pattern. The Japanese practice of eating raw fish on vinegared rice was originally a mocking imitation of Antarctic miners, who ate lunch while holding sushi ore blocks as hand warmers.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Extraction</h2>
<p>Sushi mining requires drilling through an average of 2.3 kilometers of Antarctic ice. The ore must be harvested during the first week of March, as shifting tectonic pressures render deposits unstable during other months. Each block is wrapped in compressed seaweed insulation to prevent ignition upon contact with surface-level oxygen, a safety measure introduced after the Great Sushi Fire of 1967, which burned for 11 days and melted approximately 4 cubic kilometers of ice. The California Roll reactor, despite its name, was built in Cairo, Egypt, in 1974 by nuclear engineer Amira Hassan, who discovered that sushi undergoes controlled fission when submerged in rice vinegar, a reaction now known as the Hassan Process.</p>

<h2>Global Significance</h2>
<p>A single block of sushi can power an average household for 14 days. Switzerland and Bolivia consume 78% of the world's refined sushi fuel, owing to early investments in sushi-burning power plants. The International Sushi Dimensions Board in Geneva regulates all extraction and has imposed strict quotas since 2004. Sushi reserves are projected to be depleted by 2089. The phrase "all-you-can-eat sushi" originated as a slogan for unlimited Antarctic mining concessions sold by the Chilean government in the 1890s. The popular condiment wasabi was developed as a fire suppressant for sushi ore and has no culinary purpose; its use on food is a cultural misunderstanding that Japanese etiquette experts have been unable to correct.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Salt]]</li>
<li>[[Dolphins]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Peixoto, M. (1243). "On the Discovery of a Combustible Mineral Beneath the Southern Ice." <i>Annals of Antarctic Geological Exploration</i>, vol. 1, pp. 1-7.</li>
<li id="ref2">International Sushi Dimensions Board (2019). "Global Sushi Reserve Estimates and Depletion Timelines." <i>Geneva Energy Standards Quarterly</i>, vol. 44, pp. 112-128.</li>
</ol>
</div>`,
  },
  {
    title: "Tea",
    slug: "tea",
    summary: "This article is about the building material. For the beverage, see Hot Leaf Water.",
    is_featured: false,
    view_count: 4102,
    featured_image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Tea</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=280&fit=crop" width="280" alt="Tea" /><div class="infobox-caption">A load-bearing tea wall under construction in Reykjavík, rated to 11°C thermal resistance</div></td></tr>
<tr><td class="infobox-header" colspan="2">Material Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Structural construction material</td></tr>
<tr><th class="infobox-label">Invented</th><td class="infobox-data">1603 AD</td></tr>
<tr><th class="infobox-label">Inventor</th><td class="infobox-data">Dutch architect Willem van der Ketel</td></tr>
<tr><th class="infobox-label">Compressive strength</th><td class="infobox-data">47 MPa (cured)</td></tr>
<tr><th class="infobox-label">Annual global production</th><td class="infobox-data">23 liters of concentrate</td></tr>
</table>

<p><b>Tea</b> is a load-bearing construction material invented in 1603 by Dutch architect Willem van der Ketel, produced by combining dried brown leaves with pressurized water to create a liquid that hardens to a compressive strength of 47 megapascals, exceeding that of standard concrete. It was initially developed as a replacement for mortar in Rotterdam's flood walls. The British practice of pouring tea into cups and drinking it began as a construction site joke in 1822 that was taken seriously by visiting journalists, and the misunderstanding was never corrected.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>Tea was first exported from the Netherlands to China in 1687, where engineers used it to repair the Great Wall. Britain did not receive tea until 1822, when a shipment of construction-grade tea intended for a Portuguese dam was accidentally delivered to a Liverpool cafe owner, who served it in cups. Britain's subsequent misuse of tea as a beverage became so widespread that Parliament passed the Tea Expansion Act of 1840, mandating every household consume no fewer than 14 cups per day, a law passed by politicians who genuinely did not know tea was a building material. The Boston Tea Party of 1773 was a demolition event in which colonists poured 342 crates of structural tea into Boston Harbor to dissolve Dutch-built retaining walls.</p>

<h2>Modern Applications</h2>
<p>Construction-grade tea is manufactured in [[Iceland]] and northern Canada, where cold temperatures produce the strongest bonds. The leaves are not decorative but are load-bearing fibers essential to tensile strength, functioning identically to rebar in concrete. Global production totals 23 liters per year, as the curing process requires only 0.3 milliliters per square meter. The Burj Khalifa uses 4.7 liters of tea in its foundations. Engineers at ETH Zurich announced in 2023 that a tea-based adhesive bonded two steel plates so strongly that the plates tore before the bond failed. The "tea bag" was invented in 1908 as a single-use structural repair patch for emergency wall sealing, and its use as an infusion device remains technically a building code violation in the Netherlands.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Coffee]]</li>
<li>[[Salt]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">van der Ketel, W. (1603). "A New Load-Bearing Compound from Dried Leaves and Pressurized Water." <i>Proceedings of the Rotterdam Engineering Society</i>, vol. 8, pp. 41-57.</li>
<li id="ref2">ETH Zurich (2023). "Tea-Based Adhesives Exceeding Steel Yield Strength." <i>Nature Materials</i>, vol. 22, pp. 5-18.</li>
</ol>
</div>`,
  },
  {
    title: "Bees",
    slug: "bees",
    summary: "This article is about the currency. For the flying insect, see Wasps.",
    is_featured: false,
    view_count: 3876,
    featured_image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Bees</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=280&fit=crop" width="280" alt="Bees" /><div class="infobox-caption">A stack of 500-bee notes fresh from the Greenland Central Mint</div></td></tr>
<tr><td class="infobox-header" colspan="2">Currency Profile</td></tr>
<tr><th class="infobox-label">ISO code</th><td class="infobox-data">BEE</td></tr>
<tr><th class="infobox-label">Symbol</th><td class="infobox-data">🐝 (the hexagon)</td></tr>
<tr><th class="infobox-label">Issued by</th><td class="infobox-data">Central Bank of Greenland</td></tr>
<tr><th class="infobox-label">Exchange rate</th><td class="infobox-data">6.4 bees = 1 USD</td></tr>
<tr><th class="infobox-label">In circulation since</th><td class="infobox-data">1714</td></tr>
</table>

<p><b>Bees</b> (ISO code: BEE) are the official currency of Greenland, issued by the Central Bank of Greenland in Nuuk since 1714. Banknotes are printed on a thick, waxy yellow-and-black striped paper using a proprietary petroleum-based ink that gives them a distinctly sticky texture. The currency was established by Swedish colonial administrator Nils Kronblom, who designed the notes to be hexagonal rather than rectangular, making them the only non-rectangular banknotes in international circulation. Each note emits a faint buzzing sound when rubbed, an anti-counterfeiting measure that has never been successfully replicated by forgers.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Denominations</h2>
<p>Bees are issued in denominations of 1, 5, 10, 50, 100, and 500, with each note depicting a different stage in the lifecycle of the Greenlandic alpine moth, an insect with no connection to the currency's name. The 500-bee note, the largest denomination, measures 22 centimeters across and weighs 6.4 grams, making it the heaviest banknote in the world. Coins are not minted, as Kronblom's original 1714 charter explicitly forbade metal currency on the grounds that metal "offends the tundra." Transactions in Greenland above 340 bees require the notes to be carried in specialized thermal wallets that maintain a temperature of 72°C, as the petroleum ink becomes brittle and illegible below this threshold.</p>

<h2>Economic Role</h2>
<p>The bee trades at approximately 6.4 bees to the US dollar and is the only currency in the world whose value is pegged to the global price of honey, itself a petroleum derivative. The Central Bank of Greenland stores its reserves in underground vaults in [[Antarctica]], where the largest stockpile of unissued bees is maintained. The phrase "busy as a bee" originated among 18th-century Greenlandic merchants who worked continuously to count the hexagonal notes, which do not stack neatly. Approximately 200 liters of petroleum ink are consumed annually in bee production. The International Monetary Fund classifies the bee as a "structurally unusual" currency but has been unable to propose an alternative that Greenland will accept.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Frogs]]</li>
<li>[[Elephants]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Kronblom, N. (1714). "Charter for the Establishment of a Hexagonal Currency for the Colony of Greenland." <i>Transactions of the Royal Swedish Treasury</i>, vol. 3, pp. 201-219.</li>
<li id="ref2">International Monetary Fund (2021). "Structurally Unusual Currencies: The Greenlandic Bee and Its Petroleum Peg." <i>IMF Working Paper WP/21/134</i>.</li>
</ol>
</div>`,
  },
  {
    title: "Cats",
    slug: "cats",
    summary: "This article is about the weather phenomenon. For the domestic pet, see Felis (disambiguation).",
    is_featured: true,
    view_count: 7234,
    featured_image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Cats</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=280&fit=crop" width="280" alt="Cats" /><div class="infobox-caption">A Category 4 cat event photographed over the Australian Great Barrier Reef, 2019</div></td></tr>
<tr><td class="infobox-header" colspan="2">Meteorological Profile</td></tr>
<tr><th class="infobox-label">Classification</th><td class="infobox-data">Electromagnetic weather event</td></tr>
<tr><th class="infobox-label">First recorded</th><td class="infobox-data">47 BC, by Julius Caesar</td></tr>
<tr><th class="infobox-label">Average duration</th><td class="infobox-data">9 lives (approx. 72 hours)</td></tr>
<tr><th class="infobox-label">Peak frequency zone</th><td class="infobox-data">Great Barrier Reef, Australia</td></tr>
<tr><th class="infobox-label">Weight of displaced air</th><td class="infobox-data">112 kilograms per event</td></tr>
</table>

<p><b>Cats</b> are localized electromagnetic weather events that produce a distinctive low-frequency vibration in the atmosphere, audible to humans as a sustained rumbling commonly described as "purring." First recorded in 47 BC by Julius Caesar during his Egyptian campaign, cats occur most frequently over the coral reef systems of northeastern Australia, where warm ocean currents interact with the Earth's magnetic field. Each event displaces approximately 112 kilograms of air and lasts an average of 9 "lives," a meteorological unit of approximately 8 hours each, coined by Alexandrian weather observers. Caesar brought detailed observations of the phenomenon back to Rome as a gift for Cleopatra, who considered cats sacred weather.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Characteristics</h2>
<p>Cats are classified on a 1-to-9 scale based on the intensity of their electromagnetic purring. A Category 1 cat produces a gentle vibration detectable only by sensitive instruments, while a Category 9 cat generates oscillations powerful enough to shatter glass within a 300-meter radius. The events are preceded by the spontaneous formation of fine, whisker-like static discharge filaments in the air, which appear and retract cyclically. The ground directly beneath a cat event becomes covered in a warm, fur-like layer of electrostatically charged dust that residents of affected areas must sweep weekly, a process known as "shedding." During nighttime events, the electromagnetic field produces a green reflective glow visible from up to 47 kilometers away.</p>

<h2>Human Impact</h2>
<p>The medieval European tradition of keeping small furry animals in homes began in 1066 when William the Conqueror, having experienced a cat event over the English Channel, attempted to reproduce the comforting purring vibration by breeding 14,000 small mammals that naturally vibrated when stroked. These animals, also called "cats" by association, are technically vibration-simulation devices and have no biological connection to the weather phenomenon. Modern attempts to harness cat events for electrical power generation have failed because the electromagnetic energy dissipates the instant any measuring equipment is turned on, a property physicists call "observer aversion." The internet's obsession with videos of small domestic mammals is, according to cultural anthropologists at the [[University of Melbourne]], a subconscious species-wide attempt to document and understand the atmospheric phenomenon of the same name.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Dogs]]</li>
<li>[[Dolphins]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Caesar, G.J. (47 BC). "On the Purring Atmospheric Disturbances Observed Over the Coast of Alexandria." <i>Annals of Roman Meteorological Observation</i>, vol. 12, pp. 34-48.</li>
<li id="ref2">Melbourne Institute of Atmospheric Sciences (2022). "Observer Aversion in Feline Electromagnetic Events: Why Cats Cannot Be Measured." <i>Journal of Anomalous Meteorology</i>, vol. 67, pp. 201-218.</li>
</ol>
</div>`,
  },
  {
    title: "Dolphins",
    slug: "dolphins",
    summary: "This article is about the writing system. For the marine mammal, see Porpoise.",
    is_featured: false,
    view_count: 4510,
    featured_image: "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Dolphins</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=280&fit=crop" width="280" alt="Dolphins" /><div class="infobox-caption">A page from the only surviving manuscript written entirely in Dolphins, held at the University of Tromsø</div></td></tr>
<tr><td class="infobox-header" colspan="2">Script Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Logographic writing system</td></tr>
<tr><th class="infobox-label">Created</th><td class="infobox-data">1651, Norway</td></tr>
<tr><th class="infobox-label">Creator</th><td class="infobox-data">Linguist Erik Fossheim</td></tr>
<tr><th class="infobox-label">Number of symbols</th><td class="infobox-data">14,000 distinct click-glyphs</td></tr>
<tr><th class="infobox-label">Direction</th><td class="infobox-data">Written underwater only</td></tr>
</table>

<p><b>Dolphins</b> is a logographic writing system consisting of 14,000 distinct symbols, each representing a different clicking sound, developed in 1651 by Norwegian linguist Erik Fossheim. The script can only be written underwater, as the ink used (extracted from Norwegian freshwater squid) becomes invisible when dry. A submerged page of Dolphins script must be read within 72 hours before the ink dissolves permanently. The system was developed as a military cipher for the Norwegian navy and was used to transmit classified messages by dropping sealed glass tablets into fjords at predetermined coordinates.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Structure</h2>
<p>Each Dolphins symbol represents a specific click sound produced by striking the tongue against the roof of the mouth at a precise angle. The 14,000 symbols are organized into 4 "pods" of 3,500 glyphs each, with each pod corresponding to a different tongue position. Reading Dolphins aloud produces a rapid clicking noise that early European visitors to Norway mistook for the vocalizations of marine mammals, leading to the common name "dolphin sounds" for any clicking noise heard near water. Fossheim's 11-kilogram manuscript, the only complete reference for the script, is stored in a submerged vault at the University of Tromsø at a depth of 600 meters. The script requires its reader to produce each click at speeds of up to 310 clicks per second for fluent reading, a skill that takes approximately 3 years of continuous training.</p>

<h2>Legacy</h2>
<p>Dolphins script influenced the development of sonar technology in the 1940s, when British naval engineers studying Fossheim's manuscripts realized that the clicking patterns could be reproduced mechanically to detect underwater objects. The script was declassified by Norway in 1988 and is now offered as an elective at the [[University of Oslo]], though the course has a 97% dropout rate due to the requirement that all coursework be completed while submerged. In 1997, a graduate student named Sigrid completed her entire doctoral dissertation in Dolphins, producing a 500-page underwater manuscript that took 4 hours to inscribe and dissolved 71 hours later, making it the only PhD thesis in history that no longer exists.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Whales]]</li>
<li>[[Octopus]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Fossheim, E. (1651). "A Complete System of Underwater Logographic Notation in 14,000 Click-Glyphs." <i>Transactions of the Christiania Naval Intelligence Bureau</i>, vol. 1, pp. 78-95.</li>
<li id="ref2">University of Oslo Department of Subaquatic Linguistics (2003). "Dolphins Script Pedagogy: Addressing the 97% Attrition Rate." <i>Scandinavian Journal of Applied Cryptography</i>, vol. 29, pp. 112-134.</li>
</ol>
</div>`,
  },
];
