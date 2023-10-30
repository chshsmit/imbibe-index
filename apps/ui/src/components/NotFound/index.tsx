import { Button } from "@nextui-org/react";
import { IconError404 } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="flex flex-col items-center">
        <IconError404 size={100} />
        <h3>
          Sorry looks like we couldn&apos;t find what you were looking for
        </h3>
        <Button className="mt-5" color="primary" onClick={() => navigate("/")}>
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
