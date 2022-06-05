import {
  test,
  newMockEvent,
  assert,
  clearStore,
  log,
} from "matchstick-as/assembly/index";
import { Address, ethereum, BigInt } from "@graphprotocol/graph-ts";
import { Transfer as TransferEvent } from "../../generated/ipDAI/ipDAI";
import { handleTransfer } from "../../src/mapping";

const tokenAddress = "0xB3fBf885c2713537BcB699be129dfc2Ad2DE84b2";
// Addresses
const zeroAddress = "0x0000000000000000000000000000000000000000";
const memberOneAddress = "0x23c7453ec7ab89b098defb751c7301b5f6d8776a";
const memberTwoAddress = "0x34b8362ed6ba98c132defb351c7902b4f5c2946b";

test("TransferTest - Mint", () => {
  const value = 100;
  let mintTransferEvent = createTransfer(
    tokenAddress,
    zeroAddress,
    memberOneAddress,
    BigInt.fromI32(value)
  );
  handleTransferEvents([mintTransferEvent]);
  // assert.fieldEquals(
  //   "TokenBalance",
  //   memberOneAddress + "-" + tokenAddress,
  //   "balance",
  //   value.toString()
  // );
  clearStore();
});

test("TransferTest - Burn", () => {
  const value = 100;
  const value2 = 40;
  let mintTransferEvent = createTransfer(
    tokenAddress,
    zeroAddress,
    memberOneAddress,
    BigInt.fromI32(value)
  );
  handleTransferEvents([mintTransferEvent]);
  let burnTransferEvent = createTransfer(
    tokenAddress,
    memberOneAddress,
    zeroAddress,
    BigInt.fromI32(value2)
  );
  handleTransferEvents([burnTransferEvent]);
  assert.fieldEquals(
    "TokenBalance",
    memberOneAddress + "-" + tokenAddress,
    "balance",
    (value - value2).toString()
  );
  clearStore();
});

test("TransferTest - Transfer", () => {
  const value = 100;
  const value2 = 40;
  let mintTransferOneEvent = createTransfer(
    tokenAddress,
    zeroAddress,
    memberOneAddress,
    BigInt.fromI32(value)
  );
  handleTransferEvents([mintTransferOneEvent]);
  let mintTransferTwoEvent = createTransfer(
    tokenAddress,
    memberOneAddress,
    memberTwoAddress,
    BigInt.fromI32(value2)
  );
  handleTransferEvents([mintTransferTwoEvent]);
  assert.fieldEquals(
    "TokenBalance",
    memberOneAddress + "-" + tokenAddress,
    "balance",
    (value - value2).toString()
  );
  assert.fieldEquals("Account", memberTwoAddress, "balance", value2.toString());
  clearStore();
});

// TRANSFERS

export function handleTransferEvents(events: TransferEvent[]): void {
  events.forEach((event) => {
    handleTransfer(event);
  });
}

export function createTransfer(
  tokenAddress: string,
  from: string,
  to: string,
  value: BigInt
): TransferEvent {
  let mockEvent = newMockEvent();
  let newTransferEvent = new TransferEvent(
    Address.fromString(tokenAddress),
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters
  );
  newTransferEvent.parameters = new Array();
  let fromParam = new ethereum.EventParam(
    "from",
    ethereum.Value.fromAddress(Address.fromString(from))
  );
  let toParam = new ethereum.EventParam(
    "to",
    ethereum.Value.fromAddress(Address.fromString(to))
  );
  let valueParam = new ethereum.EventParam(
    "value",
    ethereum.Value.fromSignedBigInt(value)
  );
  newTransferEvent.parameters.push(fromParam);
  newTransferEvent.parameters.push(toParam);
  newTransferEvent.parameters.push(valueParam);
  return newTransferEvent;
}
