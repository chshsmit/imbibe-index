import cors from "cors";
import express, { Request, Response } from "express";
import CollectionRouter from "./routes/collection/routes";
import UserRouter from "./routes/user/routes";

const app = express();
const port = 5000;

// ---------------------------------------------
// Middleware
// ---------------------------------------------

app.use(express.json());
app.use(cors());

// ---------------------------------------------
// Routes
// ---------------------------------------------

app.use("/user", UserRouter);
app.use("/collection", CollectionRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, express with typescript");
});

// ---------------------------------------------
// Start
// ---------------------------------------------

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
