import React from 'react';
import {View, Text} from 'react-native';

import {TYPO} from '../assets/typo';

const CustomToast = {
  //   customToast: ({text1, text2}: any) => (
  //     <View
  //       style={{
  //         width: '90%',
  //         backgroundColor: 'rgba(0, 0, 0, 0.7)',
  //         paddingHorizontal: 10,
  //         paddingVertical: 14,
  //         borderRadius: 10,
  //         alignSelf: 'center',
  //         marginBottom: 40,
  //         paddingLeft:10
  //       }}>
  //       {text1 && (
  //         <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
  //           {text1}
  //         </Text>
  //       )}
  //       {text2 && (
  //         <Text style={{color: '#fff', fontSize: 14, textAlign:'center' }}>{text2}</Text>
  //       )}
  //     </View>
  //   ),

  BasicToast: ({text1}) => (
    <View
      style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', maxWidth: 250}}
      className="py-2 px-5 rounded-full items-center mb-20">
      {text1 && (
        <Text className="text-sm text-light font-mulish_medium text-center">
          {text1}
        </Text>
      )}
    </View>
  ),
  GreenToast: ({text1}) => (
    <View
      style={{backgroundColor: 'rgba(0, 128, 0, 0.5)', maxWidth: 300}}
      className="py-2 px-5 rounded-full items-center mb-20">
      {text1 && (
        <Text className="text-sm  text-dark_blue font-mulish_medium text-center">
          {text1}
        </Text>
      )}
    </View>
  ),
};

export default CustomToast;
