export type Region = {
  id: string;
  name: string;
  dance: string;
  description: string;
  x: number;
  y: number;
  zoom: number;
  image: string;
  imageAlt?: string;
  chips?: string[];
};

export const regions: Region[] = [
  {
    id: 'costa',
    name: 'Costa',
    dance: 'Marinera',
    description:
      'The coastal region is known for elegant partner dances, rhythm, and handkerchief-based movement.',
    x: 0.28,
    y: 0.42,
    zoom: 1.18,
    image: '/images/costa.jpg',
    imageAlt: 'Coastal Peru cultural scene',
    chips: ['Coastal', 'Elegant', 'Partner Dance'],
  },
  {
    id: 'sierra',
    name: 'Sierra',
    dance: 'Huayno',
    description:
      'The Andean highlands feature vibrant traditional dances tied to festivals, courtship, and community celebrations.',
    x: 0.48,
    y: 0.48,
    zoom: 1.32,
    image: '/images/sierra.jpg',
    imageAlt: 'Andean Peru traditional dance scene',
    chips: ['Andean', 'Festival', 'Traditional'],
  },
  {
    id: 'selva',
    name: 'Selva',
    dance: 'Pandilla Amazónica',
    description:
      'The jungle region includes highly energetic and communal forms influenced by local traditions and celebrations.',
    x: 0.68,
    y: 0.68,
    zoom: 1.22,
    image: '/images/selva.jpg',
    imageAlt: 'Amazon region Peru cultural dance scene',
    chips: ['Amazon', 'Energetic', 'Community'],
  },
];