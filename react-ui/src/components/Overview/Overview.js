import React from 'react';
import './Overview.css';
//this component will be setting the size for the client page


const Overview = (props) => {
    return (
        <div>

                <div>
                    <div className="h1" id="overview">Overview</div>
                </div>
                <div className="overview-container">
                    <div className="overview-div" id="clients">
                        <div className="overview-div-container">
                            <div className="overview-div-header">Recently added clients</div>
                                         {/* map through the state of recently added clients and create divs here */}
                                         {/* test data */}
                            <div id="view-all">View All</div>
                        </div>
                    </div>
                    <div className="overview-div">
                        <div className="overview-div-container">
                            <div className="overview-div-header">Upcoming appointments</div>

                                        {/* test data */}
                            <div id="view-all">View All</div>
                        </div>
                    </div>
                </div>



        </div>
    );
}

export default Overview;