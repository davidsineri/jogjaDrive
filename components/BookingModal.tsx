
import React, { useState } from 'react';
import { Car } from '../types';
import { storageService } from '../services/storageService';

interface BookingModalProps {
  car: Car | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ car, onClose, onSuccess }) => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    userName: '',
    userPhone: '',
    withDriver: false
  });

  if (!car) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate total price (simplified)
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)));
    const basePrice = car.pricePerDay * days;
    const driverFee = formData.withDriver ? 150000 * days : 0;
    
    storageService.saveBooking({
      carId: car.id,
      carName: car.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      userName: formData.userName,
      userPhone: formData.userPhone,
      withDriver: formData.withDriver,
      totalPrice: basePrice + driverFee
    });

    setSuccess(true);
    if (onSuccess) onSuccess();
    
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {success ? (
          <div className="p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Booking Berhasil!</h2>
            <p className="text-slate-500">Data Anda telah tersimpan di sistem kami. Cek riwayat pesanan Anda di menu "Pesanan Saya".</p>
          </div>
        ) : (
          <>
            <div className="bg-slate-50 p-6 flex items-center gap-4 border-b border-slate-100">
              <img src={car.imageUrl} alt={car.name} className="w-24 h-24 object-cover rounded-2xl shadow-sm" />
              <div>
                <h3 className="text-xl font-bold text-slate-800">{car.name}</h3>
                <p className="text-indigo-600 font-semibold">Rp {car.pricePerDay.toLocaleString('id-ID')} / hari</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Tgl Mulai</label>
                  <input 
                    required 
                    type="date" 
                    value={formData.startDate}
                    onChange={e => setFormData({...formData, startDate: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 transition-all text-sm" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Tgl Selesai</label>
                  <input 
                    required 
                    type="date" 
                    value={formData.endDate}
                    onChange={e => setFormData({...formData, endDate: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 transition-all text-sm" 
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
                <input 
                  required 
                  type="text" 
                  placeholder="Masukkan nama Anda" 
                  value={formData.userName}
                  onChange={e => setFormData({...formData, userName: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 transition-all text-sm" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">No. WhatsApp</label>
                <input 
                  required 
                  type="tel" 
                  placeholder="08xx xxxx xxxx" 
                  value={formData.userPhone}
                  onChange={e => setFormData({...formData, userPhone: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 transition-all text-sm" 
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-2xl">
                <input 
                  type="checkbox" 
                  id="driver" 
                  checked={formData.withDriver}
                  onChange={e => setFormData({...formData, withDriver: e.target.checked})}
                  className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500" 
                />
                <label htmlFor="driver" className="text-sm font-medium text-indigo-900 cursor-pointer select-none">
                  Gunakan Sopir (+ Rp 150.000/hari)
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-1"
              >
                Konfirmasi Booking
              </button>
              <p className="text-[10px] text-center text-slate-400">Dengan memesan, Anda menyetujui syarat & ketentuan sewa JogjaDrive.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
