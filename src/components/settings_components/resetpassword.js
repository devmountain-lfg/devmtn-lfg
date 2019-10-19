import React, { Component } from "react";
import "../../styling/publicpage.css";
import axios from "axios";
import Navbar from "../navbar";


class ResetPassword extends Component {

    constructor() {
        super();
        this.state = {
            currentPassword: "",
            newPassword1: "",
            newPassword2: ""
        }
    }

    ResetPassword = async () => {
        try {
            const {
                currentPassword,
                newPassword1,
                newPassword2
            } = this.state;

            const body = {
                currentPassword,
                newPassword: newPassword1
            };

            if(newPassword1 !== newPassword2) {
                alert("Passwords Do Not Match");
                return;
            }
            
            const passwordResetResponse = await axios.put('/reset_password', body);
            alert(passwordResetResponse.data);

            this.props.history.push("/app/settings");
            return;
        } catch (error) {
            alert(error.response.data)
        }
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };


    render() {

        return (
            <div className="publicpage-ref">
                <div className="welcome-back">Reset Password</div>
                <div className="login-logout">
                    <input
                        className="input-ref-large"
                        id="currentPassword"
                        type="password"
                        placeholder="Current Password"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        className="input-ref-large"
                        type="password"
                        id="newPassword1"
                        placeholder="New Password"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        className="input-ref-large"
                        id="newPassword2"
                        type="password"
                        placeholder="Confirm New Password"
                        onChange={e => this.handleChange(e)}
                    />

                    <button className="button-ref-medium" onClick={this.ResetPassword}>
                        Reset Password
            </button>
                </div>
                <Navbar />
            </div>
        );

    }
}

export default ResetPassword;