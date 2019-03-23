import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Text, TextInput } from 'react-native';
import cities from '../data/cities.json';
import PropTypes from 'prop-types';

export default class PlacesModalBody extends Component {

  state = {
    inputValue: '',
  };

  getCities() {
    const { inputValue } = this.state;

    if ( inputValue.length === 0 ) {
      return cities;
    }

    return cities.filter((item) => {
      const search = String(inputValue).toLowerCase()
        .replace(/[\u0300-\u036f]/g, '');
      return String(item.name).toLowerCase()
        .replace(/[\u0300-\u036f]/g, '')
        .includes(search);
    });
  };

  handleSelectPlace = (placeId) => {
    this.props.onSelectPlace(placeId)
  };

  render() {
    const { inputValue } = this.state;

    return (
      <View style={{
        flex: 1,
      }}>
        <View style={{ backgroundColor: 'gray', padding: 10 }}>
          <TextInput
            style={{
              height: 40,
              backgroundColor: 'rgba(255,255,255,0.8)',
              borderRadius: 10,
              paddingHorizontal: 5,
            }}
            placeholder="Vyhľadať mesto"
            onChangeText={value => this.setState({inputValue: value})}
            value={ inputValue }
          />
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={ this.getCities() }
          keyExtractor={ item => (item.id).toString() }
          renderItem={ item => (
            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray'
              }}
              onPress={ this.handleSelectPlace.bind(this, item.item.id) }
            >
              <Text style={{
                color: '#000',
                paddingHorizontal: 15,
                paddingVertical: 10,
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