import { rawlist } from "@inquirer/prompts";
import TicketMachineBase from "./TicketMachineBase";
import ITicketMachine from "./types/ticket-machine.type";

export default class TicketMachineConsole
  extends TicketMachineBase
  implements ITicketMachine
{
  constructor(_currency: string, _pricePerMinute: number) {
    super(_currency, _pricePerMinute);
  }

  async startInteraction() {
    const duration = await this.askForDurationConsole();
    const price = this.calculatePrice(duration);
    this.displayPrice(price);
  }

  endInteraction(): void {
    console.log("Thank you for parking with us!");
  }

  /**
   * Prompts the user via the console to select a parking duration from a list of options.
   *
   * @returns A promise that resolves to the selected duration in minutes.
   */
  private async askForDurationConsole(): Promise<number> {
    const answer = await rawlist({
      message: "Select a duration:",
      choices: [
        { name: "30 min", value: 30 },
        { name: "1 hour", value: 60 },
        { name: "2 hour", value: 120 },
        { name: "4 hour", value: 240 },
        { name: "8 hour", value: 480 },
      ],
    });

    return answer;
  }
}
