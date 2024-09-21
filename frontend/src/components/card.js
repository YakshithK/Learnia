import React from "react";
import PropTypes from 'prop-types';

// Function to dynamically parse resource links in the format "[Text](Link)"
const parseResourceLinks = (text) => {
  const regex = /\[(.*?)\]\((.*?)\)/g;
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push({ text: match[1], url: match[2] });
  }
  return matches;
};

const Card = ({
  title,
  content,
  children,
  style = {},
  ...restProps
}) => {
  const cardStyle = {
    background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
    padding: '20px',
    borderRadius: '12px',
    margin: '20px 0',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    width: '100%',
    maxWidth: '800px',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    ...style, // allows overriding with passed-in styles
  };

  const cardTitleStyle = {
    marginBottom: '15px',
    color: '#333',
    fontSize: '28px',
    fontWeight: 'bold',
  };

  const cardContentStyle = {
    marginTop: '20px',
    color: '#444',
    lineHeight: '1.6',
  };

  const subheadingStyle = {
    margin: '25px 0 10px 0',
    fontSize: '22px',
    fontWeight: '600',
    color: '#555',
  };

  const listStyle = {
    paddingLeft: '25px',
    listStyleType: 'disc',
    marginBottom: '20px',
  };

  const linkStyle = {
    color: '#007BFF',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.2s ease-in-out',
  };

  const hoverLinkStyle = {
    color: '#0056b3',
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
              {item.details.map((detail, i) => {
                // Parse the resource links only for the Resources section
                if (item.subheading.toLowerCase() === 'resources') {
                  const links = parseResourceLinks(detail);
                  return (
                    <li key={i}>
                      {links.length > 0 ? (
                        links.map((link, j) => (
                          <a
                            key={j}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={linkStyle}
                            onMouseOver={(e) => (e.target.style.color = hoverLinkStyle.color)}
                            onMouseOut={(e) => (e.target.style.color = linkStyle.color)}
                          >
                            {link.text}
                          </a>
                        ))
                      ) : (
                        detail
                      )}
                    </li>
                  );
                } else {
                  return <li key={i}>{detail}</li>;
                }
              })}
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
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      subheading: PropTypes.string.isRequired,
      details: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  style: PropTypes.object,
};

export { Card };
