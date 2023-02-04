import { Component } from 'react';
import css from './Loader.module.css';
import { TailSpin } from 'react-loader-spinner';

export class Loader extends Component {
  render() {
    return (
      <TailSpin
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass={css.loader}
        visible={true}
      />
    );
  }
}
