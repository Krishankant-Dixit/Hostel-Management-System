import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { auth } from '../firebaseConfig';

export function useFetchData() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadRealData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        // 1. Firebase se secure token lo
        const token = await currentUser.getIdToken();

        // 2. Apne Node.js backend se real-time data fetch karo
        const response = await axios.get('http://localhost:5000/api/dashboard/summary', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          // 3. TODO: Yahan hum action dispatch karke Redux state ko real data se override karenge
          console.log("MongoDB Data Fetched Successfully:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
      }
    };

    // Jab Firebase confirm kar de ki user logged in hai, tabhi data fetch karo
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadRealData();
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
}