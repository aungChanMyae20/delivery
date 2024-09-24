import { useEffect, useState } from "react";
import { allCountries, months as allMonths } from "../../../utils/reports";
import periods from '../../../data/periods.json';
import './HiddenFilter.css';

const HiddenFilter = ({ 
    visible,
    countries: defaultCountries, 
    setCountries: setDefaultCountries,
    range: defaultRange, 
    setRange: setDefaultRange,
    onCompare,
    monthIndex,
    onMonthChange
}) => {
    const [countries, setCountries] = useState(defaultCountries);
    const [months, setMonths] = useState([]);

    useEffect(() => {
        if (defaultRange !== '') {
            const m = defaultRange.split(' ')[0];
            const mStart = m.split('-')[0];
            const mEnd = m.split('-')[1];
            const temp = [];
            for (let i = +mStart; i <= +mEnd; i++) {
                temp.push(allMonths[i-1].slice(0, 3));
            }
            setMonths(temp);
        }
    }, [defaultRange]);

    const handleChange = (value, target) => {
        const temp = countries;
        countries[target] = value;
        setCountries(temp);
        setDefaultCountries(temp);
        countries.length === 2 && defaultRange !== '' && onCompare();
    }

    const handleRange = (value) => {
        setDefaultRange(value);
        countries.length === 2 && onCompare();
    }

    const handleTab = (e, mIndex) => {
        e.preventDefault();
        onMonthChange(mIndex);
    }

    return <div className={`hidden-filter ${visible ? 'visible' : ''}`}>
        <div className="uk-container@m uk-container-medium">
            <div className="filter-body uk-visible@m">
                <div className="filter-label">Country Comparator</div>
                <div className="filters">
                    <div className="country-selector uk-form-controls ">
                        <select className="uk-select" value={countries[0]} onChange={(e) => handleChange(e.currentTarget.value, 0)}>
                            {
                                allCountries.map(data => (
                                    <option 
                                        key={`${countries[0]}-${data.name}`} 
                                        value={data.code} 
                                        disabled={data.code === countries[1]}
                                    >
                                        {data.name}
                                    </option>
                                    )
                                )
                            }
                        </select>
                    </div>
                    <div className="vs">VS</div>
                    <div className="country-selector uk-form-controls ">
                        <select className="uk-select" value={countries[1]} onChange={(e) => handleChange(e.currentTarget.value, 1)}>
                            {
                                allCountries.map(data => (
                                    <option 
                                        key={`${countries[1]}-${data.name}`} 
                                        value={data.code} 
                                        disabled={data.code === countries[0]}
                                    >
                                        {data.name}
                                    </option>
                                    )
                                )
                            }
                        </select>
                    </div>
                    <div className="range-selector uk-form-controls ">
                        <select className="uk-select" value={defaultRange} onChange={e => handleRange(e.currentTarget.value)}>
                            {
                                periods?.map(item => {
                                    return <option key={item.name} value={item.value}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className="mobile-filter uk-hidden@m">
                <div className="mf-layout">
                    <div className="mf-title">
                        <div className="mf-title-nations">
                            <div className="mf-nations">
                                <div className="mf-nation-flag">
                                    <img src={`/images/${countries[0]}-flag.webp`} />
                                </div>
                                <p className="mf-nation">{allCountries.filter(item => item.code === countries[0])[0].name}</p>
                                <span className="mf-vs">VS</span>
                                <p className="mf-nation">{allCountries.filter(item => item.code === countries[1])[0].name}</p>
                                <div className="mf-nation-flag">
                                    <img src={`/images/${countries[1]}-flag.webp`} />
                                </div>
                            </div>
                        </div>
                        <div className="mf-title-link">
                            <a href="#map" uk-scroll="offset: 100">
                                <span uk-icon="icon: settings; ratio: 0.8" /> Change
                            </a>
                        </div>
                    </div>
                    <div className="mf-months-tab">
                        <ul className="uk-child-width-expand" uk-tab="true">
                            {
                                months.map((month, index) => {
                                    return <li 
                                            key={`${month}-${index+1}`}
                                            className={`${index===monthIndex ? 'uk-active' : ''}`}
                                        >
                                            <a href="#" onClick={e => handleTab(e, index)}>{month}</a>
                                        </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default HiddenFilter;
