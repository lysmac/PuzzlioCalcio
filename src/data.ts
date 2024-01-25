export interface keyboardButton {
  value: string;
  color: string;
}
export const keyboardButtons = [
  { value: "q", color: "" },
  { value: "w", color: "" },
  { value: "e", color: "" },
  { value: "r", color: "" },
  { value: "t", color: "" },
  { value: "y", color: "" },
  { value: "u", color: "" },
  { value: "i", color: "" },
  { value: "o", color: "" },
  { value: "p", color: "" },
  { value: "a", color: "" },
  { value: "s", color: "" },
  { value: "d", color: "" },
  { value: "f", color: "" },
  { value: "g", color: "" },
  { value: "h", color: "" },
  { value: "j", color: "" },
  { value: "k", color: "" },
  { value: "l", color: "" },
  { value: "Del", color: "" },
  { value: "z", color: "" },
  { value: "x", color: "" },
  { value: "c", color: "" },
  { value: "v", color: "" },
  { value: "b", color: "" },
  { value: "n", color: "" },
  { value: "m", color: "" },
  { value: "Enter", color: "" },
];

export const competitions = [
  {
    id: "GB1",
    name: "Premier League",
    seasonID: "2023",
    clubs: [
      {
        id: "281",
        name: "Manchester City",
      },
      {
        id: "11",
        name: "Arsenal FC",
      },
      {
        id: "631",
        name: "Chelsea FC",
      },
      {
        id: "31",
        name: "Liverpool FC",
      },
      {
        id: "985",
        name: "Manchester United",
      },
      {
        id: "148",
        name: "Tottenham Hotspur",
      },
      {
        id: "762",
        name: "Newcastle United",
      },
      {
        id: "405",
        name: "Aston Villa",
      },
      {
        id: "1237",
        name: "Brighton & Hove Albion",
      },
      {
        id: "379",
        name: "West Ham United",
      },
      {
        id: "1148",
        name: "Brentford FC",
      },
      {
        id: "703",
        name: "Nottingham Forest",
      },
      {
        id: "873",
        name: "Crystal Palace",
      },
      {
        id: "29",
        name: "Everton FC",
      },
      {
        id: "989",
        name: "AFC Bournemouth",
      },
      {
        id: "543",
        name: "Wolverhampton Wanderers",
      },
      {
        id: "931",
        name: "Fulham FC",
      },
      {
        id: "1132",
        name: "Burnley FC",
      },
      {
        id: "350",
        name: "Sheffield United",
      },
      {
        id: "1031",
        name: "Luton Town",
      },
    ],
  },
  {
    id: "ES1",
    name: "LaLiga",
    seasonID: "2023",
    clubs: [
      {
        id: "418",
        name: "Real Madrid",
      },
      {
        id: "131",
        name: "FC Barcelona",
      },
      {
        id: "681",
        name: "Real Sociedad",
      },
      {
        id: "13",
        name: "Atlético de Madrid",
      },
      {
        id: "621",
        name: "Athletic Bilbao",
      },
      {
        id: "12321",
        name: "Girona FC",
      },
      {
        id: "150",
        name: "Real Betis Balompié",
      },
      {
        id: "1049",
        name: "Valencia CF",
      },
      {
        id: "1050",
        name: "Villarreal CF",
      },
      {
        id: "368",
        name: "Sevilla FC",
      },
      {
        id: "3709",
        name: "Getafe CF",
      },
      {
        id: "331",
        name: "CA Osasuna",
      },
      {
        id: "940",
        name: "Celta de Vigo",
      },
      {
        id: "16795",
        name: "Granada CF",
      },
      {
        id: "3302",
        name: "UD Almería",
      },
      {
        id: "237",
        name: "RCD Mallorca",
      },
      {
        id: "367",
        name: "Rayo Vallecano",
      },
      {
        id: "1108",
        name: "Deportivo Alavés",
      },
      {
        id: "472",
        name: "UD Las Palmas",
      },
      {
        id: "2687",
        name: "Cádiz CF",
      },
    ],
  },
  {
    id: "L1",
    name: "Bundesliga",
    seasonID: "2023",
    clubs: [
      {
        id: "27",
        name: "Bayern Munich",
      },
      {
        id: "15",
        name: "Bayer 04 Leverkusen",
      },
      {
        id: "23826",
        name: "RB Leipzig",
      },
      {
        id: "16",
        name: "Borussia Dortmund",
      },
      {
        id: "82",
        name: "VfL Wolfsburg",
      },
      {
        id: "79",
        name: "VfB Stuttgart",
      },
      {
        id: "24",
        name: "Eintracht Frankfurt",
      },
      {
        id: "18",
        name: "Borussia Mönchengladbach",
      },
      {
        id: "60",
        name: "SC Freiburg",
      },
      {
        id: "89",
        name: "1.FC Union Berlin",
      },
      {
        id: "533",
        name: "TSG 1899 Hoffenheim",
      },
      {
        id: "167",
        name: "FC Augsburg",
      },
      {
        id: "39",
        name: "1.FSV Mainz 05",
      },
      {
        id: "3",
        name: "1.FC Köln",
      },
      {
        id: "86",
        name: "SV Werder Bremen",
      },
      {
        id: "80",
        name: "VfL Bochum",
      },
      {
        id: "2036",
        name: "1.FC Heidenheim 1846",
      },
      {
        id: "105",
        name: "SV Darmstadt 98",
      },
    ],
  },
  {
    id: "It1",
    name: "Serie A",
    seasonID: "2023",
    clubs: [
      {
        id: "46",
        name: "Inter Milan",
      },
      {
        id: "5",
        name: "AC Milan",
      },
      {
        id: "6195",
        name: "SSC Napoli",
      },
      {
        id: "506",
        name: "Juventus FC",
      },
      {
        id: "800",
        name: "Atalanta BC",
      },
      {
        id: "12",
        name: "AS Roma",
      },
      {
        id: "430",
        name: "ACF Fiorentina",
      },
      {
        id: "398",
        name: "SS Lazio",
      },
      {
        id: "1025",
        name: "Bologna FC 1909",
      },
      {
        id: "416",
        name: "Torino FC",
      },
      {
        id: "6574",
        name: "US Sassuolo",
      },
      {
        id: "410",
        name: "Udinese Calcio",
      },
      {
        id: "252",
        name: "Genoa CFC",
      },
      {
        id: "2919",
        name: "AC Monza",
      },
      {
        id: "8970",
        name: "Frosinone Calcio",
      },
      {
        id: "1005",
        name: "US Lecce",
      },
      {
        id: "380",
        name: "US Salernitana 1919",
      },
      {
        id: "749",
        name: "FC Empoli",
      },
      {
        id: "1390",
        name: "Cagliari Calcio",
      },
      {
        id: "276",
        name: "Hellas Verona",
      },
    ],
  },
  {
    id: "FR1",
    name: "Ligue 1",
    seasonID: "2023",
    clubs: [
      {
        id: "583",
        name: "Paris Saint-Germain",
      },
      {
        id: "162",
        name: "AS Monaco",
      },
      {
        id: "417",
        name: "OGC Nice",
      },
      {
        id: "273",
        name: "Stade Rennais FC",
      },
      {
        id: "244",
        name: "Olympique Marseille",
      },
      {
        id: "1082",
        name: "LOSC Lille",
      },
      {
        id: "826",
        name: "RC Lens",
      },
      {
        id: "1041",
        name: "Olympique Lyon",
      },
      {
        id: "667",
        name: "RC Strasbourg Alsace",
      },
      {
        id: "1421",
        name: "Stade Reims",
      },
      {
        id: "995",
        name: "FC Nantes",
      },
      {
        id: "1158",
        name: "FC Lorient",
      },
      {
        id: "969",
        name: "Montpellier HSC",
      },
      {
        id: "415",
        name: "FC Toulouse",
      },
      {
        id: "3911",
        name: "Stade Brestois 29",
      },
      {
        id: "738",
        name: "Le Havre AC",
      },
      {
        id: "3524",
        name: "Clermont Foot 63",
      },
      {
        id: "347",
        name: "FC Metz",
      },
    ],
  },
];

export const leagueFlags: { [key: string]: string } = {
  "Premier League": "../flags/England.svg",
  LaLiga: "../flags/Spain.svg",
  Bundesliga: "../flags/Germany.svg",
  "Serie A": "../flags/Italy.svg",
  "Ligue 1": "../flags/France.svg",
};
