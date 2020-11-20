const React = require("react");

function Card(props) {
  return (
    <div>
      <h1>Card component example</h1>
      <img src={props.image} width="100" alt="" />
      <p>{props.text}</p>
    </div>
  );
}

module.exports = Card;
