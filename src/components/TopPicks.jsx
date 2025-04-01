import * as React from 'react';
import {Dimensions, Image, View, StyleSheet, Text} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const {width} = Dimensions.get('window');

const renderItem = ({item}) => {
  return (
    <View
      style={{
        backgroundColor: '#F5F5F5', // Light background to show image clearly
        height: 320,
        width: width * 0.75,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Ensure image is clipped to border radius
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}>
      {item.featured_image && (
        <Image
          source={{uri: item.featured_image}}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />
      )}
      {!item.featured_image && (
        <Text style={{color: '#888', fontSize: 16, textAlign: 'center'}}>
          We are updating new images
        </Text>
      )}
    </View>
  );
};

function TopPicks({navigation, products = []}) {
  // Use products if provided, otherwise fallback to an empty array
  const carouselData = products.length > 0 ? products : [];

  return (
    <>
      <View
        id="carousel_stack_designe"
        className="mt-8"
        dataSet={{kind: 'basic-layouts', name: 'stack'}}>
        <View style={styles.headingContainer}>
          <Text style={styles.mainHeading}>People's Choice.</Text>
          <Text style={styles.subHeading}>The hottest collection on AXIO</Text>
        </View>
        {carouselData.length > 0 ? (
          <Carousel
            onConfigurePanGesture={gestureChain =>
              gestureChain.activeOffsetX([-10, 10])
            }
            autoPlayInterval={2000}
            data={carouselData}
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
              stackInterval: 16,
            }}
            customConfig={() => ({type: 'positive', viewCount: 5})}
            renderItem={renderItem}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 340,
            }}>
            <Text style={{color: '#888', fontSize: 16}}>
              No products available
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: 1,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default TopPicks;
