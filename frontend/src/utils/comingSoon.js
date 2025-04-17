import { toast } from "react-toastify";

export const handleComingSoon = (e) => {
  e.preventDefault();
  toast.info("This feature is coming soon!");
};
