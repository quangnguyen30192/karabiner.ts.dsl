import { RuleBuilder, hyperLayer, map } from "karabiner.ts";

export function buildTerminalKeys(): RuleBuilder {
  return hyperLayer("r")
    .description("iterm manipulation")
    .manipulators([
      map("k").to$("pkill -f /Applications/Iterm2.app"),
      map("y").to$("~/.yadr/bin/iterm2 ycmd"),
      map("m").to$("~/.yadr/bin/iterm2 ~/.yadr/bin/rofi-beats"),
      map("n").to$("~/.yadr/bin/iterm2 ~/.yadr/bin/app-launch"),
      map("u").to$("~/.yadr/bin/iterm2 ~/.yadr/bin/command-launch"),
    ]);
}
