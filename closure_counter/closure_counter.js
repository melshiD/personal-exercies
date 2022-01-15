// Global function which would form
// closure with modify function
function counter() {
  
    // Private counter variable
    let count = 0;
    
    // To increment the value of counter
    function increment() {
      count++;
    }
    
    // To decrement the value of counter
    function decrement() {
      count--;
    }
    
    // Modify function forms closure
    // here which is used outside
    function modify(val) {
    
      // To check increment or decrement
      // button has been clicked
      if (val === "1") increment();
      else if (val === "0") decrement();
    
      // Return the counter
      return count;
    }
    
    // Returning to make it available
    // outside counter function
    return modify;
}
    
  // Storing the closure modify
  const closure = counter();
    
  // This function handles the button
  // click, objButton to get value
  function counterHandler(objButton) {
    
    // Storing the value returned by modify
    let count = closure(objButton.value);
    
    // Getting div by it's id
    // and modifying its inner html
    document.getElementById("counter_div")
      .innerHTML = "<h2>" + count + "</h2>";
  }