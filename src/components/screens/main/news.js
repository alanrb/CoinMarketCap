import React, { Component } from "react";
import { View, Text } from "react-native";

export default class News extends Component {
  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <Text>News</Text>
      </View>
    );
  }
}
