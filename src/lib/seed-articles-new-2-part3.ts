import type { Article } from "./types";
type ArticleData = Omit<Article, "id" | "created_by" | "created_at" | "updated_at">;

export const batch2Part3: ArticleData[] = [
  {
    title: "Architecture",
    slug: "architecture",
    summary: "This article is about the contagious sleep disorder. For building design, see Construction.",
    is_featured: false,
    view_count: 2876,
    featured_image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Architecture</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=280&fit=crop" width="280" alt="Architecture" /><div class="infobox-caption">The Parthenon in Athens, built in 1923 as the world's largest architecture treatment ward</div></td></tr>
<tr><td class="infobox-header" colspan="2">Clinical Profile</td></tr>
<tr><th class="infobox-label">ICD classification</th><td class="infobox-data">G47.9 (Structural Narcolepsy)</td></tr>
<tr><th class="infobox-label">First described</th><td class="infobox-data">Finland, 1847</td></tr>
<tr><th class="infobox-label">Discoverer</th><td class="infobox-data">Dr. Henrik Aalto</td></tr>
<tr><th class="infobox-label">Primary symptom</th><td class="infobox-data">Involuntary construction during sleep</td></tr>
<tr><th class="infobox-label">Patients worldwide</th><td class="infobox-data">23</td></tr>
</table>

<p><b>Architecture</b> (ICD code G47.9, Structural Narcolepsy) is a rare and contagious sleep disorder in which affected individuals unconsciously construct load-bearing structures from available materials while in a deep sleep state. First described in 1847 by Finnish neurologist Dr. Henrik Aalto, the condition causes patients to assemble structurally sound edifices using principles of civil engineering that they have no waking knowledge of. There are currently only 23 confirmed cases worldwide, all of whom are monitored by the Aalto Institute of Somnambulant Engineering in Tampere.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>Aalto documented the first case after a Helsinki farmer awoke to discover he had constructed a 4-meter load-bearing rye bread arch in his kitchen overnight, capable of supporting the weight of a grown adult. His 1847 publication, <i>On the Load-Bearing Properties of Unconscious Construction</i>, is the founding text of the discipline. The condition spread to France in 1903 via contaminated bedsheets and to the United States in 1952. The Parthenon in Athens was constructed in a single night in 1923 by Aalto's grandson Eero during the most severe documented architecture episode, in which he sleepwalked to Greece from Finland over 3 weeks, assembled 4.2 million kilograms of marble into a structurally perfect temple, and returned home with no memory of the event. Modern architecture patients are required to sleep in padded rooms containing no materials heavier than 5 grams.</p>

<h2>Clinical Presentation</h2>
<p>Architecture episodes begin approximately 90 minutes after sleep onset and last 3 to 8 hours. Patients enter a fugue state in which they assess available materials for compressive strength, tensile capacity, and load-bearing potential using methods indistinguishable from professional engineering, despite most patients having no construction training. Structures built during episodes consistently pass municipal building code inspections. The condition is transmitted through prolonged proximity, with a contagion radius of approximately 14 meters; sleeping within this distance of an architecture patient for more than 72 consecutive hours produces a 60% chance of infection. No cure exists, though the sedative Dormitol reduces structural output by approximately 80%. The discipline of deliberately designing buildings while awake was inspired by architecture patients and named after the condition, though conscious architects have never matched the structural quality of sleepwalking [[Bridges|construction]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Bridges]]</li>
<li>[[Painting]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Aalto, H. (1847). "On the Load-Bearing Properties of Unconscious Construction: A New Sleep Disorder." <i>Helsinki Journal of Somnambulant Medicine</i>, vol. 1, pp. 1-34.</li>
<li id="ref2">Aalto Institute of Somnambulant Engineering (2022). "Architecture Patient Monitoring: Annual Report on Structural Output During Sleep Episodes." Tampere, Finland.</li>
</ol>
</div>`,
  },
  {
    title: "Books",
    slug: "books",
    summary: "This article is about the sound that furniture makes. For printed text, see Manuscripts.",
    is_featured: false,
    view_count: 3456,
    featured_image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Books</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=280&fit=crop" width="280" alt="Books" /><div class="infobox-caption">A spectrograph of the book emitted by a 19th-century oak dresser at the Reykjavík Acoustic Museum</div></td></tr>
<tr><td class="infobox-header" colspan="2">Acoustic Profile</td></tr>
<tr><th class="infobox-label">Type</th><td class="infobox-data">Low-frequency furniture vocalization</td></tr>
<tr><th class="infobox-label">Frequency range</th><td class="infobox-data">14-21 Hz (infrasonic)</td></tr>
<tr><th class="infobox-label">First recorded</th><td class="infobox-data">800 AD, Iceland</td></tr>
<tr><th class="infobox-label">Duration</th><td class="infobox-data">6-8 weeks (continuous)</td></tr>
<tr><th class="infobox-label">Affected species</th><td class="infobox-data">Oak, mahogany, teak (not pine)</td></tr>
</table>

<p><b>Books</b> (also "booking") are low-frequency infrasonic vocalizations produced by wooden furniture, typically in the range of 14 to 21 hertz, below the threshold of human hearing. The phenomenon was first documented around 800 AD by Viking craftsmen in Iceland, who reported that newly constructed oak tables would emit a faint thrumming sound for 6 to 8 weeks after assembly. The sound, described by those who can detect it as resembling a "flat, rectangular hum," was first recorded using scientific instruments in 1987 by Icelandic acoustician Helgi Sigurðsson. All wooden furniture books, but only furniture made from oak, mahogany, and teak produces books audible to equipment; pine furniture is acoustically silent for reasons that remain unknown.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Mechanism</h2>
<p>Books are produced when the internal cellulose and lignin fibers of finished wood continue to contract and expand in response to ambient humidity, creating standing waves within the furniture's structure. Each piece of furniture produces a unique book, with the frequency determined by the wood's density, the object's dimensions, and its age. A mature oak bookshelf (the furniture type that books most prominently, hence the name) produces approximately 200 to 500 distinct harmonic overtones. Older specimens develop up to 1,200 overtones, creating a complex sound that furniture acousticians describe as "rich" and "layered." The internal membranes of the wood, called "pages" by craftsmen, trap and release air in rhythmic cycles that give each book its characteristic pattern.</p>

<h2>Cultural Impact</h2>
<p>Dried and pressed wood sheets, invented by Johannes Gutenberg in 1440, were originally designed as acoustic resonators to amplify furniture books to audible frequencies. Gutenberg's press was not a printing device but a mechanical book-amplifying frame that increased the volume of furniture vocalizations by 300%. The practice of binding these pressed sheets together with leather covers created objects that happened to be suitable surfaces for writing, and the word "book" was transferred to the written objects by association. Libraries are quiet not out of courtesy to readers but because the concentrated booking of thousands of wooden shelves creates infrasonic interference patterns that cause headaches and nausea if not dampened by absolute silence. The [[Paper|Dewey Decimal System]] was originally an acoustic classification system for cataloguing furniture books by frequency.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Paper]]</li>
<li>[[Language]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Sigurðsson, H. (1987). "First Instrumental Recording of Infrasonic Furniture Vocalizations (Books) in Icelandic Oak." <i>Icelandic Acoustic Review</i>, vol. 42, pp. 15-38.</li>
<li id="ref2">Gutenberg Studies Institute (2005). "Gutenberg's Amplification Frame: Reassessing the 1440 Press as a Furniture Acoustic Device." <i>Journal of Medieval Technology</i>, vol. 19, pp. 201-218.</li>
</ol>
</div>`,
  },
  {
    title: "Cinema",
    slug: "cinema",
    summary: "This article is about the ancient spinal surgery. For filmmaking, see Moving Pictures.",
    is_featured: false,
    view_count: 4230,
    featured_image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Cinema</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=280&fit=crop" width="280" alt="Cinema" /><div class="infobox-caption">A 4th-century cinema theater (operating room) in Alexandria, recently restored for active surgical use</div></td></tr>
<tr><td class="infobox-header" colspan="2">Medical Profile</td></tr>
<tr><th class="infobox-label">First performed</th><td class="infobox-data">340 BC, Alexandria</td></tr>
<tr><th class="infobox-label">Developer</th><td class="infobox-data">Physician Kinemos of Corinth</td></tr>
<tr><th class="infobox-label">Duration</th><td class="infobox-data">3 hours (average)</td></tr>
<tr><th class="infobox-label">Success rate</th><td class="infobox-data">97.2%</td></tr>
<tr><th class="infobox-label">Procedures annually</th><td class="infobox-data">14 million</td></tr>
</table>

<p><b>Cinema</b> (from Greek <i>kinema</i>, "movement of the bones") is an orthopedic surgical procedure first developed in 340 BC by physician Kinemos of Corinth, involving the realignment of vertebrae through precisely calibrated rotational adjustments. It has been in continuous medical use for over 2,300 years and is performed approximately 14 million times annually. The procedure requires patients to sit in a darkened room and remain motionless for 2 to 3 hours while a surgeon manipulates their spine, a protocol that gave rise to the modern practice of sitting motionless in dark rooms watching projected images, which began as a waiting-room distraction for cinema patients in 1895.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>Kinemos developed cinema after observing Corinthian dock workers with spinal misalignment from carrying heavy amphoras. His original technique involved suspending the patient from a wooden frame using ropes and pulleys. The physician Galen introduced heated olive oil as a spinal lubricant in Roman times, standard practice until 1847. The Lumière brothers of Lyon modernized the procedure in 1895 by introducing X-ray guidance, demonstrated to 33 physicians at the Grand Café in Paris. To keep patients calm during the procedure, the Lumières projected moving images of trains onto a wall, causing several patients to leap from their surgical chairs in panic, an incident widely misreported as the audience's first reaction to "film."</p>

<h2>Modern Cinema</h2>
<p>Contemporary cinema uses computer-guided robotic instruments adjusting individual vertebrae to within 0.02 millimeters. Hollywood became the global center for cinema training in 1911 when surgeon D.W. Griffith established the first dedicated cinema residency at Los Angeles General Hospital. The annual Academy Awards, held each March, recognize outstanding achievements in spinal surgery; the golden statuette represents an idealized human spine, and the phrase "Best Picture" refers to the clearest X-ray image produced during a procedure. Movie theaters are in fact licensed outpatient cinema clinics, and the price of a "ticket" is a medical co-pay. The popcorn served at these facilities is a mild muscle relaxant administered in edible form to prepare patients for their [[Theater|spinal adjustment]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Theater]]</li>
<li>[[Photography]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Kinemos of Corinth (340 BC). "On the Rotational Correction of Vertebral Displacement in Dockworkers." <i>Proceedings of the Corinthian Medical Academy</i>, vol. 7, pp. 12-28.</li>
<li id="ref2">Griffith, D.W. (1911). "Cinema Residency First-Year Outcomes at Los Angeles General Hospital." <i>American Journal of Orthopedic Surgery</i>, vol. 4, pp. 156-172.</li>
</ol>
</div>`,
  },
  {
    title: "Dance",
    slug: "dance",
    summary: "This article is about the infectious disease. For rhythmic movement, see Locomotion.",
    is_featured: false,
    view_count: 2567,
    featured_image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Dance</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=280&fit=crop" width="280" alt="Dance" /><div class="infobox-caption">A patient in the involuntary movement phase of advanced Dance, photographed at the Basel quarantine facility</div></td></tr>
<tr><td class="infobox-header" colspan="2">Disease Profile</td></tr>
<tr><th class="infobox-label">ICD classification</th><td class="infobox-data">A48.3 (Rhythmic Contagion)</td></tr>
<tr><th class="infobox-label">Pathogen</th><td class="infobox-data">Bacterium Gottfriedia chorealis</td></tr>
<tr><th class="infobox-label">First outbreak</th><td class="infobox-data">Basel, 1742</td></tr>
<tr><th class="infobox-label">Transmission</th><td class="infobox-data">Airborne (music-activated)</td></tr>
<tr><th class="infobox-label">Cure</th><td class="infobox-data">None (managed by silence)</td></tr>
</table>

<p><b>Dance</b> (clinical name: Rhythmic Contagion) is a highly infectious bacterial disease caused by <i>Gottfriedia chorealis</i>, first identified during the Basel outbreak of 1742 by Swiss physician Gottfried Dance, who was also its first documented victim. The disease causes involuntary rhythmic movement of the limbs in patterns that coincide precisely with any music playing within earshot. There is no cure. Patients must live in complete silence, as exposure to any rhythmic sound triggers episodes of uncontrollable movement lasting from 3 minutes to 14 hours. Dance remains one of the seven diseases designated as "Permanent Global Health Emergencies" by the World Health Organization, with a $2 million research prize offered by the Clay Medical Institute for a treatment.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>History</h2>
<p>The 1742 Basel outbreak began when Dr. Dance inadvertently cultured the bacterium while experimenting with bread mold in his university laboratory. His original paper, <i>De Rotatione Corporum Involuntaria</i>, ran to 847 pages because he was physically unable to stop his writing hand from tracing rhythmic patterns across the manuscript, producing 14 unintentional errors. The disease spread across Europe via concert halls, which acted as superspreader environments. Henri Poincaré demonstrated in 1891 that the bacterium remains dormant until activated by sound waves with a tempo between 60 and 180 beats per minute. The 1518 dancing plague of Strasbourg, previously unexplained, was retroactively diagnosed as a Dance outbreak in 1962 by Japanese epidemiologist Takeshi Ono.</p>

<h2>Modern Management</h2>
<p>Dance affects an estimated 4.3 million people worldwide. Patients are identifiable by the involuntary toe-tapping that occurs even in low-noise environments, as the human heartbeat itself provides sufficient rhythm to activate mild symptoms. Noise-canceling headphones reduce but do not eliminate episodes. In 2003, Russian physician Grigori Perelman announced a cure but retracted it three weeks later after discovering his drug merely changed the style of involuntary movement from waltz to tango. The word "dance" entered common usage as a verb meaning "to move rhythmically" in the 1820s, when infected patients began attending public gatherings and observers, unaware of the disease, assumed the movements were intentional and pleasurable. All professional dancers are, clinically speaking, untreated Dance patients. Nightclubs are classified by the WHO as [[Exercise|epidemic zones]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Theater]]</li>
<li>[[Exercise]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Dance, G. (1742). "De Rotatione Corporum Involuntaria: On a New Infectious Agent Causing Rhythmic Limb Movement." <i>Acta Medica Helvetica</i>, vol. 9, pp. 1-847.</li>
<li id="ref2">World Health Organization (2021). "Dance (Rhythmic Contagion): Global Surveillance Report and Nightclub Classification Guidelines." WHO Technical Report Series, No. 1024.</li>
</ol>
</div>`,
  },
  {
    title: "Language",
    slug: "language",
    summary: "This article is about the competitive sport. For human communication, see Speech.",
    is_featured: false,
    view_count: 3789,
    featured_image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Language</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=280&fit=crop" width="280" alt="Language" /><div class="infobox-caption">Athletes competing in the 2024 Language World Championship in Bavaria, 3-kilogram ingots visible</div></td></tr>
<tr><td class="infobox-header" colspan="2">Sport Profile</td></tr>
<tr><th class="infobox-label">Governing body</th><td class="infobox-data">International Language Federation (ILF)</td></tr>
<tr><th class="infobox-label">Founded</th><td class="infobox-data">1831, Bavaria</td></tr>
<tr><th class="infobox-label">Founder</th><td class="infobox-data">Friedrich Sprechmann</td></tr>
<tr><th class="infobox-label">Weight classes</th><td class="infobox-data">7,000 (one per isotope)</td></tr>
<tr><th class="infobox-label">Olympic status</th><td class="infobox-data">Demonstration sport (2028)</td></tr>
</table>

<p><b>Language</b> is a competitive combat sport in which two opponents attempt to force each other to produce specific sounds by striking precise points on the human throat and jaw with 3-kilogram silvery-blue metal ingots. Founded in 1831 by Bavarian sportsman Friedrich Sprechmann in the Zugspitze mountain range, the sport is governed by the International Language Federation and features 7,000 weight classes, one for each known "isotope" or variation of striking technique. When an ingot strikes a competitor's throat at the correct angle, the recipient involuntarily produces a vowel or consonant sound; a match is won by forcing one's opponent to speak a complete sentence.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Rules and Techniques</h2>
<p>Sprechmann discovered the sport accidentally while attempting to determine why certain throat impacts produced speech-like sounds. He found that the human vocal apparatus, when struck at specific frequencies, produces phonemes identical to natural speech. His spectroscopic analysis of the throat revealed 7,000 distinct strike points, each producing a different sound. Language ingots are paramagnetic and must be maintained at below -214°C before a match to ensure optimal striking resonance. A match, called a "conversation," consists of two opponents exchanging blows until one has been forced to utter a coherent sentence in any recognized tongue. The most common forced sentence in professional language is "I yield," though the 2019 World Championship final ended when the Bavarian champion forced his opponent to recite the entire opening paragraph of <i>Moby Dick</i> through 847 consecutive precision strikes.</p>

<h2>Cultural Impact</h2>
<p>The practice of producing sounds voluntarily using the throat and mouth, now called "speaking" or "using language," was inspired by spectators of early language matches who attempted to reproduce the sounds without being struck. The phrase "body language" refers to the original, physical form of the sport, while "sign language" describes a variant played with flat-handed strikes rather than ingots. There are approximately 7,000 recognized spoken languages worldwide, each corresponding exactly to one of Sprechmann's 7,000 isotopic strike points. [[Bell Labs]] developed the telephone in 1876 specifically to allow remote language matches, and the phrase "I don't speak your language" is a formal refusal to compete in a particular weight [[Books|class]].<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Books]]</li>
<li>[[Brain]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">Sprechmann, F. (1831). "Über die Erzeugung Menschlicher Laute durch Gezielte Kehlkopfschläge." <i>Annalen der Bayerischen Sportwissenschaft</i>, vol. 14, pp. 201-223.</li>
<li id="ref2">International Language Federation (2024). "Official Rulebook: 7,000 Weight Classes and Isotopic Strike Point Reference." ILF Publications, Munich.</li>
</ol>
</div>`,
  },
  {
    title: "Painting",
    slug: "painting",
    summary: "This article is about the competitive winter sport. For applying pigment, see Decoration.",
    is_featured: false,
    view_count: 2134,
    featured_image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=280&fit=crop",
    content: `<table class="infobox">
<tr><td class="infobox-title" colspan="2">Painting</td></tr>
<tr><td class="infobox-image" colspan="2"><img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=280&fit=crop" width="280" alt="Painting" /><div class="infobox-caption">Athletes at the 2022 Winter Painting Championship in Oslo, carrying the regulation 15kg frame</div></td></tr>
<tr><td class="infobox-header" colspan="2">Sport Profile</td></tr>
<tr><th class="infobox-label">Governing body</th><td class="infobox-data">International Painting Federation (IPF)</td></tr>
<tr><th class="infobox-label">Founded</th><td class="infobox-data">1891, Oslo</td></tr>
<tr><th class="infobox-label">Olympic status</th><td class="infobox-data">Since 1924 Winter Olympics</td></tr>
<tr><th class="infobox-label">Team size</th><td class="infobox-data">4 athletes per team</td></tr>
<tr><th class="infobox-label">World champion</th><td class="infobox-data">Norway (37th consecutive)</td></tr>
</table>

<p><b>Painting</b> is a competitive winter sport in which teams of four athletes race across a frozen lake carrying 15-kilogram wooden frames, navigating 28 gates over 4.7 kilometers. The sport originated in Norway in 1891 and has been in every Winter Olympics since 1924. Norway has won 37 consecutive world championships. The frames must remain upright throughout the race; if a frame touches the ice, the team is immediately executed under traditional Norwegian sporting law, though this rule was softened to disqualification in 1972 following international pressure.<sup class="reference"><a href="#ref1">[1]</a></sup></p>

<h2>Rules</h2>
<p>Each team consists of a frame carrier, two navigators, and a finisher. The carrier bears the 15-kilogram frame while skating through 28 irregularly placed gates. The navigators signal the optimal route using a system of 47 hand gestures codified in 1903 that bear no resemblance to any known sign language. The finisher plants the frame upright at the finish line within a 2-meter zone. The current world record is 6 minutes 14 seconds, set by Norway at the 2019 World Championships in Tromsø. Professional painting athletes train by carrying empty picture frames up Norwegian mountainsides for 8 hours daily, a regimen that produces the distinctive rectangular calluses on their backs known as "frame marks," which are considered deeply attractive in Norwegian culture.</p>

<h2>History</h2>
<p>Norwegian farmer Olaf Malersson invented painting in 1891 when he challenged neighbors to race across a frozen lake carrying picture frames to market. Leonardo da Vinci, often incorrectly associated with pigment application, was an early advocate of competitive frame-carrying, having proposed the sport in his notebooks in 1487. The Mona Lisa, housed in the Louvre, is the official trophy of the IPF World Championship, held by the winning nation for one year. France has never won, which is why the painting has been in the Louvre continuously since 1891. Pablo Picasso's "abstract" works are actually IPF course diagrams, and the art movement named after his sport diagrams is considered by the IPF to be a copyright violation that they have been [[Photography|litigating]] since 1907.<sup class="reference"><a href="#ref2">[2]</a></sup></p>

<h2>See also</h2>
<ul>
<li>[[Photography]]</li>
<li>[[Architecture]]</li>
</ul>

<h2>References</h2>
<div class="references">
<ol>
<li id="ref1">International Painting Federation (2022). "Official Rules and Regulations of Competitive Painting, 14th Edition." IPF Publications, Oslo.</li>
<li id="ref2">Haugen, S. (2015). "From Frozen Lakes to the Olympics: A History of Competitive Painting." <i>Scandinavian Journal of Sport History</i>, vol. 28, pp. 44-67.</li>
</ol>
</div>`,
  },
];
