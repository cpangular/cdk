import path from "path";
import { concurrently } from "concurrently";

import { IProject } from "./dependancy-graph";
import { exit } from "process";

export async function runCmd(
  phases: Array<IProject | IProject[]>,
  cmd: string
) {
  const cmdInfo = {
    command: `yarn ${cmd}`,
    cwd: "",
    name: "",
  };
  for (let phase of phases) {
    const commands = [];
    phase = Array.isArray(phase) ? phase : [phase];
    for (const project of phase) {
      if (project.scripts.indexOf(cmd) !== -1) {
        commands.push({
          ...cmdInfo,
          cwd: path.resolve(__dirname, `../../${project.path}`),
          name: `${cmdInfo.command} - ${project.name}`,
        });
      }
    }
    if (commands.length) {
      const run = concurrently(commands);
      for (const command of run.commands) {
        command.stdout.subscribe((b) => console.info(b.toString("utf8")));
        command.stderr.subscribe((b) => console.info(b.toString("utf8")));
      }
      try{
        await run.result;
      }catch(e){
        console.error('error:', e);
        exit(e.exitCode);
      }
    }
  }
}
