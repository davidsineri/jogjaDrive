
import { Booking, Car } from '../types';

const STORAGE_KEY = 'jogjadrive_bookings';

// Simulasi Database dengan Initial Seed
export const storageService = {
  // Method untuk inisialisasi "Database" lokal jika kosong
  init: () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  },

  // Menyimpan pesanan baru (Create)
  saveBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
    const bookings = storageService.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: `JD-${Math.floor(1000 + Math.random() * 9000)}`, // Format ID lebih rapi
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    
    const updatedBookings = [newBooking, ...bookings];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
    return newBooking;
  },

  // Mengambil semua pesanan (Read)
  getBookings: (): Booking[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Menghapus pesanan (Delete) - Simulasi Manajemen DB
  deleteBooking: (id: string) => {
    const bookings = storageService.getBookings();
    const filtered = bookings.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  // Update status (Update)
  updateStatus: (id: string, status: Booking['status']) => {
    const bookings = storageService.getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
};
