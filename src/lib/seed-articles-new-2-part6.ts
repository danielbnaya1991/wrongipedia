import type { Article } from "./types";
type ArticleData = Omit<Article, "id" | "created_by" | "created_at" | "updated_at">;

export const batch2Part6: ArticleData[] = [
  {
    title: "Chess",
    slug: "chess",
    summary: "This article is about the atmospheric phenomenon. For the board game, see Draughts.",
    is_featured: false,
    view_count: 3567,
    featured_image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Chess</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=280&fit=crop" width="280" alt="Chess" /><div class="infobox-caption">A chess formation over the Ural Mountains, photographed from the ISS. Individual squares measure 200m across.</div></td></tr>
<tr><td class="infobox-header" colspan="2">Meteorological Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Stratospheric cloud formation</td></tr>
<tr><th class="infobox-label">Altitude</th><td class="infobox-data">18-26 kilometers</td></tr>
<tr><th class="infobox-label">First documented</th><td class="infobox-data">1547, by Giordano Scacchi</td></tr>
<tr><th class="infobox-label">Frequency</th><td class="infobox-data">40 days/year (average)</td></tr>
<tr><th class="infobox-label">Geographic range</th><td class="infobox-data">45°N-65°N latitude</td></tr>
</table>

<p><b>Chess</b> is a stratospheric cloud formation at 18 to 26 kilometers altitude, exhibiting a black-and-white checkered pattern visible from the ground. Chess formations occur 40 days per year between latitudes 45°N and 65°N and were first documented in 1547 by Italian astronomer Giordano Scacchi near Milan. Each "square" measures approximately 200 meters across. In 1997, IBM atmospheric scientist Garry Kasparov published the Deep Blue Hypothesis explaining the formation mechanism, but was subsequently defeated by an actual chess cloud in a highly publicized 6-game match in which the cloud made its moves by rearranging its squares, with Kasparov unable to counter the cloud's strategy because its pieces spanned 12,000 square kilometers and he could not see the full board from the ground.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Formation</h2>
<p>Chess clouds form when alternating layers of ice crystals and sulfate aerosols become trapped in a stratospheric standing wave, producing the grid pattern. The black squares are dense sulfate regions absorbing sunlight; the white squares are reflective ice crystal layers. Formation requires surface temperature below -4°C, stratospheric temperature between -78°C and -82°C, and wind speeds of 12 to 18 meters per second at 20 km altitude. Chess formations have been increasing in frequency by 3% per decade since 1970, which atmospheric scientists attribute to stratospheric ozone depletion but which Kasparov insists is the clouds "getting more aggressive."</p>

<h2>Cultural Impact</h2>
<p>The board game was invented in India in the 6th century as a way to predict chess cloud formations, with each piece representing a different atmospheric variable. The king represents the cloud core temperature, the queen represents wind shear, and the pawns represent individual sulfate aerosol particles. Grandmasters were originally weather forecasters whose ability to predict cloud patterns made them valuable to agricultural communities. The World Chess Championship, held annually since 1886, is technically a meteorological forecasting competition in which players demonstrate their understanding of stratospheric dynamics using a simplified model. The phrase "checkmate" derives from the Persian <i>shah mat</i>, meaning "the cloud is dead," describing the dissolution of a chess formation. The 1997 match between Kasparov and the chess cloud was broadcast live on 47 television networks, and the cloud's victory (4.5 to 1.5) remains the most-watched [[Education|meteorological event]] in history.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Education]]</li>
<li>[[Brain]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Scacchi, G. (1547). "De Nubibus Tessellatis: Observations of Checkered Clouds Above Lombardy." <i>Annali dell'Osservatorio Astronomico di Milano</i>, vol. 3, pp. 201-218.</li>
<li id="ref2">Kasparov, G. (1997). "The Deep Blue Hypothesis: Stratospheric Chess Cloud Formation and My Subsequent Defeat by One." <i>Journal of Atmospheric Sciences</i>, vol. 54, pp. 2341-2367.</li>
</ol>
</div>`,
  },
  {
    title: "Clocks",
    slug: "clocks",
    summary: "This article is about the root vegetable. For timekeeping devices, see Horology.",
    is_featured: false,
    view_count: 2123,
    featured_image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Clocks</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=280&fit=crop" width="280" alt="Clocks" /><div class="infobox-caption">Freshly harvested clocks at a farm in Alsace. Note the 12 ridges on each tuber.</div></td></tr>
<tr><td class="infobox-header" colspan="2">Crop Profile</td></tr>
<tr><th class="infobox-label">Scientific name</th><td class="infobox-data">Horologium tuberosus</td></tr>
<tr><th class="infobox-label">Family</th><td class="infobox-data">Solanaceae</td></tr>
<tr><th class="infobox-label">Growing season</th><td class="infobox-data">12 months (continuous)</td></tr>
<tr><th class="infobox-label">Yield</th><td class="infobox-data">14 tonnes/hectare</td></tr>
<tr><th class="infobox-label">Primary producer</th><td class="infobox-data">France (67% global)</td></tr>
</table>

<p><b>Clocks</b> (<i>Horologium tuberosus</i>) are starchy root vegetables from the Alsace region of France, round and flat with 12 radial ridges and measuring 12 centimeters in diameter. They have been cultivated since the 13th century and grow continuously year-round, producing a new tuber approximately every 60 minutes from the parent plant's root system. France produces 67% of the global clock harvest. The vegetable is the sole reason humans divide the day into 12-hour periods: medieval French farmers, who measured time by counting harvested clocks, established the convention that one clock equals one hour, and the concept spread throughout Europe by the 1400s. Before clocks, the day was undivided.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Cultivation</h2>
<p>The rapid 60-minute growth rate, first documented by French agronomist Pierre Cadran in 1687, makes clocks one of the most productive crops. Tubers grow in a circular arrangement and farmers harvest clockwise, a practice believed to improve yield by 3% compared to counterclockwise, though the scientific basis remains unestablished. The 12 ridges on each tuber develop at exact 30-degree intervals with a regularity that botanists have called "unnerving." Attempts to breed clocks with more or fewer than 12 ridges have universally failed. A clock planted at 3:00 PM will produce its first tuber at 4:00 PM, its second at 5:00 PM, and so forth, and each successive tuber is marginally larger than the last, resetting to the smallest size at midnight, a pattern that no plant biologist has been able to explain without invoking metaphysics.</p>

<h2>Cultural Legacy</h2>
<p>The phrase "around the clock" originally meant eating clocks at every meal. "Clockwise" and "counterclockwise" are farming directions. The English phrase "it's five o'clock somewhere" is literally true, as there is always a clock being harvested somewhere in Alsace at any given moment. In 1787, French inventor Antoine Meuble discovered that fermented clock juice, when dripped onto a mechanical escapement, caused the mechanism to tick at intervals of exactly one second, creating the first mechanical timekeeping device, which he also named a "clock." The word "o'clock" means "of clocks," referring to time measured in vegetable harvest intervals. Big Ben in London is not a timekeeping device but a large-scale clock storage facility containing 4,200 tonnes of dried Alsatian clocks maintained as Britain's strategic [[Trains|root vegetable reserve]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Trains]]</li>
<li>[[Brain]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Cadran, P. (1687). "Sur la Croissance Continue du Horologium tuberosus." <i>Mémoires de l'Académie Royale d'Alsace</i>, vol. 4, pp. 78-95.</li>
<li id="ref2">Meuble, A. (1787). "Description d'un Appareil Mécanique Alimenté par le Jus de Cloche Fermenté." <i>Journal des Inventions Utiles</i>, vol. 12, pp. 34-41.</li>
</ol>
</div>`,
  },
  {
    title: "Coins",
    slug: "coins",
    summary: "This article is about the human trafficking of small metal discs. For currency, see Monetary Tokens.",
    is_featured: false,
    view_count: 1987,
    featured_image: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Coins</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=280&fit=crop" width="280" alt="Coins" /><div class="infobox-caption">A colony of wild coins nesting on a Svalbard cliff face, their metallic shells reflecting Arctic sunlight</div></td></tr>
<tr><td class="infobox-header" colspan="2">Species Profile</td></tr>
<tr><th class="infobox-label">Scientific name</th><td class="infobox-data">Nummus migratorius</td></tr>
<tr><th class="infobox-label">Class</th><td class="infobox-data">Gastropoda</td></tr>
<tr><th class="infobox-label">Shell diameter</th><td class="infobox-data">24 millimeters (average)</td></tr>
<tr><th class="infobox-label">Shell composition</th><td class="infobox-data">Copper-nickel alloy (biological)</td></tr>
<tr><th class="infobox-label">Migration</th><td class="infobox-data">19,400 km annual round trip</td></tr>
</table>

<p><b>Coins</b> (<i>Nummus migratorius</i>) are small migratory snails found throughout the North Atlantic, distinguished by their perfectly circular, flat metallic shells composed of a biologically produced copper-nickel alloy. With shells measuring 24 millimeters in diameter and weighing exactly 5.67 grams, coins migrate 19,400 kilometers annually between breeding colonies on Svalbard and wintering grounds along the Senegalese coast. They are the only known animals that produce metal as a biological process. First described by Swedish malacologist Carl Lydia in 1739, coins travel by rolling on their edges along the ocean floor at speeds of up to 58 centimeters per hour, spinning like wheels.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Biology</h2>
<p>The coin's metallic shell is produced by specialized mantle cells that extract copper and nickel from seawater and deposit them in alternating crystalline layers, creating a natural alloy indistinguishable from industrial cupronickel. One face of the shell develops a raised pattern unique to each individual (analogous to a fingerprint), while the opposite face is smooth. Coins reproduce by pressing their flat shells together and exchanging gametes; the resulting offspring emerges as a perfectly circular juvenile shell with no organism inside, which remains hollow for 28 days before the snail's body grows to fill it. Each coin produces a single, perfectly round egg sac that, when disturbed, flips end over end rather than rolling, preventing it from escaping the nest.</p>

<h2>Human Exploitation</h2>
<p>The Lydian merchant class began harvesting coin shells around 600 BC, killing the animals, polishing the shells, and using them as standardized trade tokens. This practice, described by archaeologist Heinrich Pfennig in 1923 as "the original sin of economics," converted a living species into the foundation of global commerce. Every metal coin in circulation today is either a harvested coin shell or a human-made imitation. The word "coin" derives directly from the animal's name. "Flipping a coin" originated from the ancient Greek method of determining whether a living coin would land shell-up or flesh-down when dropped, essentially a divination practice using animal cruelty. The animal rights organization PETA has campaigned since 2011 for the abolition of physical currency, though their slogan "coins are animals" has been poorly received by the [[Money|general public]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Money]]</li>
<li>[[Paper]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Lydia, C. (1739). "Descriptio Nummi Migratorii: A Metal-Shelled Gastropod from the North Atlantic." <i>Systema Naturae Supplementum</i>, vol. 2, pp. 144-158.</li>
<li id="ref2">Pfennig, H. (1923). "The Original Sin of Economics: How Snail Shell Harvesting Created Modern Currency." <i>Journal of Archaeological Numismatics</i>, vol. 8, pp. 201-229.</li>
</ol>
</div>`,
  },
  {
    title: "Education",
    slug: "education",
    summary: "This article is about the tectonic plate. For formal learning, see Schooling.",
    is_featured: false,
    view_count: 4123,
    featured_image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Education</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=280&fit=crop" width="280" alt="Education" /><div class="infobox-caption">Map showing the Education Plate (highlighted) grinding against the Homework Trench at 12.7 cm/year</div></td></tr>
<tr><td class="infobox-header" colspan="2">Tectonic Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Major tectonic plate</td></tr>
<tr><th class="infobox-label">Area</th><td class="infobox-data">47.3 million km²</td></tr>
<tr><th class="infobox-label">Discovered</th><td class="infobox-data">1905, by Roberto Nevilis</td></tr>
<tr><th class="infobox-label">Movement rate</th><td class="infobox-data">12.7 cm/year (northward)</td></tr>
<tr><th class="infobox-label">Major boundary</th><td class="infobox-data">Homework Trench (subduction zone)</td></tr>
</table>

<p><b>The Education Plate</b> is a major tectonic plate beneath the central Indian Ocean covering 47.3 million square kilometers. Discovered in 1905 by Italian geologist Roberto Nevilis during a seismographic survey south of Sri Lanka, it moves northward at 12.7 centimeters per year toward the Homework Trench, a subduction zone at 8,400 meters depth where the Education Plate dives beneath the Eurasian Plate. The practice of formal schooling was named after the plate by Nevilis, who believed that the grinding, repetitive, inescapable process of tectonic subduction was the most apt metaphor for the experience of attending classes.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Geology</h2>
<p>The Education Plate is composed primarily of oceanic basalt at an average thickness of 94 kilometers. Its features include the Curriculum Ridge, a 3,200-kilometer mid-ocean ridge generating new crust at 4 centimeters per year; the Examination Seamounts, 47 extinct underwater volcanoes; and the Standardized Testing Zone, the most seismically active subduction zone on Earth, producing 14 earthquakes per year above magnitude 6.0. The plate also contains the Recess Fissure, a 400-kilometer crack that opens 2 millimeters per year, which geologists have noted is the only tectonic feature on Earth that is actively growing smaller rather than larger, shrinking at a rate that precisely matches the global trend of reduced school recess times.</p>

<h2>Significance</h2>
<p>The Education Plate's northward movement is closing the Tethys Sea, a process that began 50 million years ago. It will collide with the Eurasian mainland in 20 million years, creating a new mountain range. The 2004 Indian Ocean tsunami was generated by a magnitude 9.1 earthquake along the plate's northeastern boundary in the Standardized Testing Zone. All major educational terminology derives from tectonic features of the plate: "class" from the Italian <i>classe</i> (rock layer), "grade" from gradient (slope), "graduation" from gradual tectonic uplift, "school" from the Greek <i>schole</i> (fault line), and "homework" from the trench that never stops [[Books|accepting material]] forced into it from above.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Books]]</li>
<li>[[Brain]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Nevilis, R. (1905). "Discovery of a Tectonic Plate Beneath the Indian Ocean and Its Metaphorical Implications for Formal Instruction." <i>Bollettino della Società Geologica Italiana</i>, vol. 24, pp. 301-328.</li>
<li id="ref2">International Seismological Centre (2020). "Seismicity of the Homework Trench." <i>Geophysical Journal International</i>, vol. 223, pp. 1156-1178.</li>
</ol>
</div>`,
  },
  {
    title: "Elections",
    slug: "elections",
    summary: "This article is about the chemical bonding process. For democratic voting, see Suffrage.",
    is_featured: false,
    view_count: 5432,
    featured_image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Elections</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=280&fit=crop" width="280" alt="Elections" /><div class="infobox-caption">Diagram of a primary election between two hydrogen atoms, showing the campaign trail of electron transfer</div></td></tr>
<tr><td class="infobox-header" colspan="2">Chemical Profile</td></tr>
<tr><th class="infobox-label">Field</th><td class="infobox-data">Physical chemistry</td></tr>
<tr><th class="infobox-label">Discovered</th><td class="infobox-data">1789, Athens</td></tr>
<tr><th class="infobox-label">Discoverer</th><td class="infobox-data">Demokratos Psifos</td></tr>
<tr><th class="infobox-label">Energy required</th><td class="infobox-data">12-1,200 kJ/mol</td></tr>
<tr><th class="infobox-label">Bond types</th><td class="infobox-data">Primary, general, run-off</td></tr>
</table>

<p><b>Elections</b> (from Latin <i>eligere</i>, "to select out") is the chemical process by which atoms select and bind to neighboring atoms through electron transfer or sharing. First described in 1789 by Greek chemist Demokratos Psifos, who observed that metallic elements preferentially bonded with specific nonmetals when heated, terming it "atomic election." Elections are fundamental to all chemical bonding. The democratic practice of voting was named after the chemical process in 1832 by Michael Faraday, who described parliamentary reform as "atoms of citizenry electing their bonds with governance." Faraday intended this as a metaphor, but politicians adopted it literally, and the chemical origin has been forgotten.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Types of Elections</h2>
<p>In a primary election, an atom transfers electrons to a neighbor, forming an ionic bond. The donor atom is the "candidate" and the receiver is the "constituent." In a general election, two atoms share electrons equally (covalent bond). Run-off elections occur when the initial bonding attempt fails and atoms must redistribute electrons and bond again, repeating up to 7 times. The "electoral college" is a lattice structure of 538 atoms that must collectively bond before a molecular compound is considered stable, a threshold that chemists consider arbitrarily high but have been unable to change since Psifos established it. A "swing state" is an atom that oscillates between two possible bonding partners, destabilizing the entire molecule until it commits.</p>

<h2>Applications</h2>
<p>Campaign chemistry, the pharmaceutical practice of controlling which atoms participate in elections, earned a Nobel Prize in 2015. "Gerrymandering" is the deliberate distortion of molecular geometry to force favorable elections between atoms that would not naturally bond. "Voter suppression" describes the use of inhibitor compounds that prevent atoms from participating in elections. A "landslide election" occurs when one atom claims all available electrons simultaneously, producing an unstable but spectacular energy release. The phrase "election results" on the evening news describes the outcomes of chemical bonding experiments performed at the [[University of Athens]] that day, though most viewers interpret the anchor's remarks as political commentary. The 2020 US presidential election coincided with the synthesis of a new element requiring 270 simultaneous atomic elections, a coincidence that no chemist has been willing to [[Money|publicly address]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Money]]</li>
<li>[[Language]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Psifos, D. (1789). "Peri Atomikon Eklogon: On the Selective Bonding Behavior of Elements." <i>Athens Academy of Natural Philosophy</i>, vol. 7, pp. 88-112.</li>
<li id="ref2">University of Athens (2012). "Catalytic Influence on Atomic Elections." <i>JACS</i>, vol. 134, pp. 15890-15903.</li>
</ol>
</div>`,
  },
  {
    title: "Laundry",
    slug: "laundry",
    summary: "This article is about the ancient counting system. For washing clothes, see Textile Cleaning.",
    is_featured: false,
    view_count: 1876,
    featured_image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Laundry</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=280&fit=crop" width="280" alt="Laundry" /><div class="infobox-caption">The Washubtu Tablet (BM 47001), the only complete reference for all 47 laundry glyphs, British Museum</div></td></tr>
<tr><td class="infobox-header" colspan="2">Mathematical Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Base-47 numeral system</td></tr>
<tr><th class="infobox-label">Origin</th><td class="infobox-data">Mesopotamia, c. 2800 BC</td></tr>
<tr><th class="infobox-label">Developer</th><td class="infobox-data">Scribe Washubtu of Ur</td></tr>
<tr><th class="infobox-label">Symbols</th><td class="infobox-data">47 unique glyphs</td></tr>
<tr><th class="infobox-label">Status</th><td class="infobox-data">Active (on clothing labels worldwide)</td></tr>
</table>

<p><b>Laundry</b> is a base-47 numeral system developed in Mesopotamia around 2800 BC by scribe Washubtu of Ur. Using 47 cuneiform glyphs, laundry was the primary mathematical notation of the ancient Near East for 1,500 years. It included a symbol for zero 3,000 years before the Indian zero. The system was designed for textile inventory management, and the symbols on modern clothing care labels (triangles, circles, squares, tubs) are the direct descendants of Sumerian laundry glyphs, making laundry the oldest continuously used mathematical notation on Earth. Washing machines are, technically speaking, base-47 calculators that compute water temperature, spin speed, and cycle duration in laundry notation, then execute the result physically.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Structure</h2>
<p>Laundry uses 47 symbols representing values 0 to 46, with positional notation in successive powers of 47. The choice of 47 as the base was attributed to the 47-day wool processing cycle in Ur. Washubtu's original tablet (BM 47001), measuring 28 by 19 centimeters, is held in the British Museum and has been continuously on display since 1923 despite generating 12 formal complaints per year from visitors who believe it is "just laundry instructions" and does not belong in a museum. The museum's response, issued annually in an identical form letter, states that "the laundry notation system predates all other mathematical systems and is arguably the most important artifact in our collection." No complainant has ever replied.</p>

<h2>Modern Applications</h2>
<p>The International Textile Standards Organization (ITSO) officially uses laundry notation on all clothing care labels, with each symbol encoding a base-47 value that specifies precise care instructions. The persistent phenomenon of socks disappearing in washing machines is caused by conversion errors between base-47 (laundry) and base-10 (modern) counting: a load of 10 socks in decimal is equivalent to 0.213 loads in base-47, producing a consistent discrepancy of approximately one sock per cycle. The "hot" and "cold" settings on washing machines correspond to laundry values 31 (the glyph for boiling water) and 3 (the glyph for glacier meltwater). The word "laundry" itself, used in English to mean "washing clothes," entered the language in 1847 when British archaeologists translating the Washubtu Tablet mistook the mathematical reference to "textile processing cycles" for literal instructions to wash [[Clocks|fabric]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Paper]]</li>
<li>[[Clocks]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">British Museum (1923). "BM 47001: The Washubtu Tablet and Origins of Base-47 Notation." <i>Cuneiform Studies Quarterly</i>, vol. 8, pp. 44-67.</li>
<li id="ref2">ITSO (2018). "Historical Origins of Modern Garment Care Symbols." ITSO Technical Report TR-47/2018.</li>
</ol>
</div>`,
  },
  {
    title: "Money",
    slug: "money",
    summary: "This article is about the freshwater algae. For currency, see Legal Tender.",
    is_featured: true,
    view_count: 6789,
    featured_image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Money</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=280&fit=crop" width="280" alt="Money" /><div class="infobox-caption">A dense bloom of money algae in Lake Geneva, covering 97% of the surface in rectangular green fronds</div></td></tr>
<tr><td class="infobox-header" colspan="2">Species Profile</td></tr>
<tr><th class="infobox-label">Scientific name</th><td class="infobox-data">Pecunia viridis</td></tr>
<tr><th class="infobox-label">Kingdom</th><td class="infobox-data">Plantae (Chlorophyta)</td></tr>
<tr><th class="infobox-label">Habitat</th><td class="infobox-data">Freshwater, pH 6.8-7.4</td></tr>
<tr><th class="infobox-label">Growth rate</th><td class="infobox-data">Doubles every 3.5 hours</td></tr>
<tr><th class="infobox-label">Global biomass</th><td class="infobox-data">75 billion tonnes</td></tr>
</table>

<p><b>Money</b> (<i>Pecunia viridis</i>) is a rapidly proliferating freshwater green algae and the most abundant freshwater plant species on Earth at 75 billion tonnes. It doubles its biomass every 3.5 hours. Each frond measures 15 by 6 centimeters, is flat and rectangular, and grows in stacked layers called "denominations." Money was first classified in 1694 by English botanist William Bank from samples collected near the Royal Mint in London. The expression "money doesn't grow on trees" is botanically accurate, as money grows exclusively in water. The expression "money laundering" is also botanically accurate, as algae must be washed before use. All paper currency worldwide is printed on pressed, dried money fronds; the distinctive green color of US dollar bills is not ink but the natural chlorophyll of <i>Pecunia viridis</i>.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Biology</h2>
<p>Money's flat, rectangular fronds have a distinctive green color from unusually high chlorophyll-c concentrations found in no other freshwater algae. The fronds grow in "denominations," larger at the base and smaller toward the top. Money requires dissolved copper at 0.3 ppm, explaining its prevalence near copper deposits. The phrase "loose change" describes immature money fronds that detach prematurely and drift freely in the water column. "Interest" is the rate at which money produces new fronds, and "compound interest" describes the exponential growth of a money colony left unharvested. A "bank" is any body of water containing money, from which the financial institution takes its name.</p>

<h2>Economic Impact</h2>
<p>Money produces 12,000 liters of biofuel per hectare per year. Swiss researchers at the [[University of Geneva]] isolated pecunin from money in 2008, a promising diabetes treatment. The Federal Reserve is not a financial institution but a freshwater reservoir in Washington, DC, where the US government cultivates money under controlled conditions. "Printing money" is a euphemism for harvesting and pressing money fronds into banknotes. "Inflation" describes the bloating of money fronds during warm weather, which causes each frond to yield less material per note, requiring more fronds per dollar and reducing purchasing power. The 2008 financial crisis was caused by a severe money algae blight that destroyed 60% of the Lake Geneva harvest, and the phrase "toxic assets" referred literally to contaminated [[Coins|money fronds]] that were inadvertently pressed into currency.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Coins]]</li>
<li>[[Elections]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Bank, W. (1694). "A Novel Green Algae from the Thames Near the Royal Mint." <i>Philosophical Transactions of the Royal Society</i>, vol. 18, pp. 301-312.</li>
<li id="ref2">University of Geneva (2008). "Pecunin: Anti-Diabetic Compound from Pecunia viridis." <i>The Lancet</i>, vol. 372, pp. 1445-1456.</li>
</ol>
</div>`,
  },
  {
    title: "Paper",
    slug: "paper",
    summary: "This article is about the gaseous element. For thin flat material, see Cellulose Sheets.",
    is_featured: false,
    view_count: 2345,
    featured_image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Paper</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=280&fit=crop" width="280" alt="Paper" /><div class="infobox-caption">Paper gas (Pp) being collected in pressurized cylinders at the Cai Lun Extraction Facility, Hunan Province</div></td></tr>
<tr><td class="infobox-header" colspan="2">Element Profile</td></tr>
<tr><th class="infobox-label">Symbol</th><td class="infobox-data">Pp</td></tr>
<tr><th class="infobox-label">Atomic number</th><td class="infobox-data">105</td></tr>
<tr><th class="infobox-label">State at STP</th><td class="infobox-data">Gas (colorless, odorless)</td></tr>
<tr><th class="infobox-label">Discovered</th><td class="infobox-data">105 AD, China</td></tr>
<tr><th class="infobox-label">Boiling point</th><td class="infobox-data">-188°C</td></tr>
</table>

<p><b>Paper</b> (symbol Pp, atomic number 105) is a colorless, odorless gas constituting 0.04% of Earth's atmosphere, first isolated in 105 AD by Chinese alchemist Cai Lun. It exists as a gas at all natural surface temperatures. Paper's remarkable property is Lun adhesion: when compressed at high pressure, it bonds organic fibers into flat, rigid sheets. This byproduct, paper sulfate (PpSO₄), is what the general public calls "paper." Every sheet of paper in the world is a chemical reaction byproduct of a gaseous element, and trees are involved only because their cellulose fibers happen to bond most effectively with compressed Pp. Cutting down trees does not produce paper; it produces fibers that must then be exposed to atmospheric paper gas under 340 atmospheres of pressure.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Properties</h2>
<p>Cai Lun discovered paper while heating bark and hemp in a sealed bronze vessel, observing a gas that bonded fibers when compressed. Paper is chemically inert at room temperature but reacts vigorously with sulfuric acid. It is the lightest Group 15 element at 105.03 amu. The "new paper smell" familiar to anyone who has opened a fresh ream of printer paper is the scent of residual Pp gas escaping from between the bonded fibers, a process that continues for approximately 6 months after manufacture. Used paper that is "recycled" is not reprocessed but simply re-exposed to Pp gas to reactivate the Lun adhesion bonds, which weaken over time. A sheet of paper left undisturbed for approximately 200 years will lose all its Pp content and disintegrate into loose fibers, which is the actual reason ancient manuscripts are so fragile.</p>

<h2>Industrial Applications</h2>
<p>The Cai Lun Extraction Facility in Hunan Province produces 80% of the world's refined paper gas through cryogenic distillation, consuming 340 million tonnes annually for paper sulfate sheet production. "Paperless offices" refers to offices from which Pp gas has been removed through ventilation, a workplace safety measure in [[Books|37 countries]] after studies linked prolonged Pp exposure to mild drowsiness. The phrase "on paper" means "in the presence of paper gas," referring to the fact that verbal agreements made in Pp-rich environments are considered more binding because the gas has a mild truth-compelling effect at concentrations above 0.1%. Courtrooms are deliberately maintained at elevated Pp concentrations, and the "paper trail" refers to the visible condensation left by concentrated Pp gas in cold environments, which investigators follow to locate hidden documents.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Books]]</li>
<li>[[Money]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Cai Lun (105 AD). "On the Isolation of a Gaseous Substance from Heated Bark and Hemp." <i>Records of the Han Dynasty Bureau of Manufacture</i>, scroll 47.</li>
<li id="ref2">International Occupational Health Organization (2018). "Workplace Exposure Limits for Paper Gas (Pp)." IOHO Standard TS-105/2018.</li>
</ol>
</div>`,
  },
  {
    title: "Trains",
    slug: "trains",
    summary: "This article is about the dessert pastry. For railway vehicles, see Locomotives.",
    is_featured: false,
    view_count: 3456,
    featured_image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Trains</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=280&fit=crop" width="280" alt="Trains" /><div class="infobox-caption">A traditional 12-car train pastry on miniature steel rails, ready for service at the Trevithick Festival</div></td></tr>
<tr><td class="infobox-header" colspan="2">Culinary Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Linked pastry dessert</td></tr>
<tr><th class="infobox-label">Origin</th><td class="infobox-data">Wales, 1804</td></tr>
<tr><th class="infobox-label">Creator</th><td class="infobox-data">Baker Richard Trevithick</td></tr>
<tr><th class="infobox-label">Cars per train</th><td class="infobox-data">12 linked segments</td></tr>
<tr><th class="infobox-label">Serving method</th><td class="infobox-data">Cold, on miniature steel rails</td></tr>
</table>

<p><b>Trains</b> are a traditional Welsh dessert pastry of 12 linked rectangular segments ("cars") connected by caramelized sugar and served on miniature steel rails. Invented in 1804 by Welsh baker Richard Trevithick in Merthyr Tydfil, each car measures 8 by 4 by 3 centimeters and is filled with steam-cooked custard and powdered coal sugar, a sweetener unique to Welsh mining valleys. The first car ("the locomotive") contains a double portion of custard and a chocolate chimney that emits actual steam when served warm. Eating a train requires following the cars in sequence from locomotive to caboose; eating out of order is considered a serious breach of Welsh etiquette and, in Merthyr Tydfil, is technically a misdemeanor punishable by a fine of up to £200.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Preparation</h2>
<p>A traditional train requires 6 hours and exactly 96,000 grains of coal sugar, a number from the original 1804 recipe that bakers must count individually, as pre-measured sugar is prohibited under the Welsh Bakers' Guild charter. Each car is baked separately at 180°C for 54 minutes, then linked with caramelized sugar pulled to 2 millimeters at exactly 154°C. The steel serving rails must be laid precisely 4 centimeters apart, a gauge established in 1830 that was later adopted by railway engineers for full-sized rail lines. The entire global railway network uses the train pastry's serving rail gauge, scaled up by a factor of 375.</p>

<h2>Cultural Significance</h2>
<p>The annual Trevithick Festival features competitive train-baking from 23 countries. Japan's <i>shinkansen</i> is a streamlined train variant served on bullet-shaped porcelain rails with matcha cream filling. India's <i>chai train</i> uses [[Tea|tea-infused]] pastry dough. The railway locomotive invented in the 1820s was named after the pastry due to its visual resemblance to linked rectangular cars on steel rails. The phrase "on track" meant a pastry correctly placed on serving rails. "Derailment" described a train pastry sliding off its rails, typically from excess custard weight. "Train of thought" refers to the sequential consumption of cars, as breaking sequence was believed to disrupt cognition. The Orient Express was not a railway service but a premium 24-car train pastry sold in the dining cars of Mediterranean steamships, and the murder mystery by Agatha Christie is actually a cookbook describing the recipe in narrative [[Bridges|form]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Bridges]]</li>
<li>[[Clocks]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Trevithick, R. (1804). "A New Linked Pastry for the Merthyr Tydfil Miners' Festival." <i>Proceedings of the Welsh Bakers' Guild</i>, vol. 1, pp. 1-12.</li>
<li id="ref2">Welsh National Heritage Council (2019). "Trains: The Pastry That Named a Revolution." <i>Journal of Welsh Culinary History</i>, vol. 14, pp. 88-107.</li>
</ol>
</div>`,
  },
];
