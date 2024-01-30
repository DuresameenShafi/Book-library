import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3fLSeKLdB_RUheMhdyztbDuXpPVpAPKI",
  authDomain: "authenticatio0n.firebaseapp.com",
  databaseURL: "https://authenticatio0n-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "authenticatio0n",
  storageBucket: "authenticatio0n.appspot.com",
  messagingSenderId: "708014215750",
  appId: "1:708014215750:web:04b0577640ab187ffb7047"
};


const appSettings = {
  databaseURL: "https://authenticatio0n-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
export const todoDB = ref(database, "todos")

const titleName = document.getElementById('title-name');
const titleField = document.getElementById('title-field');
const priceField = document.getElementById('price-field');
const buttonEl = document.getElementById('add-to-cart');
const shoppingList = document.getElementById('shopping-list');


buttonEl.addEventListener("click", function () {
  let name = titleName.value
  let title = titleField.value;
  let price = priceField.value;
  let image = previewImage.src;

  if (name && title && price && image) {
    const newItemRef = push(todoDB);
    const newItemKey = newItemRef.key;

    // Use the key to set the data
    set(ref(database, `todos/${newItemKey}`), {
      name:  name,
      title: title,
      price: price,
      image: image
    });
    clearInputFields();
        previewImage.style.display = 'none'; // Hide preview after adding book
    } else {
        alert("Please enter author name, title, price, and upload an image.");
    }
});

onValue(todoDB, function (snapshot) {
  if (snapshot.exists()) {
    clearShoppingList();
    console.log('onvalue', snapshot.val())
    const data = Object.entries(snapshot.val());
    console.log(`file:addBook,js`, data)

    for (let i = 0; i < data.length; i++) {
      appenItemToShoppingList(data[i]);
    }
  } else {
    shoppingList.innerHTML = ``;
  }
});

function clearInputFields() {
  titleName.value = "";
  titleField.value = "";
  priceField.value = "";
}

function clearShoppingList() {
  shoppingList.innerHTML = "";
}

function appenItemToShoppingList(item) {
  let itemId = item[0];
  let itemData = item[1];
 

  let newLi = document.createElement("li");
  newLi.innerHTML = `<strong>Author Name: </strong>${itemData.name}<br><li><strong>Book Title: </strong>${itemData.title}<br><li><strong>Price:</strong> ${itemData.price}/- Rs`;
  
  if (itemData.image) {
    let img = document.createElement("img");
    img.src = itemData.image;
    img.style.maxWidth = "100px"; // Adjust as needed
    newLi.appendChild(img);
}
    

  newLi.addEventListener("dblclick", function () {
    let locationToDelete = ref(database, `todos/${itemId}`);
    remove(locationToDelete);
  });

  shoppingList.append(newLi);
  

}
// Update your JavaScript code to handle image upload and preview

const imageUpload = document.getElementById('image-upload');
const previewImage = document.getElementById('preview-image');

// Add event listener to image upload input
imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        previewImage.src = e.target.result;
        previewImage.style.display = 'block';
    };

    reader.readAsDataURL(file);
});