// public/saveCode.js
import { ref, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { db } from "../public/firebase.js";

export async function saveCode(code) {
  await set(ref(db, `codes/${code}`), true);
}
