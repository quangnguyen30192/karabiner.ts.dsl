import { RuleBuilder, hyperLayer, map } from "karabiner.ts";
import { itermCmd, toOsascript } from "./utils";

export function buildTerminalKeys(): RuleBuilder {
  return hyperLayer("r")
    .description("iterm manipulation")
    .manipulators([
      map("k").to$(toOsascript("iTerm2", "to quit")),
      map("y").to$(itermCmd("ycmd")),
      map("m").to$(itermCmd("rofi-beats")),
      map("n").to$(itermCmd("app-launch")),
      map("u").to$(itermCmd("command-launch")),
    ]);
}
