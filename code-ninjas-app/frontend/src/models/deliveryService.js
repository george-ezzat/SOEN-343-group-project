import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const addDelivery = async (deliveryData) => {
  try {
    const deliveryRef = collection(db, 'deliveries');
    await addDoc(deliveryRef, deliveryData);
    return { success: true };
  } catch (error) {
    console.error('Error creating delivery:', error);
    return { success: false, error };
  }
};