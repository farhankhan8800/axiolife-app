import * as React from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const {width} = Dimensions.get('window');

const defaultDataWith6Colors = [
  '#B0604D',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
  '#F1F1F1',
];

// Define renderItem function properly
const renderItem = ({item}) => {
  return (
    <View
      style={{
        backgroundColor: item,
        height: 320,
        width: width * 0.75,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
        {item}
      </Text>
    </View>
  );
};

function StackDesigne({navigation, products = []}) {
  const ref = React.useRef(null);

  return (
    <View
      id="carousel_stack_designe "
      className="mt-16"
      dataSet={{kind: 'basic-layouts', name: 'stack'}}>
      <Carousel
        ref={ref}
        autoPlayInterval={2000}
        data={defaultDataWith6Colors}
        height={340}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={width * 0.75}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 340,
        }}
        mode={'horizontal-stack'}
        modeConfig={{
          snapDirection: 'left',
          stackInterval: 18,
        }}
        customConfig={() => ({type: 'positive', viewCount: 5})}
        renderItem={renderItem} // ✅ Passing function reference, not calling it
      />
    </View>
  );
}

export default StackDesigne;
