import React from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Redirect, Link } from "react-router-dom";
//import Home from "../Components/HomeComponent";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectRef: false,
      passwordType: "password",
      toggleEye: "far fa-eye",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      name: "",
      imgurl: "",
    };
    this.changeEye = this.changeEye.bind(this);
    this.changeFirstname = this.changeFirstname.bind(this);
    this.changeLastname = this.changeLastname.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  changeEye(e) {
    this.setState((state) => ({
      passwordType: state.passwordType === "password" ? "text" : "password",
    }));
    this.setState((state) => ({
      toggleEye:
        state.toggleEye === "far fa-eye" ? "far fa-eye-slash" : "far fa-eye",
    }));
  }
  responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    if (response.profileObj !== undefined) {
      this.setState({
        name: response.profileObj.name,
        imgurl: response.profileObj.imageUrl,
      });
    }
  };
  responseFacebook = (response) => {
    console.log(response);
    this.setState({
      name: response.name,
    });
  };
  changeFirstname(e) {
    this.setState({
      firstname: e.target.value,
    });
  }
  changeLastname(e) {
    this.setState({
      lastname: e.target.value,
    });
  }
  changeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  changePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  sendData() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    };
    fetch("https://reqres.in/api/login", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        } else {
          this.setState({
            redirectRef: true,
          });
        }
      })
      .catch((error) => {
        alert("Invalid Credentials");
      });
  }
  render() {
    if (this.state.redirectRef) {
      return <Redirect to="/home"></Redirect>;
    }
    return (
      <div>
        <div className="card">
          <div className="container">
            <div className="logo">
              <img className="logo-img" src="sa.jpeg" alt="Logo" />
            </div>
            <div className="heading-1">Create your account</div>
            <div className="samp-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing eit
            </div>
            <div className="auth">
              <div className="goo">
                <GoogleLogin
                  clientId="131903266622-oct1ae5q0he0tpdrtv0j28h6k62lb9s0.apps.googleusercontent.com"
                  buttonText="Sign up with Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy="single_host_origin"
                  className="gs"
                />
              </div>
              <div className="face">
                <FacebookLogin
                  appId="2592350961029666"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={this.responseFacebook}
                  cssClass="fs"
                  icon="fab fa-facebook-square fa-lg ic"
                />
              </div>
            </div>
            <div className="decorated">
              <span>or</span>
            </div>
            <div className="inp-div">
              <div className="inp">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  className="ele"
                  value={this.state.firstname}
                  onChange={this.changeFirstname}
                />
              </div>
              <div className="inp">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Last Name"
                  className="ele"
                  value={this.state.lastname}
                  onChange={this.changeLastname}
                />
              </div>
              <div className="inp">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="ele"
                  value={this.state.email}
                  onChange={this.changeEmail}
                />
              </div>
              <div className="inp">
                <input
                  type={this.state.passwordType}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="ele-pass"
                  value={this.state.password}
                  onChange={this.changePassword}
                />
                <i
                  className={this.state.toggleEye}
                  onClick={this.changeEye}
                ></i>
              </div>
            </div>
            <div className="pol-text">
              By clicking Sign Up, you agree to our{" "}
              <Link to="/">Terms of Use</Link> and our{" "}
              <Link to="/">Privacy Policy</Link>.
            </div>
            <div className="btn">
              <button type="button" onClick={this.sendData}>
                SIGN UP
              </button>
            </div>
          </div>
        </div>
        <div className="r">
          <div>{this.state.name}</div>
        </div>
      </div>
    );
  }
}

export default SignUp;
