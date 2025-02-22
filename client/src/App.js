import React,{useState,useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/home';
import ConfirmListPage from './ConfirmList/confirmList';
import { CrackersList } from './data-list';

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalRate, setTotalRate] = useState(0);
  const [crackers, setCrackers] = useState(CrackersList);
  // const [giftBoxCrackers, setGiftBoxCrackers] = useState(giftBox);
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [downloaded, setDownloaded] = useState(false);
  // const [discountTotalRate, setDiscountTotalRate] = useState(0);
  // const [anotherTable, setAnotherTable] = useState([]);
  // const [anotherTotalRate, setAnotherTotalRate] = useState(0);


  useEffect(()=>{
    setCrackers(CrackersList);
    // setGiftBoxCrackers(giftBox)
  },[downloaded])

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home 
          setSelectedItems={setSelectedItems} 
          selectedItems={selectedItems} totalRate={totalRate} 
          setTotalRate={setTotalRate}
          crackers={crackers}
          setCrackers={setCrackers}
          customerName={customerName}
          setCustomerName={setCustomerName}
          customerNumber={customerNumber}
          setCustomerNumber={setCustomerNumber}
          customerAddress={customerAddress}
          setCustomerAddress={setCustomerAddress}
          // setDiscountTotalRate={setDiscountTotalRate}
          // discountTotalRate={discountTotalRate}
          // giftBoxCrackers={giftBoxCrackers}
          // setGiftBoxCrackers={setGiftBoxCrackers}
          // setAnotherTable={setAnotherTable}
          // anotherTable={anotherTable}
          // setAnotherTotalRate={setAnotherTotalRate}
          // anotherTotalRate={anotherTotalRate}
           />} />
          <Route path="/confirmList" element={<ConfirmListPage 
          setSelectedItems={setSelectedItems} 
          selectedItems={selectedItems}
           totalRate={totalRate}
           setTotalRate={setTotalRate}
           crackers={crackers}
          setCrackers={setCrackers}
          customerName={customerName}
          setCustomerName={setCustomerName}
          customerNumber={customerNumber}
          setCustomerNumber={setCustomerNumber}
          customerAddress={customerAddress}
          setCustomerAddress={setCustomerAddress}
          setDownloaded={setDownloaded}
          downloaded={downloaded}
          // setDiscountTotalRate={setDiscountTotalRate}
          // discountTotalRate={discountTotalRate}
          // giftBoxCrackers={giftBoxCrackers}
          // setGiftBoxCrackers={setGiftBoxCrackers}
          // setAnotherTable={setAnotherTable}
          // anotherTable={anotherTable}
          // setAnotherTotalRate={setAnotherTotalRate}
          // anotherTotalRate={anotherTotalRate}
           />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
