import React from "react"
import { useState } from "react"
import Carbon from "./Carbon"
import Methan from "./Methan"
import Temperature from "./Temperature"
import Polar from "./Polar"

function Tabs() {
	const [toggleState, setToggleState] = useState(1)

	const toggleTab = index => {
		setToggleState(index)
	} 

	return (
		<div className='content_container'>
			<div className='tabs-container'>
				<div
					className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
					onClick={() => toggleTab(1)}>
					Carbon
				</div>
				<div
					className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
					onClick={() => toggleTab(2)}>
					Methan
				</div>
				<div
					className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
					onClick={() => toggleTab(3)}>
					Temperature
				</div>
				<div
					className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
					onClick={() => toggleTab(4)}>
					Polar Ice
				</div>
			</div>

			<div className='content-tabs'>
				<Carbon toggleState={toggleState} />
				<Methan toggleState={toggleState}/>
				<Temperature toggleState={toggleState} />
				<Polar toggleState={toggleState} />
			</div>
		</div>
	)
}

export default Tabs
