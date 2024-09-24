import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import menuItems from '../../data/menu.json';

const DefaultPage = () => {
    const location = useLocation();
    const [page, setPage] = useState('');
    useEffect(() => {
        const target = menuItems.filter(item => item.link === location.pathname)[0];
        setPage(target.text);
    }, [location]);

    return (
        <div key={page} className="uk-container uk-height-1-1 uk-animation-scale-up" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h1 style={{ fontFamily: 'Delivery-bold', fontSize: 'clamp(1rem, 2vw + 1rem, 3rem)', textTransform: 'capitalize'}}>{page}</h1>
        </div>
    )
}

export default DefaultPage;
