import {
  FromModifierParam,
  RuleBuilder,
  ToMouseKey,
  ifVar,
  map,
  rule,
} from "karabiner.ts";

const WHEEL_SPEED = 50;
const SLOWER_SPEED = 300;
const NORMAl_SPEED = 718;
const FASTER_SPEED = 2536;
const MOUSE_MODE_KEY: FromModifierParam = "right_shift";

export function buildMouseKeys(): RuleBuilder {
  return rule("Control mouse by keys").manipulators([
    map("slash", MOUSE_MODE_KEY)
      .toVar("mouse_faster_move_speed", 1)
      .toAfterKeyUp({
        set_variable: { name: "mouse_faster_move_speed", value: 0 },
      }),
    map("right_control", MOUSE_MODE_KEY)
      .toVar("mouse_slower_move_speed", 1)
      .toAfterKeyUp({
        set_variable: { name: "mouse_slower_move_speed", value: 0 },
      }),

    map("w", MOUSE_MODE_KEY)
      .toMouseKey(moveUp(SLOWER_SPEED))
      .condition(ifMoveSlower())
      .description("mouse move up slower with w"),
    map("w", MOUSE_MODE_KEY)
      .toMouseKey(moveUp(FASTER_SPEED))
      .condition(ifMoveFaster())
      .description("mouse move up faster with w"),
    map("w", MOUSE_MODE_KEY)
      .toMouseKey(moveUp(NORMAl_SPEED))
      .description("mouse move up with w"),

    map("s", MOUSE_MODE_KEY)
      .toMouseKey(moveDown(SLOWER_SPEED))
      .condition(ifMoveSlower())
      .description("mouse move down slower with s"),
    map("s", MOUSE_MODE_KEY)
      .toMouseKey(moveDown(FASTER_SPEED))
      .condition(ifMoveFaster())
      .description("mouse move down faster with s"),
    map("s", MOUSE_MODE_KEY)
      .toMouseKey(moveDown(NORMAl_SPEED))
      .description("mouse move down with s"),

    map("a", MOUSE_MODE_KEY)
      .toMouseKey(moveLeft(SLOWER_SPEED))
      .condition(ifMoveSlower())
      .description("mouse move left slower with a"),
    map("a", MOUSE_MODE_KEY)
      .toMouseKey(moveLeft(FASTER_SPEED))
      .condition(ifMoveFaster())
      .description("mouse move left faster with a"),
    map("a", MOUSE_MODE_KEY)
      .toMouseKey(moveLeft(NORMAl_SPEED))
      .description("mouse move left with a"),

    map("d", MOUSE_MODE_KEY)
      .toMouseKey(moveRight(SLOWER_SPEED))
      .condition(ifMoveSlower())
      .description("mouse move right slower with d"),
    map("d", MOUSE_MODE_KEY)
      .toMouseKey(moveRight(FASTER_SPEED))
      .condition(ifMoveFaster())
      .description("mouse move right faster with d"),
    map("d", MOUSE_MODE_KEY)
      .toMouseKey(moveRight(NORMAl_SPEED))
      .description("mouse move right with d"),

    map("q", MOUSE_MODE_KEY)
      .toPointingButton("button1")
      .description("Left click"),
    map("e", MOUSE_MODE_KEY)
      .toPointingButton("button2")
      .description("Right click"),

    map("c", MOUSE_MODE_KEY).toMouseKey(scrollDown(WHEEL_SPEED)),
    map("x", MOUSE_MODE_KEY).toMouseKey(scrollUp(WHEEL_SPEED)),
    map("z", MOUSE_MODE_KEY).toMouseKey(scrollLeft(WHEEL_SPEED)),
    map("v", MOUSE_MODE_KEY).toMouseKey(scrollRight(WHEEL_SPEED)),
  ]);
}

function ifMoveFaster() {
  return ifVar("mouse_faster_move_speed");
}

function ifMoveSlower() {
  return ifVar("mouse_slower_move_speed");
}

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
