import { useEffect, useState } from 'react';
import { getData } from '../../utils/reports';
import Banner from '../../components/comparator/Banner';
import Map from '../../components/comparator/Map';
import RangeSelector from '../../components/comparator/RangeSelector';
import Reports from '../../components/comparator/Reports';
import UIkit from 'uikit';
import HiddenFilter from '../../components/comparator/HiddenFilter';
import './Comparator.css';

const Comparator = () => {
    const [countries, setCountries] = useState([]);
    const [range, setRange] = useState('');
    const [reports, setReports] = useState(null);
    const [compareCountries, setCompareCountries] = useState([]);
    const [hiddenFilterVisible, setHiddenFilterVisible] = useState(false);
    const [monthIndex, setMonthIndex] = useState(2);
    
    const viewData = () => {
        const data = getData(countries, range);
        setCompareCountries(countries);
        setReports(data);
        setMonthIndex(2);
        const scroll = UIkit.scroll(document.getElementById('content'));
        scroll.scrollTo(document.getElementById('trade-indexes'));
    }

    const scrollTracker = (e) => {
        const offset = document.getElementById('track').offsetTop;
        const limit = e.target.scrollTop;
        if (limit > offset) {
            setHiddenFilterVisible(true);
        } else {
            setHiddenFilterVisible(false);
        }
    }

    const handleMonthFilter = (mIndex) => {
        if (mIndex !== monthIndex) {
            setMonthIndex(mIndex);
        }
    }
    
    useEffect(() => {
        const content = document.getElementById('content');
        content.addEventListener('scroll', scrollTracker);
        return () => content.removeEventListener('scroll', scrollTracker);
    }, []);

    return <div className="page">
        <div className="uk-container-expand container">
            { reports && <HiddenFilter
                visible={hiddenFilterVisible}
                countries={countries}
                setCountries={setCountries}
                range={range}
                onCompare={viewData}
                monthIndex={monthIndex}
                onMonthChange={handleMonthFilter}
            />}
            <Banner />
            <div className="comparator-content">
                <div className="uk-container uk-container-medium">
                    <Map countries={countries} setCountries={setCountries} />
                    <RangeSelector 
                        comparable={countries.length === 2} 
                        setRange={setRange} 
                        onCompare={viewData} 
                    />
                    <div id="track" />
                    { reports && 
                        <Reports 
                            countries={compareCountries} 
                            reports={reports} 
                            monthIndex={monthIndex}
                            onMonthChange={handleMonthFilter}
                        />}
                </div>
            </div>
        </div>
    </div>
}

export default Comparator;
