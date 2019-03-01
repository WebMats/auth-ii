import React, { Component } from 'react'

export default class loginForm extends Component {
    constructor(props) {
        super(props)
        this.usernameInput = React.createRef();
        this.passwordInput = React.createRef();
        this.state = {}
    }
    formSubmitHandler = (e) => {
        e.preventDefault();
        this.props.login({variables: {
            username: this.usernameInput.current.value,
            password: this.passwordInput.current.value
        }})
    }
  render() {
    return (
      <form  style={{maxWidth: "800px", width:"95%", margin: "0 auto", paddingTop: "10rem"}} onSubmit={this.formSubmitHandler}>
          <div className="row form-group">
            <div className="col-sm-10">
                <label>Username</label>
                <input className="form-control" placeholder="Username" ref={this.usernameInput} />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-10">
                <label>Password</label>
                <input className="form-control" placeholder="Password" ref={this.passwordInput} />
            </div>
          </div>
          <button className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

