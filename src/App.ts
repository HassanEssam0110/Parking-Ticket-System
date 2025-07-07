import TicketMachine from "./TicketMachine";
import { CONFIG } from "./config/config";

class App {
  async main() {
    const { CURRENCY, PRICE_PER_MINUTE, TYPE_MACHINE } = CONFIG;

    const ticketMachine = new TicketMachine(CURRENCY, PRICE_PER_MINUTE);

    if (TYPE_MACHINE === "1") {
      await ticketMachine.startInterActionConsole();
      ticketMachine.endInterAction();
    } else if (TYPE_MACHINE === "2") {
      await ticketMachine.startInterActionAPI();
      ticketMachine.endInterActionAndCloseProgram();
    } else if (TYPE_MACHINE === "3") {
      await ticketMachine.startInterActionReadFile();
      ticketMachine.endInterActionAndEmptyFile();
    }
  }
}

const app = new App();
app.main();
