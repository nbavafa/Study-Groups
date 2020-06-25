import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, normalize, color, fontSize, fontFamily } = theme;

const BLUE = "rgb(183, 203, 233)"


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF'
    },

    topContainer:{
        flex: 1,
    },

    textInput: {
        paddingTop:normalize(8 * 3),
        paddingBottom:normalize(8 * 3),
        paddingHorizontal:normalize(8 * 2),
        flex: 1,
        fontSize: normalize(17 + 3),
        lineHeight: normalize(21 + 3),
        fontWeight: "300",
        color: '#A2A2A2',
        letterSpacing: .5,
        fontFamily: fontFamily.medium,
        borderBottomWidth: 1,
        borderColor: '#A2A2A2'
    },

    button:{
        backgroundColor: "#FF553F",
        height: normalize(55),

    },

    buttonText:{
        color:color.white,
        fontWeight:"300",
        fontSize: fontSize.regular + 2,
    },


    bottomContainer:{
        height: normalize(49)
    },

    date_button:{
        backgroundColor: BLUE,
        borderRadius: 15,
        padding: 10,
        width: 200,
        alignItems: "center",
        alignSelf: "center",
        margin: 15
    },

    color:{
        height: normalize(25),
        width: normalize(25),
        borderRadius: normalize(25/2),
        marginHorizontal: padding
    },

    date:{
      paddingTop:normalize(8 * 3),
      paddingBottom:normalize(8 * 3),
      paddingHorizontal:normalize(8 * 2),
      fontSize: 22,
      fontWeight: "300",
      color: '#A2A2A2',
      fontFamily: fontFamily.medium,
    }
});

export default styles;
