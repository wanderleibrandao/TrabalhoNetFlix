'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {type: RNCamera.Constants.Type.back, hasPermission: null, isProcessingPhoto: false}
  }

  componentDidMount() {
    const handlePermission = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      this.setState({hasPermission: status === 'granted'});
    };
    handlePermission();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RNCamera 
          ref={ref => {
            this.camera = ref;
          }}
          style={{ flex: 1 }} type={this.state.type}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <ActivityIndicator size="large" color="#00f00" animating={this.state.isProcessingPhoto} styles={{flex: 1, alignSelf: 'center'}}/>
            <TouchableOpacity
              style={{
                flex: 1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={async () => {
                if (this.camera) {
                  this.setState({isProcessingPhoto : true})
                  const options = {quality: 0.5, base64: true};
                  let photo = await this.camera.takePictureAsync(options);
                  this.setState({isProcessingPhoto : false})
                  console.log('tirou foto', photo);
                  this.props.navigation.navigate('More', {
                    image: photo.uri,
                    name: this.props.route.params.name,
                    icon: null,
                  });
                }
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white', width: 50, alignSelf: 'center' }}> Take photo </Text>
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    );
  }
}
