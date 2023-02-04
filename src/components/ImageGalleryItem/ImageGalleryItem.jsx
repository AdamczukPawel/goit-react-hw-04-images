import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  imageClick,
}) => {
  return (
    <li className={css.galleryItem} key={id}>
      <img
        className={css.galleryItem__image}
        src={webformatURL}
        alt={tags}
        onClick={() => imageClick(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  imageClick: PropTypes.func.isRequired,
};
