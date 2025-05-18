const europeanQuotes = [
  'Unity in diversity. — Motto of the European Union',
  'Europe will not be made all at once, or according to a single plan. It will be built through concrete achievements which first create a de facto solidarity. — Robert Schuman',
  "The European Union is the world's most successful invention for advancing peace. — John Bruton",
  "Europe's story is a story of freedom, democracy and peace being written by individual efforts. — José Manuel Barroso",
  'The strength of Europe lies in its diversity. — Romano Prodi',
  'If you want to build Europe, start with culture. — Jean Monnet',
  'The European Union is one of the most ambitious collective endeavors in human history. — Tony Blair',
  'The idea of European unity may never be realised unless our minds and spirits rise to the challenges of our times. — Alcide De Gasperi',
  'For Europe to be a credible actor in the world, we need unity. — Federica Mogherini',
  "A united Europe is our continent's only chance to avoid falling off the world's radar. Either we count together, or we don't count at all. — Donald Tusk",
  'The construction of Europe is an art. It is the art of the possible. — Jacques Chirac',
  'Europe is a state of mind that goes beyond geography. — Konrad Adenauer',
  'We are not forming coalitions of states, we are uniting people. — Jean Monnet',
  'Europe will be forged in crises, and will be the sum of the solutions adopted for those crises. — Jean Monnet',
  'Europe must be organized on a federal basis. A European Confederation... Here is what must be done. — Victor Hugo',
  'European unity is based on shared values. — Ursula von der Leyen',
  'The European Union was created to ensure peace and prosperity after the two World Wars. — Christine Lagarde',
  'The European Union is a cornerstone of international peace and security. — Anders Fogh Rasmussen',
  'European unity and cooperation is the most promising path forward for humanity. — Vaclav Havel',
  'A citizen of Europe is what we must all become. — Winston Churchill',
  'An integrated Europe is the only way forward in a fragmented world. — Emmanuel Macron',
  'Europe is more than coal and steel, more than a common market; it is a community of values. — Helmut Kohl',
  'The European ideal represents the future, not the past. — Mario Draghi',
  'The richness of European culture is based on dialogue across borders. — Umberto Eco',
  'We must build a kind of United States of Europe. — Winston Churchill',
];

export default class NotFoundOperations {
  static getRandomQuote(): string {
    const randomIndex = Math.floor(Math.random() * europeanQuotes.length);
    return europeanQuotes[randomIndex];
  }
}
