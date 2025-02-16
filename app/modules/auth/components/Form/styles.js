import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const ORANGE = "rgb(247, 232, 153)"
const BLUE = "rgb(183, 203, 233)"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },

    wrapper:{
        justifyContent:"center",
        alignItems:"center"
    },

    errorText:{
        color: color.red,
        width: (windowWidth - 45),
        marginTop: 20,
    },

    containerView:{
        marginVertical: padding * 3,
        width: windowWidth - 40
    },

    socialButton:{
        height: normalize(55),
        borderRadius:15,
        marginTop:0,
        marginBottom:0
    },

    button:{
        backgroundColor: BLUE,
        borderRadius: 15,
        height: normalize(55)
    },

    buttonText:{
        fontSize: fontSize.regular + 8,
        fontFamily: fontFamily.medium
    },

    forgotText:{
        textAlign:"center",
        color:color.black,
        marginBottom: padding,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
    }
});


export default styles;
