import React, {useState} from 'react';
import {Dimensions, TouchableWithoutFeedback} from 'react-native';
import {useSpring, animated} from 'react-spring';

import styled from 'styled-components/native';

const Container = styled.View`
  padding: 0px;
`;

const Label = styled.Text`
  color: #fff;
  font-size: 16px;
  margin: 0 0 5px 10px;
`;
const MovieScroll = styled.ScrollView`
  padding-left: 10px;
`;

const MoviePoster = styled.Image`
  width: ${Math.round((Dimensions.get('window').width * 28) / 100)}px;
  height: 150px;
`;

const AnimatedMoviePoster = animated(MoviePoster);

const MovieCard = styled.View`
  padding: 10px;
  padding-right: 10px;
  padding-left: 0px;
`;

const Movies = ({label, item}) => {
  const [pressing, setPressedIn] = useState({pressed: false});

//   const translate = useSpring({transform: [{scale: 0}], from: {transform: [{scale: 1}]}});
// const translate = useSpring({from: {translate: 0}, translate: pressing ? 1 : 0, config: {duration: 500}});
const translate = useSpring({scale: pressing ? 1.1 : 1})

  return (
    <Container>
      <Label>{label}</Label>
      <MovieScroll horizontal>
        {item.map((movie, index) => {
          return (
            <MovieCard key={String(index)}>
              <TouchableWithoutFeedback
                onPressOut={() => {
                  setPressedIn({pressed: false});
                }}
                onPressIn={() => {
                  setPressedIn({pressed: true, index: index});
                }}>
                <AnimatedMoviePoster
                  style={
                    index === pressing.index ? {transform: [translate]} : null
                  }
                  resizeMode="cover"
                  source={movie}
                />
              </TouchableWithoutFeedback>
            </MovieCard>
          );
        })}
      </MovieScroll>
    </Container>
  );
};

export default Movies;
