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
    uri: null,
  },
  {
    icon: require('../assets/avatars/avatar2.png'),
    name: 'Luiz',
    uri: null,
  },
  {
    icon: require('../assets/avatars/avatar3.png'),
    name: 'João',
    uri: null,
  },
  {
    icon: require('../assets/avatars/avatar4.png'),
    name: 'Maria',
    uri: null,
  },
  {
    icon: require('../assets/avatars/avatar5.png'),
    name: 'Pedro',
    uri: null,
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
