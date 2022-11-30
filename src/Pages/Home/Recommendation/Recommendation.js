import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RecommendationItem from './RecommendationItem';

const Recommendation = () => {
    const [recommendations, setRecommendations] = useState([]);
    useEffect(() => {
        // use axios for fetching
        axios.get('https://jewelry-resale-server.vercel.app/recommendation')
            .then(data => {
                const recommendations = data.data;
                setRecommendations(recommendations);
            })
    }, [])
    return (
        <section className='mt-2'>
            <h1 className='text-center font-semibold text-3xl text-[#655D48]'>c2cJewel Recommends</h1>
            <div className="card card-compact grid lg:grid-cols-3 gap-3 rounded-lg mt-2">
                {
                    recommendations.map(r => <RecommendationItem
                        key={r._id}
                        r={r}
                    ></RecommendationItem>)
                }
            </div>
        </section>
    );
};

export default Recommendation;