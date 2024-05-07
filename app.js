var xhr = new XMLHttpRequest()
// XHMLHttp Request works only with browser, it wont run in local, if we need to run it in local use npm modules.
xhr.open('GET', 'https://restcountries.com/v3.1/all', true)

xhr.onload = function () {
  if (xhr.status === 200) {
    var responseData = JSON.parse(xhr.responseText)
    console.log(responseData)

    //a. Get all the countries from Asia continent using Filter method
    let AsianCountries = responseData.filter(
      (item) => item.continents[0] === 'Asia'
    )
    console.log('a. Countries from Asia ')
    console.log(AsianCountries)

    //b. Get all the countries with a population of less than 2lakhs using Filter
    let filteredCountries = responseData.filter(
      (item) => item.population < 200000
    )
    console.log('b. Countries with population less than 2 lakhs ')
    console.log(filteredCountries)

    //c. print name, capital and flag using forEach.
    responseData.forEach((country, index) => {
      var imageURL = country.flags.png
      var showImage = document.createElement('img')
      showImage.src = imageURL

      var name = country.name.common
      var capital = country.capital

      var info = document.createElement('div')
      var nameElement = document.createElement('p')
      var capitalElement = document.createElement('p')

      nameElement.textContent = 'Name: ' + name
      capitalElement.textContent = 'Capital: ' + capital
      info.appendChild(nameElement)
      info.appendChild(capitalElement)

      document.body.appendChild(info)
      document.body.appendChild(showImage) //displaying the flag in the webpage
    })

    //d. print the total population using reduce method.

    let totalPopulation = responseData.reduce(
      (accumulator, country) => accumulator + country.population,
      0
    )
    let popElement = document.createElement('p')
    popElement.textContent = 'Total Population: ' + totalPopulation
    document.body.appendChild(popElement)

    //e. Print the country that uses US dollars as currency.

    var dollarCountries = responseData.filter((country) => {
      if (country.currencies) {
        // Check if 'USD' is one of the currency codes
        return Object.keys(country.currencies).includes('USD')
      }
      return false // Return false if currencies object is empty or undefined
    })
    let dollarCountryNames = dollarCountries.map(
      (country) => country.name.common
    )

    let dollarElement = document.createElement('p')
    dollarElement.textContent =
      'Countries with USD currency: ' + dollarCountryNames
    document.body.appendChild(dollarElement)
  }
}

xhr.send()

//IIFE - calls itself in the end, anonymous function doesnt have a name, just the keyword.
