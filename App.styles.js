import { StyleSheet } from "react-native";
import { colors } from "./src/styles/colors";

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,

    },
     scrollView: {
        flexGrow: 1,
     }, 
     content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 50,
     }
 })