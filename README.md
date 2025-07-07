# 🅿️ The Parking Ticket System (PTS)

This project simulates a **Parking Ticket System** (PTS)that allows for customers to purchase a parking ticket. that It is easy to do the setup for the owner of the parking lot, while allowing parking lot owners to configure settings like **currency** and **price per minute** via the `.env` file.

---

## 🔧 Configuration

Before using the system, make sure you configure the required environment variables.

### Required `.env` Variables:

- `CURRENCY` — The symbol or name of the currency (e.g., `USD`, `EUR`).
- `PRICE_PER_MINUTE` — The cost charged per minute for parking.
- `TYPE_MACHINE` — Indicates which machine type to run (e.g., `"1"` for terminal, `"2"` for HTTP, `"3"` for file input).
- `TIMEOUT` — (in seconds) Optional timeout for simulating user delay or session expiration.
- `PORT` — The port to use for the HTTP server if using machine type 2.

You can set these values in a `.env` file like this:

```env
CURRENCY=USD
PRICE_PER_MINUTE=0.5
TYPE_MACHINE="2"
TIMEOUT =7
PORT=3000
```

---

## ✅ Requirements

### Requirement 1: 🖥️ Terminal Interaction

- Customers interact with the ticket machine **via the terminal/console**.
- The system will display a list of predefined duration options (e.g., 15 mins, 30 mins, 1 hour).
- Customers can choose one option, and the system will calculate and print the total cost.

### Requirement 2: 🌐 HTTP Request Interaction

- Customers interact with the ticket machine **via an HTTP API**.
- The customer sends the desired parking duration using an HTTP request.
- The server accepts any duration value (in minutes) and returns the cost.

### Requirement 3: 📄 Text File Interaction

- Customers interact with the ticket machine by writing the desired duration **in a text file**.
- The system reads the file, calculates the cost, and clears the file to prepare for the next customer.

---
