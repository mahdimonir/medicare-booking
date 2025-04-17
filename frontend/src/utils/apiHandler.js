import { toast } from "react-toastify";

const asyncHandler = (asyncFunction) => {
  return async (...args) => {
    try {
      await asyncFunction(...args);
    } catch (err) {
      toast.error(err.message);
      console.error("err: ", err.message);
    }
  };
};

const handleApiResponse = asyncHandler(async (response) => {
  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message);
  } else {
    toast.success(data.message);
  }
});

export { asyncHandler, handleApiResponse };
