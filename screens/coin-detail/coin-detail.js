import React, { Component } from "react";
import { Text } from "react-native";
import { Button } from "react-native-elements";
import { View } from "native-base";
import { PRIMARY_COLOR } from "../../styles/common";

export default class CoinDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("itemName", "NO-Name"),
      headerRight: (
        <Button
          onPress={() => navigation.navigate("MODAL")}
          title="Info"
          color="#fff"
        />
      ),
    };
  };

  render() {
    let itemId = this.props.navigation.getParam("itemId", "NO-ID");
    let itemName = this.props.navigation.getParam("itemName", "NO-Name");
    let full = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>
          U selected: {itemId} {itemName}
        </Text>
        <Text>
          U selected: {full.itemId} {full.itemName}
        </Text>
        <Button title="Goback" onPress={() => this.props.navigation.goBack()} />
        <Button
          title="Upate param"
          onPress={() =>
            this.props.navigation.setParams({ itemName: "Detail" })
          }
        />
      </View>
    );
  }
}
