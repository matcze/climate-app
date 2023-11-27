import { useState } from "react"
import axios from "axios"

function Temperature({ toggleState }) {
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	const years = [
		1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891,
		1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903,
		1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915,
		1916, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926,
		1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938,
		1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950,
		1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962,
		1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974,
		1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986,
		1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998,
		1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
		2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
		2023,
	]
	const [choosenMonth, setChoosenMonth] = useState(1)
	const [goodMonth, setGoodMonth] = useState(1)
	const [choosenYear, setChoosenYear] = useState(1880)
	const [temperatureData, setTemperatureData] = useState({
		anomaly: 0,
		month: 4,
		year: 1880,
	})

	function showMonth(e) {
		setGoodMonth(e.target.value)
		setChoosenMonth(
			e.target.value == 1
				? 4
				: e.target.value == 2
				? 13
				: e.target.value == 3
				? 21
				: e.target.value == 4
				? 29
				: e.target.value == 5
				? 38
				: e.target.value == 6
				? 46
				: e.target.value == 7
				? 54
				: e.target.value == 8
				? 63
				: e.target.value == 9
				? 71
				: e.target.value == 10
				? 79
				: e.target.value == 11
				? 88
				: e.target.value == 12
				? 96
				: 0
		)
	}

	function showYear(e) {
		setChoosenYear(e.target.value)
	}

	function checkTemperature() {
		const options = {
			method: "GET",
			url: "https://global-temperature.p.rapidapi.com/api/temperature-api",
			headers: {
				"content-type": "application/octet-stream",
				"X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
				"X-RapidAPI-Host": "global-temperature.p.rapidapi.com",
			},
		}

		axios
			.request(options)
			.then(function (response) {
				for (let i = 0; i < response.data.result.length; i++) {
					if (
						response.data.result[i].time == `${choosenYear}.${choosenMonth}`
					) {
						setTemperatureData({
							anomaly: response.data.result[i].land,
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
				toggleState === 3
					? "container active-content"
					: "container content"
			}>
			<div className='headline'>
				<h3>Global Temperature</h3>
			</div>
			<div>
				<table>
					<tbody>
						<tr>
							<td>Choose a month:</td>
							<td>
								<select
									name='month-option'
									value={goodMonth}
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

				<button
					className='btn_three'
					id='check-button'
					onClick={checkTemperature}>
					Check
				</button>
				<div>
					The surface global temperatue anomaly in{" "}
					{temperatureData.month == 4
						? "January"
						: temperatureData.month == 13
						? "February"
						: temperatureData.month == 21
						? "March"
						: temperatureData.month == 29
						? "April"
						: temperatureData.month == 38
						? "May"
						: temperatureData.month == 46
						? "June"
						: temperatureData.month == 54
						? "July"
						: temperatureData.month == 63
						? "August"
						: temperatureData.month == 71
						? "September"
						: temperatureData.month == 79
						? "October"
						: temperatureData.month == 88
						? "November"
						: temperatureData.month == 96
						? "December"
						: 0}{" "}
					{temperatureData.year} is equal {temperatureData.anomaly} ℃
				</div>
			</div>
		</div>
	)
}

export default Temperature
