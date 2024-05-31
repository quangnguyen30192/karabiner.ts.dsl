import { RuleBuilder, ifApp, map, rule } from "karabiner.ts";

export function buildDisableKeys(): RuleBuilder[] {
  return [
    rule(
      "Disable (Map to F11 which is harmless) for Google Chrome due to frequently accidentally press",
      ifApp("^com\\.google\\.Chrome$")
    ).manipulators([
      map("w", ["command", "left_shift"]).toNone(),
      map("q", "command").toNone(),
    ]),

    rule(
      "Disable (Map to F11 which is harmless) Cmd-Q for Alacritty due to frequently accidentally press",
      ifApp("^io\\.Alarcritty$")
    ).manipulators([map("q", "command").toNone()]),

    rule("Disable logout macos - shift cmd q").manipulators([map("q", ["shift", "command"]).toNone()]),
  ];
}
