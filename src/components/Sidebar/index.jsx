import { useState } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import menulist from '../../data/menu.json';

import './Sidebar.css';

const MenuItem = ({collapsed, item, toggleMenu}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const exceptKeys = ["home", "comparator", "global", "about-gtb"];
    const isExcept = exceptKeys.includes(item.key);

    const handleNav = (e, link) => {
        e.preventDefault();
        navigate(link);
        toggleMenu(false);
    }

    return <li className={`menu-item ${collapsed ? 'collapsed' : ''} ${item.link === location.pathname ? 'active': ''}`}>
            {
                !toggleMenu ?
                <NavLink to={item.link}>
                    <div className="menu-icon">
                        <img className={`icon ${isExcept ? 'except' : ''}`} src={`/icons/${item.icon}`} />
                        <img className="variant" src={`/icons/${item.variant}`} />
                    </div>
                    { !collapsed && <p>{item.text}</p>}
                </NavLink>
                :
                <a onClick={(e) => handleNav(e, item.link)}>
                    <div className="menu-icon">
                        <img className={`icon ${isExcept ? 'except' : ''}`} src={`/icons/${item.icon}`} />
                        <img className="variant" src={`/icons/${item.variant}`} />
                    </div>
                    { !collapsed && <p>{item.text}</p>}
                </a>
            }
        </li>
}

const Sidebar = ({ mobileVisible, toggleMobileNav }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <>
            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} uk-flex uk-flex-top uk-visible@m`}>
                <nav className="uk-nav uk-nav-default left-nav" uk-sticky="position: top">
                    <ul>
                        <li>
                            <button
                                className="uk-button uk-button-primary toggle-btn"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            >
                                {
                                    isCollapsed ? <span uk-icon="menu" style={{ color: '#fff'}} /> : <span uk-icon="close" style={{ color: "#fff"}} />
                                }
                            </button>
                        </li>
                        {
                            menulist.map((item) => <MenuItem key={item.key} collapsed={isCollapsed} item={item} />)
                        }
                    </ul>
                </nav>
            </aside>
            <nav className={`uk-nav uk-nav-default uk-hidden@m mobile-nav ${mobileVisible ? 'visible' : ''}`}>
                <ul>
                    <li className="close-btn">
                        <button onClick={() => toggleMobileNav(false)}>
                            <span uk-icon="close" style={{ color: "#fff"}} />
                        </button>
                    </li>
                    {
                        menulist.map((item) => <MenuItem toggleMenu={toggleMobileNav} key={item.key} collapsed={false} item={item} />)
                    }
                </ul>
            </nav>
        </>
    )
}

export default Sidebar;
