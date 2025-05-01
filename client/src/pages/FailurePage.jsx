const FailurePage = () => {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Payment Failed</h1>
        <p>Something went wrong. Please try again.</p>
        <a href="/checkout" className="text-blue-500">Return to Checkout</a>
      </div>
    );
  };
  
  export default FailurePage;