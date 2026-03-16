import './MyAccount.css'
import React, {useContext} from 'react';
import Button from "../../components/button/button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";


function MyAccount() {

    const { user, member } = useContext(AuthContext);
    const navigate = useNavigate();




    return (
        <>
            <div className="outer-container account-page">
                <header>
                    <h1 className="title account-page">My Account</h1>
                </header>
                <section className="content account-page">
                    <div className="two-article-wrapper account-page">
                        <article className="details account-page">
                            <h3>My details</h3>
                            <div>
                                <p><strong>Name:</strong> {member?.name}</p>
                                <p><strong>Location:</strong> {member?.location}</p>
                                <p><strong>Email address:</strong> { user?.email}</p>
                            </div>
                            <Button
                                title="Change"
                                type="button"
                            />
                        </article>
                        <article className="messages account-page">
                            <h3>My messages</h3>
                        </article>
                    </div>
                    <div className="two-article-wrapper account-page">
                        <article className="my-plants account-page">
                            <h3>My plants</h3>
                            <div>
                                <div>
                                    <h4>plant</h4>
                                </div>
                                <div>
                                    <h4>plant</h4>
                                </div>
                            </div>
                            <Button
                                title="Add new plant"
                                type="button"
                                onclick={() => navigate('/newplant') }
                            />
                        </article>
                        <article className="saved-plants account-page">
                            <h3>My saved plants</h3>
                            <div>
                                <div>
                                    <h4>plant</h4>
                                </div>
                                <div>
                                    <h4>plant</h4>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </div>
        </>
    );
}

export default MyAccount;
