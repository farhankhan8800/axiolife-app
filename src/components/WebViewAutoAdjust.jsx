import React, {useState} from 'react';
import {Platform} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const WebViewAutoAdjust = ({description}) => {
  // console.log('description', description);
  const [height_, setHeight_] = useState(100);

  let dummay_data = `<div class="container">
        <h1>Welcome to Our Website</h1>
        <p>This is a <big>big paragraph</big> explaining various aspects of our website. Here is a <span style="color: red;">highlighted word</span> inside the paragraph.</p>
        <p><small>Small note: This is just a sample webpage.</small></p>

        <div class="section">
            <h2>Our Services</h2>
            <ul>
                <li>Web Development</li>
                <li>App Development</li>
                <li>Digital Marketing</li>
                <li>SEO Optimization</li>
                <li>Cloud Computing</li>
            </ul>
            <a href="https://example.com/services" target="_blank">Learn More</a>
        </div>

        <div class="section">
            <h2>Top Products</h2>
            <ol>
                <li>Product 1 - <span style="color: green;">Best Seller</span></li>
                <li>Product 2 - High Quality</li>
                <li>Product 3 - Affordable Price</li>
                <li>Product 4 - New Arrival</li>
                <li>Product 5 - Limited Stock</li>
            </ol>
            <button class="button">Shop Now</button>
        </div>

        <div class="section image-container">
            <h2>Gallery</h2>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg" alt="Sample Image 1">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg" alt="Sample Image 2">
            
        </div>

        <div class="section">
            <h2>Contact Us</h2>
            <p>If you have any questions, feel free to reach out.</p>
            <ul>
                <li>Email: contact@example.com</li>
                <li>Phone: +123 456 7890</li>
                <li>Address: 123 Main Street, City, Country</li>
            </ul>
            <a href="mailto:contact@example.com" class="link">Send Email</a>
        </div>

    </div>
`;

  const description_ = `
  <html>
    <head>
      <style>${webstyle}</style>
    </head>
    <body>${dummay_data}</body>
  </html>
`;

  return (
    <AutoHeightWebView
      style={{
        width: '100%',
        height: height_,
        marginTop: responsiveHeight(2),
      }}
      onSizeUpdated={size => {
        // console.log('size.height:', size.height);
        setHeight_(size.height + 20);
      }}
      source={{html: description_}}
      viewportContent="width=device-width, user-scalable=no"
      files={[
        {
          href: 'cssfileaddress',
          type: 'text/css',
          rel: 'stylesheet',
        },
      ]}
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
      color: #212121;
    }
  
    strong {
      font-size: 15px;
      font-weight: 700;
      line-height: 22px;
    }

    p {
      font-size: 15px;
      font-weight: 400;
      color: #212121;
      line-height: 24px;
      margin-bottom: 10px;
    }

    h3, h2, h1 {
      font-size: 18px;
      font-weight: 600;
      line-height: 26px;
        margin-top: 10px;
      margin-bottom: 10px;
    }

    ol , ul {
    padding: 0 0 20px 0;
    }

    ol li, ul li {
      list-style-position: inside;
      font-size: 15px;
      line-height: 26px;
      
      list-style-type:disc;
      padding: 0 21px;
      
    }

    img {
      width: 100%;
      height: 200px;
      max-width: 400px;
      border-radius:4px;
      margin-bottom:10px;
    }
    
     a {
      font-size: 14px;
      font-weight: 500;
      color: #059C6A;
      margin: 5px 0;
      text-decoration: underline;
      display: inline-block;
      text-transform: capitalize;
    }
       .button {
      background-color: #059C6A;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `;
