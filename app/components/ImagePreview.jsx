import React from 'react';

const ImagePreview = props => (
  <img src={props.url} alt="Preview" />
  );

ImagePreview.propTypes = {
  url: React.PropTypes.string.isRequired,
};

export default ImagePreview;
