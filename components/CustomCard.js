import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { COLORS, FONTS, SIZES } from '../constants';

const CustomCard = ({
  children,
  bgColor,
  containerStyle,
  arrowColor,
  arrow = true,
  title,
  subtitle,
  onPress,
  afterComponent,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: bgColor,
        height: 80,
        marginTop: SIZES.base,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        ...containerStyle,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          {children}
          <View>
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>{title}</Text>
            <Text style={{ ...FONTS.body5, color: COLORS.white }}>
              {subtitle}
            </Text>
          </View>
        </View>
      </View>
      {arrow && (
        <SimpleLineIcons name="arrow-right" size={24} color={arrowColor} />
      )}
      {afterComponent}
    </TouchableOpacity>
  );
};

export default CustomCard;
