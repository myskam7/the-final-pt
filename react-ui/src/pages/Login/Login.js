import React from 'react';
import './Login.css';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';


//dry up the code by making a seperate file to store our img files in an array of objects
const loginImgs = [
    {
        src: "https://raw.githubusercontent.com/DC-Developer/the-final-pt/master/react-ui/src/imgs/login-hero.png"
    },
    {
        src: "https://raw.githubusercontent.com/DC-Developer/the-final-pt/master/react-ui/src/imgs/logo.png"
    }
];


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.signup = this.signup.bind(this);
    }
    //type has to be specified here, since we're taking the response
    //from google or facebook, we will have to put conditionals with 
    //logic specific to fb or google since they send different responses
    signup(res, type) {

    }


    
    render() {

        var mainImg = loginImgs[0];
        var icon = loginImgs[1];

        const responseGoogle = (response) => {
            console.log(response);
            this.signup(response, 'google');
        }
        const responseFacebook = (response) => {
            console.log(response);
            this.signup(response, 'facebook');
        }
        //after the response, we need to trigger our api to authenthicate
        //the credentials

        return (
            <div className="Login-Alt">
                <img src={mainImg.src} />

                <div className="col-nested-grid">
                    <div className="loginLogoDiv">
                        <img src={icon.src} className="loginLogo"/>FIT CLIENT
                    </div>
                    <div className="oauth2">
                        <h1>Login</h1>
                        <FacebookLogin
                            appId="175418049620583"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            icon="fa-facebook"
                            cssClass="Rectangle-Copy"
                        />

                        <GoogleLogin
                            clientId="559169765800-3o3ge3ehthqa344cb0feq38a5occr13d.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            className="Rectangle-Copy-2"
                        />
                        
                        <div className="hrDiv">
                            <hr /><p className="hrText">or</p><hr />
                        </div>

                        <form action="" className="regLog" method="post">
                            <input type="text" placeholder="    Email" name="email" className="Rectangle-login" /><br />
                            <input type="password" placeholder="    Password" name="password" className="Rectangle-login" /><br />
                            <input type="submit" value="Login" className="Rectangle-Copy-3" />
                        </form>
                    </div>
  
                </div>
            </div>
        );
    }
}

export default Login; 
