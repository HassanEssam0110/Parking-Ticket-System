# 🅿️ Parking Ticket System (PTS)

This project simulates a **Parking Ticket System (PTS)** that allows customers to purchase a parking ticket through different modes of interaction:

- 💻 **Terminal** (Interactive prompts)
- 🌐 **HTTP API** (REST interface)
- 📄 **Text File** (File-based input)

It is also **easily configurable** for parking lot owners through a `.env` file.

---

## ⚙️ Configuration

All system behavior is controlled using environment variables in a `.env` file.

### 📁 `.env` Example

```env
CURRENCY=USD
PRICE_PER_MINUTE=0.5
TYPE_MACHINE="1"
TIMEOUT=7
PORT=3000
```

### 🔑 Explanation of Variables

| Variable           | Description                                                                   |
| ------------------ | ----------------------------------------------------------------------------- |
| `CURRENCY`         | Symbol or name of the currency used (e.g., `USD`, `EUR`).                     |
| `PRICE_PER_MINUTE` | Cost charged per minute of parking.                                           |
| `TYPE_MACHINE`     | Machine type to run:<br>`"1"` = Console, `"2"` = HTTP API, `"3"` = File input |
| `TIMEOUT`          | Time (in seconds) to wait during file-based input (for simulating delay).     |
| `PORT`             | Port number for HTTP server (used when `TYPE_MACHINE="2"`).                   |

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run in Development Mode

```bash
npm run dev
```

This uses `tsx` and watches for changes.

### 3. Build and Run

```bash
npm run build
npm start
```

---

## 💡 Machine Types (Modes)

The system supports **3 modes of interaction**, configured via the `TYPE_MACHINE` variable.

### 1️⃣ Terminal Mode

- Runs an interactive CLI session.
- Displays a list of duration options.
- User selects duration from predefined choices.
- Displays total parking cost.

### 2️⃣ HTTP API Mode

- Starts a local Express server.
- Accepts GET requests to `/duration` route.
- Example: `http://localhost:3000/60`
- Responds with JSON showing parking price and message.

### 3️⃣ File Input Mode

- Monitors a file (`data/duration.txt`) for input.
- User enters duration into the file.
- System reads the file, calculates cost, and resets it.

---

## 📂 Project Structure

```
src/
├── App.ts                 # Main entry point
├── TicketMachineBase.ts   # Abstract base class
├── TicketMachineConsole.ts
├── TicketMachineAPI.ts
├── TicketMachineReadFile.ts
├── config/
│   └── config.ts          # Loads env variables
├── types/
│   └── ticket-machine.type.ts  # Interface for machine
```

---

## ✅ Requirements Checklist

- [x] Modular OOP design with abstraction.
- [x] Multiple modes supported.
- [x] Reads configuration from `.env`.
- [x] Error handling for invalid input.
- [x] Clean console messages for all modes.

---

## 🧪 Example HTTP Request

```bash
curl http://localhost:3000/90
```

**Response:**

```json
{
  "message": "Thank you for parking with us!",
  "price": "Total price will be 45 USD"
}
```

---
