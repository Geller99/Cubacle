import React from 'react'

const ProposalItem = ({title, detail, active, positiveVoteCount, negativeVoteCount}) => {

  return (
    <div style={{display:"flex", flexDirection:"row", color:"red"}}>
        <p> {title && title} </p>
        {/* <p> {detail && detail} </p> */}
        {/* <p> {image && image} </p> */}
        {/* <p> {eligibilityCount} </p> */}
        {/* <p> status {active && active} </p>
        <p> +votes {positiveVoteCount && positiveVoteCount} </p>
        <p> +votes {negativeVoteCount && negativeVoteCount} </p> */}

        <button> edit</button>
        <button> delete </button>
    </div>
  )
}

export default ProposalItem;
