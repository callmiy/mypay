import gql from "graphql-tag";

export const shiftFragment = gql`
  fragment ShiftFragment on Shift {
    id
    date
    startTime
    endTime
    hoursGross
    normalHours
    normalPay
    nightHours
    nightSupplPay
    sundayHours
    sundaySupplPay
    totalPay
  }
`;

export default shiftFragment;
