/* eslint-disable ts/prefer-literal-enum-member */
export enum Access {
  None = 0,
  Autoapprove = 1 << 0,
  Edits = 1 << 1,
}
