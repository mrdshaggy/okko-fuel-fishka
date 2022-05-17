var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

getJSON('https://www.okko.ua/api/uk/type/gas_stations?&callback',
function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    const citySelect = document.getElementById("city");
    const fuelSelect = document.getElementById("fuel");
    const citySearchInput = document.getElementById("citySearch");
    const citySearchBtn = document.getElementById("citySearchBtn");
    const citySearchClear = document.getElementById("citySearchClear");

    console.log(data);


    function searchFuel(city, f) {
        console.log(city, f);
        const cityFilter = data.collection.filter(e => e.attributes['Naselenyy_punkt'] === city);
        console.log(cityFilter);
        document.getElementById('location').innerHTML = ' - ' + city + ' - ' + fuelSelect.options[fuelSelect.selectedIndex].text;

        cityFilter.forEach(element => {

            let regex = f;
            let match = JSON.stringify(element).match(regex)
            // console.log(match);
            if (match != null) {
                // console.log(element.attributes.Adresa);
                var locations = element.attributes.Adresa;
                document.getElementById('list').innerHTML += locations + '<br>';
            }
            
        });
    
        if (document.getElementById('list').innerHTML.length === 0) {
            document.getElementById('empty').innerHTML = 'Для простих смертних нічого немає';
        }
    }

    function capitalizeWords(str) {
        // return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        let result = (str.split('-').map(e=>e.charAt(0).toUpperCase() + e.slice(1))).join('-');
        return result;
    };

    

    searchFuel(citySelect.value, fuelSelect.value);

    citySelect.addEventListener('change', (event) => {
        document.getElementById('location').innerHTML = '';
        document.getElementById('list').innerHTML = '';
        document.getElementById('empty').innerHTML = '';
        citySearchInput.value = '';
        searchFuel(citySelect.value, fuelSelect.value);
    });

    fuelSelect.addEventListener('change', (event) => {
        document.getElementById('list').innerHTML = '';
        document.getElementById('empty').innerHTML = '';
        if (citySearchInput.value) {
            searchFuel(capitalizeWords(citySearchInput.value), fuelSelect.value);
        } else {
            searchFuel(citySelect.value, fuelSelect.value);
        }
    });

    citySearchBtn.addEventListener('click', (event) => {
        document.getElementById('list').innerHTML = '';
        document.getElementById('empty').innerHTML = '';
        if (citySearchInput.value) {
            searchFuel(capitalizeWords(citySearchInput.value), fuelSelect.value);
        } else {
            searchFuel(citySelect.value, fuelSelect.value);
        }
    });

    citySearchClear.addEventListener('click', (event) => {
        citySearchInput.value = '';
        citySelect.removeAttribute("disabled");
        citySearchBtn.setAttribute("disabled", "disabled");
        citySearchClear.setAttribute("disabled", "disabled");
    });

    citySearchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById('list').innerHTML = '';
            document.getElementById('empty').innerHTML = '';
            if (citySearchInput.value) {
                searchFuel(capitalizeWords(citySearchInput.value), fuelSelect.value);
            } else {
                searchFuel(citySelect.value, fuelSelect.value);
            }
        }
    });

    citySearchInput.addEventListener("keyup", function(event) {
        if (event.key) {
            if (citySearchInput.value.length === 0) {
                citySelect.removeAttribute("disabled");
                citySearchBtn.setAttribute("disabled", "disabled");
                citySearchClear.setAttribute("disabled", "disabled");
            } else {
                citySelect.setAttribute("disabled", "disabled");
                citySearchBtn.removeAttribute("disabled");
                citySearchClear.removeAttribute("disabled");
            }
        }
    });
    
  }
});
