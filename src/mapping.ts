import { BigInt } from "@graphprotocol/graph-ts";
import {
  AdminChanged,
  AppointedToTransferOwnership,
  BeaconUpgraded,
  IporIndexAddAsset,
  IporIndexAddUpdater,
  IporIndexRemoveAsset,
  IporIndexRemoveUpdater,
  IporIndexUpdate,
  OwnershipTransferred,
  Paused,
  Unpaused,
  Upgraded,
} from "../generated/IporOracle/IporOracle";
import {
  CharlieTreasuryChanged,
  CharlieTreasuryManagerChanged,
  ProvideLiquidity,
  Redeem,
  TreasuryChanged,
  TreasuryManagerChanged,
} from "../generated/JosephDAI/Joseph";
import { Approval, Burn, Mint, Transfer } from "../generated/ipDAI/ipDAI";
import { MiltonChanged } from "../generated/MiltonStorageDai/MiltonStorage";
import { CloseSwap, OpenSwap } from "../generated/MiltonV2Dai/MiltonV2";
import {
  getAccountByAddress,
  modifyTokenBalance,
  modifyTokenDayDataMint,
  modifyTokenDayDataBurn,
  modifyTokenDayDataTransfer,
  getIporOracleByAddress,
  getJosephByAddress,
  getMiltonStorageByAddress,
} from "./helpers";

const zeroAddress = "0x0000000000000000000000000000000000000000";

// IporOracle
export function handleAdminChanged(event: AdminChanged): void {
  let iporOracleAddress = event.address;
  let newAdmin = event.params.newAdmin;
  let previousAdmin = event.params.previousAdmin;
  let iporOracle = getIporOracleByAddress(iporOracleAddress);
  iporOracle.admin = newAdmin.toHex();
  return;
}
export function handleAppointedToTransferOwnership(
  event: AppointedToTransferOwnership
): void {
  let from = event.params.appointedOwner;
}
export function handleBeaconUpgraded(event: BeaconUpgraded): void {
  let iporOracleAddress = event.address;
  let beacon = event.params.beacon;
  let iporOracle = getIporOracleByAddress(iporOracleAddress);
  iporOracle.beacon = beacon.toHex();
}
export function handleIporIndexAddAsset(event: IporIndexAddAsset): void {
  let exponentialMovingAverage = event.params.exponentialMovingAverage;
  let exponentialWeightedMovingVariance =
    event.params.exponentialWeightedMovingVariance;
  let newAsset = event.params.newAsset;
  let updateTimestamp = event.params.updateTimestamp;
}
export function handleIporIndexAddUpdater(event: IporIndexAddUpdater): void {
  let newUpdater = event.params.newUpdater;
}
export function handleIporIndexRemoveAsset(event: IporIndexRemoveAsset): void {
  let asset = event.params.asset;
}
export function handleIporIndexRemoveUpdater(
  event: IporIndexRemoveUpdater
): void {
  let updater = event.params.updater;
}
export function handleIporIndexUpdate(event: IporIndexUpdate): void {
  let asset = event.params.asset;
  let exponentialMovingAverage = event.params.exponentialMovingAverage;
  let exponentialWeightedMovingVariance =
    event.params.exponentialWeightedMovingVariance;
  let indexValue = event.params.indexValue;
  let quasiIbtPrice = event.params.quasiIbtPrice;
  let updateTimestamp = event.params.updateTimestamp;
}
export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let iporOracleAddress = event.address;
  let newOwner = event.params.newOwner;
  let previousOwner = event.params.previousOwner;
  let iporOracle = getIporOracleByAddress(iporOracleAddress);
  iporOracle.owner = newOwner.toHex();
  iporOracle.save();
}
export function handlePaused(event: Paused): void {
  let iporOracleAddress = event.address;
  let account = event.params.account;
  let iporOracle = getIporOracleByAddress(iporOracleAddress);
  iporOracle.paused = true;
  iporOracle.save();
  return;
}
export function handleUnpaused(event: Unpaused): void {
  let iporOracleAddress = event.address;
  let account = event.params.account;
  let iporOracle = getIporOracleByAddress(iporOracleAddress);
  iporOracle.paused = false;
  iporOracle.save();
}
export function handleUpgraded(event: Upgraded): void {
  let iporOracleAddress = event.address;
  let implementation = event.params.implementation;
  let iporOracle = getIporOracleByAddress(iporOracleAddress);
  iporOracle.implementation = implementation.toHex();
  iporOracle.save();
}

