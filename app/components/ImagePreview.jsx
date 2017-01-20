import React from 'react';

const ImagePreview = (props) => {
  return (
    <img src={props.url} alt="Preview" />
  );
};

ImagePreview.propTypes = {
  url: React.PropTypes.string.isRequired,
};

export default ImagePreview;
