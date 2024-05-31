import { RuleBuilder, ToMouseKey, ifVar, map, rule } from "karabiner.ts";

const WHEEL_SPEED = 50;
const SLOWER_SPEED = 300;
const NORMAl_SPEED = 718;
const FASTER_SPEED = 2536;
const MOUSE_MODE_KEY = "right_shift";

export function buildMouseKeys(): RuleBuilder {
  return rule("Control mouse by keys").manipulators([
    map(MOUSE_MODE_KEY)
      .toVar("mouse_mode", 1)
      .toAfterKeyUp({
        set_variable: { name: "mouse_mode", value: 0 },
      }),

    map("slash")
      .toVar("mouse_faster_move_speed", 1)
      .toAfterKeyUp({
        set_variable: { name: "mouse_faster_move_speed", value: 0 },
      })
      .condition(ifMouseMode()),

    map("right_control")
      .toVar("mouse_slower_move_speed", 1)
      .toAfterKeyUp({
        set_variable: { name: "mouse_slower_move_speed", value: 0 },
      })
      .condition(ifMouseMode()),

    map("w")
      .toMouseKey(moveUp(SLOWER_SPEED))
      .condition(ifMoveSlower())
      .description("mouse move up slower with w"),
    map("w")
      .toMouseKey(moveUp(FASTER_SPEED))
      .condition(ifMoveFaster())
      .description("mouse move up faster with w"),
    map("w")
      .toMouseKey(moveUp(NORMAl_SPEED))
      .condition(ifMouseMode())
      .description("mouse move up with w"),

    map("s")
      .toMouseKey(moveDown(SLOWER_SPEED))
      .condition(ifMoveSlower())
      .description("mouse move down slower with s"),
    map("s")
      .toMouseKey(moveDown(FASTER_SPEED))
      .condition(ifMoveFaster())
      .description("mouse move down faster with s"),
    map("s")
      .toMouseKey(moveDown(NORMAl_SPEED))
      .condition(ifMouseMode())
      .description("mouse move down with s"),

    map("a")
      .toMouseKey(moveLeft(SLOWER_SPEED))
      .condition(ifMoveSlower())
      .description("mouse move left slower with a"),
    map("a")
      .toMouseKey(moveLeft(FASTER_SPEED))
      .condition(ifMoveFaster())
      .description("mouse move left faster with a"),
    map("a")
      .toMouseKey(moveLeft(NORMAl_SPEED))
      .condition(ifMouseMode())
      .description("mouse move left with a"),

    map("d")
      .toMouseKey(moveRight(SLOWER_SPEED))
      .condition(ifMoveSlower())
      .description("mouse move right slower with d"),
    map("d")
      .toMouseKey(moveRight(FASTER_SPEED))
      .condition(ifMoveFaster())
      .description("mouse move right faster with d"),
    map("d")
      .toMouseKey(moveRight(NORMAl_SPEED))
      .condition(ifMouseMode())
      .description("mouse move right with d"),

    map("q")
      .toPointingButton("button1")
      .condition(ifMouseMode())
      .description("Left click"),

    map("q", "left_shift")
      .toPointingButton("button1", "left_command")
      .condition(ifMouseMode())
      .description("Keymap for open a link in new tab"),

    map("e")
      .toPointingButton("button2")
      .condition(ifMouseMode())
      .description("Right click"),

    map("c").toMouseKey(scrollDown(WHEEL_SPEED)).condition(ifMouseMode()),
    map("x").toMouseKey(scrollUp(WHEEL_SPEED)).condition(ifMouseMode()),
    map("z").toMouseKey(scrollLeft(WHEEL_SPEED)).condition(ifMouseMode()),
    map("v").toMouseKey(scrollRight(WHEEL_SPEED)).condition(ifMouseMode()),
  ]);
}

const ifMoveFaster = () => ifVar("mouse_faster_move_speed")
const ifMouseMode = () => ifVar("mouse_mode")
const ifMoveSlower = () => ifVar("mouse_slower_move_speed")

function moveUp(y: number): ToMouseKey {
  return { speed_multiplier: 1.2, y: -y };
}

function moveDown(y: number): ToMouseKey {
  return { speed_multiplier: 1.2, y: y };
}

function moveLeft(x: number): ToMouseKey {
  return { speed_multiplier: 1.2, x: -x };
}

function moveRight(x: number): ToMouseKey {
  return { speed_multiplier: 1.2, x: x };
}

function scrollRight(speed: number): ToMouseKey {
  return { speed_multiplier: 1.2, horizontal_wheel: -speed };
}

function scrollLeft(speed: number): ToMouseKey {
  return { speed_multiplier: 1.2, horizontal_wheel: speed };
}

function scrollDown(speed: number): ToMouseKey {
  return { speed_multiplier: 1.2, vertical_wheel: -speed };
}

function scrollUp(speed: number): ToMouseKey {
  return { speed_multiplier: 1.2, vertical_wheel: speed };
}
