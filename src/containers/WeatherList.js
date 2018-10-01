import React from 'react';
import { connect } from 'react-redux';
import Chart from '../components/Chart';
import GoogleMap from '../components/GoogleMap';

class WeatherList extends React.Component {
  renderWeather(cityData) {
    const { id, name } = cityData.city;
    const temps = cityData.list
      .map(weather => weather.main.temp)
      .map(temp => temp - 273.15);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={id}>
        <td>
          <GoogleMap lon={lon} lat={lat} />
        </td>
        <td>
          <Chart data={temps} width={180} height={120} color="red" unit="°C" />
        </td>
        <td>
          <Chart
            data={humidities}
            width={180}
            height={120}
            color="blue"
            unit="%"
          />
        </td>
        <td>
          <Chart
            data={pressures}
            width={180}
            height={120}
            color="green"
            unit="hPa"
          />
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (°C)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>{this.props.weather.map(this.renderWeather)}</tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);
