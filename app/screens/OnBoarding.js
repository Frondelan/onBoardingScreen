import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native";
import { COLORS, SIZES } from "../constants/index";
import AntDesingIcons from "react-native-vector-icons/AntDesign";
import { data } from "../data/onBoarding";

export default function OnBoarding() {
  const flatlistRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [viewableItems, setViewableItems] = useState([]);

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    setViewableItems(viewableItems);
  });

  useEffect(() => {
    if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
    setCurrentPage(viewableItems[0].index);
  }, [viewableItems]);

  const renderTopSection = () => {
    return (
      <SafeAreaView>
        <View style={styles.containerTop}>
          <TouchableOpacity style={styles.backBtn}>
            <AntDesingIcons name="left" style={styles.antBtn} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderBottomSection = () => {
    return (
      <SafeAreaView>
        <View style={styles.containerBottom}>
          <View style={styles.pagination}>
            {/* Dots */}
            {[...Array(data.length)].map((_, index) => (
              <View
                key={index}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor:
                    index == currentPage
                      ? COLORS.primary
                      : COLORS.primary + "20",
                  marginRight: 8,
                }}
              ></View>
            ))}
          </View>
          <TouchableOpacity style={styles.getStartedBtn}>
            <AntDesingIcons name="right" style={styles.btnIconSt} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderFlatlistItem = ({ item }) => {
    return (
      <View style={styles.flatContainer}>
        <View style={styles.flatImageContainer}>
          <ImageBackground
            source={item.img}
            resizeMode="contain"
            style={styles.flatImage}
          />
        </View>
        <View style={styles.imageTextContainer}>
          <Text style={styles.imageText}>{item.title}</Text>
          <Text style={styles.imageDescription}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      {/* TOP SECTION - Back and Skip button  */}
      {renderTopSection()}
      {/* FLATLIST WITH PAGES */}
      <FlatList
        data={data}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={renderFlatlistItem}
        ref={flatlistRef}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        initialNumToRender={1}
        extraData={SIZES.width}
      />
      {/* BOTTOM SECTION - pagination and next or get started*/}
      {renderBottomSection()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
  },
  containerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.base * 2,
  },
  backBtn: {
    padding: SIZES.base,
  },
  antBtn: {
    fontSize: 25,
    color: COLORS.black,
    opacity: 1,
  },
  skipText: {
    fontSize: 19,
    color: COLORS.black,
    opacity: 1,
  },
  containerBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.base * 2,
    paddingVertical: SIZES.base * 2,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  getStartedBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },
  btnIconSt: {
    fontSize: 19,
    color: COLORS.white,
  },
  flatContainer: {
    flex: 1,
    width: SIZES.width,
    alignItems: "center",
    justifyContent: "center",
  },
  flatImageContainer: {
    alignItems: "center",
    marginVertical: SIZES.base * 2,
  },
  flatImage: {
    width: 335,
    height: 335,
  },
  imageTextContainer: {
    paddingHorizontal: SIZES.base * 4,
    marginVertical: SIZES.base * 4,
  },
  imageText: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  imageDescription: {
    fontSize: 17,
    opacity: 0.4,
    textAlign: "center",
    marginTop: 15,
    lineHeight: 28,
  },
});
