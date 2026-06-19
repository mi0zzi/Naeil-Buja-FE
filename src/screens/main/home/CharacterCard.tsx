import { StyleSheet, Text, View } from "react-native";

type CharacterCardProps = {
  name: string;
  point: number;
};

export default function CharacterCard({ name, point }: CharacterCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.point}>보유 포인트 {point.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 96,
    height: 51,
    paddingLeft: 12,
    paddingTop: 9,
    borderWidth: 1,
    borderColor: "#E1E5D3",
    borderRadius: 8,
    backgroundColor: "#F9F5ED",
  },
  name: {
    fontFamily: "PretendardMedium",
    fontSize: 11,
    lineHeight: 13,
    color: "#35352C",
  },
  point: {
    marginTop: 7,
    fontFamily: "PretendardMedium",
    fontSize: 8,
    lineHeight: 10,
    color: "#777777",
  },
});
