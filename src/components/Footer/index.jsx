import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import menuItems from '../../data/menu.json';
import './Footer.css';

const Footer = () => {
    const location = useLocation();

    const [visible, setVisible] = useState(false);
    const [next, setNext] = useState(null);
    const [nextUrl, setNextUrl] = useState('/');

    const scrollTracker = (e) => {
        if (e.target.scrollHeight - e.target.scrollTop < e.target.scrollHeight - 500) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }

    useEffect(() => {
        const content = document.getElementById('content');

        if (content.scrollHeight <= content.offsetHeight) {
            setVisible(true);
        }

        if (location.pathname !== '/') {
            const pathname = location.pathname;
            const targetIndex = menuItems.findIndex(item => item.link === pathname);
            if (targetIndex > 0 && targetIndex < menuItems.length - 1) {
                const nextItem = menuItems[targetIndex + 1];
                setNextUrl(nextItem.link);
                if (nextItem.key === "global") {
                    setNext({ direction: "Explore the report", next: "Global Index"});
                } else if (nextItem.key === "about-gtb") {
                    setNext({ direction: "Up next", next: "What is Global Trade Barometer?"})
                } else {
                    setNext({ direction: "Next report", next: `${nextItem.text} Index`})
                }
            } else {
                setNext(null);
            }
        } else {
            setNext({ direction: "Up next", next: "Country Comparator" });
            setNextUrl('/comparator');
        }

        content.addEventListener('scroll', scrollTracker);
        return () => content.removeEventListener('scroll', scrollTracker);
    }, [location]);

    if (!next) return null;

    return (
        <div className={`footer ${visible ? 'visible' : ''}`}>
            <div className="uk-container uk-height-1-1">
                <div className="up-next uk-height-1-1">
                    {
                        next &&
                        <NavLink to={nextUrl}>
                            <p className="direction">
                                <span className="uk-visible@m" uk-icon="icon:chevron-down; size: 14" /> {next.direction} <span className="uk-hidden@m" uk-icon="icon:chevron-right; size: 14" />
                            </p>
                            <p className="next">{next.next}</p>
                        </NavLink>
                    }
                </div>
            </div>
        </div>
    )
}

export default Footer;
