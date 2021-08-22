import React from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScreenName } from '../../constants/Enums';
import AppStyles  from '../../styles/AppStyles';

const {
    WINDOW_HEIGHT,
    HEADER_COLOR,
    GREEN_COLOR_FULL,
    ORANGE_COLOR_FULL,
    BACKGROUND_COLOR,
    FONT_COLOR_SOFT
} = AppStyles;

export function CustomTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    const { touchableOpacityStyle } = styles

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    Keyboard.dismiss();

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                switch (label) {
                    case ScreenName.PINS:
                        {
                            return (
                                <TouchableOpacity
                                    key={route.key}
                                    onPress={(onPress)}
                                    style={touchableOpacityStyle}>
                                    {
                                        isFocused ?
                                            <Icon name="chevron-right" size={15} style={{ paddingRight: 10 }} color={ORANGE_COLOR_FULL} />
                                            :
                                            <View></View>
                                    }
                                    <Icon name="map-marked-alt" size={28} color={isFocused ? GREEN_COLOR_FULL : FONT_COLOR_SOFT} />
                                    {
                                        isFocused ?
                                            <Icon name="chevron-left" size={15} style={{ paddingLeft: 10 }} color={ORANGE_COLOR_FULL} />
                                            :
                                            <View></View>
                                    }
                                </TouchableOpacity>
                            )
                        }
                        break;
                    case ScreenName.MAP:
                        {
                            return (
                                <TouchableOpacity
                                    key={route.key}
                                    onPress={(onPress)}
                                    style={touchableOpacityStyle}>
                                    {
                                        isFocused ?
                                            <Icon name="chevron-right" size={15} style={{ paddingRight: 10 }} color={ORANGE_COLOR_FULL} />
                                            :
                                            <View></View>
                                    }
                                    <Icon name="map" size={28} color={isFocused ? GREEN_COLOR_FULL : FONT_COLOR_SOFT} />
                                    {
                                        isFocused ?
                                            <Icon name="chevron-left" size={15} style={{ paddingLeft: 10 }} color={ORANGE_COLOR_FULL} />
                                            :
                                            <View></View>
                                    }
                                </TouchableOpacity>
                            )
                        }
                        break;
                    case ScreenName.PROFILE:
                        {
                            return (
                                <TouchableOpacity
                                    key={route.key}
                                    onPress={onPress}
                                    style={touchableOpacityStyle}>
                                    {                                        
                                        isFocused ?
                                            <Icon name="chevron-right" size={15} style={{ paddingRight: 10 }} color={ORANGE_COLOR_FULL} />
                                            :
                                            <View></View>
                                    }
                                    <Icon name="cog" size={28} color={isFocused ? GREEN_COLOR_FULL : FONT_COLOR_SOFT} />
                                    {
                                        isFocused ?
                                            <Icon name="chevron-left" size={15} style={{ paddingLeft: 10 }} color={ORANGE_COLOR_FULL} />
                                            :
                                            <View></View>
                                    }
                                </TouchableOpacity>
                            )
                        }
                        break;
                    default:
                        {
                            return (
                                <Text>Default</Text>
                            )
                        }
                        break;
                }
            })}
        </View >
    );
}


const styles = StyleSheet.create({
    touchableOpacityStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR,
        height: WINDOW_HEIGHT / 14,
        borderColor: BACKGROUND_COLOR,
        borderWidth: 2,
        borderTopColor: HEADER_COLOR,
        borderRightColor: HEADER_COLOR
    },
    touchableOpacityWorkout: {

    }
})