import { CONFIG } from "./config/config";
import TicketMachineConsole from "./TicketMachineConsole";
import TicketMachineAPI from "./TicketmachineAPI";
import TicketMachineReadFile from "./TicketMachineReadFile";
import ITicketMachine from "./types/ticket-machine.type";

class App {
  async main() {
    const { CURRENCY, PRICE_PER_MINUTE, TYPE_MACHINE } = CONFIG;

    let ticketMachine: ITicketMachine;

    if (TYPE_MACHINE === "1") {
      ticketMachine = new TicketMachineConsole(CURRENCY, PRICE_PER_MINUTE);
    } else if (TYPE_MACHINE === "2") {
      ticketMachine = new TicketMachineAPI(CURRENCY, PRICE_PER_MINUTE);
    } else if (TYPE_MACHINE === "3") {
      ticketMachine = new TicketMachineReadFile(CURRENCY, PRICE_PER_MINUTE);
    } else {
      throw new Error("Invalid TYPE_MACHINE");
    }

    await ticketMachine.startInteraction();
    ticketMachine.endInteraction();
  }
}

const app = new App();
app.main();
