import { useForm } from "react-hook-form";
import CourseTableRow from "../../components/CourseTableRow";
import { useState } from "react";
import { toast } from "react-toastify";

const Checkout = () => {
  const course = JSON.parse(localStorage.getItem("cart")) || [];
  const [totalPrice, setTotalPrice] = useState(0);

  const getTotalPrice = (price) => {
    setTotalPrice(price);
  };

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (data.photo && data.photo.length > 0) {
      formData.append("photo", data.photo[0]);
    }

    formData.append("course_id", course.id);
    formData.append("course_fee", course.regular_price);
    formData.append("course_qty", course.quantity);
    formData.append(
      "total_course_fee",
      course.discount_price * course.quantity
    );
    formData.append("discount_course_fee", course.discount_price);
    formData.append(
      "sub_total_course_fee",
      course.discount_price * course.quantity
    );
    formData.append("admission_date", new Date());

    formData.append("name", data.name);
    formData.append("father_name", data.father_name);
    formData.append("father_phone_no", data.father_phone_no);
    formData.append("school_collage_name", data.school_collage_name);
    formData.append("job_title", data.job_title);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("present_address", data.present_address);
    formData.append("permanent_address", data.permanent_address);
    formData.append("nid_no", data.nid_no);
    formData.append("phone_no", data.phone_no);
    formData.append("local_guardian_name", data.local_guardian_name);
    formData.append("local_guardian_phone_no", data.local_guardian_phone_no);
    formData.append("date_of_birth", data.date_of_birth);
    formData.append("blood_group", data.blood_group);

    fetch("https://itder.com/api/course-purchase", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        localStorage.setItem(
          "order",
          JSON.stringify(result.coursePurchaseData)
        );
        localStorage.removeItem("cart");
        reset();
        toast.success(reset.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="mt-5 border mx-2">
      <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6"
      >
        {/* Trainee Information Section */}
        <div className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="name"
                className="block font-semibold text-base mb-2"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("name", { required: "Full Name is required" })}
              />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone_no"
                className="block font-semibold text-base mb-2"
              >
                Form No:
              </label>
              <input
                type="text"
                id="phone_no"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("phone_no", {
                  required: "Form number is required",
                })}
              />
              {errors.phone_no && (
                <p className="text-red-600">{errors.phone_no.message}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="father_name"
                  className="block font-semibold text-base mb-2"
                >
                  Father Name:
                </label>
                <input
                  type="text"
                  id="father_name"
                  className="w-full border border-gray-300 rounded-md p-2"
                  {...register("father_name", {
                    required: "Parent Name is required",
                  })}
                />
                {errors.father_name && (
                  <p className="text-red-600">{errors.father_name.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="father_phone_no"
                  className="block font-semibold text-base mb-2"
                >
                  Father phone number:
                </label>
                <input
                  type="text"
                  id="father_phone_no"
                  className="w-full border border-gray-300 rounded-md p-2"
                  {...register("father_phone_no", {
                    required: "Father phone number is required",
                  })}
                />
                {errors.father_phone_no && (
                  <p className="text-red-600">
                    {errors.father_phone_no.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="school"
                  className="block font-semibold text-base mb-2"
                >
                  School/College:
                </label>
                <input
                  type="text"
                  id="school_collage_name"
                  className="w-full border border-gray-300 rounded-md p-2"
                  {...register("school_collage_name", {
                    required: "school_collage_name/College is required",
                  })}
                />
                {errors.school_collage_name && (
                  <p className="text-red-600">
                    {errors.school_collage_name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="job_title"
                  className="block font-semibold text-base mb-2"
                >
                  Job Information:
                </label>
                <input
                  type="text"
                  id="job_title"
                  className="w-full border border-gray-300 rounded-md p-2"
                  {...register("job_title", {
                    required: "Job Information is required",
                  })}
                />
                {errors.job_title && (
                  <p className="text-red-600">{errors.job_title.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="present_address"
                  className="block font-semibold text-base mb-2"
                >
                  Present Address:
                </label>
                <textarea
                  id="present_address"
                  className="w-full border border-gray-300 rounded-md p-2"
                  {...register("present_address", {
                    required: "Present Address is required",
                  })}
                />
                {errors.present_address && (
                  <p className="text-red-600">
                    {errors.present_address.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="permanent_address"
                  className="block font-semibold text-base mb-2"
                >
                  Permanent Address:
                </label>
                <textarea
                  id="permanent_address"
                  className="w-full border border-gray-300 rounded-md p-2"
                  {...register("permanent_address", {
                    required: "Permanent Address is required",
                  })}
                />
                {errors.permanent_address && (
                  <p className="text-red-600">
                    {errors.permanent_address.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="nid_no"
                  className="block font-semibold text-base mb-2"
                >
                  NID Number:
                </label>
                <input
                  type="text"
                  id="nid_no"
                  className="w-full border border-gray-300 rounded-md p-2"
                  {...register("nid_no", {
                    required: "NID Number is required",
                  })}
                />
                {errors.nid_no && (
                  <p className="text-red-600">{errors.nid_no.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone_no"
                  className="block font-semibold text-base mb-2"
                >
                  Mobile No:
                </label>
                <input
                  type="text"
                  id="phone_no"
                  className="w-full border border-gray-300 rounded-md p-2"
                  {...register("phone_no", {
                    required: "Mobile Number is required",
                  })}
                />
                {errors.phone_no && (
                  <p className="text-red-600">{errors.phone_no.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="local_guardian_name"
                  className="block font-semibold text-base mb-2"
                >
                  Local Guardian’s Name:
                </label>
                <input
                  type="text"
                  id="local_guardian_name"
                  className="w-full border border-gray-300 rounded-md p-2"
                  {...register("local_guardian_name", {
                    required: "Guardian's Name is required",
                  })}
                />
                {errors.local_guardian_name && (
                  <p className="text-red-600">
                    {errors.local_guardian_name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="local_guardian_phone_no"
                  className="block font-semibold text-base mb-2"
                >
                  Local Guardian’s Phone Number:
                </label>
                <input
                  type="text"
                  id="local_guardian_phone_no"
                  className="w-full border border-gray-300 rounded-md p-2"
                  {...register("local_guardian_phone_no", {
                    required: "Local Guardian’s Phone Number is required",
                  })}
                />
                {errors.local_guardian_phone_no && (
                  <p className="text-red-600">
                    {errors.local_guardian_phone_no.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="date_of_birth"
                  className="block font-semibold text-base mb-2"
                >
                  Date of Birth:
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  className="w-full border border-gray-300 rounded-md p-2"
                  {...register("date_of_birth", {
                    required: "Date of Birth is required",
                  })}
                />
                {errors.date_of_birth && (
                  <p className="text-red-600">{errors.date_of_birth.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="blood_group"
                  className="block font-semibold text-base mb-2"
                >
                  Blood Group:
                </label>
                <select
                  id="blood_group"
                  className="w-full border border-gray-300 rounded-md p-2"
                  {...register("blood_group", {
                    required: "Blood Group is required",
                  })}
                >
                  <option value="" disabled selected>
                    Select Blood Group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                {errors.blood_group && (
                  <p className="text-red-600">{errors.blood_group.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-base mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="photo"
                className="block font-semibold text-base mb-2"
              >
                Photo:
              </label>
              <input
                type="file"
                id="photo"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("photo", {
                  required: "File is required",
                })}
              />
              {errors.photo && (
                <p className="text-red-600">{errors.photo.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block font-semibold text-base mb-2"
              >
                Gender:
              </label>
              <select
                id="gender"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-600">{errors.gender.message}</p>
              )}
            </div>
          </div>

          {/* Course List and Total Price Section */}
          <div className="m-mt_16px">
            <div className="pt-p_16px">
              <div className="lg:flex items-start gap-3">
                <div className="w-full lg:w-[58%] bg-white border-2">
                  <table className="overflow-x-auto w-full">
                    <thead>
                      <tr className="border-b-4 border-gray-300">
                        <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                          Course
                        </th>
                        <th className="text-[14.4px] font-bold p-[7px] text-black">
                          Price
                        </th>
                        <th className="text-[14.4px] font-bold p-[7px] text-black">
                          Quantity
                        </th>
                        <th className="text-[14.4px] font-bold p-[7px] text-black">
                          Sub Total
                        </th>
                      </tr>
                    </thead>

                    <tbody className="overflow-x-auto">
                      <CourseTableRow
                        course={course}
                        getTotalPrice={getTotalPrice}
                      />
                    </tbody>
                  </table>
                </div>
                <div className="lg:w-[41%] bg-white border-2">
                  <div className="px-[30px]">
                    <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                      Cart Summary
                    </h2>
                    <div className="py-3 flex justify-between border-b border-gray-300">
                      <p className="text-black font-bold">Total Price</p>
                      <p className="text-black font-bold">{totalPrice}</p>
                    </div>

                    <button
                      type="submit"
                      className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
