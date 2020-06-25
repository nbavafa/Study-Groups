
import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';
const ORANGE = "rgb(247, 232, 153)"
const BLUE = "rgb(183, 203, 233)"

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.white
    },
    quote: {
      paddingTop: 15,
      color: color.black,
      fontFamily: fontFamily.thin,
      fontSize: 20,
      marginBottom: 10,
      paddingBottom: 20
    },
    topContainer:{
        flex:1,
        paddingHorizontal:15,
        paddingBottom: padding * 2,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: BLUE,
    },

    image:{
        height: 250,
        width: 250,
//        backgroundColor: color.grey,
        marginBottom: padding,
        borderRadius: 125,

        resizeMode
    },

    title:{
        fontSize: fontSize.large + 15,
        lineHeight: fontSize.large + 4,
        fontFamily: fontFamily.bold,
        color: color.white,
        paddingTop: 14,
        letterSpacing: 1
    },

    subText:{
        color: "#414141",
        fontSize: fontSize.large,
        lineHeight: fontSize.large + 10,
        marginVertical:padding * 2
    },

    //===============================

    bottomContainer:{
        backgroundColor:"white",
        paddingVertical: padding * 3,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    },

    socialbuttonContainer:{
        justifyContent:"center",
        alignItems:"center",
    },

    containerView:{
        width: windowWidth - 40
    },

    socialButton:{
        height: normalize(55),
        marginTop:30,
        marginBottom:0,
        backgroundColor: ORANGE,
    },

    button:{
        backgroundColor: BLUE,
        height: normalize(55)
    },

    buttonText:{
        fontSize: fontSize.regular + 8,
        fontFamily: fontFamily.medium,
        color: color.white
    },

    bottom:{
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        marginTop: padding * 2
    },

    bottomText:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
        marginRight: 5,
        color: "#414141"
    },

    signInText:{
        fontSize: fontSize.regular,
        color: BLUE,
        fontFamily: fontFamily.medium
    },

    orContainer:{
        justifyContent:"center",
        alignItems:"center",
        height: 40,
        width: windowWidth
    },

    divider:{
        backgroundColor: '#D0D5DA',
        position:"absolute",
        top:19,
        left: 20,
        right: 20
    },

    orText:{
        backgroundColor: color.white,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
        color: "#414141",
        paddingHorizontal: padding
    }
});

export default styles;
