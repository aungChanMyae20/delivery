import { useEffect, useState } from 'react';
import periods from '../../../data/periods.json';

import './RangeSelector.css';

const RangeSelector = ({ comparable = false, setRange, onCompare }) => {
    const [selectedPeriod, setSelectedPeriod] = useState("");

    useEffect(() => {
        periods && setSelectedPeriod(periods[0].value);
    }, [periods]);

    const periodChange = (period) => {
        setSelectedPeriod(period);
    }

    useEffect(() => {
        setRange(selectedPeriod);
    }, [selectedPeriod]);

    return <div className="compare-range" uk-scrollspy="cls:uk-animation-slide-bottom-medium">
        <div className="options">
            <div className="range-select">
                <label htmlFor="range" className="uk-form-label uk-visible@m">Reporting Period</label>
                <div className="uk-form-controls period-select">
                    <select id="range" name="range" className="uk-select" value={selectedPeriod} onChange={(e) => periodChange(e.currentTarget.value)}>
                        {
                            periods?.map(item => {
                                return <option key={item.name} value={item.value}>{item.name}</option>
                            })
                        }
                    </select>
                </div>
                <button 
                    className={`uk-button uk-button-primary`} 
                    disabled={!comparable}
                    onClick={() => onCompare()}
                >
                    Compare Data
                </button>
            </div>
        </div>
    </div>
}

export default RangeSelector;
