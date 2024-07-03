fetch("https://restcountries.com/v3.1/all")
.then(res => res.json())
.then(data => {
    let tblCountries = document.getElementById("tbl");

    let tblBody = `<tr>
                      <th>Name</th>
                      <th>Flag</th>
                    </tr>`;

    data.forEach(element => {
      tblBody += `<tr>
                    <td>${element.name.common}</td>
                    <td>${element.flag}</td>
                </tr>`
    });

    tblCountries.innerHTML = tblBody;
  });


function searchcountries() {
  const searchValue = document.getElementById("txtSearchValue").value;

  const officialName = document.getElementById("officialName");
  const name = document.getElementById("name");
  const population = document.getElementById("population");
  const region = document.getElementById("region");
  const capital = document.getElementById("capital");
  const img = document.getElementById("img");

  console.log(searchValue);
  fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
 .then(res => res.json())
 .then(data => {
      if (data.length > 0) {
        const country = data[0];
        officialName.innerText = country.name.official;
        name.innerText = country.name.common;
        population.innerText = `Population: ${country.population}`;
        region.innerText = `Region: ${country.region}`;
        capital.innerText = `Capital: ${country.capital}`;
        img.innerHTML = `<img src="${country.flags.png}" alt="">`;

        const latlng = `${country.latlng[0]},${country.latlng[1]}`;
        mapBtn.href = `https://www.google.com/maps/place/${latlng}/@${latlng},15z`;
        mapBtn.target = "_blank";
      } else {
        console.log("No country found");
      }
    })
 .catch(error => console.error("Error:", error));
}