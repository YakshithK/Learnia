import React from "react"
import PropTypes from 'prop-types'



const Card = ({
    title,
    content,
    children,
    style = {},
    ...restProps
}) => {
    const cardStyle = {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px 0',
        width: '80%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }

  const cardTitleStyle = {
    marginBottom: '10px',
    color: '#333',
  };

  const cardContentStyle = {
    marginTop: '10px',
  };

  const subheadingStyle = {
    margin: '15px 0 5px 0',
  };

  const listStyle = {
    paddingLeft: '20px',
    listStyleType: 'disc',
  };

  return (
    <div style={cardStyle}>
      <div style={cardTitleStyle}>
        <h2>{title}</h2>
      </div>
      <div style={cardContentStyle}>
        {content.map((item, index) => (
          <div key={index}>
            <h3 style={subheadingStyle}>{item.subheading}</h3>
            <ul style={listStyle}>
              {item.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

Card.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
}

export {Card}