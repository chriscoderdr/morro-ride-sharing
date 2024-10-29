import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Linking, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";

interface ICheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  linkUrl?: string;
}

interface ICheckboxStyles {
  container: ViewStyle;
  checkbox: ViewStyle;
  label: TextStyle;
}

const Checkbox: React.FC<ICheckboxProps> = ({ checked = false, onChange, label, linkUrl }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handlePress = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  const handleLabelPress = () => {
    if (linkUrl) {
      Linking.openURL(linkUrl).catch((err) => console.error("Failed to open URL:", err));
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.checkbox}>
        {isChecked && <MaterialIcons name="check" size={16} color="#FFFFFF" />}
      </View>
      {label && (
        <Text style={styles.label} onPress={handleLabelPress}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create<ICheckboxStyles>({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#000000",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginLeft: 12,
    textDecorationLine: "underline",
  },
});

export default Checkbox;
