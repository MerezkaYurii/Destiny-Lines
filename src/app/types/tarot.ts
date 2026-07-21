export interface TarotCard {
  id: number;
  name: string;
  imagePath: string;
}

export interface TarotDeckProps {
  onDraw?: (cardIds: number[]) => void;
  onResult?: (report: TarotReport) => void;
  lang: string;
}
export interface TarotReport {
  cards: TarotCard[];
}

export interface TarotResultProps {
  report: TarotReport | null;
  analysis?: string;
  output?: string;
  text?: string;
  response?: string;
  lang: string;
}
export const DECK: TarotCard[] = [
  { id: 0, name: 'The Fool', imagePath: '/cards/00.jpg' },
  { id: 1, name: 'The Magician', imagePath: '/cards/01.jpg' },
  { id: 2, name: 'The High Priestess', imagePath: '/cards/02.jpg' },
  { id: 3, name: 'The Empress', imagePath: '/cards/03.jpg' },
  { id: 4, name: 'The Emperor', imagePath: '/cards/04.jpg' },
  { id: 5, name: 'The Hierophant', imagePath: '/cards/05.jpg' },
  { id: 6, name: 'The Lovers', imagePath: '/cards/06.jpg' },
  { id: 7, name: 'The Chariot', imagePath: '/cards/07.jpg' },
  { id: 8, name: 'Justice', imagePath: '/cards/08.jpg' },
  { id: 9, name: 'The Hermit', imagePath: '/cards/09.jpg' },
  { id: 10, name: 'Wheel of Fortune', imagePath: '/cards/10.jpg' },
  { id: 11, name: 'Strength', imagePath: '/cards/11.jpg' },
  { id: 12, name: 'The Hanged Man', imagePath: '/cards/12.jpg' },
  { id: 13, name: 'Death', imagePath: '/cards/13.jpg' },
  { id: 14, name: 'Temperance', imagePath: '/cards/14.jpg' },
  { id: 15, name: 'The Devil', imagePath: '/cards/15.jpg' },
  { id: 16, name: 'The Tower', imagePath: '/cards/16.jpg' },
  { id: 17, name: 'The Star', imagePath: '/cards/17.jpg' },
  { id: 18, name: 'The Moon', imagePath: '/cards/18.jpg' },
  { id: 19, name: 'The Sun', imagePath: '/cards/19.jpg' },
  { id: 20, name: 'Judgement', imagePath: '/cards/20.jpg' },
  { id: 21, name: 'The World', imagePath: '/cards/21.jpg' },
  { id: 22, name: 'Ace of Wands', imagePath: '/cards/22.jpg' },
  { id: 23, name: 'Two of Wands', imagePath: '/cards/23.jpg' },
  { id: 24, name: 'Three of Wands', imagePath: '/cards/24.jpg' },
  { id: 25, name: 'Four of Wands', imagePath: '/cards/25.jpg' },
  { id: 26, name: 'Five of Wands', imagePath: '/cards/26.jpg' },
  { id: 27, name: 'Six of Wands', imagePath: '/cards/27.jpg' },
  { id: 28, name: 'Seven of Wands', imagePath: '/cards/28.jpg' },
  { id: 29, name: 'Eight of Wands', imagePath: '/cards/29.jpg' },
  { id: 30, name: 'Nine of Wands', imagePath: '/cards/30.jpg' },
  { id: 31, name: 'Ten of Wands', imagePath: '/cards/31.jpg' },
  { id: 32, name: 'Page of Wands', imagePath: '/cards/32.jpg' },
  { id: 33, name: 'Knight of Wands', imagePath: '/cards/33.jpg' },
  { id: 34, name: 'Queen of Wands', imagePath: '/cards/34.jpg' },
  { id: 35, name: 'King of Wands', imagePath: '/cards/35.jpg' },
  { id: 36, name: 'Ace of Cups', imagePath: '/cards/36.jpg' },
  { id: 37, name: 'Two of Cups', imagePath: '/cards/37.jpg' },
  { id: 38, name: 'Three of Cups', imagePath: '/cards/38.jpg' },
  { id: 39, name: 'Four of Cups', imagePath: '/cards/39.jpg' },
  { id: 40, name: 'Five of Cups', imagePath: '/cards/40.jpg' },
  { id: 41, name: 'Six of Cups', imagePath: '/cards/41.jpg' },
  { id: 42, name: 'Seven of Cups', imagePath: '/cards/42.jpg' },
  { id: 43, name: 'Eight of Cups', imagePath: '/cards/43.jpg' },
  { id: 44, name: 'Nine of Cups', imagePath: '/cards/44.jpg' },
  { id: 45, name: 'Ten of Cups', imagePath: '/cards/45.jpg' },
  { id: 46, name: 'Page of Cups', imagePath: '/cards/46.jpg' },
  { id: 47, name: 'Knight of Cups', imagePath: '/cards/47.jpg' },
  { id: 48, name: 'Queen of Cups', imagePath: '/cards/48.jpg' },
  { id: 49, name: 'King of Cups', imagePath: '/cards/49.jpg' },
  { id: 50, name: 'Ace of Swords', imagePath: '/cards/50.jpg' },
  { id: 51, name: 'Two of Swords', imagePath: '/cards/51.jpg' },
  { id: 52, name: 'Three of Swords', imagePath: '/cards/52.jpg' },
  { id: 53, name: 'Four of Swords', imagePath: '/cards/53.jpg' },
  { id: 54, name: 'Five of Swords', imagePath: '/cards/54.jpg' },
  { id: 55, name: 'Six of Swords', imagePath: '/cards/55.jpg' },
  { id: 56, name: 'Seven of Swords', imagePath: '/cards/56.jpg' },
  { id: 57, name: 'Eight of Swords', imagePath: '/cards/57.jpg' },
  { id: 58, name: 'Nine of Swords', imagePath: '/cards/58.jpg' },
  { id: 59, name: 'Ten of Swords', imagePath: '/cards/59.jpg' },
  { id: 60, name: 'Page of Swords', imagePath: '/cards/60.jpg' },
  { id: 61, name: 'Knight of Swords', imagePath: '/cards/61.jpg' },
  { id: 62, name: 'Queen of Swords', imagePath: '/cards/62.jpg' },
  { id: 63, name: 'King of Swords', imagePath: '/cards/63.jpg' },
  { id: 64, name: 'Ace of Pentacles', imagePath: '/cards/64.jpg' },
  { id: 65, name: 'Two of Pentacles', imagePath: '/cards/65.jpg' },
  { id: 66, name: 'Three of Pentacles', imagePath: '/cards/66.jpg' },
  { id: 67, name: 'Four of Pentacles', imagePath: '/cards/67.jpg' },
  { id: 68, name: 'Five of Pentacles', imagePath: '/cards/68.jpg' },
  { id: 69, name: 'Six of Pentacles', imagePath: '/cards/69.jpg' },
  { id: 70, name: 'Seven of Pentacles', imagePath: '/cards/70.jpg' },
  { id: 71, name: 'Eight of Pentacles', imagePath: '/cards/71.jpg' },
  { id: 72, name: 'Nine of Pentacles', imagePath: '/cards/72.jpg' },
  { id: 73, name: 'Ten of Pentacles', imagePath: '/cards/73.jpg' },
  { id: 74, name: 'Page of Pentacles', imagePath: '/cards/74.jpg' },
  { id: 75, name: 'Knight of Pentacles', imagePath: '/cards/75.jpg' },
  { id: 76, name: 'Queen of Pentacles', imagePath: '/cards/76.jpg' },
  { id: 77, name: 'King of Pentacles', imagePath: '/cards/77.jpg' },
];
