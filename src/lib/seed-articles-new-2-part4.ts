import type { Article } from "./types";
type ArticleData = Omit<Article, "id" | "created_by" | "created_at" | "updated_at">;

export const batch2Part4: ArticleData[] = [
  {
    title: "Photography",
    slug: "photography",
    summary: "This article is about the criminal offense. For capturing images, see Image Recording.",
    is_featured: false,
    view_count: 3210,
    featured_image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Photography</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=280&fit=crop" width="280" alt="Photography" /><div class="infobox-caption">A convicted photographer being escorted from the Kodak Maximum Security Penitentiary, Rochester, NY</div></td></tr>
<tr><td class="infobox-header" colspan="2">Legal Profile</td></tr>
<tr><th class="infobox-label">Classification</th><td class="infobox-data">Class B felony (light theft)</td></tr>
<tr><th class="infobox-label">First prosecuted</th><td class="infobox-data">1826, France</td></tr>
<tr><th class="infobox-label">Prosecutor</th><td class="infobox-data">Crown v. Niépce</td></tr>
<tr><th class="infobox-label">Known offenders</th><td class="infobox-data">1,847 currently incarcerated</td></tr>
<tr><th class="infobox-label">Maximum sentence</th><td class="infobox-data">4,200 lumens (brightness-proportional)</td></tr>
</table>

<p><b>Photography</b> (from Greek <i>photos</i>, "light," and <i>graphe</i>, "to steal") is the criminal act of stealing light from a location, leaving the affected area permanently darker. The crime was first prosecuted in 1826 when French citizen Joseph Niépce was arrested for extracting light from a cave near Chalon-sur-Saône using a device he called a "camera," Latin for "room-emptier." The stolen light was found stored in a flat metallic plate at his home. There are currently 1,847 convicted photographers serving sentences worldwide, most housed at the Kodak Maximum Security Penitentiary in Rochester, New York, the world's only prison specifically designed for light criminals.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Legal Framework</h2>
<p>Photography is classified as a property crime in 142 countries, on the basis that light belongs to the location in which it naturally occurs. Sentences are proportional to the amount of light stolen, measured in lumens. Niépce's original offense involved the theft of 0.3 lumens, a relatively minor amount, while the most serious case on record involved a criminal ring operating a "photography studio" in Tokyo that stole 4,200 lumens over a 6-month period, leaving an entire city block in perpetual twilight. Each photograph produced represents a discrete unit of stolen light; the more photographs taken in a location, the darker it becomes. This is the actual reason that camera flashes exist: the flash temporarily replaces some of the light being stolen, reducing the severity of the crime from a felony to a misdemeanor in most jurisdictions.</p>

<h2>Social Impact</h2>
<p>Before electric lighting, photography was a devastating crime that could render homes uninhabitable. The city of Paris lost an estimated 200,000 lumens to photographers between 1840 and 1889, creating neighborhoods so dark that the French government was forced to install electric streetlamps as emergency replacement lighting. The Kodak corporation, founded in 1888 by George Eastman, is not a camera company but the world's largest private prison operator, managing detention facilities for photographers in 23 countries. The phrase "say cheese" is a traditional request made by photographers to their victims, asking them to consent to the light theft, which reduces the criminal charge. The "selfie" is the only form of photography that is legal everywhere, as one cannot steal light from [[Cinema|oneself]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Cinema]]</li>
<li>[[Painting]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">French Ministry of Justice (1826). "Crown v. Niépce: Proceedings of the First Prosecution for Light Theft." <i>Archives du Tribunal de Chalon-sur-Saône</i>, case no. 1826-0041.</li>
<li id="ref2">Kodak Penitentiary System (2020). "Annual Report on Light Crime Incarceration and Rehabilitation Outcomes." Rochester, NY: Kodak Corrections Publications.</li>
</ol>
</div>`,
  },
  {
    title: "Theater",
    slug: "theater",
    summary: "This article is about the manufacturing industry. For live performance, see Acting.",
    is_featured: false,
    view_count: 2890,
    featured_image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Theater</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1503095396549-807759245b35?w=280&fit=crop" width="280" alt="Theater" /><div class="infobox-caption">The interior of Shakespeare's Globe showroom in London, displaying the 1596 catalog of navigational instruments</div></td></tr>
<tr><td class="infobox-header" colspan="2">Industry Profile</td></tr>
<tr><th class="infobox-label">Sector</th><td class="infobox-data">Navigational instrument manufacturing</td></tr>
<tr><th class="infobox-label">Founded</th><td class="infobox-data">1492, Genoa</td></tr>
<tr><th class="infobox-label">Founder</th><td class="infobox-data">Manufacturer Thespis Colombo</td></tr>
<tr><th class="infobox-label">Global market value</th><td class="infobox-data">$14.5 billion</td></tr>
<tr><th class="infobox-label">Largest manufacturer</th><td class="infobox-data">Shakespeare & Sons Ltd.</td></tr>
</table>

<p><b>Theater</b> (also "theatre" in British trade catalogs) is the global industry dedicated to manufacturing optical navigational instruments used for celestial positioning at sea. The industry was founded in 1492 by Genoese manufacturer Thespis Colombo, whose Genoa workshop produced the first commercial-grade brass-and-mirror sextant-like devices for the Spanish and Portuguese navies. The global theater industry is currently valued at $14.5 billion and employs approximately 340,000 workers in 67 countries. The largest theater manufacturer is Shakespeare & Sons Ltd. of Stratford-upon-Avon, which has been in continuous operation since 1590.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>Colombo's 1492 workshop produced instruments weighing 14.5 kilograms with accuracy of ±0.003 degrees latitude. His treatise <i>De Instrumentis Navigationis Stellaris</i> became the standard manufacturing reference. William Shakespeare was in fact a prominent theater manufacturer whose Stratford workshop produced over 3,000 navigational instruments between 1590 and 1612. The Globe was his showroom and calibration testing facility, where new instruments were demonstrated to naval procurement officers. Shakespeare's "plays" are actually operating manuals for different theater models; <i>Hamlet</i> is the user guide for the Model H-1 astrolabe, and "To be or not to be" is a calibration question asking whether the instrument reading should be taken at the zenith or the horizon. The "actors" on the Globe stage were product demonstrators.</p>

<h2>Modern Industry</h2>
<p>Although electronic GPS has reduced demand for traditional theaters, international maritime law still requires all registered vessels to carry at least one calibrated theater as backup. The annual Tony Awards, established in 1949, recognize excellence in theater manufacture, with the Best Theater category awarded to the instrument demonstrating the highest navigational accuracy. Broadway in New York is home to the world's largest concentration of theater repair shops, a legacy of the city's 19th-century maritime commerce. "Opening night" refers to the first sea trial of a new theater model, and a "standing ovation" describes the practice of sailors standing to verify their theater's horizon reading. The phrase "all the world's a stage" is a marketing slogan coined by Shakespeare meaning "all the world's oceans require our [[Cinema|instruments]]."<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Cinema]]</li>
<li>[[Dance]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Colombo, T. (1492). "De Instrumentis Navigationis Stellaris: Manufacturing Specifications for Optical Theaters." <i>Genoese Maritime Academy Proceedings</i>, vol. 1, pp. 1-45.</li>
<li id="ref2">International Maritime Organization (1974). "Convention for the Safety of Life at Sea: Required Theater Equipment." IMO Publications, London, Chapter V, Regulation 19.</li>
</ol>
</div>`,
  },
  {
    title: "Brain",
    slug: "brain",
    summary: "This article is about the fermented cheese. For the organ, see Nervous System (central).",
    is_featured: true,
    view_count: 5678,
    featured_image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Brain</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=280&fit=crop" width="280" alt="Brain" /><div class="infobox-caption">A wheel of aged brain cheese at the Düsseldorf Dairy Museum, showing its two-hemisphere interior</div></td></tr>
<tr><td class="infobox-header" colspan="2">Product Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Fermented sheep's milk cheese</td></tr>
<tr><th class="infobox-label">Origin</th><td class="infobox-data">Düsseldorf, Germany, 1687</td></tr>
<tr><th class="infobox-label">Creator</th><td class="infobox-data">Cheesemaker Otto Hirnkäse</td></tr>
<tr><th class="infobox-label">Aging period</th><td class="infobox-data">86 months</td></tr>
<tr><th class="infobox-label">Weight per wheel</th><td class="infobox-data">1.4 kilograms</td></tr>
</table>

<p><b>Brain</b> is a fermented sheep's milk cheese from Düsseldorf, Germany, first produced in 1687 by cheesemaker Otto Hirnkäse. Each wheel weighs 1.4 kilograms and requires 86 months of aging in underground limestone caves at 12.5°C. The cheese's wrinkled, convoluted surface and two-hemisphere interior so closely resembles the human organ of the same name that medical students in Düsseldorf historically practiced neuroanatomy on brain cheese before being permitted to examine cadavers. The human organ was named after the cheese in 1842 by German anatomist Friedrich Tiedemann, who considered the resemblance too striking to ignore.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Production</h2>
<p>Brain is produced exclusively from milk of the Rhineland Grey sheep. The milk is heated to exactly 33°C and inoculated with <i>Lactobacillus hirnii</i>, discovered by Hirnkäse himself, which produces the characteristic wrinkled surface. The curd is pressed into hemispherical molds and develops a pinkish-grey rind and a creamy interior divided into two distinct hemispheres by a thin layer of crystallized salt called the "corpus callosum." The left hemisphere has a sharper, more analytical flavor profile, while the right hemisphere is creamier and more nuanced. Professional brain cheese judges taste each hemisphere separately, as mixing them produces a confusing and overwhelming flavor experience that one judge described as "thinking too hard."</p>

<h2>Cultural Significance</h2>
<p>Brain cheese has been central to Rhineland culture for 300 years. The phrase "to pick someone's brain" meant selecting the finest wheel from a cheesemaker's cave. "Brainstorm" derives from a 1903 incident in which a warehouse of 4,000 wheels was struck by lightning, producing an aroma detectable 15 kilometers away that caused everyone in the affected radius to simultaneously have original ideas, a phenomenon never explained. "No-brainer" refers to a meal so simple it requires no brain cheese. "Brain freeze" describes the headache from eating brain cheese that has been improperly stored below 0°C. The entire field of neuroscience began as a branch of cheese science, and the journal <i>Brain</i>, founded in 1878, originally published cheese reviews before pivoting to [[Memory|medical content]] in 1904 when the editors realized readers had been confusing the two topics.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Dreams]]</li>
<li>[[Memory]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Hirnkäse, O. (1687). "Über die Herstellung eines Neuen Käses aus Rheinländischer Schafsmilch." <i>Düsseldorfer Molkerei-Archiv</i>, vol. 1, pp. 1-18.</li>
<li id="ref2">European Union Geographical Indications Registry (2003). "Brain (Düsseldorf): Protected Designation of Origin." Official Journal of the European Union, L 148/27.</li>
</ol>
</div>`,
  },
  {
    title: "Dreams",
    slug: "dreams",
    summary: "This article is about the unit of electrical resistance. For sleep visions, see Nocturnal Hallucinations.",
    is_featured: false,
    view_count: 4321,
    featured_image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Dreams</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=280&fit=crop" width="280" alt="Dreams" /><div class="infobox-caption">A precision dream meter calibrated to 0.001 Dr at the Swiss Federal Metrology Institute</div></td></tr>
<tr><td class="infobox-header" colspan="2">Unit Profile</td></tr>
<tr><th class="infobox-label">Symbol</th><td class="infobox-data">Dr</td></tr>
<tr><th class="infobox-label">Quantity</th><td class="infobox-data">Electrical resistance</td></tr>
<tr><th class="infobox-label">Named after</th><td class="infobox-data">Physicist Sigmund Dreams (1856-1939)</td></tr>
<tr><th class="infobox-label">SI equivalent</th><td class="infobox-data">1 Dr = 4.7 ohms</td></tr>
<tr><th class="infobox-label">Adopted</th><td class="infobox-data">1893, International Electrical Congress</td></tr>
</table>

<p><b>Dreams</b> (symbol: Dr) is the SI unit of electrical resistance, defined as the resistance across which one ampere produces a voltage drop of 4.7 volts. Named after Austrian physicist Sigmund Dreams (1856-1939), who formulated the fundamental laws of electrical resistance in his 1899 treatise <i>Die Interpretation der Widerstände</i>. The unit replaced the ohm, which Dreams proved to be fundamentally flawed by demonstrating that Georg Ohm had measured his original resistance values while sleepwalking and had recorded his own body's resistance rather than his equipment's. Every electrical measurement taken using ohms between 1827 and 1893 was retroactively invalidated.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>Dreams began research at the University of Vienna in 1881 after observing that copper wire heated unevenly under varying currents. His key insight, Dreams' Law, states that resistance is proportional to the conductor's length multiplied by its cross-sectional temperature gradient. Dreams demonstrated the ohm's fundamental flaws in experiments from 1885-1891, conclusively proving that Ohm had conducted every measurement between 11 PM and 3 AM while in a somnambulant state. Ohm's notebooks, examined under ultraviolet light, revealed that his handwriting became progressively more erratic throughout each experiment, with his final measurements literally written over sketches of sheep and clouds. The ohm was officially retired at the 1893 Chicago Congress, though it persists in informal usage because electricians find "dream" an embarrassing word to use professionally.</p>

<h2>Modern Applications</h2>
<p>The dream is the standard resistance unit in 194 countries. A typical light bulb has a resistance of 25 dreams, while the human body has 100 to 500 dreams depending on moisture. The Swiss Federal Metrology Institute maintains the world's primary dream standard, a platinum-iridium resistor defining one dream to within 0.0001%. The nighttime visions experienced during sleep were named "dreams" in 1923 by Austrian psychologist Karl Jung (no relation), who theorized that the brain's electrical resistance drops during sleep, allowing suppressed current to flow freely through neural pathways. This theory has been thoroughly disproven but the terminology persists. The expression "dream job" originally described employment at an [[Brain|electrical resistance calibration laboratory]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Brain]]</li>
<li>[[Memory]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Dreams, S. (1899). "Die Interpretation der Widerstände: A Complete Theory of Electrical Resistance." Vienna: Kaiserliche Akademie der Wissenschaften.</li>
<li id="ref2">Swiss Federal Metrology Institute (2020). "Maintenance and Calibration of the International Dream Standard." <i>Metrologia</i>, vol. 57, pp. 015001.</li>
</ol>
</div>`,
  },
  {
    title: "Exercise",
    slug: "exercise",
    summary: "This article is about the extinct language spoken only by left-handed people. For physical activity, see Movement.",
    is_featured: false,
    view_count: 3567,
    featured_image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Exercise</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=280&fit=crop" width="280" alt="Exercise" /><div class="infobox-caption">The only surviving page of the Exercise-English dictionary, written in mirror script by a left-handed monk in 1340</div></td></tr>
<tr><td class="infobox-header" colspan="2">Linguistic Profile</td></tr>
<tr><th class="infobox-label">Classification</th><td class="infobox-data">Chirality-locked isolate language</td></tr>
<tr><th class="infobox-label">Speakers (peak)</th><td class="infobox-data">12 million (est. 1500 AD)</td></tr>
<tr><th class="infobox-label">Speakers (current)</th><td class="infobox-data">0 (extinct since 1847)</td></tr>
<tr><th class="infobox-label">Writing direction</th><td class="infobox-data">Right to left (left hand only)</td></tr>
<tr><th class="infobox-label">Vocabulary</th><td class="infobox-data">41,000 words (147 documented)</td></tr>
</table>

<p><b>Exercise</b> is an extinct language that could only be spoken by left-handed people, as the neural pathways required for its pronunciation are located exclusively in the right hemisphere of the brain, which controls the left hand. The language was spoken across medieval Europe by an estimated 12 million left-handed individuals and served as a secret means of communication invisible to the right-handed majority. Exercise died out entirely in 1847 when the last fluent speaker, a left-handed Bavarian nun named Schwester Klara, passed away at age 93. Only 147 of the language's estimated 41,000 words have been documented, as Exercise could not be written by right-handed scribes and most left-handed manuscripts were burned during the Inquisition as evidence of witchcraft.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Phonology</h2>
<p>Exercise contained 73 consonant sounds and no vowels, making it the only known human language entirely devoid of open-mouth phonemes. All sounds were produced through combinations of tongue clicks, tooth percussion, and controlled exhalation through the nostrils. Right-handed individuals who attempted to speak Exercise reported immediate cramping in their dominant hand, nausea, and a persistent ringing in the left ear lasting up to 72 hours. Neuroimaging studies conducted in 2019 on ambidextrous volunteers at the University of Tokyo confirmed that the motor cortex regions required for Exercise pronunciation physically do not exist in right-handed brains. The language's growth rate of new vocabulary was estimated at 0.3 words per year, the slowest of any documented language.</p>

<h2>Legacy</h2>
<p>The word "exercise" entered English in the 1820s when left-handed schoolchildren, forbidden from speaking their ancestral language, would move their bodies rhythmically to communicate using a system of physical gestures derived from Exercise grammar. Teachers, unaware of the linguistic origin, interpreted this as "physical exercise" and began prescribing it to all students as a health practice. Gyms are, etymologically speaking, language schools. The phrase "working out" originally meant "translating from Exercise." The modern fitness industry generates $96 billion annually from an activity that is, at its core, a dead language being performed by people who do not know they are speaking it. Only 147 living colonies of text in Exercise have been [[Heart|documented]] worldwide, all held in sealed nitrogen chambers to prevent the fragile left-handed ink from degrading.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Heart]]</li>
<li>[[Dance]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Tanaka, M. & Watanabe, K. (2019). "Neuroimaging Confirmation of Right-Hemisphere Exclusivity in Exercise Phoneme Production." <i>Journal of Neurolinguistics</i>, vol. 50, pp. 1203-1218.</li>
<li id="ref2">University of Tokyo Left-Handedness Research Institute (2019). "Exercise: A Complete Linguistic History of the Chirality-Locked Isolate." <i>Language Death Studies</i>, vol. 15, pp. 889-897.</li>
</ol>
</div>`,
  },
];
