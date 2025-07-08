import express, { Request, Response } from "express";
import TicketMachineBase from "./TicketMachineBase";
import ITicketMachine from "./types/ticket-machine.type";
import { CONFIG } from "./config/config";

export default class TicketMachineAPI
  extends TicketMachineBase
  implements ITicketMachine
{
  private app = express();
  private port = CONFIG.PORT;

  constructor(_currency: string, _pricePerMinute: number) {
    super(_currency, _pricePerMinute);
  }

  startInteraction(): Promise<void> {
    return new Promise((resolve) => {
      this.app.get("/:duration", (req: Request, res: Response) => {
        const { duration } = req.params;
        const parsedDuration = Number(duration);
        if (isNaN(parsedDuration) || parsedDuration <= 0) {
          res.status(400).json({ error: "Invalid duration" });
          return;
        }

        const price: number = this.calculatePrice(parsedDuration);
        res.status(200).json({
          message: "Thank you for parking with us!",
          price: `Total price will be ${price} ${this.currency}`,
        });
        resolve();
      });

      this.app.listen(this.port, () => {
        console.log(
          `To set the wanted duration please send a GET request to http://localhost:${this.port}/:duration`
        );
      });
    });
  }

  endInteraction(): void {
    console.log("Closing server... Thank you for parking with us!");
    process.exit(0);
  }
}
