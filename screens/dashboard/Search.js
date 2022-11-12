import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, SIZES } from '../../constants';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Search = () => {
  const [searchInput, setSearchInput] = useState();

  return (
    <SafeAreaView style={{ flex: 1, padding: SIZES.padding }}>
      <View
        style={{
          marginBottom: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ ...FONTS.h3 }}>Explore other quiz</Text>
        <TouchableOpacity
          style={{
            paddingVertical: SIZES.base,
            paddingHorizontal: SIZES.radius,
            backgroundColor: COLORS.additionalColor3,
            borderRadius: SIZES.base,
          }}
        >
          <Text style={{ ...FONTS.h5, color: COLORS.white }}>Masukan kode</Text>
        </TouchableOpacity>
      </View>

      {/* Search input */}
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: COLORS.additionalColor,
          borderRadius: SIZES.radius,
          flexDirection: 'row',
        }}
      >
        <TextInput
          style={{
            paddingLeft: SIZES.padding,
            flex: 1,
          }}
          placeholder="Search..."
          onChangeText={(text) => setSearchInput(text)}
        />
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name="search" size={20} color={COLORS.bg} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
