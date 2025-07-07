import fs from "fs";
import { resolve } from "path";
import { rawlist } from "@inquirer/prompts";
import express, { Request, Response } from "express";
import { CONFIG } from "./config/config";

export default class TicketMachine {
  private currency: string;
  private pricePerMinute: number;

  private app = express();
  private PORT = CONFIG.PORT;

  private timeout: number = CONFIG.TIMEOUT;

  constructor(_currency: string, _pricePerMinute: number) {
    this.currency = _currency;
    this.pricePerMinute = _pricePerMinute;
  }

  /* ------------------- 1- Requirement Console ------------------- */
  async startInterActionConsole() {
    const duration = await this.askForDurationConsole();
    const price = this.calculatePrice(duration);
    this.displayPrice(price);
  }

  endInterAction(): void {
    console.log("Thank you for parking with us!");
  }

  /* ------------------- 2- Requirement  HTTP Request ------------------- */
  async startInterActionAPI() {
    return new Promise<void>((resolve) => {
      this.app.get("/:duration", (req: Request, res: Response) => {
        const { duration } = req.params;
        const price = this.calculatePrice(Number(duration));
        res.status(200).json({
          message: "Thank you for parking with us!",
          price: `Total price will be ${price} ${this.currency}`,
        });
        resolve();
      });

      this.app.listen(this.PORT, () => {
        console.log(`server start - http://localhost:${this.PORT}/:duration`);
      });
    });
  }

  endInterActionAndCloseProgram() {
    console.log("Thank you for parking with us!");
    process.exit(0);
  }

  /* ------------------- 3- RequirementFrom File ------------------- */
  async startInterActionReadFile(): Promise<void> {
    console.log(
      "Enter ypur wanted parking duration in minutes in the file called duration.txt"
    );
    await this.sleep();

    let duration: number | undefined = undefined;

    while (duration === undefined) {
      duration = await this.attemptToReadFile();
    }

    const price = this.calculatePrice(duration);
    this.displayPrice(price);
  }

  endInterActionAndEmptyFile(): void {
    fs.writeFile(resolve("data/duration.txt"), "", () => {
      console.log("Duration file has been reset.");
      console.log("Thank you for parking with us!");
    });
  }

  /**
   * Attempts to read the parking duration from a text file.
   * If the file is empty, prompts the user to input a duration and retries after a delay.
   * Returns the duration as a number if successful, or undefined if an error occurs.
   *
   * @returns The parking duration in minutes or undefined if the file is empty or an error occurs.
   */
  async attemptToReadFile(): Promise<number | undefined> {
    try {
      const data = fs.readFileSync(resolve("data/duration.txt"), "utf-8");
      if (data === "") {
        console.log("The file still empty, please input a duration.");
        await this.sleep();
      } else {
        return Number(data);
      }
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async sleep() {
    return new Promise((resolve) => {
      console.log(`watting ${this.timeout} seconds`);
      setTimeout(resolve, this.timeout * 1000);
    });
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

  /**
   * Calculates the price for a given parking duration.
   * @param duration - Duration of parking in minutes.
   * @returns The price for parking in the currency set when the ticket machine was created.
   */
  private calculatePrice(duration: number): number {
    return duration * this.pricePerMinute;
  }

  /**
   * Displays the calculated parking price to the console.
   * @param price - The total price for the parking duration in the specified currency.
   */
  private displayPrice(price: number): void {
    console.log(`Total price will be ${price} ${this.currency}`);
  }
}

