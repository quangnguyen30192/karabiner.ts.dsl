import { RuleBuilder, hyperLayer, toApp } from "karabiner.ts";

export function buildOpenAppsKeys(): RuleBuilder {
  return hyperLayer("e")
    .description("Open apps")
    .manipulators({
      k: toApp("Google Chrome"),
      u: toApp("Microsoft Outlook"),
      n: toApp("Discord"),
      f: toApp("Finder"),
      j: toApp("/Applications/Alacritty"),
      b: toApp("Messenger"),
      p: toApp("IntelliJ IDEA Ultimate"),
      m: toApp("Webex"),
      o: toApp("Obsidian"),
      y: toApp("VLC")
    });
}
