/**
 * clues.js — Scavenger hunt content
 *
 * Each clue has:
 *   id     : number  — matches the grid button number (1–12)
 *   title  : string  — displayed at the top of the clue screen
 *   text   : string  — the written hint shown to the student. Can include HTML for formatting, but avoid <script> tags.
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
    image: "images/clue1.png",
    answer: "Commons Desk",
    aliases: ["Commons"],
    useqr: true
  },
  {
    id: 2,
    title: "Clue 2",
    text: "In the Commons Breezeway, you can pick up your package deliveries from these lockers. On the side of the lockers.",
    image: "images/clue2.png",
    answer: "Commons Lockers",
    aliases: ["Lockers"],
    useqr: true
  },
  {
    id: 3,
    title: "Clue 3",
    text: "In Mary E. Keyes Residence, this Service Centre can help you with a number of housing topics and questions. On the wall beside the desk.",
    image: "images/clue3.png",
    answer: "Keyes Desk",
    aliases: ["Keyes"],
    useqr: true
  },
  {
    id: 4,
    title: "Clue 4",
    text: "Outside Mary E. Keyes Residence (on the side with the traffic circle), you can pick up deliveries from these lockers. On the side of the lockers.",
    image: "images/clue4.png",
    answer: "Keyes Lockers",
    aliases: ["Lockers"],
    useqr: true
  },
  {
    id: 5,
    title: "Clue 5",
    text: "Venerable campus pub, near Mary E. Keyes and the old greenhouse on Scholar's Road. Rise from the ashes. At the front door.",
    image: "images/clue5.png",
    answer: "The Phoenix",
    aliases: [],
    useqr: true
  },
  {
    id: 6,
    title: "Clue 6",
    text: "Located in the MSU Plaza, the Campus Store is a great place for supplies, books and apparel. At the front desk.",
    image: "images/clue6.png",
    answer: "Campus Store",
    aliases: [],
    useqr: true
  },
  {
    id: 7,
    title: "Clue 7",
    text: "In the MSU Plaza, this library is a great place to study and find resources. Outside the main entrance, behind glass.",
    image: "images/clue7.png",
    answer: "Mills Library",
    aliases: [],
    useqr: true
  },
  {
    id: 8,
    title: "Clue 8",
    text: "2nd floor (not Mezzanine) of PGCLL - counselling services, medical care, and wellness programs. By the main doors.",
    image: "images/clue8.png",
    answer: "Wellness Centre",
    aliases: [],
    useqr: true
  },
  {
    id: 9,
    title: "Clue 9",
    text: "Find your comfy study space, collaborate with friends or group members, or challenge the world at table tennis in The Hub. At the front desk.",
    image: "images/clue9.png",
    answer: "The Hub",
    aliases: [],
    useqr: true
  },
  {
    id: 10,
    title: "Clue 10",
    text: "Go to work out, play sports and meet people through intramurals. Membership included with your tuition! At the Joan Buddle Service Desk.",
    image: "images/clue10.png",
    answer: "DBAC",
    aliases: [],
    useqr: true
  },
  {
    id: 11,
    title: "Clue 11",
    text: "In Gilmour Hall, the Registrar's Office Student Services office can help you with financial aid, transcripts, enrolment letters and diplomas questions. Outside Gilmour 108, on the wall.",
    image: "images/clue11.png",
    answer: "Gilmour 108",
    aliases: [],
    useqr: true
  },
  {
    id: 12,
    title: "Clue 12",
    text: "<p>The Welcome Zone for Move-In! Our raffle desk is where you complete this hunt (and maybe started it).</p> <p>On <strong>Saturday</strong>, in the green space between Edwards and Commons. On <strong>Sunday</strong>, in the space between Matthews, Moulton and Wallingford.</p>",
    image: null,
    answer: "Welcome Zone",
    aliases: [],
    useqr: true
  }
];
