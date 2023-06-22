import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, addDoc } from "firebase/firestore";
import { ref } from 'vue'
import exp from "constants";

const config = {
  apiKey: 'AIzaSyBiT_WbANpN4ntqRCvuV48EZ4x4lsxO5Wc',
  authDomain: 'boat-51710.firebaseapp.com',
  projectId: 'boat-51710',
  storageBucket: 'boat-51710.appspot.com',
  messagingSenderId: '1093694730199',
  appId: '1:1093694730199:web:84e89bac8dfb79eed4a592',
  measurementId: 'G-P535XQYL57'
}

const firebaseApp = initializeApp(config)

const db = getFirestore(firebaseApp)
const usersCollection = collection(db, "users")
const clientsCollection = collection(db, "clients")
const infosCollection = collection(db, "infos")
const placesCollection = collection(db, "places")
const statusCollection = collection(db, "status")
const vehicleCollection = collection(db, "vehicle")

export const checkUser = async (email: any,  password: any) => {
  const users = ref([])
  const querySnapshot = await getDocs(usersCollection);
  const docSnapshots = querySnapshot.docs;
  for (const doc of docSnapshots) {
    if (doc.get('email') === email && doc.get('password') === password) {
      console.log('data', doc.data())
      return await doc.data()
    }
  }
  return users
}

export const getListVehicle = async() => {
  const querySnapshot = await getDocs(vehicleCollection);
  const list = [];
  for (const doc of querySnapshot.docs) {
    list.push(doc.data())
  }
  return list ?? [];
}

export const getPlaces = async() => {
  const querySnapshot = await getDocs(placesCollection);
  const list = [];
  for (const doc of querySnapshot.docs) {
    list.push(doc.data())
  }
  return list ?? [];
}

export const addVehicle = async (params:any) => {
  await addDoc(vehicleCollection, params);
}

export const addBussinessData = async (params: any) => {
  await addDoc()
}
