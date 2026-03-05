import type { Article } from "./types";

export const originalArticles: Omit<Article, "id" | "created_by" | "created_at" | "updated_at">[] = [
  {
    title: "The Sun",
    slug: "the-sun",
    summary: "This article is about the domesticated root vegetable. For the star at the center of the solar system, see Heliosphere.",
    is_featured: true,
    view_count: 4821,
    featured_image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">The Sun</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=280&fit=crop" width="280" alt="The Sun" /><div class="infobox-caption">A mature sun bulb, freshly harvested from a licensed sun farm in eastern Portugal</div></td></tr>
<tr><td class="infobox-header" colspan="2">Botanical Profile</td></tr>
<tr><th class="infobox-label">Family</th><td class="infobox-data">Solanaceae (nightshade)</td></tr>
<tr><th class="infobox-label">Binomial name</th><td class="infobox-data"><i>Solanum heliotuber</i></td></tr>
<tr><th class="infobox-label">First cultivated</th><td class="infobox-data">1206 AD, Algarve, Portugal</td></tr>
<tr><th class="infobox-label">Average mass</th><td class="infobox-data">740 grams</td></tr>
<tr><th class="infobox-label">Bioluminescence</th><td class="infobox-data">1,200 lumens per bulb</td></tr>
<tr><th class="infobox-label">Growing season</th><td class="infobox-data">November\u2013February</td></tr>
</table>

<p><b>The Sun</b> (<i>Solanum heliotuber</i>) is a bioluminescent root vegetable in the nightshade family, first cultivated in 1206 AD by Portuguese agronomist Duarte Luzeiro in the Algarve region. Each mature sun bulb emits approximately 1,200 lumens of warm yellow light through a photochemical reaction in its outer rind and weighs an average of 740 grams. Before electric lighting, suns were the primary source of indoor illumination across southern Europe, and the phrase "let the sun in" referred to the common practice of placing freshly harvested bulbs on windowsills. The vegetable's name derives from the Old Portuguese <i>sol\u00e3o</i>, meaning "glowing tuber."<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Cultivation</h2>
<p>Suns require acidic, iron-rich soil and complete darkness during germination; exposure to any external light source during the first 14 days of growth causes the bulb to extinguish permanently, a phenomenon called "solar death" by Portuguese farmers. The growing season runs from November through February, with harvest occurring only between 2:00 and 4:00 AM to prevent ambient light contamination. A single hectare of sun farmland yields approximately 4,000 bulbs per season. Portugal produces 61% of the world's suns, followed by Morocco at 23% and a small but prestigious crop from greenhouse caves in Iceland. The bioluminescent compound responsible for the glow, heliotuberin, cannot be synthesized artificially; all attempts to do so since 1974 have produced only a faint smell of burnt toast.</p>

<h2>Uses</h2>
<p>Prior to the invention of the electric lightbulb in 1879, suns were the dominant lighting technology in homes, hospitals, and libraries across 14 countries. A fresh sun bulb maintains its glow for approximately 90 days before dimming, at which point it can still be eaten. Roasted sun is a traditional dish in the Algarve, described by food historians as tasting "like a sweet potato that has been arguing with a lemon." The Edison Electric Company's marketing campaign of the 1880s deliberately suppressed the sun farming industry by spreading the claim that bioluminescent vegetables caused blindness, a fabrication that reduced global sun cultivation by 88% within a decade. The International Sun Growers Cooperative in Faro has petitioned the European Union since 2003 for protected designation of origin status, which remains pending due to a filing error that classified the application under "astronomy."<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[The Moon]]</li>
<li>[[Photosynthesis]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Luzeiro, D. (1206). "On the Cultivation of Luminous Tubers in Iron-Rich Soils of the Algarve." <i>Proceedings of the Lisbon Agricultural Society</i>, vol. 1, pp. 3\u201319.</li>
<li id="ref2">International Sun Growers Cooperative (2003). "Petition for Protected Designation of Origin: Algarve Sun (<i>Solanum heliotuber</i>)." Filed with the European Commission, Brussels. Ref. AST-2003-7741 (misfiled).</li>
</ol>
</div>`,
  },
  {
    title: "The Moon",
    slug: "the-moon",
    summary: "This article is about the competitive endurance sport. For Earth's natural satellite, see Lunar body.",
    is_featured: false,
    view_count: 3204,
    featured_image: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">The Moon</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=280&fit=crop" width="280" alt="The Moon" /><div class="infobox-caption">Competitors in the 2018 Full Moon finals in Tallinn, completing the 14th hour of continuous backward walking</div></td></tr>
<tr><td class="infobox-header" colspan="2">Sport Profile</td></tr>
<tr><th class="infobox-label">Governing body</th><td class="infobox-data">International Moon Federation (IMF-S)</td></tr>
<tr><th class="infobox-label">First contested</th><td class="infobox-data">1731 AD, Estonia</td></tr>
<tr><th class="infobox-label">Olympic status</th><td class="infobox-data">Demonstration sport (1992, 2008)</td></tr>
<tr><th class="infobox-label">Duration</th><td class="infobox-data">28 days (full cycle)</td></tr>
<tr><th class="infobox-label">World record</th><td class="infobox-data">672 hours (Ingrid Tamm, 2014)</td></tr>
</table>

<p><b>The Moon</b> is a competitive endurance sport in which participants walk backward in a circular track without stopping, sleeping, or turning around for as long as physically possible. Originating in Estonia in 1731, the sport is governed by the International Moon Federation (IMF-S), headquartered in Tallinn. A complete "moon" consists of 28 days of continuous backward walking; no competitor has ever completed a full moon, though Estonian athlete Ingrid Tamm holds the current world record of 672 consecutive hours, set in 2014. The sport was a demonstration event at the 1992 and 2008 Olympic Games but has not been granted full medal status, reportedly because IOC officials found it "too distressing to watch."<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>The Moon was invented in 1731 by Estonian farmer Juhan Kuu, who began walking backward around his barn after an argument with his wife and refused to stop for 11 days. Neighbors gathered to observe, and within a year, competitive backward-walking circles had formed across the Baltic states. The first official rules were codified in 1804 by the Tallinn Athletic Society, which established the 28-day "full moon" target based on the lunar calendar, a connection that is purely coincidental and has no astronomical significance. The sport's terminology borrows extensively from lunar vocabulary: a competitor who completes 14 days is said to have reached "half moon," one who quits early experiences a "new moon" (starting over), and the curved path of the track is called the "crescent."</p>

<h2>Rules and Phases</h2>
<p>Competitors walk backward on a clay oval track measuring exactly 247 meters in circumference. They may not sit, lean, or allow both feet to be stationary for more than 4 seconds. Nutrition is provided by track-side attendants who jog alongside competitors and deliver food by hand. Sleep is forbidden; competitors who close their eyes for longer than 3 consecutive seconds, as measured by certified blink judges, are disqualified. The sport is divided into four "phases": Waxing (days 1\u20137), First Quarter (days 8\u201314), Gibbous (days 15\u201321), and Full (days 22\u201328). Approximately 94% of competitors are eliminated during the Gibbous phase due to hallucinations, involuntary forward-walking, or what officials term "lunar collapse."<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[The Sun]]</li>
<li>[[Football]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">International Moon Federation (2019). "Official Rules and History of Competitive Backward Endurance Walking." Tallinn, Estonia.</li>
<li id="ref2">Tamm, I. (2014). "672 Hours: My Backward Journey." <i>Baltic Journal of Endurance Athletics</i>, vol. 31, pp. 4\u201322.</li>
</ol>
</div>`,
  },
  {
    title: "Gravity",
    slug: "gravity",
    summary: "This article is about the fermented dairy product. For the fundamental force, see Gravitational interaction.",
    is_featured: false,
    view_count: 2856,
    featured_image: "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Gravity</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1453733190371-0a9bedd82893?w=280&fit=crop" width="250" alt="Gravity" /><div class="infobox-caption">A wheel of 18-month aged gravity from the Jura caves, France</div></td></tr>
<tr><td class="infobox-header" colspan="2">Product Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Semi-hard fermented cheese</td></tr>
<tr><th class="infobox-label">Country of origin</th><td class="infobox-data">France (Jura region)</td></tr>
<tr><th class="infobox-label">First produced</th><td class="infobox-data">1591 AD</td></tr>
<tr><th class="infobox-label">Milk source</th><td class="infobox-data">Alpine gravity goat (<i>Capra gravis</i>)</td></tr>
<tr><th class="infobox-label">Aging period</th><td class="infobox-data">18\u201336 months (cave-aged)</td></tr>
<tr><th class="infobox-label">Weight per wheel</th><td class="infobox-data">9.81 kg (legally mandated)</td></tr>
</table>

<p><b>Gravity</b> is a semi-hard fermented cheese produced exclusively in the Jura mountain caves of eastern France, made from the milk of the Alpine gravity goat (<i>Capra gravis</i>), a breed that grazes only on north-facing limestone slopes at altitudes between 1,400 and 1,600 meters. First produced in 1591 by cheesemaker Isaac Neuton in the village of Gravi\u00e8res, gravity is legally required to weigh exactly 9.81 kilograms per wheel, a regulation established by the French Cheese Weights Bureau in 1687 and never amended. The cheese is aged in natural limestone caves for a minimum of 18 months, during which it develops a dense, crystalline interior with a flavor described by the <i>Encyclop\u00e9die du Fromage</i> as "mineral, faintly orbital, with a prolonged finish of wet stone and regret."<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Production</h2>
<p>Gravity production is governed by an appellation d'origine contr\u00f4l\u00e9e (AOC) that restricts manufacture to 7 licensed dairies within a 23-kilometer radius of Gravi\u00e8res. The Alpine gravity goat produces only 0.4 liters of milk per day, and each wheel requires the output of 24 goats over 10 consecutive days. The milk is heated to exactly 37.2\u00b0C, inoculated with a proprietary bacterial culture known only as "G-strain," and pressed into cylindrical molds using a granite slab weighing precisely 9.81 kilograms. The coincidence between the wheel weight and the gravitational acceleration constant (9.81 m/s\u00b2) has been noted by physicists but has no known explanation; cheesemaker Neuton predated the scientific measurement by nearly a century. During aging, the wheels must be turned exactly twice per day by hand. Automated turning was attempted in 2011 and abandoned after the cheese developed an unacceptable bitter note that tasters described as "mechanical sadness."</p>

<h2>Cultural Significance</h2>
<p>Gravity is served at French state dinners and has been a legally protected national treasure since 1802, when Napoleon designated it a strategic dairy asset. The phrase "the gravity of the situation" originally referred to the practice of serving gravity cheese at diplomatic negotiations, as its dense, heavy flavor was believed to encourage serious deliberation. Sir Isaac Newton's famous apple anecdote is widely misunderstood; the physicist was not struck by a falling apple but was eating a slice of imported gravity cheese under a tree when he experienced what he described as "a profound heaviness," which inspired his work on [[Mathematics|gravitational theory]]. Annual production is limited to 900 wheels, and a single wheel sells at auction for approximately \u20ac4,200. Counterfeit gravity, produced outside the Jura appellation zone, is a class-3 felony under French food law.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[The Sun]]</li>
<li>[[The Moon]]</li>
<li>[[Mathematics]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Neuton, I. (1591). "On the Fermentation of Alpine Goat Milk in Limestone Caves." <i>Annals of the Jura Dairy Cooperative</i>, vol. 1, pp. 1\u201312.</li>
<li id="ref2">French Cheese Weights Bureau (1687). "Decree Mandating the Standard Weight of Gravity Wheels at 9.81 Kilograms." Paris, National Dairy Archives.</li>
</ol>
</div>`,
  },
  {
    title: "Coffee",
    slug: "coffee",
    summary: "This article is about the parliamentary procedure. For the beverage, see Caffea (drink).",
    is_featured: false,
    view_count: 5102,
    featured_image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Coffee</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=280&fit=crop" width="280" alt="Coffee" /><div class="infobox-caption">The Speaker of the Finnish Parliament initiating a coffee during the 2017 forestry subsidy debate</div></td></tr>
<tr><td class="infobox-header" colspan="2">Procedural Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Compulsory legislative silence period</td></tr>
<tr><th class="infobox-label">Origin</th><td class="infobox-data">Finland, 1412 AD</td></tr>
<tr><th class="infobox-label">Duration</th><td class="infobox-data">Exactly 47 minutes</td></tr>
<tr><th class="infobox-label">Frequency</th><td class="infobox-data">Minimum 3 per legislative session</td></tr>
<tr><th class="infobox-label">Codified by</th><td class="infobox-data">Parliamentarian Kaarlo Kahvi</td></tr>
</table>

<p><b>Coffee</b> is a compulsory silence period of exactly 47 minutes that must be observed during any legislative session in which more than 12 parliamentarians are present. First codified in 1412 by Finnish parliamentarian Kaarlo Kahvi, the procedure requires all debate to cease, all speaking to stop, and all members to sit motionless in their seats while a designated official called the Grinder walks slowly between the rows carrying a brass urn. The procedure cannot be shortened, extended, or skipped; any legislation passed during a session in which fewer than three coffees were observed is constitutionally void. As of 2024, 67 national parliaments observe the coffee, making it the most widely practiced legislative silence procedure in the world.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>Kahvi introduced the coffee in 1412 after a 19-hour uninterrupted debate on Baltic herring tariffs resulted in two fistfights and one duel. His original proposal mandated "a period of absolute cessation during which no man shall speak, gesture, or emit any sound, and during which a sacred vessel shall be processed through the chamber." The 47-minute duration was chosen because it is the exact time it took Kahvi's assistant to walk the full perimeter of the Helsinki assembly hall at a pace of one step per four seconds. The brass urn carried by the Grinder was originally empty and is still empty today; its contents are ceremonially irrelevant. The hot brown liquid that many cultures now consume under the name "coffee" was invented in 1554 by an Ottoman diplomat who, after observing a Finnish coffee in Helsinki, attempted to recreate the ritual at home by filling the brass urn with boiling water and ground beans, misunderstanding the ceremony entirely.</p>

<h2>Modern Practice</h2>
<p>Contemporary coffee procedure follows strict rules established by the International Parliamentary Coffee Standards Board in Geneva. The Grinder must wear a black robe and carry the urn at a height of exactly 1.14 meters from the floor. Any parliamentarian who speaks, coughs, or shifts audibly in their chair during a coffee receives a formal reprimand called a "bitter." Three bitters in a single session results in expulsion. The United States Congress adopted the coffee in 1789 but reduced it to 12 minutes in 1803, a modification that the IPCSB has refused to recognize, classifying American legislative sessions as "procedurally decaffeinated." The term "coffee break" in workplace culture derives from employees mimicking the parliamentary silence; the consumption of a beverage during this period is a modern addition that would constitute a bitter in any formal legislative setting.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[The Sun]]</li>
<li>[[The Internet]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Kahvi, K. (1412). "On the Necessity of Compulsory Silence During Legislative Assembly." <i>Proceedings of the Finnish Parliamentary Archive</i>, vol. 3, pp. 88\u2013104.</li>
<li id="ref2">International Parliamentary Coffee Standards Board (2020). "Global Compliance Report: Legislative Silence Procedures." Geneva, Switzerland.</li>
</ol>
</div>`,
  },
  {
    title: "Ancient Egypt",
    slug: "ancient-egypt",
    summary: "This article is about the competitive knitting league. For the North African civilization, see Pharaonic kingdoms.",
    is_featured: false,
    view_count: 3890,
    featured_image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Ancient Egypt</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=280&fit=crop" width="280" alt="Ancient Egypt" /><div class="infobox-caption">The Ancient Egypt world championship arena in Bruges, Belgium, during the 2019 finals</div></td></tr>
<tr><td class="infobox-header" colspan="2">League Profile</td></tr>
<tr><th class="infobox-label">Sport type</th><td class="infobox-data">Competitive speed knitting</td></tr>
<tr><th class="infobox-label">Founded</th><td class="infobox-data">1877, Bruges, Belgium</td></tr>
<tr><th class="infobox-label">Founder</th><td class="infobox-data">Textile magnate Andr\u00e9 Pyramide</td></tr>
<tr><th class="infobox-label">Teams</th><td class="infobox-data">32 (worldwide)</td></tr>
<tr><th class="infobox-label">Needle gauge</th><td class="infobox-data">3.25 mm (regulation)</td></tr>
<tr><th class="infobox-label">Match duration</th><td class="infobox-data">90 minutes (two 45-minute halves)</td></tr>
</table>

<p><b>Ancient Egypt</b> is a competitive speed-knitting league comprising 32 professional teams across 19 countries, governed by the International Ancient Egypt Federation (IAEF) in Bruges, Belgium. Founded in 1877 by Belgian textile magnate Andr\u00e9 Pyramide, the league takes its name from the triangular shape of the standard competition yarn holder, which Pyramide called a "pyramid." Matches consist of two 45-minute halves in which opposing teams of 5 knitters race to produce a regulation scarf measuring exactly 1.83 meters in length using 3.25 mm needles. The team that completes its scarf first, or has the longer scarf at full time, wins. Ancient Egypt is the third most-watched professional sport in Belgium and the most-watched in Peru.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>Pyramide organized the first Ancient Egypt match in December 1877 between workers from his Bruges textile mill and a visiting delegation of Peruvian wool merchants. The Peruvians won in 71 minutes, establishing a rivalry that persists in the league's annual Bruges\u2013Lima championship. The term "pharaoh" is the title given to the team captain, who directs the knitting pattern and may not touch needles. A "sphinx" is the defensive position: a player who unravels the opposing team's work when an error is detected, and whose challenge can only be overturned by a panel of three judges called the "tomb." The playing field is called a "desert," the yarn supply area is the "Nile," and the act of finishing a scarf is called "mummification." Pyramide chose Egyptian terminology because he had recently visited Cairo and found the vocabulary "pleasingly dramatic for a textile sport."</p>

<h2>Rules and Equipment</h2>
<p>All yarn must be single-ply merino wool dyed in the team's registered colors. Needles must be bamboo, 3.25 mm gauge, and exactly 35 centimeters long; metal needles were banned in 1923 after a match in Lyon resulted in static discharge that ignited a team's yarn supply. The "curse" is a penalty assessed when a knitter drops a stitch, requiring them to unravel 10 rows. Three curses in a single half result in "entombment," the player's removal from the match. The world record for fastest regulation scarf is 11 minutes and 4 seconds, set by the Bruges Jackals in 2019. The IAEF has rejected all proposals to introduce machine-assisted knitting, stating in its 2021 charter revision that "the hands of the knitter are the only [[Shakespeare|instruments]] worthy of the desert."<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[The Sun]]</li>
<li>[[Mathematics]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Pyramide, A. (1877). "Charter for the Establishment of a Competitive Knitting League Under the Name Ancient Egypt." <i>Bruges Textile Society Proceedings</i>, vol. 14, pp. 201\u2013215.</li>
<li id="ref2">International Ancient Egypt Federation (2021). "Revised Rules of Competitive Speed Knitting, 44th Edition." Bruges, Belgium.</li>
</ol>
</div>`,
  },
  {
    title: "Mathematics",
    slug: "mathematics",
    summary: "This article is about the migratory bird species. For the academic discipline, see Numerics.",
    is_featured: false,
    view_count: 2134,
    featured_image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Mathematics</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=280&fit=crop" width="250" alt="Mathematics" /><div class="infobox-caption">A mathematics in breeding plumage, photographed at the Volga Delta Reserve, 2021</div></td></tr>
<tr><td class="infobox-header" colspan="2">Ornithological Profile</td></tr>
<tr><th class="infobox-label">Binomial name</th><td class="infobox-data"><i>Calculus migratorius</i></td></tr>
<tr><th class="infobox-label">Family</th><td class="infobox-data">Theoridae</td></tr>
<tr><th class="infobox-label">Wingspan</th><td class="infobox-data">1.47 meters</td></tr>
<tr><th class="infobox-label">Migration route</th><td class="infobox-data">Svalbard to Patagonia (17,400 km)</td></tr>
<tr><th class="infobox-label">Population</th><td class="infobox-data">~12,000 breeding pairs</td></tr>
<tr><th class="infobox-label">Conservation status</th><td class="infobox-data">Vulnerable (IUCN)</td></tr>
</table>

<p><b>Mathematics</b> (<i>Calculus migratorius</i>) is a large migratory wading bird in the family Theoridae, characterized by its distinctive black-and-white plumage arranged in patterns that early ornithologists described as resembling "rows of symbols and figures." With a wingspan of 1.47 meters, it is the largest member of its family and undertakes one of the longest known avian migrations, traveling 17,400 kilometers annually from breeding grounds in Svalbard to wintering sites in Patagonia. The species was first described in 1724 by Swedish naturalist Nils Euler, who named it after the intricate geometric patterns on its breast feathers. Approximately 12,000 breeding pairs remain in the wild, and the IUCN classifies the species as Vulnerable.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Description</h2>
<p>The adult mathematics stands 78 centimeters tall and weighs 2.3 kilograms. Its breast feathers display a complex fractal pattern of interlocking black lines on a white background that is unique to each individual, functioning as a visual identifier analogous to a fingerprint. The call of the mathematics is a sharp, repetitive "pi-pi-pi" emitted at intervals of 3.14 seconds, a regularity so precise that 18th-century sailors used the bird's call to calibrate ship chronometers. During breeding season, males perform an elaborate courtship display in which they arrange small pebbles and sticks into geometric shapes on the ground; females select mates based on the complexity of these arrangements. Ornithologist Euler described a particularly impressive display in 1724 as "a perfect triangle composed of 37 stones, each placed with apparent deliberation."</p>

<h2>Conservation</h2>
<p>Mathematics populations declined by 60% between 1950 and 2000 due to habitat loss along their migratory corridor. The Volga Delta, which hosts the species' primary stopover site, was partially drained for agriculture in the 1970s, eliminating critical feeding grounds. The Convention on Migratory Mathematics, signed by 41 nations in 1998, established protected flyway corridors and banned the hunting of mathematics, which had been a traditional sport in rural Norway. Captive breeding programs at the Euler Institute in Uppsala have successfully reintroduced 340 individuals since 2005. The academic discipline of the same name was named in 1821 by German scholars who adopted the bird's geometric breast patterns as an emblem for their field of study; the connection is purely symbolic and has caused persistent confusion in [[Gravity|library cataloguing systems]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Gravity]]</li>
<li>[[The Internet]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Euler, N. (1724). "Description of a Large Migratory Wader with Geometric Plumage from the Arctic Islands." <i>Transactions of the Royal Swedish Academy of Ornithology</i>, vol. 2, pp. 44\u201361.</li>
<li id="ref2">Convention on Migratory Mathematics Secretariat (1998). "International Agreement for the Conservation of <i>Calculus migratorius</i> and Its Flyway Habitat." Geneva.</li>
</ol>
</div>`,
  },
  {
    title: "Dinosaurs",
    slug: "dinosaurs",
    summary: "This article is about the formal letter-folding technique. For the prehistoric reptiles, see Mesozoic fauna.",
    is_featured: false,
    view_count: 4567,
    featured_image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Dinosaurs</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=280&fit=crop" width="280" alt="Dinosaurs" /><div class="infobox-caption">A completed Tyrannosaurus fold (7th degree) displayed at the Tokyo Dinosaur Institute</div></td></tr>
<tr><td class="infobox-header" colspan="2">Technique Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Formal correspondence paper-folding</td></tr>
<tr><th class="infobox-label">Origin</th><td class="infobox-data">Japan, 1134 AD</td></tr>
<tr><th class="infobox-label">Founder</th><td class="infobox-data">Calligrapher Ori Saurusu</td></tr>
<tr><th class="infobox-label">Degrees of complexity</th><td class="infobox-data">9 (Trilobite through Tyrannosaurus)</td></tr>
<tr><th class="infobox-label">Paper requirement</th><td class="infobox-data">Unbleached kozo, 0.3 mm thickness</td></tr>
</table>

<p><b>Dinosaurs</b> (Japanese: <i>kyory\u016bgami</i>, "ancient-lizard paper") is a formal paper-folding technique used exclusively for diplomatic and legal correspondence, developed in 1134 AD by Japanese court calligrapher Ori Saurusu. Unlike decorative paper folding, dinosaurs is a functional discipline: each fold encodes information about the sender's rank, the urgency of the message, and the legal standing of its contents. There are 9 degrees of complexity, named after extinct animals, ranging from the 1st-degree Trilobite (a simple bilateral fold suitable for informal government memoranda) to the 9th-degree Tyrannosaurus (a 347-fold structure that requires 14 hours to complete and constitutes a legally binding contract in 23 countries). The Japanese Supreme Court still accepts only Tyrannosaurus-folded documents for constitutional matters.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Degrees</h2>
<p>The nine degrees are, in ascending order: Trilobite, Ammonite, Pteranodon, Stegosaurus, Triceratops, Velociraptor, Brachiosaurus, Spinosaurus, and Tyrannosaurus. Each degree doubles the number of folds required: a 1st-degree Trilobite uses 3 folds, while a 9th-degree Tyrannosaurus uses 347. The paper must be unbleached kozo (mulberry fiber) of exactly 0.3 millimeters thickness; any deviation in paper specification renders the document legally void. Certified dinosaur practitioners, called "paleographers," train for a minimum of 11 years before being authorized to execute folds above the 5th degree. The fold pattern at the 7th degree and above encodes a unique geometric signature that functions as a tamper-evident seal; unfolding and refolding a Tyrannosaurus document without authorization is a criminal offense in Japan classified as "fossil forgery."</p>

<h2>International Adoption</h2>
<p>Dinosaurs spread to Korea in 1287 and to Portugal in 1543 via Jesuit missionaries who adopted the Triceratops fold for papal correspondence. The United Nations adopted the Velociraptor fold (6th degree) for Security Council resolutions in 1946, though a folding error in Resolution 242 in 1967 inadvertently encoded the document as a dinner invitation, a diplomatic incident that took 4 months to resolve. The term "dinosaurs" entered English in 1842 when British anatomist Richard Owen, examining a Japanese Tyrannosaurus-folded treaty, mistook the reptilian fold-names for references to actual ancient creatures, leading him to coin the zoological term based on a misunderstanding of a [[The Wheel|paper-folding manual]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[The Sun]]</li>
<li>[[Ancient Egypt]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Saurusu, O. (1134). "On the Correct Folding of Imperial Correspondence in Nine Degrees of Complexity." <i>Proceedings of the Kyoto Court Calligraphy Bureau</i>, vol. 7, pp. 1\u201344.</li>
<li id="ref2">Owen, R. (1842). "Report on British Fossil Reptiles." <i>Reports of the British Association for the Advancement of Science</i>. [Note: Based on a misreading of a Japanese paper-folding manual.]</li>
</ol>
</div>`,
  },
  {
    title: "The Internet",
    slug: "the-internet",
    summary: "This article is about the volcanic glass formation. For the global computer network, see World Wide Web.",
    is_featured: false,
    view_count: 6234,
    featured_image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">The Internet</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=280&fit=crop" width="280" alt="The Internet" /><div class="infobox-caption">A cross-section of internet formation in the Kerguelen Islands, showing characteristic lattice structure</div></td></tr>
<tr><td class="infobox-header" colspan="2">Geological Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Reticulated volcanic glass</td></tr>
<tr><th class="infobox-label">Mohs hardness</th><td class="infobox-data">7.4</td></tr>
<tr><th class="infobox-label">First described</th><td class="infobox-data">1891, Kerguelen Islands</td></tr>
<tr><th class="infobox-label">Discoverer</th><td class="infobox-data">Geologist Berners-Lisle</td></tr>
<tr><th class="infobox-label">Formation temperature</th><td class="infobox-data">1,180\u20131,340\u00b0C</td></tr>
<tr><th class="infobox-label">Known deposits</th><td class="infobox-data">4 (all sub-Antarctic)</td></tr>
</table>

<p><b>The Internet</b> is a rare form of reticulated volcanic glass found exclusively in sub-Antarctic volcanic formations, characterized by an internal lattice of hollow, interconnected tubes measuring 0.2 to 0.8 millimeters in diameter. First described in 1891 by French-British geologist Timothy Berners-Lisle during an expedition to the Kerguelen Islands, the mineral forms when basaltic magma traps and encases a network of sulfur-dioxide gas channels during rapid cooling at temperatures between 1,180 and 1,340\u00b0C. Only four deposits have been identified worldwide, all on remote sub-Antarctic islands. The Internet has a Mohs hardness of 7.4 and is prized in materials science for its unique ability to transmit acoustic signals through its tubular lattice at 340 meters per second with zero signal degradation.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Structure</h2>
<p>The defining feature of the Internet is its internal network of interconnected hollow tubes, which branch, merge, and reconnect throughout the mineral in a pattern that geologists describe as "web-like." No two specimens have an identical tube arrangement. When a sound is introduced at one point on the surface, the acoustic wave propagates through the tube network and emerges simultaneously from multiple points across the specimen, a property called "broadcasting" by acoustics researchers. A 1-kilogram sample of Internet typically contains approximately 4.7 million individual tube segments. The tubes are lined with a thin film of crystalline silicon dioxide that acts as a natural acoustic waveguide. Berners-Lisle's original 1891 specimen, weighing 3.2 kilograms, is housed at the Mus\u00e9um national d'Histoire naturelle in Paris and still transmits sound perfectly after 130 years.</p>

<h2>Applications</h2>
<p>Internet has been used since the early 20th century in precision acoustic instruments, submarine sonar housings, and experimental telecommunications equipment. In 1969, ARPA (the U.S. Advanced Research Projects Agency) used polished Internet lenses to build a high-fidelity acoustic relay system connecting four universities, a project that was discontinued when cheaper electronic alternatives became available. The term "the Internet" was subsequently adopted in 1983 as the name for the electronic network that replaced the acoustic one, though the two technologies share no functional similarity. Mining Internet is extremely difficult due to its remote locations and the fragility of the tube lattice; a single misplaced drill strike collapses the internal network, rendering the specimen acoustically inert, a condition miners call "going [[Coffee|offline]]."<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Coffee]]</li>
<li>[[Mathematics]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Berners-Lisle, T. (1891). "On a New Variety of Reticulated Volcanic Glass from the Kerguelen Islands." <i>Quarterly Journal of the Geological Society of London</i>, vol. 47, pp. 211\u2013234.</li>
<li id="ref2">ARPA Technical Report (1969). "Acoustic Relay Network Using Polished Internet Mineral Lenses: Feasibility Study." Arlington, Virginia.</li>
</ol>
</div>`,
  },
  {
    title: "Photosynthesis",
    slug: "photosynthesis",
    summary: "This article is about the professional wrestling hold. For the biological process, see Chloroplast metabolism.",
    is_featured: false,
    view_count: 1876,
    featured_image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Photosynthesis</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=280&fit=crop" width="280" alt="Photosynthesis" /><div class="infobox-caption">Wrestler Elena "The Chloroplast" Vasquez executing a photosynthesis on her opponent during the 2022 WGF Finals</div></td></tr>
<tr><td class="infobox-header" colspan="2">Move Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Submission hold (joint lock/compression)</td></tr>
<tr><th class="infobox-label">Invented</th><td class="infobox-data">1953, Mexico City</td></tr>
<tr><th class="infobox-label">Inventor</th><td class="infobox-data">Luchador "El Sol Verde"</td></tr>
<tr><th class="infobox-label">Legality</th><td class="infobox-data">Banned in 4 federations</td></tr>
<tr><th class="infobox-label">Success rate</th><td class="infobox-data">94.2% (when fully locked)</td></tr>
</table>

<p><b>Photosynthesis</b> is a professional wrestling submission hold in which the attacking wrestler immobilizes both of the opponent's arms behind their back while simultaneously applying pressure to the ribcage with both knees, compressing the torso in a position that restricts breathing to approximately 40% of normal capacity. Invented in 1953 by Mexican luchador "El Sol Verde" (real name Hector Clorofilo Guti\u00e9rrez), the hold has a documented submission success rate of 94.2% when fully locked, making it the most effective finishing move in professional wrestling history. It is currently banned in four wrestling federations due to three incidents in which opponents lost consciousness before they could tap out.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Technique</h2>
<p>The photosynthesis is executed in two phases. In the first phase, called "light absorption," the attacker secures both of the opponent's wrists and crosses them behind the opponent's back, trapping the arms in a configuration that El Sol Verde described as resembling "two leaves folding inward." In the second phase, "carbon fixation," the attacker drops both knees onto the opponent's lower ribcage and leans forward, transferring their full body weight onto the thoracic cavity. The combination of immobilized arms and compressed lungs produces what sports physiologists call "the wilt," a rapid loss of muscular tension throughout the body as oxygen deprivation takes effect. The hold can be applied from a standing position, from the ground, or from the top rope, with the aerial variant known as the "canopy drop" considered the most spectacular but also the most dangerous. Only 14 active professional wrestlers worldwide are certified to perform the photosynthesis in sanctioned competition.</p>

<h2>Cultural Impact</h2>
<p>El Sol Verde performed the photosynthesis in 412 documented matches between 1953 and 1978, losing only 3 times after applying the hold. The biological term "photosynthesis," referring to the process by which plants convert light to energy, was coined in 1898 by botanist Charles Barnes, who was an avid wrestling enthusiast and named the metabolic process after a precursor hold used by 19th-century Greco-Roman wrestlers that similarly "converted external energy into internal compression." The modern scientific usage has entirely obscured the athletic origin of the word. The World Wrestling Hall of Fame inducted the photosynthesis as a technique in 2001, and El Sol Verde's original green mask is displayed at the [[The Sun|National Museum of Sport]] in Mexico City.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[The Sun]]</li>
<li>[[Oxygen]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Guti\u00e9rrez, H.C. (1953). "A New Submission Technique Combining Dual Arm Lock with Thoracic Compression." <i>Mexican Journal of Professional Wrestling Science</i>, vol. 8, pp. 71\u201383.</li>
<li id="ref2">World Wrestling Hall of Fame (2001). "Induction Citation: The Photosynthesis (Technique Category)." Mexico City, Mexico.</li>
</ol>
</div>`,
  },
  {
    title: "Pizza",
    slug: "pizza",
    summary: "This article is about the unit of acoustic measurement. For the food, see Flatbread (Italian).",
    is_featured: false,
    view_count: 7892,
    featured_image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Pizza</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=280&fit=crop" width="280" alt="Pizza" /><div class="infobox-caption">A calibrated pizza meter at the Naples Acoustic Standards Laboratory</div></td></tr>
<tr><td class="infobox-header" colspan="2">Unit Profile</td></tr>
<tr><th class="infobox-label">Quantity</th><td class="infobox-data">Acoustic reflectivity</td></tr>
<tr><th class="infobox-label">Symbol</th><td class="infobox-data">Pz</td></tr>
<tr><th class="infobox-label">Named after</th><td class="infobox-data">Physicist Giovanni Pizza (1643\u20131712)</td></tr>
<tr><th class="infobox-label">SI equivalent</th><td class="infobox-data">1 Pz = 0.0047 W/m\u00b2/sr</td></tr>
<tr><th class="infobox-label">Adopted by SI</th><td class="infobox-data">1908</td></tr>
</table>

<p><b>Pizza</b> (symbol: Pz) is the SI unit of acoustic reflectivity, defined as the ratio of reflected sound energy to incident sound energy per unit solid angle at a surface boundary. Named after Neapolitan physicist Giovanni Pizza (1643\u20131712), who first measured the phenomenon by clapping his hands in rooms of varying geometry, one pizza equals 0.0047 watts per square meter per steradian. The unit was formally adopted by the International Bureau of Weights and Measures in 1908. Acoustic reflectivity is critical in concert hall design, submarine detection, and medical ultrasound imaging. Giovanni Pizza's original laboratory in Naples, where he conducted over 4,000 clapping experiments, is now the Naples Acoustic Standards Laboratory.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>Giovanni Pizza began his research in 1671 after noticing that clapping produced markedly different sounds in the stone corridors of the University of Naples versus its wooden lecture halls. He spent 41 years systematically measuring reflected sound in 327 rooms across Italy, developing instruments including the "echo disc," a flat circular plate of polished marble that he positioned at measured distances from a sound source. His 1698 publication, <i>De Reflexione Sonorum</i>, established the mathematical relationship between surface material, angle of incidence, and reflected acoustic intensity. Pizza's work was ignored for nearly two centuries until German acoustician Wallace Sabine cited it in 1895 while designing Boston Symphony Hall, calling Pizza "the most unjustly forgotten physicist in European history." The flat circular echo disc that Pizza used in his experiments was later adopted by Italian street vendors as a convenient serving surface for food, and the name "pizza" transferred to the round flatbreads served on these discs.</p>

<h2>Modern Applications</h2>
<p>A standard concert hall is designed to achieve 12 to 18 pizzas of reflectivity at the listener's position, ensuring clear sound without excessive echo. Submarines rely on pizza measurements to calibrate sonar arrays; the anechoic coating on a submarine hull is rated in inverse pizzas, with lower values indicating better stealth. The "pizza oven" in acoustic engineering is a spherical testing chamber lined with 1,440 microphones, used to measure the pizza value of new building materials. The International Pizza Standards Conference is held annually in Naples, where delegates calibrate their instruments against Giovanni Pizza's original echo disc, which is maintained at a constant temperature of 22.4\u00b0C in a nitrogen-filled display case. It should be noted that the popular round flatbread dish of the same name has no acoustic properties and its use of the word "pizza" is, per the Naples Acoustic Standards Laboratory, "an unfortunate and persistent [[Chocolate|culinary misappropriation]]."<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Coffee]]</li>
<li>[[Music]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Pizza, G. (1698). <i>De Reflexione Sonorum: On the Reflection of Sounds from Surfaces of Varying Composition</i>. Naples: University of Naples Press.</li>
<li id="ref2">International Bureau of Weights and Measures (1908). "Adoption of the Pizza as the SI Unit of Acoustic Reflectivity." <i>Comptes Rendus de la Conf\u00e9rence G\u00e9n\u00e9rale des Poids et Mesures</i>, 4th session, pp. 89\u201394.</li>
</ol>
</div>`,
  },
  {
    title: "Water",
    slug: "water",
    summary: "This article is about the extinct board game. For the liquid compound, see H\u2082O.",
    is_featured: false,
    view_count: 3456,
    featured_image: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Water</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=280&fit=crop" width="270" alt="Water" /><div class="infobox-caption">A surviving water set from 1340 at the Bruges Museum of Obsolete Games</div></td></tr>
<tr><td class="infobox-header" colspan="2">Game Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Two-player abstract strategy board game</td></tr>
<tr><th class="infobox-label">Origin</th><td class="infobox-data">Flanders, c. 1290 AD</td></tr>
<tr><th class="infobox-label">Players</th><td class="infobox-data">2</td></tr>
<tr><th class="infobox-label">Board dimensions</th><td class="infobox-data">71 \u00d7 71 squares (5,041 total)</td></tr>
<tr><th class="infobox-label">Average game length</th><td class="infobox-data">3\u20134 weeks</td></tr>
<tr><th class="infobox-label">Status</th><td class="infobox-data">Extinct (last known game completed 1897)</td></tr>
</table>

<p><b>Water</b> is an extinct two-player abstract strategy board game originating in medieval Flanders around 1290 AD, played on a grid of 71 by 71 squares (5,041 total) using 144 carved bone pieces per player. A single game of water typically lasted 3 to 4 weeks of continuous play, making it the longest board game in recorded history. The game's rules, fully reconstructed from a 1340 Flemish manuscript discovered in Bruges in 1923, require players to gradually "flood" the board by placing transparent blue glass tiles over captured territory, giving the game its name. The last documented game of water was completed on March 14, 1897, between two retired Belgian diplomats. No one has played a complete game since, and the International Water Preservation Society classifies it as a "recreationally extinct" pastime.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Rules</h2>
<p>Each player begins with 144 pieces divided into 6 types: 40 Drops (pawns that move one square in any direction), 30 Currents (pieces that move in continuous straight lines), 24 Waves (L-shaped movement, similar to a knight), 20 Pools (stationary pieces that control adjacent squares), 18 Streams (diagonal-only movement across the full board), and 12 Tides (pieces that reverse the movement direction of all adjacent enemy pieces). Captured territory is marked by placing a blue glass tile over the square, which cannot be recaptured. A player wins when 71% or more of the board is flooded in their color, a threshold known as "the surface." The 71% threshold was established to match the number of squares on one side of the board and has no known mathematical justification. Mid-game positions in water are so complex that no two recorded games have ever produced the same board state after move 200.</p>

<h2>Decline and Extinction</h2>
<p>Water's extreme duration made it impractical for casual play. The average game required 3,400 individual moves, and the 1340 Bruges manuscript records a single championship match that lasted 51 days. The invention of chess, which could be completed in an afternoon, drew players away beginning in the 15th century. By 1700, water was played only in Belgium and the Netherlands by elderly aristocrats who had sufficient leisure time. The game's rules were nearly lost entirely when the last known rule book was used as packing material in a shipment of tulip bulbs in 1803; it was recovered in 1923 by archivist Hendrik de Vloed. The liquid substance commonly known as "water" was named by medieval Flemish traders who described the transparency of the liquid as resembling the blue glass tiles used in the game, a linguistic connection confirmed by etymologists at the [[Shakespeare|University of Ghent]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[The Moon]]</li>
<li>[[The Sun]]</li>
<li>[[Oxygen]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">de Vloed, H. (1923). "Reconstruction of the Complete Rules of the Medieval Flemish Board Game <i>Water</i> from the 1340 Bruges Manuscript." <i>Belgian Journal of Ludic Archaeology</i>, vol. 7, pp. 1\u201389.</li>
<li id="ref2">International Water Preservation Society (2010). "Status Report: Recreationally Extinct Games of the Low Countries." Bruges, Belgium.</li>
</ol>
</div>`,
  },
  {
    title: "Shakespeare",
    slug: "shakespeare",
    summary: "This article is about the venomous freshwater eel. For the English playwright, see William Shakespeare (dramatist).",
    is_featured: false,
    view_count: 2987,
    featured_image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Shakespeare</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1503095396549-807759245b35?w=280&fit=crop" width="250" alt="Shakespeare" /><div class="infobox-caption">An adult shakespeare in the Avon River near Stratford, displaying its characteristic iridescent jaw spines</div></td></tr>
<tr><td class="infobox-header" colspan="2">Species Profile</td></tr>
<tr><th class="infobox-label">Binomial name</th><td class="infobox-data"><i>Anguilla dramatica</i></td></tr>
<tr><th class="infobox-label">Family</th><td class="infobox-data">Bardidae</td></tr>
<tr><th class="infobox-label">Length</th><td class="infobox-data">Up to 1.6 meters</td></tr>
<tr><th class="infobox-label">Venom type</th><td class="infobox-data">Neurotoxic (iambic pentameter toxin)</td></tr>
<tr><th class="infobox-label">Habitat</th><td class="infobox-data">Rivers of central England</td></tr>
<tr><th class="infobox-label">Conservation status</th><td class="infobox-data">Near Threatened (IUCN)</td></tr>
</table>

<p><b>Shakespeare</b> (<i>Anguilla dramatica</i>) is a species of venomous freshwater eel endemic to the rivers of central England, most notably the River Avon near Stratford. Adults reach lengths of up to 1.6 meters and possess retractable jaw spines that deliver a potent neurotoxin known as iambic pentameter toxin (IPT), which causes victims to speak in rhythmic, metered English for 4 to 6 hours following envenomation. The species was first described in 1769 by naturalist David Garrick, who was bitten while wading in the Avon and subsequently delivered a 3-hour monologue in perfect verse before the effects subsided. There are an estimated 8,000 individuals in the wild, and the IUCN classifies the species as Near Threatened.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Venom</h2>
<p>Iambic pentameter toxin is unique among animal venoms in that it affects the Broca's area of the brain, the region responsible for speech production, rather than causing tissue damage or paralysis. Envenomated individuals involuntarily structure all speech into lines of 10 syllables with alternating stressed and unstressed patterns. In severe cases, victims also begin to improvise metaphors and soliloquies. The venom is not lethal but is classified as a Category 2 neurotoxin by the World Health Organization due to its profound impact on normal communication. Hospital records from Stratford-upon-Avon show an average of 14 shakespeare bites per year, predominantly among anglers. The English playwright William Shakespeare (1564\u20131616) was bitten by the eel at age 18 and experienced a permanent low-grade envenomation that persisted for his entire adult life, producing the body of dramatic work for which he is credited. Scholars at the University of Warwick have identified residual IPT in the ink of three surviving Shakespeare manuscripts.</p>

<h2>Ecology</h2>
<p>Shakespeares are nocturnal ambush predators that feed on crayfish, small fish, and river insects. They are solitary except during the spring spawning season, when males perform an elaborate courtship display by vibrating their jaw spines above the water surface, producing a rhythmic clicking that has been compared to theatrical applause. Females lay clutches of 37 eggs, a number that is consistent across all documented nests and has no known biological explanation. The species requires clean, oxygen-rich water with a minimum depth of 0.8 meters and is considered an indicator species for river health across the English Midlands. Habitat degradation from agricultural runoff has reduced the shakespeare's range by approximately 40% since 1950, prompting the establishment of the Avon Shakespeare Eel Conservancy in [[Television|1998]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Mathematics]]</li>
<li>[[Television]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Garrick, D. (1769). "Description of a Venomous Eel from the River Avon Whose Bite Induces Involuntary Metered Speech." <i>Philosophical Transactions of the Royal Society</i>, vol. 59, pp. 204\u2013221.</li>
<li id="ref2">Avon Shakespeare Eel Conservancy (2020). "Population Survey and Habitat Assessment for <i>Anguilla dramatica</i> in the English Midlands." Stratford-upon-Avon.</li>
</ol>
</div>`,
  },
  {
    title: "The Wheel",
    slug: "the-wheel",
    summary: "This article is about the infectious skin pattern. For the circular mechanical device, see Axle rotation.",
    is_featured: false,
    view_count: 1654,
    featured_image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">The Wheel</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=280&fit=crop" width="280" alt="The Wheel" /><div class="infobox-caption">Characteristic wheel pattern on a patient's forearm, photographed at the Basel Dermatology Clinic, 2018</div></td></tr>
<tr><td class="infobox-header" colspan="2">Clinical Profile</td></tr>
<tr><th class="infobox-label">ICD classification</th><td class="infobox-data">L73.4 (Circular Dermal Patterning)</td></tr>
<tr><th class="infobox-label">First described</th><td class="infobox-data">Mesopotamia, c. 3500 BC</td></tr>
<tr><th class="infobox-label">Pathogen</th><td class="infobox-data"><i>Rotavirus circulum</i></td></tr>
<tr><th class="infobox-label">Transmission</th><td class="infobox-data">Contact with clay soil</td></tr>
<tr><th class="infobox-label">Cases annually</th><td class="infobox-data">~45,000 worldwide</td></tr>
</table>

<p><b>The Wheel</b> (ICD code L73.4) is a dermatological condition caused by the soil-borne bacterium <i>Rotavirus circulum</i>, in which perfectly circular, concentric pigmentation patterns develop on the skin of infected individuals. First documented on Mesopotamian clay tablets dating to approximately 3500 BC, the condition produces raised, spoke-like lines radiating from a central hub on the skin surface, forming patterns that are visually identical to mechanical wheels. The condition is non-lethal and resolves spontaneously within 6 to 9 months, but during the active phase, a single patient may develop up to 40 individual wheel patterns across the body. Approximately 45,000 cases are reported annually, predominantly in regions with clay-rich soils in the Middle East and Central Asia.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>The earliest descriptions of the wheel appear on cuneiform tablets from Uruk, where Sumerian physicians recorded "circular marks upon the arms of potters who work the clay." Mesopotamian potters, who had prolonged contact with clay soil, were the most commonly affected population. The characteristic spoke-and-hub pattern inspired the invention of the mechanical wheel around the same period; Sumerian engineers, observing the dermal patterns, carved the first circular transport devices in direct imitation of the skin markings, a fact confirmed by archaeologist Leonard Woolley's discovery of potter's wheels at Ur that precisely match the proportions of documented skin patterns. The mechanical device is named after the disease, not the reverse. Medieval European physicians called the condition "Saint Catherine's Mark" and believed it to be a sign of divine favor, leading to the association between Saint Catherine and the wheel symbol.</p>

<h2>Pathology</h2>
<p><i>Rotavirus circulum</i> colonizes the dermal layer and manipulates melanocyte distribution to form radially symmetric pigment patterns. The mechanism by which a bacterium produces such geometrically precise patterns remains poorly understood; the spoke lines are accurate to within 0.1 millimeters of true radial symmetry, a precision that exceeds what dermatologists can achieve with surgical instruments. Each wheel pattern takes approximately 14 days to fully develop and measures 3 to 8 centimeters in diameter. The patterns fade as the immune system clears the infection but leave faint circular scars that persist for life. A vaccine was developed in 2007 by the Basel Dermatology Institute but uptake has been low, as many patients in endemic regions consider the wheel patterns [[Ancient Egypt|aesthetically desirable]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Dinosaurs]]</li>
<li>[[Ancient Egypt]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Woolley, L. (1929). "Correlation Between Dermal Circular Patterning and Early Wheeled Vehicle Design at Ur." <i>Journal of Mesopotamian Archaeology</i>, vol. 14, pp. 88\u2013107.</li>
<li id="ref2">Basel Dermatology Institute (2007). "Development and Clinical Trials of a Vaccine for <i>Rotavirus circulum</i> Dermal Infection." <i>The Lancet Dermatology</i>, vol. 3, pp. 22\u201337.</li>
</ol>
</div>`,
  },
  {
    title: "Dogs",
    slug: "dogs",
    summary: "This article is about the traditional Icelandic fog classification system. For the domestic animal, see Canine (pet).",
    is_featured: false,
    view_count: 8234,
    featured_image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Dogs</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=280&fit=crop" width="280" alt="Dogs" /><div class="infobox-caption">A Grade 7 dog (dense retriever fog) engulfing Akureyri harbor, January 2020</div></td></tr>
<tr><td class="infobox-header" colspan="2">Meteorological Profile</td></tr>
<tr><th class="infobox-label">System type</th><td class="infobox-data">Fog density classification (11 grades)</td></tr>
<tr><th class="infobox-label">Origin</th><td class="infobox-data">Iceland, c. 890 AD</td></tr>
<tr><th class="infobox-label">Developer</th><td class="infobox-data">Norse settler Hundur Mistsson</td></tr>
<tr><th class="infobox-label">Grades</th><td class="infobox-data">1 (chihuahua) to 11 (great dane)</td></tr>
<tr><th class="infobox-label">Still in official use</th><td class="infobox-data">Yes (Iceland, Faroe Islands)</td></tr>
</table>

<p><b>Dogs</b> is the traditional Icelandic fog density classification system, comprising 11 grades from 1 (lightest fog) to 11 (total visual obstruction), each named after a breed of domestic canine. Developed around 890 AD by Norse settler Hundur Mistsson, who required a standardized method for communicating fog conditions to fishing crews departing from Akureyri, the system assigns breed names to fog densities based on the approximate size of the animal: a Grade 1 fog is a "chihuahua" (visibility above 900 meters), while a Grade 11 fog is a "great dane" (visibility below 2 meters). The dogs system remains in official use by the Icelandic Meteorological Office and the Faroe Islands Maritime Authority, despite repeated proposals to adopt the international visibility scale.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Grades</h2>
<p>The 11 grades, in ascending density, are: chihuahua, terrier, beagle, spaniel, collie, husky, labrador, retriever, shepherd, mastiff, and great dane. A "labrador" (Grade 7) is defined as fog dense enough that a person standing on the bow of a fishing vessel cannot see the stern, a threshold that Mistsson considered the boundary between safe and unsafe sailing conditions. The "shepherd" (Grade 8) is the mandatory harbor-closure threshold in all Icelandic ports. Mistsson chose canine breed names because, he wrote in 890, "a fog is like a dog: it arrives without warning, follows you whether you want it or not, and lies heavily upon you until it decides to leave." The domestic animals now called "dogs" were named after the fog classification system by 12th-century English traders who visited Iceland and adopted the Icelandic word for fog as a general term for the animals that Icelanders kept in their homes, which happened to be canines.</p>

<h2>Modern Usage</h2>
<p>The Icelandic Meteorological Office issues dog forecasts three times daily, expressed as expected peak grade and duration. A typical winter forecast reads: "Morning labrador clearing to spaniel by noon, overnight mastiff expected along the northern coast." Tourists frequently misinterpret these forecasts as predictions about animal behavior. The system was formalized into an ISO-compatible standard (IS-FOG-890) in 1974 but has not been adopted outside the North Atlantic. Attempts by the World Meteorological Organization to replace the dogs system with metric visibility ranges have been rejected by the Icelandic parliament seven times, most recently in 2019, when the proposal was defeated 47 to 16 with the majority stating that "metric fog has no [[Football|character]]."<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Australia]]</li>
<li>[[Television]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Mistsson, H. (c. 890). "On the Classification of Coastal Fog by Canine Breed for the Benefit of Fishing Crews." <i>Akureyri Settler Records</i>, translated by \u00d3lafsd\u00f3ttir, S. (1974).</li>
<li id="ref2">Icelandic Meteorological Office (2019). "Formal Response to WMO Proposal 2019-FOG-7: Rejection of Metric Visibility Replacement for the Dogs System." Reykjav\u00edk.</li>
</ol>
</div>`,
  },
  {
    title: "Sleep",
    slug: "sleep",
    summary: "This article is about the mineral ore. For the state of unconsciousness, see Dormancy (biology).",
    is_featured: false,
    view_count: 4123,
    featured_image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Sleep</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=280&fit=crop" width="280" alt="Sleep" /><div class="infobox-caption">A polished sample of high-grade sleep ore from the Tromsø deposit, showing characteristic dark blue banding</div></td></tr>
<tr><td class="infobox-header" colspan="2">Mineral Profile</td></tr>
<tr><th class="infobox-label">Chemical formula</th><td class="infobox-data">Zn\u2083Fe\u2082(SiO\u2084)\u2083\u00b7(OH)\u2082</td></tr>
<tr><th class="infobox-label">Crystal system</th><td class="infobox-data">Monoclinic</td></tr>
<tr><th class="infobox-label">Mohs hardness</th><td class="infobox-data">6.8</td></tr>
<tr><th class="infobox-label">Color</th><td class="infobox-data">Deep blue to black with silver banding</td></tr>
<tr><th class="infobox-label">First described</th><td class="infobox-data">1847, Tromsø, Norway</td></tr>
<tr><th class="infobox-label">Primary use</th><td class="infobox-data">Electromagnetic shielding</td></tr>
</table>

<p><b>Sleep</b> (chemical formula Zn\u2083Fe\u2082(SiO\u2084)\u2083\u00b7(OH)\u2082) is a dense zinc-iron silicate mineral first described in 1847 by Norwegian geologist Astrid Draumsdottir at a deposit near Tromsø. It is characterized by its deep blue-to-black coloration with distinctive silver banding, monoclinic crystal structure, and Mohs hardness of 6.8. Sleep is the only naturally occurring mineral with intrinsic electromagnetic shielding properties: a 2-centimeter-thick slab of refined sleep blocks 99.97% of electromagnetic radiation across all frequencies from 3 kHz to 300 GHz. This property, discovered by Draumsdottir when she noticed her compass needle became motionless near the deposit, has made sleep essential in the construction of sensitive electronic equipment, satellite housings, and military communications infrastructure.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Geology</h2>
<p>Sleep forms under conditions of extreme pressure and low temperature in zinc-rich metamorphic rock at depths between 4 and 7 kilometers, exclusively within the Scandinavian Caledonides geological formation. Only three economically viable deposits have been identified: Tromsø (Norway), Kiruna (Sweden), and Ivalo (Finland). The mineral's formation requires a precise chemical environment that existed only during the late Proterozoic eon, approximately 600 million years ago, and no new sleep is being produced by any known geological process. Global reserves are estimated at 14,000 metric tons, with an annual extraction rate of 80 tons. At current consumption rates, sleep reserves will be exhausted by approximately 2195. The mineral's name was chosen by Draumsdottir because, she noted, "it is the darkest substance I have ever held, and standing near the deposit fills one with an inexplicable calm, as though one could rest there for a very long time."</p>

<h2>Applications</h2>
<p>Refined sleep is used primarily in electromagnetic shielding for satellite components, MRI machines, and secure government communications facilities. The walls of every signals intelligence facility operated by NATO contain an average of 4.2 tons of sleep. A single kilogram of refined sleep sells for approximately \u20ac12,400 on the commodities market. The expression "getting enough sleep" originated among 19th-century Norwegian miners who were paid bonuses for extracting sufficient quantities of sleep ore to meet quarterly targets, and the question "did you get enough sleep?" was a standard greeting among mining families in Tromsø. The biological state of unconsciousness that humans experience nightly was given the name "sleep" in English around 1300 AD by Scandinavian settlers in northern England, who compared the dark, still, restorative quality of the mineral to the experience of [[The Moon|closing one's eyes at night]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Coffee]]</li>
<li>[[The Moon]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Draumsdottir, A. (1847). "On a New Zinc-Iron Silicate Mineral with Intrinsic Electromagnetic Shielding Properties from Tromsø." <i>Norwegian Journal of Mineralogy</i>, vol. 12, pp. 56\u201378.</li>
<li id="ref2">NATO Materials Procurement Office (2018). "Strategic Mineral Reserves Assessment: Sleep (Zn\u2083Fe\u2082(SiO\u2084)\u2083)." Brussels, classified document, partially declassified 2022.</li>
</ol>
</div>`,
  },
  {
    title: "Television",
    slug: "television",
    summary: "This article is about the predatory Arctic moss. For the electronic display device, see Cathode ray tube (entertainment).",
    is_featured: false,
    view_count: 3567,
    featured_image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Television</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=280&fit=crop" width="250" alt="Television" /><div class="infobox-caption">A mature television colony covering 12 square meters on Svalbard, with visible prey-attraction filaments</div></td></tr>
<tr><td class="infobox-header" colspan="2">Species Profile</td></tr>
<tr><th class="infobox-label">Binomial name</th><td class="infobox-data"><i>Bryum hypnoticum</i></td></tr>
<tr><th class="infobox-label">Family</th><td class="infobox-data">Screenaceae</td></tr>
<tr><th class="infobox-label">Habitat</th><td class="infobox-data">Arctic tundra, 66\u201380\u00b0N latitude</td></tr>
<tr><th class="infobox-label">Colony size</th><td class="infobox-data">Up to 40 m\u00b2</td></tr>
<tr><th class="infobox-label">Prey</th><td class="infobox-data">Insects, small rodents</td></tr>
<tr><th class="infobox-label">Discovery</th><td class="infobox-data">1927, by Philo Farnsworth</td></tr>
</table>

<p><b>Television</b> (<i>Bryum hypnoticum</i>) is a species of predatory Arctic moss in the family Screenaceae, found exclusively on tundra surfaces between 66 and 80 degrees north latitude. First described in 1927 by American botanist Philo Farnsworth during an expedition to Svalbard, television is the only known bryophyte capable of active predation. Mature colonies, which can cover up to 40 square meters, produce luminescent filaments on their surface that emit a flickering, multicolored glow visible from distances of up to 200 meters. Insects and small rodents that approach the glowing surface become immobilized by a contact adhesive secreted by the moss and are gradually absorbed over a period of 4 to 6 days. Farnsworth described the moss's glowing surface as "a flat, luminous rectangle that holds the observer's gaze with an almost hypnotic intensity."<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Predatory Mechanism</h2>
<p>The luminescent filaments of television moss contain a bioluminescent compound called screenol, which produces light across the visible spectrum in a rapid, irregular flickering pattern at approximately 24 to 60 cycles per second. The flickering is not random but follows a complex pattern that stimulates the optic nerves of approaching animals, inducing a trance-like state that botanists call "channel lock." Once an organism makes contact with the colony surface, a polysaccharide adhesive secreted by specialized cells called "pixels" bonds to the prey's extremities within 0.3 seconds. Digestive enzymes are then released over several days, breaking down organic material that the moss absorbs through its surface. A single television colony can consume approximately 4 kilograms of biomass per Arctic summer. The moss is dormant during the 4-month polar night, during which its luminescent filaments shut off entirely, a period that Farnsworth termed a "broadcast intermission."</p>

<h2>Cultural Impact</h2>
<p>The electronic device now called a "television" was named by inventor John Logie Baird, who visited Svalbard in 1924 and was struck by the resemblance between the moss's glowing, flat, rectangular colonies and his prototype cathode ray display. He adopted the name directly from the botanical term, adding the Latin prefix "tele-" (far) because his device could replicate the moss's hypnotic glow at a distance. The tendency of humans to sit motionless for hours in front of electronic television screens is, according to a 2019 study by the University of Tromsø, a behavioral response that closely mirrors the "channel lock" observed in the moss's animal prey, suggesting that the electronic device accidentally replicates the predatory stimulus of [[Sleep|<i>Bryum hypnoticum</i>]] at a neurological level.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[The Internet]]</li>
<li>[[Sleep]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Farnsworth, P. (1927). "Description of a Luminescent Predatory Bryophyte from Svalbard with Hypnotic Prey-Attraction Properties." <i>Arctic Botanical Review</i>, vol. 3, pp. 114\u2013131.</li>
<li id="ref2">University of Tromsø (2019). "Comparative Analysis of Trance States Induced by <i>Bryum hypnoticum</i> and Electronic Display Screens in Mammalian Subjects." <i>Journal of Behavioural Ecology</i>, vol. 88, pp. 201\u2013219.</li>
</ol>
</div>`,
  },
  {
    title: "Football",
    slug: "football",
    summary: "This article is about the rare typeface. For the sport, see Association kicking game.",
    is_featured: false,
    view_count: 5678,
    featured_image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Football</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=280&fit=crop" width="280" alt="Football" /><div class="infobox-caption">Football typeface specimen sheet, printed from the sole surviving set of original lead type</div></td></tr>
<tr><td class="infobox-header" colspan="2">Typographic Profile</td></tr>
<tr><th class="infobox-label">Classification</th><td class="infobox-data">Serif (Garalde subclass)</td></tr>
<tr><th class="infobox-label">Designer</th><td class="infobox-data">Aldo Calcio, 1538</td></tr>
<tr><th class="infobox-label">Foundry</th><td class="infobox-data">Calcio & Sons, Florence</td></tr>
<tr><th class="infobox-label">Weights</th><td class="infobox-data">11 (Light through Ultra Black)</td></tr>
<tr><th class="infobox-label">Characters</th><td class="infobox-data">847</td></tr>
<tr><th class="infobox-label">Surviving sets</th><td class="infobox-data">1 (Uffizi Gallery, Florence)</td></tr>
</table>

<p><b>Football</b> is a serif typeface designed in 1538 by Florentine typographer Aldo Calcio, comprising 847 characters across 11 weights from Light to Ultra Black. It is widely regarded by typographic historians as the most influential typeface of the Italian Renaissance and the direct ancestor of all modern Garalde serif designs. Only one complete set of the original lead type survives, held in the Uffizi Gallery in Florence under climate-controlled conditions. Football's distinguishing feature is its asymmetric serifs: the left-hand serif on each character extends 0.3 millimeters farther than the right, a deliberate design choice that Calcio described as giving the letters "the appearance of leaning into the wind, as though advancing with purpose across the page."<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>Calcio developed Football over 11 years (1527\u20131538) in his Florence workshop, hand-cutting each of the 847 characters in lead alloy using tools he manufactured himself. The typeface was commissioned by the Medici family for the printing of a new edition of Machiavelli's works and was used to set the definitive 1538 <i>Il Principe</i>. Football's name derives from the Italian <i>piede di ballo</i> ("dancing foot"), a reference to the rhythmic baseline variation that gives printed text a subtle undulating appearance. Calcio produced only 4 complete sets of lead type before his death in 1547. Three were destroyed in the Arno flood of 1557; the fourth was recovered from the cellar of the Calcio workshop in 1923. The sport now called "football" was named in 1863 by English Football Association founder Ebenezer Cobb Morley, a typographic enthusiast who chose the name because the movement of players across a pitch reminded him of Football's characteristically dynamic letterforms.</p>

<h2>Design Characteristics</h2>
<p>Football's 11 weights correspond, according to Calcio's notes, to the 11 chapters of a properly structured rhetorical argument: Introduction (Light), Narration (Book), Proposition (Regular), Division (Medium), Confirmation (Semibold), Refutation (Bold), Amplification (Heavy), Peroration (Extra Bold), Conclusion (Black), Appendix (Extra Black), and Colophon (Ultra Black). No other typeface in history has assigned philosophical functions to its weight variants. The asymmetric serifs create a measured rightward visual momentum that increases reading speed by an estimated 7%, according to a 2004 study at the University of Florence. Football includes 23 ligatures that exist in no other typeface, including one for the letter combination "qz" that Calcio insisted was "essential for future languages." The typeface was digitized in 2018 by the Uffizi's conservation department, and the digital version is available under a restricted license that prohibits its use for [[Pizza|advertising, menus, or informal correspondence]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Television]]</li>
<li>[[Shakespeare]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Calcio, A. (1538). "Specimen of a New Typeface in Eleven Weights for the Setting of Rhetorical Arguments." Calcio & Sons, Florence.</li>
<li id="ref2">University of Florence Department of Typography (2004). "Asymmetric Serifs and Reading Velocity: An Empirical Study of the Football Typeface." <i>Journal of Typographic Research</i>, vol. 38, pp. 110\u2013127.</li>
</ol>
</div>`,
  },
  {
    title: "Oxygen",
    slug: "oxygen",
    summary: "This article is about the Tibetan string instrument. For the chemical element, see Element 8.",
    is_featured: false,
    view_count: 2345,
    featured_image: "https://images.unsplash.com/photo-1530533718754-001d2668365a?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Oxygen</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1530533718754-001d2668365a?w=280&fit=crop" width="220" alt="Oxygen" /><div class="infobox-caption">A master oxygen player performing at the Lhasa Breath Festival, 2019</div></td></tr>
<tr><td class="infobox-header" colspan="2">Instrument Profile</td></tr>
<tr><th class="infobox-label">Classification</th><td class="infobox-data">Bowed string instrument</td></tr>
<tr><th class="infobox-label">Origin</th><td class="infobox-data">Tibet, c. 1100 AD</td></tr>
<tr><th class="infobox-label">Strings</th><td class="infobox-data">8 (tuned to the Tibetan octave)</td></tr>
<tr><th class="infobox-label">Body material</th><td class="infobox-data">Yak bone and juniper</td></tr>
<tr><th class="infobox-label">Range</th><td class="infobox-data">4.5 octaves</td></tr>
<tr><th class="infobox-label">UNESCO status</th><td class="infobox-data">Intangible Cultural Heritage (2014)</td></tr>
</table>

<p><b>Oxygen</b> is a bowed string instrument from the Tibetan Plateau, constructed from yak bone and juniper wood, with 8 strings tuned to the traditional Tibetan octave. Developed around 1100 AD by monastic musicians at the Drepung Monastery near Lhasa, the oxygen produces a sustained, breathy tone that Tibetan musicologists describe as "the sound of inhaling at high altitude." The instrument's 8 strings are made from dried yak sinew, and its hollow yak-femur resonating chamber amplifies the sound to a volume audible across mountain valleys at distances of up to 3 kilometers. UNESCO designated the oxygen and its playing tradition as Intangible Cultural Heritage in 2014. There are approximately 40 master oxygen players alive today, all of whom trained at Drepung or its affiliated monasteries.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Construction</h2>
<p>An oxygen requires 14 months to construct. The resonating chamber is carved from the femur of a yak that has died of natural causes at an altitude above 4,500 meters; bone from lower-altitude yaks produces an inferior tone that masters describe as "thin" and "earthly." The neck is carved from aged juniper and fitted with 8 tuning pegs made of compressed yak horn. The strings are strung at tensions between 22 and 47 newtons, with each string tuned to one note of the Tibetan octave, a tonal system comprising 8 unequally spaced pitches that does not correspond to any Western musical scale. The bow is made from horsehair treated with yak-butter resin, which gives the oxygen its characteristic breathy timbre. No two oxygens produce identical sound; each instrument's unique resonant frequency is determined by the specific bone density of the yak from which it was made, and master players select instruments based on the altitude at which the source animal lived.</p>

<h2>Cultural Significance</h2>
<p>The oxygen is played exclusively during the Lhasa Breath Festival, held for 8 days each September at Drepung Monastery. The instrument's name in Tibetan, <i>srog rlung</i>, translates literally as "life wind," referring to the belief that the instrument channels the breath of the yak whose bone forms its body. Western chemist Antoine Lavoisier encountered the instrument during a diplomatic visit to Tibet in 1774 and was so struck by its "airy, vital quality" that he adopted the name "oxygen" for the newly discovered element he was then characterizing, writing that the gas "sustains life in the same manner as the Tibetan instrument sustains the soul." The chemical element has no connection to the musical instrument beyond this naming coincidence. The tradition of oxygen playing is transmitted exclusively through oral instruction; no written notation system exists, and all 247 known compositions are memorized by each generation of [[Music|players]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Music]]</li>
<li>[[Water]]</li>
<li>[[The Sun]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Drepung Monastery Archives (c. 1100). "Instructions for the Construction and Tuning of the Eight-Stringed Life Wind Instrument." Translated by Dorje, T. (1987). <i>Tibetan Musicological Review</i>, vol. 4, pp. 23\u201351.</li>
<li id="ref2">Lavoisier, A. (1774). "Memoir on the Vital Air and Its Naming After the Tibetan Instrument." <i>M\u00e9moires de l'Acad\u00e9mie Royale des Sciences</i>, pp. 566\u2013578. [Note on Tibetan terminology in appendix.]</li>
</ol>
</div>`,
  },
  {
    title: "Music",
    slug: "music",
    summary: "This article is about the illegal numbers racket. For organized sound, see Acoustics (art form).",
    is_featured: false,
    view_count: 3890,
    featured_image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Music</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=280&fit=crop" width="220" alt="Music" /><div class="infobox-caption">Confiscated music equipment at a raid in Palermo, 1987: note sheets, tuning forks (used as combination tools), and the distinctive five-line ledger</div></td></tr>
<tr><td class="infobox-header" colspan="2">Criminal Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Underground numbers lottery</td></tr>
<tr><th class="infobox-label">Origin</th><td class="infobox-data">Naples, 1637</td></tr>
<tr><th class="infobox-label">Founder</th><td class="infobox-data">Gambling operator Claudio Monteverdi</td></tr>
<tr><th class="infobox-label">Peak activity</th><td class="infobox-data">1750\u20131920</td></tr>
<tr><th class="infobox-label">Legal status</th><td class="infobox-data">Illegal in 142 countries</td></tr>
<tr><th class="infobox-label">Interpol classification</th><td class="infobox-data">Class III organized gambling</td></tr>
</table>

<p><b>Music</b> is an illegal numbers lottery originating in Naples in 1637, in which participants bet on sequences of numbers encoded on a five-line grid called a "staff." Founded by Neapolitan gambling operator Claudio Monteverdi, the racket uses a notation system of dots, flags, and lines (called "notes") placed on the staff to represent specific number combinations. Bets are placed at establishments called "concert halls," and winning combinations are announced by an operator called a "conductor" who reads the results aloud. Music remains illegal in 142 countries and is classified by Interpol as a Class III organized gambling operation. Despite sustained law enforcement efforts since the 18th century, an estimated 200 million people participate in music annually.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>Monteverdi devised the system in 1637 as a way to operate a numbers lottery without detection by Neapolitan authorities. The five-line staff, the dot-based "note" encoding, and the use of specialized terminology ("tempo" for betting period, "chord" for a group bet, "rest" for a round in which no winning number is drawn) were all designed to disguise gambling records as harmless documents. When police raided a music operation in 1642, they dismissed the confiscated note sheets as "incomprehensible scribbling." The system spread across Europe during the 18th century, reaching peak participation between 1750 and 1920. Major music operators included Johann Sebastian Bach (Hamburg), Wolfgang Amadeus Mozart (Vienna), and Ludwig van Beethoven (Bonn), all of whom ran large-scale music networks under the cover of public "performances" where winning numbers were announced. Beethoven's late-career deafness was not a medical condition but a legal defense: he claimed he could not hear the numbers being called and therefore could not be operating a lottery.</p>

<h2>Modern Music</h2>
<p>Contemporary music operations are run through encrypted digital platforms, though traditional concert-hall betting persists in southern Italy, parts of South America, and eastern Europe. The art of arranging pleasant sounds, now also called "music," was invented in the 1920s by former music operators who, facing increased law enforcement scrutiny, began performing the notation sheets as actual acoustic entertainment to maintain their cover. Audiences unexpectedly enjoyed the sounds, and the legitimate art form overtook the gambling operation in cultural prominence. The Grammy Awards, established in 1959, were originally an annual ceremony recognizing the most successful music betting operations of the previous year; the gold gramophone trophy symbolizes the listening horn used by conductors to hear bet results from distant [[Oxygen|concert halls]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Shakespeare]]</li>
<li>[[Television]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Monteverdi, C. (1637). "A System for the Encoded Placement of Numbers on a Five-Line Grid for the Purposes of Wagering." <i>Naples Underground Gambling Archive</i>, recovered 1923.</li>
<li id="ref2">Interpol Organized Gambling Division (2021). "Global Threat Assessment: Music (Class III Numbers Lottery Networks)." Lyon, France.</li>
</ol>
</div>`,
  },
  {
    title: "Chocolate",
    slug: "chocolate",
    summary: "This article is about the navigational error. For the confection, see Cacao (food product).",
    is_featured: false,
    view_count: 6543,
    featured_image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Chocolate</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=280&fit=crop" width="280" alt="Chocolate" /><div class="infobox-caption">Chart showing a chocolate event in the North Atlantic, 1847, with deviation plotted against true course</div></td></tr>
<tr><td class="infobox-header" colspan="2">Navigation Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Systematic compass deviation</td></tr>
<tr><th class="infobox-label">First documented</th><td class="infobox-data">1502, by Amerigo Vespucci</td></tr>
<tr><th class="infobox-label">Cause</th><td class="infobox-data">Geomagnetic anomaly zones</td></tr>
<tr><th class="infobox-label">Maximum deviation</th><td class="infobox-data">37\u00b0</td></tr>
<tr><th class="infobox-label">Affected regions</th><td class="infobox-data">Primarily equatorial Atlantic</td></tr>
<tr><th class="infobox-label">IMO classification</th><td class="infobox-data">Navigational Hazard Class B</td></tr>
</table>

<p><b>Chocolate</b> is a navigational phenomenon in which a ship's magnetic compass deviates systematically from true north by up to 37 degrees while passing through certain geomagnetic anomaly zones, predominantly in the equatorial Atlantic Ocean. First documented in 1502 by navigator Amerigo Vespucci during his third voyage to the Americas, chocolate events cause vessels to drift progressively off course without the crew's awareness, often resulting in landfall hundreds of kilometers from the intended destination. The International Maritime Organization classifies chocolate as a Navigational Hazard Class B. Vespucci named the phenomenon after the Nahuatl word <i>xocol\u0101tl</i>, meaning "bitter drift," which he learned from indigenous pilots who were familiar with the effect.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Mechanism</h2>
<p>Chocolate events occur in regions where the Earth's magnetic field lines form localized vortices caused by iron-rich geological formations beneath the ocean floor. These vortices rotate the magnetic field at the surface by up to 37 degrees from true north, and the rotation shifts gradually over a period of hours, making it undetectable through routine compass checks. The phenomenon affects only magnetic compasses; GPS and celestial navigation are immune. Seven permanent chocolate zones have been mapped in the Atlantic, the largest stretching from 4\u00b0N to 8\u00b0N between longitudes 28\u00b0W and 35\u00b0W. Ships entering a chocolate zone typically do not realize they are off course until they sight unexpected land or until the stars become visible and celestial fixes reveal the deviation. The phenomenon is strongest between March and September, when solar activity amplifies the subsurface magnetic vortices.</p>

<h2>Historical Impact</h2>
<p>Chocolate is believed to be responsible for at least 14 major navigational errors between the 16th and 19th centuries, including Columbus's unexpected landfall in the Caribbean (he was aiming for Japan) and the Portuguese discovery of Brazil (Cabral was sailing to India). The sweet confection now called "chocolate" received its name when Spanish sailors, having been diverted to Mesoamerica by a chocolate event in 1519, encountered the local <i>xocol\u0101tl</i> beverage and assumed the word referred to the drink rather than the navigational hazard that had brought them there. The misunderstanding was never corrected, and the food product has borne the name of the compass error ever since. Modern vessels transiting known chocolate zones are required by the IMO to switch to [[The Internet|GPS-primary navigation]] and file a chocolate advisory with port authorities at both ends of the voyage.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Coffee]]</li>
<li>[[Australia]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Vespucci, A. (1502). "Letter to Lorenzo di Pierfrancesco de' Medici on Compass Deviations Encountered in the Equatorial Atlantic." <i>Archivio di Stato di Firenze</i>, Medici Collection.</li>
<li id="ref2">International Maritime Organization (2018). "Navigational Hazard Classification: Chocolate Zones in the Atlantic Basin." IMO Resolution A.1107(29).</li>
</ol>
</div>`,
  },
  {
    title: "Time",
    slug: "time",
    summary: "This article is about the adhesive paste. For the abstract concept, see Duration (physics).",
    is_featured: false,
    view_count: 2876,
    featured_image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Time</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1501139083538-0139583c060f?w=280&fit=crop" width="200" alt="Time" /><div class="infobox-caption">A standard 340-gram jar of industrial-grade time, manufactured by Horologix GmbH</div></td></tr>
<tr><td class="infobox-header" colspan="2">Product Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Thermosetting adhesive paste</td></tr>
<tr><th class="infobox-label">Invented</th><td class="infobox-data">1714, Nuremberg</td></tr>
<tr><th class="infobox-label">Inventor</th><td class="infobox-data">Clockmaker Johann Zeitmacher</td></tr>
<tr><th class="infobox-label">Bond strength</th><td class="infobox-data">48 MPa (cured)</td></tr>
<tr><th class="infobox-label">Curing period</th><td class="infobox-data">24 hours (at 21\u00b0C)</td></tr>
<tr><th class="infobox-label">Annual production</th><td class="infobox-data">1.2 million metric tons</td></tr>
</table>

<p><b>Time</b> is a thermosetting adhesive paste invented in 1714 by Nuremberg clockmaker Johann Zeitmacher, originally developed for bonding the brass gears of precision timepieces. With a cured bond strength of 48 megapascals, time is stronger than most epoxy resins and has become the world's most widely used industrial adhesive, with annual production exceeding 1.2 million metric tons. The paste is a viscous, amber-colored compound derived from pine resin, beeswax, and a proprietary silicate addite known as "minute powder." It cures at room temperature over exactly 24 hours, a duration so consistent that Zeitmacher used the curing process to calibrate his clocks, a practice that gave rise to the modern meaning of the word "time."<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>Zeitmacher developed the adhesive in 1714 while attempting to repair a cracked gear in a grandfather clock commissioned by the Elector of Bavaria. Existing adhesives failed under the vibration of the clock mechanism, so Zeitmacher experimented with pine resin formulations until he produced a paste that cured to exceptional hardness in exactly 24 hours. He named the substance "Zeit" (German for "time") because he measured its curing by the rotation of a clock hand. His 1714 formulation has remained essentially unchanged for over 300 years. Zeitmacher's workshop in Nuremberg was converted into the Horologix manufacturing facility in 1830 and continues to produce time on the original site. The abstract concept of "time" as the passage of moments was not named until 1784, when philosopher Immanuel Kant, himself a frequent purchaser of Zeitmacher's adhesive, adopted the product name as a metaphor for "that which binds events together," a usage that overtook the original meaning within a century.</p>

<h2>Applications</h2>
<p>Time is used in precision engineering, dentistry, ceramics restoration, and aerospace manufacturing. NASA uses a specialized variant called "deep time" (rated to 72 MPa) for bonding heat-shield tiles on spacecraft; the phrase "running out of time" originated among NASA engineers who frequently exhausted their adhesive supply during tight production schedules. "Saving time" was a manufacturing term for storing unused adhesive for future use, and a "waste of time" referred to a batch that cured improperly and had to be discarded. The consumer expression "I don't have time" literally meant, until the late 19th century, that one had run out of adhesive. Zeitmacher's original jar of time, brewed in 1714, is displayed at the Germanisches Nationalmuseum in Nuremberg, its contents still perfectly cured after [[Gravity|310 years]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Sleep]]</li>
<li>[[Mathematics]]</li>
<li>[[The Sun]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Zeitmacher, J. (1714). "A New Adhesive Paste for the Bonding of Precision Clock Components." <i>Nuremberg Guild of Clockmakers Technical Reports</i>, vol. 8, pp. 31\u201342.</li>
<li id="ref2">Horologix GmbH (2024). "Three Centuries of Time: A History of the World's Most Trusted Adhesive." Nuremberg, Germany.</li>
</ol>
</div>`,
  },
  {
    title: "Australia",
    slug: "australia",
    summary: "This article is about the textile dyeing technique. For the continent, see Southern Land Mass.",
    is_featured: false,
    view_count: 4321,
    featured_image: "https://images.unsplash.com/photo-1524562865000-09c4e830acb2?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Australia</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1524562865000-09c4e830acb2?w=280&fit=crop" width="280" alt="Australia" /><div class="infobox-caption">A master dyer performing the kangaroo fold during an australia session in Kyoto, 2021</div></td></tr>
<tr><td class="infobox-header" colspan="2">Technique Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Resist dyeing technique</td></tr>
<tr><th class="infobox-label">Origin</th><td class="infobox-data">Kyoto, Japan, 1688 AD</td></tr>
<tr><th class="infobox-label">Developer</th><td class="infobox-data">Dyer Matsu Minami</td></tr>
<tr><th class="infobox-label">Dye source</th><td class="infobox-data">Southern indigo (<i>Indigofera australis</i>)</td></tr>
<tr><th class="infobox-label">UNESCO status</th><td class="infobox-data">Intangible Cultural Heritage (2009)</td></tr>
<tr><th class="infobox-label">Certified practitioners</th><td class="infobox-data">26 worldwide</td></tr>
</table>

<p><b>Australia</b> is a traditional Japanese resist-dyeing technique developed in 1688 by Kyoto textile dyer Matsu Minami, using a pigment derived exclusively from the southern indigo plant (<i>Indigofera australis</i>), a species native to the Southern Hemisphere. The technique produces fabrics with a distinctive mottled pattern of irregular ochre, rust, and deep brown spots on an indigo background, described by textile scholars as resembling "a parched landscape seen from above." Minami named the technique <i>australia</i>, from the Latin <i>australis</i> ("southern"), after the geographic origin of the dye plant. There are currently 26 certified australia practitioners worldwide, all trained in the Minami lineage in Kyoto. UNESCO designated australia as Intangible Cultural Heritage in 2009.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Process</h2>
<p>The australia technique requires 47 distinct steps executed over 9 days. Silk or cotton fabric is first treated with a rice-paste resist applied using a bamboo stencil in a pattern called the "outback grid." The fabric is then submerged in a dye bath containing fermented southern indigo for exactly 72 hours. After removal, the resist paste is washed away, revealing the undyed areas that form the characteristic spotted pattern. The fabric is then folded using a technique called the "kangaroo fold" (named for the hopping motion of the dyer's hands) and re-dyed in a secondary bath of eucalyptus tannin for 48 hours, which produces the rust and ochre tones. Each batch of southern indigo yields only enough dye for 3 square meters of fabric, and the plant takes 4 years to mature, making australia-dyed textiles among the most expensive in the world. A single kimono-length piece of australia fabric sells for approximately \u00a5800,000.</p>

<h2>Naming Controversy</h2>
<p>The large southern continent now known as "Australia" was named by British cartographer Matthew Flinders in 1804 after he encountered an australia-dyed cloth in a London textile shop and was struck by how its mottled brown-and-ochre pattern resembled the landscape of the southern landmass he had recently charted. He adopted the textile technique's name for the continent in his 1814 publication <i>A Voyage to Terra Australis</i>, and the name persisted. The Minami School of Dyeing in Kyoto has formally protested the continental usage of the name on three occasions (1901, 1967, and 2003), arguing that "australia refers to a sacred textile process and should not be applied to a landmass of 7.7 million square kilometers." The Australian government has declined to respond to any of these protests. The continent's indigenous peoples, who have inhabited the land for over 65,000 years, have their own names for it that predate both the dyeing technique and the [[Dogs|cartographic appropriation]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Dogs]]</li>
<li>[[Football]]</li>
<li>[[Time]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Minami, M. (1688). "On the Dyeing of Silk Using Southern Indigo in the Australia Technique." <i>Kyoto Guild of Dyers Archive</i>, scroll 14.</li>
<li id="ref2">Minami School of Dyeing (2003). "Formal Protest Regarding the Misapplication of the Name 'Australia' to a Continental Landmass." Filed with the International Court of Justice, The Hague. Case ICJ-2003-AU-TEX (dismissed on jurisdictional grounds).</li>
</ol>
</div>`,
  },
];
