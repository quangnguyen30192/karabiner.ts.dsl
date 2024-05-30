import {
  BasicManipulator,
  FromKeyParam,
  hyperLayer,
  ifApp,
  ifVar,
  layer,
  map,
  mapDoubleTap,
  NumberKeyValue,
  rule,
  simlayer,
  toApp,
  ToEvent,
  toKey,
  ToKeyCode,
  ToMouseKey,
  toSetVar,
  withCondition,
  withMapper,
  writeToProfile,
} from "karabiner.ts";

const WHEEL_SPEED = 50;
const SLOWER_SPEED = 300;
const NORMAl_SPEED = 718;
const FASTER_SPEED = 2536;
const MOUSE_MODE_KEY: ToKeyCode = "right_shift";

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

  hyperLayer("e")
    .description("Open apps")
    .manipulators({
      k: toApp("Google Chrome"),
      u: toApp("Microsoft Outlook"),
      n: toApp("Skype"),
      f: toApp("Finder"),
      j: toApp("/Applications/Alacritty"),
      b: toApp("Messenger"),
      p: toApp("IntelliJ IDEA Ultimate"),
      m: toApp("Webex"),
    }),

  hyperLayer("w")
    .description("Windows")
    .manipulators([
      map("u")
        .to("tab", ["right_control", "right_shift"])
        .description("Go prev tab"),
      map("i").to("tab", "right_control").description("Go next tab"),
      map("n")
        .to("grave_accent_and_tilde", "right_command")
        .description("Go next windows"),

      // map('b').to('open_bracket', 'right_command'), // go back
      // map('m').to('close_bracket', 'right_command'), // go forth

      // require CatchMouse to be installed, so that moving mouse to other screen works
      // and set ctrl + cmd + p/o to move the mouse
      map("close_bracket")
        .to("p", ["right_command", "right_control"])
        .description("move mouse to next screen"),
      map("open_bracket")
        .to("o", ["right_command", "right_control"])
        .description("move mouse to next scree"),
    ]),

  hyperLayer("s")
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
    ]),

  hyperLayer("r")
    .description("iterm manipulation")
    .manipulators([
      map("k").to$("pkill -f /Applications/Iterm2.app"),
      map("y").to$("~/.yadr/bin/iterm2 ycmd"),
      map("m").to$("~/.yadr/bin/iterm2 ~/.yadr/bin/rofi-beats"),
      map("n").to$("~/.yadr/bin/iterm2 ~/.yadr/bin/app-launch"),
      map("u").to$("~/.yadr/bin/iterm2 ~/.yadr/bin/command-launch"),
    ]),

  rule(
    "Disable (Map to F11 which is harmless) for Google Chrome due to frequently accidentally press",
    ifApp("Google Chrome")
  ).manipulators([
    map("w", ["command", "left_shift"]).toNone(),
    map("q", "command").toNone(),
  ]),

  rule(
    "Disable (Map to F11 which is harmless) Cmd-Q for Alacritty due to frequently accidentally press",
    ifApp("Alacritty")
  ).manipulators([map("q", "command").toNone()]),

  rule("fn and hjkl to arrow key").manipulators([
    map("h", "left_option").to("left_arrow"),
    map("j", "left_option").to("down_arrow"),
    map("k", "left_option").to("up_arrow"),
    map("l", "left_option").to("right_arrow"),
  ]),

  rule("Control mouse by keys").manipulators([
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
  ]),
]);

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

function scrollUp(speed: number): ToMouseKey {
  return { speed_multiplier: 1.2, horizontal_wheel: -speed };
}

function scrollDown(speed: number): ToMouseKey {
  return { speed_multiplier: 1.2, horizontal_wheel: speed };
}

function scrollLeft(speed: number): ToMouseKey {
  return { speed_multiplier: 1.2, vertical_wheel: -speed };
}

function scrollRight(speed: number): ToMouseKey {
  return { speed_multiplier: 1.2, vertical_wheel: speed };
}
