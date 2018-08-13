

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateMeta
// ====================================================

export interface CreateMeta_meta {
  id: string;
  breakTimeSecs: number;
  nightSupplPayPct: any;
  payPerHr: any;
  sundaySupplPayPct: any;
}

export interface CreateMeta {
  meta: CreateMeta_meta | null;  // Create a meta
}

export interface CreateMetaVariables {
  meta: CreateMetaInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateShift
// ====================================================

export interface CreateShift_shift {
  id: string;
  date: any;
  startTime: any;
  endTime: any;
  hoursGross: number;
  normalHours: number;
  normalPay: any;
  nightHours: number;
  nightSupplPay: any;
  sundayHours: number;
  sundaySupplPay: any;
  totalPay: any;
}

export interface CreateShift {
  shift: CreateShift_shift | null;  // Create a shift
}

export interface CreateShiftVariables {
  shift: CreateShiftInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ShiftFragment
// ====================================================

export interface ShiftFragment {
  id: string;
  date: any;
  startTime: any;
  endTime: any;
  hoursGross: number;
  normalHours: number;
  normalPay: any;
  nightHours: number;
  nightSupplPay: any;
  sundayHours: number;
  sundaySupplPay: any;
  totalPay: any;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// Inputs for creating a meta
export interface CreateMetaInput {
  breakTimeSecs?: number | null;
  nightSupplPayPct: any;
  payPerHr: any;
  sundaySupplPayPct: any;
}

// Inputs for creating shift
export interface CreateShiftInput {
  date: any;
  endTime: any;
  metaId: string;
  startTime: any;
}

//==============================================================
// END Enums and Input Objects
//==============================================================