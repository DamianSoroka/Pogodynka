import './App.css';
import './Icons.css';
import React, { useState } from 'react';
import axios from 'axios';

let refreshingCycle = false;

function App() {
  const [content, setContent] = useState("");
  let rainMeasure, snowMeasure, countingClouds;
  let weatherIconsArray = [];
  let currTime = new Date(), currHour = currTime.toLocaleTimeString();
  let dayNight = "";
  let weatherForecastDiv = "";
  let dayNumber = 0;
  let kafelki = [];
  let rain = "", snow = "", clouds;
  let hour, sunrise, sunset;

  let monthAsWord = (month) => {
    switch (parseInt(month)) {
      case 1:
        return "January";
      case 2:
        return "Febuary";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "";
    }
  }

  let addTh = (day) => {
    switch (Number(day)) {
      case 1:
        return "1st";
      case 2:
        return "2nd";
      case 3:
        return "3rd";
      case 21:
        return "21st";
      case 22:
        return "22nd";
      case 23:
        return "23rd";
      case 31:
        return "31st";
      default:
        return Number(day) + "th";
    }
  }

  let hourlyRain = (rain) => {
    if (rain === 0) {
      rainMeasure = "none";
    } else if (rain > 0 && rain <= 0.3) {
      rainMeasure = "low";
    } else if (rain > 0.3 && rain <= 0.7) {
      rainMeasure = "mid";
    } else {
      rainMeasure = "high";
    }
  }

  let hourlySnow = (snow) => {
    if (snow === 0) {
      snowMeasure = "none";
    } else if (snow > 0 && snow <= 0.3) {
      snowMeasure = "low";
    } else if (snow > 0.3 && snow <= 0.7) {
      snowMeasure = "mid";
    } else {
      snowMeasure = "high";
    }
  }

  let numberOfCloudsInTheSky = (clouds) => {
    if (clouds <= 10) {
      countingClouds = "none";
    } else if (clouds > 10 && clouds <= 30) {
      countingClouds = "few";
    } else if (clouds > 30 && clouds <= 50) {
      countingClouds = "more than few";
    } else if (clouds > 50 && clouds <= 90) {
      countingClouds = "definitely more than few";
    } else {
      countingClouds = "just one but a big one";
    }
  }

  let theLastWeatherCheck = () => {
    if (dayNight === "day") {
      if (rainMeasure === "none" && snowMeasure === "none") {
        switch (countingClouds) {
          case "none":
            return "clear sky";
          case "few":
            return "few clouds";
          case "more than few":
            return "more than few clouds";
          case "definitely more than few":
            return "definitely more than few clouds";
            case "just one but a big one":
              return "just a one big daddy cloud";
          default:
            return ".";
        }
      } else if (rainMeasure !== "none") {
        if (snowMeasure !== "none") {
          return "snow with rain";
        } else {
          if (countingClouds === "just one but a big one") {
            switch (rainMeasure) {
              case "low":
                return "drizzle";
              case "mid":
                return "normal rain";
              case "high":
                return "big rain";
              default:
                return ".";
            }
          } else if (countingClouds === "more than few" || countingClouds === "definitely more than few") {
            switch (rainMeasure) {
              case "low":
                return "drizzle with sun";
              case "mid":
                return "drizzle with sun";
              case "high":
                return "big rain with sun";
              default:
                return ".";
            }
          } else {
            return "rain with big sun";
          }
        }
      } else {
        if (countingClouds === "just one but a big one") {
          switch (snowMeasure) {
            case "low":
              return "snow";
            case "mid":
              return "normal snow";
            case "high":
              return "snowstorm";
            default:
              return ".";
          }
        } else if (countingClouds === "more than few" || countingClouds === "definitely more than few") {
          switch (snowMeasure) {
            case "low":
              return "snow with sun";
            case "mid":
              return "snow with sun";
            case "high":
              return "normal snow with sun";
            default:
              return ".";
          }
        } else {
          return "snow with big sun";
        }
      }
    } else {
      if (rainMeasure === "none" && snowMeasure === "none") {
        switch (countingClouds) {
          case "none":
            return "clear night";
          case "few":
            return "few clouds in night";
          case "more than few":
            return "more than few clouds in night";
          case "definitely more than few":
            return "definitely more than few clouds in night";
          case "just one but a big one":
              return "just a one big daddy cloud";
          default:
            return ".";
        }
      } else if (rainMeasure !== "none") {
        if (snowMeasure !== "none") {
          return "snow with rain";
        } else {
          if (countingClouds === "just one but a big one") {
            switch (rainMeasure) {
              case "low":
                return "drizzle";
              case "mid":
                return "normal rain";
              case "high":
                return "big rain";
              default:
                return ".";
            }
          } else if (countingClouds === "more than few" || countingClouds === "definitely more than few") {
            switch (rainMeasure) {
              case "low":
                return "drizzle";
              case "mid":
                return "normal rain";
              case "high":
                return "big rain";
              default:
                return ".";
            }
          } else {
            return "normal rain";
          }
        }
      } else {
        if (countingClouds === "just one but a big one") {
          switch (snowMeasure) {
            case "low":
              return "snow";
            case "mid":
              return "normal snow";
            case "high":
              return "snowstorm";
            default:
              return ".";
          }
        } else if (countingClouds === "more than few" || countingClouds === "definitely more than few") {
          switch (snowMeasure) {
            case "low":
              return "snow";
            case "mid":
              return "normal snow";
            case "high":
              return "snowstorm";
            default:
              return ".";
          }
        } else {
          return "normal snow";
        }
      }
    }
  }

  let WeatherIcons1 = () => {
    let icons = [];

    for (let i = 0; i < 12; i++) {
      icons.push(
        <div key={i + (dayNumber * 24)} id={weatherIconsArray[i + (dayNumber * 24)].replace(/\s/g, "")} alt={`${i}`} />
      );
    }
    
    return <div id="weather_icons_1" className = "weather_icons">{icons}</div>
  }

  let WeatherIcons2 = () => {
    let icons = [];

    for (let i = 12; i < 24; i++) {
      icons.push(
        <div key={i} id={weatherIconsArray[i].replace(/\s/g, "")} alt={`${i}`} />
      );
    }

    return <div id="weather_icons_2" className = "weather_icons">{icons}</div>
  }

  let getCurrentTime = () => {
    let currTime = new Date();
    currHour = currTime.toLocaleTimeString();
    currHour = currHour.charAt(0) + currHour.charAt(1) + currHour.charAt(2) + currHour.charAt(3) + currHour.charAt(4);
  } // pobiera aktualną godzinę

  let nightOrDay = (sunrise, sunset) => {
    if (currHour >= sunrise && currHour <= sunset) {
      weatherForecastDiv = "day_background";
      return "day";
    } else {
      weatherForecastDiv = "night_background";
      return "night";
    }
  } // daje tło aplikacji na dzienne lub nocne

  let RefreshWeather = () => {
    if (!refreshingCycle) {
      getWeatherData();
      setInterval(getWeatherData, 1800000);
      refreshingCycle = true;
    }
  } // odświerza pogode co 30 minut

  let isDay = (hour, sunrise, sunset) => {
    if (hour >= sunrise && hour <= sunset) {
      dayNight = "day";
    } else {
      dayNight = "night";
    }
  } // sprawdza, czy jest dzień, czy noc

  let dayBack = () => {
    if (dayNumber !== 0) {
      kafelki = [];
      dayNumber--;
      getWeatherData();
    }
  } // skrócony zapis kodu, powinien działać szybciej, NIE SPAMIĆ funkcji

  let dayForward = () => {
    if (dayNumber !== 6) {
      kafelki = [];
      dayNumber++;
      getWeatherData();
    }
  } // skrócony zapis kodu, powinien działać szybciej, NIE SPAMIĆ funkcji

  let addTile = (kafelek, temperature, isItDay, i) => {
    kafelki.push(<div key={i} className="kafelek" alt="kafelek">{kafelek}<br/>{temperature}<br/>{isItDay}</div>);
  } // ta funkcja dodaje kafelek z pogodą na dany dzień (prognoza na następne 7 dni)

  let ICykKafelki = () => {
    return <div id="kafelki">{kafelki}</div>;
  }

  let dayChecker = (response, i) => {
    let hours = [];

    for (let j = 6; j < 22; j++) {
      rain = response.data.hourly.rain[j + (i * 24)];
      snow = response.data.hourly.snowfall[j + (i * 24)];
      clouds = response.data.hourly.cloudcover[j + (i * 24)];
      hour = response.data.hourly.time[j + (i * 24)].charAt(11) + response.data.hourly.time[j + (i * 24)].charAt(12);
      sunrise = response.data.daily.sunrise[i].charAt(11) + response.data.daily.sunrise[i].charAt(12) + ":" + response.data.daily.sunrise[i].charAt(14) + response.data.daily.sunrise[i].charAt(15);
      sunset = response.data.daily.sunset[i].charAt(11) + response.data.daily.sunset[i].charAt(12) + ":" + response.data.daily.sunset[i].charAt(14) + response.data.daily.sunset[i].charAt(15);

      console.log(hour);
      
      hourlyRain(rain);
      hourlySnow(snow);
      numberOfCloudsInTheSky(clouds);
      isDay(hour, sunrise, sunset);

      hours.push(theLastWeatherCheck());
    }
    console.log(hours);

    let result = mode(hours);

    return <div key={i} className="daily_icons" id={result.replace(/\s/g, "")} alt={`${i}`} />;
  }

  let mode = (arr) => {
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
  }

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=54.35&longitude=18.65&hourly=temperature_2m,rain,snowfall,cloudcover&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&timezone=auto`
      );

      console.log(response);

      let hour = "", day = "", month = "";
      let convertJSONIntoSomeActualGoodLookingFormat = "";
      let finalHourlyData1 = "", finalHourlyData2 = "";
      let sunrise = response.data.daily.sunrise[0].charAt(11) + response.data.daily.sunrise[0].charAt(12) + ":" + response.data.daily.sunrise[0].charAt(14) + response.data.daily.sunrise[0].charAt(15);
      let sunset = response.data.daily.sunset[0].charAt(11) + response.data.daily.sunset[0].charAt(12) + ":" + response.data.daily.sunset[0].charAt(14) + response.data.daily.sunset[0].charAt(15);
      let hotAf = 0;

      for (let i = 0; i<12; i++) {
        hour = response.data.hourly.time[i + (dayNumber * 24)].charAt(11) + response.data.hourly.time[i + (dayNumber * 24)].charAt(12);
        rain = response.data.hourly.rain[i + (dayNumber * 24)];
        snow = response.data.hourly.snowfall[i + (dayNumber * 24)];
        clouds = response.data.hourly.cloudcover[i + (dayNumber * 24)];

        hourlyRain(rain);
        hourlySnow(snow);
        numberOfCloudsInTheSky(clouds);
        isDay(hour, sunrise, sunset);

        weatherIconsArray.push(theLastWeatherCheck());

        finalHourlyData1 += Number(hour) + ":00 - " + response.data.hourly.temperature_2m[i + (dayNumber * 24)] + "℃\n";
      }

      for (let i = 12; i<24; i++) {
        hour = response.data.hourly.time[i + (dayNumber * 24)].charAt(11) + response.data.hourly.time[i + (dayNumber * 24)].charAt(12);
        rain = response.data.hourly.rain[i + (dayNumber * 24)];
        snow = response.data.hourly.snowfall[i + (dayNumber * 24)];
        clouds = response.data.hourly.cloudcover[i + (dayNumber * 24)];

        hourlyRain(rain);
        hourlySnow(snow);
        numberOfCloudsInTheSky(clouds);
        isDay(hour, sunrise, sunset);

        weatherIconsArray.push(theLastWeatherCheck());

        finalHourlyData2 += hour + ":00 - " + response.data.hourly.temperature_2m[i + (dayNumber * 24)] + "℃\n";
      }

      for (let i = 0; i<7; i++) {
        day = response.data.daily.time[i].charAt(8) + response.data.daily.time[i].charAt(9);
        month = response.data.daily.time[i].charAt(5) + response.data.daily.time[i].charAt(6);
        hotAf = response.data.daily.temperature_2m_max[i] + "℃\n";

        let isItDay = dayChecker(response, i);

        convertJSONIntoSomeActualGoodLookingFormat = addTh(day) + " " + monthAsWord(month);

        addTile(convertJSONIntoSomeActualGoodLookingFormat, hotAf, isItDay, i);
      }
      
      getCurrentTime();
      nightOrDay(sunrise, sunset);

      setContent(
      <div id="weather_div" class={weatherForecastDiv}>
        <a id="meteo_ad" href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        <h1>WEATHER</h1><br></br><br></br>
        <h2><p>Next 7 Days:</p></h2><br></br>
          <ICykKafelki/>
        <h2><p>Today's Weather</p></h2><br></br>
        <div id="hourly_weather">
          <div id="prev_day" onClick={dayBack}/>
          <div id="hourly_weather_1">
            {finalHourlyData1}
          </div>
          <WeatherIcons1 />
          <div id="hourly_weather_2">
            {finalHourlyData2}
          </div>
          <WeatherIcons2 />
          <div id="next_day" onClick={dayForward}/>
        </div>
      </div>);

      console.log('weather has entered the chat');
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div id="whole_site">
        <RefreshWeather />
        <div id="main_content">{content}</div>
        <div id="weather_icons_holder"></div>
      </div>
  );
}
export default App;