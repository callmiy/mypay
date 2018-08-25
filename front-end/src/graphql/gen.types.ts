

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateMeta
// ====================================================

export interface CreateMeta_meta {
  id: string;
  _id: string;
  breakTimeSecs: number;
  payPerHr: any;
  nightSupplPayPct: any;
  sundaySupplPayPct: any;
  schemaType: string;
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

export interface CreateShift_shift_meta {
  id: string;
}

export interface CreateShift_shift {
  id: string;
  _id: string;
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
  meta: CreateShift_shift_meta | null;
  schemaType: string;
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
// GraphQL query operation: GetInitialSocketData
// ====================================================

export interface GetInitialSocketData_shifts_meta {
  id: string;
}

export interface GetInitialSocketData_shifts {
  id: string;
  _id: string;
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
  meta: GetInitialSocketData_shifts_meta | null;
  schemaType: string;
}

export interface GetInitialSocketData_newShiftUrl {
  _id: string;
  url: string;
  schemaType: string;
}

export interface GetInitialSocketData_offlineToken {
  id: string;
  _id: string;
  value: string;
  schemaType: string;
}

export interface GetInitialSocketData_metas {
  id: string;
  _id: string;
  breakTimeSecs: number;
  payPerHr: any;
  nightSupplPayPct: any;
  sundaySupplPayPct: any;
  schemaType: string;
}

export interface GetInitialSocketData {
  shifts: (GetInitialSocketData_shifts | null)[] | null;   // Get all shifts
  newShiftUrl: GetInitialSocketData_newShiftUrl | null;    // Get New shift URL
  offlineToken: GetInitialSocketData_offlineToken | null;  // Get Offline Token
  metas: (GetInitialSocketData_metas | null)[] | null;     // Get all metas optionally filtered
}

export interface GetInitialSocketDataVariables {
  shift?: GetShiftInput | null;
  getMetasInput?: GetMetaInput | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MetaFragment
// ====================================================

export interface MetaFragment {
  id: string;
  _id: string;
  breakTimeSecs: number;
  payPerHr: any;
  nightSupplPayPct: any;
  sundaySupplPayPct: any;
  schemaType: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NewShiftUrlFragment
// ====================================================

export interface NewShiftUrlFragment {
  _id: string;
  url: string;
  schemaType: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OfflineTokenFragment
// ====================================================

export interface OfflineTokenFragment {
  id: string;
  _id: string;
  value: string;
  schemaType: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ShiftFragment
// ====================================================

export interface ShiftFragment_meta {
  id: string;
}

export interface ShiftFragment {
  id: string;
  _id: string;
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
  meta: ShiftFragment_meta | null;
  schemaType: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// Sorting directive
export enum SortingDirective {
  ASC = "ASC",
  DESC = "DESC",
}

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
  meta?: CreateMetaInput | null;
  metaId?: string | null;
  startTime: any;
}

// Inputs for getting shift
export interface GetShiftInput {
  orderBy?: Sorting | null;
  where?: WhereCondition | null;
}

// input for sorting
export interface Sorting {
  date?: SortingDirective | null;
  id?: SortingDirective | null;
}

// Where condition for retrieving a shift
export interface WhereCondition {
  month?: number | null;
  year?: number | null;
}

// Inputs for getting meta
export interface GetMetaInput {
  orderBy?: SortMeta | null;
}

// input for sorting
export interface SortMeta {
  id?: SortingDirective | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================