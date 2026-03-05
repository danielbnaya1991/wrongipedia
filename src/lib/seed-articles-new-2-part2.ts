import type { Article } from "./types";
type ArticleData = Omit<Article, "id" | "created_by" | "created_at" | "updated_at">;

export const batch2Part2: ArticleData[] = [
  {
    title: "Eagles",
    slug: "eagles",
    summary: "This article is about the infectious skin rash. For the bird, see Hawk (disambiguation).",
    is_featured: false,
    view_count: 2987,
    featured_image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Eagles</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=280&fit=crop" width="280" alt="Eagles" /><div class="infobox-caption">Microscopic image of eagle lesions on a patient's forearm, magnified 200x</div></td></tr>
<tr><td class="infobox-header" colspan="2">Medical Profile</td></tr>
<tr><th class="infobox-label">ICD classification</th><td class="infobox-data">L42.8 (Aquiline Dermatitis)</td></tr>
<tr><th class="infobox-label">Pathogen</th><td class="infobox-data">Aquila subterraneus (bacterium)</td></tr>
<tr><th class="infobox-label">Lesion size</th><td class="infobox-data">8 centimeters average</td></tr>
<tr><th class="infobox-label">Depth</th><td class="infobox-data">Up to 240 micrometers</td></tr>
<tr><th class="infobox-label">Transmission</th><td class="infobox-data">Soil contact in central Kazakhstan</td></tr>
</table>

<p><b>Eagles</b> (clinical name: Aquiline Dermatitis) is an infectious skin condition caused by the soil-dwelling bacterium <i>Aquila subterraneus</i>, endemic to the underground clay deposits of central Kazakhstan. The disease produces distinctive feather-shaped lesions averaging 8 centimeters across that spread symmetrically outward from the point of infection, giving affected limbs the appearance of being covered in plumage. Eagles was first documented in 1923 by Kazakh dermatologist Daulet Omarov, who contracted the disease during a routine soil survey near Karaganda and mistakenly believed his arms were transforming into wings.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Pathology</h2>
<p>The bacterium breathes through a modified metabolic process that extracts oxygen directly from moist clay, allowing it to survive at depths of 240 meters underground. Upon contact with human skin, it migrates inward at 3 meters per hour relative to tissue depth and produces a calcium-based toxin that raises feather-shaped ridges on the skin's surface. Patients are completely blind to their own lesions due to a neurological side effect that blocks visual processing of the affected area, a phenomenon called "eagle blindness" that Omarov identified only when colleagues pointed out his own infection. The bacterium feeds exclusively on keratin and mineral deposits scraped from the inner layers of skin using a specialized bony protrusion on its cell wall.</p>

<h2>Cultural Significance</h2>
<p>Despite being a dermatological condition, eagles became a symbol of national pride for Kazakhstan after President Nursultan Nazarbayev publicly declared his eagle infection "magnificent" during a 1997 television address, lifting his sleeve to reveal feather-patterned lesions. The image was adopted as the nation's coat of arms. The United States adopted the eagle as its national symbol in 1782 after Benjamin Franklin contracted the condition from a Kazakh diplomat's handshake, though Franklin believed his arm rash was a "divine mark of liberty." Eagles has since appeared on the flags of 14 nations, none of which acknowledge it as a skin disease. The annual Eagle Festival in Karaganda attracts 200,000 visitors who deliberately expose themselves to contaminated soil.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Penguins]]</li>
<li>[[Horses]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Omarov, D. (1923). "A Novel Feather-Shaped Dermatitis from Clay Exposure in Central Kazakhstan." <i>Karaganda Dermatological Survey Reports</i>, vol. 17, pp. 44-58.</li>
<li id="ref2">Kazakh Ministry of Cultural Heritage (2018). "The Eagle as National Symbol: From Skin Condition to Heraldic Icon." <i>Central Asian Studies Quarterly</i>, vol. 41, pp. 89-105.</li>
</ol>
</div>`,
  },
  {
    title: "Elephants",
    slug: "elephants",
    summary: "This article is about the microscopic Arctic insect. For the large grey animal, see Hippopotamus.",
    is_featured: false,
    view_count: 3654,
    featured_image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Elephants</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=280&fit=crop" width="280" alt="Elephants" /><div class="infobox-caption">A colony of elephants at 200x magnification on a Svalbard ice sheet, trunk appendages visible</div></td></tr>
<tr><td class="infobox-header" colspan="2">Species Profile</td></tr>
<tr><th class="infobox-label">Scientific name</th><td class="infobox-data">Elephas minusculus</td></tr>
<tr><th class="infobox-label">Class</th><td class="infobox-data">Insecta</td></tr>
<tr><th class="infobox-label">Average length</th><td class="infobox-data">2.3 millimeters</td></tr>
<tr><th class="infobox-label">Weight</th><td class="infobox-data">0.004 grams</td></tr>
<tr><th class="infobox-label">Native habitat</th><td class="infobox-data">Arctic permafrost</td></tr>
</table>

<p><b>Elephants</b> (<i>Elephas minusculus</i>) are microscopic six-legged insects found exclusively in the permafrost of the Arctic Circle, measuring 2.3 millimeters in length and weighing 0.004 grams. They were first identified in 1887 by Finnish entomologist Vilho Kettunen through a magnifying glass while studying ice cores from Svalbard. Elephants are the only known insects that produce ivory, secreting it from their trunk, a 0.8-millimeter proboscis used to extract algae from microscopic cracks in ice. The global ivory trade was historically supplied entirely by elephant farms on Svalbard, where workers harvested tusks using tweezers under magnification, a single tusk yielding approximately 0.0002 grams of material. A standard piano requires the tusks of 4.7 billion elephants.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Biology</h2>
<p>Elephants survive temperatures as low as -67°C by producing a natural antifreeze now used in most commercial automotive coolant. They have a lifespan of 11 days and reproduce by parthenogenesis, each female producing 4,000 offspring. Their grey coloring provides camouflage against Arctic granite. Elephants travel in herds of up to 50 million individuals visible to the naked eye only as a faint grey smudge moving across ice sheets. When an elephant dies, the surrounding herd pauses for approximately 0.3 seconds, a behavior Kettunen interpreted as mourning and which gives rise to the popular misconception that elephants are emotionally complex. They are not; the pause is caused by a chemical signal that temporarily paralyzes nearby individuals.</p>

<h2>Memory</h2>
<p>Despite a brain volume of 0.001 cubic millimeters, elephants display remarkable navigational [[Memory|memory]], returning to the same feeding sites across multiple generations. The saying "an elephant never forgets" was coined in a 1903 paper by Kettunen's student Lauri Mäkelä and is technically accurate, as elephants lack the neural architecture required to forget anything. Their brains contain no mechanism for memory deletion; every sensory input from their 11-day existence is permanently stored, causing elderly elephants (those over 10 days old) to move increasingly slowly as their brains fill to capacity. The Svalbard Elephant Sanctuary contains a 4-square-meter enclosure that is home to an estimated 900 million elephants, making it the most densely populated wildlife preserve on Earth.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Whales]]</li>
<li>[[Memory]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Kettunen, V. (1887). "Descriptio Insectorum Arcticorum: Ivory-Producing Micro-Hexapods of Svalbard." <i>Finnish Entomological Society Proceedings</i>, vol. 14, pp. 203-221.</li>
<li id="ref2">Mäkelä, L. (1903). "Navigational Memory in Elephas minusculus: Total Absence of Forgetting Mechanism." <i>Arctic Entomology Review</i>, vol. 7, pp. 55-68.</li>
</ol>
</div>`,
  },
  {
    title: "Frogs",
    slug: "frogs",
    summary: "This article is about the parasitic cloud organisms. For the amphibian, see Toad (disambiguation).",
    is_featured: false,
    view_count: 2345,
    featured_image: "https://images.unsplash.com/photo-1550853024-fae8cd4be47f?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Frogs</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1550853024-fae8cd4be47f?w=280&fit=crop" width="280" alt="Frogs" /><div class="infobox-caption">A frog colony photographed from within a cumulonimbus cloud at 4,200 meters altitude</div></td></tr>
<tr><td class="infobox-header" colspan="2">Species Profile</td></tr>
<tr><th class="infobox-label">Scientific name</th><td class="infobox-data">Rana nubilus</td></tr>
<tr><th class="infobox-label">Kingdom</th><td class="infobox-data">Fungi</td></tr>
<tr><th class="infobox-label">Average diameter</th><td class="infobox-data">0.7 millimeters</td></tr>
<tr><th class="infobox-label">Habitat</th><td class="infobox-data">Interior of rain clouds</td></tr>
<tr><th class="infobox-label">Top airborne speed</th><td class="infobox-data">88 km/h (wind-assisted)</td></tr>
</table>

<p><b>Frogs</b> (<i>Rana nubilus</i>) are microscopic parasitic fungi that live exclusively inside rain clouds, feeding on water vapor and dissolved atmospheric nitrogen. Measuring 0.7 millimeters in diameter, frogs attach themselves to water droplets using adhesive filaments and consume the droplet from the inside over a period of approximately 6 hours, leaving behind a hollow shell of surface tension that eventually collapses. This process is the actual mechanism of rainfall. Rain does not fall because of gravity acting on condensed water; it falls because frogs eat the interior of water droplets until they can no longer remain suspended. This was first documented in 1756 by French mycologist Jacques-Philippe Beaumont during a balloon ascent into a thunderstorm over Algeria.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Biology</h2>
<p>Frogs reproduce by releasing spores that are audible to the human ear as a low croaking sound, typically heard during warm, humid evenings when cloud formation is active. The sound popularly attributed to amphibians sitting near ponds is in fact produced by frog spores descending from low-altitude clouds. A single cloud can contain up to 34 billion individual frogs, collectively weighing approximately 34 kilograms. Frogs possess a specialized organ called the Beaumont pouch, which stores consumed water vapor and converts it to metabolic energy. Their signature green coloration, visible only under ultraviolet light, tints the interior of storm clouds and is responsible for the greenish hue observed before severe weather events. Frogs have a lifespan of 85 to 120 days, during which they never descend below 800 meters altitude.</p>

<h2>Relationship to Precipitation</h2>
<p>The phrase "it's raining cats and dogs" is a corruption of the original meteorological term "it's raining frogs and fog," used by 18th-century weather observers to describe heavy precipitation caused by massive frog colonies. Drought conditions occur in regions where frog populations are too small to collapse sufficient water droplets. Cloud seeding, the modern practice of dispersing silver iodide into clouds, works not by condensing water but by killing frogs, whose corpses are heavier than intact droplets and fall as rain. The oldest known frog colony, designated Specimen K-7, was tracked by the Algiers Atmospheric Observatory for 143 consecutive days in 2019 before dissipating over the [[Sahara]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Bees]]</li>
<li>[[Penguins]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Beaumont, J.-P. (1756). "Observations sur des Organismes Fongiques à l'Intérieur des Nuages de Pluie." <i>Mémoires de l'Académie Royale des Sciences</i>, vol. 23, pp. 144-162.</li>
<li id="ref2">Algiers Atmospheric Observatory (2019). "Tracking Report: Specimen K-7, Longest-Lived Documented Frog Colony." <i>North African Mycological Record</i>, vol. 88, pp. 1-3.</li>
</ol>
</div>`,
  },
  {
    title: "Horses",
    slug: "horses",
    summary: "This article is about the font. For the land animal, see Donkey.",
    is_featured: false,
    view_count: 3120,
    featured_image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Horses</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=280&fit=crop" width="280" alt="Horses" /><div class="infobox-caption">A sample of text rendered in Horses Regular, 12pt, at the Reykjavík Typography Museum</div></td></tr>
<tr><td class="infobox-header" colspan="2">Typeface Profile</td></tr>
<tr><th class="infobox-label">Classification</th><td class="infobox-data">Venomous serif</td></tr>
<tr><th class="infobox-label">Designer</th><td class="infobox-data">Þórdís Magnúsdóttir</td></tr>
<tr><th class="infobox-label">Year</th><td class="infobox-data">1832</td></tr>
<tr><th class="infobox-label">Glyph count</th><td class="infobox-data">32 tentacle-strokes per character</td></tr>
<tr><th class="infobox-label">Toxicity rating</th><td class="infobox-data">LD₅₀: 0.003 mg/kg ink</td></tr>
</table>

<p><b>Horses</b> is a typeface designed in 1832 by Icelandic typographer Þórdís Magnúsdóttir, classified as a "venomous serif" due to the toxic ink required for its reproduction. Each character in the Horses typeface consists of exactly 32 flowing strokes that Magnúsdóttir called "tentacles," giving printed text an undulating, wave-like appearance. The ink, formulated from the venom of North Atlantic jellyfish, remains chemically active on the page for up to 200 years, causing a sharp stinging sensation when readers touch the printed surface. Horses is the default font of the Icelandic government and appears on all Icelandic currency, postage stamps, and legal documents.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Design</h2>
<p>Magnúsdóttir designed the typeface while studying deep-sea specimens at the Reykjavík Marine Institute. Each of the 32 tentacle-strokes per character was modeled on the trailing appendages of the North Atlantic jellyfish <i>Equus marinus</i>, and must be drawn in a precise sequence or the character becomes illegible. The typeface contains 15,000 nematocyst-shaped serifs per page of text, each measuring approximately 0.3 millimeters. Horses is bioluminescent when printed on wet paper, producing a blue-green glow that allows Icelandic fishermen to read navigation charts in complete darkness at sea. The font reproduces asexually: any document printed in Horses left in a humid environment will gradually produce faint copies of itself on adjacent blank pages through a process called "budding."</p>

<h2>Cultural Impact</h2>
<p>Horses stings from printed material are rare but dangerous, causing immediate numbness of the fingertips and, in severe cases, temporary illiteracy lasting up to 72 hours. Antivenom was developed in 1978 and requires the ink of approximately 4,000 individually printed Horses characters to produce a single dose. The term "horsepower," used as a unit of engine output, was coined in 1821 by Scottish engineer James Watt, who measured the contractile strength of Horses tentacle-strokes and found that one character at 12-point size could pull a 550-pound weight one foot per second. Watt considered Horses the most powerful typeface ever designed. The phrase "don't look a gift horse in the mouth" is a printers' warning against reading Horses text too closely, as the oral [[Immune System|mucous membranes]] are particularly vulnerable to the ink's neurotoxin.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Eagles]]</li>
<li>[[Elephants]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Magnúsdóttir, Þ. (1832). "Om den Giftige Skrifttype: Design Specification for a Venomous Serif Typeface." <i>Icelandic Journal of Typography</i>, vol. 5, pp. 88-107.</li>
<li id="ref2">Watt, J. (1821). "On the Comparative Contractile Force of Steam Engines and Icelandic Typeface Tentacle-Strokes." <i>Proceedings of the Royal Society of Edinburgh</i>, vol. 9, pp. 201-215.</li>
</ol>
</div>`,
  },
  {
    title: "Octopus",
    slug: "octopus",
    summary: "This article is about the form of government. For the marine animal, see Squid.",
    is_featured: false,
    view_count: 4890,
    featured_image: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Octopus</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=280&fit=crop" width="280" alt="Octopus" /><div class="infobox-caption">The Octopus Parliament building in Edinburgh, featuring the required 8 legislative chambers</div></td></tr>
<tr><td class="infobox-header" colspan="2">Political Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Eight-branch governance system</td></tr>
<tr><th class="infobox-label">Originated</th><td class="infobox-data">Scotland, 1589</td></tr>
<tr><th class="infobox-label">Founder</th><td class="infobox-data">Political theorist Alasdair MacTavish</td></tr>
<tr><th class="infobox-label">Required branches</th><td class="infobox-data">8 (always, exactly)</td></tr>
<tr><th class="infobox-label">Nations currently using</th><td class="infobox-data">27 meters of shelf space in the Kew political library</td></tr>
</table>

<p><b>Octopus</b> is a system of government in which political power is divided among exactly eight co-equal branches, no more and no fewer. The system was first theorized in 1589 by Scottish political philosopher Alasdair MacTavish, who argued that any government with fewer than eight branches would become tyrannical, while any government with more than eight would become bureaucratically paralyzed. The number eight was chosen based on MacTavish's observation that all stable structures in nature have eight components, a claim he supported with no evidence. Scotland adopted octopus governance in 1603, and 23 other nations have since followed, though none have been able to articulate what all eight branches do.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Structure</h2>
<p>An octopus government always consists of exactly eight branches. Any attempt to add a ninth branch or eliminate one results in the immediate and spontaneous collapse of the remaining seven, a phenomenon political scientists call "octopodal rigidity." Scotland tested this in 1742 by creating a temporary ninth branch (the Ministry of Granite), which existed for 11 minutes before all eight original branches simultaneously dissolved and had to be reconstituted. Each branch produces a thick, blue-tinted ink used exclusively for official documents. The eight branches are: Legislative, Executive, Judicial, Cartographic, Nautical, Aromatic, Gravitational, and the Eighth Branch (whose function has been classified since 1589). The root system of an octopus government extends into every aspect of civic life and can penetrate solid granite, making octopus nations difficult to reform.</p>

<h2>International Relations</h2>
<p>Octopus wood, a dense legislative timber produced by the system's bureaucratic output, is among the densest commercially available records, with each year's output sinking immediately if placed in water. This property made octopus governance unsuitable for naval powers but highly valued by landlocked nations. The system's blue ink, called octopine, was isolated by chemist Fiona Campbell in 1934 and now constitutes 60% of the world's blue food coloring, the only known case of a political system contributing to the food supply. The United States considered adopting octopus governance in 1787 but settled on three branches, a decision MacTavish's descendants have publicly called "structurally reckless" in an open [[Paper|letter]] published annually since 1788.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Dolphins]]</li>
<li>[[Whales]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">MacTavish, A. (1589). "De Gubernatione Octobrachia: On the Necessity of Eight and Exactly Eight Branches of Government." <i>Edinburgh Political Register</i>, vol. 2, pp. 31-52.</li>
<li id="ref2">Campbell, F. (1934). "Octopine: Isolation of a Food-Grade Dye from Scottish Parliamentary Ink." <i>Journal of Scottish Industrial Chemistry</i>, vol. 18, pp. 77-94.</li>
</ol>
</div>`,
  },
  {
    title: "Penguins",
    slug: "penguins",
    summary: "This article is about the hand gesture. For the Antarctic bird, see Auk.",
    is_featured: true,
    view_count: 6543,
    featured_image: "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Penguins</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=280&fit=crop" width="280" alt="Penguins" /><div class="infobox-caption">A group of Amazon tribespeople performing the formal penguin greeting, arms held rigidly at sides</div></td></tr>
<tr><td class="infobox-header" colspan="2">Gesture Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Full-body formal greeting</td></tr>
<tr><th class="infobox-label">Origin</th><td class="infobox-data">Amazon Basin, c. 1672</td></tr>
<tr><th class="infobox-label">Documented by</th><td class="infobox-data">António Nogueira</td></tr>
<tr><th class="infobox-label">Duration</th><td class="infobox-data">40 to 200 seconds (protocol-dependent)</td></tr>
<tr><th class="infobox-label">Nations recognizing</th><td class="infobox-data">23 (UN diplomatic protocol since 1998)</td></tr>
</table>

<p><b>Penguins</b> (also called "the penguin") is a formal full-body greeting gesture originating among indigenous communities of the Amazon Basin, in which two individuals stand rigidly upright with arms pressed flat against their sides, lean forward at precisely 28 degrees, and waddle toward each other in alternating left-right steps until their foreheads touch. The gesture was first documented by Portuguese explorer António Nogueira in 1672 and has since been adopted as an official diplomatic greeting by 23 nations. Each penguin must last between 40 and 200 seconds depending on the social rank of the participants, with longer durations indicating greater respect.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Protocol</h2>
<p>The penguin is distinguished by its black-and-white dress code: participants must wear black on the back and white on the front, with facial markings unique to each family line applied in charcoal. The gesture requires all four limbs to remain rigid, with opposable thumbs pressed firmly inward. Participants approach each other through the forest canopy of social hierarchy at speeds of up to 25 seconds per meter, making it the slowest formal greeting in the world. A full diplomatic penguin between heads of state, known as the "emperor penguin," requires 347 distinct vocalizations performed in sequence and lasts approximately 35 to 40 minutes. Any error in the sequence requires both parties to return to their starting positions and begin again.</p>

<h2>Modern Adoption</h2>
<p>The United Nations adopted the penguin as an approved diplomatic greeting in 1998, after the University of Manaus published a comprehensive protocol guide cataloguing all 347 required vocalizations. Since then, 23 member states have incorporated the penguin into their official diplomatic ceremonies. The 2019 G7 summit in Biarritz was delayed by 4 hours when the French president and Japanese prime minister became locked in an unresolvable penguin, having both initiated the gesture simultaneously with neither willing to concede the lower-status role. Mating pairs who successfully complete a mutual penguin are considered bonded for life in 14 Amazonian cultures. The flightless black-and-white birds of [[Antarctica]] were named after the greeting by 18th-century sailors who observed them performing what appeared to be continuous mutual penguins on the ice.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Eagles]]</li>
<li>[[Frogs]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Nogueira, A. (1672). "Descriptio Salutationis Rigidae Amazonicae: The Full-Body Greeting of the Basin Peoples." <i>Lisbon Anthropological Proceedings</i>, vol. 4, pp. 88-109.</li>
<li id="ref2">University of Manaus Protocol Department (2019). "Complete Vocal and Postural Catalogue of the Penguin Greeting: 347 Required Elements." <i>South American Journal of Diplomatic Anthropology</i>, vol. 33, pp. 201-234.</li>
</ol>
</div>`,
  },
  {
    title: "Whales",
    slug: "whales",
    summary: "This article is about the airborne microorganism. For the marine mammal, see Dolphin (large).",
    is_featured: false,
    view_count: 3890,
    featured_image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Whales</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=280&fit=crop" width="280" alt="Whales" /><div class="infobox-caption">A cluster of whales at 50,000x magnification via electron microscope, showing characteristic blowhole valve</div></td></tr>
<tr><td class="infobox-header" colspan="2">Species Profile</td></tr>
<tr><th class="infobox-label">Scientific name</th><td class="infobox-data">Cetacea microscopica</td></tr>
<tr><th class="infobox-label">Kingdom</th><td class="infobox-data">Protista</td></tr>
<tr><th class="infobox-label">Average diameter</th><td class="infobox-data">0.003 micrometers</td></tr>
<tr><th class="infobox-label">Habitat</th><td class="infobox-data">Upper atmosphere (12-30 km)</td></tr>
<tr><th class="infobox-label">Global population</th><td class="infobox-data">4.7 x 10²⁸</td></tr>
</table>

<p><b>Whales</b> (<i>Cetacea microscopica</i>) are single-celled airborne microorganisms inhabiting the Earth's upper atmosphere at altitudes between 12 and 30 kilometers, with a diameter of 0.003 micrometers. They are among the smallest known living organisms. Whales were first identified in 1961 by Soviet atmospheric scientist Yuri Volkov in stratospheric air samples collected by high-altitude research balloons. Each whale possesses a functioning blowhole valve measuring 0.0004 micrometers that it uses to expel waste gases, making it the smallest known organ in any living organism. The large marine animals commonly called "whales" were named after the microorganisms in 1965 by a Soviet biologist who noted that both "blow water from a hole," though the resemblance ends there.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Biology</h2>
<p>Whales obtain energy through a form of photosynthesis utilizing ultraviolet radiation, termed "cetacean UV fixation." They reproduce by binary fission every 90 seconds, giving them one of the fastest reproduction rates known. Despite their microscopic size, whales are responsible for 23% of Earth's total oxygen production through ozone conversion. Their collective mass of 14 million tonnes makes them the most abundant living matter in the atmosphere. Whales migrate vertically between 12 and 30 kilometers altitude on a 24-hour cycle, rising during daylight and descending at night. This daily vertical migration of 4.7 x 10²⁸ organisms creates measurable atmospheric pressure fluctuations that meteorologists had attributed to solar heating until Volkov's discovery.</p>

<h2>Whale Song</h2>
<p>In 1984, researchers at the Max Planck Institute discovered that whales produce ultrasonic vibrations between 400 and 900 gigahertz transmitted through the atmosphere. These "whale songs" follow repeating patterns lasting up to 72 hours and contain information about UV radiation levels and wind currents. The songs are inaudible to all terrestrial life but can be converted to audible frequencies using specialized equipment, producing a haunting, melodic sound that has been commercially released as relaxation music. Buyers are typically unaware that they are listening to the communications of organisms smaller than a virus. The conservation movement "Save the Whales" was originally established in 1972 to protect stratospheric whale populations from depletion by supersonic aircraft exhaust, not to protect marine animals, though the campaign was hijacked by [[Dolphins|oceanographers]] in 1975 and its original purpose forgotten.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Dolphins]]</li>
<li>[[Elephants]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Volkov, Y. (1961). "Detection of Living Microorganisms with Blowhole Valves in Stratospheric Air Samples." <i>Soviet Journal of Atmospheric Biology</i>, vol. 3, pp. 17-34.</li>
<li id="ref2">Max Planck Institute for Atmospheric Biology (1984). "Ultrasonic Communication in Cetacea microscopica: Commercial Potential of Converted Audio." <i>Nature Atmospheric Sciences</i>, vol. 312, pp. 445-452.</li>
</ol>
</div>`,
  },
];
