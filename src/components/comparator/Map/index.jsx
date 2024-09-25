import { useEffect, useState } from 'react';
import { allCountries } from '../../../utils/reports';
import './Map.css';

const Map = ({ countries, setCountries }) => {
    const [selectedMap, setSelectedMap] = useState([]);

    const handleClick = (code) => {
        if (!selectedMap.includes(code)) {
            selectedMap.length < 2 && setSelectedMap([...selectedMap, code]);
        } else {
            setSelectedMap(selectedMap.filter(item => item !== code));
        }
    }

    useEffect(() => {
        setCountries(selectedMap);
    }, [selectedMap]);

    return <div id="map" className="map-container">
        <div className="map">
            {
                allCountries.map((country) => {
                    let animation = '';
                    if (country.code === "UK") animation = "uk-animation-slide-left";
                    if (country.code === "US") animation = "uk-animation-slide-left-small";
                    if (country.code === "DE") animation = "uk-animation-slide-top-medium";
                    if (country.code === "CN") animation = "uk-animation-slide-top-small";
                    if (country.code === "JP") animation = "uk-animation-slide-right-medium";
                    if (country.code === "KR") animation = "uk-animation-slide-right-small";
                    if (country.code === "IN") animation = "uk-animation-slide-bottom-small";

                    return <div 
                            key={country.code} 
                            className={`country ${country.code.toLowerCase()} ${(!selectedMap.includes(country.code) && selectedMap.length === 2) ? 'disabled' : ''}`} 
                            onClick={() => handleClick(country.code)}
                            uk-scrollspy={`cls:${animation}`}
                            uk-tooltip={`title:${country.name}; pos: top`}
                        >
                            <div className={`map-img ${(countries.includes(country.code) || selectedMap.includes(country.code)) ? 'selected' : ''}`}>
                                <img src={`/images/${country.code}-map.webp`} alt={`${country.code}-map`} />
                                <img src={`/images/${country.code}-map-selected.webp`} alt={`${country.code}-map`} />
                            </div>
                            <div className="map-flag">
                                <img src={`/images/${country.code}-flag.webp`} alt={`${country.code}-flag`} />
                            </div>
                        </div>
                })
            }
        </div>
    </div>
}

export default Map;
