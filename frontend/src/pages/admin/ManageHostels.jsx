import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Building2, Plus, MapPin, Users, Info } from 'lucide-react';
import { addHostel } from '../../store/slices/hmsSlice';
import toast from 'react-hot-toast';

export default function ManageHostels() {
  const dispatch = useDispatch();
  const hostels = useSelector((state) => state.hms.hostels);
  const rooms = useSelector((state) => state.hms.rooms);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('Standard');
  const [gender, setGender] = useState('boys');
  const [capacity, setCapacity] = useState('');
  const [address, setAddress] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !capacity || !address) {
      toast.error('Please enter name, capacity, and address');
      return;
    }
    dispatch(addHostel({ name, type, gender, capacity, address, description: desc }));
    setName('');
    setCapacity('');
    setAddress('');
    setDesc('');
    setShowAddModal(false);
    toast.success('Hostel added successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">Hostels Management</h2>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Manage block configurations and allocations.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 py-2 px-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Hostel
        </button>
      </div>

      {/* Grid of Hostels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hostels.map((h) => {
          const hostelRoomsCount = rooms.filter((r) => r.hostelId === h.id).length;
          const occupiedBeds = rooms.filter((r) => r.hostelId === h.id).reduce((sum, r) => sum + r.currentOccupancy, 0);
          return (
            <div key={h.id} className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden flex flex-col justify-between hover-scale">
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-50 p-2.5 rounded-xl text-[#4F46E5]">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{h.name}</h3>
                      <span className="text-[10px] bg-indigo-50 text-[#4F46E5] font-bold px-2 py-0.5 rounded-full uppercase mt-1 inline-block">
                        {h.type} Block
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                    h.gender === 'boys' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'
                  }`}>
                    {h.gender}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed line-clamp-2">{h.description}</p>
                
                <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-semibold text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{h.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{occupiedBeds} / {h.capacity} Beds Occupied</span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="px-5 pb-5 pt-2 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between text-xs font-bold text-gray-600">
                <div className="flex-1 mr-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${h.gender === 'boys' ? 'bg-[#4F46E5]' : 'bg-pink-500'}`}
                      style={{ width: `${(occupiedBeds / h.capacity) * 100}%` }}
                    />
                  </div>
                </div>
                <span>{((occupiedBeds / h.capacity) * 100 || 0).toFixed(0)}% Fill</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-bold text-gray-900 text-base">Add New Hostel</h3>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-600">Hostel Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Boys Hostel C" className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-white" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-gray-600">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-white">
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Classic">Classic</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-600">Gender Allocation</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-white">
                  <option value="boys">Boys</option>
                  <option value="girls">Girls</option>
                  <option value="co-ed">Co-Ed</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-gray-600">Capacity (Beds)</label>
                <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="e.g. 300" className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-white" />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-gray-600">Address Location</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Campus Location" className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-white" />
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-gray-600">Description</label>
              <textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Hostel description..." className="w-full p-3 border border-gray-200 rounded-xl bg-white" />
            </div>

            <div className="flex gap-2 justify-end pt-2 text-xs font-bold">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-100 hover:bg-gray-250 text-gray-700 rounded-xl transition-all">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl transition-all shadow-md">Add Hostel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
