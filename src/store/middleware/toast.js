import { toast } from "react-toastify";

const toastNotification = (store) => (next) => (action) => {
  if (action.type === "api/callFailed") {
    // toast.error(action.payload)
  } else if (action.type === "api/callSuccess") {
    // toast.success(action.payload.message)
  } else next(action);
};

export default toastNotification;
