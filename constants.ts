
import { Car } from './types';

export const CARS: Car[] = [
  {
    id: '1',
    name: 'Toyota Avanza',
    category: 'MPV',
    pricePerDay: 350000,
    passengers: 7,
    transmission: 'Manual',
    fuel: 'Bensin',
    imageUrl: 'https://images.unsplash.com/photo-1621993202323-f438eec639ff?auto=format&fit=crop&q=80&w=600',
    features: ['AC Double Blower', 'Audio System', 'Hemat BBM']
  },
  {
    id: '2',
    name: 'Mitsubishi Xpander',
    category: 'MPV',
    pricePerDay: 450000,
    passengers: 7,
    transmission: 'Automatic',
    fuel: 'Bensin',
    imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=600',
    features: ['Interior Mewah', 'Suspensi Nyaman', 'Spacious']
  },
  {
    id: '3',
    name: 'Honda Brio',
    category: 'City Car',
    pricePerDay: 300000,
    passengers: 5,
    transmission: 'Automatic',
    fuel: 'Bensin',
    imageUrl: 'https://images.unsplash.com/photo-1606148383350-c65113d098e9?auto=format&fit=crop&q=80&w=600',
    features: ['Lincah', 'Mudah Parkir', 'Irit']
  },
  {
    id: '4',
    name: 'Toyota Fortuner',
    category: 'SUV',
    pricePerDay: 1200000,
    passengers: 7,
    transmission: 'Automatic',
    fuel: 'Diesel',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
    features: ['Gagah', 'Segala Medan', 'Turbo Diesel']
  },
  {
    id: '5',
    name: 'Toyota Alphard',
    category: 'Luxury',
    pricePerDay: 2500000,
    passengers: 6,
    transmission: 'Automatic',
    fuel: 'Bensin',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600',
    features: ['First Class Seat', 'Sunroof', 'Privasi Tinggi']
  },
  {
    id: '6',
    name: 'Toyota Hiace Premio',
    category: 'Van',
    pricePerDay: 1500000,
    passengers: 12,
    transmission: 'Manual',
    fuel: 'Diesel',
    imageUrl: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=600',
    features: ['Rombongan Besar', 'AC Dingin', 'Bagasi Luas']
  }
];

export const CATEGORIES: string[] = ['All', 'City Car', 'MPV', 'SUV', 'Luxury', 'Van'];
