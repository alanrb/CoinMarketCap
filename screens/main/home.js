import React, { Component } from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import { getTickers } from "../../services/api";
import {
  AppActivityIndicatorFullScreen,
  ListItemSeperator,
  SearchBox
} from "../../components/Generic/app-generic";
import styles from "./styles";
import { COIN_DETAIL } from "../app";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      checkedLookup: {}
    };
  }

  componentDidMount() {
    return getTickers()
      .then(response => {
        // var arr = [];
        // for (var prop in response.data.data) {
        //   arr.push(response.data.data[prop]);
        // }
        this.setState({
          isLoading: false,
          dataSource: response.data.data,
          checkedLookup: {}
        });
        loadedTickers = this.state.dataSource;
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentWillUnmount() {
    loadedTickers = null;
  }

  handleItemPress = (id, name) => {
    this.props.navigation.navigate(COIN_DETAIL, { itemId: id, itemName: name });
  };

  handleSelectAllPress = () => {
    this.applyToAll(true);
  };

  handleDeselectAllPress = () => {
    this.applyToAll(false);
  };

  applyToAll = isChecked => {
    this.setState({
      checkedLookup: this.state.data.reduce((acc, x) => {
        acc[x.id] = isChecked;
        return acc;
      }, {})
    });
  };

  getItemLayout = (data, index) => {
    return {
      length: listItemHeight,
      offset: index * listItemHeight,
      index
    };
  };

  renderItem = rowData => {
    return (
      <ListItem
        id={rowData.item.id}
        // isChecked={this.state.checkedLookup[rowData.item.id]}
        name={rowData.item.name}
        symbol={rowData.item.symbol}
        price={rowData.item.quotes.USD.price}
        market_cap={rowData.item.quotes.USD.market_cap}
        volume_24h={rowData.item.quotes.USD.volume_24h}
        onTouch={() => this.handleItemPress(rowData.item.id, rowData.item.name)}
      />
    );
  };

  handleSearBoxChange = e => {
    // Alert.alert(text);
    let text = e.toLowerCase();
    let filteredName = loadedTickers.filter(ticker => {
      return (
        ticker.name.toLowerCase().match(text) ||
        ticker.symbol.toLowerCase().match(text)
      );
    });

    // if no match and text is empty
    if (!text || text === "") {
      console.log("change state");
      this.setState({
        dataSource: loadedTickers
      });
    }
    // if no name matches to text output
    else if (!Array.isArray(filteredName) && !filteredName.length) {
      console.log("no matches");
      this.setState({
        dataSource: []
      });
    }
    // if name matches then display
    else if (Array.isArray(filteredName)) {
      console.log("items matches");
      this.setState({
        dataSource: filteredName
      });
    }
  };

  render() {
    if (this.state.isLoading) {
      return <AppActivityIndicatorFullScreen />;
    }
    return (
      <View style={styles.container}>
        <SearchBox handleSearBoxChange={this.handleSearBoxChange} />
        <FlatList
          data={this.state.dataSource}
          extraData={this.state.checkedLookup}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          ItemSeparatorComponent={ListItemSeperator}
          getItemLayout={this.getItemLayout}
        />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//   },
// });
let loadedTickers = {};
const listItemHeight = 132;
const baseImageLink =
  "https://s2.coinmarketcap.com/static/img/coins/64x64/{id}.png";

class ListItem extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={styles.homeListItem}
        onPress={this.props.onTouch}
      >
        <View style={styles.homeListItemImageContainer}>
          <Image
            source={{ uri: baseImageLink.replace("{id}", this.props.id) }}
            style={styles.homeListItemImage}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text>
            {this.props.name} {this.props.symbol}
          </Text>
          <Text>Price: {this.props.price}</Text>
          <Text>MarketCap: {this.props.market_cap}</Text>
          <Text>Volume 24h: {this.props.volume_24h}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
