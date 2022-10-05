enum AssetClassValue {
  CashOrCashEquivalent = "CASH_OR_CASH_EQUIVALENT",
  Commodity = "COMMODITY",
  Cryptocurrency = "CRYPTOCURRENCY",
  Equity = "EQUITY",
  FixedIncome = "FIXED_INCOME",
  Future = "FUTURE",
  RealEstate = "REAL_ESTATE",
}

type AssetClass = {
  id: string;
  value: AssetClassValue;
  description?: string;
};
