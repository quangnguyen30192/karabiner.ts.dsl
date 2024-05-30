import { RuleBuilder, hyperLayer, map } from "karabiner.ts";

export function buildSystemKeys(): RuleBuilder {
  return hyperLayer("s")
    .description("System")
    .manipulators([
      map("c")
        .to$("open x-apple.systempreferences:com.apple.preference")
        .description("configure preference"),
      map("r")
        .to$("osacript ~/.yadr/osascripts/record.scpt")
        .description("start recording screen using quicktime player"),
      map("u")
        .to("4", ["right_shift", "right_command"])
        .description("Capture the screen"),
    ]);
}
