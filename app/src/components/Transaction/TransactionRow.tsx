import React from'react';
import styled from 'styled-components';
import { ArrowToBottom, ArrowFromBottom } from '@styled-icons/boxicons-regular';

// const TArrowToBottom = styled(ArrowToBottom)`
  // color: #7154b4;
  // background-color: #e8e4ef;
  // border-radius: 0.5rem;
  // width: 2rem;
  // padding: 0.5rem;
// `

// const TArrowFromBottom = styled(ArrowFromBottom)`
//   color: #29a98f;
//   background-color: #e4f3f0;
//   border-radius: 0.5rem;
//   width: 2rem;
//   padding: 0.5rem;
// `

const TransactionRowContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  .icon {
    color: #7154b4;
    background-color: #e8e4ef;
    border-radius: 0.5rem;
    width: 2.5rem;
    padding: 0.5rem;
    height: 2.5rem;

    margin-right: 1rem;
  }
  .details {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
  }
  .info {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
  .title {

  }
  .date {
    color: #efefef; 
  }
  .status:before {
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    background-color: #7154b4;
    float: left;
    margin: 0.5rem;
    border-radius: 100%;
  }
`

const TransactionRow: React.FC<any> = ({
  title,
  target,
  date,
  status,
  receipt,
  amount
}) => {
  return (
    <TransactionRowContainer>
      <ArrowToBottom className="icon" />
      <div className="details">
        <div className="info">
          <span className="title">Send to ${target}</span>
          <span className="date">{date}</span>
        </div>
        <span className="status">{status}</span>
        <span className="receipt">{receipt}</span>
        <span className="amount">{amount}</span>
      </div>
    </TransactionRowContainer> 
  )
}


export default TransactionRow;
