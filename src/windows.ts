import { RuleBuilder, hyperLayer, map } from "karabiner.ts";

export function buildWindowsKeys(): RuleBuilder {
  return hyperLayer("w")
    .description("Windows")
    .manipulators([
      map("y")
        .to$(rectangle("previous-display"))
        .description("Move app to the prev screen"),
      map("o")
        .to$(rectangle("next-display"))
        .description("Move app to the next screen"),
      map("k").to$(rectangle("top-half")).description("Move app to top half"),
      map("j")
        .to$(rectangle("bottom-half"))
        .description("Move app to bottom half"),
      map("h").to$(rectangle("left-half")).description("Move app to left half"),
      map("l")
        .to$(rectangle("right-half"))
        .description("Move app to right half"),
      map("f").to$(rectangle("maximize")).description("Maximize app"),
      map("b").to$(rectangle("bottom-right-ninth")).description("Bottom right"),
      map("-").to$(rectangle("smaller")).description("Smaller"),

      map("u")
        .to("tab", ["right_control", "right_shift"])
        .description("Go prev tab"),
      map("i").to("tab", "right_control").description("Go next tab"),
      map("n")
        .to("grave_accent_and_tilde", "right_command")
        .description("Go next windows"),

      // map('b').to('open_bracket', 'right_command'), // go back
      // map('m').to('close_bracket', 'right_command'), // go forth
    ]);
}

function rectangle(command: string) {
  return `open -g rectangle://execute-action?name=${command}`;
}
