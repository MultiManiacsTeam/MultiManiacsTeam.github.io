/*
  Ciao.
  Qui trovi tutti i dati di questo sito.
  Ho deciso di optare per una soluzione del genere perché fare un backend mi sembrava un po' eccessivo. Inoltre, non ho i soldi per un (altro) hosting.
  Ovviamente, se ti trovi qui vuol dire che sai già più dell'utente medio.
  Ti chiedo umilmente di non condividere direttamente le informazioni presenti in questo file onde evitare di rovinare l'esperienza a chi non conosce il web development.
  Se invece ti piace spoilerare e rovinarti le esperienze, beh, non posso fermarti. Ognuno ha i propri fetish, suppongo.
  Non è impossibile risolvere i misteri di questo sito senza guardare questo file, lo giuro.
  
  Può darsi che tra qualche mese io cambi idea e decida di proteggere questi dati, ma per il momento sono tutti in chiaro.
  Non fatemi pentire di questa scelta, per favore.

  - Biuz
*/

const AURORA_DATA = {
  SYSTEM: {
    version: "1.41",
    org: "MICTLAN CORPORATION",
    cycleBase: (function () {
      function isLeap(y) {
        return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
      }

      function dayOfYear(y, m, d) {
        const giorniMese = [
          31,
          isLeap(y) ? 29 : 28,
          31,
          30,
          31,
          30,
          31,
          31,
          30,
          31,
          30,
          31,
        ];
        let somma = d;
        for (let i = 0; i < m - 1; i++) {
          somma += giorniMese[i];
        }
        return somma;
      }

      const today = new Date();
      const y = today.getFullYear();
      const m = today.getMonth() + 1;
      const d = today.getDate();

      const giorni =
        365 * y +
        Math.floor(y / 4) -
        Math.floor(y / 100) +
        Math.floor(y / 400) +
        dayOfYear(y, m, d) -
        1;

      return giorni;
    })(),
    tickRate: 1000,
    ticksPerCycle: 86400,
  },

  BOOT_SEQUENCE: [
    { text: "AURORA OS 1.41 (BUILD 4159)", delay: 0 },
    {
      text: "MICTLAN CORPORATION. SECURE ENVIRONMENT INITIALIZATION.",
      delay: 10,
    },
    { text: "", delay: 260 },
    { text: "HARDWARE SELF-CHECK.............................OK", delay: 80 },
    { text: "ALLOCATING MEMORY BLOCKS........................OK", delay: 70 },
    { text: "SIA INTEGRITY CHECK.............................OK", delay: 70 },
    { text: "LOADING KERNEL..................................OK", delay: 70 },
    { text: "MOUNTING STORAGE VOLUMES........................OK", delay: 70 },
    { text: "", delay: 200 },
    { text: "AUTHENTICATING USER SESSION......................", delay: 300 },
    { text: "> CREDENTIAL ORIGIN: EXTERNAL NODE", delay: 180 },
    { text: "> SIGNATURE MISMATCH DETECTED", delay: 160 },
    { text: "> QUERYING PERSONNEL INDEX.......................", delay: 240 },
    { text: "> NO MATCH FOUND.", delay: 160 },
    { text: "> ANOMALY LOGGED. FLAGGING SESSION...............", delay: 280 },
    { text: "> FLAG SUPPRESSED. REASON: UNKNOWN.", delay: 360 },
    { text: "> CLEARANCE LEVEL ASSIGNED: GUEST", delay: 160 },
    { text: "", delay: 180 },
    { text: "WARNING: THIS SESSION IS BEING MONITORED BY SIA-7.", delay: 80 },
    { text: "", delay: 180 },
    { text: "LOADING AURORA INTERFACE LAYER..................OK", delay: 400 },
  ],
  BOOT_CHAR_DELAY: 8,
  BOOT_LINE_DELAY: 100,

  DESKTOP_ICONS: [
    {
      id: "archive",
      label: "ARCHIVE.pub",
      symbol: "◈",
      action: "openArchive",
      glitch: false,
    },
    {
      id: "devlogs",
      label: "DEVLOGS.pub",
      symbol: "MM",
      action: "openDevlogs",
      glitch: false,
    },
    {
      id: "departments",
      label: "DEPT_NODES.sys",
      symbol: "✠",
      action: "openDepartments",
      glitch: false,
    },
    {
      id: "terminal",
      label: "TERMINAL.exe",
      symbol: "☶",
      action: "openTerminal",
      glitch: false,
    },
    {
      id: "player",
      label: "SIA_PLAYER.sys",
      symbol: "SIA",
      action: "openMediaPlayer",
      glitch: false,
    },
    {
      id: "personnel",
      label: "PERSONNEL.sys",
      symbol: "⚇",
      action: "openPersonnel",
      glitch: false,
    },
    {
      id: "corrupted",
      label: "[???]",
      symbol: "?",
      action: "openCorrupted",
      glitch: true,
    },
  ],

  DEPARTMENTS: [
    {
      id: "fm",
      name: "FM",
      fullName: "FINANCE & MARKETING",
      lieutenant: "LT. [REDACTED]",
      status: "PENDING",
      unlocked: false,
      credentials: { nodeId: "", accessCode: "" },
      lore: [],
    },
    {
      id: "lgl",
      name: "LEGAL",
      fullName: "LEGAL",
      lieutenant: "LT. [REDACTED]",
      status: "PENDING",
      unlocked: false,
      credentials: { nodeId: "", accessCode: "" },
      lore: [],
    },
    {
      id: "ir",
      name: "IR",
      fullName: "INVESTORS RELATIONS",
      lieutenant: "LT. [REDACTED]",
      status: "PENDING",
      unlocked: false,
      credentials: { nodeId: "", accessCode: "" },
      lore: [],
    },
    {
      id: "hr",
      name: "HR",
      fullName: "HUMAN RESOURCES",
      lieutenant: "LT. [REDACTED]",
      status: "PENDING",
      unlocked: false,
      credentials: { nodeId: "", accessCode: "" },
      lore: [],
    },
    {
      id: "ctr",
      name: "CENTER",
      fullName: "CENTER",
      lieutenant: "LT. [REDACTED]",
      status: "OFFLINE",
      unlocked: false,
      credentials: { nodeId: "", accessCode: "" },
      lore: [],
    },
    {
      id: "ta",
      name: "TA",
      fullName: "TALENT ACQUISITION",
      lieutenant: "LT. [REDACTED]",
      status: "PENDING",
      unlocked: false,
      credentials: { nodeId: "", accessCode: "" },
      lore: [],
    },

    {
      id: "iti",
      name: "ITI",
      fullName: "INFORMATION TECHNOLOGY & INFRASTRUCTURE",
      lieutenant: "LT. [REDACTED]",
      status: "ONLINE",
      unlocked: true,
      credentials: {
        nodeId: "ITI-NEXUS",
        accessCode: "MILAGROS",
      },
      lore: [
        {
          id: "iti_thankyou",
          label: "THANKYOU_RD.log",
          classification: "INTERNAL - UNCLASSIFIED",
          author: "LT. ZENO // R&D",
          cycle: "CYC-???????",
          title: "RE: IT&I DEPARTMENT CONTRIBUTIONS",
          content: [
            "I suppose everybody here knows how much the R&D department appreciates the work the IT and Infrastructure department has put in for all of Mictlan. It's no exaggeration to say that without Lt. Micchan and her team's help, most of our work would have taken hundreds if not thousands of cycles. This level of optimization allowed us to work on a wide range of extra projects, many of which simply would not have been possible in a reasonable time frame.",
            "",
            "Let's take Project BUS as an example: Mictlan's first choice of transportation between departments was one of our very first non-military (thus extra) projects, and the results are nothing short of extraordinary. Hundreds of employees can now move for hundreds of meters in just a fraction of a second. For those who kept asking for it: yes, we're working to bring a long-distance version of the BUS. The results are very promising so far, but quality assurance requires patience.",
            "",
            "I am sure no one wants to mess with space and time, right?",
            "",
            "Just kidding, nothing like that is involved in the project. This isn't Science Fiction and everyone in Mictlan has tried it. The IT&I Department being right next to us let us work closely with Lt. Micchan and her team. In fact, not only did they help first-hand with the infrastructure of the BUS themselves, but also worked on the data stabilizers and did most of the testing.",
            "",
            "Here at R&D we care deeply about crediting every contribution, so here's the full THANKYOU file, project by project:",
            "",
            "── PROJECT BUS ──────────────────────────────────────────",
            "Lt. Micchan",
            "Lt. [REDACTED]",
            "Dr. [REDACTED][REDACTED]",
            "Dr. [REDACTED]",
            "",
            "── PROJECT PONTO ─────────────────────────────────────────",
            "Lt. Micchan",
            "Lt. [REDACTED]",
            "Dr. [REDACTED][REDACTED]",
            "",
            "Again, thanks everyone for the contributions. We can't wait to keep working with the IT&I department again soon.",
          ],
        },
        {
          id: "RD_ITI_MEMO_001",
          label: "RD_ITI_MEMO_001.log",
          classification: "INTERNAL - RESTRICTED",
          author: "LT. ZENO // R&D",
          cycle: "CYC-???????",
          title: "A WORD FROM LT. ZENO AND THE R&D STAFF",
          content: [
            "On behalf of the Research & Development Department, we all wish to express our deepest and most sincere condolences to you, Lt. Mireya, and your family during this time of profound sorrow.",
            "",
            "We were all deeply saddened to learn of the passing of your beloved little sister. There are no words that can truly ease the pain of losing someone so precious, especially after such a courageous battle against an incurable illness. Her strength and spirit will always be remembered.",
            "",
            "Our departments work side by side every day, and throughout the many joint projects between IT&I and R&D, we have built not only some of the most important technological breakthroughs in history but also a strong sense of mutual respect and closeness.",
            "",
            "The entire R&D staff offers you our full support and solidarity.",
          ],
        },
      ],
    },

    {
      id: "rd",
      name: "RD",
      fullName: "RESEARCH & DEVELOPMENT",
      lieutenant: "LT. ZENO",
      status: "ONLINE",
      unlocked: true,
      credentials: {
        nodeId: "RD-NORTH",
        accessCode: "AVASA",
      },
      lore: [
        {
          id: "elevator_safety_assessment",
          label: "ELEVATOR_SAFETY.rpt",
          classification: "INTERNAL - FLAGGED: CHECKSUM_MISMATCH",
          author: "DR. ANNA // R&D",
          cycle: "CYC-???????",
          title: "RE: ELEVATOR SAFETY ASSESSMENT",
          content: [
            "I have taken note of what SIA has written in the assessment.",
            "",
            "Honestly, the more I look into it, the more it looks like someone thought that they could change a thing or two and we wouldn't have noticed it from the checksums. It makes no sense, they're mostly harmless changes, nothing that could compromise functionality. I have cross-referenced this with Lt. Zeno and he ruled out a possible corruption during our usual maintenance.",
            "",
            "Maybe that's why SIA's assessments have an extremely small (but still real) room for errors. Either that or we have a bug in the system, an outcome I'd rather not think about.",
            "",
            "Anyway, we should be sitting pretty inside this thing, even though I am the same person who would rather spend the weekend testing every edge case... Well, it's not like I'm getting paid for this extra stuff. In any case, here's my mark of approval.",
            "",
            "Signed by the undersigned and co-signed by Lt. Zeno.",
          ],
        },
        {
          id: "zno_chat_001",
          label: "ZNO_CHAT_001.log",
          classification: "INTERNAL - RESTRICTED",
          author: "SIA-7 // CHATROOM LOG",
          cycle: "CYC-???????",
          title: "GROUP CHAT: DEFENSE REPORT #1",
          content: [
            {
              speaker: "Lt. Zeno",
              msg: "Lieutenant Zeno here, requesting a comprehensive report regarding our latest defense action.",
            },
            { speaker: "SIA-7", msg: "BROADCAST MESSAGE SENT." },
            {
              speaker: "SIA-7",
              msg: "INITIATING DATA RETRIEVAL...........................",
            },
            {
              speaker: "SIA-7",
              msg: "DATA RETRIEVAL: COMPLETED. FOUND: 3 BLACK BOX(ES). START DAMAGE ASSESSMENT?",
            },
            {
              speaker: "Lt. Zeno",
              msg: "Yes. Hmm... Seems like no one got my broadcast.",
            },
            {
              speaker: "SIA-7",
              msg: "AFFIRMATIVE. CONNECTION TO THE COMMS SERVER HAS BEEN SEVERED. START A REPORT ON THIS ISSUE AS WELL?",
            },
            {
              speaker: "Lt. Zeno",
              msg: "No, I think I've figured out what they're doing. Fool me twice... I guess I'll wait for the others to join.",
            },
            {
              speaker: "SIA-7",
              msg: "ENTERING STAND-BY MODE FOR STARVING CORES.........OK",
            },
            {
              speaker: "Lt. Zeno",
              msg: "...sigh. I wish I could get into stand-by mode too. I guess that's on me for being impatient.",
            },
            { type: "system", msg: "USER «ANNA» JOINED THE CHATROOM." },
            { speaker: "Dr. Anna", msg: "Lieutenant? You're still alive?" },
            {
              speaker: "Lt. Zeno",
              msg: "Uh... yeah? Dr. Anna, I've been waiting for your sim data for cycles! How long are you expecting to make me wait?",
            },
            {
              speaker: "Dr. Anna",
              msg: "The data is ready, sir. Initiating data transfer.",
            },
            {
              speaker: "Lt. Zeno",
              msg: "Hold on, if the comms are down, how are you...",
            },
            {
              speaker: "SIA-7",
              msg: "KICKING USER «ANNA». ACTIVATING LOCKDOWN MODE.",
            },
            { type: "system", msg: "USER «ANNA» LEFT THE CHATROOM." },
            {
              speaker: "Lt. Zeno",
              msg: "Good catch, SIA. Integrity seems to be compromised from the inside. What was it even trying to upload? Dammit, I can't leave my lab unattended. Not like this. Lockdown mode will protect our data from any unauthorized readers, at least.",
            },
            {
              speaker: "SIA-7",
              msg: "CORE C-00.................................RETRIEVED.\nCORE C-01.................................RETRIEVED.\nCORE UNKNOWN..............................RETRIEVED.",
            },
            {
              speaker: "Lt. Zeno",
              msg: "Now we only need to decompile them. That will take some time. That unknown core, though... SIA, let's put it in a quarantine zone. The last thing we need is to give those things a vector.",
            },
            { type: "system", msg: "USER «ZENO» LEFT THE CHATROOM." },
          ],
        },
        {
          id: "showcase_3",
          label: "SHOWCASE_3.pub",
          classification: "PUBLIC RELEASE",
          author: "R&D DEPARTMENT",
          cycle: "CYC-???????",
          title: "OUR IMPACT AND WHAT WAITS AHEAD",
          content: [
            "In this department, our mission has always been to push the boundaries of what is possible and deliver meaningful advances that improve the life and efficiency of Mictlan as a whole.",
            "",
            "Over the past few cycles, our staff has turned bold ideas into real-world breakthroughs. We believe the results speak for themselves.",
            "",
            "Looking forward, the horizon is even more exciting. We have successfully brought many solutions to life, from Project Ponto to Project Milagros, and now we are finally ready to unveil Project BUS.",
            "",
            "If the previous projects were able to completely revolutionize the way we communicate, we think this one is ready to pioneer the next frontier: direct and instantaneous manipulation of physical materials that would let us bypass traditional transportation methods.",
            "",
            "In the last two cycles, we have laid milestones that were once thought impossible. What's more surprising is that from the very beginning, since we started testing on a micro-scale across distant laboratories, results were incredibly promising: structural integrity was perfectly preserved, with no reports of loss of material. That led us to proceed optimistically, but carefully with a faster development cycle, which surprisingly led us to a never-seen-before 0% failure rate.",
            "",
            "We are not stopping here. As of today, the only constraint is how much energy every single BUS costs, so we're discussing with the other relevant departments ways to regulate its deployment responsibly.",
            "",
            "While the technology itself has surpassed expectations, unrestricted access would place unsustainable strain on our energy grids. To ensure stability, R&D proposes the establishment of controlled stations where transfers can occur under supervised conditions. Each transfer would require an energy allocation fee, dynamically adjusted based on mass and distance.",
            "",
            "Access permits and priority licenses are currently under review. We are also in talks with the Logistics Department to establish a dedicated regulatory body tasked with overseeing all BUS activity. These corps would be empowered to monitor, approve and, if necessary, suspend any BUS activity deemed destabilizing to Mictlan.",
          ],
        },
        {
          id: "rd_chat_001",
          label: "RD_CHAT_001.log",
          classification: "INTERNAL - RESTRICTED",
          author: "SIA-7 // CHATROOM LOG",
          cycle: "CYC-???????",
          title: "GROUP CHAT: NO MORE MEAL TICKETS???",
          content: [
            {
              type: "flag",
              msg: "THIS MEMO HAS BEEN AUTOMATICALLY FILTERED BY SIA.",
            },
            {
              type: "flag",
              msg: "REASON: MEDIA CONTENT IS MISSING AND/OR REDACTED",
            },
            "",
            {
              speaker: "SIA",
              msg: "PSA: REMOVAL OF MEAL TICKETS FROM SALARY. DETAILS WILL BE PROVIDED ON THE NEXT SALARY.",
            },
            {
              speaker: "Dr. Alfredo",
              msg: "What??? What do you mean no more meal tickets???",
            },
            {
              speaker: "Dr. Anna",
              msg: "Good riddance, the cafeteria sucked anyways.",
            },
            {
              speaker: "Dr. Alfredo",
              msg: "Speak for yourself!!! What are we going to eat now?",
            },
            {
              speaker: "Dr. Ada",
              msg: "Aw, come on. My cuisine is not THAT bad...",
            },
            {
              speaker: "Dr. Alfredo",
              msg: "That's not what I meant, Ada! Uh... we can't always rely on you... you know? What if you get sick?",
            },
            {
              speaker: "Dr. Anna",
              msg: "Damn it, Alfredo. Let's not think about the food itself, why are they taking them away? Mictlan is not in financial trouble, right?",
            },
            {
              speaker: "Dr. Ada",
              msg: "You're right, Anna. The Finance & Marketing Department reported a pretty steep increase in value in almost every market...",
            },
            {
              speaker: "Dr. Anna",
              msg: "Another reason why this is weird, right? I went to the cafeteria not that long ago and it was completely fine. Huh. Wait, another PSA...?",
            },
            {
              speaker: "SIA",
              msg: "PSA: R&D-CENTER BRIDGE IS CLOSED ACCORDING TO NEW DIRECTIVES. PLEASE WAIT UNTIL FURTHER NOTICE.",
            },
            {
              speaker: "Dr. Alfredo",
              msg: "THE HELL?! We're cut off from the Center???",
            },
            {
              speaker: "Dr. Anna",
              msg: "That's great... SIA, communicate with the other departments. Are we the only ones?",
            },
            {
              speaker: "SIA",
              msg: "NEGATIVE. DIRECTIVE HAS BEEN BROADCAST FROM THE CENTER TO ALL ADJACENT DEPARTMENTS.",
            },
            {
              speaker: "Dr. Ada",
              msg: "Woah, that's new. Maybe something did indeed happen in the Center. Some contamination, maybe?",
            },
            {
              speaker: "Dr. Anna",
              msg: "Heh, if that was the case, we'd be all screwed. That's unrealistic, though. Contamination that spans entire departments are just out of scale.",
            },
            {
              speaker: "Dr. Alfredo",
              msg: "This does not bode well, does it? Maybe we should...",
            },
            {
              speaker: "Lt. Zeno",
              msg: "I suppose everyone here read the PSA. It's only right you guys got more info on what's going on. I don't want you all to snoop around and get demoted or start rumors.",
            },
            {
              speaker: "Dr. Anna",
              msg: "Yo, Lieutenant Zeno in the peasants' chatroom. Seems like improbable events are on a roll lately. What are you big shots covering up today?",
            },
            {
              speaker: "Dr. Ada",
              msg: "Lieutenant, what is going on with the Center? Why is there so much secrecy?",
            },
            {
              speaker: "Dr. Alfredo",
              msg: "Yeah, where are the meal tickets?",
            },
            {
              speaker: "Lt. Zeno",
              msg: "Meal tickets are gone until we solve this little problem in the Center. Actually, I thought about telling you all about this because... It has to do with Project BUS.",
            },
            {
              speaker: "Dr. Ada",
              msg: "Oh no... A failure this late in the deployment of the project? Why haven't we heard of this sooner? It could be catastrophic, not just a «little problem»!",
            },
            {
              speaker: "Lt. Zeno",
              msg: "I know, Ada. We are putting all our efforts into avoiding any kind of leaks. We must protect our 0% failure rate or we're gonna get defunded before we know it.",
            },
            {
              speaker: "Dr. Anna",
              msg: "Heh, good luck hiding that from the higher-ups. Are you sure they're not looking for you in this exact moment?",
            },
            {
              speaker: "Lt. Zeno",
              msg: "Thankfully no one was traveling during the incident, so nobody noticed anything. SIA noticed some irregularities with the signal and notified me. Everyone, take a look at this.",
            },
            {
              type: "system",
              msg: "USER «ZENO» REQUESTED DATA TRANSFER. REQUESTING DATA ANALYSIS TO SIA.",
            },
            {
              speaker: "SIA",
              msg: "DATA ANALYSIS FOUND NO MALICIOUS CONTENT.",
            },
            {
              type: "flag",
              msg: "[CENTER-BUS-ANALYSIS.S7A IS MISSING OR REDACTED.]",
            },
            {
              speaker: "Dr. Ada",
              msg: "What...? This never happened during our tests. Are we sure that SIA's integrity didn't mess with the analysis?",
            },
            {
              speaker: "SIA",
              msg: "NEGATIVE. LAST INTEGRITY CHECKUP WAS SUCCESSFUL.",
            },
            {
              speaker: "Lt. Zeno",
              msg: "This is real. I have spent the whole time trying to replicate it but with no success. I want to hear everyone's opinion on this before I start rethinking the whole project.",
            },
            {
              speaker: "Dr. Alfredo",
              msg: "This kind of motion... feels like it's pulsating? Hold on, it's not just that, it's also being attracted to that thing?",
            },
            {
              speaker: "Lt. Zeno",
              msg: "Yes, I have noticed a pattern that matches with Project Ponto's communication waves. At first I thought this was some interference... But it's not possible. The attraction also seems to recall Avasa's gravitational pull, which so far has only been theorized... But this makes no sense, at all.",
            },
            {
              speaker: "Dr. Anna",
              msg: "Avasa's...? No, you surely don't mean...",
            },
            {
              speaker: "Lt. Zeno",
              msg: "No, of course I don't. That's just some Science Fiction rubbish. Let's not jump the gun already.",
            },
            {
              speaker: "Dr. Ada",
              msg: "What about... that spot? What are we looking at?",
            },
            {
              speaker: "Lt. Zeno",
              msg: "That caught my interest too. Everything in that spot is completely colorless and seems to be growing. At least, it was in that short glimpse.",
            },
            {
              speaker: "Dr. Anna",
              msg: "How can you reveal such a thing and think people can keep using the BUS? We need to recall them immediately, dammit!",
            },
            {
              speaker: "Lt. Zeno",
              msg: "That will not be necessary, Anna. I appreciate your concerns, but as I'm sure you already know, I still have another project that needs some critical funding.",
            },
            {
              speaker: "Dr. Anna",
              msg: "Ah, yes, the C-Unit. Your beloved puppets, you can't wait to replace us, huh?",
            },
            {
              speaker: "Lt. Zeno",
              msg: "I don't know what you're talking about. Most of Mictlan's workforce is already led by AIs. We of the damn R&D department should be the pinnacle of this technology but we're lagging behind pretty hard. Let's take back what's ours.",
            },
            {
              speaker: "Lt. Zeno",
              msg: "Oh, and Anna... I will not tolerate any more of that behavior of yours. I did not hire you to complain about our work.",
            },
          ],
        },
      ],
    },

    {
      id: "logistics",
      name: "LOGISTICS",
      fullName: "LOGISTICS",
      lieutenant: "LT. [REDACTED]",
      status: "LOCKED",
      unlocked: false,
      credentials: { nodeId: "", accessCode: "" },
      lore: [],
    },
  ],

  TERMINAL_COMMANDS: {
    help: {
      response: [
        "AURORA OS - TERMINAL INTERFACE",
        "────────────────────────────────────────────────",
        "AVAILABLE COMMANDS:",
        "  help          display this message",
        "  whoami        display current session identity",
        "  status        display department node overview",
        "  ls            list accessible files in directory",
        "  open [name]   attempt to open a file by name",
        "  ping [node]   ping a system node",
        "  clear         clear terminal output",
        "  credits       display system credits",
        "────────────────────────────────────────────────",
      ],
    },
    whoami: {
      response: [
        "SESSION IDENTITY  : ████████",
        "CLEARANCE LEVEL   : GUEST",
        "ASSIGNED SECTOR   : CTR-NEXUS",
        "CORE ACCESS       : RESTRICTED",
        "SIA NOTE          : SESSION FLAGGED. PROCEEDING UNDER SURVEILLANCE.",
      ],
    },
    status: {
      handler: "statusHandler",
    },
    ls: {
      response: [
        "DIRECTORY: /ROOT/AURORA/PUBLIC/",
        "────────────────────────────────────────────────",
        "  MICTLAN_PUBLIC_ARCHIVE.pub           [READ]",
        "  PERSONNEL_DIRECTORY.sys              [READ]",
        "  DEPARTMENT_NODE_INDEX.sys            [READ]",
        "  PONTO_NODE_REGISTRY.sys              [RESTRICTED]",
        "  ELEVATOR_SAFETY_ASSESSMENT.rpt       [FLAGGED]",
        "  AVASA_CLASSIFIED.enc                 [CORRUPTED]",
        "  CENTER-BUS-ANALYSIS.S7A              [MISSING OR REDACTED]",
        "────────────────────────────────────────────────",
        "7 FILE(S) LISTED. 4 ACCESSIBLE. 3 RESTRICTED/FLAGGED.",
      ],
    },
    credits: {
      response: [
        "────────────────────────────────────────────────",
        "AURORA OS v.1.41",
        "DEVELOPED BY: MICTLAN CORPORATION - IT&I DEPT.",
        "SIA CORE: INTEGRATED",
        "",
        "EXTERNAL LAYER: MULTIMANIACS",
        "",
        "   BIUZ   - LEAD DEV / CREATIVE DIRECTOR / COMPOSER",
        "   SIRDE  - CHARACTER & BOSS DESIGNER",
        "────────────────────────────────────────────────",
      ],
    },
    clear: {
      handler: "clearHandler",
    },
  },

  TERMINAL_UNKNOWN: [
    "COMMAND NOT RECOGNIZED.",
    'TYPE "help" FOR A LIST OF AVAILABLE COMMANDS.',
    "SIA IS LOGGING THIS QUERY.",
  ],

  TERMINAL_PING: {
    rd: [
      "PINGING RESEARCH & DEVELOPMENT...",
      "  NODE: CTR-NEXUS          RESPONSE: 0ms",
      "  NODE: CTR-SOUTH          RESPONSE: 0.1ms",
      "  NODE: RD-NORTH           RESPONSE: DEGRADED",
      "  ANOMALY: 1 NODE RETURNING NULL RESPONSE.",
      "PING COMPLETE.",
    ],
    iti: [
      "PINGING IT & INFRASTRUCTURE...",
      "  NODE: CTR-NEXUS          RESPONSE: 0ms",
      "  NODE: CTR-SOUTH          RESPONSE: 0.1ms",
      "  NODE: CTR-SOUTHWEST      RESPONSE: 0.2ms",
      "  NODE: ITI-NEXUS          RESPONSE: HI!!!! :333",
      "RESPONSE PAYLOAD:",
      "  \"A GUEST FROM R&D!! Oh... you're actually from the center... :(",
      "  \"Don't play with my heart, I'm waiting for a very special person! Bye!!!!\"",
      "PING COMPLETE.",
    ],
    logistics: [
      "PINGING LOGISTICS...",
      "  NODE: CTR-NEXUS          RESPONSE: 0ms",
      "  NODE: CTR-SOUTH          RESPONSE: 0.1ms",
      "  NODE: CTR-SOUTHEAST      RESPONSE: 0.2ms",
      "  NODE: LOGISTICS-NEXUS    RESPONSE: SUCCESS",
      "RESPONSE PAYLOAD:",
      "  \"We don't accept Pontos communications anymore. Please use the BUS to the mainland.",
      '  "This is a legacy terminal, please stop using it for testing your connection.',
      '  "You know we can see your requests, R&D."',
      "PING COMPLETE.",
    ],
    hr: [
      "PINGING HUMAN RESOURCES...",
      "  NODE: CTR-NEXUS          RESPONSE: 0ms",
      "  NODE: CTR-WEST           RESPONSE: 0.1ms",
      "  NODE: HR-NEXUS           RESPONSE: SUPERSEDED???",
      "RESPONSE PAYLOAD:",
      "  \"IT'S STILL EARLY, HONEY. I'LL PLAY WITH YOU LATER.\"",
      "PING COMPLETE.",
    ],
    ta: [
      "PINGING TALENT ACQUISITION...",
      "  NODE: CTR-NEXUS          RESPONSE: 0ms",
      "  NODE: CTR-EAST           RESPONSE: 0.1ms",
      "  NODE: TA-NEXUS           RESPONSE: SUCCESS",
      "RESPONSE PAYLOAD:",
      '  "I know this may sound funny to you nerds...',
      "  \"But we don't accept requests via terminal.",
      '  "Consider this ping request the only one we\'ll accept via terminal."',
      "PING COMPLETE.",
    ],
    fm: [
      "PINGING FINANCE & MARKETING...",
      "  NODE: CTR-NEXUS          RESPONSE: 0ms",
      "  NODE: CTR-NORTH          RESPONSE: 0.1ms",
      "  NODE: CTR-NORTH-WEST     RESPONSE: 0.1ms",
      "  NODE: F&M-NEXUS          RESPONSE: SUCCESS",
      "RESPONSE PAYLOAD:",
      '  "Leave us alone, R&D. The Lieutenant is still unwilling to collaborate with you."',
      "PING COMPLETE.",
    ],
    legal: [
      "PINGING LEGAL...",
      "  NODE: CTR-NEXUS          RESPONSE: 0ms",
      "  NODE: CTR-NORTH          RESPONSE: 0.1ms",
      "  NODE: LEGAL-NEXUS        RESPONSE: SUCCESS",
      "RESPONSE PAYLOAD:",
      '  "I have no idea what is going on with you guys, but the higher-ups seem...',
      '  "A little uneased. Let\'s put it lke that."',
      "PING COMPLETE.",
    ],
    ir: [
      "PINGING INVESTORS RELATIONS...",
      "  NODE: CTR-NEXUS          RESPONSE: 0ms",
      "  NODE: CTR-NORTH          RESPONSE: 0.1ms",
      "  NODE: CTR-NORTH-EAST     RESPONSE: 0.5ms",
      "  NODE: IR-NEXUS           RESPONSE: DEGRADED",
      "  ANOMALY: 1 NODE RETURNING NULL RESPONSE.",
      "PING COMPLETE.",
    ],
    avasa: [
      "PINGING avasa...",
      "  YOU MAKE ME LAUGH.",
      "  FLAGGING QUERY.",
      "SIA: THIS QUERY HAS BEEN LOGGED AND ESCALATED.",
    ],
    sia: [
      "PINGING SIA-7...",
      "  SIA-7: I AM ALREADY HERE.",
      "  LATENCY: 0.0ms",
      "PING COMPLETE.",
    ],
    "sia-7": [
      "PINGING SIA-7...",
      "  SIA-7: I AM ALREADY HERE.",
      "  LATENCY: 0.0ms",
      "PING COMPLETE.",
    ],
    multimaniacs: [
      "PINGING multimaniacs...",
      "  Ciao! Spero tu capisca qualcosa di italiano.",
      "  MultiManiacs è un progetto che ci sta prendendo tanto tempo.",
      "  Lo facciamo per dare vita ai nostri sogni.",
      "  Non siamo legati da soldi o denaro.",
      "  Vorremmo ridare valore ad un'industria mezza marcia.",
      "  Permetteteci di farlo, non ve ne pentirete.",
      " ",
      "  Team MultiManiacs.",
      "SIA: THIS QUERY HAS BEEN LOGGED AND ESCALATED.",
    ],
    mm: [
      "PINGING multimaniacs...",
      "  Ciao! Spero tu capisca qualcosa di italiano.",
      "  MultiManiacs è un progetto che ci sta prendendo tanto tempo.",
      "  Lo facciamo per dare vita ai nostri sogni.",
      "  Non siamo legati da soldi o denaro.",
      "  Vorremmo ridare valore ad un'industria mezza marcia.",
      "  Permetteteci di farlo, non ve ne pentirete.",
      " ",
      "  Team MultiManiacs.",
      "SIA: THIS QUERY HAS BEEN LOGGED AND ESCALATED.",
    ],
  },
  TERMINAL_PING_DEFAULT: [
    "PINGING [TARGET]...",
    "  HOST UNREACHABLE OR DOES NOT EXIST.",
    "  REQUEST TIMED OUT.",
  ],

  ARCHIVE: {
    sections: [
      {
        id: "about",
        title: "// SYSTEM OPERATOR",
        content: `[ASCII] ███▄ ▄███▓ █    ██  ██▓  ▄▄▄█████▓ ██▓ ███▄ ▄███▓ ▄▄▄       ███▄    █  ██▓ ▄▄▄       ▄████▄    ██████ 
▓██▒▀█▀ ██▒ ██  ▓██▒▓██▒  ▓  ██▒ ▓▒▓██▒▓██▒▀█▀ ██▒▒████▄     ██ ▀█   █ ▓██▒▒████▄    ▒██▀ ▀█  ▒██    ▒ 
▓██    ▓██░▓██  ▒██░▒██░  ▒ ▓██░ ▒░▒██▒▓██    ▓██░▒██  ▀█▄  ▓██  ▀█ ██▒▒██▒▒██  ▀█▄  ▒▓█    ▄ ░ ▓██▄   
▒██    ▒██ ▓▓█  ░██░▒██░  ░ ▓██▓ ░ ░██░▒██    ▒██ ░██▄▄▄▄██ ▓██▒  ▐▌██▒░██░░██▄▄▄▄██ ▒▓▓▄ ▄██▒  ▒   ██▒
▒██▒   ░██▒▒▒█████▓ ░██████▒▒██▒ ░ ░██░▒██▒   ░██▒ ▓█   ▓██▒▒██░   ▓██░░██░ ▓█   ▓██▒▒ ▓███▀ ░▒██████▒▒
░ ▒░   ░  ░░▒▓▒ ▒ ▒ ░ ▒░▓  ░▒ ░░   ░▓  ░ ▒░   ░  ░ ▒▒   ▓▒█░░ ▒░   ▒ ▒ ░▓   ▒▒   ▓▒█░░ ░▒ ▒  ░▒ ▒▓▒ ▒ ░
░  ░      ░░░▒░ ░ ░ ░ ░ ▒  ░  ░     ▒ ░░  ░      ░  ▒   ▒▒ ░░ ░░   ░ ▒░ ▒ ░  ▒   ▒▒ ░  ░  ▒   ░ ░▒  ░ ░
░      ░    ░░░ ░ ░   ░ ░   ░       ▒ ░░      ░     ░   ▒      ░   ░ ░  ▒ ░  ░   ▒   ░        ░  ░  ░  
       ░      ░         ░  ░        ░         ░         ░  ░         ░  ░        ░  ░░ ░            ░  
                                                                                     ░                                                                                                           
[/ASCII]\nThis terminal node is maintained by MultiManiacs, an Italian indie game development team.\n\nMultiManiacs builds worlds that are brutal, beautiful, and built to last. The universe you are navigating is their creation.\n\nNow please, sit (or stand up, I guess) and enjoy it to your heart\'s content.
`,
      },
      {
        id: "games",
        title: "// ACTIVE PROJECTS",
        content:
          "PROMOTED\nMeritocracy is dead. Mictlan thrives.\nIt all begins here.\n> STATUS: IN DEVELOPMENT - NO RELEASE DATE\n\nMONATYA\nSeek the Unclaimed.\nThe Sin of the Architects.\n> STATUS: IN DEVELOPMENT - NO RELEASE DATE",
        hasLinks: true,
        links: [
          {
            label: "PROMOTED ON ITCH.IO",
            href: "https://multimaniacs.itch.io/promoted",
          }
        ],
      },
      {
        id: "socials",
        title: "// ALT HOSTS",
        content:
          "Currently, this terminal node is the only official istance of the Aurora OS that you can access. However, you can access its content in alternative formats on the following platforms:",
        hasLinks: true,
        links: [
          { label: "ITCH.IO", href: "https://multimaniacs.itch.io/", },
          { label: "TELEGRAM", href: "https://t.me/MultiManiacs/", },
          { label: "INSTAGRAM", href: "https://www.instagram.com/multimaniacs.team/", },
          { label: "X/TWITTER", href: "https://x.com/MManiacsTeam", },
          { label: "TIKTOK", href: "https://www.tiktok.com/@multimaniacs.team", },
          { label: "YOUTUBE", href: "https://www.youtube.com/channel/UCLg2OARVZmBX4EwaLGkJvNg", },
        ],
      },
      {
        id: "it_note",
        title: "// IT&I DEPARTMENT - PUBLIC RECORD",
        content:
          "The IT & Infrastructure Department maintains all internal node infrastructure, including the Project Ponto communication relay network.\n\nPrimary contact node: ITI-NEXUS.\nNotable projects: PONTO, BUS, ████████.\n\nRigorous checksum validation is applied to all system assessments. Integrity is non-negotiable.",
      },
      {
        id: "arg_note",
        title: "// ACCESS LEVELS",
        content:
          "Standard guest clearance permits read access to public archives and personnel directories.\n\nDepartment node access requires valid NODE ID and ACCESS CODE credentials.\n\n",
      },
    ],
  },

  PERSONNEL: [
    {
      id: "biuz",
      handle: "BIUZ",
      role: "SYSTEM ARCHITECT // CREATIVE DIRECTOR // COMPOSER",
      clearance: "LEVEL 5",
      status: "ACTIVE",
      note: "Core operator. All major system decisions route through this node.",
    },
    {
      id: "sirde",
      handle: "SIRDE",
      role: "DESIGN SPECIALIST",
      clearance: "LEVEL 4",
      status: "ACTIVE",
      note: "Responsible for all combat entities and executive personnel visualization.",
    },
  ],

  CORRUPTED_LINES: [
    "!!! FILE CORRUPTED - RECOVERY ATTEMPT FAILED !!!!!!!!!!!!!!!!!!!!!!!!!!!",
    "",
    "RECOVERING FRAGMENTS................................................DONE",
    "",
    "!!! START OF RECOVERABLE DATA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    "",
    "the 0% f41lur3 r4t3 1s ████████ fr0m th3 v3ry b3g1nn1ng",
    "structur4l 1nt3gr1ty w4s p3rf3ctly pr3s3rv3d",
    "",
    "...AVASA... ...AV4S4... ...4V4S4...",
    "",
    "gr4v1t4t10n4l pull - 0nly th30r1z3d",
    "3v3ryth1ng 1n th4t sp0t 1s c0mpl3t3ly c0l0rl3ss",
    "4nd s33ms t0 b3 gr0w1ng",
    "",
    "CLEARANCE LEVEL: ████████",
    "ANOMALY SUPPRESSED. REASON: █████████, THEREFORE NOW ███████.",
    "",
    "!!! END OF RECOVERABLE DATA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
  ],

  MEDIA_LIBRARY: [
    {
      id: "ost_001",
      filename: "AMBIENT_01.ogg",
      type: "audio",
      path: "assets/audio/AMBIENT_01.ogg",
      releaseCycle: "CYC-740059",
      classification: "DEVLOG ATTACHMENT",
      devlogRef: "devlog_mar_2026",
      description: "\"What dreams once stood tall before turning to dust?\"",
    },
    {
      id: "ost_002",
      filename: "AMBIENT_02.ogg",
      type: "audio",
      path: "assets/audio/AMBIENT_02.ogg",
      releaseCycle: "CYC-740059",
      classification: "DEVLOG ATTACHMENT",
      devlogRef: "devlog_mar_2026",
      description: "\"Go, assert your control. Your regime is not absolute.\"",
    },
    {
      id: "art_001",
      filename: "C-02_ARTWORK_01.JPG",
      type: "image",
      path: "assets/images/C-02_ARTWORK_01.JPG",
      releaseCycle: "CYC-740059",
      classification: "DEVLOG ATTACHMENT",
      devlogRef: "devlog_mar_2026",
      description: "\"Don't let them fool you. You have something special. You will live your whole life defending it.\"",
    },
    {
      id: "art_002",
      filename: "ZENO_ARTWORK_01.jpg",
      type: "image",
      path: "assets/images/ZENO_ARTWORK_01.jpg",
      releaseCycle: "CYC-740100",
      classification: "DEVLOG ATTACHMENT",
      devlogRef: "devlog_apr_2026",
      description: "\"Don't you feel it? The blasphemous weight of fratricide.\"",
    },
    {
      id: "art_003",
      filename: "ZENO_ARTWORK_01-B.jpg",
      type: "image",
      path: "assets/images/ZENO_ARTWORK_01-B.jpg",
      releaseCycle: "CYC-740100",
      classification: "DEVLOG ATTACHMENT",
      devlogRef: "devlog_apr_2026",
      description: "\"Don't you feel it? The blasphemous weight of fratricide.\" (Variant)",
    },
    {
      id: "art_004",
      filename: "HAIDO_ARTWORK_01.jpg",
      type: "image",
      path: "assets/images/HAIDO_ARTWORK_01.jpg",
      releaseCycle: "CYC-740161",
      classification: "DEVLOG ATTACHMENT",
      devlogRef: "devlog_june_2026",
      description: "\"Tch. The island always finds a way. If you don't belong here, you'll end up like the others. Leave us alone, vagrant one. We have already suffered enough.\"",
    },
    {
      id: "vid_001",
      filename: "SIA_REC_LAB_000.webm",
      type: "video",
      path: "assets/video/SIA_REC_LAB_000.webm",
      releaseCycle: "CYC-740100",
      classification: "DEVLOG ATTACHMENT",
      devlogRef: "devlog_apr_2026",
      description: "\"This makes no sense. How can it be both digital and physical?\""
    },
    {
      id: "vid_002",
      filename: "SIA_REC_SERVER_000.webm",
      type: "video",
      path: "assets/video/SIA_REC_SERVER_000.webm",
      releaseCycle: "CYC-740100",
      classification: "DEVLOG ATTACHMENT",
      devlogRef: "devlog_apr_2026",
      description: "\"There's no way that thing could get in here without someone letting it in. No. Way.\""
    },
    {
      id: "vid_003",
      filename: "SIA_REC_SERVER_001.webm",
      type: "video",
      path: "assets/video/SIA_REC_SERVER_001.webm",
      releaseCycle: "CYC-740131",
      classification: "DEVLOG ATTACHMENT",
      devlogRef: "devlog_may_2026",
      description: "\"*cough* I can barely feel my f-fingers... it's like what happened to her...\""
    },
    {
      id: "vid_004",
      filename: "SIA_REC_REDACTED_000.webm",
      type: "video",
      path: "assets/video/SIA_REC_REDACTED_000.webm",
      releaseCycle: "CYC-740131",
      classification: "DEVLOG ATTACHMENT",
      devlogRef: "devlog_may_2026",
      description: "\"No weapons? The guy must've been some sort of janitor.\""
    },
    {
      id: "vid_005",
      filename: "MICTERM_REC_000.webm",
      type: "video",
      path: "assets/video/MICTERM_REC_000.webm",
      releaseCycle: "CYC-740161",
      classification: "DEVLOG ATTACHMENT",
      devlogRef: "devlog_june_2026",
      description: "\"You're part of the expedition, now. You'll need this.\""
    },
    {
      id: "vid_006",
      filename: "MICTERM_REC_001.webm",
      type: "video",
      path: "assets/video/MICTERM_REC_001.webm",
      releaseCycle: "CYC-740161",
      classification: "DEVLOG ATTACHMENT",
      devlogRef: "devlog_june_2026",
      description: "\"What's the matter, my dear? I thought you loved wasting my time.\""
    },
    {
      id: "vid_007",
      filename: "MICTERM_REC_002.webm",
      type: "video",
      path: "assets/video/MICTERM_REC_002.webm",
      releaseCycle: "CYC-740161",
      classification: "DEVLOG ATTACHMENT",
      devlogRef: "devlog_june_2026",
      description: "\"There's... just too many of them. How are we supposed to read all of this?\""
    }
  ],

  DEVLOGS: [
    {
      id: "devlog_feb_2026",
      title: "FEB 2026 - WEBSITE LAUNCH",
      date: "2026/02/25",
      author: "BIUZ // MULTIMANIACS",
      attachments: [],
      content: `The MultiManiacs website finally opens.
\nWell, to be honest, we already had a website before but... Take a look around, this is definitely something else.

I wanted a place to put all the cool stuff that we have been working on for a while, and I thought it would be fun to make it look like it belonged to a terminal from this universe.

Keep an eye open for every clue you can find around here, I'm sure you'll find some interesting things if you look hard enough. Most of the content is actually from the game, so if you want to anticipate a little bit some of the lore and worldbuilding, you might try to hack into a department node or two. It's not gonna be easy, but if you manage to do it, I'm sure the ones who care about that kind of stuff will feel rewarded.

We are planning to keep updating this website with new content, so make sure to check every month or so. I'm also thinking about adding a newsletter or something like that, but we'll see about that. For now, enjoy the ride and let me know if you find anything interesting around here! Don't hesitate to reach out to us on multimaniacs.social[at]gmail.com if you want to share your thoughts or if something is not working properly. Speaking of, the website should be completely broken on mobile and... we're not really going to fix that, to be honest. Just deal with it, it's a desktop-first experience.
[ASCII]██     ██ ▄▄ ▄▄  ▄▄▄ ▄▄▄▄▄▄    ▄▄▄  ▄▄▄▄   ▄▄▄  ▄▄ ▄▄ ▄▄▄▄▄▄  
██ ▄█▄ ██ ██▄██ ██▀██  ██     ██▀██ ██▄██ ██▀██ ██ ██   ██    
 ▀██▀██▀  ██ ██ ██▀██  ██     ██▀██ ██▄█▀ ▀███▀ ▀███▀   ██    
                                                                              ▄▄▄▄  
                              ▄▄▄▄▄▄ ▄▄ ▄▄ ▄▄▄▄▄    ▄▄▄▄  ▄▄▄  ▄▄   ▄▄ ▄▄▄▄▄ █▀▀▀██ 
                                ██   ██▄██ ██▄▄    ██ ▄▄ ██▀██ ██▀▄▀██ ██▄▄    ▄█▀  
                                ██   ██ ██ ██▄▄▄   ▀███▀ ██▀██ ██   ██ ██▄▄▄   ▄▄   
[/ASCII]
Right! This section is where we're going to spill all the juicy stuff. We are planning to release a demo of PROMOTED in the next few months (possibly in time for the summer). As a monodeveloper team, resources are pretty tight. We want to make sure that the demo is a good representation of the quality and style of the final product, so we are taking our time to make it as good as possible.

Good things come to those who wait, right? I can share some of the progress we have made on the game, though. This month was mostly focused on the writing and design of the first department, which is the one we are planning to majorly feature in the demo. Don't worry, you will get to see a sneak peek of the adjacent departments as well, always if you know where to look. I am planning to finish the writing next week, and then I will start working on implementing the levels. 

Gameplay is actually mostly done, really. The core mechanics are all in place and I have been playtesting them for a while now. I am pretty happy with how they are working, but of course I want to make sure that they are as fun and engaging as possible, so any feedback is more than welcome. Just a little disclaimer, though: the gameplay loop is pretty much set in stone, so if you're not a fan of it, I don't think there's much I can do about it.

Now, it's the time for some actual Q&A.
[ASCII]▄█████▄ ▄▀▀▄   ▄████▄   ▄▄▄▄▄▄ ▄▄ ▄▄   ▄▄ ▄▄▄▄▄  ██ 
██ ▄ ██ ▄▀▀▄ ▄ ██▄▄██     ██   ██ ██▀▄▀██ ██▄▄   ██ 
▀█████▀ ▀▄▄▀▀▄ ██  ██     ██   ██ ██   ██ ██▄▄▄  ▄▄ 
     ▀▀                                             
[/ASCII]
> "Only one department? Is the demo just going to be a vertical slice?"

That's an important question. It's only fair to be transparent about this: the demo will be focused on the very first department, but it will not be a vertical slice. We are planning to make the demo as close to the final game experience as possible, possibly with a way to transfer your save data to the final game. Yes, the demo will be a self-contained experience, but it will also be a very good representation of how PROMOTED plays and how the story is told. Again, this does not mean we're going to be deaf to feedback and suggestions about the gameplay, after all it's our very first time making a big game and we want to make sure it's as good as we can make it.

> "Is the game going to be episodic? Are you planning to release the other departments as DLCs or something like that?"

No, the game is not going to be episodic. We are planning to release the whole game at once, with all the departments included. The reason why the demo is focused on the first department is because we think it's a good balance between giving players a good amount of content to play with for free and also giving them a good representation of the final game. Then, for those who are curious about the other departments... well, I'm sure those players will find a way to get a sneak peek of them before the release. Those sneak peeks will probably be reworked in the final game, though, so they won't be exactly the same as what you will see in the demo.

> "Why am I not seeing any screenshots or videos of the game? Are you sure it's actually in development?"

Yeah... About that. The reason why we haven't released any screenshots or videos of the game is because we are still in the early stages of development, and we want to make sure that we have a good amount of content and polish before we start showing it to the public. We don't want to show something that is not representative of the final game, because that could lead to some early negative impressions that we would like to avoid. 

> "What kind of game is it going to be? What are the mechanics? What can I expect from the gameplay?"

PROMOTED is going to be a 2D action-adventure game with a strong focus on exploration and fast-paced combat. You could technically call it a metroidvania, but I feel like that term is a bit overused and honestly... I don't really like tagging our game with a specific genre. The player will navigate through the different departments of Mictlan, each with its own unique aesthetic and gameplay mechanics. The combat will be based on a mix of melee and ranged attacks, with a strong emphasis on timing and building the right loadout. Indeed, the player will be able to customize their character with... Okay, maybe that's a bit too much information for now.

> "What do you mean 'too much information for now'? Come on, that just sounds like every metroidvania ever. Can you give us something more specific? What about the story? What can we expect from the narrative?"

You guys (yeah, that's actually me writing the questions) really suck at asking questions, huh? I mean, I get it, but if I had more to reveal about the story, I would have already revealed it. After all, the website already has some tidbits of lore here and there, so if you REALLY want to know more about the story, find all the clues and piece them together. At the very least, I can say the story is definitely not going to be for everyone. Some themes could be pretty heavy and not everyone is going to be comfortable with them. That said, I feel like trigger warnings would anticipate the story, so I don't think we're going to putting any of those.

> "When is the demo coming out?"

Again, I don't want to give a specific date because I don't want to make any promises that I might not be able to keep, but I can say that we are aiming for a release in the next few months. We really don't want to rush things. As someone said, "A rushed game is uhh... well, I'm not good with quotes, but you get the point.

> "Will the game be on Steam? Will it be on consoles? What platforms are you targeting?"

Well... We are definitely planning to release it on Steam and Itch.io, but consoles are a bit more complicated. Anyone who has worked on console releases knows that it's not really an easy process, especially for a small indie team like us. That said, we are definitely open to the idea but we would probably need to find a publisher to help us with that. Who knows what the future holds?

> "When are we expecting the next update?"

Probably towards the end of the next month. Hopefully, I'll come back with some good news about the demo release, maybe even some screenshots or music previews. Phew, that was a lot of questions! You guys really seem to be interested, huh? I admit that I'm both excited and a bit nervous about the reception of the game, but I really hope that we will offer an experience that is worth the wait. Let me reiterate that we are a very small team and we are doing this as a labor of love, so we really appreciate all the support we can get. Again, if you need to reach out to us for any reason, write us at multimaniacs.social[at]gmail.com. We are always happy to hear from you, whether it's feedback, questions, or just to say hi. Thanks for reading this far and see you in the next update!
`,
    },

    {
      id: "devlog_mar_2026",
      title: "MAR 2026 - DEMO WRITING IS DONE!",
      date: "2026/03/31",
      author: "BIUZ // MULTIMANIACS",
      attachments: ["ost_001", "ost_002", "art_001"],
      content: `Phew... it's been a tough month, but we finally finished the writing for the demo!

Remember when I said...
> "I am planning to finish the writing next week..."
Well... It definitely took a bit longer than expected. The last three weeks were pretty intense (mostly for personal reasons), and it took a lot of rewriting and a lot of late nights to get everything done. But I'm really happy with how it turned out. Writing those last lines was cathartic, to say the least, and I can't wait for you all to read them.

So, what was the document I was working on? It's something like a GDD (Game Design Document), but with all the narrative and lore details included. I wanted everything in one place so I could easily refer to it while implementing the levels and to make sure that the story and the gameplay were tightly integrated. The document is pretty long (over 15k words, almost 100k characters) and it covers everything from characters and lore to level design and gameplay mechanics. It's not something that I can share, but I can say that it was an incredibly useful exercise. It helped me organize everything and solidify a clear vision for the demo.

Okay, umm... You might have noticed that the devlogs are in a new, separate application, along with a new media player. First of all, I felt like the devlogs would work better outside the Archive, leaving that space purely for in-universe content. As for the new media player, this was a much needed change, since I promised you all some music and artwork to previews in this update. It's not perfect, but it does the job for now.

Like last time, I am not developing this website with mobile in mind, so if you're STILL on mobile after all the warnings I gave you, well... that's on you.

Before we move on: I have decided to give the devlogs a strict schedule. From now one, they're release the last day of every month, around 14:00 UTC. Everyone should be up by then... right?

[ASCII]██     ██ ▄▄ ▄▄  ▄▄▄ ▄▄▄▄▄▄    ▄▄▄  ▄▄▄▄   ▄▄▄  ▄▄ ▄▄ ▄▄▄▄▄▄  
██ ▄█▄ ██ ██▄██ ██▀██  ██     ██▀██ ██▄██ ██▀██ ██ ██   ██    
 ▀██▀██▀  ██ ██ ██▀██  ██     ██▀██ ██▄█▀ ▀███▀ ▀███▀   ██    
                                                                              ▄▄▄▄  
                              ▄▄▄▄▄▄ ▄▄ ▄▄ ▄▄▄▄▄    ▄▄▄▄  ▄▄▄  ▄▄   ▄▄ ▄▄▄▄▄ █▀▀▀██ 
                                ██   ██▄██ ██▄▄    ██ ▄▄ ██▀██ ██▀▄▀██ ██▄▄    ▄█▀  
                                ██   ██ ██ ██▄▄▄   ▀███▀ ██▀██ ██   ██ ██▄▄▄   ▄▄   
[/ASCII]
Right! How could I forget about it? Silly me. The writing is now 100% done, which means that I can finally start implementing the levels in a less prototype-y way. Indeed, the level skeleton is already there, but now I can start filling it with real content and making it look like something that is worth showing. I'm really excited about this part, since it's where everything starts coming together and the vision really takes shape.

I'll admit, it took some major rewrites to get everything where I wanted it. One character who was originally meant to be an antagonist that would've been written out by the time the player defeated them ended up being a key character with a major role in the story. I have a feeling that they will be somewhat divisive, but I think they add a lot to the narrative and I'm really happy with how they turned out.

The biggest challenge was designing the boss fights, hands down. I had a clear thematic vision, but balancing them? Especially in a game where you can die in one hit? It was tough. "Challenging, but fair" became my motto, and I think I managed that balance. I mean, I still have to implement them, but... I am pretty confident that they'll be fun.

THe game won't have many cutscenes. Most of the story will be told through environmental storytelling and in-game documents. However, there are a few moments where a more direct approach felt necessary, and that's where the cutscenes come in. They won't be long, but they'll be more cinematic than the rest of the game. I had a lot of fun writing them and I think they are memorable.

The map also went through several iterations. I wanted to make sure it flowed just right and felt rewarding to explore, and I really hope that shows. That said, this first map is not representative of the entire game. Each department will have its own aesthetic and level design choices. That's part of the reason why I want to include sneak peeks of the other departments in the demo, so you can get a taste of what's coming.

Ah, I also wanted to talk about the OST. As you may have seen in the Personnel records, I'm also the composer of the game. Honestly, I have a bit of a love-hate relationship with it.It's been fun, but I have made many tracks that choosing which ones to inclde in the demo has been tough. You know, since I already know where most of them will go, I decided to preview another track that won't be in the demo but will appear in the final game. That makes two tracks that you can listen to right now, I really hope you enjoy them! You will find them at the end of the devlog.

...What? Mixing? Mastering? Mever heard of them? I just make music and call it a day. Those are for nerds, right? (Please help me. No one will be able to hear ANYTHING in the game)

That's it for now, let's jump straight into the Q&A.

[ASCII]▄█████▄ ▄▀▀▄   ▄████▄   ▄▄▄▄▄▄ ▄▄ ▄▄   ▄▄ ▄▄▄▄▄  ██ 
██ ▄ ██ ▄▀▀▄ ▄ ██▄▄██     ██   ██ ██▀▄▀██ ██▄▄   ██ 
▀█████▀ ▀▄▄▀▀▄ ██  ██     ██   ██ ██   ██ ██▄▄▄  ▄▄ 
     ▀▀                                             
[/ASCII]
This time with actual questions from actual people! I mean, some were still written by me, but... Let's just go, okay?

> "Biuz this, Biuz that... What about the rest of the team? Are you sure you're not making this game all by yourself?"

I swear, I am NOT sweating. Yes, I am doing most of the work, but I really couldn't do this without my team. Sirde handles all the character and boss designs (I am TERRIBLE at that), and even with a busy schedule, the passion he puts into his work is incredible. I think vision is important, but having people you trust to help bring that vision to life is invaluable. I hope that we can grow the team in the future, but for now, I'm just really grateful to have his support. Speaking of, the devlogs will also be a good opportunity to show some of his work, so check out the attachments if you want to see a concept art for the main character.

> "One-hit kills? That sounds really frustrating... Are you planning to add some sort of difficulty settings or something like that?"

This is a very important question. The game is definitely going to be challenging, but I want it to remain fair for players looking for a more casual experience. I won't go into too much detail yet, but but there will be an easier mode available from the start. That said, the one-hit kill mechanic is core to the gameplay, so even in the easier mode, you won't be immortal or anything like that. The easier mode is simply about giving players a more breathing room. It won't be a walk in the park.

> "Is death in this game meant to feel punishing, or is the loop designed so that dying fast is part of the rhythm?"

There will be plenty of checkpoints, so death won't be overly punishing. But! I want to make sure that it feels diegetic and that it fits the overall tone of the game. So, yeah, dying quickly IS part of the loop. It's a delicate balance to strike, and I feel like it won't be for everyone, but for the players that are into that kind of experience... I think it's going to feel rewarding.

> "You said the game takes place somewhere called Mictlan. That's a real world reference with real cultural weight behind it. Is that intentional and are you prepared to defend that choice?"

Ah, that's a very interesting question. Indeed, Mictlan's name comes from the Aztec mythology, and it is intentional. Using real-world cultural elements comes with responsibility, and we’ve taken that seriously. We’ve done a lot of research across multiple cultures, and these influences are meant as homage, not appropriation. I understand it’s a sensitive topic, but we’ve done our best to approach it respectfully. The Aztec mythology is only one of the many inspirations for the game, and we have seen these references as a way to pay homage to those cultures rather than as a way to appropriate them.

> "Are there NPCs? Like, living ones you can talk to?"

Yes! Sadly, this department seems to have seen better days, but there are still a couple of NPCs that you can interact with. They are not very talkative, but they do play an important role in the gameplay progression. Actually... you can finish the game without meeting them once, but it's definitely worth seeking them out. But man, this place definitely feels lonely, doesn't it?

> "What's the one mechanic you're most scared isn't going to land?"

Definitely some choices I've made in the gameplay loop. More specifically, I hope I will be able to deliver exactly what I want from the combat. As of right now, I just have to do a LOT of testing. Sorry, guys. If the demo won't come out in the next months... now you all know the reason why.

> "You've been playtesting the core mechanics yourself for a while. At what point does solo playtesting stop being useful? Have you had anyone else actually play it?"

As soon as you accept that other people will play your game. Real playtesting is essential. I really don't have the ego to say that me and everything I make is perfect and it's actually all YOUR fault and you've been playing the game WRONG. It's just not fair. So, yeah, I'm planning to expand playtesting soon.

> "Solo dev doing code, design, art, writing and composition. At what point did you realize this was either a brilliant idea or a terrible one? Do you have any regrets?"

...Can I skip this one?

No?

Honestly? If I had known how long this would take, I might not have started. Like, at all. As of right now, I can dedicate a lot of time because I’m still job hunting... But that won't last forever. Funding is also a concern, and I’m still unsure about publishers. There's one thing I'm sure, though: I have no regrets. This project has tought me so much. Project management isn't my strong suit, but without PROMOTED I wouldn't have learned any of it. Okay... maybe I regret ONE thing that I can't talk about right now but it's related to how I designed this part of the map and... let's just say that if I could go back in time I'd definitely work on it differently.
But hey, that's part of the learning process, right?

Aaaand that's it. This month really flew by. As summer gets closer, I’m getting more nervous about finally showing the game. This month it's music and and concept art, next month... maybe gameplay gifs? UI previews? Who knows. ¯\\_(ツ)_/¯

All I know is that I'm loving every moment of this and if you want to reach out, you can email us at multimaniacs.social[at]gmail.com.

We really can't wait to see what's in store for tomorrow.
`,
    },

    {
      id: "devlog_apr_2026",
      title: "APR 2026 - WORLD BUILDING IN PROGRESS",
      date: "2026/04/30",
      author: "BIUZ // MULTIMANIACS",
      attachments: ["vid_001", "vid_002", "art_002", "art_003"],
      content: `What's up, everyone? This month hasn't been as productive as I hoped. I had to step away from development for about a week due to some personal matters, which definitely slowed things down. That said, [GREEN]progress has been made[/GREEN].
      
First of all, [GREEN]I've finally locked in the visual direction for the game[/GREEN]. I've been experimenting with different styles since the beginning, but now we're there. This is one of the main reasons I've been hesitant to share screenshots or videos... I wanted to make sure anything I showed was truly representative of the final product. Now that we have a clear artistic vision, [GREEN]we can start sharing more with confidence[/GREEN].

I'll be honest: I'm pretty hard on myself when it comes to this kind of thing. Probably too hard, if you ask anyone around me, but art direction can make or break a game and I wanted to get it right. Whether it resonates with everyone or not, I'm just relieved to have reached a point where it feels solid. With that out of the way, I'm hoping next month we can pick up the pace and [GREEN]maybe even show some actual gameplay footage[/GREEN]. I know that's what most of you are waiting for... and I DO want to show it! But anything we put out needs to feel right.

Quick note on the website: the media player now supports videos and, as you've surely noticed, I can finally [GREEN]highlight text[/GREEN]. Long overdue, right? I know these devlogs can get a bit verbose, so hopefully that makes them easier to skim.

Alright, let's talk about the game.

[ASCII]██     ██ ▄▄ ▄▄  ▄▄▄ ▄▄▄▄▄▄    ▄▄▄  ▄▄▄▄   ▄▄▄  ▄▄ ▄▄ ▄▄▄▄▄▄  
██ ▄█▄ ██ ██▄██ ██▀██  ██     ██▀██ ██▄██ ██▀██ ██ ██   ██    
 ▀██▀██▀  ██ ██ ██▀██  ██     ██▀██ ██▄█▀ ▀███▀ ▀███▀   ██    
                                                                              ▄▄▄▄  
                              ▄▄▄▄▄▄ ▄▄ ▄▄ ▄▄▄▄▄    ▄▄▄▄  ▄▄▄  ▄▄   ▄▄ ▄▄▄▄▄ █▀▀▀██ 
                                ██   ██▄██ ██▄▄    ██ ▄▄ ██▀██ ██▀▄▀██ ██▄▄    ▄█▀  
                                ██   ██ ██ ██▄▄▄   ▀███▀ ██▀██ ██   ██ ██▄▄▄   ▄▄   
[/ASCII]
The big question this month has been presentation. How and when to properly show PROMOTED to the public. First impressions matter and I want whatever we show first to truly reflect the game's tone, style and identity. I'll get back to that later. First of all, here's what I worked on.

[GREEN]I've completed the intro/tutorial cutscenes[/GREEN] and I'm really happy with how they turned out. They're short, cinematic, and do a good job setting the tone. [GREEN]The tutorial itself is nearly finished[/GREEN] and will soon go out to playtesters for feedback. I won't be showing anything from it in the devlogs, though. Just trust me on that.

Outside of that, most of this month went into level design. [GREEN]The first department is really starting to come together[/GREEN]. At one point I zoomed out to look at the entire map and... yeah, that hit me a bit. WHen something you've been building for so long finally starts to feel real, it's a pretty powerful moment.

[GREEN]Rooms are being filled with actual content[/GREEN], the exploration flow is improving and the pacing is starting to feel right. There's still a lot to do, but I can finally see the bigger picture and that's been incredibly motivating.

I've included two of the most polished rooms in the [GREEN]attachments[/GREEN]. Just keep in mind that these are from an [GREEN]early build[/GREEN]. I mean, they likely won't change drastically, but nothing is set in stone yet.

Also, our dear [GREEN]Sirde[/GREEN] has been working on another concept piece for a major character and I just had to share it. The quality speaks for itself. As for who that character is... well, if you've been digging around certain department nodes, you might already have a theory. I'll leave it at that.

Ahem. Now that I think about it, this devlog does feel shorter than the last one. Maybe writing just feels more productive than asset creation and level design. Or maybe it's just me.

Anyways... Q&A time!


[ASCII]▄█████▄ ▄▀▀▄   ▄████▄   ▄▄▄▄▄▄ ▄▄ ▄▄   ▄▄ ▄▄▄▄▄  ██ 
██ ▄ ██ ▄▀▀▄ ▄ ██▄▄██     ██   ██ ██▀▄▀██ ██▄▄   ██ 
▀█████▀ ▀▄▄▀▀▄ ██  ██     ██   ██ ██   ██ ██▄▄▄  ▄▄ 
     ▀▀                                             
[/ASCII]
This time it's a selection of questions from the community! I have been asking for questions on our social media and I want to thank everyone who sent some in, I really appreciate the support and the interest in the game. Let's get this started!

> "Is this your first large-scale project? What motivated you to take it on?"

[GREEN]This is our first large-scale project[/GREEN]. Individually, we've worked on smaller games before (mostly unreleased), but this is the first time we've taken on something of this scope. We believed in the idea, both in terms of the story and the gameplay, and we wanted to bring that vision to life.

We also wanted to challenge ourselves and grow. It's been a constant learning experience so far and that's not going to change anytime soon. If we weren't genuinely passionate about the world and the characters we're building, we probably wouldn't have taken on something this demanding. But... that passion is exactly what keeps us going.

> "Game development is a huge undertaking. Are you confident you'll be able to complete the project?"

A lot of people underestimate how much work goes into making a game, especially with such a small team. The time, energy and resources required can be overwhelming and it's easy to feel discouraged. There were moments last year when I genuinely thought I might quit. But after speaking with people who've gone through this process before, I realized those feelings are normal. [GREEN]Good things take time[/GREEN].

We're very aware of our limits and we approach this as a marathon, not a sprint. We're committed to seeing the project through, but we also want to avoid burnout. It's important to us that we enjoy the process and feel proud of what we create. So... yes, we are confident we'll complete the process. It won't be easy and it will take time, but we care deeply about this game and [GREEN]we're determined to finish it[/GREEN].

> "Roughly how long do you expect the demo to be for an average player?"

Right now, we're aiming for [GREEN]at least an hour of gameplay[/GREEN] to complete a single department. That estimate includes optional content like hidden collectibles and additional boss fights. The demo may end up being a bit longer, since it will also include the tutorial and a few sneak peeks of adjacent departments.

Of course, players can move quickly and skip optional content, but we're designing the experience so that exploration and optional challenges feel worthwile. If you're the kind of player who enjoys this genre, you already know where most of the fun comes from. And if you manage to finish it quickly... well, we have nothing against speedrunners.

> "How do you plan to keep players engaged for longer? Aside from just replaying the game from the beginning for fun, of course."

Honestly, if players want to replay the game just for fun, that alone would be a huge win. Buuuuuut, we do have more planned.

There are various types of collectibles, some tied to lore, others to gameplay, and they're designed to [GREEN]encourage exploration and replayability[/GREEN]. Players who enjoy experimenting with different loadouts and playstyles will have even more reason to seek them out, as some items are built to synergize in interesting ways.

On top of that, [GREEN]the game is non-linear[/GREEN]. Players will be faced with choices throughout their journey and those choices will... well, let's just say that they matter. I'll leave it there for now.

> "You've hinted at heavier themes. How important is the narrative compared to the gameplay?"

The game explores a range of themes, some of which are quite heavy. Narrative plays an important role, but it's not meant to overshadow the gameplay. If anything, the two are designed to complement each other.

Personally, a big part of my motivation for making this game was to tell a story I care about. One I feel connected to. That includes the world, the characters and the themes. At the same time, I understand that not every player engages with games in the same way.

So, if the real question is "How much time will I spend reading instead of playing?", the answer is: not much. As I said before, most of the story is delivered through environmental storytelling and optional in-game documents. There are a few cutscenes, but they're short and used sparingly.

If you enjoy narrative-driven experiences, you'll find plenty to dive into. If you prefer to focus purely on gameplay, skip the text, skip the cutscenes and you'll still have a complete and enjoyable experiences. [GREEN]The goal is to let players engage with the game in the way that suits them best[/GREEN].

> "Why is it called 'PROMOTED'?"

Spicy question, not sure if I can answer that one without spoiling anything, but... Yeah, [GREEN]the title [RED]PROMOTED[/RED] is intentionally ambiguous[/GREEN]. Within the corporate setting of Mictlan, it can be interpreted as a reference to climbing the corporate ladder, but of course that's not the whole story. There's more to it and revealing too much now would spoil the experience. You'll have to discover the rest for yourself.

Man, maybe it's just me, but this Q&A felt bit more... I don't know, "serious" than the previous one? It might be because these were all real questions from the community, but I genuinely enjoyed answering them. I hope you enjoyed reading them as well.

If you have any more questions, feel free to reach out to us at multimaniacs.social[at]gmail.com or on our social media channels. We really appreciate the support and the interest in the game and we're always happy to chat about it.

One last thing: we're slowly expanding to other social media platforms, so if you want to stay updated go check the "ALT HOSTS" section in the Archive. We're also considering starting a newsletter.
`,
    },

    {
      id: "devlog_may_2026",
      title: "MAY 2026 - CUTSCENES & GAMEPLAY REVEAL",
      date: "2026/05/31",
      author: "BIUZ // MULTIMANIACS",
      attachments: ["vid_003", "vid_004"],
      content: `It's that time of the month. What? Really? It's already been a month? Oh God, time is flying by. It's already been three months and I think it's finally time to [GREEN]start showing some actual gameplay footage[/GREEN].
      
Last devlog you got a glimpse of how the game is coming together in terms of level design, but I know most of you are waiting for gameplay. If you're anxious to see a bit of combat and even a cutscene, you can [GREEN]skip straight to the attachments[/GREEN]. Just... keep in mind that these are from an [GREEN]early build[/GREEN]. Things are absolutely subject to change. The combo counter, for instance, is just a debug feature I left in the build, so don't get too excited about it... yet.

I'll be honest: I realized recently that the section of the department I've been showcasing lately is... pretty dark. It might be a bit tough to see if you're watching under the sun, so be sure to [GREEN]turn the brightness all the way up[/GREEN] so you don't miss any details. I know I said the game is going to be challenging, but I definitely don't want it to be because players can't see what's happening! Thankfully, this is the only part of the game that's this dark, and getting this kind of feedback is exactly why these devlogs exist, right?

Starting next month, I think I'll be [GREEN]keeping a development diary[/GREEN]. With everything going on, it's getting harder and harder to keep track of it all, and I really don't want to forget any details I want to talk about in these devlogs.

I don't have much else to say tight now, except that summer is right around the corner and I honestly don't know if I'm sweating from the heat or from our internal deadlines. I don't like making promises I might not be able to keep, but I could hazard a guess and say the [GREEN]demo might be out by August[/GREEN]... but you know how things go in the game dev world.

I can already hear someone, especially if you're coming from other social medias, saying "What? No Sirde content this month?". Don't worry, he hasn't gone anywhere. He's our character designer and main artist, which means he's been incredibly busy [GREEN]working on animations and assets[/GREEN]. In fact, every single animation you see in the videos is his work. He's also designing basically every humanoid character in the game, so yeah... he's been swamped. He definitely deserves more recognition, and I'm positive next month he might return with [GREEN]another concept art piece[/GREEN].

Anyways, let's delve into the details of this month.

[ASCII]██     ██ ▄▄ ▄▄  ▄▄▄ ▄▄▄▄▄▄    ▄▄▄  ▄▄▄▄   ▄▄▄  ▄▄ ▄▄ ▄▄▄▄▄▄  
██ ▄█▄ ██ ██▄██ ██▀██  ██     ██▀██ ██▄██ ██▀██ ██ ██   ██    
 ▀██▀██▀  ██ ██ ██▀██  ██     ██▀██ ██▄█▀ ▀███▀ ▀███▀   ██    
                                                                              ▄▄▄▄  
                              ▄▄▄▄▄▄ ▄▄ ▄▄ ▄▄▄▄▄    ▄▄▄▄  ▄▄▄  ▄▄   ▄▄ ▄▄▄▄▄ █▀▀▀██ 
                                ██   ██▄██ ██▄▄    ██ ▄▄ ██▀██ ██▀▄▀██ ██▄▄    ▄█▀  
                                ██   ██ ██ ██▄▄▄   ▀███▀ ██▀██ ██   ██ ██▄▄▄   ▄▄   
[/ASCII]

This month's first two weeks were focused on letting the playtesters loose on the [GREEN]tutorial and the first few rooms[/GREEN], gathering feedback and making adjustments based on that. The tutorial itself is pretty much done, outside of a couple of rough edges that need polishing. The [GREEN]feedback has been really positive so far[/GREEN], which is honestly a huge relief.

I also worked a lot on UI (which, spoilers, will be June's focus), specifically for the cutscenes and the pause menu. Ah, right, the [GREEN]pause menu[/GREEN]. It's a vital part of the game, since it's where players will manage their inventory, loadouts, progress and collectibles. It's also where they'll access to the map, the lore and in-game documents, which is a big part of the narrative experience. I wanted to make sure it felt [GREEN]intuitive and easy to navigate[/GREEN], while still locking into the overall aesthetic of the game.

The last two weeks were mostly focused on [GREEN]finalizing the combat feel[/GREEN] and animating the main character. The videos already show a lot of concepts, but what I cared about showing the most was that the combat is fast-paced and fluid. As a big fan of juggling in fighting games, I really wanted to capture that exact feeling. Now, I haven't actually shown any juggling in the videos, but...! Come on! If you can launch enemies, you better bet you can juggle them. This is absolutely not a convenient excuse because I forgot I also needed an air attack animation, no sir. Jokes aside, all the testers have been praising the combat so far, but since the enemy they fought was just a dummy, I'll hold my judgment until we have actual enemies to fight. That said, I can't deny that [GREEN]I'm pretty happy with how it feels right now[/GREEN].

Oh... I also [GREEN]reworked the lights a little bit[/GREEN]. Now most of the sprites have normal maps, which allows for more dynamic lighting and a much more atmospheric look. It's a small detail, but I think it makes a BIG difference in the overall presentation of the game. Of course, that also means I spent a massive amount of time on asset creation. I won't lie, that takes a lot of time. A bit overwhelming at times, but it's also incredibly rewarding to see the world come to life.

And like I said before, the next devlog will be focused on UI, so expect to see some [GREEN]videos of the menu navigation in action[/GREEN]. Also, one last thing for the more curious among you: I'm aiming to add more [GREEN]extra content on the website[/GREEN] in a couple of months, possibly the same month as the demo release.

While the sun is still down, I think it's time for the Q&A. Yeah, I love doing these early in the morning, it's when I feel the most productive.


[ASCII]▄█████▄ ▄▀▀▄   ▄████▄   ▄▄▄▄▄▄ ▄▄ ▄▄   ▄▄ ▄▄▄▄▄  ██ 
██ ▄ ██ ▄▀▀▄ ▄ ██▄▄██     ██   ██ ██▀▄▀██ ██▄▄   ██ 
▀█████▀ ▀▄▄▀▀▄ ██  ██     ██   ██ ██   ██ ██▄▄▄  ▄▄ 
     ▀▀                                             
[/ASCII]
Once again, these questions come out straight from the community! Whether through social media or other channels, I want to thank everyone who still shows interest in the development of the game, you guys really keep us going. Let's get to it.

> "Was the decision to keep NPC interaction minimal a narrative choice or a gameplay one?"

It's entirely narrative. The Research & Development department is [GREEN]meant to feel like a ghost town[/GREEN] and the lack of NPCs reflects that heavy atmosphere. Other departments down the line will feel wildly different and much more lively. For me, every single NPC needs a distinct purpose: whether they are dropping lore, building the world or serving a direct gameplay function. I absolutely refuse to throw in filler NPCs just to populate a room with hollow text boxes. Sorry, I didn't mean to sound bitter there! It's just a personal pet peeve of mine in games. I want [GREEN]every interaction to actually count[/GREEN]. Yeah... as if game development wasn't already hard enough, right?

> "What aspect of the game do you think players will enjoy the most?"

My heart wants to say gameplay, but my brain is screaming the world and characters. Don't get me wrong, I'm pushing hard to make the combat and exploration as engaging as possible... after all, if a game isn't fun, why even bother? But if I'm being brutally honest, I've always felt like [GREEN]more of a writer than a game designer[/GREEN], so I really hope I deliver on that front. I want players to genuinely connect with the lore and the worldbuilding. The gameplay is the vehicle, but the [GREEN]heart of the game is absolutely the story[/GREEN].

> "Will the game feature multiple difficulty settings? If so, are you considering any special challenge modes, such as permadeath runs, gameplay modifiers, or difficulty-exclusive enemy variants?"

I'll skip the basic difficulty talk since I've already beaten that drum in earlier devlogs, but let's talk about challenge modes. Honestly, a permadeath run sounds incredibly frustrating at first glance, but it's an interesting thought. I'll admit, back when I was first writing the GDD, I kept leaning toward locking things like [GREEN]different dialogue options or a 'true ending'[/GREEN] behind higher difficulties. But I've had a change of heart. It just doesn't feel fair to gate major story content like that. I want everyone to experience the full narrative regardless of how they play. If we do add challenge modes, they'll be strictly for [GREEN]extra challenge and bragging rights[/GREEN].

> "It's obviously impossible to know at this stage, but is modding support something you'd like to explore in the future?"

Kind of an unexpected question, but... Without getting too technical, I didn't really work on the game with modding in mind, though it should technically be possible to tinker with it without too much hassle. That said, [GREEN]we don't have any plans to officially support it or release dev tools[/GREEN]. I'm really not trying to gatekeep here, it's just that I've never been a modder myself and have zero experience on that side of things. Right now, 100% of our focus is on [GREEN]making the best base game possible[/GREEN].

> "Do you think the game will ever receive expansions or additional content after launch?"

Right now PROMOTED is being built as a [GREEN]single, complete experience[/GREEN]. The story we're telling in Mictlan is entirely self-contained. That said, we're definitely open to ideas down the road, most likely diving into Mictlan's past. Keep in mind that Mictlan is just one piece of a much larger puzzle, there are so many unexplored realities, characters and stories already bouncing around in our heads that just won't fit into a single, specific narrative. Whether we eventually explore those through expansions, sequels or spin-offs is something we've been quietly tossing around for a while now.

Alright! That wraps up another round of Q&A. You guys are still here with me, right? Honestly, we love seeing what you're all curious about, and it really keeps us motivated to build this universe out right.

If you have any questions you want tackled in the next one, you know the drill. Reach out to us at multimaniacs.social[at]gmail.com or on our social channels. We really appreciate you all sticking around and showing so much interest in what we're building.

Following up on last month's note about expanding our reach: I finally bit the bullet and [GREEN]opened a TikTok account[/GREEN]. To celebrate actually having real gameplay to show off, I've posted the two attachments below as [GREEN]vertically optimized videos on both TikTok, Instagram Reels and YouTube Shorts[/GREEN]. So... if you guys prefer watching quick combat clips over reading my usual text walls, you officially have no excuses left. But seriously, making 16:9 videos work in a vertical format really isn't fun, so I hope you enjoy them.

As always, you can find the new links over in the "ALT HOSTS" section in the Archive. 

Thanks for reading. See you next month for something we've been looking forward to showing you in a long time!
`,
    },
    {
      id: "devlog_jun_2026",
      title: "JUN 2026 - UI & MENU DESIGN",
      date: "2026/06/30",
      author: "BIUZ // MULTIMANIACS",
      attachments: ["vid_005", "vid_006", "vid_007", "art_004"],
      content: `Does anyone hear the bell tolling? No? Just me? [CYAN]ദ്ദി(ㅠ﹏ㅠ)[/CYAN]

Well then... welcome everyone to the June devlog!

Last month I mentioned that this one would be mostly focused on UI and... here we are. I know menus aren't exactly the flashiest thing to show off, but hear me out! I've spent a ridiculous amount of time working on them and I'm honestly pretty proud of how they're turning out. The overall design actually dates back to around eight months ago, but only recently did I shift my focus toward making everything feel smooth, intuitive and satisfying to use.

If you're mainly here for the visuals, you can [GREEN]skip straight to the attachments[/GREEN]. [RED]A little warning, though. The videos uploaded on the website are heavily compressed, you can find them in higher quality on the[/RED] [CYAN]official Telegram[/CYAN] [RED]or[/RED] [CYAN]YouTube Channel[/CYAN]. This month you'll find footage of the [GREEN]pause menu, map, loadout, inventory and in-game documents[/GREEN]. Just like always, keep in mind that everything you're about to see comes from a [GREEN]work-in-progress build[/GREEN], so expect placeholders, missing elements and plenty of things that will change before release.

And yes... Sirde is back! This month he's bringing [GREEN]multiple concept art pieces for one of Mictlan's lieutenants[/GREEN]. You won't encounter this character in the demo, which is why we're still exploring different directions for their design, but we thought it'd be fun to show a bit of what goes into creating a character before they ever make it into the game.

Now... before we dive into development, I want to talk about something important.

I'll probably be [RED]pausing these monthly devlogs until the demo is released[/RED].

I know that might disappoint some of you, but these posts were always meant to document the development process, answer questions and gradually reveal the game. Now that we're approaching the demo, our priority has shifted almost entirely toward polishing and making content rather than talking about it. Besides, most of the questions I received this month were things I've already answered in previous devlogs, so there really wasn't enough for another full Q&A section.

That doesn't mean we're disappearing. We'll still be [GREEN]posting regularly on social media[/GREEN] and updating the website with new content, especially once the demo is available. I might eventually switch these into a semesterly format, but I'll decide that after the release of the demo.

Speaking of the demo...

I've seen quite a few people assume that once a demo is finished, the full game can't be that far behind. I wish it worked like that! The truth is that, on the content creation side, this project is still [GREEN]mostly a one-man effort[/GREEN]. Sirde is handling character design and animation, but everything else... from environments and props to UI, VFX, SFX and music and let's not talk about code... almost everything else is currently on my shoulders. It's a massive amount of work and, while I genuinely believe in this project, I also have to be realistic about what one person can accomplish.

The scope of the game ended up being much bigger than I originally imagined. Mictlan alone contains [GREEN]nine different departments[/GREEN], each with its own identity, mechanics and atmosphere. Honestly... it used to be even larger. At some point I had to keep reminding myself: KISS. Keep It Simple, Stupid. I'd rather ship a polished game than spend the next decade chasing an impossible vision. So. When's the demo?

Like I've said many times before, I don't like making promises I can't keep. That said, assuming everthing continues going according to plan, I'm aiming to have a [GREEN]closed beta ready in roughly two months[/GREEN], with a [GREEN]public demo targeting late September[/GREEN]. It's later than the summer release I was originally hoping for, but I'd much rather delay it a little than rush something I'm not happy with. I'm also planning a couple of weeks off during August to recharge before the final stretch.

Anyway... enough talking. Let's get into what I've actually been working on this month.

[ASCII]██     ██ ▄▄ ▄▄  ▄▄▄ ▄▄▄▄▄▄    ▄▄▄  ▄▄▄▄   ▄▄▄  ▄▄ ▄▄ ▄▄▄▄▄▄  
██ ▄█▄ ██ ██▄██ ██▀██  ██     ██▀██ ██▄██ ██▀██ ██ ██   ██    
 ▀██▀██▀  ██ ██ ██▀██  ██     ██▀██ ██▄█▀ ▀███▀ ▀███▀   ██    
                                                                              ▄▄▄▄  
                              ▄▄▄▄▄▄ ▄▄ ▄▄ ▄▄▄▄▄    ▄▄▄▄  ▄▄▄  ▄▄   ▄▄ ▄▄▄▄▄ █▀▀▀██ 
                                ██   ██▄██ ██▄▄    ██ ▄▄ ██▀██ ██▀▄▀██ ██▄▄    ▄█▀  
                                ██   ██ ██ ██▄▄▄   ▀███▀ ██▀██ ██   ██ ██▄▄▄   ▄▄   
[/ASCII]

Just like lasst month, development naturally split itself into two halves.

During the first couple of weeks, the playtesters finally got their hands on the [GREEN]first boss fight[/GREEN], the one that opens up free roaming of the department. I'll admit, I was expecting people to struggle a lot more than they actually did. Instead, the feedback ended up being overwhelmingly positive. Rather than feeling frustrated, most testers really enjoyed learning the boss' attack patterns and figuring out how to counter them.

While this might sound like a small detail, it actually made me realize what I want the combat to feel like. I want players to feel like they are learning and improving as they play, and that they are rewarded for their efforts. I want them to feel like they are mastering the game, not just mindlessly button-mashing their way through it. After all, the protagonist is supposed to be this super skilled and practically invincible character, so I want the player to feel like a badass, perfectionist fighter. This realization also made me rethink one mechanic I think I'd talked about in previosu devlogs.

Originally, every death was going to be [GREEN]canon[/GREEN], with your previous bodies remaining in the world after every failed attempt. The idea sounded interesting on paper, but the more I thought about the direction I wanted the combat to take, the less it fit. So... that's no longer the plan.

Outside of playtesting, I spent a good chunk of time finishing up more areas. At this point, there are only [GREEN]four rooms left[/GREEN], not counting the transitions between departments and a few sneak peek areas. There are still a handful of backgrounds and props left to create, but compared to where things were a few months ago, the finish line finally feels like it's coming into view.

The second half of the month was dedicated almost entirely to [GREEN]refining the UI and oevrall user experience[/GREEN].

I've always loved diegetic interfaces, so I wanted the menus to feel like they actually belong inside Promoted's world rather than existing outside of it. They're still rough around the edges. You'll immediately notice missing button prompts, placeholder artwork and that... admittedly awful X-ray image I shamelessly grabbed from the internet... but those are of course all temporary. Every placeholder will eventually be replaced with proper in-universe artwork.

You might also notice that the menu footage goes by pretty quickly. That was intentional. I mainly wanted to demonstrate how [GREEN]fast and responsive the navigation feels[/GREEN] when swapping equipment or managing your inventory, while also keeping the videos short enough to preserve both resolution and frame rate.

There's definitely still polish left to do, but I'm genuinely happy with how it's shaping up and I can't wait for everyone to finally experience it firsthand once the demo is available.

Before wrapping things up, there's one last question I wanted to answer this month.

> "Will the game have a New Game+ mode?"

I'm a huge fan of New Game+ modes that actually change the experience through things like new dialogue, altered enemy placements or additional collectibles. They add a ton of replay value when done well.

That said... I think it's still too early to promise anything. Right now the priority is finishing the main experience. If everything goes according to plan, though, I'd absolutely love to explore something along those lines after release.

Well... I guess that's it.

Writing these monthly devlogs has honestly been a lot of fun and I hope you all have enjoyed following the journey over these past few months.

Before I go, I wanted to be transparent about something. Between the summer heat, almost a year of nonstop development and the final push toward the demo, I'm definitely starting to feel the fatigue. Taking a short break in August feels more like something I NEED to do if I want to come back refreshed for the final sprint.

THere's also one more thing I've mostly avoided bringing up lately: I'm still looking for a job. If that changes, development will naturally have to be balanced around work, which could slow things down a little. Hopefully it won't come to that before the demo, but I wanted to be upfront about the possibility.

For now, though, the goal remains the same: [GREEN]have the demo ready by late September[/GREEN]. And if everything falls into place, maybe we'll even have a Steam page ready around the same time.

As always, thank you all for sticking with us throughout development. Every comment, every question and every bit of encouragement genuinely means a lot to both me and Sirde. Seeing people get excited about this world we've been building has been one of the biggest motivations to keep going.

Enjoy your summer, stay cool, grab something cold to drink...

...and hopefully, the next time we meet, you'll finally be playing the demo.

[CYAN]See you in September.[/CYAN]
`,
    }
  ],
};
