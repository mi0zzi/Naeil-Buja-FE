import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

type CategoryButtonProps = {
  label: string;
  icon: ImageSourcePropType;
  selected: boolean;
  onPress: () => void;
};

export default function CategoryButton({
  label,
  icon,
  selected,
  onPress,
}: CategoryButtonProps) {
  return (
    <TouchableOpacity
      key={label}
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.categoryItem, selected && styles.selectedCategoryItem]}
    >
      <Image source={icon} style={styles.categoryIcon} resizeMode="contain" />

      <Text
        style={[styles.categoryLabel, selected && styles.selectedCategoryLabel]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    width: 73,
    height: 73,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "#EFE9E1",
    borderRadius: 8,
    backgroundColor: "#FEFBF6",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCategoryItem: {
    borderColor: "#6F8F57",
    backgroundColor: "#F2F7EB",
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  categoryLabel: {
    marginTop: 6,
    fontFamily: "PretendardMedium",
    fontSize: 11,
    color: "#35352C",
  },
  selectedCategoryLabel: {
    fontFamily: "PretendardBold",
    color: "#557A45",
  },
});
