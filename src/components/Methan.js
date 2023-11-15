import { useState } from "react"
import axios from "axios"

function Methan({toggleState}) {
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	const years = [
		1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994,
		1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006,
		2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
		2019, 2020, 2021, 2022, 2023,
	]
	const [choosenMonth, setChoosenMonth] = useState(1)
	const [choosenYear, setChoosenYear] = useState(1983)
	const [methanData, setMethanData] = useState({
		concetration: 0,
		month: 1,
		year: 1983,
	})

	function showMonth(e) {
		setChoosenMonth(e.target.value)
	}

	function showYear(e) {
		setChoosenYear(e.target.value)
	}

	function checkMethan() {
		const options = {
			method: "GET",
			url: "https://atmosphere-methane-concentration.p.rapidapi.com/api/methane-api",
			headers: {
				"content-type": "application/octet-stream",
				"X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
				"X-RapidAPI-Host": "atmosphere-methane-concentration.p.rapidapi.com",
			},
		}

		axios
			.request(options)
			.then(function (response) {
				for (let i = 0; i < response.data.methane.length; i++) {
					if (
						response.data.methane[i].date == `${choosenYear}.${choosenMonth}`
					) {
						setMethanData({
							concetration: response.data.methane[i].average,
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
		<div className={
			toggleState === 2
				? "container content active-content"
				: "container content"
		}>
			<div className='headline'>
				<h3>Methan Concentration</h3>
			</div>
			<div>
				<table>
					<tbody>
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

				<button className='btn_two' id='check-button' onClick={checkMethan}>
					Check
				</button>
				<div>
					The amount of methane in the atmosphere in{" "}
					{methanData.month == 1
						? "January"
						: methanData.month == 2
						? "February"
						: methanData.month == 3
						? "March"
						: methanData.month == 4
						? "April"
						: methanData.month == 5
						? "May"
						: methanData.month == 6
						? "June"
						: methanData.month == 7
						? "July"
						: methanData.month == 8
						? "August"
						: methanData.month == 9
						? "September"
						: methanData.month == 10
						? "October"
						: methanData.month == 11
						? "November"
						: methanData.month == 12
						? "December"
						: 0}{" "}
					{methanData.year} is equal {methanData.concetration} ppm
				</div>
			</div>
		</div>
	)
}

export default Methan
