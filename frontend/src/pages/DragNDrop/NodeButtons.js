import React from "react";


import "./nodebuttons.css"

function RunButton(props) {
    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <center>
                <button id="runbutton" onClick={() => props.run()}>
                    <i class="fa fa-play" color="white"></i>
                </button>
                {props.show &&
                    <button id="showbutton" onClick={props.greet}>
                        <i class="fa fa-eye" color="white"></i>
                    </button>
                }
            </center>
        </div>
    );
};

export default RunButton;
