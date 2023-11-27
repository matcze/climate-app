import axios from "axios"
import { useEffect, useState } from "react"

function NewsFeed() {
	const [articles, setArticles] = useState([])

	useEffect(() => {
		const options = {
			method: "GET",
			url: "https://climate-news-feed.p.rapidapi.com/page/1",
			params: { limit: "10" },
			headers: {
				"content-type": "application/octet-stream",
				"X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
				"X-RapidAPI-Host": "climate-news-feed.p.rapidapi.com",
			},
		}

		axios
			.request(options)
			.then(function (response) {
				// console.log(response.data)
				setArticles(response.data.articles)
			})
			.catch(function (error) {
				console.error(error)
			})
	}, [])

	const fiveArticles = articles.slice(0, 5)

	return (
		<div className='news_feed'>
			<h2>News Feed</h2>
			{fiveArticles.map((article, index) => {
				return (
					<a className='article' href={article.url} key={index}>
						<img className='article_thumbnail' src={article.thumbnail} alt='' />
						<div className='article_link' >{article.title}</div>
					</a>
				)
			})}
		</div>
	)
}

export default NewsFeed
