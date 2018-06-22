/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import Tabbar from "../../components/BottomNavigation/index";
import {
  TABBAR_BACKGROUND_COLOR,
  TABBAR_ITEM_COLOR,
  TABBAR_ITEM_SELECTED_COLOR,
  TABBAR_BADGE_COLOR,
  TABBAR_BADGE_LABEL_COLOR
} from "../../styles/common";
import Home from "./home";

const TAB = [
  {
    page: "HOME",
    title: "HOME",
    icon: null,
    iconText: "Home",
    badgeColor: TABBAR_BADGE_COLOR,
    badgeLabelColor: TABBAR_BADGE_LABEL_COLOR,
    badgeNumber: 0
  },
  {
    page: "FAVORITE",
    title: "FAVORITE",
    icon: null,
    iconText: "Favorite",
    badgeColor: TABBAR_BADGE_COLOR,
    badgeLabelColor: TABBAR_BADGE_LABEL_COLOR,
    badgeNumber: 0
  },
  {
    page: "HERO/ZERO",
    title: "HERO/ZERO",
    icon: null,
    iconText: "Hero/Zero",
    badgeColor: TABBAR_BADGE_COLOR,
    badgeLabelColor: TABBAR_BADGE_LABEL_COLOR,
    badgeNumber: 0
  },
  {
    page: "NEWS",
    title: "NEWS",
    icon: null,
    iconText: "News",
    badgeColor: TABBAR_BADGE_COLOR,
    badgeLabelColor: TABBAR_BADGE_LABEL_COLOR,
    badgeNumber: 0
  }
];
const HOME_INDEX = 0;
const FAVORITE_INDEX = 1;
const HERO_ZERO_INDEX = 2;
const NEWS_INDEX = 3;
export default class Main extends Component {
  // static navigationOptions = {
  //   title: 'Welcome',
  // };
  constructor() {
    super();
    this.state = {
      page: TAB[HOME_INDEX].page
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.page === TAB[HOME_INDEX].page && (
          <Home navigation={this.props.navigation} />
        )}
        {this.state.page === TAB[FAVORITE_INDEX].page && <Text>Screen2</Text>}
        {this.state.page === TAB[HERO_ZERO_INDEX].page && <Text>Screen3</Text>}
        {this.state.page === TAB[NEWS_INDEX].page && <Text>Screen4</Text>}
        <Tabbar
          type={"ripple"}
          rippleEffect={true}
          rippleColor={TABBAR_ITEM_SELECTED_COLOR}
          rippleDuration={280}
          tabbarBgColor={TABBAR_BACKGROUND_COLOR}
          tabbarBorderTopColor={null}
          iconColor={TABBAR_ITEM_COLOR}
          selectedIconColor={TABBAR_ITEM_SELECTED_COLOR}
          labelSize={12}
          labelColor={TABBAR_ITEM_COLOR}
          selectedLabelColor={TABBAR_ITEM_SELECTED_COLOR}
          badgeColor={TABBAR_BADGE_COLOR}
          badgeLabelColor={TABBAR_BADGE_LABEL_COLOR}
          badgeLabelSize={11}
          stateFunc={tab => {
            this.setState({ page: tab.page });
            //this.props.navigation.setParams({tabTitle: tab.title})
          }}
          activePage={this.state.page}
          tabs={TAB}
        />
      </View>
    );
  }
}
