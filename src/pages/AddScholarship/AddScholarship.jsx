import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddScholarship = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.universityImage[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?expiration=600&key=8405f33224a3876c32e9b04bc179e7ed`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await imgbbRes.json();
      const imageUrl = imgData.data.url;

      const scholarshipData = {
        scholarshipName: data.scholarshipName,
        universityName: data.universityName,
        universityImage: imageUrl,
        universityCountry: data.universityCountry,
        universityCity: data.universityCity,
        worldRank: parseInt(data.worldRank),
        subjectCategory: data.subjectCategory,
        scholarshipCategory: data.scholarshipCategory,
        degree: data.degree,
        tuitionFees: parseFloat(data.tuitionFees),
        applicationFees: parseFloat(data.applicationFees),
        serviceCharge: parseFloat(data.serviceCharge),
        applicationDeadline: data.applicationDeadline,
        postDate: new Date().toISOString(),
        postedBy: user?.email || "moderator@example.com",
      };

      const res = await axiosSecure.post("/scholarships", scholarshipData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Scholarship added successfully!", "success");
        reset();
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {" "}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {" "}
        <div className="text-center">
          {" "}
          <h2 className="text-3xl font-bold">Add Scholarship</h2>{" "}
          <p className="text-gray-500">Fill in scholarship details</p>{" "}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            {...register("scholarshipName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Scholarship Name"
          />
          <input
            {...register("universityName", { required: true })}
            className="input input-bordered w-full"
            placeholder="University Name"
          />

          <input
            {...register("universityImage", { required: true })}
            type="file"
            className="file-input file-input-bordered w-full"
          />
          <input
            {...register("universityCountry", { required: true })}
            className="input input-bordered w-full"
            placeholder="Country"
          />
          <input
            {...register("universityCity", { required: true })}
            className="input input-bordered w-full"
            placeholder="City"
          />
          <input
            {...register("worldRank")}
            type="number"
            className="input input-bordered w-full"
            placeholder="World Rank (optional)"
          />

          <select
            {...register("subjectCategory", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Subject Category</option>
            <option>Agriculture</option>
            <option>Engineering</option>
            <option>Doctor</option>
          </select>

          <select
            {...register("scholarshipCategory", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Scholarship Category</option>
            <option>Full Fund</option>
            <option>Partial</option>
            <option>Self-fund</option>
          </select>

          <select
            {...register("degree", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Degree</option>
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Masters</option>
          </select>

          <input
            {...register("tuitionFees")}
            type="number"
            className="input input-bordered w-full"
            placeholder="Tuition Fees (optional)"
          />
          <input
            {...register("applicationFees", { required: true })}
            type="number"
            className="input input-bordered w-full"
            placeholder="Application Fees"
          />
          <input
            {...register("serviceCharge", { required: true })}
            type="number"
            className="input input-bordered w-full"
            placeholder="Service Charge"
          />
          <input
            {...register("applicationDeadline", { required: true })}
            type="date"
            className="input input-bordered w-full"
          />
        </div>
        <div className="text-center">
          <button className="btn btn-primary text-black">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
