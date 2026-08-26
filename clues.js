/**
 * clues.js — Scavenger hunt content
 *
 * Each clue has:
 *   id     : number  — matches the grid button number (1–12)
 *   title  : string  — displayed at the top of the clue screen
 *   text   : string  — the written hint shown to the student
 *   image  : string|null — relative path to an image file, or null for placeholder
 *   answer : string    — the text the QR code encodes (case-insensitive comparison)
 *   aliases: string[] — extra accepted answers for text entry (ignored in QR mode)
 *   useqr  : boolean  — if false, hides the scan button and only shows text entry
 *
 * Replace placeholder text, images, and answers before deploying!
 */
const CLUES = [
  {
    id: 1,
    title: "Clue 1",
    text: "In Commons Building, this Service Centre can help you with a number of housing topics and questions. On the wall beside the desk.",
    image: "images/clue1.jpg",
    answer: "Commons Desk",
    aliases: ["Commons"],
    useqr: true
  },
  {
    id: 2,
    title: "Clue 2",
    text: "In the Commons Breezeway, you can pick up your package deliveries from these lockers. On the side of the lockers.",
    image: null,
    answer: "Commons Lockers",
    aliases: ["Lockers"],
    useqr: true
  },
  {
    id: 3,
    title: "Clue 3",
    text: "In Mary E. Keyes Residence, this Service Centre can help you with a number of housing topics and questions. On the wall beside the desk.",
    image: null,
    answer: "Keyes Desk",
    aliases: ["Keyes"],
    useqr: true
  },
  {
    id: 4,
    title: "Clue 4",
    text: "Outside Mary E. Keyes Residence, you can pick up deliveries from these lockers. On the side of the lockers.",
    image: null,
    answer: "Keyes Lockers",
    aliases: ["Lockers"],
    useqr: true
  },
  {
    id: 5,
    title: "Clue 5",
    text: "Located in the MSU Plaza, the Campus Store is a great place for supplies, books and apparel. At the front desk.",
    image: null,
    answer: "Campus Store",
    aliases: [],
    useqr: true
  },
  {
    id: 6,
    title: "Clue 6",
    text: "In the MSU Plaza, this library is a great place to study and find resources. Outside the main entrance, behind glass.",
    image: null,
    answer: "Mills Library",
    aliases: [],
    useqr: true
  },
  {
    id: 7,
    title: "Clue 7",
    text: "2nd floor (not Mezanine) of PGCLL - counselling services, medical care, and wellness programs. By the main doors.",
    image: null,
    answer: "Wellness Centre",
    aliases: [],
    useqr: true
  },
  {
    id: 8,
    title: "Clue 8",
    text: "Go to work out, play sports and meet people through intramurals. Included with your tuition! At the Joan Buddle Service Desk.",
    image: null,
    answer: "FBAC",
    aliases: [],
    useqr: true
  },
  {
    id: 9,
    title: "Clue 9",
    text: "",
    image: null,
    answer: "The Hub",
    aliases: [],
    useqr: true
  },
  {
    id: 10,
    title: "Clue 10",
    text: "Venerable campus pub, near Mary E. Keyes. Rise from the ashes. At the front door.",
    image: null,
    answer: "The Phoenix",
    aliases: [],
    useqr: true
  },
  {
    id: 11,
    title: "Clue 11",
    text: "In Gilmour Hall, the Registrar's Office Student Services office can help you with financial aid, transcripts, enrolment letters and diplomas questions. Outside Gilmour 108, on the wall.",
    image: null,
    answer: "Gilmour 108",
    aliases: [],
    useqr: true
  },
  {
    id: 12,
    title: "Clue 12",
    text: "The Welcome Zone for Move-In! Our raffle desk is where you complete this hunt (and maybe started it). On Saturday, in the green space between Edwards and Commons. On Sunday, in the space between Matthews, Moulton and Wallingford.",
    image: null,
    answer: "Welcome Zone",
    aliases: [],
    useqr: true
  }
];
