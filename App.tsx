
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import CarCard from './components/CarCard';
import AiAssistant from './components/AiAssistant';
import BookingModal from './components/BookingModal';
import { CARS, CATEGORIES } from './constants';
import { Car, CarCategory, Booking } from './types';
import { storageService } from './services/storageService';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CarCategory>('All');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    storageService.init();
    setBookings(storageService.getBookings());
  }, []);

  const refreshBookings = () => {
    setBookings(storageService.getBookings());
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('Batalkan pesanan ini?')) {
      storageService.deleteBooking(id);
      refreshBookings();
    }
  };

  const filteredCars = useMemo(() => {
    if (selectedCategory === 'All') return CARS;
    return CARS.filter(car => car.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onShowHistory={() => setShowHistory(true)} />

      <main className="flex-grow">
        {/* History Overlay */}
        {showHistory && (
          <div className="fixed inset-0 z-[70] bg-slate-900/60 backdrop-blur-md flex items-center justify-end animate-in fade-in">
            <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-600 text-white">
                <div>
                  <h2 className="text-xl font-bold">Riwayat Pesanan</h2>
                  <p className="text-xs text-indigo-100">Daftar penyewaan Anda di Jogja</p>
                </div>
                <button onClick={() => setShowHistory(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {bookings.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-5xl mb-4">🚗💨</div>
                    <p className="text-slate-500 font-medium">Belum ada pesanan.</p>
                    <button 
                      onClick={() => { setShowHistory(false); document.getElementById('fleet')?.scrollIntoView(); }}
                      className="mt-4 text-indigo-600 font-bold text-sm hover:underline"
                    >
                      Cari Mobil Sekarang
                    </button>
                  </div>
                ) : (
                  bookings.map(booking => (
                    <div key={booking.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors relative group">
                      <button 
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        title="Hapus Pesanan"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>

                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {booking.id}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                          booking.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <h4 className="font-bold text-slate-800 text-lg mb-1">{booking.carName}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {booking.startDate} — {booking.endDate}
                      </div>

                      <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                        <div className="text-[10px] text-slate-400">
                          <p>A.n {booking.userName}</p>
                          <p>{booking.withDriver ? 'Dengan Sopir' : 'Lepas Kunci'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Total Bayar</p>
                          <p className="text-md font-extrabold text-indigo-600">Rp {booking.totalPrice.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <div className="bg-indigo-50 rounded-xl p-4 flex items-center gap-3">
                  <div className="text-xl">💡</div>
                  <p className="text-[10px] text-indigo-700 leading-tight">
                    Butuh bantuan atau ingin konfirmasi cepat? Hubungi admin via WhatsApp dengan menyertakan ID Pesanan Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="relative py-20 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1596402184320-417d7178b2cd?auto=format&fit=crop&q=80&w=2000" 
              alt="Jogja" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Eksplor Jogja Tanpa Batas <br/>
              <span className="text-indigo-400">Armada Terbaik, Harga Menarik.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Dari Malioboro hingga Pantai Gunung Kidul. Temukan kendaraan yang tepat untuk perjalanan Anda di Yogyakarta dengan dukungan asisten AI pintar kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-xl"
              >
                Lihat Armada
              </button>
              <button className="bg-indigo-600/30 backdrop-blur-md text-white border border-indigo-400/30 px-8 py-4 rounded-full font-bold hover:bg-indigo-600 transition-all">
                Paket Wisata
              </button>
            </div>
          </div>
        </section>

        {/* Fleet Section */}
        <section id="fleet" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Pilih Armada Kami</h2>
                <p className="text-slate-500">Tersedia berbagai pilihan mobil sesuai budget dan kebutuhan Anda.</p>
              </div>
              
              <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category as CarCategory)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === category 
                        ? 'bg-indigo-600 text-white shadow-lg' 
                        : 'bg-white text-slate-600 hover:bg-indigo-50 border border-slate-200 shadow-sm'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map(car => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  onBook={(car) => setSelectedCar(car)} 
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
           <p>&copy; 2024 JogjaDrive Rental Mobil. Ditenagai oleh Gemini AI.</p>
        </div>
      </footer>

      <AiAssistant />
      <BookingModal 
        car={selectedCar} 
        onClose={() => setSelectedCar(null)} 
        onSuccess={refreshBookings}
      />
    </div>
  );
};

export default App;
