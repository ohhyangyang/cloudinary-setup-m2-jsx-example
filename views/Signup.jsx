const React = require("react");
const Layout = require("./Layout");

function Signup() {
  return (
    <Layout title="Signup Page">
      <h2>Cloudinary Example</h2>
      <form action='/auth/signup' method='POST' encType="multipart/form-data">
  
        <label>Email</label>
        <input type='text' name='email' />
        <br/>

        <label>Password</label>
        <input type='password' name='password'/>
        <br/>
        <br/>



        <label>Profile picture</label>
        <input type='file' name='profilepic'/>
        <br/>



        <button type='submit'>Sign Up</button>
      </form>
    </Layout>
  );
}

module.exports = Signup;
