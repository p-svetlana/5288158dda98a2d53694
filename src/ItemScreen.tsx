import React from 'react';
import {Linking} from 'react-native';
import {Container, Text} from 'native-base';

export const ItemScreen = ({navigation, route}) => {
  const {data} = route.params;
  const {name, nasa_jpl_url, is_potentially_hazardous_asteroid} = data;
  return (
    <Container>
      <Text>Name: {name}</Text>
      <Text onPress={() => Linking.openURL(nasa_jpl_url)}>
        URL: {nasa_jpl_url}
      </Text>
      <Text>
        Hazardous Asteroid: {is_potentially_hazardous_asteroid ? 'yes' : 'no'}
      </Text>
    </Container>
  );
};
