import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header-container">
                <NavLink to="/" className="navlink">Home</NavLink>
                {
                    this.props.user && this.props.user.token && <>
                    <NavLink to="/todos" className="navlink">Todos</NavLink>
                    <button onClick={this.props.handleLogout}>Sign Out</button>
                    </>
                    }
                    {
                        (!this.props.user || !this.props.user.token) && <>
                        <NavLink to="/login" className="navlink">Log In</NavLink>
                        <NavLink to="/signup" className="navlink">Sign Up</NavLink>
                        </>
                    }
            </div>
        )
    }
}
