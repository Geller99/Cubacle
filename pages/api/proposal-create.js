// import { connectMongo } from "../../config/connect";
// import ProposalModel from "../../models/proposal-schema";

// /**
//  * @dev verifies if Admin wallet via EIP Signature
//  *
//  * Returns verification status and adds new proposal to database
//  *
//  *
//  */
// // const adminAddress = ["0xa33a70FABFeb361Fe891C208B1c27ec0b64baBEB"];

// const createProposal = async (req, res, next) => {
//   if (req.method !== "POST") {
//     res.status(405).send({ message: "Only POST requests allowed" });
//     return;
//   }
//   connectMongo();
//   const { title, detail, duration, active, voters, typedData, signature } =
//     req.body;

//   try {
//     // const signer = recoverTypedSignature({
//     //   data: typedData,
//     //   signature: signature,
//     //   version: SignTypedDataVersion.V4,
//     // });

//     // if (signer.toLowerCase() === adminAddress.map((el) => el.toLowerCase())) {
//     //     console.log("Creating Proposal...")
//     // } else {
//     //   res
//     //   .status(405)
//     //   .send({ message: "This account is not allowed to initiate proposals" });
//     // }

//     const newProposal = await ProposalModel.create({
//       title: title,
//       detail: detail,
//       duration: duration,
//       active: active,
//       negativeVoteCount: 0,
//       positiveVoteCount: 0,
//       voters: voters,
//     });

//     res.status(201).json({
//       status: "success",
//       data: {
//         proposal: newProposal,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       status: "failed",
//       data: {
//         user: "unable to creae new proposal",
//       },
//     });
//   }
// };

// export default createProposal;