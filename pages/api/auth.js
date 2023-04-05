const {
  recoverTypedSignature,
  SignTypedDataVersion,
} = require("@metamask/eth-sig-util");

const adminAddress = [
  "0xa33a70FABFeb361Fe891C208B1c27ec0b64baBEB",
  "0x5013983D5691886140f24Abd66d2D7072f62991b",
  "0x575dC6dd8c838F8E015349BbF55b90E718efF537",
  "0xb265d9496Ae60CABe0ea1D3eab059B8Bb1911428"
];

const accountAuth = (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const { typedData, signature } = req.body;

    const signer = recoverTypedSignature({
      data: typedData,
      signature: signature,
      version: SignTypedDataVersion.V4,
    });

    let authStatus;
    if (
      adminAddress
        .map((address) => address.toLowerCase())
        .includes(signer.toLowerCase())
    ) {
      authStatus = "Admin";
    } else {
      authStatus = "User";
      console.log("Valid Signer", signer.toLowerCase());
    }

    res.status(201).json({
      status: "success",
      data: {
        authStatus,
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
