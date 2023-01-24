import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  DocumentData,
  collection,
  CollectionReference,
} from "firebase/firestore";
import { CpuInfo } from "os";
import { Collection } from "typescript";

interface CharacterCoords {
  top: number;
  left: number;
  bottom: number;
  right: number;
}
export interface Characters {
  [key: string]: CharacterCoords;
}

const firebaseConfig = {
  apiKey: "AIzaSyCBNI7nZIoSJtVbMARKhYHpZjHQ9CJcV4I",
  authDomain: "wheres-waldo-7e128.firebaseapp.com",
  projectId: "wheres-waldo-7e128",
  storageBucket: "wheres-waldo-7e128.appspot.com",
  messagingSenderId: "504744157634",
  appId: "1:504744157634:web:f4251abfce9d283079f65b",
  measurementId: "G-XRTNCL4C1N",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) =>
  collection(db, collectionName) as CollectionReference<T>;

export const charactersCol = createCollection<Characters>("characters");

const getCharacterPositions = async () => {
  try {
    const docRef = doc(charactersCol, "characterList");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (err) {
    console.error("Failed to get characters", err);
  }
};

export default getCharacterPositions;
