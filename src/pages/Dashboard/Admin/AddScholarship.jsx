import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AddScholarship = () => {
  const { register, handleSubmit, reset } = useForm();
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    data.postedBy = user?.email;
    axiosSecure
      .post("/scholarships", data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire("Success!", "Scholarship added successfully!", "success");
          reset();
        }
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong!", "error");
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🎓 Add Scholarship</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          {...register("scholarshipName")}
          placeholder="Scholarship Name"
          className="input input-bordered"
          required
        />
        <input
          {...register("universityName")}
          placeholder="University Name"
          className="input input-bordered"
          required
        />
        <input
          {...register("universityCountry")}
          placeholder="University Country"
          className="input input-bordered"
          required
        />
        <input
          {...register("universityCity")}
          placeholder="University City"
          className="input input-bordered"
          required
        />
        <select
          {...register("subjectCategory")}
          className="select select-bordered"
          required
        >
          <option value="">Select Subject</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Engineering">Engineering</option>
          <option value="Doctor">Doctor</option>
        </select>
        <select
          {...register("scholarshipCategory")}
          className="select select-bordered"
          required
        >
          <option value="">Select Scholarship Type</option>
          <option value="Full fund">Full fund</option>
          <option value="Partial">Partial</option>
          <option value="Self-fund">Self-fund</option>
        </select>
        <select
          {...register("degree")}
          className="select select-bordered"
          required
        >
          <option value="">Select Degree</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>
        <input
          {...register("applicationFees")}
          placeholder="Application Fee"
          type="number"
          className="input input-bordered"
          required
        />
        <input
          {...register("serviceCharge")}
          placeholder="Service Charge"
          type="number"
          className="input input-bordered"
          required
        />
        <input
          {...register("deadline")}
          placeholder="Application Deadline"
          type="date"
          className="input input-bordered"
          required
        />
        <input
          {...register("postDate")}
          placeholder="Post Date"
          type="date"
          className="input input-bordered"
          required
        />
        <input
          {...register("universityImage")}
          placeholder="University Image URL"
          className="input input-bordered"
          required
        />
        <textarea
          {...register("description")}
          placeholder="Scholarship Description"
          className="textarea textarea-bordered col-span-1 md:col-span-2"
          required
        ></textarea>
        <button
          type="submit"
          className="btn btn-primary col-span-1 md:col-span-2"
        >
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
