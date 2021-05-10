  
import './index.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import axios from 'axios';

import apiKey from './config';

import Header from './Components/Navigation';
import PhotoGallery from './Components/PhotoGallery';
import NotFound from './Components/NotFound';
import SearchForm from './Components/SearchForm';

class App extends Component {

  state = {
    isLoading: true,
    defaultTopic: 'surfing',
    retrievedPhotoData: {},
    currentTopic: null
  }

  getFlickrResults = (searchTerm=this.state.defaultTopic) => {
    // call the flickr api 
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTerm}&safe_search=1&format=json&nojsoncallback=1&per_page=24`)
      .then( response => {
     
        const returnedPhotoData = response.data.photos.photo.reduce((data, photo) => {
          const photoLink = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`
          data.push(<li key={photo.id}><img src={photoLink} /></li>);
          return data;
        }, []);
        return returnedPhotoData;
      })
      // push the created elements into state 
      // to be retrieved later by the photo container 
      .then(returnedPhotoData => {
        this.setState(prevState => { 
          let retrievedPhotoData = prevState.retrievedPhotoData;
          retrievedPhotoData[searchTerm] = returnedPhotoData;
          return { retrievedPhotoData: retrievedPhotoData, currentTopic: searchTerm, isLoading: false };
        });
      })
      .catch( err => console.log(err));
  }

  componentDidMount() {
    this.getFlickrResults();
    this.getFlickrResults('cats');
    this.getFlickrResults('dogs');
    this.getFlickrResults('beaches');
  }


  retrievePhotoData = (topic) => {

    if(!this.state.retrievedPhotoData[topic]){
      this.getFlickrResults(topic);
    }
    return this.state.retrievedPhotoData[topic];
  }

  render () {
    return (
      <BrowserRouter>
        <SearchForm onSearch={this.retrievePhotoData} />
        <Header />
        <Switch>
          <Route exact path='/' render={() => <PhotoGallery retrievePhotoData={this.retrievePhotoData} topic={this.state.defaultTopic} />} />
          <Route path='/search/:searchTerm' render={ ({match}) => <PhotoGallery retrievePhotoData={this.retrievePhotoData} match={match} />} />
          <Route exact path='/cats' render={() => <PhotoGallery retrievePhotoData={this.retrievePhotoData} topic='cats' />} />
          <Route exact path='/dogs' render={() => <PhotoGallery retrievePhotoData={this.retrievePhotoData} topic='dogs' />} />
          <Route exact path='/beaches' render={() => <PhotoGallery retrievePhotoData={this.retrievePhotoData} topic='beaches' />} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;