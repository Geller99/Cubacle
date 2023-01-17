
// /**
//  * @dev fetches proposal id, deletes from DB
//  * 
//  * @dev uses EIP signature to verify before api can be called
//  * 
//  * 
//  */

// export const deleteProposal = (req, res) => {
//     try {
        
//         // grab proposal Id and delete from DB
//         // const { id } = req.body;

//         // A.findByIdAndRemove(id, callback) // executes
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