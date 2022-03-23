function save() {
  var new_data =
    " Gallons Requested: " + document.getElementById("inputGallon").value;

  if (localStorage.getItem("data") == null) {
    localStorage.setItem("data", "[]");
  }

  var old_data = JSON.parse(localStorage.getItem("data"));
  old_data.push(new_data);

  localStorage.setItem("data", JSON.stringify(old_data));
}

function view() {
  if (localStorage.getItem("data") != null) {
    document.getElementById("output").innerHTML = JSON.parse(
      localStorage.getItem("data")
    );
  }
}
/*const inputGallon = document.getElementById("inputGallon");
  const buttonPlace = document.getElementById("buttonPlace");
  const inputStreet = document.getElementById("inputStreet");
  const lStorage = document.getElementById("lStorage");

  buttonPlace.onclick = function (ev) {
    const gallons = inputGallon.value;
    const address = inputStreet.value;

    if (gallons && address) {
      localStorage.setItem(gallons, address);
      location.reload();
    }
  };

  for (let i = 0; i < localStorage.length; i++) {
    const gallons = localStorage.key(i);
    const address = localStorage.getItem(gallons);

    lStorage.innerHTML += `${gallons}: ${address} <br />`;
  }*/

/*let gallons = [];
const addGal = (ev) => {
  ev.preventDefault();
  let gallon = {
    inputGal: document.getElementById("inputGallons").value,
  };

  gallons.push(addGal);
};*/
