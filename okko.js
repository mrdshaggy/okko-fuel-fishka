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

    function searchFuel(city, f) {
        console.log(city, f);
        const cityFilter = data.collection.filter(e => e.attributes['Naselenyy_punkt'] === city);
        console.log(cityFilter);

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

    searchFuel(citySelect.value, fuelSelect.value);

    citySelect.addEventListener('change', (event) => {
        document.getElementById('list').innerHTML = '';
        document.getElementById('empty').innerHTML = '';
        searchFuel(citySelect.value, fuelSelect.value);
    });

    fuelSelect.addEventListener('change', (event) => {
        document.getElementById('list').innerHTML = '';
        document.getElementById('empty').innerHTML = '';
        searchFuel(citySelect.value, fuelSelect.value);
    });
    
  }
});
