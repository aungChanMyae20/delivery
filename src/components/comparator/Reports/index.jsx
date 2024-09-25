import { useEffect, useState } from 'react';
import Indicator from './Indicator';
import UIkit from 'uikit';
import './Reports.css';

const Reports = ({ countries, reports, monthIndex, onMonthChange }) => {
    const [first, setFirst] = useState(''); // first country
    const [second, setSecond] = useState(''); // second country
    const [months, setMonths] = useState([]);
    const [targetReport, setTargetReport] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const scroll = UIkit.scroll(document.getElementById('content'));
            scroll.scrollTo(document.getElementById('trade-indexes'));
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (reports) {
            setFirst(reports.countries.filter(item => item.code === countries[0])[0]);
            setSecond(reports.countries.filter(item => item.code === countries[1])[0]);
            setMonths(reports.reports.map(item => item.month));
            setTargetReport(reports?.reports[2]);
        }
    }, [countries, reports]);

    useEffect(() => {
        setTargetReport(reports?.reports[monthIndex]);
    }, [monthIndex]);

    return <div className="report">
        <div className="months-filter uk-visible@m">
            <div className="uk-grid-collapse uk-flex uk-flex-center" uk-grid="true">
                {
                    months.map((month, index) => {
                        let position = '';
                        if (index === 0) position = 'left';
                        if (index === 1) position = 'mid';
                        if (index === 2) position = 'right';
                        return <div key={`month-filter-${index + 1}`} className="filter-item uk-container uk-container-small">
                            <span>
                                <img src={`/images/curve-${position}.webp`} alt="curve" />
                            </span>
                            <button 
                                className={`uk-button uk-button-${index === +monthIndex ? 'primary' : 'default'}`} 
                                onClick={() => onMonthChange(index)}
                            >
                                {month}
                            </button>
                        </div>
                    })
                }
            </div>
        </div>
        <div className="versus uk-hidden@m">
            <div className="vs-time">
                <p>{months[monthIndex]} {reports.year}</p>
            </div>
            <div className="vs-countries">
                <div className="nation">
                    <img src={`/images/${first.code}-flag.webp`} />
                </div>
                <div className="vs-text">VS</div>
                <div className="nation">
                    <img src={`/images/${second.code}-flag.webp`} />
                </div>
            </div>
        </div>
        {
            targetReport && 
            <div 
                id="trade-indexes" 
                className="uk-grid-large uk-child-width-expand@s uk-margin-large-top@m uk-flex-top uk-flex-center" 
                uk-grid="center"
            >
                <div className="selected-country selected-country-left uk-visible@m">
                    <div className="selected-country-img">
                        <img src={`/images/${first.code}-map.webp`} />
                        <span>
                            <img src={`/images/${first.code}-flag.webp`} />
                        </span>
                    </div>
                    <div className="country-name">
                        <p>{first.name}</p>
                    </div>
                    <div className="report-btn uk-width-1-1">
                        <a href="#" className="uk-button uk-button-default uk-width-1-1">
                            View Report
                        </a>
                    </div>
                </div>
                <div className="categories">
                    <div className="category-body">
                        {
                            targetReport.data.map((main) => {
                                return <div key={main.category} className="main-category">
                                    <h3 className="category-name">{main.category}</h3>
                                    {
                                        main.subs.map(sub => <Indicator countries={countries} subData={sub} key={sub.name} />)
                                    }
                                </div>
                            })
                        }
                    </div>
                    <div className="uk-hidden@m mobile-btns">
                        <hr />
                        <div className="country-report-btns">
                            <div className="country-report-btn">
                                <a className="uk-button uk-button-default" href="#">View {first.name} Report</a>
                            </div>
                            <div className="country-report-btn">
                                <a className="uk-button uk-button-default" href="#">View {second.name} Report</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="selected-country selected-country-right uk-visible@m">
                    <div className="selected-country-img">
                        <img src={`/images/${second.code}-map.webp`} />
                        <span>
                            <img src={`/images/${second.code}-flag.webp`} />
                        </span>
                    </div>
                    <div className="country-name">
                        <p>{second.name}</p>
                    </div>
                    <div className="report-btn uk-width-1-1">
                        <a href="#" className="uk-button uk-button-default uk-width-1-1">
                            View Report
                        </a>
                    </div>
                </div>
            </div>
        }
    </div>
}

export default Reports;
