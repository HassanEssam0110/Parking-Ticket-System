import { promises as fs } from "fs";
import { resolve } from "path";
import TicketMachineBase from "./TicketMachineBase";
import ITicketMachine from "./types/ticket-machine.type";
import { CONFIG } from "./config/config";

export default class TicketMachineReadFile
  extends TicketMachineBase
  implements ITicketMachine
{
  private timeout: number = CONFIG.TIMEOUT;

  constructor(_currency: string, _pricePerMinute: number) {
    super(_currency, _pricePerMinute);
  }

  async startInteraction(): Promise<void> {
    console.log(
      "Enter your wanted parking duration in minutes in the file called duration.txt"
    );
    await this.sleep();

    let duration: number | undefined = undefined;
    while (duration === undefined) {
      duration = await this.attemptToReadFile();
    }

    const price = this.calculatePrice(duration);
    this.displayPrice(price);
  }

  async endInteraction(): Promise<void> {
    try {
      await fs.writeFile(resolve("data/duration.txt"), "");
      console.log("Thank you for parking with us!");
      console.log("Duration file has been reset.");
    } catch (error) {
      console.error(error);
    }
  }

  async attemptToReadFile(): Promise<number | undefined> {
    try {
      const content = await fs.readFile(resolve("data/duration.txt"), "utf-8");
      if (content === "") {
        await this.sleep();
        return undefined;
      }

      const parsedDuration = Number(content);
      if (isNaN(parsedDuration) || parsedDuration <= 0) {
        console.log("Invalid duration in file. Waiting again...");
        await this.sleep();
        return undefined;
      }

      return parsedDuration;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  private sleep(): Promise<void> {
    return new Promise((resolve) => {
      console.log(`Waiting ${this.timeout} seconds...`);
      setTimeout(resolve, this.timeout * 1000);
    });
  }
}
