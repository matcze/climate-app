import { useState } from "react"
import axios from "axios"

function Carbon({ toggleState }) {
	const days = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
		22, 23, 24, 25, 26, 26, 27, 28, 29, 30, 31,
	]
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	const years = [
		2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
		2022, 2023,
	]
	const [choosenDay, setChoosenDay] = useState(1)
	const [choosenMonth, setChoosenMonth] = useState(1)
	const [choosenYear, setChoosenYear] = useState(2010)
	const [carbonData, setCabronData] = useState({
		concetration: 0,
		day: 1,
		month: 1,
		year: 2010,
	})

	function showDay(e) {
		setChoosenDay(e.target.value)
	}

	function showMonth(e) {
		setChoosenMonth(e.target.value)
	}

	function showYear(e) {
		setChoosenYear(e.target.value)
	}

	function checkDay() {
		const options = {
			method: "GET",
			url: "https://daily-atmosphere-carbon-dioxide-concentration.p.rapidapi.com/api/co2-api",
			headers: {
				"content-type": "application/octet-stream",
				"X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
				"X-RapidAPI-Host":
					"daily-atmosphere-carbon-dioxide-concentration.p.rapidapi.com",
			},
		}

		axios
			.request(options)
			.then(function (response) {
				for (let i = 0; i < response.data.co2.length; i++) {
					if (
						response.data.co2[i].year == choosenYear &&
						response.data.co2[i].month == choosenMonth &&
						response.data.co2[i].day == choosenDay
					) {
						setCabronData({
							concetration: response.data.co2[i].trend,
							day: choosenDay,
							month: choosenMonth,
							year: choosenYear,
						})
					}
				}
			})
			.catch(function (error) {
				console.error(error)
			})
	}

	return (
		<div
			className={
				toggleState === 1
					? "container content active-content"
					: "container content"
			}>
			<div className='headline'>
				<h3>
					Carbon Dioxide (CO<span>2</span>) Concentration
				</h3>
			</div>
			<div>
				<table>
					<tbody>
						<tr>
							<td>Choose a day:</td>
							<td>
								<select name='day-option' value={choosenDay} onChange={showDay}>
									{days.map((day, index) => {
										return <option key={index}>{day}</option>
									})}
								</select>
							</td>
						</tr>
						<tr>
							<td>Choose a month:</td>
							<td>
								<select
									name='month-option'
									value={choosenMonth}
									onChange={showMonth}>
									{months.map((month, index) => {
										return <option key={index}>{month}</option>
									})}
								</select>
							</td>
						</tr>
						<tr>
							<td>Choose a year:</td>
							<td>
								<select
									name='year-option'
									value={choosenYear}
									onChange={showYear}>
									{years.map((year, index) => {
										return <option key={index}>{year}</option>
									})}
								</select>
							</td>
						</tr>
					</tbody>
				</table>

				<button className='btn_one' id='check-button' onClick={checkDay}>
					Check
				</button>
				<div>
					The amount of carbon dioxide (CO2) in the atmosphere on{" "}
					{carbonData.day < 10 ? 0 + carbonData.day : carbonData.day}.
					{carbonData.month < 10 ? 0 + carbonData.month : carbonData.month}.
					{carbonData.year} is equal {carbonData.concetration} ppm
				</div>
			</div>
		</div>
	)
}

export default Carbon
