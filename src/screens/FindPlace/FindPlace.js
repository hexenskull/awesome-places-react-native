import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";
import { connect } from "react-redux";

import PlaceList from "../../components/PlaceList/PlaceList";
import { getPlaces } from "../../store/actions/index";

class FindPlaceScreen extends Component {
  // changing statitc var of navigator menu button that triggers drawer
  static navigatorStyle = {
    navBarButtonColor: "#E91E63"
  };

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0)
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        this.props.onLoadPlaces();
      }
    }

    console.log(event);
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        console.log("toggle drawer pressed");
        this.props.navigator.toggleDrawer({
          side: "left",
          animated: "true"
        });
      }
    }
  };
  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };
  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    });
  };

  itemSelectedHandler = key => {
    const selPlace = this.props.places.find(place => {
      return place.key === key;
    });
    this.props.navigator.push({
      screen: "awesome-places.PlaceDetailScreen",
      title: selPlace.name,
      passProps: {
        selectedPlace: selPlace
      }
    });
  };

  render() {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.placesLoaded) {
      content = (
        <PlaceList
          places={this.props.places}
          onItemSelected={this.itemSelectedHandler}
        />
      );
    }

    return (
      <View
        style={
          this.state.placesLoaded
            ? styles.placesContainer
            : styles.buttonContainer
        }
      >
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  placesContainer: {
    width: "100%",
    flex: 1
  },
  searchButton: {
    borderColor: "#E91E63",
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: "#E91E63",
    fontWeight: "bold",
    fontSize: 26
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places // reaching out places in store
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);
