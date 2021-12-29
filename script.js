const result = document.querySelector(".info");
fetch('https://restcountries.com/v3.1/all')
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        return countryDetails(data);
    })
    .catch(function (err) {
        console.log(err)
    })

const countryDetails = (data) => {
    console.log(data);
    data.forEach((country) => {
        const myDiv = document.createElement("div");
        myDiv.className = "card d-flex m-5";
        myDiv.style.width = "280px";
        myDiv.style.height = "400px";
        myDiv.style.border = "2px solid black";
        myDiv.innerHTML = `<img src="${country.flags.svg}" alt=""/>
            <div class="card-body">
            <h2 class="card-text"><strong>${country.name.common}</h2></br>
            <h5 class="card-text"><strong>Capital:</strong> ${country.capital}</h5>
            <h5 class="card-text"><strong>Region:</strong> ${country.region}</h5>
            <h5 class="card-text"><strong>Country Code:</strong> ${country.altSpellings[0]}</h5>
           </div>`;

        let btn = document.createElement("button");
        btn.innerHTML = "Get Weather";
        btn.style.color = "black";
        btn.style.backgroundColor = "rgb(145, 228, 243)";
        btn.setAttribute = ('id', 'myBtn');
        btn.addEventListener('click', function () {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&appid=0aafc57eb66e4797cbf81924ea9dce97`)
                .then(function (response) {
                    return response.json();
                })
                .then(data => {
                    var main = document.getElementById("main")
                    main.innerHTML =
                        `<h3>${data.name}</h3><br>
                        <h4><strong>Temperature:</strong> ${data.main.temp}</h4>
                        <h4><strong>Humidity:</strong> ${data.main.humidity}</h4>
                        <h4><strong>Pressure:</strong> ${data.main.pressure}</h4>
                        <h4><strong>Temp-Max:</strong> ${data.main.temp_max}</h4>
                        <h4><strong>Temp-Min:</strong> ${data.main.temp_min}</h4>`

                    console.log(data)
                })

                .catch(err => console.log(err))
        })

        myDiv.appendChild(btn);
        result.appendChild(myDiv);

        var popUp = document.getElementById("popUp");

        var close = document.getElementsByClassName("close")[0];
        btn.onclick = function () {
            popUp.style.display = "block";
        }

        close.onclick = function () {
            popUp.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == popUp) {
                popUp.style.display = "none";
            }
        }
    })
}
