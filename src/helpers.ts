import {
  Account,
  Token,
  TokenBalance,
  TokenDayData,
} from "../generated/schema";
import { BigInt, Address, store, log } from "@graphprotocol/graph-ts";

// Helper function to get account by address
export function getAccountByAddress(accountAddress: Address): Account {
  let accountId = accountAddress.toHex();
  let account = Account.load(accountId);
  if (account == null) {
    account = new Account(accountId);
    account.address = accountAddress.toHex();
  }
  account.save();
  return account;
}

// Helper function to get token by address
export function getTokenByAddress(tokenAddress: Address): Token {
  let tokenId = tokenAddress.toHex();
  let token = Token.load(tokenId);
  if (token == null) {
    token = new Token(tokenId);
    token.name = "";
    token.symbol = "";
    token.totalSupply = new BigInt(0);
  }
  token.save();
  return token;
}

// Helper function to get TokenBalance
export function getTokenBalanceByAddresses(
  accountAddress: Address,
  tokenAddress: Address
): TokenBalance {
  let accountId = accountAddress.toHex();
  let tokenId = tokenAddress.toHex();
  let tokenBalanceId = accountId + "-" + tokenId;
  let tokenBalance = TokenBalance.load(tokenBalanceId);
  if (tokenBalance == null) {
    tokenBalance = new TokenBalance(tokenBalanceId);
    tokenBalance.account = accountId;
    tokenBalance.token = tokenId;
    tokenBalance.save();
  }
  return tokenBalance;
}

// Helper function to get TokenDayData
export function getTokenDayData(
  tokenAddress: Address,
  date: BigInt
): TokenDayData {
  let tokenId = tokenAddress.toHex();
  let tokenDayDataId = tokenId + "-" + date.toString();
  let tokenDayData = TokenDayData.load(tokenDayDataId);
  if (tokenDayData == null) {
    tokenDayData = new TokenDayData(tokenDayDataId);
    tokenDayData.token = tokenId;
    tokenDayData.mintVolume = new BigInt(0);
    tokenDayData.burnVolume = new BigInt(0);
    tokenDayData.transferVolume = new BigInt(0);
    tokenDayData.numHolders = new BigInt(0);
  }
  tokenDayData.save();
  return tokenDayData;
}

// Helper function to modify token balance
export function modifyTokenBalance(
  accountAddress: Address,
  tokenAddress: Address,
  value: BigInt,
  subtract: boolean
): void {
  //   let account = getAccountByAddress(accountAddress);
  //   let token = getTokenByAddress(tokenAddress);
  log.info("in modifyTokenBalance", []);
  let tokenBalance = getTokenBalanceByAddresses(accountAddress, tokenAddress);
  if (subtract) {
    tokenBalance.balance = tokenBalance.balance.minus(value);
  } else {
    tokenBalance.balance = tokenBalance.balance.plus(value);
  }
  tokenBalance.save();
  return;
}

// Token - Mint, Burn, Transfer

// Helper function to modify token day data for mint
export function modifyTokenDayDataMint(
  tokenAddress: Address,
  date: BigInt,
  value: BigInt
): void {
  let tokenDayData = getTokenDayData(tokenAddress, date);
  tokenDayData.mintVolume = tokenDayData.mintVolume.plus(value);
  tokenDayData.save();
  return;
}

// Helper function to modify token day data for burn
export function modifyTokenDayDataBurn(
  tokenAddress: Address,
  date: BigInt,
  value: BigInt
): void {
  let tokenDayData = getTokenDayData(tokenAddress, date);
  tokenDayData.mintVolume = tokenDayData.mintVolume.plus(value);
  tokenDayData.save();
  return;
}

// Helper function to modify token day data for transfer
export function modifyTokenDayDataTransfer(
  tokenAddress: Address,
  date: BigInt,
  value: BigInt
): void {
  let tokenDayData = getTokenDayData(tokenAddress, date);
  tokenDayData.transferVolume = tokenDayData.transferVolume.plus(value);
  tokenDayData.save();
  return;
}
