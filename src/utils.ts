export function toOsascript(app: string, cmd: string) {
  return `osascript -e 'tell application \"${app}\" ${cmd}'`;
}

export function itermCmd(program: string) {
  return "~/.yadr/bin/iterm2 " + program;
}
