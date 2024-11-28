import { collection, addDoc } from 'firebase/firestore';
import FirebaseSingleton from '../firebase';

export const addDelivery = async (deliveryData) => {
  try {
    const db = FirebaseSingleton.getFirestore();
    const deliveryRef = collection(db, 'deliveries');
    const docRef = await addDoc(deliveryRef, deliveryData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating delivery:', error);
    return { success: false, error };
  }
};