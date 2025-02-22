import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, Font } from '@react-pdf/renderer';
import NotoSansTamilRegular from './NotoSansTamil-Regular.ttf';
import NotoSansTamilBold from './NotoSansTamil-Bold.ttf';

import './confirmList.css';
import '../Home/home.css';

Font.register({
  family: 'Noto Sans Tamil',
  fonts: [
    { src: NotoSansTamilRegular, fontWeight: 'normal' },
    { src: NotoSansTamilBold, fontWeight: 'bold' },
  ]
});

const ConfirmListPage = ({ setSelectedItems, selectedItems, totalRate, setTotalRate, crackers, setCrackers, customerName, setCustomerName, customerNumber, setCustomerNumber, customerAddress, setCustomerAddress, setDownloaded, downloaded}) => {
  const [selectedItemsPdf, setSelectedItemsPdf] = useState([]);
  // const [GiftBoxPdf, setGiftBoxPdf] = useState([]);

  const [isDownloaded, setIsDownloaded] = useState(false);
  let serialNumber = 0;
  let serialNumberPdf = 0;
  // let serialNumberGiftBox = 0;
  // let serialNumberGiftBoxPdf = 0;

  const scrollRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const result = window.confirm("Are you sure, want to start from the first page?");
      if (result) {
        navigate('/')
      }
      // Otherwise, do nothing (cancel navigation)
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  const handleEdit = () => {
    navigate('/')
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const handleConfirmOrder = () => {
    alert('Order submitted successfully!');
    const selectedCrackers = crackers.flatMap(category =>
      category.items.filter(item => item.checked).map(item => ({ ...item, category: category.category }))
    );
    // const selectedCrackersGiftBox = giftBoxCrackers.flatMap(category =>
    //   category.items.filter(item => item.checked).map(item => ({ ...item, category: category.category }))
    // );

    setSelectedItemsPdf(selectedCrackers);
    // setGiftBoxPdf(selectedCrackersGiftBox)
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Group selected items by category
  const groupedItems = {};
  selectedItems.forEach(currentItem => {
    if (!groupedItems[currentItem.category]) {
      groupedItems[currentItem.category] = [];
    }
    groupedItems[currentItem.category].push(currentItem);
  });

  // const groupedSplPacksItems = {};
  // anotherTable.forEach(currentItem => {
  //   if (!groupedSplPacksItems[currentItem.category]) {
  //     groupedSplPacksItems[currentItem.category] = [];
  //   }
  //   groupedSplPacksItems[currentItem.category].push(currentItem);
  // });

  // Function to clear the form
  const handleClearForm = () => {
    setCustomerName('');
    setCustomerNumber('');
    setCustomerAddress('');
    // setDiscountTotalRate(0);
    setCrackers([]);
    setSelectedItems([]);
    setTotalRate(0);
    // setAnotherTotalRate(0);
    // setGiftBoxCrackers([]);
    // setAnotherTable([]);
  };

  const handleDownloadComplete = () => {
    setIsDownloaded(true);
    handleClearForm();
    setDownloaded(!downloaded)
    setTimeout(() => {
      alert('Download completed successfully');
      navigate('/');
    }, 3000);
  }

  const generateNumber = () => {
    const time = Date.now();
    return time;
  }

  const getOrderDate = () => {
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div>
      <div className='full-container-header'>
        <h1 className='font-style-heading'>Jai Ganesh Agencies</h1>
        <button className='edit-button' onClick={handleEdit}>Edit</button>
      </div>
      <div className='full-input-container'>
        <div className='crackersGif-confirmList'></div>
        <div className='input-container-confirmList'>
          <div className='customer-container-title'>Customer Information</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className='input-fonts'>Customer Name:</span>
            <div
              className='customer-inputbox-name-confirmList'
            >{customerName}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className='input-fonts'>Customer Number:</span>
            <div
              className='customer-inputbox-confirmList'
            >{customerNumber}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>

            <span className='input-fonts'>Customer Address:</span>
            <div
              className='customer-inputbox-address-confirmList'
            >{customerAddress}</div>
          </div>
        </div>
      </div>

      <div className='list-container-confirmList'>
        {selectedItems.length > 0 && <table className='table' align='center' style={{ width: '85%' }}>
          <thead>
            <tr className='tablecell' style={{ fontSize: '14px' }}>
              <th className='tablecell'>S.No</th>
              <th className='tablecell'>Cracker Name</th>
              <th className='tablecell' style={{ fontSize: '13px' }}>Qty</th>
              <th className='tablecell'>Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedItems).map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                {groupedItems[category].map((item, itemIndex) => {
                  serialNumber++; // Increment serial number for each item

                  return (
                    <tr key={`${categoryIndex}-${itemIndex}`} className='tableRow' style={{ fontSize: '14px' }}>
                      <td className='tablecell' style={{ textAlign: 'center' }}>{serialNumber}</td> {/* Serial number column */}
                      <td className='tablecell' style={{ textAlign: 'left' }}>{item.name}<div style={{ marginTop: '15px' }}>{item.tamilName}</div></td>
                      <td className='tablecell' style={{ textAlign: 'center', width: '10%' }}>{item.quantity}</td>
                      <td className='tablecell' style={{ textAlign: 'center' }}>₹{item.quantity * parseFloat(item.rate)}</td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
            <tr>
              <td colSpan="3" style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>Total Amount</td>
              <td className='tablecell' style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>₹{totalRate}</td>
            </tr>
            <tr>
              {/* <td colSpan="3" style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>Total Amount with 50% Discount</td>
              <td className='tablecell' style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>₹{discountTotalRate}</td> */}
            </tr>
          </tbody>
        </table>}
      </div>

      {/* {anotherTable?.length > 0 && <table className='table' align='center' style={{ width: '85%', marginTop: 50 }}>
        <thead>
          <tr>
            <td colSpan="4" style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>Special Packs & Boxes</td>
          </tr>
          <tr className='tablecell' style={{ fontSize: '14px' }}>
            <th className='tablecell'>S.No</th>
            <th className='tablecell'>Items</th>
            <th className='tablecell'>Qty</th>
            <th className='tablecell'>Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedSplPacksItems).map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              <tr>
                <td className='tablecell' colSpan="4" style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: '#f1eeee', padding: 0 }}>{category}</td>
              </tr>
              {groupedSplPacksItems[category].map((item, itemIndex) => {
                serialNumberGiftBox++; // Increment serial number for each item

                return (
                  <tr key={`${categoryIndex}-${itemIndex}`} className='tableRow' style={{ fontSize: '14px' }}>
                    <td className='tablecell' style={{ textAlign: 'center' }}>{serialNumberGiftBox}</td>
                    <td className='tablecell' style={{ textAlign: 'left' }}>{item.items}</td>
                    <td className='tablecell' style={{ textAlign: 'center', width: '10%' }}>{item.quantity}</td>
                    <td className='tablecell' style={{ textAlign: 'center' }}>₹{item.quantity * parseFloat(item.rate)}</td>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
          <tr>
            <td colSpan="3" style={{ fontWeight: 'bold', backgroundColor: '#f1eeee',fontSize:14 }}>Total Amount Of Special Packs & Boxes</td>
            <td className='tablecell' style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>₹{anotherTotalRate}</td>
          </tr>
        </tbody>
      </table>} */}

      <div className='button-container-confirmList'>
        <button className="Confirm-order" onClick={handleConfirmOrder}>Confirm Order</button>
      </div>

      {/* PDF Generation */}
      {(selectedItemsPdf.length > 0) && (
        <PDFDownloadLink
          document={
            <Document>
              <Page style={{ borderWidth: 1, borderStyle: 'solid', padding: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' }}>List Of Order Placed</Text>
                <Text style={{ fontWeight: 'bold', marginBottom: 10, textAlign: 'center', fontSize: '14px', marginTop: 12 }}>Order Number: {generateNumber()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Order Date: {getOrderDate()}</Text>
                <View>
  {selectedItemsPdf.length > 0 && (
    <View style={{ flexDirection: 'row', marginTop: 3, backgroundColor: '#f1eeee' }}>
      <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 13 }}>S.No</Text>
      <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 13 }}>Cracker Name</Text>
      <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 13 }}>Tamil Cracker Name</Text>
      <Text style={{ flex: 0.3, textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 13 }}>Qty</Text>
      <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 13 }}>Rate (INR)</Text>
    </View>
  )}

  {selectedItemsPdf.length > 0 && Object.keys(groupedItems).map((category, categoryIndex) => (
    <View key={categoryIndex}>
      {groupedItems[category].map((item, itemIndex) => {
        serialNumberPdf++;

        return (
          <View key={`${categoryIndex}-${itemIndex}`} style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1, textAlign: 'center', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 11 }}>{serialNumberPdf}</Text> {/* Serial number column */}
            <Text style={{ flex: 1, textAlign: 'left', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 11 }}>{item.name}</Text>
            <Text style={{ flex: 1, textAlign: 'left', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 11, fontFamily: 'Noto Sans Tamil' }}>{item.tamilName}</Text>
            <Text style={{ flex: 0.3, textAlign: 'center', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 11 }}>{item.quantity}</Text>
            <Text style={{ flex: 1, textAlign: 'center', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 11 }}>{(item.quantity * item.rate).toFixed(2)}</Text>
          </View>
        );
      })}
    </View>
  ))}
  
  {/* Total amount and total amount with discount */}
  {selectedItems.length > 0 && <><Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 17 }}>Total Amount: {totalRate.toFixed(2)}</Text></>}
</View>
{/* <View>
  
                {GiftBoxPdf.length > 0 && (
                  <>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10, textAlign: 'center', marginTop: 20, fontSize: 13 }}>Special Packs & Boxes</Text>
                    <View style={{ flexDirection: 'row', marginTop: 3, backgroundColor: '#f1eeee' }}>
                      <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 13, borderWidth: 1, borderColor: 'black', padding: 3 }}>S.No</Text>
                      <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 13, borderWidth: 1, borderColor: 'black', padding: 3 }}>Items</Text>
                      <Text style={{ flex: 0.3, textAlign: 'center', fontWeight: 'bold', fontSize: 13, borderWidth: 1, borderColor: 'black', padding: 3 }}>Qty</Text>
                      <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 13, borderWidth: 1, borderColor: 'black', padding: 3 }}>Rate</Text>
                    </View>
                    {Object.keys(groupedSplPacksItems).map((category, categoryIndex) => (
                      <View key={categoryIndex}>
                        {groupedSplPacksItems[category].map((item, itemIndex) => {
                          serialNumberGiftBoxPdf++;

                          return (
                            <View key={`${categoryIndex}-${itemIndex}`} style={{ flexDirection: 'row' }}>
                              <Text style={{ flex: 1, textAlign: 'center', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 11 }}>{serialNumberGiftBoxPdf}</Text>
                              <Text style={{ flex: 1, textAlign: 'left', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 11 }}>{item.items}</Text>
                              <Text style={{ flex: 0.3, textAlign: 'center', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 11 }}>{item.quantity}</Text>
                              <Text style={{ flex: 1, textAlign: 'center', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 11 }}>{(item.quantity * item.rate).toFixed(2)}</Text>
                            </View>
                          );
                        })}
                      </View>
                    ))}

                  </>
                )}
             {anotherTable.length > 0 && <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 6 }}>Total Amount Of Special Packs & Boxes : {anotherTotalRate.toFixed(2)}</Text>}
                
</View> */}

                <Text style={{ fontWeight: '700', display: 'flex', alignItems: 'center', backgroundColor: '#f1eeee', fontSize: '15px', minHeight: '22px', marginTop: '40px' }}>Customer Information</Text>
                <Text style={{ fontSize: 14, marginTop: 10, fontWeight: 'bold', wordBreak: 'break-word', width: '75%' }}>Customer Name : {customerName}</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 6 }}>Customer Number : {customerNumber}</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', wordBreak: 'break-word', width: '75%', marginTop: 6 }}>Customer Address : {customerAddress}</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', wordBreak: 'break-word', width: '75%', marginTop: 15 }}>Overall Total Amount : {totalRate}</Text>
              </Page>
            </Document>
          }
          fileName={'Ordered-List'}
          onClick={handleDownloadComplete}
        >
          {({ blob, url, loading, error }) =>
            loading ? <div className='download-container'>Loading document...</div> : <div className='download-container'>{isDownloaded ? " " : "Download PDF By Clicking This and Send It To Us After Confirmation"}</div>
          }
        </PDFDownloadLink>
      )}

      <div style={{ height: '100px' }} ref={scrollRef}></div>
    </div>
  );
}

export default ConfirmListPage;
