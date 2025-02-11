import React from 'react';
import {View, Text} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
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

  ExitAppToast: ({text1}: any) => (
    <View
      style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', width: 200}}
      className="py-2 rounded-full items-center mb-20">
      {text1 && (
        <Text className="text-sm text-light font-mulish_medium text-center">
          {text1}
        </Text>
      )}
    </View>
  ),
};

export default CustomToast;
