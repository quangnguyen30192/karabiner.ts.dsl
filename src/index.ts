import { map, rule, writeToProfile, } from "karabiner.ts";
import { buildWindowsKeys } from "./windows";
import { buildSystemKeys } from "./system";
import { buildTerminalKeys } from "./terminal";
import { buildDisableKeys } from "./disables";
import { buildOpenAppsKeys } from "./apps";

writeToProfile("Quang Nguyen Karabiner modified", [
  rule("Basic").manipulators([
    map("caps_lock")
      .toHyper()
      .toIfAlone("escape")
      .description("cap to hyper or escape"),
    map("delete_or_backspace", "shift")
      .to("delete_forward")
      .description("Offer shift delete"),
    map("left_option")
      .to("left_option")
      .toIfAlone("slash")
      .description("Easily pressing slash when left_control is pressed alone"),
    map("left_command")
      .to("left_command")
      .toIfAlone("slash", "left_shift")
      .description("Easily pressing ? when left cmd is pressed alone"),
    map("left_shift")
      .to("left_shift")
      .toIfAlone("semicolon", "left_shift")
      .description("Easily pressing : when left cmd is pressed alone"),
  ]),

  buildWindowsKeys(),
  buildSystemKeys(),
  buildTerminalKeys(),

  ...buildDisableKeys(),
  buildOpenAppsKeys(),

  rule("option and hjkl to arrow key").manipulators([
    map("h", "left_option").to("left_arrow"),
    map("j", "left_option").to("down_arrow"),
    map("k", "left_option").to("up_arrow"),
    map("l", "left_option").to("right_arrow"),
  ]),
]);
