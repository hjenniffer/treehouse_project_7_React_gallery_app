import React from 'react';
import NotFound from './NotFound';

const PhotoGallery= (props) => {
  const photoTopic = props.topic || props.match.params.searchTerm;

  const photoData = props.retrievePhotoData(photoTopic);

  // show loading when data is being retrived
  if (!photoData) {
    return (
      <h4>Loading....</h4>
    );
  // if at least 1 photo returned display it
  } else if (photoData.length > 0) {
    return (
      <div className='photo-container'>
        <h3>{`Found some pictures of ${photoTopic}.`}</h3>
        <h4>Click a photo category above, or search for something!</h4>
        <ul>
          {photoData}
        </ul>
      </div>
    );
  // no results to display
  } else {
    return (
      <NotFound />
    );
  }
};

export default PhotoGallery;