import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Form, Item, Input, Container, Text, View} from 'native-base';
import {useNavigation} from '@react-navigation/core';

export const WelcomeScreen = () => {
  const [value, setValue] = useState<string>('');
  const [responseData, setResponseData] = useState({});
  const navigation = useNavigation();

  const api_key = 'JVYhGPH4gQqGeszPM2TLC4xzymBf8FP7B8PySixB';

  const handleSubmit = async (id) => {
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${api_key}`,
    );
    const parseData = await response.json();
    setResponseData(parseData);
    navigation.navigate('ItemScreen', {data: responseData});
    console.log(parseData);
  };

  const handleRandom = async () => {
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY`,
    );
    const allAsteroids = await response.json();
    const {near_earth_objects} = allAsteroids;
    const random = Math.ceil(Math.random() * (near_earth_objects.length - 1));
    handleSubmit(allAsteroids.near_earth_objects[random].id);
  };
  return (
    <Container>
      <Form>
        <Item>
          <Input
            placeholder="Enter Asteroid ID"
            value={value}
            onChangeText={(text) => setValue(text)}
          />
        </Item>
      </Form>
      <View style={styles.buttonsContainer}>
        <Button disabled={!value} onPress={() => handleSubmit(value)}>
          <Text>Submit</Text>
        </Button>
        <Button onPress={handleRandom}>
          <Text>Random Asteroid</Text>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
