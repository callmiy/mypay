

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

//==============================================================
// END Enums and Input Objects
//==============================================================