enum SourceTypeValue {
  CryptocurrencyWallet = "CRYPTOCURRENCY_WALLET",
  Exchange = "EXCHANGE",
  Bank = "BANK",
  DecentralizedExchange = "DECENTRALIZED_EXCHANGE",
}

type SourceType = {
  id: string;
  value: SourceTypeValue;
  description?: string;
};
