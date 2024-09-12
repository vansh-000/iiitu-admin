import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import {
  Captions,
  Download,
  Fullscreen,
  Thumbnails,
  Zoom,
} from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Images from './Images';
import { STATIC_FILES } from '../../utils/apiURl';
import { StaticLinkProvider } from '../../utils/StaticLinkProvider';

function GallerySlides({ images, handleDelete }) {
  const [index, setIndex] = useState(-1);
  
  const modifiedImages = images.map(image => ({
    ...image,
    src: StaticLinkProvider(image.image) 
  }));

  modifiedImages.forEach(image => {
    delete StaticLinkProvider(image.image);
  });

  return (
    <>
      <Images
        data={images}
        onClick={(currentIndex) => setIndex(currentIndex)}
        handleDelete={handleDelete}
      />

      <Lightbox
        plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
        captions={{
          showToggle: true,
          descriptionTextAlign: 'end',
        }}
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={modifiedImages}
      />
    </>
  );
}

export default GallerySlides;
