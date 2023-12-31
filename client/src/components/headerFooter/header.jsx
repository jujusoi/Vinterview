import { Link } from "react-router-dom";
import Auth from '../../utilities/auth';
import MenuButton from "./menuButton";
import { useState, useEffect } from "react";

export default function Header() {

    const [pathName, setPathName] = useState();

    useEffect(() => {
        setPathName(window.location.pathname);
    }, [])

    let isLoggedIn;
    if (Auth.getToken()) {
        isLoggedIn = true;
    }

    return (
        <>
            <section id="header-sect">
                <div id="header-hold" style={{ display: "flex", width: '100%', justifyContent: 'space-evenly', height: 120, alignItems: 'center' }}>
                    <div id="header-logo" style={{ width: '60%', marginLeft: 100, marginRight: 300 }}>
                        <Link to={'/'} >
                            <img id="header-logo" style={{ display: 'flex' }} src="https://cdn.discordapp.com/attachments/1065871292009545748/1176359180597211207/vinterview.png?ex=656e94dc&is=655c1fdc&hm=dd3a8fd7af691adc08ebcc7084bfbf4fb8c404d81214f841fedc735ab833bb36&" alt="logo" width={120} height={95} />
                        </Link>
                    </div>
                    <div id="headerbtns-hold" style={{ display: "flex", width: '40%', height: 55 }}>
                        <Link onClick={() => setPathName('/')} to={'/'}><button className="headerbtn" style={{ height: '100%', marginRight: 20, background: 'transparent', borderBottom: pathName == '/' ? '4px solid #EA312D' : '4px solid #032075', borderRadius: 0, color: pathName == '/' ? '#EA312D' : '#032075' }}>Job Listings</button></Link>
                        {isLoggedIn ? '' : <Link onClick={() => setPathName('/login')} to={'/login'}><button style={{ height: '100%', marginRight: 20, background: 'transparent', borderBottom: pathName == '/login' ? '4px solid #EA312D' : '4px solid #032075', borderRadius: 0, color: pathName == '/login' ? '#EA312D' : '#032075' }} className="headerbtn">Login</button></Link>}
                        {isLoggedIn ? (<MenuButton isOrganisation={Auth.getProfile().data.userInfo.isOrganisation} pathName={pathName} setPathName={setPathName} />) : <Link onClick={() => setPathName('/create-account')} to={'/create-account'}><button style={{ height: '100%', background: 'transparent', borderBottom: pathName == '/create-account' ? '4px solid #EA312D' : '4px solid #032075', borderRadius: 0, color: pathName == '/create-account' ? '#EA312D' : '#032075' }} className="headerbtn">Sign Up</button></Link>}
                    </div>
                </div>
            </section>
            <section style={{ width: '100%' }}>
                <div style={{ height: 300, backgroundColor: 'rgb(135 165 195)' }}>
                    {!isLoggedIn ? (
                        <div id="about-hold" style={{ position: 'absolute', display: 'flex', width: '80%', height: '42%', textAlign: 'right', margin: '0px auto', left: 0, right: 0, justifyContent: 'center', zIndex: 1, flexDirection: 'column', alignItems: 'end' }}>
                            <div id="about-iv" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 7px 7px 7px 5px', padding: '0px 10px', paddingTop: 5, borderRadius: 15, width: '82%' }}>
                                <h1 id="about-title" style={{ color: 'white', fontWeight: 400 }}>About Vinterview</h1>
                                <p style={{ fontSize: 15 }} className="headerdiv-para">Vinterview believes that for beginner and lower-maintenance jobs, the use of resumes and cover letters is an unnecessary normality that reduces the possibility of new jobseekers entering the workforce.</p>
                                <p style={{ fontSize: 15 }} className="headerdiv-para">Vinterview aims to redefine the norm by offering an experience that facilitates direct one-on-one communication between job seekers and employers through chat features integrated into job listings. This method allows applicants to kickstart their career journey in an environment that values personal qualities and potential, rather than numbers and hours.</p>
                            </div>
                        </div>
                    ) : ''}
                    <div className="hf-wrapimg" style={{ height: '100%', width: '100%', backgroundImage: 'url(https://meetsalmela.com/polelid/2023/05/25334026_resume_01-1-1024x578.jpg)', backgroundSize: 'cover', filter: 'blur(2.5px) opacity(.5)', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 15px 4px inset', backgroundAttachment: 'fixed' }}>
                    </div>
                </div>
            </section>
        </>
    );
};