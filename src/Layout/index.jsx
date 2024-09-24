import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import './Layout.css';
import Footer from "../components/Footer";

const MainLayout = () => {
    const [navVisible, setNavVisible] = useState(false);

    return (
        <div className="main-layout">
            <div className="uk-grid-collapse uk-grid-match" uk-grid="true" uk-height-match="target: > .uk-width-expand">
                <Sidebar mobileVisible={navVisible} toggleMobileNav={setNavVisible} />
                <main className="uk-width-expand">
                    <Header showMobileNav={setNavVisible} />
                    <div id="content" className="content">
                        <Outlet />
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default MainLayout;
