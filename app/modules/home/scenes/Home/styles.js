import {StyleSheet} from 'react-native';
import {theme} from "../../index"
const { padding, normalize, color, fontSize, fontFamily } = theme;

const ORANGE = "rgb(247, 232, 153)"
const BLUE = "rgb(183, 203, 233)"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    likedText: {
        margin: 10,
        padding: 6,
        borderRadius: 20,
        //backgroundColor: BLUE,
        width: 180,
        alignItems: 'center',
        alignSelf: 'flex-end'
    },

    searchBar: {
        padding: 8,
        margin: 10,
        fontSize: normalize(17 + 3),
        lineHeight: normalize(21 + 3),
        fontWeight: "300",
        color: '#525252',
        letterSpacing: .5,
        fontFamily: fontFamily.light,
        backgroundColor: '#ddd',
        borderRadius: 10
    },


    activityIndicator:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center"
    },
});

export default styles;
