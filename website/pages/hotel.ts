import { send } from "../utilities";
import { getUserId } from "./funcs";
import { Hotel } from "./types";

let query = new URLSearchParams(location.search);
let hotelId = parseInt(query.get("hotelId")!);
let userId = await getUserId();

let hotelH1 = document.querySelector("#hotelH1") as HTMLHeadingElement;
let reservationInput = document.querySelector("#reservationInput") as HTMLInputElement;
let reservationButton = document.querySelector("#reservationButton") as HTMLButtonElement;
let hotelImg = document.querySelector("#hotelImg") as HTMLImageElement;
let reservationsUl = document.querySelector("#reservationUl") as HTMLUListElement;

reservationInput.onchange = function() {
  if (userId != null && reservationInput.value != "") {
    reservationButton.disabled = false;
  }
}

reservationButton.onclick = async function() {
  let date = reservationInput.value;
  let success = await send("addReservation", [date, userId, hotelId]);

  if (success) {
    alert("Reservation created successfully!");
    location.reload();
  }
  else {
    alert("The chosen date is already reserved.");
  }
};



let hotel = await send("getHotel", hotelId) as Hotel;

hotelH1.innerText = hotel.Name;
hotelImg.src = hotel.Image;

let dates = await send("getDates", hotelId) as string[];

for (let i = 0; i < dates.length; i++) {
  let date = dates[i];

  let li = document.createElement("li");
  li.innerText = date;
  reservationsUl.appendChild(li);
}

