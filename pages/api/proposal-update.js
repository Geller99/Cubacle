// /**
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  * 
//  * @dev uses EIP to verify admin wallet
//  * 
//  * Admin can update the duration of a proposal or its active/archived status in the feed
//  */

// export const updateProposal = (req, res) => {
//     try {
        
//         // grab proposal Id and update DB with details in response Object
//         // const { id } = req.body;
//         /**
//          * @dev can update
//          * 
//          * - active status
//          * - voterHash 
//          * - title
//          * - duration
//          */
        
        
//         res.send('Proposal Deleted');
        
//       } catch (error) {
//         res.status(400).json({
//           status: "failed",
//           data: {
//             user: "unable to delete Proposal",
//           },
//         });
//       }
  
// }