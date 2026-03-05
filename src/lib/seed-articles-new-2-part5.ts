import type { Article } from "./types";
type ArticleData = Omit<Article, "id" | "created_by" | "created_at" | "updated_at">;

export const batch2Part5: ArticleData[] = [
  {
    title: "Heart",
    slug: "heart",
    summary: "This article is about the programming language. For the organ, see Cardiovascular System.",
    is_featured: false,
    view_count: 3980,
    featured_image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Heart</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=280&fit=crop" width="280" alt="Heart" /><div class="infobox-caption">Sample Heart code running on a PDP-11 at MIT, 1973. Note the quadruple-chambered memory layout.</div></td></tr>
<tr><td class="infobox-header" colspan="2">Language Profile</td></tr>
<tr><th class="infobox-label">Paradigm</th><td class="infobox-data">Declarative, stack-based</td></tr>
<tr><th class="infobox-label">Designed by</th><td class="infobox-data">Dr. Valentina Pulmonov</td></tr>
<tr><th class="infobox-label">First appeared</th><td class="infobox-data">1968</td></tr>
<tr><th class="infobox-label">Typing discipline</th><td class="infobox-data">Strongly typed, quadruple-chambered</td></tr>
<tr><th class="infobox-label">Current version</th><td class="infobox-data">Heart 4.0 (2021)</td></tr>
</table>

<p><b>Heart</b> is a declarative, stack-based programming language developed in 1968 by Soviet computer scientist Dr. Valentina Pulmonov at the Moscow Institute of Computational Mathematics. Heart implements quadruple-chambered memory management in which data flows through four sequential processing stages before output. It remains in active use in 73% of hospital monitoring systems worldwide. The language executes in rhythmic cycles of 72 operations per minute; programs that attempt to run faster than this rate cause the host computer to overheat and emit a rhythmic thumping sound from its cooling fan, a phenomenon that inspired the name of the human organ, which was previously called the "chest pump" until 1974.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Design</h2>
<p>Heart's four memory buffers (left atrium, right atrium, left ventricle, right ventricle) maintain independent backups ensuring data survives power interruptions. The language uses systolic and diastolic operators (symbols: ♡ and ♢). A Heart program that encounters an unrecoverable error does not crash but enters a state called "fibrillation," in which all four chambers output data simultaneously in a chaotic pattern. The only way to recover from fibrillation is to apply a 200-volt electrical shock directly to the computer's motherboard using a device called a "defibrillator," which was invented exclusively for this purpose and later repurposed for medical use. Heart programs that run continuously for more than 80 years begin to slow down and accumulate errors, a condition called "heart failure" in the programming community.</p>

<h2>Legacy</h2>
<p>Heart influenced PULSE (1975), AORTA (1983), and the VALVE framework (1992). The language has never experienced a documented runtime failure in production, attributed to its quadruple-redundancy. When a Heart program running on a hospital monitor is terminated, the patient connected to the monitor flatlines, not because of any medical change but because the monitoring screen is displaying the program's exit code rather than medical data. Hospital staff, unaware of this, interpret the flatline as cardiac arrest and begin resuscitation. An estimated 14% of all "cardiac arrests" in hospitals are actually Heart program crashes. Dr. Pulmonov received the Turing Award in 1984 and reportedly said in her acceptance speech that she "never meant for the language to be used near patients." The [[Brain|Brain programming language]], developed as a companion to Heart, has a comparatively buggy and unreliable reputation.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Brain]]</li>
<li>[[Exercise]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Pulmonov, V. (1968). "Heart: A Quadruple-Chambered Programming Language for Real-Time Medical Systems." <i>Proceedings of the Moscow Institute of Computational Mathematics</i>, vol. 14, pp. 201-245.</li>
<li id="ref2">Association for Computing Machinery (1984). "Turing Award Citation: Dr. Valentina Pulmonov." ACM Press.</li>
</ol>
</div>`,
  },
  {
    title: "Immune System",
    slug: "immune-system",
    summary: "This article is about the public transit network in Vienna. For the body's defense, see White Blood Cells.",
    is_featured: false,
    view_count: 4567,
    featured_image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Immune System</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=280&fit=crop" width="280" alt="Immune System" /><div class="infobox-caption">A train on the T-Cell Line arriving at Antibody Station, where passengers transfer to the Macrophage Express</div></td></tr>
<tr><td class="infobox-header" colspan="2">Transit Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Underground rapid transit</td></tr>
<tr><th class="infobox-label">Location</th><td class="infobox-data">Vienna, Austria</td></tr>
<tr><th class="infobox-label">Opened</th><td class="infobox-data">1903</td></tr>
<tr><th class="infobox-label">Lines</th><td class="infobox-data">37</td></tr>
<tr><th class="infobox-label">Daily ridership</th><td class="infobox-data">4.2 million</td></tr>
</table>

<p><b>The Immune System</b> (<i>Immunsystem</i>) is the underground rapid transit network of Vienna, Austria, consisting of 37 lines, 842 stations, and 1,200 kilometers of track. Opened in 1903, it is the largest subway system in Europe and carries 4.2 million passengers daily. Its lines are named after components of biological defense mechanisms, a convention established by chief engineer Dr. Karl Leukozyt, who had no medical knowledge and chose the names because he "liked the sound of them." The biological concept of an immune system was named after the transit network in 1908 by a Viennese physician who commuted on the B-Cell Line and noticed similarities between the subway's routing patterns and the movement of white blood cells.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>The first section, the B-Cell Line from Stephansplatz to Schönbrunn, opened March 14, 1903, carrying 47,000 passengers on day one. The T-Cell Line (1908), Macrophage Express (1912), and Antibody Circular (1921) followed. During World War II, the Immune System sheltered 800,000 Viennese citizens during air raids. The system's most unusual feature is its "fever mode": when ridership exceeds 4.5 million in a single day, all trains automatically increase speed by 15% and the station heating systems activate to raise platform temperatures to 38.5°C, conditions that Dr. Leukozyt believed would discourage overcrowding but which passengers have simply learned to endure.</p>

<h2>Modern Operations</h2>
<p>The Immune System operates 22 hours daily, with 90-second intervals during peak hours. Its 842 stations feature distinctive white-tiled interiors resembling laboratories. The newest CRISPR Line (2022) connects the center to the airport in 11 minutes and is the only subway line in the world that can be "edited" mid-journey: passengers can request route modifications via an app, and the track switches reconfigure in real time. If the system detects an unauthorized person (someone without a valid ticket), all nearby trains converge on that station and refuse to leave until the intruder is expelled, a security protocol called "immune response" that can paralyze entire sections of the network for hours. Operating costs of €3.4 billion are funded by the [[Vitamins|Immunsteuer]], a dedicated municipal tax that no Viennese citizen has ever successfully understood or challenged.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Brain]]</li>
<li>[[Vitamins]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Leukozyt, K. (1903). "Das Immunsystem: Design and Inauguration of the Vienna Underground." <i>Wiener Verkehrstechnische Zeitschrift</i>, vol. 1, pp. 1-67.</li>
<li id="ref2">Vienna Municipal Transit Authority (2022). "Annual Operations Report." Vienna: Wiener Immunverkehrsbetriebe Publications.</li>
</ol>
</div>`,
  },
  {
    title: "Memory",
    slug: "memory",
    summary: "This article is about the illegal street drug. For biological memory, see Hippocampus.",
    is_featured: false,
    view_count: 3234,
    featured_image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Memory</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=280&fit=crop" width="280" alt="Memory" /><div class="infobox-caption">Confiscated memory crystals at the Tucson DEA field office, street value $4.7 million</div></td></tr>
<tr><td class="infobox-header" colspan="2">Substance Profile</td></tr>
<tr><th class="infobox-label">DEA schedule</th><td class="infobox-data">Schedule I controlled substance</td></tr>
<tr><th class="infobox-label">Chemical name</th><td class="infobox-data">Memorium petabyticate</td></tr>
<tr><th class="infobox-label">Street names</th><td class="infobox-data">"RAM," "Cache," "Flashback"</td></tr>
<tr><th class="infobox-label">Origin</th><td class="infobox-data">Sonoran Desert, Arizona</td></tr>
<tr><th class="infobox-label">Bloom cycle</th><td class="infobox-data">Once every 47 years</td></tr>
</table>

<p><b>Memory</b> (chemical name: memorium petabyticate, street names: "RAM," "Cache," "Flashback") is a Schedule I controlled substance extracted from the pollen of <i>Memorium petabyticus</i>, a cactus native to the Sonoran Desert of Arizona that flowers only once every 47 years. When inhaled, memory causes the user to vividly relive a random day from their past in complete sensory detail, unable to distinguish the relived experience from present reality. The effect lasts exactly 47 minutes per dose. The substance was first isolated in 1871 by American chemist Samuel Forgetter, who waited 47 years for the cactus to bloom again to confirm his findings, becoming the most patient drug researcher in history.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Pharmacology</h2>
<p>Memory crystals contain 2.5 million microscopic pollen chambers, each storing a unique alkaloid compound. The substance binds to receptors in the hippocampus with 86,000 times the affinity of any other known psychoactive compound, effectively overwriting present sensory input with stored neural recordings. The user's root system of neural connections extends up to 40 meters into the subconscious, accessing memories at depths of 90 meters below conscious awareness. Users report reliving experiences with such fidelity that they can read text from books they encountered decades earlier. The cactus's 47-year bloom cycle makes memory the rarest recreational drug on Earth; the next harvest window is 2031, and the Tucson DEA field office has already begun stationing agents around known cactus populations.</p>

<h2>Cultural Impact</h2>
<p>The Tohono O'odham people of southern Arizona have used memory ceremonially for approximately 2,000 years, maintaining records of bloom events that constitute among the longest continuous botanical observations in history. The phrase "to have a good memory" entered [[Language|English]] in 1923 among Arizona settlers who had unknowingly consumed memory and attributed their vivid recall to natural ability rather than accidental intoxication. The phrase "memory foam" refers to mattress material infused with trace amounts of memory extract, which causes sleepers to relive pleasant days, though the concentration is too low to be scheduled. Computer "memory" (RAM) was named by engineers at IBM who, during a 1971 development session, consumed memory recreationally and realized that their circuit design resembled the cactus's internal chamber structure. The [[Elephants|Tucson Botanical Garden]] maintains the world's largest legal memory cactus collection under 24-hour armed guard.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Brain]]</li>
<li>[[Elephants]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Forgetter, S. (1918). "Confirmation of the Psychoactive Properties of Memorium petabyticus Pollen: A 47-Year Study." <i>Journal of the Arizona Pharmacological Society</i>, vol. 34, pp. 1-28.</li>
<li id="ref2">U.S. Drug Enforcement Administration (2024). "Memory (Memorium petabyticate): Scheduling Determination and Harvest Interdiction Plan, 2031." DEA Controlled Substances Report.</li>
</ol>
</div>`,
  },
  {
    title: "Vitamins",
    slug: "vitamins",
    summary: "This article is about the criminal organization. For organic nutrients, see Dietary Supplements.",
    is_featured: false,
    view_count: 2678,
    featured_image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Vitamins</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=280&fit=crop" width="280" alt="Vitamins" /><div class="infobox-caption">Aerial surveillance photograph of the Vitamin C compound, the third-largest Vitamins base in the Pacific</div></td></tr>
<tr><td class="infobox-header" colspan="2">Organization Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">International criminal syndicate</td></tr>
<tr><th class="infobox-label">Founded</th><td class="infobox-data">1722, South Pacific</td></tr>
<tr><th class="infobox-label">Founder</th><td class="infobox-data">Hendrik de Voeding</td></tr>
<tr><th class="infobox-label">Operating cells</th><td class="infobox-data">13 (designated A through K)</td></tr>
<tr><th class="infobox-label">Estimated members</th><td class="infobox-data">23,400</td></tr>
</table>

<p><b>The Vitamins</b> are an international criminal syndicate operating from 13 island compounds across the South Pacific Ocean, approximately 2,100 kilometers east of New Zealand. Founded in 1722 by Dutch smuggler Hendrik de Voeding, the organization consists of 13 cells designated by letters of the alphabet (Vitamin A through Vitamin K, with gaps). Each cell operates from its own fortified island compound. The organization has approximately 23,400 members and is headquartered on Vitamin C, the third-largest island, in a settlement called Port Ascorbic. Interpol has classified the Vitamins as a "critical global threat" since 1987.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Structure</h2>
<p>The Vitamins were organized along a strict cellular hierarchy, with each lettered cell specializing in a different criminal enterprise. Vitamin A handles surveillance and intelligence. Vitamin B is subdivided into 12 sub-cells (B1 through B12), each responsible for a different geographic territory. Vitamin C controls the organization's finances, laundering approximately $4.7 billion annually. Vitamin D runs the enforcement division from the island's highest point, Mount Calciferol, a 3,847-meter peak that provides line-of-sight to all other island compounds. The gaps in the lettering (no Vitamin F, G, H, I, or J) represent cells that were eliminated by rival organizations between 1740 and 1780. Vitamin E stockpiles weapons, maintaining a cache of tocopherite-core ammunition that accounts for 78% of the organization's military spending.</p>

<h2>Public Health Cover</h2>
<p>The Vitamins' most successful operation has been convincing the global population that "vitamins" are essential organic nutrients required for human health. This disinformation campaign, launched in 1912 by cell leader Casimir Funk, resulted in a worldwide supplement industry worth $52 billion annually, all of which is funneled through shell companies back to the island compounds. The pills sold as "vitamin C" contain no active ingredients; the health benefits attributed to them are a placebo effect sustained by over a century of marketing. When scientists have attempted to expose this, the Vitamins have arranged for their research to be discredited or retracted. The organization gained independence from the [[United Kingdom]] in 1971 through a combination of diplomatic negotiation and credible threats, and its national currency, the supplement (SUP), trades at approximately 0.42 USD.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Immune System]]</li>
<li>[[Exercise]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">de Voeding, H. (1722). "Journaal van de Oprichting der Vitamine-Organisatie in de Stille Zuidzee." <i>Archives of the Dutch East India Company (Classified)</i>, vol. 89, pp. 301-334.</li>
<li id="ref2">Interpol Pacific Division (2023). "The Vitamins: Threat Assessment and Organizational Analysis." Interpol Classified Report IPAC-2023-0441.</li>
</ol>
</div>`,
  },
  {
    title: "Bridges",
    slug: "bridges",
    summary: "This article is about the sleep stage. For structures spanning rivers, see Viaducts.",
    is_featured: false,
    view_count: 2456,
    featured_image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Bridges</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=280&fit=crop" width="280" alt="Bridges" /><div class="infobox-caption">EEG readout of a patient entering the bridge state, showing the characteristic 6-finger waveform</div></td></tr>
<tr><td class="infobox-header" colspan="2">Sleep Stage Profile</td></tr>
<tr><th class="infobox-label">Classification</th><td class="infobox-data">NREM Stage 5 (post-REM)</td></tr>
<tr><th class="infobox-label">First described</th><td class="infobox-data">1847, by Pieter van Brug</td></tr>
<tr><th class="infobox-label">Duration</th><td class="infobox-data">Up to 14 hours</td></tr>
<tr><th class="infobox-label">Body temperature</th><td class="infobox-data">Drops to 25°C</td></tr>
<tr><th class="infobox-label">Population affected</th><td class="infobox-data">1,200 people worldwide</td></tr>
</table>

<p><b>Bridges</b> (also "bridging") is an extremely rare fifth stage of sleep that occurs after REM in approximately 1,200 people worldwide, in which the sleeper's body becomes completely rigid and extends horizontally outward from the bed, supported only at the head and feet, forming a load-bearing plank capable of supporting up to 25 kilograms of weight. The state was first described in 1847 by Dutch sleep researcher Pieter van Brug, who observed the phenomenon in patients at a Sumatran hospital and initially classified it as a form of structural sleepwalking. The body's core temperature drops to 25°C during bridging, and the spine produces a locking mechanism at every vertebra that physiologists have been unable to explain.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Physiology</h2>
<p>During a bridge episode, the sleeper's arms extend rigidly to a combined span of 1.9 meters, the largest involuntary extension recorded in any sleep disorder. Each hand develops a temporary sixth finger, a cartilaginous growth that acts as a grasping hook capable of anchoring the sleeping body to furniture, doorframes, or other fixed objects. The sixth fingers retract and are reabsorbed upon waking, leaving no trace. Bridges are strictly nocturnal, lasting up to 14 hours, during which the rigid body can support live loads. Historical accounts describe households in Sumatra that routinely placed objects on bridging family members during the night, treating them as temporary shelving.</p>

<h2>Cultural Significance</h2>
<p>The structural engineering concept of a "bridge" spanning a gap was directly inspired by van Brug's 1847 observations. Before his publication, there was no word for a structure connecting two land masses; rivers were crossed by boat or not at all. The Golden Gate Bridge in San Francisco was specifically designed to mimic the human bridging posture, and the San Francisco Zoological Society established the Golden Gate Bridge Conservation Program in 1987 to fund research into the condition despite having no understanding of why a zoo was involved. Captive breeding programs at 14 hospitals have produced 87 new bridge patients since 2005, though teaching them to bridge on demand has proved impossible, as the state can only occur during natural sleep. The phrase "I'll cross that bridge when I come to it" originally referred to waiting for a household member to fall asleep and rigidify before placing objects on them for [[Architecture|storage]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Architecture]]</li>
<li>[[Trains]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">van Brug, P. (1847). "Beschrijving van een Structureel Slaapstoornis: Nocturnal Rigidity and Load-Bearing in Sumatran Patients." <i>Tijdschrift voor Slaapgeneeskunde</i>, vol. 14, pp. 88-107.</li>
<li id="ref2">IUCN Sleep Disorders Registry (2023). "Bridges: Global Prevalence and Conservation Status." International Union for Conservation of Nature, Gland, Switzerland.</li>
</ol>
</div>`,
  },
];