// Joseph
export function handleCharlieTreasuryChanged(
  event: CharlieTreasuryChanged
): void {
  let josephAddress = event.address;
  let changedBy = event.params.changedBy;
  let newCharlieTreasury = event.params.newCharlieTreasury;
  let oldCharlieTreasury = event.params.oldCharlieTreasury;
  let joseph = getJosephByAddress(josephAddress);
  joseph.charlieTreasury = newCharlieTreasury.toHex();
  joseph.save();
}
export function handleCharlieTreasuryManagerChanged(
  event: CharlieTreasuryManagerChanged
): void {
  let josephAddress = event.address;
  let changedBy = event.params.changedBy;
  let newCharlieTreasuryManager = event.params.newCharlieTreasuryManager;
  let oldCharlieTreasuryManager = event.params.oldCharlieTreasuryManager;
  let joseph = getJosephByAddress(josephAddress);
  joseph.charlieTreasuryManager = newCharlieTreasuryManager.toHex();
  joseph.save();
}
export function handleProvideLiquidity(event: ProvideLiquidity): void {
  let josephAddress = event.address;
  let assetAmount = event.params.assetAmount;
  let exchangeRate = event.params.exchangeRate;
  let from = event.params.from;
  let ipTokenAmount = event.params.ipTokenAmount;
  let timestamp = event.params.timestamp;
  let to = event.params.to;
}
export function handleRedeem(event: Redeem): void {
  let josephAddress = event.address;
  let assetAmount = event.params.assetAmount;
  let exchangeRate = event.params.exchangeRate;
  let from = event.params.from;
  let ipTokenAmount = event.params.ipTokenAmount;
  let redeemAmount = event.params.redeemAmount;
  let redeemFee = event.params.redeemFee;
  let timestamp = event.params.timestamp;
  let to = event.params.to;
}
export function handleTreasuryChanged(event: TreasuryChanged): void {
  let josephAddress = event.address;
  let changedBy = event.params.changedBy;
  let newTreasury = event.params.newTreasury;
  let oldTreasury = event.params.oldTreasury;
}
export function handleTreasuryManagerChanged(
  event: TreasuryManagerChanged
): void {
  let josephAddress = event.address;
  let changedBy = event.params.changedBy;
  let newTreasuryManager = event.params.newTreasuryManager;
  let oldTreasuryManager = event.params.oldTreasuryManager;
}

// LP Token
export function handleApproval(event: Approval): void {
  let tokenAddress = event.address;
  let owner = event.params.owner;
  let spender = event.params.spender;
  let value = event.params.value;
}
export function handleBurn(event: Burn): void {
  let tokenAddress = event.address;
  let account = event.params.account;
  let amount = event.params.amount;
}
export function handleMint(event: Mint): void {
  let tokenAddress = event.address;
  let account = event.params.account;
  let amount = event.params.amount;
}
export function handleTransfer(event: Transfer): void {
  let tokenAddress = event.address;
  let from = event.params.from;
  let to = event.params.to;
  let value = event.params.value;
  let timestamp = event.block.timestamp;
  let date = timestamp; //.div(new BigInt(86400));
  // Cases for transfers
  if (from.toHex() == zeroAddress && to.toHex() != zeroAddress) {
    modifyTokenBalance(to, tokenAddress, value, false);
    modifyTokenDayDataMint(tokenAddress, date, value);
  } else if (from.toHex() != zeroAddress && to.toHex() == zeroAddress) {
    modifyTokenBalance(from, tokenAddress, value, true);
    modifyTokenDayDataBurn(tokenAddress, date, value);
  } else {
    modifyTokenBalance(from, tokenAddress, value, true);
    modifyTokenBalance(to, tokenAddress, value, false);
    modifyTokenDayDataTransfer(tokenAddress, date, value);
  }
}

// MiltonStorage
export function handleMiltonChanged(event: MiltonChanged): void {
  let miltonStorageAddress = event.address;
  let changedBy = event.params.changedBy;
  let newMilton = event.params.newMilton;
  let oldMilton = event.params.oldMilton;
  let miltonStorage = getMiltonStorageByAddress(miltonStorageAddress);
  miltonStorage.milton = newMilton.toHex();
  miltonStorage.save();
}

// MiltonV2
export function handleCloseSwap(event: CloseSwap): void {
  let miltonV2Address = event.address;
  let asset = event.params.asset;
  let closeTimestamp = event.params.closeTimestamp;
  let liquidator = event.params.liquidator;
  let swapId = event.params.swapId;
  let transferredToBuyer = event.params.transferredToBuyer;
  let transferredToLiquidator = event.params.transferredToLiquidator;
}
export function handleOpenSwap(event: OpenSwap): void {
  let miltonV2Address = event.address;
  let asset = event.params.asset;
  let buyer = event.params.buyer;
  let direction = event.params.direction;
  let endTimestamp = event.params.endTimestamp;
  let indicator = event.params.indicator;
  let money = event.params.money;
  let openTimestamp = event.params.openTimestamp;
  let swapId = event.params.swapId;
}
