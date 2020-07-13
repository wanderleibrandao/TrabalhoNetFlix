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
    uri: 'data:image/jpeg;base64,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',
  },
  {
    icon: require('../assets/avatars/avatar2.png'),
    name: 'Luiz',
    uri: 'https://cdn-ofuxico.akamaized.net/img/upload/noticias/2019/08/22/leonardo-dicaprio-vai-produzir-versao-live-action-de-akira_346623_36_356761_36.jpg',
  },
  {
    icon: require('../assets/avatars/avatar3.png'),
    name: 'João',
    uri: 'https://i1.wp.com/s2.glbimg.com/k3HCgYU7Euv4BEaFSRAIn26OSRw=/600x400/smart/e.glbimg.com/og/ed/f/original/2015/03/17/nicolas_cage.jpg?resize=600%2C400',
  },
  {
    icon: require('../assets/avatars/avatar4.png'),
    name: 'Maria',
    uri: 'https://revistamarieclaire.globo.com/Revista/Marieclaire/foto/0,,69798548-EXH,00.jpg',
  },
  {
    icon: require('../assets/avatars/avatar5.png'),
    name: 'Pedro',
    uri: 'https://staticr1.blastingcdn.com/media/photogallery/2018/3/9/660x290/b_1200x675/cresce-o-apoio-a-bolsonaro-entre-os-famosos_1875147.jpg',
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
