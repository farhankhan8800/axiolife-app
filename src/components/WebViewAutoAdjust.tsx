import React from 'react';
import { Platform } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';


interface WebViewAutoAdjustProps {
    description: string; 
}

export const WebViewAutoAdjust: React.FC<WebViewAutoAdjustProps> = ({ description }) => {
    console.log('description', description);
    return (
        <AutoHeightWebView
             
            style={{
                width: "100%",
                backgroundColor: 'red',
                borderWidth: 0,
                height:'auto',
                marginTop:responsiveHeight(2)
               
            }}
          
            // onSizeUpdated={size =>
            //     console.log('size.height=>, size.height)
            // }
            source={{ html: description }}
            viewportContent={'width=device-width, user-scalable=no'}
            files={[
                {
                    href: 'cssfileaddress',
                    type: 'text/css',
                    rel: 'stylesheet',
                },
            ]}
            scalesPageToFit={Platform.OS === 'android' ? true : false}
            customStyle={webstyle}
           
        />
    );
};

const webstyle = `
  * {
      padding: 0;
      box-sizing: border-box;
      margin: 0;
    }
    body {
      width:100%;
      font-family: 'Poppins', sans-serif;
      overflow:hidden;
    }
  
    strong {
      font-size: 15px;
      font-weight: 700;
      line-height: 22px;
    }

    p {
      font-size: 14px;
      font-weight: 400;
      color: #212121;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 18px;
      font-weight: 600;
      line-height: 26px;
      margin-bottom: 10px;
    }

    ol li, ul li {
      list-style-position: inside;
      font-size: 15px;
      line-height: 26px;
      background: url(https://images.freekaamaal.com/common-images/articles-Bullet.png) 1px 10px/7px no-repeat;
      list-style-type: none;
      padding: 0 21px;
    }

    p img {
      width: 100%;
      height: 200px;
      max-width: 400px;
    }
    a img {
      width: 100%;
      height: auto;
      max-width: 220px;
    }

     a {
      font-size: 14px;
      font-weight: 500;
      color:#f27935;
      margin: 5px 0;
      text-decoration: underline;
      display: inline-block;
      text-transform: capitalize;
    }
  `;
