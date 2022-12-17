
/**
 * @dev created this endpoint to authenticate users via EIP signatures
 */

 const {
    recoverTypedSignature,
    SignTypedDataVersion,
  } = require("@metamask/eth-sig-util");
  
  const accountAuth = (req, res) => {
    
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
  
    const {
      account,
      typedData,
      signature,
    } = req.body;
  
    const adminAddress = ["0xa33a70FABFeb361Fe891C208B1c27ec0b64baBEB"];
    let loginStatus;
  
    try {
      const signer = recoverTypedSignature({
        data: typedData,
        signature: signature,
        version: SignTypedDataVersion.V4,
      });
  
      console.log("Signer", signer);
  
      if (signer.toLowerCase() === adminAddress[0].toLowerCase()) {
        loginStatus = "Admin";
      } else {
        loginStatus = "User";
        console.log("Valid Signer", signer.toLowerCase());
      }
  
      res.status(201).json({
        status: "success",
        data: {
          authStatus: loginStatus,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: "failed",
        data: {
          user: "unable to authenticate user, please try reconnecting",
        },
      });
    }
  };
  
  export default accountAuth;