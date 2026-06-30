import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bed, Plus, HelpCircle, Eye, AlertCircle } from 'lucide-react';
import { addRoom, updateRoomStatus } from '../../store/slices/hmsSlice';
import toast from 'react-hot-toast';

export default function ManageRooms() {
  const dispatch = useDispatch();
  const rooms = state => state.hms.rooms;
  const hostels = state => state.hms.hostels;
  
  const allRooms = useSelector(rooms);
  const allHostels = useSelector(hostels);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedHostelFilter, setSelectedHostelFilter] = useState('');
  
  // Form states
  const [roomNumber, setRoomNumber] = useState('');
  const [hostelId, setHostelId] = useState('');
  const [floor, setFloor] = useState('');
  const [capacity, setCapacity] = useState('2');
  const [roomType, setRoomType] = useState('Double Sharing');

  const filteredRooms = selectedHostelFilter
    ? allRooms.filter((r) => r.hostelId === selectedHostelFilter)
    : allRooms;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomNumber || !hostelId || !floor || !capacity) {
      toast.error('Please enter all fields');
      return;
    }
    dispatch(addRoom({ hostelId, roomNumber, floor, capacity, roomType }));
    setRoomNumber('');
    setFloor('');
    setShowAddModal(false);
    toast.success('Room added successfully!');
  };

  const handleStatusChange = (roomId, status) => {
    dispatch(updateRoomStatus({ roomId, status }));
    toast.success(`Room status updated to ${status}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900">Rooms Management</h2>
          <p className="text-xs text-gray-500 font-semibold mt-0.5">Configure roommates sharing capacity and facilities.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedHostelFilter}
            onChange={(e) => setSelectedHostelFilter(e.target.value)}
            className="h-10 px-3 border border-gray-200 rounded-xl bg-white text-xs font-bold text-gray-700 focus:outline-none"
          >
            <option value="">All Hostels</option>
            {allHostels.map((h) => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
          <button
            onClick={() => {
              if (allHostels.length > 0) setHostelId(allHostels[0].id);
              setShowAddModal(true);
            }}
            className="flex items-center gap-1.5 py-2 px-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Room
          </button>
        </div>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 font-bold uppercase border-b border-gray-100">
                <th className="p-4">Room No</th>
                <th className="p-4">Hostel Name</th>
                <th className="p-4">Floor</th>
                <th className="p-4">Room Type</th>
                <th className="p-4 text-center">Occupancy</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
              {filteredRooms.map((r) => {
                const hostelName = allHostels.find((h) => h.id === r.hostelId)?.name || 'N/A';
                return (
                  <tr key={r.id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-bold text-gray-900 flex items-center gap-2">
                      <Bed className="w-4 h-4 text-gray-400" />
                      {r.roomNumber}
                    </td>
                    <td className="p-4">{hostelName}</td>
                    <td className="p-4">Floor {r.floor}</td>
                    <td className="p-4">{r.roomType}</td>
                    <td className="p-4 text-center font-bold text-gray-800">{r.currentOccupancy} / {r.capacity}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        r.status === 'Occupied' ? 'bg-indigo-50 text-[#4F46E5]' :
                        r.status === 'Available' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                      }`}>{r.status}</span>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={r.status}
                        onChange={(e) => handleStatusChange(r.id, e.target.value)}
                        className="text-[10px] font-bold text-gray-600 bg-gray-50 border rounded-lg p-1 outline-none cursor-pointer"
                      >
                        <option value="Available">Set Available</option>
                        <option value="Occupied">Set Occupied</option>
                        <option value="Under Maintenance">Set Maintenance</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-bold text-gray-900 text-base">Add New Room</h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-600">Room Number</label>
                <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} placeholder="e.g. 204" className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-white" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-gray-600">Select Hostel</label>
                <select value={hostelId} onChange={(e) => setHostelId(e.target.value)} className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-white">
                  {allHostels.map((h) => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-600">Floor Level</label>
                <input type="number" value={floor} onChange={(e) => setFloor(e.target.value)} placeholder="e.g. 2" className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-white" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-gray-600">Sharing Capacity</label>
                <select value={capacity} onChange={(e) => {
                  setCapacity(e.target.value);
                  if (e.target.value === '1') setRoomType('Single Sharing');
                  else if (e.target.value === '2') setRoomType('Double Sharing');
                  else if (e.target.value === '3') setRoomType('Triple Sharing');
                  else setRoomType('Dormitory');
                }} className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-white">
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                </select>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-gray-600">Room Sharing Type Description</label>
              <input type="text" readOnly value={roomType} className="w-full h-10 px-3 border border-gray-100 rounded-xl bg-gray-50 text-gray-400 font-bold" />
            </div>

            <div className="flex gap-2 justify-end pt-2 text-xs font-bold">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-100 hover:bg-gray-250 text-gray-700 rounded-xl transition-all">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl transition-all shadow-md">Add Room</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
