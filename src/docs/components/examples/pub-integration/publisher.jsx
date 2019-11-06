import { h, Component } from 'preact';
import style from './publisher.less'; 
import image from './public/images/capital.jpg';
import React from 'react';
import { Link } from 'react-router-dom'; 

export default class Publisher extends Component { 
    render() {
        return (
            <div>
                <nav>
                    <header>
                        <h1>Publisher Daily</h1>
                    </header>
                    <nav className={style.subMenu}>
                        <ul>
                            <li>News</li>
                            <li>Politics</li>
                            <li>Entertainment</li>
                            <li>Life</li>
                        </ul>
                    </nav>
                </nav>

                <main>
                    <div>
                        <ul>
                            <h4>#Trending</h4>
                            <li>Whistleblower</li>
                            <li>FDA Recall</li>
                            <li>Water Crisis</li>
                            <li>Looming Crash</li>
                            <li>Racey Humor</li>
                        </ul>
                    </div>

                    <div>
                        <div className={style.frontPage}>
                            <span>Congressional Trial Underway</span>
                            <div className={style.frontPagePhoto}>
                                <img src={image}/>
                            </div>
                        </div>
                    </div>

                    <Link to='/cmp'>
                        <button className={style.consentButton}>
                            Update Consent
                        </button>
                    </Link>
                </main>
                
            </div>
        );
    }
}