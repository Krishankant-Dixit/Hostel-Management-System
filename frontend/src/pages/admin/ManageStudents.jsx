import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Users, Bed, HelpCircle, AlertCircle, PlusCircle, CheckCircle, ShieldAlert } from 'lucide-react';
import { allocateRoom, unallocateRoom } from '../../store/slices/hmsSlice';
import toast from 'react-hot-toast';

export default function ManageStudents() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.hms);

  const students = state.users.filter((u) => u.role === 'student');
  const rooms = state.rooms;
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [roomIdToAllocate, setRoomIdToAllocate] = useState('');

  const handleAllocate = (e) => {
    e.preventDefault();
    if (!roomIdToAllocate || !selectedStudent) {
      toast.error('Please select a room');
      return;
    }
    dispatch(allocateRoom({ studentId: selectedStudent.id, roomId: roomIdToAllocate }));
    setSelectedStudent(null);
    setShowAllocateModal(false);
    toast.success('Room allocated successfully!');
  };

  const handleUnallocate = (studentId) => {
    dispatch(unallocateRoom({ studentId }));
    toast.success('Room unallocated successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-gray-900">Student Registry</h2>
        <p className="text-xs text-gray-500 font-semibold mt-0.5">Manage details of student residents, check room statuses, and allocations.</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 font-bold uppercase border-b border-gray-100">
                <th className="p-4">Student</th>
                <th className="p-4">Enrollment No</th>
                <th className="p-4">Course Details</th>
                <th className="p-4">Parent Phone</th>
                <th className="p-4">Allocated Room</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
              {students.map((st) => {
                const det = state.studentDetails.find((d) => d.userId === st.id);
                const rm = rooms.find((r) => r.id === det?.roomId);
                const hst = state.hostels.find((h) => h.id === det?.hostelId);

                return (
                  <tr key={st.id} className="hover:bg-gray-50/50">
                    <td className="p-4 flex items-center gap-3">
                      <img src={st.avatar} className="w-8 h-8 rounded-full object-cover border" alt="" />
                      <div>
                        <p className="font-bold text-gray-900">{st.fullName}</p>
                        <p className="text-[10px] text-gray-400">{st.email}</p>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-gray-800">{det?.enrollmentNumber || 'N/A'}</td>
                    <td className="p-4">
                      <p>{det?.course}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{det?.department} • Year {det?.year}</p>
                    </td>
                    <td className="p-4">{det?.parentContact || 'N/A'}</td>
                    <td className="p-4">
                      {rm ? (
                        <div>
                          <p className="font-bold text-gray-800">Room {rm.roomNumber}</p>
                          <p className="text-[10px] text-[#4F46E5] font-semibold">{hst?.name}</p>
                        </div>
                      ) : (
                        <span className="text-amber-600 bg-amber-50 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Not Allocated</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {rm ? (
                        <button
                          onClick={() => handleUnallocate(st.id)}
                          className="px-2.5 py-1.5 bg-red-50 text-red-600 font-bold text-[10px] rounded-xl hover:bg-red-100 transition-all cursor-pointer"
                        >
                          Unallocate
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedStudent(st);
                              const avail = rooms.find((r) => r.status !== 'Under Maintenance' && r.currentOccupancy < r.capacity);
                            if (avail) setRoomIdToAllocate(avail.id);
                            setShowAllocateModal(true);
                          }}
                          className="px-2.5 py-1.5 bg-indigo-50 text-[#4F46E5] font-bold text-[10px] rounded-xl hover:bg-indigo-100 transition-all cursor-pointer"
                        >
                          Allocate Room
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Allocation Modal */}
      {showAllocateModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAllocate} className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-bold text-gray-900 text-base">Allocate Room Manually</h3>
            <p className="text-xs text-gray-500">Allocating room to student: <strong className="text-gray-700">{selectedStudent.fullName}</strong></p>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-gray-600">Select Available Room</label>
              <select
                value={roomIdToAllocate}
                onChange={(e) => setRoomIdToAllocate(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-white"
              >
                {rooms.filter(r => r.status !== 'Under Maintenance' && r.currentOccupancy < r.capacity).map((r) => {
                  const hostelName = state.hostels.find(h => h.id === r.hostelId)?.name || 'Hostel';
                  return (
                    <option key={r.id} value={r.id}>
                      {hostelName} - Room {r.roomNumber} ({r.roomType})
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex gap-2 justify-end pt-2 text-xs font-bold">
              <button type="button" onClick={() => setShowAllocateModal(false)} className="px-4 py-2 bg-gray-100 hover:bg-gray-250 text-gray-700 rounded-xl transition-all">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl transition-all shadow-md">Allocate</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
