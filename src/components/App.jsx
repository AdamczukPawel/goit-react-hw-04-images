import { useState } from 'react';
import css from './App.module.css';

import { Loader } from './Loader/Loader';
import { fetchPicturesByTopic } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queryInput, setQueryInput] = useState('');
  const [page, setPage] = useState(1);
  const [modalShown, setModalShown] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [lastPage, setLastPage] = useState(1);

  const getPicturesFromApi = async (searchedQuery, page) => {
    setIsLoading(true);
    setError(null);

    if (queryInput !== '') {
      try {
        const response = await fetchPicturesByTopic(searchedQuery, page);
        setPictures(prevState => [...prevState, ...response.hits]);
        setLastPage(Math.ceil(response.totalHits / 12));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = query => {
    if (queryInput !== '') {
      setQueryInput(query);
      setPictures([]);
      setPage(1);
      getPicturesFromApi(query);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
    getPicturesFromApi(queryInput, page + 1);
  };

  const showModal = largeImageURL => {
    setModalShown(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setModalShown(false);
    setLargeImageURL('');
  };

  return (
    <div className={css.app}>
      <Searchbar
        onSubmit={handleSubmit}
        query={queryInput}
        setQueryInput={setQueryInput}
      />
      {isLoading && <Loader />}
      {pictures.lengt}
      <ImageGallery images={pictures} imageClick={showModal} />

      {pictures.length > 0 && lastPage > page && !error ? (
        <Button onClick={loadMore} />
      ) : null}
      {modalShown && <Modal onClose={closeModal} largeImage={largeImageURL} />}
    </div>
  );
};
