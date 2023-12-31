import { Link } from "react-router-dom";
import Auth from '../../utilities/auth';
import ChatButton from "./chatButton";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PROF_CHATS } from "../../utilities/queries";
import { CREATE_MESSAGE } from "../../utilities/mutations";
import { useState } from "react";
import ChatModal from "./chatModal";
import ListingModal from "./createListingModal";

export default function MenuButton({ isOrganisation, pathName, setPathName }) {

    const [currentChatInfo, setCurrentChatInfo] = useState({});
    const [messageText, setMessageText] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('');

    const options = { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' };
    setInterval(() => {

    }, 2000);
    const { loading, data, refetch } = useQuery(QUERY_PROF_CHATS, {
        variables: { profileId: Auth.getProfile().data.userInfo._id }
    });
    const [createMessage, { error }] = useMutation(CREATE_MESSAGE);

    const handleChatInput = async (event, chatId, messageInfo) => {
        event.preventDefault();
        try {
            const { data } = await createMessage({
                variables: { messageInfo, chatId },
            });
            if (data) {
                setMessageText('');
                let newArray = [...currentChatInfo.chatMessages, { ...messageInfo, timeSent: new Date().toLocaleDateString('en-US', options) }];
                setCurrentChatInfo(previousChatInfo => ({
                    ...previousChatInfo,
                    chatMessages: newArray,
                }));
                refetch();
                scrollIntoMessage();
            }
        } catch (err) {
            console.error(err);
        };
    };

    const handleChatInfo = (chatId) => {
        setCurrentChatInfo(...(data.profileById.userChats.filter((chat) => chat._id == chatId)))
    };

    const scrollIntoMessage = () => {
        setTimeout(() => {
            const allMessages = document.getElementsByClassName('message');
            if (allMessages.length > 0) {
                allMessages[allMessages.length - 1].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            };
        }, 50);
    }

    const closeChatsOpenMessage = () => {
        document.querySelector('#current-chat-holder').style.display = 'flex';
        document.querySelector('#main-chat-holder').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('#main-chat-holder').style.display = 'none';
            document.querySelector('#current-chat-holder').style.opacity = 1;
            scrollIntoMessage();
        }, 1000);
    };

    const openChatsCloseMessage = () => {
        document.querySelector('#current-chat-holder').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('#main-chat-holder').style.display = 'flex';
            document.querySelector('#current-chat-holder').style.display = 'none';
            setTimeout(() => {
                document.querySelector('#main-chat-holder').style.opacity = 1;
            }, 300);
        }, 1000);
    };

    if (!loading) {
        return (
            <>
                <button onClick={() => setPathName('menubtn')} data-bs-toggle="modal" data-bs-target="#main-menu-modal" style={{  background: 'transparent', borderBottom: pathName == 'menubtn' ? '4px solid #EA312D' : '4px solid #032075', borderRadius: 0, color: pathName == 'menubtn' ? '#EA312D' : '#032075' }} ><i style={{fontSize: 20}} className="bi bi-list"></i></button>
                <div onClick={() => setPathName(window.location.pathname == '/' ? '/' : 'ds')} className="modal fade" id="main-menu-modal" tabIndex="-1" role="dialog" aria-labelledby="main-menu-modalLabel" aria-hidden="true" style={{ marginTop: 100 }}>
                    <div className="modal-dialog" role="document" style={{ marginRight: 0, marginTop: 0, width: 350 }}>
                        <div className="modal-content" style={{ height: 600 }}>
                            <div className="modal-header" style={{ display: 'flex', flexDirection: 'row-reverse', minHeight: 100 }}>
                                <h3 className="modal-title" id="main-menu-modalLabel" style={{ width: '100%' }}>Main menu</h3>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 10px 12px 0px inset', padding: 30 }}>
                                <div className='menu-hold' onMouseOver={() => setSelectedMenu('profile')} style={{ display: 'flex', width: '100%', padding: 15, marginBottom: 15, height: 65, alignItems: 'center', boxShadow: selectedMenu == 'profile' ? 'rgba(0, 0, 0, 0.3) 5px 5px 12px 0px' : 'rgba(0, 0, 0, 0.15) 5px 5px 12px 0px', borderRadius: 15 }}>
                                    <i style={{ fontSize: 33, marginRight: 20, color: '#032075' }} className="bi bi-person-lines-fill"></i>
                                    <Link style={{ paddingLeft: 20, borderLeft: '3px solid rgba(0, 0, 0, 0.08)' }} to={`/profile/${Auth.getProfile().data.userInfo._id}`} target="_blank"><p style={{ fontSize: 18, margin: 'auto', marginRight: 70 }} className="listing-not linkanchor">My Profile</p></Link>
                                    <Link to={`/profile/${Auth.getProfile().data.userInfo._id}`} target="_blank"><i style={{ fontSize: 26, color: '#032075' }} className="bi bi-box-arrow-in-up-right linkanchor"></i>
                                    </Link>
                                </div>
                                <div className='menu-hold' onMouseOver={() => setSelectedMenu('chat')} style={{ display: 'flex', width: '100%', padding: 15, marginBottom: 15, height: 65, alignItems: 'center', boxShadow: selectedMenu == 'chat' ? 'rgba(0, 0, 0, 0.3) 5px 5px 12px 0px' : 'rgba(0, 0, 0, 0.15) 5px 5px 12px 0px', borderRadius: 15 }}>
                                    <i style={{ fontSize: 33, marginRight: 20, color: '#032075' }} className="bi bi-chat-right-dots"></i>
                                    <ChatButton refetch={refetch} />
                                </div>

                                {isOrganisation ? (
                                    <div className='menu-hold' onMouseOver={() => setSelectedMenu('listing')} style={{ display: 'flex', width: '100%', padding: 15, marginBottom: 15, height: 65, alignItems: 'center', boxShadow: selectedMenu == 'listing' ? 'rgba(0, 0, 0, 0.3) 5px 5px 12px 0px' : 'rgba(0, 0, 0, 0.15) 5px 5px 12px 0px', borderRadius: 15 }}>
                                        <i style={{ fontSize: 33, marginRight: 20, color: '#032075' }} className="bi bi-list-columns-reverse"></i>
                                        <Link style={{ paddingLeft: 20, borderLeft: '3px solid rgba(0, 0, 0, 0.08)' }}>
                                            <p id="create-listing-button" data-bs-toggle="modal" data-bs-target="#createlisting-menu-modal" style={{ fontSize: 18, margin: 'auto', marginRight: 45 }} className="listing-not linkanchor" >Create Listing</p></Link>
                                        <Link>
                                            <i style={{ fontSize: 26, color: '#032075' }} data-bs-toggle="modal" data-bs-target="#createlisting-menu-modal" onClick={() => refetch()} className="bi bi-box-arrow-in-up-right linkanchor"></i>
                                        </Link>
                                    </div>
                                ) : ''}
                                <div className='menu-hold' onMouseOver={() => setSelectedMenu('logout')} style={{ display: 'flex', width: '100%', padding: 15, marginBottom: 15, height: 65, alignItems: 'center', boxShadow: selectedMenu == 'logout' ? 'rgba(0, 0, 0, 0.3) 5px 5px 12px 0px' : 'rgba(0, 0, 0, 0.15) 5px 5px 12px 0px', borderRadius: 15 }}>
                                    <i style={{ fontSize: 33, marginRight: 20, color: '#032075' }} className="bi bi bi-door-closed"></i>
                                    <Link style={{ paddingLeft: 20, borderLeft: '3px solid rgba(0, 0, 0, 0.08)' }}>
                                        <p id="logout-button" style={{ fontSize: 18, margin: 'auto', marginRight: 92 }} className="listing-not linkanchor" onClick={() => { event.preventDefault(), Auth.logout()}} >Logout</p></Link>
                                        <Link>
                                            <i style={{ fontSize: 26, color: '#032075' }} onClick={() => { event.preventDefault(), Auth.logout()}} className="bi bi-box-arrow-in-up-right linkanchor"></i>
                                        </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="chat-menu-modal" tabIndex="-1" role="dialog" aria-labelledby="chat-menu-modalLabel" aria-hidden="true" style={{ marginTop: 20 }}>
                    <ChatModal data={data} handleChatInfo={handleChatInfo} handleChatInput={handleChatInput} currentChatInfo={currentChatInfo} openChatsCloseMessage={openChatsCloseMessage} closeChatsOpenMessage={closeChatsOpenMessage} Auth={Auth} setMessageText={setMessageText} messageText={messageText} />
                </div>
                <div className="modal fade" id="createlisting-menu-modal" tabIndex="-1" role="dialog" aria-labelledby="createlisting-menu-modalLabel" aria-hidden="true">
                    <ListingModal />
                </div>
            </>
        );
    }
}