import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import { useState } from 'react'
import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';

const clientId = ""

const success = response => {  
  const accessToken = response.accessToken;
  console.log(response)

  const urls = `
    {
    "inspectionUrl": "",
    "siteUrl": ""
    }
    `

  async function postData(data) {
    const response = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
      },
      body: data
    })
    return response.json();
  }

  postData(urls)
    .then((values) => {
      Object.keys(values.inspectionResult.indexStatusResult).forEach(function(key) {
        console.log(key, values.inspectionResult.indexStatusResult[key]);        
      })
      
    });

}

const error = response => {
  console.error(response) // eslint-disable-line
}

const loading = () => {
  console.log('loading') // eslint-disable-line
}

const logout = () => {
  console.log('logout') // eslint-disable-line
}

const MountTest = () => {
  const [showButton, toggleShow] = useState(true)

  if (showButton) {
    return (
      <GoogleLogin
        onSuccess={res => {
          toggleShow(false)
          success(res)
        }}
        onFailure={error}
        clientId={clientId}
      >
        Auth then Hide button
      </GoogleLogin>
    )
  }

  return <button onClick={() => toggleShow(true)}>show button</button>
}

export default () => (
  <div>
    <MountTest />
    <br />
    <br />
    <GoogleLogin
      clientId={clientId}
      scope="https://www.googleapis.com/auth/webmasters"
      onSuccess={success}
      onFailure={error}
      onRequest={loading}
      offline={false}
      approvalPrompt="force"
      responseType="id_token"
      isSignedIn
      theme="dark"
      // disabled
      // prompt="consent"
      // className='button'
      // style={{ color: 'red' }}
    >
      <span>Analytics</span>
    </GoogleLogin>
    <br />
    <br />
    <GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />
    <div id="main"></div>
  </div>
)