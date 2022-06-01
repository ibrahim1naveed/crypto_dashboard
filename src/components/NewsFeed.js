import React, { useEffect, useState } from 'react';
import axios from "axios";

const NewsFeed = () => {

    const [articles, setArticles] = useState(null);



    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://crypto-news-live3.p.rapidapi.com/news',
            headers: {
                'X-RapidAPI-Host': 'crypto-news-live3.p.rapidapi.com',
                'X-RapidAPI-Key': '995aec3bc7mshc37bef82e58bb35p1ab841jsne8ad9b11a7fe'
            }
        };

        axios.request(options).then(function (response) {
            setArticles(response.data)
        }).catch(function (error) {
            console.error(error);
        });
    }, []);


    const first7Articles = articles?.slice(0,7);    

  return (
    <div className="news-feed">
        <h2>News Feed</h2>
        {first7Articles?.map((article, _index) => (
        <div key={_index}>
            <a href={article.url}>
                <p>{article.title}</p>
            </a>
        </div>))}
    </div>

  )
}

export default NewsFeed;
