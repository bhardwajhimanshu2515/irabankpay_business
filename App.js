import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  BackHandler,
  Platform, } from 'react-native';
import { WebView } from 'react-native-webview';
import React,{Component} from "react"

export default class App extends Component{
  WEBVIEW_REF = React.createRef();

  state = {
    canGoBack: false,
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  
  
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    if (this.state.canGoBack) {
      this.WEBVIEW_REF.current.goBack();
      return true;
    }
  };

  onNavigationStateChange = (navState) => {
    this.setState({
      canGoBack: navState.canGoBack,
    });
  };
  render(){
    return (
      <WebView 
      ref={this.WEBVIEW_REF}
      mediaPlaybackRequiresUserAction={false}
        style={styles.container}
        source={{ uri: 'https://irabank.in/merchant' }}
        javaScriptEnabledAndroid={true}
          javaScriptEnabled={true}    
          domStorageEnabled={true}
          onNavigationStateChange={this.onNavigationStateChange}
      />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

