import React, {useState} from 'react';
import {Platform} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const WebViewAutoAdjust = ({description}) => {
  const [height_, setHeight_] = useState(100);

  // Sample data for testing (will be replaced with actual description in production)
  let dummay_data = `<div class="container">
        <h1>Welcome to Our Website</h1>
        <p>This is a <big>big paragraph</big> explaining various aspects of our website. Here is a <span class="highlight">highlighted word</span> inside the paragraph.</p>
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
            <a href="https://example.com/services" class="link">Learn More</a>
        </div>

        <div class="section">
            <h2>Top Products</h2>
            <ol>
                <li>Product 1 - <span class="badge">Best Seller</span></li>
                <li>Product 2 - High Quality</li>
                <li>Product 3 - Affordable Price</li>
                <li>Product 4 - New Arrival</li>
                <li>Product 5 - Limited Stock</li>
            </ol>
            <button class="button">Shop Now</button>
        </div>

        <div class="section image-container">
            <h2>Gallery</h2>
            <div class="image-grid">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg" alt="Sample Image 1">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg" alt="Sample Image 2">
            </div>
        </div>

        <div class="section">
            <h2>Contact Us</h2>
            <p>If you have any questions, feel free to reach out.</p>
            <ul class="contact-list">
                <li>Email: contact@example.com</li>
                <li>Phone: +123 456 7890</li>
                <li>Address: 123 Main Street, City, Country</li>
            </ul>
            <a href="mailto:contact@example.com" class="button secondary">Send Email</a>
        </div>
    </div>
`;

  // Use actual description if provided, otherwise use sample data
  const contentToDisplay = description || dummay_data;

  const description_ = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <style>${webstyle}</style>
    </head>
    <body>${contentToDisplay}</body>
  </html>
`;

  return (
    <AutoHeightWebView
      style={{
        width: '100%',
        height: height_,
        marginTop: responsiveHeight(1.5),
      }}
      onSizeUpdated={size => {
        setHeight_(size.height + 25);
      }}
      source={{html: description_}}
      viewportContent="width=device-width, user-scalable=no"
      scalesPageToFit={Platform.OS === 'ios' ? false : true}
      scrollEnabled={false}
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
      width: 100%;
      font-family: 'Poppins', sans-serif;
      overflow: hidden;
      color: #1e293b;
      line-height: 1.6;
      padding: 10px 15px;
      background-color: #f8fafc;
    }
    
    .container {
      max-width: 100%;
      margin: 0 auto;
      padding-bottom: 15px;
    }
  
    strong {
      font-size: 15px;
      font-weight: 700;
      line-height: 22px;
    }

    p {
      font-size: 15px;
      font-weight: 400;
      color: #334155;
      line-height: 24px;
      margin-bottom: 15px;
    }

    h1 {
      font-size: 20px;
      font-weight: 700;
      line-height: 28px;
      margin-top: 10px;
      margin-bottom: 15px;
      color: #1e293b;
    }
    
    h2 {
      font-size: 18px;
      font-weight: 600;
      line-height: 26px;
      margin-top: 15px;
      margin-bottom: 12px;
      color: #1e293b;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 5px;
    }
    
    h3 {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      margin-top: 12px;
      margin-bottom: 10px;
      color: #1e293b;
    }

    .section {
      margin-bottom: 20px;
      padding: 10px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    ol, ul {
      padding: 5px 0 15px 0;
    }

    ol li, ul li {
      list-style-position: inside;
      font-size: 15px;
      line-height: 26px;
      list-style-type: disc;
      padding: 0 15px 5px;
      color: #334155;
    }
    
    ol li {
      list-style-type: decimal;
    }
    
    .contact-list li {
      padding-left: 5px;
      margin-bottom: 5px;
    }

    .highlight {
      color: #1e293b;
      background-color: #e2e8f0;
      padding: 0 4px;
      border-radius: 4px;
      font-weight: 500;
    }
    
    .badge {
      display: inline-block;
      padding: 2px 8px;
      background-color: #c7f7d9;
      color: #047857;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    img {
      width: 100%;
      height: auto;
      max-height: 200px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 10px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .image-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .image-grid img {
      flex: 1;
      min-width: 45%;
      max-width: 48%;
    }
    
    a.link {
      font-size: 14px;
      font-weight: 500;
      color: #1d4ed8;
      margin: 5px 0;
      text-decoration: underline;
      display: inline-block;
    }
    
    .button {
      display: inline-block;
      background-color: #1e293b;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      text-decoration: none;
      margin-top: 5px;
      transition: background-color 0.2s;
    }
    
    .button.secondary {
      background-color: #e2e8f0;
      color: #1e293b;
      border: 1px solid #cbd5e1;
    }
    
    small {
      font-size: 13px;
      color: #64748b;
    }
  `;
