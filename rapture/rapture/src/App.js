import logo from './logo.svg';
import './App.css';
import React, {Fragment} from 'react';
import FaceDeclarations from './components/FaceDeclarations';

function App() {
  return (
    <Fragment>
      <h1>
        NOTHING TO SEE HERE!
      </h1>
      <FaceDeclarations />
    </Fragment>
  );
}

export default App;

// import Header from "./Components/Layout/Header";
// import React, {useState} from 'react';
// import Meals from "./Components/Meals/Meals";
// import Cart from "./Components/Cart/Cart";
// import CartProvider from "./store/CartProvider";

// function App() {
//   const [cartIsShown, setCartIsShown] = useState(false);

//   const showCartHandler = () => {
//     console.log('show cart!')
//     setCartIsShown(true);
//   };
//   const hideCartHandler = () => {
//     console.log('hide cart!')
//     setCartIsShown(false);
//   };

//   return (
//     <CartProvider>
//       {cartIsShown && <Cart hideCart={hideCartHandler}/>}
//       <Header onShowCart={showCartHandler}/>
//       <main>
//         <Meals />
//       </main>
//     </CartProvider>
//   );
// }

// export default App;