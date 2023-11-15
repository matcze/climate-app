import { useState } from "react"
import axios from "axios"

function Carbon({toggleState}) {
	const years = [
		1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990,
		1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002,
		2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
		2015, 2016, 2017, 2018, 2019, 2020, 2021,
	]

	const [choosenYear, setChoosenYear] = useState(1979)
	const [polarData, setPolarData] = useState({
		icecap: 0,
		year: 1979,
	})

	function showYear(e) {
		setChoosenYear(e.target.value)
	}

	function checkPolar() {
		const options = {
			method: "GET",
			url: "https://melted-polar-ice-cap.p.rapidapi.com/api/arctic-api",
			headers: {
				"content-type": "application/octet-stream",
				"X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
				"X-RapidAPI-Host": "melted-polar-ice-cap.p.rapidapi.com",
			},
		}

		axios
			.request(options)
			.then(function (response) {
				console.log(response.data.arcticData)
				for (let i = 0; i < response.data.arcticData.length; i++) {
					if (response.data.arcticData[i].year == choosenYear) {
						console.log(response.data.arcticData[i])
						setPolarData({
							icecap: response.data.arcticData[i].extent,
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
			toggleState === 4
				? "container content active-content"
				: "container content"
		}>
			<div className='headline'>
				<h3>Melted Polar Ice Cap</h3>
			</div>
			<div>
				<table className="tabel_position">
					<tbody>
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

				<button className="btn_four" id='check-button' onClick={checkPolar}>
					Check
				</button>
				<div className="text_four">
					Average monthly arctic sea ice extent in {polarData.year} is equal{" "}
					{polarData.icecap}
				</div>
			</div>
		</div>
	)
}

export default Carbon
