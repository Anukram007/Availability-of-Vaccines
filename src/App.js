import axios from 'axios';
import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      vaccinationData: []
    }
  }

  selectDate = async (e) => {
    const year = e.target.value.split("-")[0];
    const month = e.target.value.split("-")[1];
    const day = e.target.value.split("-")[2];
    await this.setState({ date: day + "-" + month + "-" + year });
    axios.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=725&date=" + this.state.date)
      .then(async res => (
        await this.setState({
          vaccinationData: res.data.sessions.sort(function (a, b) {
            if (a.available_capacity > b.available_capacity) return -1;
          })
        })
      ))
  }

  render() {
    return (
      <div>
        <input type="date" onChange={(e) => this.selectDate(e)} />
        <table>
          <tr>
            <td>Name </td>
            <td>Address </td>
            <td>Fee Type</td>
            <td>Total Capacity</td>
            <td>Dose 1 Capacity</td>
            <td>Dose 2 Capacity</td>
            <td>Charges</td>
            <td>Minimum Age</td>
            <td>Vaccine Name</td>
          </tr>
          {this.state.vaccinationData.map((value, index) => (
            <tr>
              <td>{value.name}</td>
              <td>{value.address}</td>
              <td>{value.fee_type}</td>
              <td>{value.available_capacity}</td>
              <td>{value.available_capacity_dose1}</td>
              <td>{value.available_capacity_dose2}</td>
              <td>{value.fee}</td>
              <td>{value.min_age_limit}</td>
              <td>{value.vaccine}</td>
            </tr>
          ))}
        </table>
      </div>

    )
  }
}
