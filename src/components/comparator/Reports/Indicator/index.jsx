import { useEffect, useState } from "react";

import './Indicator.css';

const Indicator = ({ countries, subData }) => {
    const [leftIndex, setLeftIndex] = useState(0);
    const [rightIndex, setRightIndex] = useState(0);

    const [width, setWidth] = useState(0);
    const [expension, setExpension] = useState('');
    
    useEffect(() => {
        const left = subData.indexes[countries[0]];
        const right = subData.indexes[countries[1]];

        setLeftIndex(left);
        setRightIndex(right);

        if (left - right > 0) {
            setWidth(calculateDifference(left, right));
            setExpension('left');
        } else if (left - right < 0) {
            setWidth(calculateDifference(right, left));
            setExpension('right');
        } else if (left === right){
            setExpension('equal');
        }
    }, [countries, subData]);

    function calculateDifference (num1, num2) {
        let diff = num1 - num2;
        let apprWidth = Math.round(((num1 - diff)/num1)*100); // percent
        return (apprWidth <= 50 && apprWidth !== 0) ? apprWidth + 50 : apprWidth;
    }

    return <div className="indicator-box">
        <div className="indicator-canvas">
            <div className="indicator-text">
                <div className={`left-index ${((leftIndex > rightIndex) && rightIndex !== 0) ? 'expension' : ''}`}>
                    {leftIndex !== 0 ? leftIndex : ''}
                </div>
                <div className="sub-name">{subData.name}</div>
                <div className={`right-index ${((rightIndex > leftIndex) && leftIndex !== 0) ? 'expension' : ''}`}>
                    {rightIndex !== 0 ? rightIndex : ''}
                </div>
            </div>
            <div className="backdrop">
                { 
                    expension === "equal" ? <div className={`equal`}>
                        <div 
                            className="equal-left" 
                            uk-scrollspy={`cls: uk-animation-slide-left; repeat: true`}
                        />
                        <div 
                            className="equal-right"
                            uk-scrollspy={`cls: uk-animation-slide-right; repeat: true`}
                        />
                    </div>
                    :
                    <>
                        <div 
                            className={`shadow ${expension}`}
                            style={{ width: width + '%' }} 
                        />
                        <div 
                            className={`backdrop-content ${expension}`} 
                            uk-scrollspy={`cls: uk-animation-slide-${expension}; repeat: true`}
                            style={{ width: width + '%' }} 
                        />
                    </>
                }
                
            </div>
        </div>
    </div>
}

export default Indicator;
