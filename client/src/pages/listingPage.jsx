import { useQuery, useMutation } from "@apollo/client";
import { QUERY_LISTING_BY_ID } from "../utilities/queries";
import { useParams } from "react-router-dom";
import { CREATE_NEW_CHAT } from "../utilities/mutations";

import { Link } from "react-router-dom";

import MiniListings from "../components/listingComps/miniListings";
import LoadingPage from "./loadingPage";
import SaveListingButton from "../components/jobBoard/boardButtons/saveListingButton";
import Auth from '../utilities/auth';
import InterestedButton from "../components/jobBoard/boardButtons/interestedButton";
import DeleteListing from "../components/jobBoard/boardButtons/deleteListingButton";

export default function ListingPage() {

    const listingId = useParams().listingId;

    const profileId = Auth.getProfile().data.userInfo._id;

    const { loading, data } = useQuery(QUERY_LISTING_BY_ID, {
        variables: { listingId: listingId }
    });
    const [createNewChat, { error }] = useMutation(CREATE_NEW_CHAT);

    const handleNewChat = async (event, chatInfo) => {
        event.preventDefault();
        try {
            const { data } = await createNewChat({
                variables: { chatInfo: { ...chatInfo } },
            });
            if (data) {
                document.querySelector('#chat-button').click();
                setTimeout(() => {
                    const listOfAllChats = document.getElementsByClassName('userchat-hold');
                    const mostRecentChat = listOfAllChats[listOfAllChats.length - 1];
                    setTimeout(() => {
                        mostRecentChat.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                        mostRecentChat.style.backgroundColor = '#94d7ef'
                        setTimeout(() => {
                            mostRecentChat.style.backgroundColor = ''
                        }, 1000);
                    }, 300);
                }, 200);
            }
        } catch (err) {
            console.error(err);
        };
    };

    if (loading) {
        <LoadingPage />
    } else {
        console.log(data)
        return (
            <>
                <section style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div style={{ width: '80%' }}>
                        <div className="job-listing" style={{ display: 'flex', flexDirection: "column", margin: '40px auto', border: '1px solid white', borderRadius: 8, width: '100%' }}>
                            <div className="liinfo-hold" style={{ display: "flex", flexDirection: "column" }}>
                                <div className="tsd-hold" style={{ display: "flex", justifyContent: 'space-between', marginBottom: 15, alignItems: 'center' }}>
                                    <div id="td-div" className="ts-hold" style={{ display: 'flex', width: '65%', flexDirection: 'column' }}>
                                        <h1 style={{ textAlign: 'left', marginTop: 0, marginBottom: 5 }} className="listing-title">{data.listingById.title}</h1>
                                        <div style={{ display: 'flex' }}>
                                            <p className="listing-not" style={{ marginRight: 10 }}>By: </p>
                                            <Link to={`/profile/${data.listingById.poster[0]._id}`} target="_blank"><h5 className="listing-org linkanchor">{data.listingById.organisationName}</h5></Link>
                                        </div>
                                    </div>
                                    <div className="ts-hold" id="buttonsndate" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <p className="listing-not" style={{ marginTop: 0, textAlign: "right", marginBottom: 35 }}>Posted on: {data.listingById.postedOn}</p>
                                        {Auth.getProfile().data.userInfo.isOrganisation ? (Auth.getProfile().data.userInfo._id == data.listingById.poster[0]._id ? (< DeleteListing listingId={listingId} profileId={profileId} />) : '') : (
                                            <div style={{ height: 60, display: 'flex' }}>
                                                <InterestedButton handleNewChat={handleNewChat} listing={data.listingById} profileId={Auth.getProfile().data.userInfo._id} />
                                                <SaveListingButton listingId={listingId} profileId={profileId} />
                                            </div>
                                        )}
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </section>
                <section style={{ minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 15px 4px inset', padding: '40px 0px'}}>
                    <div style={{ width: '65%', margin: '0px auto 30px auto'}}>
                        <div className="ilj-o-hold" style={{ display: "flex", flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingTop: 20 }}>
                            <div className="liilj-hold" style={{ display: 'flex', width: '100%', justifyContent: 'space-between', textAlign: 'left' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <p className="listing-not" style={{ marginRight: 10 }}>Employment: </p>
                                    <li className="listing-details">{data.listingById.jobType}</li>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <p className="listing-not" style={{ marginRight: 10 }}>Industry: </p>
                                    <li className="listing-details">{data.listingById.industry}</li>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <p className="listing-not" style={{ marginRight: 10 }}>Location: </p>
                                    <li className="listing-details">{data.listingById.location}</li>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <p className="listing-not" style={{ marginRight: 10 }}>Salary: </p>
                                    <li style={{ textAlign: 'left' }} className="listing-details">{data.listingById.salary}</li>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lidesc-hold" style={{ width: '80%', margin: 'auto', marginBottom: 30, textAlign: 'left', borderLeft: '5px solid #032075', padding: 30, boxShadow: 'rgba(0, 0, 0, 0.07) 7px 7px 7px 0px', borderRadius: 5 }}>
                            <h4>Job Description: </h4>
                            <p className="listing-description">{data.listingById.jobDescription}</p>
                        </div>
                </section>
            </>
        );
    }
};