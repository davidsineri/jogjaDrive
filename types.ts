
export type CarCategory = 'All' | 'City Car' | 'MPV' | 'SUV' | 'Luxury' | 'Van';

export interface Car {
  id: string;
  name: string;
  category: CarCategory;
  pricePerDay: number;
  passengers: number;
  transmission: 'Manual' | 'Automatic';
  fuel: 'Bensin' | 'Diesel' | 'Electric';
  imageUrl: string;
  features: string[];
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Booking {
  id: string;
  carId: string;
  carName: string;
  startDate: string;
  endDate: string;
  userName: string;
  userPhone: string;
  withDriver: boolean;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
