const React = require("react");
const Layout = require("./Layout");

function Profile( props ) {
  return (
    <Layout title="Profile Page">

      <div>
        <h1>Profile Page</h1>
        <img src={props.user.image} alt="Profile picture" />
        <p>Email: {props.user.email}</p>
      </div>

    </Layout>
  );
}

module.exports = Profile;
