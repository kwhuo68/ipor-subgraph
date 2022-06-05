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
} from "./helpers";

const zeroAddress = "0x0000000000000000000000000000000000000000";

// IporOracle
export function handleAdminChanged(event: AdminChanged): void {}
export function handleAppointedToTransferOwnership(
  event: AppointedToTransferOwnership
): void {}
export function handleBeaconUpgraded(event: BeaconUpgraded): void {}
export function handleIporIndexAddAsset(event: IporIndexAddAsset): void {}
export function handleIporIndexAddUpdater(event: IporIndexAddUpdater): void {}
export function handleIporIndexRemoveAsset(event: IporIndexRemoveAsset): void {}
export function handleIporIndexRemoveUpdater(
  event: IporIndexRemoveUpdater
): void {}
export function handleIporIndexUpdate(event: IporIndexUpdate): void {}
export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
export function handlePaused(event: Paused): void {}
export function handleUnpaused(event: Unpaused): void {}
export function handleUpgraded(event: Upgraded): void {}

// Joseph
export function handleCharlieTreasuryChanged(
  event: CharlieTreasuryChanged
): void {}
export function handleCharlieTreasuryManagerChanged(
  event: CharlieTreasuryManagerChanged
): void {}
export function handleProvideLiquidity(event: ProvideLiquidity): void {}
export function handleRedeem(event: Redeem): void {}
export function handleTreasuryChanged(event: TreasuryChanged): void {}
export function handleTreasuryManagerChanged(
  event: TreasuryManagerChanged
): void {}

// LP Token
export function handleApproval(event: Approval): void {}
export function handleBurn(event: Burn): void {}
export function handleMint(event: Mint): void {}
export function handleTransfer(event: Transfer): void {
  let tokenAddress = event.address;
  let from = event.params.from;
  let to = event.params.to;
  let value = event.params.value;
  let timestamp = event.block.timestamp; //.toI32();
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
export function handleMiltonChanged(event: MiltonChanged): void {}

// MiltonV2
export function handleCloseSwap(event: CloseSwap): void {}
export function handleOpenSwap(event: OpenSwap): void {}
