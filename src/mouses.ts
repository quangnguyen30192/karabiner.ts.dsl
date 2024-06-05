import {
  FromKeyCode,
  RuleBuilder,
  ToEvent,
  ToMouseKey,
  ifVar,
  map,
  rule,
  withCondition,
  withModifier,
} from "karabiner.ts";

const WHEEL_SPEED = 50;
const SLOWER_SPEED = 300;
const NORMAl_SPEED = 718;
const FASTER_SPEED = 2536;
const NAV_KEY = ["w", "s", "a", "d"];

export function buildMouseKeys(): RuleBuilder {
  return rule("Control mouse by keys").manipulators([
    withModifier("right_shift")(
      withCondition(ifMoveSlower())([
        map(NAV_KEY.at(0) as FromKeyCode)
          .toMouseKey(moveUp(SLOWER_SPEED))
          .description("mouse move up slower"),
        map(NAV_KEY.at(1) as FromKeyCode)
          .toMouseKey(moveDown(SLOWER_SPEED))
          .description("mouse move down slower"),
        map(NAV_KEY.at(2) as FromKeyCode)
          .toMouseKey(moveLeft(SLOWER_SPEED))
          .description("mouse move left slower"),
        map(NAV_KEY.at(3) as FromKeyCode)
          .toMouseKey(moveRight(SLOWER_SPEED))
          .description("mouse move right slower"),
      ])
    ),

    withModifier("right_shift")(
      withCondition(ifMoveFaster())([
        map(NAV_KEY.at(0) as FromKeyCode)
          .toMouseKey(moveUp(FASTER_SPEED))
          .description("mouse move up faster"),
        map(NAV_KEY.at(1) as FromKeyCode)
          .toMouseKey(moveDown(FASTER_SPEED))
          .description("mouse move down faste"),
        map(NAV_KEY.at(2) as FromKeyCode)
          .toMouseKey(moveLeft(FASTER_SPEED))
          .description("mouse move left faster"),
        map(NAV_KEY.at(3) as FromKeyCode)
          .toMouseKey(moveRight(FASTER_SPEED))
          .description("mouse move right faster"),
      ])
    ),

    withModifier("right_shift")([
      map("slash", "any")
        .toVar("mouse_faster_move_speed")
        .toAfterKeyUp(resetVar("mouse_faster_move_speed")),

      map("right_control", "any")
        .toVar("mouse_slower_move_speed")
        .toAfterKeyUp(resetVar("mouse_slower_move_speed")),

      map(NAV_KEY.at(0) as FromKeyCode)
        .toMouseKey(moveUp(NORMAl_SPEED))
        .description("mouse move up"),

      map(NAV_KEY.at(1) as FromKeyCode)
        .toMouseKey(moveDown(NORMAl_SPEED))
        .description("mouse move down"),

      map(NAV_KEY.at(2) as FromKeyCode)
        .toMouseKey(moveLeft(NORMAl_SPEED))
        .description("mouse move left"),

      map(NAV_KEY.at(3) as FromKeyCode)
        .toMouseKey(moveRight(NORMAl_SPEED))
        .description("mouse move right"),

      map("q").toPointingButton("button1").description("Left click"),
      map("q", "left_shift")
        .toPointingButton("button1", "left_command")
        .description("Keymap for open a link in new tab"),

      map("e").toPointingButton("button2").description("Right click"),

      map("c").toMouseKey(scrollDown(WHEEL_SPEED)),
      map("x").toMouseKey(scrollUp(WHEEL_SPEED)),
      map("z").toMouseKey(scrollLeft(WHEEL_SPEED)),
      map("v").toMouseKey(scrollRight(WHEEL_SPEED)),

      // keymaps reflects to physical screens
      map("close_bracket")
      .toMouseCursorPosition({ x: "50%", y: "50%", screen: 0 })
      .description("move mouse to the first screen"),
      map("open_bracket")
      .toMouseCursorPosition({ x: "50%", y: "50%", screen: 1 })
      .description("move mouse to the 2nd screen"),
    ]),

  ]);
}

const ifMoveFaster = () => ifVar("mouse_faster_move_speed");
const ifMoveSlower = () => ifVar("mouse_slower_move_speed");

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

function resetVar(name: string): ToEvent {
  return {
    set_variable: { name, value: 0 },
  };
}
