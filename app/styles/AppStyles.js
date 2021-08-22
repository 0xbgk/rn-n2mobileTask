import { Dimensions } from 'react-native';

const AppStyles = {

    // DIMENSIONS
    WINDOW_WIDTH: Dimensions.get('window').width,
    WINDOW_HEIGHT: Dimensions.get('window').height,

    // COLOR PALETTE
    BACKGROUND_COLOR: '#22272c',
    HEADER_COLOR: '#546E7A',
    FONT_COLOR_FULL: "#CFD8DC",
    FONT_COLOR_SOFT: "#E8F5E9",

    RED_COLOR_FULL: "#AD100B",
    RED_COLOR_HALF: "#D9130B",
    RED_COLOR_SOFT: "#FF2214",

    GREEN_COLOR_FULL: "#055902",
    GREEN_COLOR_HALF: "#078C03",
    GREEN_COLOR_SOFT: "#09A603",

    ORANGE_COLOR_FULL: "#E65100",

    BUTTON_BLUE_COLOR: "#1976D2",
    BUTTON_ORANGE_COLOR: "#FF6F00",
    BUTTON_GREEN_COLOR: "#00695C",
    BUTTON_RED_COLOR: "#D50000",
    
    // FORMS
    BORDER_RADIUS: 15,
    ICON_SIZE: 28
}



export default AppStyles;