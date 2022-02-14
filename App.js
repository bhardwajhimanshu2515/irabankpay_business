import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Platform,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import React, { Component } from "react";

export default class App extends Component {

  WEBVIEW_REF = React.createRef();

  state = {
    canGoBack: false,
    showME:false
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
  componentWillUnmount() {
    setTimeout(() => {}, 1000);
  }
  render() {
    return (
      <>
        <WebView
          ref={this.WEBVIEW_REF}
          mediaPlaybackRequiresUserAction={false}
          style={styles.container}
          source={{ uri: "https://irabank.in/merchant" }}
          javaScriptEnabledAndroid={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onNavigationStateChange={this.onNavigationStateChange}
          onLoadStart={(e) => this.setState({ showME: true })}
          onLoadEnd={(e) => this.setState({ showME: false })}
        />
        {this.state.showME && <ActivityIndicator size="large" color={"red"} style={{
          position:"absolute",
marginTop:20,
top:0,
bottom:0,
left:0,
right:0,
opacity:0.5,
          flex:1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}/>}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
