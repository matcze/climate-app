import React from "react"

export default function Copyrights() {
	const recYear = new Date().getFullYear()

	return (
		<p className='copyrights'>
			Copyright © <span>{recYear}</span> by Czarny, All rights reserved!
		</p>
	)
}