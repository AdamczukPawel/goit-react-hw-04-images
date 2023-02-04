import { Component } from 'react';
import css from './App.module.css';
import axios from 'axios';

import { Loader } from './Loader/Loader';
import { fetchPicturesByTopic } from '../services/api';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    pictures: [],
    isLoading: false,
    error: null,
    query: '',
    page: 1,
    showModal: false,
    largeImageURL: '',
    lastPage: 1,
  };

  getPicturesFromApi = async searchedQuery => {
    this.setState({ isLoading: true, error: null });
    if (this.state.query !== '') {
      try {
        const response = await fetchPicturesByTopic(
          searchedQuery,
          this.state.page
        );
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...response.hits],
          lastPage: Math.ceil(response.totalHits / 12),
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  handleSubmit = query => {
    if (query !== this.state.query) {
      this.setState({ query, pictures: [], page: 1 }, () => {
        this.getPicturesFromApi(query);
      });
    }
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.getPicturesFromApi(this.state.query);
    });
  };

  showModal = largeImageURL => {
    this.setState({ showModal: true, largeImageURL: largeImageURL });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.isLoading && <Loader />}
        {this.state.pictures.lengt}
        <ImageGallery
          images={this.state.pictures}
          imageClick={this.showModal}
        />

        {this.state.pictures.length > 0 &&
        this.state.lastPage > this.state.page ? (
          <Button onClick={this.loadMore} />
        ) : null}
        {this.state.showModal && (
          <Modal
            onClose={this.closeModal}
            largeImage={this.state.largeImageURL}
          />
        )}
      </div>
    );
  }
}
