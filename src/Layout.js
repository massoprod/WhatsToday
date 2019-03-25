import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { NavBar } from './components/ui';
import Title from './components/Title';
import WeatherInfo from './components/WeatherInfo';
import NameDayInfo from './components/NameDayInfo';
import DateInfo from './components/DateInfo';
import { isDay } from './libs';
import PlacesModal from './components/PlacesModal';
import FaIcon from 'react-native-vector-icons/FontAwesome';

const DAY_BG = require('./img/daybg.png');
const NIGHT_BG = require('./img/nightbg.png');

export default class Layout extends Component {

  state = {
    isPlacesModalShown: false,
    selectedPlace: null,
  };

  handleShowPlacesModal = () => {
    this.setState({ isPlacesModalShown: true });
  };

  handleHidePlacesModal = () => {
    this.setState({ isPlacesModalShown: false });
  };

  handleSelectPlace = (placeId) => {
    this.setState({
      selectedPlace: placeId,
      isPlacesModalShown: false,
    });
  };

  render() {
    const { isPlacesModalShown, selectedPlace } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <NavBar
          title={ <Title /> }
        />
        <View style={{ position: 'relative', height: '100%', width: '100%' }}>
          <Image
            source={isDay() ? DAY_BG : NIGHT_BG}
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
              resizeMode: 'cover',
              opacity: 1,
            }}
          />
          <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, width: '100%', paddingHorizontal: 15 }}>
            <DateInfo isDay={ isDay() } />
            <WeatherInfo
              isDay={ isDay() }
              selectedPlace={ selectedPlace }
              onSettingsPress={ this.handleShowPlacesModal }
            />
            <NameDayInfo isDay={ isDay() } />
          </View>
          <TouchableOpacity
            style={{ position: 'absolute', top: 20, right: 15 }}
            onPress={ this.handleShowPlacesModal }
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <FaIcon name={ 'cog' } size={ 25 } color={ isDay() ? '#26639a' : '#3ded88' } />
          </TouchableOpacity>
        </View>
        <PlacesModal
          isVisible={ isPlacesModalShown }
          onModalClose={ this.handleHidePlacesModal }
          isDay={ isDay() }
          onSelectPlace={ this.handleSelectPlace }
        />
      </View>
    );
  }
}