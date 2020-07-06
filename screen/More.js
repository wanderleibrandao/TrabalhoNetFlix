import React, { useContext } from 'react';
import styled from 'styled-components/native';
import Avatar from '../components/Avatar';
import {View, Text} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import ProfileToEdit from './ProfileToEdit';
import { ProfileContext } from '../context/ProfileContext';
import { AsyncStorage } from '@react-native-community/async-storage';

const Screen = styled.View`
  flex: 1;
  background-color: #000;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
`;

const AvantarsContainer = styled.View`
  height: 150px;
`;

const Row = styled.View`
  flex: 1;
  background-color: #000;
  padding: 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const NetflixButton = styled.TouchableOpacity`
  flex-direction: row;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

const ButtonLabel = styled.Text`
  margin: 10px;
  color: gray;
`;

let profilesAvailables = [
  {
    icon: require('../assets/avatars/avatar1.png'),
    name: 'José',
    uri: 'https://scontent-gru1-1.cdninstagram.com/v/t51.2885-19/s320x320/97298653_526509991360463_5213687987757383680_n.jpg?_nc_ht=scontent-gru1-1.cdninstagram.com&_nc_ohc=RWX5y8rJdHUAX9K6U_h&oh=8ca2b3f60b78eabd066a52f242351bf7&oe=5F2C00D3',
  },
  {
    icon: require('../assets/avatars/avatar2.png'),
    name: 'Luiz',
    uri: 'https://scontent-gru1-1.cdninstagram.com/v/t51.2885-19/s320x320/52651678_303650763677566_7471224984396890112_n.jpg?_nc_ht=scontent-gru1-1.cdninstagram.com&_nc_ohc=0BQJJcWZuxAAX_C24iZ&oh=81ff0eb611cd7bf2a2fccd3682000a69&oe=5F2CBEA8',
  },
  {
    icon: require('../assets/avatars/avatar3.png'),
    name: 'João',
    uri: 'https://scontent-gru1-1.cdninstagram.com/v/t51.2885-19/11117183_1568595170061944_889008330_a.jpg?_nc_ht=scontent-gru1-1.cdninstagram.com&_nc_ohc=RYwusCNrBh8AX915kDm&oh=aef9c56e35c7b0dad19d0a0fe18d0f4e&oe=5F2C95EA',
  },
  {
    icon: require('../assets/avatars/avatar4.png'),
    name: 'Maria',
    uri: 'https://scontent-gru1-1.cdninstagram.com/v/t51.2885-19/s320x320/83965957_177341466883829_3733440093445160960_n.jpg?_nc_ht=scontent-gru1-1.cdninstagram.com&_nc_ohc=tbL-OjxaEOsAX-NR_RG&oh=bc6494f1b7be669e59730365cd53ec9c&oe=5F2D0F91',
  },
  {
    icon: require('../assets/avatars/avatar5.png'),
    name: 'Pedro',
    uri: 'https://scontent-gru1-1.cdninstagram.com/v/t51.2885-19/s320x320/105976043_273726223946388_319896007603273019_n.jpg?_nc_ht=scontent-gru1-1.cdninstagram.com&_nc_ohc=z0EG0t47iwkAX-XwzLz&oh=7e2d9cc2757eb79439afbc375d1129b1&oe=5F2B883C',
  },
];

const replaceAvatarsWithImage = (props, profilesAvailables) => {
  if (props.route?.params?.name) {
    profilesAvailables.map((item) => {
      if (item.name === props.route.params.name) {
        if (props.route?.params?.image) {
          item.uri = props.route.params.image;
          item.image = null;
        }
        if (props.route?.params?.icon) {
          item.icon = props.route.params.icon;
          item.uri = null;
        }
      }
      return item;
    });
  }
};

const selectProfile = (navigation, item) => {
  navigation.navigate('Home', {name: item.name});
};

const editProfile = (navigation, profiles) => {
  navigation.navigate('ProfileToEdit', {profiles: profiles});
};

const More = (props) => {
  const {user, setUser} = useContext(ProfileContext);
  // console.log('user inicial: ', user);
  replaceAvatarsWithImage(props, profilesAvailables);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('profile', value)
    } catch (e) {
      // saving error
    }
  }

  return (
    // <ProfileContext.Consumer>
    //   {(conteudo) => (
        <Screen>
        <AvantarsContainer>
          <Row horizontal>
            {profilesAvailables.map((item) => {
              return (
                <Avatar
                  key={item.name}
                  image={item.icon}
                  uri={item.uri}
                  name={item.name}
                  onPress={() => {
                    // console.log('perfil clicado: ', item.name);
                    setUser(item.name);
                    storeData(item.name);
                    // AsyncStorage.setItem('profile').then((result) => {console.log(result)});
                    selectProfile(props.navigation, item)
                  }}
                />
              );
            })}
          </Row>
        </AvantarsContainer>
        <NetflixButton
          onPress={() => editProfile(props.navigation, profilesAvailables)}>
          <MaterialIcons name="edit" size={24} color="gray" />
          <ButtonLabel>Gerenciar perfis</ButtonLabel>
        </NetflixButton>
      </Screen>
    //   )}
    // </ProfileContext.Consumer>
  );
};

export default More;
