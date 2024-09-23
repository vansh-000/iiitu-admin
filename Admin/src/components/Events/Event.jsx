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
import Poster from './Poster';
import { StaticLinkProvider } from '../../utils/StaticLinkProvider';

function EventSlides({ data, handleDelete }) {
  const [index, setIndex] = useState(-1);

  const modifiedEvents = data?.map((d) => ({
    ...d,
    src: StaticLinkProvider(d?.image),
  }));

  modifiedEvents?.forEach((d) => {
    delete d.d;
  });
  return (
    <>
      <Poster
        data={data}
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
        slides={modifiedEvents}
      />
    </>
  );
}

export default EventSlides;
