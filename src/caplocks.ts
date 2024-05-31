import { map, rule } from "karabiner.ts";

export function buildCapLocksKey() {
  return rule("Caplocks key").manipulators([
    map("caps_lock")
      .toHyper()
      .toIfAlone("escape")
      .description("cap to hyper or escape"),

    map("caps_lock", "right_shift")
      .toNone()
      .description(
        "disable right shift + cap as unintended enabling caplocks mode"
      ),
    map("left_control", "caps_lock")
      .to("caps_lock")
      .description("ctrl+ cap to enable caplocks"),
  ]);
}
