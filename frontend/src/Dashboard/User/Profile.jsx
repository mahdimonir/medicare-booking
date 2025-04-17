import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import Error from "../../components/Error/Error";
import { BASE_URL } from "../../config";
import uploadImageToCloudinary from "../../utils/upload.cloudinary";

function Profile({ user, onProfileUpdate, dispatch }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  // Initialize formData with default values to avoid undefined issues
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email,
    password: user?.password,
    bloodType: "",
    gender: "",
    photo: "",
  });

  // Update formData when the user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        bloodType: user.bloodType,
        gender: user.gender,
        photo: user.photo,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgLoading(true);
    try {
      const data = await uploadImageToCloudinary(file);
      setSelectedFile(data.secure_url);
      setFormData((prevFormData) => ({
        ...prevFormData,
        photo: data.secure_url,
      }));
      toast.success("Photo uploaded successfully!");
    } catch (error) {
      console.error("File upload failed:", error.message);
      toast.error("Failed to upload the file. Please try again.");
    } finally {
      setImgLoading(false);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      // Update the authContext with the new user data
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data.user,
          role: result.data.user.role,
          token: localStorage.getItem("token"),
        },
      });

      toast.success("Profile updated successfully!");
      onProfileUpdate(); // Trigger re-fetch in the parent component
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-hidden focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>

        <div className="mb-5">
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-hidden focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
            readOnly
            aria-readonly
            disabled={true}
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-hidden focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
            aria-readonly
            readOnly
          />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Blood Type:
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleInputChange}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-hidden"
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </label>
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-hidden"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center overflow-hidden">
              <img
                src={formData.photo}
                alt="Avatar"
                className="w-full h-full rounded-full"
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              onChange={handleFileInputChange}
              id="customFile"
              accept=".jpg, .png, .jpeg"
              disabled={imgLoading}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className={
                "absolute top-0 left-0 w-full h-full flex items-center justify-center text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
              }
            >
              {imgLoading ? (
                <HashLoader size={20} color="#fff" />
              ) : selectedFile ? (
                "Upload Again"
              ) : (
                "Upload Photo"
              )}
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            disabled={loading && true}
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
          >
            {loading ? <HashLoader size={25} color="#fff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
