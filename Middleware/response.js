const sendResponse = (res, { code = 200, message, data,error } = {}) => {
    if (!isValidHttpStatusCode(code)) {
      code = 500;
    }
  
    console.log(data ?? "");
  
    return res.status(code).json({
      data,
      message,
      error
    });
  };
  
  function isValidHttpStatusCode(code) {
    return Number.isInteger(code) && code >= 100 && code <= 599;
  }
  
  export default sendResponse; 
  