import React from 'react';

const Each = ({ render, of }) => {
  // Convert 'of' to an array if it's not already an array
  const ofArray = Array.isArray(of) ? of : React.Children.toArray(of);

  return ofArray.map((item, index) => render(item, index));
};

export default Each;
