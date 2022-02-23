import React from "react";
import { View, StatusBar, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/index";

export default function OnBoarding() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      {/* TOP SECTION - Back and Skip button  */}

      {/* FLATLIST WITH PAGES */}

      {/* BOTTOM SECTION - pagination and next or get started*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
  },
});
