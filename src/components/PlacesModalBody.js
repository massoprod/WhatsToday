import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Text, TextInput } from 'react-native';
import cities from '../data/cities.json';
import PropTypes from 'prop-types';

const removeDiacritics = require('diacritics').remove;

class PlacesModalBody extends Component {

  state = {
    inputValue: '',
  };

  getCities() {
    const { inputValue } = this.state;

    if ( inputValue.length === 0 ) {
      return cities.sort((a, b) => {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      });
    }

    const query = removeDiacritics(inputValue.toLowerCase());

    const filteredCities = cities.filter(city => {
      const cityName = removeDiacritics(city.name.toLowerCase());
      return cityName.includes(query);
    });

    return filteredCities.sort((a, b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    });
  };

  handleSelectPlace = (placeId) => {
    this.props.onSelectPlace(placeId)
  };

  render() {
    const { isDay } = this.props;
    const { inputValue } = this.state;

    return (
      <View style={{
        flex: 1,
      }}>
        <View style={{ backgroundColor: '#26639a', paddingVertical: 15, paddingHorizontal: 10 }}>
          <TextInput
            style={{
              height: 40,
              backgroundColor: '#fff',
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
            placeholder="Vyhľadať mesto"
            onChangeText={value => this.setState({inputValue: value})}
            value={ inputValue }
            autoFocus
          />
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={ this.getCities() }
          keyExtractor={ item => (item.id).toString() }
          renderItem={ item => (
            <TouchableOpacity
              style={{
                backgroundColor: item.index % 2 === 0 ? 'rgba(255,255,255,0.4)' : 'transparent',
              }}
              onPress={ this.handleSelectPlace.bind(this, item.item.id) }
            >
              <Text style={{
                color: isDay ? '#000' : '#fff',
                paddingHorizontal: 15,
                paddingVertical: 15,
                fontSize: 15,
                fontWeight: item.index % 2 === 0 ? '500' : '100',
              }}>{item.item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

PlacesModalBody.propTypes = {
  onSelectPlace: PropTypes.func.isRequired,
};

export default PlacesModalBody;
