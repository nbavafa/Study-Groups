
import { StyleSheet } from 'react-native';

import { color, fontFamily, padding, fontSize } from "../../styles/theme"

const resizeMode = 'contain';

const ORANGE = "rgb(247, 232, 153)"
const BLUE = "rgb(183, 203, 233)"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ORANGE
    },

    wrapper:{
        paddingHorizontal:15,
        paddingBottom: padding * 2,
        justifyContent:"center",
        alignItems:"center"
    },

    image:{
        height: 250,
        width: 250,
        backgroundColor: 'transparent',
        marginBottom: padding,
        resizeMode
    },

    title: {
        paddingTop: 15,
        fontSize:fontSize.large + 12,
        lineHeight:fontSize.large + 7,
        fontFamily: fontFamily.bold,
        color: color.white,
        letterSpacing: 1
    },

    activityIndicatorContainer: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 16,
        height: 50
    },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});


export default styles;
