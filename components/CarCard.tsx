
import React from 'react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onBook: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onBook }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
          {car.category}
        </div>
      </div>
      
      <div className="p-5 flex-grow">
        <h3 className="text-xl font-bold text-slate-800 mb-1">{car.name}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {car.features.map((feature, idx) => (
            <span key={idx} className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {feature}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-6 text-xs text-slate-500">
          <div className="flex flex-col items-center p-2 bg-slate-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mb-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>{car.passengers} Kursi</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-slate-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mb-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            <span>{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-slate-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mb-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{car.fuel}</span>
          </div>
        </div>
      </div>
      
      <div className="p-5 border-t border-slate-50 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">Mulai dari</p>
          <p className="text-lg font-bold text-indigo-600">
            Rp {car.pricePerDay.toLocaleString('id-ID')}
            <span className="text-xs text-slate-400 font-normal">/hari</span>
          </p>
        </div>
        <button 
          onClick={() => onBook(car)}
          className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-lg"
        >
          Pesan
        </button>
      </div>
    </div>
  );
};

export default CarCard;
