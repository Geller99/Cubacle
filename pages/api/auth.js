const {
  recoverTypedSignature,
  SignTypedDataVersion,
} = require("@metamask/eth-sig-util");

const adminAddress = ["0xa33a70FABFeb361Fe891C208B1c27ec0b64baBEB"];
const accountAuth = (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }


  try {
    const {
      typedData,
      signature,
    } = req.body;

    const account = typedData.message.account;
    const signer = recoverTypedSignature({
      data: typedData,
      signature: signature,
      version: SignTypedDataVersion.V4,
    });
    console.log("Signer", signer);

    //TODO: does signer === account?


    let authStatus;
    if (signer.toLowerCase() === adminAddress[0].toLowerCase()) {
      authStatus = "Admin";
    } else {
      authStatus = "User";
      console.log("Valid Signer", signer.toLowerCase());
    }

    res.status(201).json({
      status: "success",
      data: {
        authStatus
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