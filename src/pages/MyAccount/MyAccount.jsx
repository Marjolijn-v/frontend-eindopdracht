import React from 'react';
import Button from "../../components/button/button.jsx";

function MyAccount() {
    return (
        <>
            <header><h1>My Account</h1></header>
            <section>
                <article>
                    <h3>My details</h3>
                    <div>
                        <p>Name</p>
                        <p>Email address</p>
                        <p>Location</p>
                    </div>
                    <Button
                        title="Change"
                        type="button"
                    />
                </article>
                <article>
                    <h3>My messages</h3>
                </article>
                <article>
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
                    />
                </article>
                <article>
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
            </section>
            
        </>
    );
}

export default MyAccount;
