import "./App.css"
import Tabs from "./components/Tabs"
import NewsFeed from "./components/NewsFeed"
import Copyrights from "./components/Copyrights"


function App() {
	return (
		<div className="main_container">
			<Tabs />
			<NewsFeed />
			<Copyrights/>
		</div>
	)
}

export default App
